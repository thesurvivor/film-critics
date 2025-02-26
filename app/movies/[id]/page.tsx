"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { MovieDetailProps } from "@/lib/types";
import SiteNav from "@/components/navbar";
import formarDate from "@/lib/format-date";

export default function MovieDetail() {
  const { id } = useParams();
  const [movieInfo, setMovieInfo] = useState<MovieDetailProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/movies/${id}`)
      .then((response) => {
        setMovieInfo(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hata:", err);
        setError("Film bulunamadı");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  if (!movieInfo) return <p>Film bilgisi bulunamadı</p>;

  return (
    <div className="container justify-center min-h-screen px-4 grid grid-rows-[auto_1fr_auto] gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 w-full">
        <header className="w-full flex gap-4 justify-between items-center sm:items-start">
          <SiteNav />
        </header>
        <h1 className="text-4xl font-bold">{movieInfo.title}</h1>
        <div className="flex gap-4">
          <div className="flex flex-col shrink-0">
            {movieInfo.poster ? (
              <Image
                src={movieInfo.poster}
                alt={movieInfo.title}
                width={300}
                height={200}
                className="rounded-lg object-contain"
                style={{ maxWidth: "100%", height: "100%" }}
              />
            ) : (
              <div className="w-[300px] h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p>Resim Yok</p>
              </div>
            )}
            <p>
              {movieInfo.released
                ? formarDate(new Date(movieInfo.released))
                : "Tarih belirtilmemiş"}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <p>{movieInfo.fullplot || "Detaylı açıklama bulunmuyor"}</p>
            <p>IMDB: {movieInfo.imdb?.rating || "Puan bilgisi yok"}</p>

            <div className="flex flex-col gap-4">
              <h3>Cast:</h3>
              <ul>
                {movieInfo.cast?.map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
