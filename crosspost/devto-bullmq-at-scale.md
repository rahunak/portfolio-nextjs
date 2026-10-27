---
title: NestJS + BullMQ at Scale: What Breaks First and How to Fix It
published: false
description: From a production AI media pipeline shipped in 60 days — the four failures that hit BullMQ first at scale, and the design fixes that hold.
tags: nestjs, bullmq, architecture, redis
canonical_url: https://safesync.dev/blog/bullmq-at-scale
author: Eugene Zaiko
---

{% link https://safesync.dev/blog/bullmq-at-scale %}

> This article was originally published on [safesync.dev](https://safesync.dev/blog/bullmq-at-scale). The full version lives there; posting it here to reach more Node.js developers.

BullMQ breaks in predictable places. The first failures I see at scale are retry storms from unbounded backoff, jobs lost to consumers dying mid-flight, and short jobs starving behind long ones. All three are fixed by design decisions you make before the first deploy, not after an outage.

This comes from building **RealStream**, an AI media orchestration platform where every user submission is an inference job that can run from seconds to tens of minutes. The production MVP shipped in **60 days** on NestJS and BullMQ, and it has been scheduling **thousands of concurrent jobs** since.

## What breaks first, in order

- **Retry storms.** A provider goes down, every failed job retries on the default schedule, and the retry volume at peak failure is a multiple of your normal load. Your outage becomes a self-inflicted DDoS against your own queue.
- **Jobs lost mid-flight.** A worker dies during a long inference call. The job sits in an uncertain state: stuck active forever, or duplicated if someone re-enqueues blindly.
- **Starvation.** Batch renders occupy every worker while interactive users wait. Fairness inside a single queue does not exist; it has to be designed.
- **Silent queues.** Nothing breaks, but jobs pile up because consumers are throughput-bound and nobody has a number that says so.

## Fix 1: interview every job at design time

A job is not a fire-and-forget function call. For every job type, answer four questions before writing the processor: Is the operation idempotent? What is its timeout? What does one retry mean, and how many retries make sense? What state does the job leave behind if it dies halfway?

## Fix 2: bounded, tiered retry policy

Default BullMQ retry behavior is fine for demos and dangerous for incidents. Set explicit attempts with capped exponential backoff, and separate failure types: a 429 from the provider should back off in minutes, a malformed payload should fail on the first attempt.

```ts
const inferenceQueue = new Queue('inference', {
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
  concurrency: 4, // hard ceiling on concurrent AI calls per worker
})
```

## Fix 3: multiple queues, not one

One queue for everything is the single most common mistake. Separate queues per workload class, so interactive and batch traffic physically cannot starve each other. In RealStream, status-critical jobs and long batch renders run in different lanes with different concurrency. This is the cheapest scaling decision you will ever make.

## Fix 4: make death boring

Workers will die: deploys, OOM, crashes. Design so a dead worker is a non-event. State lives in Redis, artifacts in object storage (S3 in our case), and a stalled-job detector re-queues work from workers that stopped heartbeating. Any worker can be killed and replaced at 3 a.m. without a runbook.

## Fix 5: events are the product

Users of a pipeline care about one thing: where is my job. Publish stage transitions as BullMQ job events, stream them through Redis pub/sub to the WebSocket gateway, and the frontend renders truth instead of a spinner. Queue event streams are also the cheapest monitoring you will ever wire.

## When not to use BullMQ

BullMQ assumes Redis is durable enough for your requirements. If you need replayable event logs, exactly-once semantics across services, or multi-DC fan-out, you want Kafka-class infrastructure, not more retries. Most teams debating this on paper are not in either regime yet; measure, then choose.

---

I write about real production systems at [safesync.dev](https://safesync.dev). If your team is designing a queue layer right now and wants a second opinion on the architecture, I consult on exactly this — reach out by [email](mailto:zaiko.eugene@gmail.com) or [Telegram](https://t.me/rahunak).
