export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string };

export interface Post {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  datePublished: string;
  dateModified: string;
  lead: string;
  blocks: Block[];
  faq: { question: string; answer: string }[];
}

export const posts: Post[] = [
  {
    slug: "bullmq-at-scale",
    title: "NestJS + BullMQ at Scale: What Breaks First and How to Fix It",
    description:
      "I shipped an event-driven NestJS + BullMQ pipeline to production in 60 days. What actually breaks first at scale: retry storms, lost jobs, queue starvation, and the fixes that hold.",
    keywords: [
      "BullMQ",
      "NestJS",
      "event-driven architecture",
      "Redis queues",
      "worker scaling",
    ],
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    lead:
      "BullMQ breaks in predictable places. The first failures I see at scale are retry storms from unbounded backoff, jobs lost to consumers dying mid-flight, and short jobs starving behind long ones. All three are fixed by design decisions you make before the first deploy, not after an outage.",
    blocks: [
      {
        type: "p",
        text: "This article comes from building RealStream, an AI media orchestration platform where every user submission is an inference job that can run from seconds to tens of minutes. The production MVP shipped in 60 days on NestJS and BullMQ, and it has been scheduling thousands of concurrent jobs since. Here is what I got right early, and what I have watched break in systems built without these decisions.",
      },
      { type: "h2", text: "What breaks first, in order" },
      {
        type: "list",
        items: [
          "Retry storms. A provider goes down, every failed job retries on the default schedule, and the retry volume at peak failure is a multiple of your normal load. Your outage becomes a self-inflicted DDoS against your own queue and the already-degraded provider.",
          "Jobs lost mid-flight. A worker process dies during a long inference call. Without explicit handling, the job sits in an uncertain state: either stuck active forever, or duplicated if someone re-enqueues it blindly.",
          "Starvation. Batch renders occupy every worker while interactive users wait. Fairness inside a single queue does not exist; it has to be designed.",
          "Silent queues. Nothing breaks, but jobs slowly pile up because consumers are throughput-bound and nobody has a number that says so.",
        ],
      },
      { type: "h2", text: "Fix 1: interview every job at design time" },
      {
        type: "p",
        text: "A job is not a fire-and-forget function call. Before writing the processor, answer four questions for every job type: Is the operation idempotent? What is its timeout? What does one retry mean, and how many retries make sense? What state does the job leave behind if it dies halfway?",
      },
      { type: "h2", text: "Fix 2: bounded, tiered retry policy" },
      {
        type: "p",
        text: "Default BullMQ retry behavior is fine for demos and dangerous for incidents. Set explicit attempts with capped exponential backoff, and separate failure types: a 429 from the provider should back off in minutes, a malformed payload should fail on the first attempt.",
      },
      {
        type: "code",
        code: `const inferenceQueue = new Queue('inference', {
  connection, // shared ioredis connection
})

await inferenceQueue.add('render', payload, {
  priority: 3, // lower number = higher priority; batch renders run behind default jobs
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 2_000, // 2s, 4s, 8s, 16s, 32s
  },
  removeOnComplete: { count: 1_000 },
  removeOnFail: { age: 24 * 3600 },
})

const worker = new Worker('inference', processor, {
  connection,
  // hard ceiling on concurrent AI calls per worker
  concurrency: 4,
})`,
      },
      { type: "h2", text: "Fix 3: multiple queues, not one" },
      {
        type: "p",
        text: "One queue for everything is the single most common mistake. Separate queues per workload class, so interactive and batch traffic physically cannot starve each other. In RealStream, status-critical jobs and long batch renders run in different lanes with different concurrency and priorities. This is the cheapest scaling decision you will ever make.",
      },
      { type: "h2", text: "Fix 4: make death boring" },
      {
        type: "p",
        text: "Workers will die: deploys, OOM, node crashes. Design so that a dead worker is a non-event. State lives in Redis, artifacts live in object storage (S3 in our case), and a stalled-job detector re-queues work from workers that stopped heartbeating. The result: any worker can be killed and replaced at any time, at 3 a.m., without a runbook.",
      },
      { type: "h2", text: "Fix 5: events are the product" },
      {
        type: "p",
        text: "Users of a pipeline care about one thing: where is my job. Publish stage transitions as BullMQ job events, stream them through Redis pub/sub to the WebSocket gateway, and the frontend renders truth instead of a spinner. This also gives you free operational insight: queue event streams are the cheapest monitoring you will ever wire.",
      },
      { type: "h2", text: "What this buys you" },
      {
        type: "p",
        text: "In RealStream's numbers: production in 60 days from first commit, thousands of concurrent inference jobs, and job status visible to every user in real time. No Kafka, no extra infrastructure: one Redis instance carries the whole queue layer. BullMQ's speed-of-development profile is exactly right for teams that need production-grade event-driven systems without operating a streaming platform.",
      },
      { type: "h2", text: "When not to use BullMQ" },
      {
        type: "p",
        text: "Be honest about the ceiling. BullMQ assumes Redis is durable enough for your requirements, and that one Redis node (or a managed one) can absorb your write rate. If you need replayable event logs, exactly-once semantics across services, or multi-dc fan-out, you want Kafka-class infrastructure, not more retries. Most product teams debating this on paper are not in either regime yet; measure, then choose.",
      },
      {
        type: "p",
        text: "I write about real production systems at safesync.dev. If your team is designing a queue layer right now and wants a second opinion on the architecture, I consult on exactly this: reach out on Telegram or by email.",
      },
    ],
    faq: [
      {
        question: "Is BullMQ production-ready?",
        answer:
          "Yes. Production systems run BullMQ at tens of thousands of jobs per minute backed by a single Redis instance. Production-readiness comes from the policy you configure around it: bounded retries, per-job timeouts, stalled-job detection and per-class queues, not from the library itself.",
      },
      {
        question: "When should I choose BullMQ over RabbitMQ or Kafka?",
        answer:
          "Choose BullMQ when your stack is Node.js, you already run Redis, and you need delayed jobs, priorities, and rate limiting with an idiomatic API. Choose RabbitMQ for protocol-level routing across polyglot services. Choose Kafka for event replay and stream processing. Queue-per-workload-class in BullMQ covers most product workloads on a single managed Redis.",
      },
      {
        question: "How do you prevent retry storms in BullMQ?",
        answer:
          "Set explicit attempts with capped exponential backoff instead of defaults, separate failure types (rate limit vs. malformed input), and monitor the failed count so a provider outage cannot multiply your traffic. In one production AI pipeline, bounded retries with per-class queues kept a full provider outage from escalating into a queue collapse.",
      },
      {
        question: "How many BullMQ workers do I need?",
        answer:
          "Size by job profile, not by rules of thumb. Long inference jobs need few workers with low per-worker concurrency; short CPU-bound jobs need many. Measure your p95 job duration and target queue depth, then set concurrency so steady-state depth stays flat. The number tends to be lower than people expect.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const postUrls = posts.map((p) => `https://safesync.dev/blog/${p.slug}`);
