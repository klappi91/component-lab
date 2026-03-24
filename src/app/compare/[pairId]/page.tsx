import Link from "next/link";
import { getPairs } from "@/lib/data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import { RatingPanel } from "./rating-panel";

export default async function ComparePage({
  params,
}: {
  params: Promise<{ pairId: string }>;
}) {
  const { pairId } = await params;
  const pairs = await getPairs();
  const pair = pairs.find((p) => p.pair_id === pairId);

  if (!pair) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl text-muted mb-4">Paar nicht gefunden</h1>
          <Link href="/" className="text-accent hover:text-accent-hover text-sm">
            ← Zurück zur Gallery
          </Link>
        </div>
      </main>
    );
  }

  const catLabel = CATEGORY_LABELS[pair.category] || pair.category;
  const catColor = CATEGORY_COLORS[pair.category] || "bg-gray-500/20 text-gray-400";

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border shrink-0">
        <div className="max-w-[1800px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted hover:text-foreground text-sm transition-colors">
              ← Gallery
            </Link>
            <div className="w-px h-5 bg-border" />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${catColor}`}>
              {catLabel}
            </span>
            <span className="font-mono text-sm">{pair.pair_id}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted font-mono">
            <span>{pair.persona}</span>
            <span>·</span>
            <span>{pair.branche}</span>
            <span>·</span>
            <span>{pair.created}</span>
          </div>
        </div>
      </header>

      {/* Comparison */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-px bg-border">
        {pair.variants.map((variant) => (
          <div key={variant.id} className="bg-background flex flex-col">
            {/* Variant Header */}
            <div className="border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold">
                  {variant.id.endsWith("-a") ? "A" : "B"}
                </span>
                <span className="text-xs text-muted">{variant.model}</span>
                <div className="flex gap-1">
                  {(variant.skills_loaded || variant.skills_requested || []).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono bg-surface px-1.5 py-0.5 rounded text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={`/heroes/${variant.id}`}
                className="text-xs text-accent hover:text-accent-hover transition-colors"
              >
                Fullscreen →
              </Link>
            </div>

            {/* Preview iframe */}
            <div className="flex-1 min-h-[500px] relative bg-surface">
              <iframe
                src={`/heroes/${variant.id}`}
                className="w-full h-full absolute inset-0 border-0"
                title={variant.id}
              />
            </div>

            {/* Judge Verdicts */}
            {(variant.judge_claude || variant.judge_codex) && (
              <div className="border-t border-border p-4 space-y-3">
                {variant.judge_claude && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-purple-400">CLAUDE JUDGE</span>
                      <span className={`text-[10px] font-mono ${variant.judge_claude.winner ? "text-success" : "text-danger"}`}>
                        {variant.judge_claude.winner ? "WINNER" : "—"}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {variant.judge_claude.reasoning}
                    </p>
                  </div>
                )}
                {variant.judge_codex && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400">CODEX JUDGE</span>
                      <span className={`text-[10px] font-mono ${variant.judge_codex.winner ? "text-success" : "text-danger"}`}>
                        {variant.judge_codex.winner ? "WINNER" : "—"}
                      </span>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">
                      {variant.judge_codex.reasoning}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Rating */}
            <div className="border-t border-border p-4">
              <RatingPanel
                componentId={variant.id}
                initialRating={variant.human_rating}
                initialComment={variant.human_comment}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
