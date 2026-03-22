import { NextResponse } from "next/server";
import { rateComponent } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json();
  const { id, rating, comment } = body;

  if (!id || !rating || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "id und rating (1-5) sind Pflicht" },
      { status: 400 }
    );
  }

  const updated = await rateComponent(id, rating, comment || "");
  if (!updated) {
    return NextResponse.json(
      { error: "Komponente nicht gefunden" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}
