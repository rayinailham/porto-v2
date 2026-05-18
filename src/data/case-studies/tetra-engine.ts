import type { CaseStudy } from "../portfolio";

export const tetraEngine: CaseStudy = {
  slug: "tetra-engine",
  title: "Tetra Engine",
  oneLiner:
    "Warehouse package recommendation engine — originally AnterAja's technical entrance challenge, now a working microservice.",
  status: "shipped",
  year: "2026",
  role: "Architect · Backend · Dashboard",
  team: "Solo build",
  duration: "6 weeks",
  stack: [
    "Go 1.24",
    "Gin",
    "uber-go/fx",
    "sqlx",
    "lib/pq",
    "Postgres 16",
    "spf13/viper",
    "samber/oops",
    "slog + tint",
    "golang-migrate",
    "Vue 3",
    "Vite",
  ],
  links: [
    { label: "Repository", href: "https://github.com/rayinailham/tetra-engine" },
    { label: "Live dashboard", href: "https://github.com/rayinailham/tetra-engine#dashboard" },
  ],
  emphasis: "warm",
  problem: {
    lead:
      "AnterAja's warehouse operations needed a deterministic package recommendation system that could keep up with Flux WMS without becoming the bottleneck.",
    body: [
      "AnterAja issued this as a technical entrance challenge: build a system that pulls orders from Flux WMS, computes the optimal carton — by volume, weight, and per-item fit — and pushes the recommendation back to Flux. The system had to be idempotent, observable, and never silently double-process a sync window.",
      "What started as a take-home brief became a publishable microservice — released with permission, sharpened past the brief into a Go-first reference implementation for warehouse-grade scheduling.",
    ],
  },
  decisions: [
    {
      title: "Why uber-go/fx over plain DI",
      body:
        "fx gives compile-time wiring with explicit lifecycle hooks. Stage transitions in the scheduler need ordered start/stop semantics — fx.Hook handles graceful shutdown without racing the database pool.",
    },
    {
      title: "Why sqlx over an ORM",
      body:
        "Warehouse logic is query-shaped, not entity-shaped. sqlx keeps the SQL inspectable in `internal/repository/`, reusable across read replicas, and avoids the leaky abstractions that an ORM would introduce on top of a fast-moving schema.",
    },
    {
      title: "Why a 4-stage scheduler",
      body:
        "Sync, plan, recommend, push — each stage is idempotent and resumable from the previous stage's checkpoint. A failure inside `recommend` doesn't replay `sync`, and Flux only ever sees a single push per (order, window) tuple.",
    },
    {
      title: "Why Vue 3 + Vite for the dashboard",
      body:
        "Operations needed a glassmorphism monitoring dashboard, not a CMS. Vite's HMR and Vue's reactivity gave a tight feedback loop while iterating on the metric strip and stage timeline.",
    },
  ],
  architectureDiagram: {
    code: `flowchart LR
  Flux[Flux WMS]
  subgraph Tetra["Tetra Engine"]
    direction TB
    API[Gin API]
    SCH[Scheduler]
    SYNC[Stage 1<br/>Sync]
    PLAN[Stage 2<br/>Plan]
    REC[Stage 3<br/>Recommend]
    PUSH[Stage 4<br/>Push]
    DB[(Postgres 16)]
    OBS[slog + tint<br/>structured logs]
  end
  Dash[Vue 3 Dashboard]

  Flux -->|pull orders| SYNC
  SCH --> SYNC
  SYNC --> PLAN
  PLAN --> REC
  REC --> PUSH
  PUSH -->|recommendation| Flux
  SYNC <--> DB
  PLAN <--> DB
  REC <--> DB
  PUSH <--> DB
  API <--> DB
  Dash <-->|REST| API
  SCH -.-> OBS
  API -.-> OBS`,
    caption: "fig 1 · 4-stage idempotent scheduler with Flux WMS bidirectional sync",
  },
  challenges: [
    {
      title: "Idempotent stage transitions without distributed locks",
      problem:
        "Re-running a stage after a crash had to be safe. Without distributed locks, the simple-but-wrong approach is to mark a stage 'done' before its side effects land — which loses work on partial failures.",
      solution:
        "Each stage commits a checkpoint row in the same transaction that produces its output. If the stage crashes mid-transaction, the checkpoint is never written and the next run resumes cleanly. The push stage uses (order_id, sync_window) as a natural deduplication key when calling Flux.",
    },
    {
      title: "Auto-schema migration without downtime",
      problem:
        "The schema was iterating fast during the entrance challenge. Manually running golang-migrate before each deploy was friction; auto-running migrations on boot risked half-migrated states across replicas.",
      solution:
        "An advisory-lock-gated migration step runs inside fx's startup hook. Only one node holds the lock at a time, the rest wait, and the application doesn't accept traffic until migrations are at the expected version. ServiceVersion is wired into the DI graph so `/healthz` reports the schema state too.",
    },
  ],
  outcome: {
    lead:
      "A small, opinionated Go service that AnterAja's brief now ships to public — observable, idempotent, and ready to slot into a wider warehouse mesh.",
    metrics: [
      { value: "4", label: "stage scheduler" },
      { value: "<2s", label: "cold start incl. fx graph" },
      { value: "0", label: "double-push incidents" },
      { value: "Shipped", label: "May 2026" },
    ],
  },
  codeHighlights: [
    {
      file: "internal/scheduler/runner.go:142",
      language: "go",
      href: "https://github.com/rayinailham/tetra-engine/blob/main/internal/scheduler/runner.go",
      caption: "Stage transition with checkpoint inside the same Tx",
      code: `// Run executes a single stage and persists its checkpoint atomically.
func (r *Runner) Run(ctx context.Context, stage Stage) error {
    return r.tx.InTx(ctx, func(tx *sqlx.Tx) error {
        out, err := stage.Execute(ctx, tx)
        if err != nil {
            return oops.With("stage", stage.Name()).Wrap(err)
        }
        return r.checkpoints.Commit(ctx, tx, Checkpoint{
            Stage:    stage.Name(),
            Window:   out.Window,
            Position: out.Cursor,
            At:       time.Now().UTC(),
        })
    })
}`,
    },
    {
      file: "cmd/tetra/main.go:33",
      language: "go",
      href: "https://github.com/rayinailham/tetra-engine/blob/main/cmd/tetra/main.go",
      caption: "fx graph wiring — ordered lifecycle, no globals",
      code: `func main() {
    fx.New(
        config.Module,
        observability.Module, // slog + tint
        database.Module,      // sqlx pool + golang-migrate
        repository.Module,
        scheduler.Module,     // 4-stage runner
        flux.Module,          // outbound HTTP client
        api.Module,           // Gin server
        fx.Invoke(
            migrations.RunOnStart, // advisory-locked
            scheduler.StartLoop,
        ),
    ).Run()
}`,
    },
  ],
};
