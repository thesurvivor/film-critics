import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface parameters {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, params: { id: string }) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movie = await db.collection("movies").findOne(
      { _id: new ObjectId(params.id) },
      { projection: { _id: 1, title: 1, poster: 1, released: 1, plot: 1, fullplot: 1, genres: 1, directors: 1, writers: 1, cast: 1, countries: 1, awards: 1, imdb: 1 } }
    );

    if (!movie) {
      return NextResponse.json({ error: "Film bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Film getirilemedi" }, { status: 500 });
  }
}
