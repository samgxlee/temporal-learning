# Retrying and changing a running process

Lesson 4 of 4 · About 8 minutes · [All lessons](../README.md)

## Learning goal

Explain what durable execution preserves and why external effects, business decisions and code changes still require application design.

## Starting with the case

BFI identifies retries, Workflow Reset and versioned task routing among the capabilities it uses. [Source: BFI case study](https://temporal.io/resources/case-studies/bfi).

For learning, consider how each capability changes the questions a developer must answer.

## Retrying an Activity can repeat an external action

Imagine a notification Activity sends an email successfully. The Worker then stops before Temporal records the completion. Temporal cannot establish success from an event it never received. A later attempt could send another email.

Designing an operation to be idempotent means repeated attempts do not create additional effects. For this example, an application could use a stable notification ID and a provider that honours an idempotency key. Recording a flag locally before sending is not enough on its own: the application could stop between those two operations. The mechanism must address the external operation’s failure window. [Source: Activity idempotency](https://docs.temporal.io/activity-definition).

Use a stable ID for the logical notification, not a new random ID on each attempt. Also decide whether a reminder is a new intended notification or another attempt to deliver the original one. These are proposed design choices for the demo app.

## Match the response to the kind of failure

| Situation in the illustrative app | Appropriate design question |
| --- | --- |
| Notification provider temporarily unavailable | Which timeout and retry policy fits the dependency? |
| Reviewer rejects the demo | What business outcome should the Workflow record? |
| Artist changes their email address | Which state change and revalidation are needed? |
| Worker stops during a wait | Can compatible Workers resume from recorded history? |

A retry policy handles attempts; it does not decide what the business should do. Rejecting a demo should not trigger an endless technical retry.

## Reset is not an undo button

Workflow Reset creates a new Run from a selected point in history. Later steps may execute again. It does not retract an email or reverse a payment in another system. Before resetting past an external action, determine whether repeating it is safe or requires reconciliation. [Source: Workflow Reset](https://temporal.io/blog/production-controls).

## A running process can outlive a release

An artist might respond after the application has changed. With Worker Versioning, pinned Workflows can remain on their starting Worker Deployment Version. Those Workers must remain available to finish the work. External APIs and data schemas also need a compatibility plan; Worker routing alone cannot preserve a removed API field. [Source: Worker Versioning](https://docs.temporal.io/production-deployment/worker-deployments/worker-versioning).

## Check your understanding

1. Does a recorded Workflow history guarantee an email can never be sent twice?
2. Would a new idempotency key on each attempt prevent duplicates?
3. Can resetting an execution reverse an external action?

## Answer guide

1. No. The external action may succeed before its Activity result is recorded.
2. No. Attempts for the same logical action need an identity the downstream mechanism can recognise.
3. No. External reversal or correction requires explicit application behaviour.

## Proposed practice — not yet implemented or run

Use a persistent fake notification service that deduplicates a stable operation ID. Simulate the Activity failing after that service records success but before returning. Check that Temporal makes multiple attempts while the fake service records one delivery. Label this a simulation; it does not prove that a real email provider deduplicates requests.

As a separate deployment exercise, describe how an old review Workflow would finish after a new release. Versioned Workers have not been configured in this repository.

For a customer conversation: “What happens when a downstream service succeeds but your application never receives confirmation?”

[Previous lesson](03-letting-data-guide-the-process.md) · [Return to all lessons](../README.md).
