import { getComponentById } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";
import { HeroOverlay } from "./overlay";

export default async function HeroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const component = await getComponentById(id);

  if (!component) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted">Komponente &quot;{id}&quot; nicht gefunden</p>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      {/* Component content will be rendered here by the actual hero component */}
      <div id="hero-content" className="min-h-screen">
        <div className="min-h-screen flex items-center justify-center bg-surface">
          <div className="text-center space-y-4">
            <p className="font-mono text-muted text-sm">{id}</p>
            <p className="text-xs text-muted/60">
              Hero-Komponente wird hier gerendert
            </p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      <HeroOverlay
        component={{
          id: component.id,
          pair_id: component.pair_id,
          type: component.type,
          category: component.category,
          categoryLabel: CATEGORY_LABELS[component.category] || component.category,
          persona: component.persona,
          branche: component.branche,
          model: component.model,
          skills_requested: component.skills_requested,
          skills_loaded: component.skills_loaded,
          skills_detected: component.skills_detected,
          human_rating: component.human_rating,
          human_comment: component.human_comment,
          judge_claude: component.judge_claude ?? null,
          judge_codex: component.judge_codex ?? null,
          created: component.created,
        }}
      />
    </main>
  );
}
