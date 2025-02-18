import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const movie = await db.collection("movies").findOne({ _id: new ObjectId(params.id) });

    if (!movie) {
      return NextResponse.json({ error: "Film bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(movie, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Film getirilemedi" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { title, year, genre } = body;

    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const updatedMovie = await db.collection("movies").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { title, year, genre } }
    );

    return NextResponse.json(updatedMovie, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Film güncellenemedi" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    const deletedMovie = await db.collection("movies").deleteOne({ _id: new ObjectId(params.id) });

    if (deletedMovie.deletedCount === 0) {
      return NextResponse.json({ error: "Film bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ message: "Film silindi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Film silinemedi" }, { status: 500 });
  }
}
