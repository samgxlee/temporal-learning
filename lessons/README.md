# Lessons from the BFI Finance case study

These lessons use a customer architecture to connect Temporal concepts to a process that involves services, people and waiting. Start with the [local experiments](../LEARNING.md), then work through the lessons in order.

The starting material is [Temporal’s BFI Finance case study](https://temporal.io/resources/case-studies/bfi), published on 15 October 2026, and its LORA architecture diagram, also shared by Temporal on LinkedIn. Temporal publishes the account; the customer’s reported experience is not an experiment performed in this repository.

## Learning path

| Lesson | Question | Reading time |
| --- | --- | --- |
| [1. Reading the architecture](bfi/01-reading-the-architecture.md) | Which responsibilities belong to Temporal, and which belong to the application? | 6 minutes |
| [2. Waiting for human review](bfi/02-waiting-for-human-review.md) | How can a process wait for a person and continue after a Worker outage? | 7 minutes |
| [3. Letting data guide the process](bfi/03-letting-data-guide-the-process.md) | What does BFI’s planner add, and when might that complexity be useful? | 7 minutes |
| [4. Retrying and changing a running process](bfi/04-retries-and-safe-changes.md) | What still needs application design when execution is durable? | 8 minutes |

Each lesson separates the published case, documented Temporal behaviour and an illustrative music demo-submission design. It ends with questions, an answer guide and a proposed exercise.

## What has been demonstrated

The existing app demonstrates greeting, Activity retries and recovery after stopping a Worker during a timer. The lessons add reading and design exercises. Human review, a schema-driven planner, external deduplication and versioned deployments have not been implemented or tested here.

When an exercise is implemented and run, record the code, observations and limitations in [LEARNING.md](../LEARNING.md). Expected behaviour in a lesson is a prediction to check, not an execution record.

## Using the lessons on the website

The Markdown files are the full lesson content. [index.json](index.json) supplies stable IDs, titles, summaries, reading times and paths for a website’s lesson list. Resolve each path relative to this folder. Keep the source links, practice status and answer guides when adapting the presentation.

The architecture lesson includes an original, simplified Mermaid diagram and a text explanation. A website can render the diagram or show the explanation if Mermaid is unavailable. No website build or automatic synchronisation is configured in this repository.
