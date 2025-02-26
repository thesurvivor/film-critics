import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    // params'ı context nesnesinden alın ve bekleyin
    const { id } = await context.params;

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