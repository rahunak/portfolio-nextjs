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
    slug: "postgres-partitioning-109-million-rows",
    title: "PostgreSQL Partitioning at 109M Rows: What Actually Made Queries 720x Faster",
    description:
      "A critical report on 109M+ telemetry rows took an hour. Hardware-aware partitioning cut it to under 5 seconds. The real decisions behind a 720x speedup, no theory.",
    keywords: [
      "PostgreSQL partitioning",
      "query optimization",
      "IoT telemetry",
      "large tables",
      "partition pruning",
    ],
    datePublished: "2026-10-27",
    dateModified: "2026-10-27",
    lead:
      "Partitioning a 109M-row PostgreSQL table took a critical report from about one hour to under 5 seconds. The speedup did not come from splitting the table into pieces; it came from matching the partition layout to the queries that actually run, so pruning removes most data before the planner reads a page.",
    blocks: [
      {
        type: "p",
        text: "The nearest large table I have worked on is Perseus, an industrial IoT analytics system for water treatment telemetry. Continuous readings from facility device fleets had accumulated past 109 million rows, and the nightly critical report, the one operations staff actually depended on, took about an hour to build. This is the story of how that query time was cut by a factor of 720, from a strategy on paper that mostly did not survive contact with the data.",
      },
      { type: "h2", text: "Profile first, partition second" },
      {
        type: "p",
        text: "The instinctive move is to shard or partition by date the moment a table gets large. For this table that would have been wrong. Reading the actual query workload showed two very different access profiles:",
      },
      {
        type: "list",
        items: [
          "Enterprise-tier clients with high-value monitoring devices who read their own history almost exclusively, over long time ranges.",
          "Operations staff who scan recent windows across the entire fleet for alarms and anomalies.",
        ],
      },
      {
        type: "p",
        text: "Partitioning only by time would serve the operational scans well and do nothing for the enterprise clients: every one of their queries would still fan out across every time partition. The partition key has to serve the dominant access path, and there were two.",
      },
      { type: "h2", text: "The hardware-aware partition key" },
      {
        type: "p",
        text: "The insight that unlocked the design was in the hardware itself. Monitoring devices are not all equal: enterprise-tier clients run expensive, high-frequency monitors, while the rest of the fleet reports more cheaply and in bursts. So the partition layout followed the hardware tiers: enterprise-grade devices went to dedicated partitions, and the operational time-window scans got their own layout aligned with the ingest pattern.",
      },
      {
        type: "p",
        text: "With that layout, partition pruning eliminates the rest of the fleet for enterprise queries before the planner touches a single heap page. That is where the 720x came from: not from faster reads of 109M rows, but from not reading most of them.",
      },
      { type: "h2", text: "Migrate without an outage window" },
      {
        type: "p",
        text: "A schema change on a live system is rarer than it sounds, because the old table keeps serving reads. The migration ran on the existing PHP 8 / Symfony services, executing incrementally while the legacy table remained the source of truth. Queries were flipped to the partitioned tables only after validation, in a controlled cutover rather than a weekend freeze. The dashboards built on React and TypeScript meant the improvement was visible to non-engineers the same day, not just in EXPLAIN plans.",
      },
      { type: "h2", text: "A minimal pruning-friendly example" },
      {
        type: "p",
        text: "The general shape of a pruning-friendly layout, simplified for illustration: ensure your query predicate includes the partition key, or the planner has no reason to skip partitions.",
      },
      {
        type: "code",
        code: `CREATE TABLE telemetry (
  device_id     bigint      NOT NULL,
  read_at       timestamptz NOT NULL,
  metrics       jsonb,
  PRIMARY KEY (device_id, read_at) -- must include BOTH partition keys
) PARTITION BY RANGE (read_at);

-- level 1: monthly partitions serve the operational scans.
-- The partition is declared partitioned itself (multi-level):
CREATE TABLE telemetry_2026_10
  PARTITION OF telemetry
  FOR VALUES FROM ('2026-10-01') TO ('2026-11-01')
  PARTITION BY RANGE (device_id);

-- level 2: enterprise-tier devices get their own leaf, so client
-- queries prune everything else away
CREATE TABLE telemetry_2026_10_enterprise
  PARTITION OF telemetry_2026_10
  FOR VALUES FROM (900000) TO (MAXVALUE);

CREATE TABLE telemetry_2026_10_rest
  PARTITION OF telemetry_2026_10
  FOR VALUES FROM (MINVALUE) TO (900000);`,
      },
      {
        type: "p",
        text: "Note the primary key includes the partition key. PostgreSQL requires partition keys to be part of any unique constraint, and finding this out mid-migration is expensive.",
      },
      { type: "h2", text: "What partitioning will not fix" },
      {
        type: "list",
        items: [
          "Missing indexes. A sequential scan in one partition is still a sequential scan.",
          "Too many partitions. Thousands of tiny partitions slow planning and can regress both load and queries; the cost curve is real and documented in the PostgreSQL community.",
          "Application-level inefficiency. No schema layout rescues N+1 query loops.",
          "Wrong partition key. This whole article exists because by-date was not the right key.",
        ],
      },
      {
        type: "p",
        text: "Results, in numbers: 109M+ rows queried in under 5 seconds, a 720x faster critical path, and a migration with no downtime window. I write about real production systems at safesync.dev. If your reports are measured in the wrong unit of time, this is exactly the kind of engagement I take on: reach out by email or Telegram.",
      },
    ],
    faq: [
      {
        question: "How much data do I need before partitioning a PostgreSQL table?",
        answer:
          "The row count number is a weak signal; the query profile is the real threshold. Partitioning pays off when queries can reliably exclude most partitions and indexes no longer fit or behave well in memory. A 50M-row table with narrow queries often needs nothing; a 50M-row table with full-scan reports may already need it. Profile the workload first.",
      },
      {
        question: "How many partitions is too many in PostgreSQL?",
        answer:
          "Planning overhead grows with partition count, and thousands of partitions can measurably slow both queries and data loading. The right number depends on partition pruning benefit versus planning cost; review data retention patterns and consolidate partitions when the warehouse slowly drifts. Running on a recent PostgreSQL version also reduces overhead significantly.",
      },
      {
        question: "What partition key should I choose?",
        answer:
          "The one your dominant queries filter on. For this 109M-row telemetry table, partitioning by date alone would have failed: enterprise clients query by device tier over long ranges. Matching the layout to hardware tiers is what produced the 720x speedup. Choose by reading the real access patterns, not by convention.",
      },
      {
        question: "Can I partition a large table without downtime?",
        answer:
          "Yes, if you accept a staged migration: create the partitioned layout, backfill incrementally while the legacy table keeps serving reads, validate, then flip queries in a controlled cutover. The Perseus migration ran this way on PHP 8 / Symfony services with no outage window. The risky pattern is doing it as a single weekend swap without parallel validation.",
      },
    ],
  },
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
