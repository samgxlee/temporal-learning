# Learning Temporal

A practical exploration of Temporal, prompted by my application for a business development role and a longer-term interest in how software works.

I followed the TypeScript quickstart, then experimented with Worker availability and Activity retries. This repository records what I did, what happened and how I would connect that learning to a customer conversation.

## What I’ve demonstrated

| Experiment | Observed result |
| --- | --- |
| Run the quickstart with a personalised input | The Workflow returned `Hello, Samuel!`. |
| Submit work while the Worker is stopped | The execution waited and completed after I restarted the Worker, without another submission. |
| Deliberately fail the first Activity attempt | Temporal retried the Activity, and the Workflow completed successfully. |

These are small local experiments. They do not demonstrate a production deployment or recovery from every kind of failure.

- [Learning notes](LEARNING.md): experiments, observations and limitations.
- [Run the example](my-app/README.md): setup, commands and expected behaviour.
- [Case-study lessons](lessons/README.md): a four-part learning path using Temporal’s BFI Finance architecture.

## Learning from a customer architecture

The [BFI lesson series](lessons/README.md) connects the local examples to application architecture, human review, data dependencies and safe recovery. Each lesson includes an explanation, a music-submission design example, self-check questions and a proposed exercise.

The case study is published by Temporal. Its reported customer experience is separate from my local observations. The proposed exercises are not implemented or recorded as completed experiments.

The lessons are stored as individual Markdown files with a [lesson index](lessons/index.json), so the same content can be adapted for the website. Website publishing and automatic synchronisation are not configured here.

## How I would introduce Temporal

Temporal helps developers coordinate processes that involve multiple steps, waiting and services that can fail. Developers define the process in code, and Temporal records its execution history and coordinates tasks, timers and retries.

The business conversation starts with the process: where does it get stuck, who has to intervene, and what does that interruption cost?

### OSS and Cloud

Temporal’s open-source platform can be self-hosted, with the organisation responsible for operating the service. Temporal Cloud provides a managed Temporal service, reducing that infrastructure-management responsibility.

This repository uses a local development server. I haven’t deployed or tested Temporal Cloud.

Sources: [How Temporal works](https://temporal.io/how-it-works), [Temporal Cloud](https://temporal.io/cloud).

## Applying the idea: music demo submissions

A university project explored a platform connecting musicians with industry contacts. A possible process would be:

Submit demo → review → request more music → artist responds → request a meeting.

That process could involve waiting for people and sending notifications through external services. Temporal could coordinate those steps and retry temporary technical failures. A creative decision, such as rejecting a track, would remain a human decision.

The app is a concept, not a built feature in this repository. The greeting experiments demonstrate underlying behaviours that could be relevant to it. Preventing duplicate external actions would still require application design.

### Questions I would ask a potential customer

- How do you manage this process today, and what already works well?
- Where do submissions or follow-ups get stuck?
- How often does someone intervene, and what is the impact?
- Is improving this a current priority, and who owns the process technically?
- Would the team prefer to operate Temporal itself or evaluate a managed service?

The answers would determine whether there is a useful opportunity. A process that already works reliably with simple tooling may have little reason to change.

## Sources and assistance

The code started from [Temporal’s official TypeScript quickstart](https://docs.temporal.io/develop/typescript/set-up-your-local-typescript).

I performed the walkthrough and experiments with Codex providing explanations and coding assistance. My learning notes distinguish the supplied example, assisted changes and my own observations. The upstream sample licence is retained in [my-app/LICENSE](my-app/LICENSE).
