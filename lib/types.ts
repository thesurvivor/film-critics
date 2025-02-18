export interface MovieCardProps {
    movie: {
        _id: number;
        title: string;
        poster: string;
        released: string;
        plot: string;
        onClick: () => void;
        imdb: {
            rating: number;
            votes: number;
            id: string;
        };
    }

}

export interface MovieDetailProps {
    params: {
        _id: string;
        title: string;
        poster: string;
        released: string;
        plot: string;
        fullplot: string;
        genres: string[];
        directors: string[];
        writers: string[];
        cast: string[];
        countries: string[];
        awards: {
            wins: number;
            nominations: number;
            text: string;
        };
        imdb: {
            rating: number;
            votes: number;
            id: string;
        };
    }

}