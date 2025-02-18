import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { MovieCardProps } from "@/lib/types";
import "./index.css";
import formatDate from "@/lib/format-date";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const router = useRouter();
  const handleMovieClick = () => {
    router.push(`/movies/${movie._id}`);;
  };

  return (
    <div onClick={handleMovieClick} data-id={movie._id} className="flex flex-col gap-4 items-start movie-card cursor-pointer">
      <Image src={movie.poster} alt={movie.title} 
        width={300}
        height={200}
        className='rounded-lg object-cover overflow-hidden aspect-video'
        style={{ maxWidth: '100%', height: '100%' }} />
      <h1>{movie.title}</h1>
      <p>{movie.plot}</p>

      <div className="flex gap-4 justify-between w-full">
        <p>{formatDate(new Date(movie.released))}</p>
        <p>{movie.imdb.rating}</p>
        
      </div>
    </div>
  );
}

export default MovieCard;