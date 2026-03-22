"use client";

import { useState } from "react";

export function RatingPanel({
  componentId,
  initialRating,
  initialComment,
}: {
  componentId: string;
  initialRating: number | null;
  initialComment: string | null;
}) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState(initialComment || "");
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
        body: JSON.stringify({ id: componentId, rating, comment }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="star-rating flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(null)}
              className={`text-lg transition-colors ${
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
        rows={2}
        className="w-full bg-surface border border-border rounded px-2 py-1.5 text-xs text-foreground placeholder:text-muted/40 resize-none focus:outline-none focus:border-accent/50 transition-colors"
      />
    </div>
  );
}
