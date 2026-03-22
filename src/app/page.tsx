import Link from "next/link";
import { getPairs } from "@/lib/data";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/types";
import type { ComponentPair } from "@/lib/types";

function StarDisplay({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-muted text-xs">—</span>;
  return (
    <span className="text-amber-400 text-sm tracking-wider">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

function JudgeBadge({ pair }: { pair: ComponentPair }) {
  const variants = pair.variants;
  const hasJudge = variants.some((v) => v.judge_claude || v.judge_codex);
  if (!hasJudge) return null;

  const claudeWinners = variants.filter((v) => v.judge_claude?.winner).map((v) => v.id);
  const codexWinners = variants.filter((v) => v.judge_codex?.winner).map((v) => v.id);

  const disagree =
    claudeWinners.length > 0 &&
    codexWinners.length > 0 &&
    JSON.stringify(claudeWinners.sort()) !== JSON.stringify(codexWinners.sort());

  if (disagree) {
    return (
      <span className="bg-warning/20 text-warning text-[10px] font-mono px-1.5 py-0.5 rounded">
        DISAGREEMENT
      </span>
    );
  }

  return (
    <span className="bg-success/20 text-success text-[10px] font-mono px-1.5 py-0.5 rounded">
      CONSENSUS
    </span>
  );
}

function PairCard({ pair }: { pair: ComponentPair }) {
  const isUnrated = pair.variants.some((v) => v.human_rating === null);
  const catLabel = CATEGORY_LABELS[pair.category] || pair.category;
  const catColor = CATEGORY_COLORS[pair.category] || "bg-gray-500/20 text-gray-400";

  return (
    <Link
      href={`/compare/${pair.pair_id}`}
      className="group block bg-surface border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all duration-300"
    >
      {/* Screenshot Previews */}
      <div className="grid grid-cols-2 gap-px bg-border">
        {pair.variants.map((v) => (
          <div key={v.id} className="aspect-video bg-surface-hover relative overflow-hidden">
            {v.screenshots.desktop ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={v.screenshots.desktop}
                alt={v.id}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted font-mono text-xs">{v.id}</span>
              </div>
            )}
            {/* Variant label */}
            <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-[10px] font-mono px-1.5 py-0.5 rounded">
              {v.id.endsWith("-a") ? "A" : v.id.endsWith("-b") ? "B" : v.id.split("-").pop()?.toUpperCase()}
            </span>
            {/* Rating */}
            <div className="absolute bottom-2 left-2">
              <StarDisplay rating={v.human_rating} />
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0 ${catColor}`}>
              {catLabel}
            </span>
            <span className="text-xs text-muted truncate">{pair.branche}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <JudgeBadge pair={pair} />
            {isUnrated && (
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted font-mono">
          <span>{pair.persona}</span>
          <span>{pair.created}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function GalleryPage() {
  const pairs = await getPairs();

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-baseline justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Component Lab</h1>
              <p className="text-muted text-sm mt-1">
                Autonomes Creative Research Lab
              </p>
            </div>
            <div className="text-right font-mono text-xs text-muted">
              <div>{pairs.length} Paare</div>
              <div>
                {pairs.filter((p) => p.variants.some((v) => v.human_rating === null)).length} unbewertet
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {pairs.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-6 opacity-20">◇</div>
            <h2 className="text-xl font-light text-muted mb-2">Noch keine Komponenten</h2>
            <p className="text-sm text-muted/60 max-w-md mx-auto">
              Das Lab wartet auf seinen ersten Run. Starte den Cron Job oder erstelle manuell ein Hero-Paar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pairs.map((pair) => (
              <PairCard key={pair.pair_id} pair={pair} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
