import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import type { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id
    if (!id) {
      return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });

    if (!movie) {
      return NextResponse.json({ error: "Film bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Film getirilemedi" }, { status: 500 });
  }
}
