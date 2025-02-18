import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import axios from 'axios';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix');

    const movies = await db
      .collection('movies')
      .find({poster: { $exists: true }, genres: { $in: ['Action', 'Adventure', 'Science Fiction'] }, year: { $gte: 2000 }})
      .limit(20)
      .toArray();

      const validMovies = await Promise.all(movies.map(async (movie) => {
        try {
          const response = await axios.head(movie.poster);
          return response.status === 200;
        } catch (error) {
          console.error(error);
          return false;
        }
      }));
      const filteredMovies = movies.filter((movie, index) => validMovies[index] && validMovies.length >= 20);
      return NextResponse.json(filteredMovies);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}