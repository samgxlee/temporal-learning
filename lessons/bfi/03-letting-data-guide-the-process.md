# Letting data guide the process

Lesson 3 of 4 · About 7 minutes · [All lessons](../README.md)

## Learning goal

Distinguish a data-driven business planner from Temporal’s execution machinery, and explain the added design responsibilities.

## Starting with the case

BFI built a Process SDK and planner over Temporal. Steps declare their required data and produced data through JSON Schema readsets and writesets; the planner derives execution order. That business framework is BFI’s implementation. [Source: BFI case study](https://temporal.io/resources/case-studies/bfi).

## Compare two ways of defining a process

The greeting example has an explicit sequence. A small review app could also use clear, handwritten sequencing. That is often a useful place to begin.

To explore another approach, imagine defining the music-submission process through data dependencies. The following table is an original teaching example, not BFI’s schema:

| Step | Requires | Produces |
| --- | --- | --- |
| Check file | Audio file reference | File check result |
| Collect artist details | Artist form | Contact details and consent |
| Prepare review task | Valid file, contact details and consent | Review task ID |
| Record review | Review task ID and reviewer response | Review decision |
| Notify artist | Review decision and contact details | Notification receipt |

File checking and collecting artist details have no dependency on each other in this simplified model. Preparing the review requires both results. The model makes the reason for waiting visible: a required piece of data is missing.

These fields and rules are illustrative. A real design would need to establish consent, validation and review requirements with its users.

## What the application must still decide

A planner needs more than a list of field names. It needs rules for validity, conflicting writes, missing producers and dependencies that form a cycle. If the artist replaces the audio file, the application must decide which earlier results and review decisions are still valid. Temporal does not infer those business rules from JSON Schema.

The planner must also preserve Workflow determinism. Loading changing configuration or querying a database directly from Workflow code can produce different decisions during replay. Record external inputs through Activities, use deterministic ordering for eligible steps, and plan how existing executions retain compatible schema and planner versions. [Source: Workflow Definition](https://docs.temporal.io/workflow-definition).

Those are engineering implications of this illustrative design, not claims about BFI’s internal implementation.

## Check your understanding

1. Does Temporal automatically turn any JSON Schema into a business process?
2. Does declaring required data guarantee that the data is correct?
3. When might a simple explicit sequence be easier to maintain?

## Answer guide

1. The application supplies the planner and business rules. Temporal coordinates the resulting execution.
2. Presence and correctness are different. The application needs validation and freshness rules.
3. When there are few steps, little variation and a clear order, a custom planning layer may create more work than it saves.

## Proposed practice — design only

Write input and output contracts for three demo-submission steps. Trace their dependencies by hand. Then replace the audio file after a review has finished: identify what must be checked or reviewed again and explain why.

Start by implementing an explicit sequence if you later build the example. Revisit a planner only when actual process variation makes the tradeoff useful.

For a customer conversation: “When an applicant corrects some information, which checks have to run again, and how do you determine that today?”

[Previous lesson](02-waiting-for-human-review.md) · [Next: Retrying and changing a running process](04-retries-and-safe-changes.md).
