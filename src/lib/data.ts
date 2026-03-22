import { promises as fs } from "fs";
import path from "path";
import type { ComponentEntry, ComponentPair } from "./types";

const DATA_PATH = path.join(process.cwd(), "components.json");

export async function getComponents(): Promise<ComponentEntry[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveComponents(components: ComponentEntry[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(components, null, 2), "utf-8");
}

export async function getComponentById(id: string): Promise<ComponentEntry | undefined> {
  const components = await getComponents();
  return components.find((c) => c.id === id);
}

export async function getPairs(): Promise<ComponentPair[]> {
  const components = await getComponents();
  const pairMap = new Map<string, ComponentEntry[]>();

  for (const comp of components) {
    const existing = pairMap.get(comp.pair_id) || [];
    existing.push(comp);
    pairMap.set(comp.pair_id, existing);
  }

  const pairs: ComponentPair[] = [];
  for (const [pair_id, variants] of pairMap) {
    const first = variants[0];
    pairs.push({
      pair_id,
      type: first.type,
      category: first.category,
      created: first.created,
      branche: first.branche,
      persona: first.persona,
      variants,
    });
  }

  // Unbewertete zuerst, dann nach Datum absteigend
  pairs.sort((a, b) => {
    const aRated = a.variants.every((v) => v.human_rating !== null);
    const bRated = b.variants.every((v) => v.human_rating !== null);
    if (aRated !== bRated) return aRated ? 1 : -1;
    return b.created.localeCompare(a.created);
  });

  return pairs;
}

export async function rateComponent(
  id: string,
  rating: number,
  comment: string
): Promise<ComponentEntry | null> {
  const components = await getComponents();
  const idx = components.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  components[idx].human_rating = rating;
  components[idx].human_comment = comment || null;
  await saveComponents(components);
  return components[idx];
}
