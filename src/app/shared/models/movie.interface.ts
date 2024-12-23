import { Observable, Subscribable, Subscription } from "rxjs";

export interface IMovieInfo {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    midia?: IMidia
}

export interface IMovie {
    id: string,
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: string,
}

export interface IMidia{
    imgBig: string,
    imgSmall: string,
    post: string,
    clip: string
}