import type { CaseStudy } from "../portfolio";

export const futureguide: CaseStudy = {
  slug: "futureguide",
  title: "WIS-FutureGuide",
  oneLiner:
    "Career guidance platform built as a 9-service Go microservice ecosystem — clean architecture top to bottom.",
  status: "active",
  year: "2026",
  role: "Lead architect · Backend",
  team: "Cross-functional · FE / BE / DB / ML",
  duration: "Ongoing",
  stack: [
    "Go",
    "Clean Architecture",
    "uber-go/fx",
    "Gin",
    "Postgres",
    "RabbitMQ",
    "Redis",
    "Docker Compose",
  ],
  links: [
    { label: "Organization", href: "https://github.com/WIS-futureguide" },
    { label: "Ecosystem repo", href: "https://github.com/WIS-futureguide" },
  ],
  emphasis: "cool",
  problem: {
    lead:
      "Career guidance has long-running async work — assessments, analysis, payment, notifications — that has no business sharing fate with the user-facing API.",
    body: [
      "A monolith would mean the assessment scoring loop blocks auth latency. The naive 'split everything into a service' move would just create a distributed monolith. FutureGuide needed a coordinated set of services where each one owns its domain and talks through clean contracts.",
      "Nine services, one shared package — kept honest by clean architecture boundaries and contract-first messaging. No drift, no surprises.",
    ],
  },
  decisions: [
    {
      title: "Service boundary by domain, not by entity",
      body:
        "auth-service, assessment-service, analysis-worker, chat-service, payment-service, admin-service, notification-service, ecosystem-futureguide, plus a `shared` package for contracts only. Each service owns its own persistence; cross-service reads go through APIs or events.",
    },
    {
      title: "RabbitMQ for fan-out, REST for query",
      body:
        "Assessment completion fans out to analysis-worker + notification-service via Rabbit topics. Synchronous reads stay REST so the latency budget is still observable per call.",
    },
    {
      title: "Clean architecture per service",
      body:
        "Each service has the same shape: `cmd/`, `internal/usecase`, `internal/adapter`, `internal/entity`. New engineers onboard in minutes — the directory map is the same everywhere.",
    },
  ],
  architectureDiagram: {
    code: `flowchart LR
  User((User))
  Admin((Admin))

  subgraph Edge["Edge"]
    GW[ecosystem-futureguide<br/>API gateway]
  end

  subgraph Sync["Sync services"]
    AUTH[auth-service]
    ASSESS[assessment-service]
    CHAT[chat-service]
    PAY[payment-service]
    ADMIN[admin-service]
  end

  subgraph Async["Async workers"]
    ANALYSE[analysis-worker]
    NOTIF[notification-service]
  end

  MQ{{RabbitMQ}}
  PG[(Postgres)]
  R[(Redis)]

  User --> GW
  Admin --> GW
  GW --> AUTH
  GW --> ASSESS
  GW --> CHAT
  GW --> PAY
  GW --> ADMIN

  AUTH <--> PG
  ASSESS <--> PG
  CHAT <--> PG
  PAY <--> PG
  ADMIN <--> PG
  AUTH <--> R

  ASSESS -- assessment.completed --> MQ
  PAY -- payment.settled --> MQ
  MQ --> ANALYSE
  MQ --> NOTIF
  ANALYSE <--> PG`,
    caption: "fig 1 · 9-service topology with sync REST + async event lanes",
  },
  challenges: [
    {
      title: "Keeping nine services from drifting",
      problem:
        "Each service evolves on its own. With no enforcement, the directory shape, error handling, and DI wiring all drift, and onboarding cost compounds per service.",
      solution:
        "A `shared` package owns DTOs, error envelopes, and Rabbit message contracts. Every service uses the same `internal/` layout and the same fx module signature. A linter check enforces the layered import direction (`adapter` → `usecase` → `entity`).",
    },
    {
      title: "Event idempotency without per-service state",
      problem:
        "analysis-worker and notification-service both consume `assessment.completed`. A redelivered message must not double-score and must not double-notify.",
      solution:
        "Every event carries a `correlation_id`. Consumers persist `(consumer, correlation_id)` in a tiny `processed_events` table inside their own DB before acting. The action and the marker live in the same transaction — atomic by construction.",
    },
  ],
  outcome: {
    lead:
      "A maintainable Go ecosystem where each service is small, the contracts are explicit, and async paths stay out of the sync latency budget.",
    metrics: [
      { value: "9", label: "cooperating services" },
      { value: "1", label: "shared contract package" },
      { value: "2 lanes", label: "sync REST + async events" },
      { value: "100%", label: "Go across the stack" },
    ],
  },
  codeHighlights: [
    {
      file: "shared/events/contract.go",
      language: "go",
      href: "https://github.com/WIS-futureguide",
      caption: "Single source of truth for cross-service events",
      code: `// AssessmentCompleted is emitted by assessment-service and consumed
// by analysis-worker + notification-service.
type AssessmentCompleted struct {
    CorrelationID string    \`json:"correlation_id"\`
    UserID        string    \`json:"user_id"\`
    AssessmentID  string    \`json:"assessment_id"\`
    SubmittedAt   time.Time \`json:"submitted_at"\`
}

func (e AssessmentCompleted) Topic() string {
    return "assessment.completed"
}`,
    },
    {
      file: "analysis-worker/internal/usecase/process.go",
      language: "go",
      href: "https://github.com/WIS-futureguide",
      caption: "Idempotent consumer — action + marker in one Tx",
      code: `func (u *Processor) Handle(ctx context.Context, evt events.AssessmentCompleted) error {
    return u.tx.InTx(ctx, func(tx *sqlx.Tx) error {
        ok, err := u.processed.Mark(ctx, tx, "analysis-worker", evt.CorrelationID)
        if err != nil { return err }
        if !ok { return nil } // already processed — drop
        return u.scoring.Run(ctx, tx, evt.AssessmentID)
    })
}`,
    },
  ],
};
