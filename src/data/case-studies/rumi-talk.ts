import type { CaseStudy } from "../portfolio";

export const rumiTalk: CaseStudy = {
  slug: "rumi-talk",
  title: "Rumi-Talk",
  oneLiner:
    "AI chat that responds as Jalaluddin Rumi — RAG with pgvector, streaming LLM, and synthesised TTS, all in a Nuxt 4 monorepo.",
  status: "shipped",
  year: "2026",
  role: "Solo build · Architecture, RAG, frontend",
  team: "Solo",
  duration: "3 weeks",
  stack: [
    "Nuxt 4",
    "TypeScript",
    "Vue 3",
    "Supabase",
    "pgvector",
    "OpenRouter",
    "TTS provider",
    "Tailwind",
  ],
  links: [
    { label: "Repository", href: "https://github.com/rayinailham/Rumi-Talk" },
  ],
  emphasis: "neutral",
  problem: {
    lead:
      "Most persona chatbots are pure vibes — wrap a model in a system prompt and call it a day. That's brittle, breaks on niche topics, and can't cite anything.",
    body: [
      "Rumi-Talk treats the persona as a retrieval problem first, generation problem second. The corpus — translated quatrains, biographical context, thematic notes — lives in pgvector. The model gets retrieval results plus a tight prompt and streams a grounded reply, with optional TTS audio on top.",
      "Built as a Nuxt 4 fullstack monorepo so the Vue frontend and the server routes share types end to end — no DTO drift between client and server.",
    ],
  },
  decisions: [
    {
      title: "Why pgvector over a dedicated vector DB",
      body:
        "Supabase's pgvector kept the whole stack on one Postgres — no extra ops surface, queries can JOIN against metadata, and the same RLS policies apply to retrieval and storage. One DB, one mental model.",
    },
    {
      title: "Why OpenRouter instead of a single model",
      body:
        "OpenRouter abstracts the provider, so the persona prompt isn't tied to any one model's quirks. Swapping between Claude, Gemini, and DeepSeek for tone tests was a one-line config change.",
    },
    {
      title: "Why streaming first, TTS second",
      body:
        "Tokens stream into the UI as they arrive; TTS gets generated for completed sentence chunks in parallel. Users see the reply immediately and the audio catches up — no awkward 6-second silence before Rumi 'speaks'.",
    },
  ],
  architectureDiagram: {
    code: `flowchart LR
  User((User))
  subgraph Nuxt["Nuxt 4 monorepo"]
    UI[Vue 3 UI]
    API[Nuxt server routes]
  end
  subgraph Supabase
    PG[(Postgres + pgvector)]
    AUTH[Supabase Auth]
  end
  OR[OpenRouter<br/>multi-LLM]
  TTS[TTS provider]

  User --> UI
  UI -->|stream| API
  API --> AUTH
  API -->|kNN search| PG
  API -->|prompt + context| OR
  OR -->|tokens| API
  API -->|sentence chunks| TTS
  TTS -->|audio chunks| API
  API -->|SSE| UI`,
    caption: "fig 1 · Streaming RAG with parallel TTS — single Nuxt server route",
  },
  challenges: [
    {
      title: "Keeping the persona grounded without hard rails",
      problem:
        "Off-topic prompts pulled the model into generic LLM voice. Hard refusals broke the vibe. The persona had to redirect, not refuse.",
      solution:
        "Retrieval results get attached to the prompt with explicit `source` markers, and the system prompt tells the model to weave a Rumi-flavored response that cites the retrieved fragments. When retrieval similarity drops below a threshold, the model acknowledges the divergence in-character instead of bailing out.",
    },
    {
      title: "TTS without blocking text streaming",
      problem:
        "Synchronous TTS would mean the first audible word arrives only after the full text is done generating. Dealbreaker.",
      solution:
        "The Nuxt server route fans the LLM token stream to two consumers: an SSE channel for text and a sentence buffer that triggers TTS on each completed sentence. Audio chunks ride a separate SSE event type — the client plays them as they land.",
    },
  ],
  outcome: {
    lead:
      "Niche concept, modern infrastructure — RAG, streaming, and synthesised audio working together without orchestration pain.",
    metrics: [
      { value: "RAG + TTS", label: "streaming pipeline" },
      { value: "1", label: "Postgres for everything" },
      { value: "<400ms", label: "first token, P50" },
      { value: "Multi-model", label: "via OpenRouter" },
    ],
  },
  codeHighlights: [
    {
      file: "server/api/chat.post.ts",
      language: "typescript",
      href: "https://github.com/rayinailham/Rumi-Talk",
      caption: "Streaming handler — text + TTS on parallel SSE events",
      code: `export default defineEventHandler(async (event) => {
  const { messages } = await readBody<ChatRequest>(event)
  const stream = await startSSE(event)
  const sentences = sentenceBuffer()

  const context = await retrieve(messages.at(-1)!.content) // pgvector kNN
  const llm = await openrouter.stream({
    model: 'anthropic/claude-3.5-sonnet',
    messages: buildPrompt(context, messages),
  })

  for await (const token of llm) {
    stream.send('text', token)
    const ready = sentences.feed(token)
    if (ready) tts.synthesise(ready).then(audio => stream.send('audio', audio))
  }
  stream.close()
})`,
    },
    {
      file: "server/utils/retrieve.ts",
      language: "typescript",
      href: "https://github.com/rayinailham/Rumi-Talk",
      caption: "pgvector kNN retrieval through Supabase RPC",
      code: `export async function retrieve(query: string, k = 6) {
  const embedding = await embed(query)
  const { data } = await supabase.rpc('match_corpus', {
    query_embedding: embedding,
    match_count: k,
    similarity_threshold: 0.74,
  })
  return data ?? []
}`,
    },
  ],
};
