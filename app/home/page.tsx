"use client"

import MovieCard from '@/components/movie-card';
import SiteNav from '../../components/navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios.get('/api/movies')
      .then(response => {
        setMovies(response.data)
      }
    )
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="container justify-center min-h-screen px-4 grid grid-rows-[auto_1fr_auto] gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-4 w-full">
          <header className="w-full flex gap-4 justify-between items-center sm:items-start">
            <SiteNav />
          </header>
          <h1 className="text-4xl font-bold">Home</h1>
          <div className="grid grid-cols-4 gap-4">
            {
              movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))
            }
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          
        </footer>
      </div>
    
  );
}