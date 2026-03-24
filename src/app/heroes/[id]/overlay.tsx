"use client";

import { useState } from "react";
import Link from "next/link";
import type { JudgeVerdict } from "@/lib/types";

type OverlayProps = {
  component: {
    id: string;
    pair_id: string;
    type: string;
    category: string;
    categoryLabel: string;
    persona: string;
    branche: string;
    model: string;
    skills_requested?: string[];
    skills_loaded?: string[];
    skills_detected: string[];
    human_rating: number | null;
    human_comment: string | null;
    judge_claude?: JudgeVerdict | null;
    judge_codex?: JudgeVerdict | null;
    created: string;
  };
};

export function HeroOverlay({ component }: OverlayProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(component.human_rating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState(component.human_comment || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const displayRating = hoverRating ?? rating;

  async function save() {
    if (!rating) return;
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: component.id, rating, comment }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/80 transition-all"
      >
        {open ? "✕" : "◇"}
      </button>

      {/* Overlay Panel */}
      {open && (
        <div className="fixed inset-y-0 right-0 z-40 w-80 bg-background/95 backdrop-blur-md border-l border-border overflow-y-auto">
          <div className="p-5 pt-16 space-y-6">
            {/* Nav */}
            <div className="flex items-center gap-2 text-xs">
              <Link href="/" className="text-muted hover:text-foreground transition-colors">
                Gallery
              </Link>
              <span className="text-border">→</span>
              <Link
                href={`/compare/${component.pair_id}`}
                className="text-muted hover:text-foreground transition-colors"
              >
                {component.pair_id}
              </Link>
              <span className="text-border">→</span>
              <span className="text-foreground font-mono">{component.id}</span>
            </div>

            {/* Meta */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-mono text-muted uppercase tracking-widest">
                Metadaten
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted block">Kategorie</span>
                  <span>{component.categoryLabel}</span>
                </div>
                <div>
                  <span className="text-muted block">Typ</span>
                  <span>{component.type}</span>
                </div>
                <div>
                  <span className="text-muted block">Persona</span>
                  <span>{component.persona}</span>
                </div>
                <div>
                  <span className="text-muted block">Branche</span>
                  <span>{component.branche}</span>
                </div>
                <div>
                  <span className="text-muted block">Model</span>
                  <span className="font-mono">{component.model}</span>
                </div>
                <div>
                  <span className="text-muted block">Datum</span>
                  <span className="font-mono">{component.created}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono text-muted uppercase tracking-widest">
                Skills
              </h3>
              <div>
                <span className="text-[10px] text-muted block mb-1">Geladen</span>
                <div className="flex flex-wrap gap-1">
                  {(component.skills_loaded || component.skills_requested || []).map((s) => (
                    <span key={s} className="text-[10px] font-mono bg-accent/10 text-accent px-1.5 py-0.5 rounded">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {component.skills_detected.length > 0 && (
                <div>
                  <span className="text-[10px] text-muted block mb-1">Erkannt</span>
                  <div className="flex flex-wrap gap-1">
                    {component.skills_detected.map((s) => (
                      <span key={s} className="text-[10px] font-mono bg-success/10 text-success px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Judges */}
            {(component.judge_claude || component.judge_codex) && (
              <div className="space-y-3">
                <h3 className="text-[10px] font-mono text-muted uppercase tracking-widest">
                  AI Judges
                </h3>
                {component.judge_claude && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-purple-400">Claude</span>
                      <span className={`text-[10px] font-mono ${component.judge_claude.winner ? "text-success" : "text-danger"}`}>
                        {component.judge_claude.winner ? "WINNER" : "—"}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      {component.judge_claude.reasoning}
                    </p>
                  </div>
                )}
                {component.judge_codex && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-cyan-400">Codex</span>
                      <span className={`text-[10px] font-mono ${component.judge_codex.winner ? "text-success" : "text-danger"}`}>
                        {component.judge_codex.winner ? "WINNER" : "—"}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted leading-relaxed">
                      {component.judge_codex.reasoning}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Rating */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-mono text-muted uppercase tracking-widest">
                Bewertung
              </h3>
              <div className="flex items-center gap-3">
                <div className="star-rating flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className={`text-xl transition-colors ${
                        displayRating && star <= displayRating
                          ? "text-amber-400"
                          : "text-border hover:text-amber-400/50"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <button
                  onClick={save}
                  disabled={!rating || saving}
                  className="text-[10px] font-mono px-2 py-1 rounded bg-accent/20 text-accent hover:bg-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  {saving ? "..." : saved ? "✓" : "Speichern"}
                </button>
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Warum? (optional)"
                rows={3}
                className="w-full bg-surface border border-border rounded px-2 py-1.5 text-xs text-foreground placeholder:text-muted/40 resize-none focus:outline-none focus:border-accent/50 transition-colors"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
