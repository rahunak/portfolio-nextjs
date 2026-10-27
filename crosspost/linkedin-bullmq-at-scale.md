# LinkedIn post — BullMQ article (draft)

**Публикация:** после деплоя safesync.dev (статья должна быть доступна по ссылке).
**Правило:** первые слова поста become URL slug → фразу "NestJS + BullMQ" ставим в самое начало.
**3 варианта — выбери один или склей.**

---

## Вариант A (техничный)

NestJS + BullMQ: what breaks first at scale, and the fixes that hold.

I built an AI media pipeline on NestJS + BullMQ that went concept → production in 60 days and now schedules thousands of concurrent inference jobs.

The four failures I've watched hit queue layers first:

1. Retry storms — unbounded backoff turns one provider outage into a self-inflicted DDoS on your own queue
2. Jobs lost mid-flight — a worker dies during a 20-minute inference call and nobody owns the recovery
3. Starvation — batch renders occupy every worker while interactive users wait
4. Silent queues — nothing crashes, jobs just pile up, and there's no number that says so

All four are design decisions you make before the first deploy. In the article: bounded tiered retries, queue-per-workload-class, stalled-job detection, and event streams that give you real-time job status for free.

Full write-up (with code): https://safesync.dev/blog/bullmq-at-scale

If your team is designing a queue layer right now — happy to be a second pair of eyes. DM me or comment "queue" and I'll reach out.

#NodeJS #NestJS #BullMQ #SoftwareArchitecture #EventDriven

---

## Вариант B (storytelling, короче)

NestJS + BullMQ took our AI media pipeline from first commit to production in 60 days.

Then I watched three other teams lose weeks to the same four failures: retry storms, lost jobs, worker starvation, silently growing queues.

So I wrote up exactly what we did differently — with code. Bounded backoff, queue-per-workload-class, stalled-job detection, event-driven status.

Read it here: https://safesync.dev/blog/bullmq-at-scale

Designing a queue layer this quarter? Comment below, I'll share our checklist.

#BackendEngineering #NestJS #BullMQ

---

## Вариант C (вопрос-крючок)

What kills NestJS + BullMQ systems in production? Not the framework. Four predictable failures:

• retry storms during provider outages
• jobs orphaned by dead workers
• interactive users waiting behind batch renders
• queues that silently grow for weeks

I've shipped a pipeline on BullMQ through a 60-day MVP into production (thousands of concurrent inference jobs) — wrote up the design decisions that prevent all four, code included:

https://safesync.dev/blog/bullmq-at-scale

Which one has bitten your team? Curious how common the starvation case is — it was our #1 surprise.

#NodeJS #Backend #SystemDesign
