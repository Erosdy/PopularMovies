export interface IMovie {
    id: number;
    title: string;
    adulte: boolean;
    genre_ids: number[];
    backdrop_path: string;
    poster_path: string;
    file_size: number;
    original_language: string;
    original_title: string;
    overview: string;
    release_date: string;
}