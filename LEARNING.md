# Learning notes

## 30 October 2026 — Running my first Temporal Workflow

### What I did

I followed Temporal’s official TypeScript quickstart, set up the local service and ran the Hello World example. Before running it, I worked through the Activity, Workflow, Worker and Client files with guidance from Codex.

I changed the Client’s input from `Temporal` to `Samuel`. The execution returned `Hello, Samuel!`, and I checked the input, result and completion events in Temporal’s web interface.

### What I learned

The different parts made more sense once I could connect the code to a working example:

- The **Client** requests a Workflow execution and supplies its input.
- The **Workflow** defines the process.
- An **Activity** performs an individual task.
- The **Worker** runs the Workflow and Activity code.
- The **Temporal service** coordinates the work and records its history.

A useful distinction was where to put my name. Changing the Workflow to always greet Samuel would fix its behaviour to one person. Passing the name through the Client keeps the same Workflow usable with different inputs.

### How I checked it

The terminal printed `Hello, Samuel!`. In the web interface, I confirmed that the input was `Samuel`, the Activity completed and the Workflow returned the expected result.

This was a successful execution. It hasn’t yet shown me what happens when something fails.

### What I want to understand next

What happens if the Worker stops before a Workflow finishes? I want to test that and compare what I observe with Temporal’s explanation of recovery.

### Sources and assistance

- [Temporal’s TypeScript quickstart](https://docs.temporal.io/develop/typescript/set-up-your-local-typescript)
- The example code is provided by Temporal. I performed this walkthrough myself, with Codex explaining the steps and helping me interpret the output.

## 30 October 2026 — Work waiting for an available Worker

### Experiment

I stopped the Worker while leaving the Temporal service running, then submitted another Workflow through the Client.

The Client printed a Workflow ID but waited for the greeting. In Temporal’s interface, the execution showed as Running. When I restarted the Worker, the Client received `Hello, Samuel!` without another submission.

### What this demonstrated

Temporal accepted the request while the Worker was unavailable. The work waited until the Worker returned.

“Running” describes an execution that hasn’t finished; it doesn’t necessarily mean application code is executing at that moment.

This tested Worker unavailability before execution. It did not test interrupting an Activity halfway through its work.

## 30 October 2026 — Retrying a temporary Activity failure

### Experiment

With guidance and example code from Codex, I changed the greeting Activity to print its attempt number and deliberately throw an error on attempt 1. I saved the change, restarted the Worker and submitted a new Workflow.

The Worker printed `Greeting attempt 1`, reported the simulated failure, then printed `Greeting attempt 2`. The Client received `Hello, Samuel!`.

### What this demonstrated

I submitted the Workflow once. Temporal retried the failed Activity within that same execution, without a retry loop in my application code.

For the planned demo-submission app, a temporary failure could occur when sending a notification. This experiment demonstrated retry behaviour using a simulated failure; it did not contact a real notification service.

A retry also means an action may be attempted more than once. When building the app, I’ll need to consider how to avoid duplicate notifications or other repeated effects.

## 31 October 2026 — Checking my understanding

I worked through some questions with Codex to check whether I could explain Temporal in my own words and connect it to a customer’s problem.

### What I clarified

I had been describing Activities as picking up where they left off. That needs more care: Temporal preserves the Workflow’s progress, but a failed Activity normally runs again from its beginning. Completed Activities whose results are recorded do not need to execute again during Workflow recovery.

We explored this through an email example. An email could be sent successfully, but its confirmation could be lost. Retrying the Activity could send another email. Keeping Workflow history does not automatically prevent duplicate external actions; the application needs to handle that.

I also clarified the difference between self-hosting and Temporal Cloud. Cloud manages the Temporal service, while the customer still runs the Workers containing their application code. Self-hosting adds responsibility for operating and maintaining the service.

For a customer conversation, I would ask how failures are handled today, how often engineers intervene and whether recovery preserves completed progress. I would also want to understand the time involved and the effect on customers before suggesting a change.

### What I want to test next

My earlier Worker experiment started with the Worker already stopped. Next, I want to complete one Activity, start a timer and stop the Worker during the wait. After restarting it, I’ll inspect the history to see how the Workflow continues using its recorded progress.

### Sources

- [Temporal overview](https://docs.temporal.io/temporal)
- [Activities and retries](https://docs.temporal.io/activities)
- [Event History](https://docs.temporal.io/encyclopedia/event-history)

## 31 October 2026 — Note for the application review

The entries above retain the sequence of my learning. The recovery exercise described under “What I want to test next” has not been added to this repository with code or an execution record. The application presentation includes an illustration of how recovery uses recorded progress; that illustration is not an execution trace.

The recorded experiments here show the greeting example, work waiting for a Worker and an Activity retry. Workflow recovery is also part of the documentation I studied and the understanding discussion above. The presentation keeps that distinction visible.

## 1 November 2026 — Continuing a Workflow after restarting the Worker

### What I did

With guidance and example code from Codex, I added a recovery Workflow with three steps: record a simulated demo submission, wait five minutes, then send a simulated reminder.

I stopped the Worker during the wait while leaving the Temporal service running, then restarted it.

### What I observed

The Workflow completed after I restarted the Worker. The submission-recorded message did not appear again.

### What I learned

This helped make the distinction between Workflow recovery and Activity retries clearer. The result is consistent with Temporal using the first Activity’s recorded result to continue the process.

The Workflow code can replay to reconstruct its progress without executing an already completed Activity again. That is different from a failed Activity being retried, where another attempt normally starts from the beginning.

For the demo-submission concept, this could allow a scheduled follow-up to continue after a Worker outage. These Activities only printed messages; the experiment did not send an email or test duplicate prevention with an external service.

This was a controlled Worker shutdown during a timer. It did not test interrupting an Activity halfway through or stopping the Temporal service.

### Running the example

From the `my-app` folder, with the Temporal service and Worker running:

`npx ts-node src/recovery-client.ts`

The Workflow waits five minutes between the two simulated Activities.

Reference: [Temporal Event History](https://docs.temporal.io/encyclopedia/event-history).

## 3 November 2026 — Learning from the BFI Finance architecture

### Source material

Temporal’s LinkedIn post and [BFI Finance case study](https://temporal.io/resources/case-studies/bfi) provide a production architecture to study alongside the local examples. The diagram shows application services, automated and human-task Workers, external services and the Temporal service.

### Questions to work through

- Which parts of the architecture belong to the application, and which responsibilities does Temporal handle?
- How does a process wait for a person and continue after a Worker outage?
- What does a custom data-dependency planner add to ordinary Workflow sequencing?
- Why do retries, external effects and changes to running processes still need careful design?

These questions form a [four-part lesson series](lessons/README.md), with source links, self-check questions and proposed exercises. The music-submission examples are illustrative designs, not descriptions of BFI’s implementation.

### Evidence and next steps

This entry records source material and a learning path prepared with Codex assistance. It does not record a new execution or claim that the lessons’ exercises have been completed. The existing timer-recovery experiment remains the practical starting point.

The next proposed implementation is a small review Workflow that receives a decision through a Signal. After implementing and running it, add the observations and limitations here before describing it as demonstrated behaviour.
