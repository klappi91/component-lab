export type Category =
  | "video-hero"
  | "typografie-only"
  | "3d-szene"
  | "editorial"
  | "fullscreen-image"
  | "interaktiv"
  | "generative-art"
  | "scroll-storytelling"
  | "single-element"
  | "collage-mixed-media";

export type ComponentType = "hero" | "section" | "nav" | "footer" | "cta";

export type JudgeVerdict = {
  winner: boolean;
  reasoning: string;
  suggestions: string[];
};

export type ComponentEntry = {
  id: string;
  pair_id: string;
  type: ComponentType;
  category: Category;
  created: string;
  model: string;
  persona: string;
  branche: string;
  brief: string;
  prompt_excerpt: string;
  skills_requested: string[];
  skills_detected: string[];
  assets_generated: string[];
  assets_used: string[];
  screenshots: { mobile: string; desktop: string };
  constitution_version: string;
  inspiration_source: string | null;
  workflow?: string;
  builder_model?: string;
  builder_setup?: string;
  run_id?: string;
  agent_self_rating?: { score: number; reasoning: string } | null;
  human_rating: number | null;
  human_comment: string | null;
  judge_claude: JudgeVerdict | null;
  judge_codex: JudgeVerdict | null;
  judge_consensus: "winner" | "loser" | "both-good" | "both-bad" | null;
  tags: string[];
};

export type ComponentPair = {
  pair_id: string;
  type: ComponentType;
  category: Category;
  created: string;
  branche: string;
  persona: string;
  variants: ComponentEntry[];
};

export const CATEGORY_LABELS: Record<Category, string> = {
  "video-hero": "Video",
  "typografie-only": "Typografie",
  "3d-szene": "3D",
  "editorial": "Editorial",
  "fullscreen-image": "Fullscreen",
  "interaktiv": "Interaktiv",
  "generative-art": "Generativ",
  "scroll-storytelling": "Scroll",
  "single-element": "Single",
  "collage-mixed-media": "Collage",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  "video-hero": "bg-red-500/20 text-red-400",
  "typografie-only": "bg-purple-500/20 text-purple-400",
  "3d-szene": "bg-cyan-500/20 text-cyan-400",
  "editorial": "bg-amber-500/20 text-amber-400",
  "fullscreen-image": "bg-emerald-500/20 text-emerald-400",
  "interaktiv": "bg-pink-500/20 text-pink-400",
  "generative-art": "bg-indigo-500/20 text-indigo-400",
  "scroll-storytelling": "bg-orange-500/20 text-orange-400",
  "single-element": "bg-teal-500/20 text-teal-400",
  "collage-mixed-media": "bg-rose-500/20 text-rose-400",
};
