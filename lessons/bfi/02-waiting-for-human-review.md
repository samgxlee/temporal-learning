# Waiting for human review

Lesson 2 of 4 · About 7 minutes · [All lessons](../README.md)

## Learning goal

Describe how a Workflow receives a person’s decision, and distinguish Workflow recovery from an Activity retry.

## Starting with the case

BFI reports that its automated and human-task Workflows coordinate through Signals, including review steps that can wait for days. [Source: BFI case study](https://temporal.io/resources/case-studies/bfi).

The useful design question is how to connect an external decision to the correct running process.

## Apply the idea to a demo submission

Consider this proposed sequence:

Submit demo → create review task → wait for decision → notify the artist.

The review website would identify the submission’s Workflow and send the reviewer’s decision through an application API. The API must authenticate the reviewer and check permission to act. Temporal messaging does not provide that business authorisation automatically.

Choose the message according to the interaction:

| Need | Temporal concept |
| --- | --- |
| Read the current review state | Query |
| Deliver a decision asynchronously | Signal |
| Request a state change and wait for validation or a result | Update |

Signals do not return the handler’s business result. A successful send should not be presented as proof that a demo was approved. [Source: Workflow message passing](https://docs.temporal.io/encyclopedia/workflow-message-passing).

A simple learning design could register a Signal handler, create the review task through an Activity, and use the TypeScript SDK’s `condition` to wait until a decision arrives or a deadline expires. Establishing the handler and state before requesting review helps handle a fast response. Decide explicitly what a late or repeated decision means. [Source: TypeScript message passing](https://docs.temporal.io/develop/typescript/workflows/message-passing).

This is a design sketch. No review handler or interface has been added to the app.

## What happens during the wait?

A blocked Workflow does not need a dedicated Worker thread for the whole review period. Its state can be reconstructed from Event History when work needs to resume. This still requires storage and operational capacity; waiting does not make the entire system free to run. [Source: Workers](https://docs.temporal.io/workers).

Recovery replays Workflow logic using recorded events. An Activity with a recorded completion result is not executed again merely because replay occurs. A failed or timed-out Activity can instead require a new attempt. Keep external calls in Activities so their results can be recorded. [Source: Workflow replay](https://docs.temporal.io/workflows).

The [existing recovery experiment](../../LEARNING.md#1-november-2026--continuing-a-workflow-after-restarting-the-worker) demonstrates a Worker restart during a timer. Waiting for human input is a further exercise.

## Check your understanding

1. Is the reviewer’s decision an Activity that must remain running for three days?
2. If the Worker restarts, must an already completed task-creation Activity run again?
3. Is rejecting a demo a technical failure that should be retried?

## Answer guide

1. A task-creation Activity can finish, leaving the Workflow to wait durably for a message.
2. Replay uses its recorded completion result. An unrecorded result presents a different problem, covered in lesson 4.
3. Rejection is a business outcome. Model it as a decision with an appropriate next step.

## Proposed practice — not yet implemented or run

Add a review Signal, a status Query and a short review deadline. Stop the Worker after task creation, send the decision while it is offline, and restart it with the development service still running. Inspect history to check the recorded Signal and subsequent progress. Record what happens when the decision arrives before or after the deadline.

For a customer conversation: “How do you track work that is waiting for someone, and what happens if the application restarts before they respond?”

[Previous lesson](01-reading-the-architecture.md) · [Next: Letting data guide the process](03-letting-data-guide-the-process.md).
