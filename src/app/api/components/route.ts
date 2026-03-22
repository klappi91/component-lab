import { NextResponse } from "next/server";
import { getComponents, getPairs } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode");

  if (mode === "pairs") {
    const pairs = await getPairs();
    return NextResponse.json(pairs);
  }

  const components = await getComponents();
  return NextResponse.json(components);
}
