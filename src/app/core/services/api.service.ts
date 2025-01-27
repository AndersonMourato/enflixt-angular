import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { tmdbAPI } from '../../../environment';
import { IMidia, IMovie, IMovieInfo, IProviders, IResult } from '../../shared/models/movie.interface';

const baseUrl = {
  api: 'https://api.themoviedb.org/3',
  image: 'https://image.tmdb.org/t/p/w',
  trailer: 'https://www.youtube.com/watch?v=',
  providers: 'https://api.themoviedb.org/3/movie/{movie_id}/watch/providers'
}

const params = new HttpParams()
  .set('api_key', tmdbAPI.kay)
  .set('language', 'pt-BR')
  .set('region', 'BR')

@Injectable({
  providedIn: 'root'
})
export class APIService {

  categoriasMap = {
    acao: 28,
    comedia: 35,
    terror: 27,
    romance: 10749,
  };

  constructor(private http: HttpClient) { }

  getPopulars(): Observable<IMovieInfo[]> {
    return this.http.get<any>(`${baseUrl.api}/movie/popular`, { params: params, headers: this.getHeaders() })
    .pipe(map(resp => resp.results))
  }

  getLancamentos(): Observable<IMovieInfo[]> {
    return this.http.get<any>(`${baseUrl.api}/movie/now_playing`, { params: params, headers: this.getHeaders() })
    .pipe(map(resp => resp.results))
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl.api}/movie/${id}/videos`, { params: params, headers: this.getHeaders() })
  }

  searchByDescricao(search: string, page: number): Observable<IResult> {
    return this.http.get<any>(`${baseUrl.api}/search/movie?query=${search}&page=${page}`, { params: params, headers: this.getHeaders() })
    .pipe(
      mergeMap((resp) => {
        const moviesWithMidias$ = resp.results.map((movie: IMovieInfo) => {
          return this.getMidia(movie).pipe(
            map((midia: any) => ({
              ...movie,
              midia: midia
            }))
          );
        });

        // Combina todos os Observables em um único Observable
        return forkJoin(moviesWithMidias$).pipe(
          map((results) => ({ ...resp, results }))
        );

      })
    )
  }

  getProvidersById(id: number): Observable<IProviders[]> {
    return this.http.get<any>(`${baseUrl.api}/movie/${id}/watch/providers`, { params: params, headers: this.getHeaders() })
    .pipe(map(resp => {
      if(resp.results.BR){
        return resp.results.BR.rent || resp.results.BR.buy || resp.results.BR.flatrate
      }
      else if(resp.results.US){
        return resp.results.US.rent || resp.results.US.buy || resp.results.US.flatrate
      }
      else{
        return []
        }
      }))
      .pipe(map((resp: any) => {
        return resp.map((provider: IProviders) => {
        return {
          logo_path: `${baseUrl.image}45${provider.logo_path}`,
          provider_id: provider.provider_id,
          provider_name: provider.provider_name,
          display_priority: provider.display_priority
        }
        });
      }));
      }


  getMidia(movieInfo: IMovieInfo): Observable<IMidia> {
    const midia: IMidia = {
      imgBig: `${baseUrl.image}500${movieInfo.backdrop_path}`,
      imgSmall: `${baseUrl.image}200${movieInfo.backdrop_path}`,
      post: `${baseUrl.image}500${movieInfo.poster_path}`,
      clip: ``
    }

    return this.getById(movieInfo.id).pipe(map((resp) => {
      if (resp.results) {
        const trailer = resp.results.find((movie: IMovie) => movie.type === 'Trailer')
        midia.clip = trailer ? baseUrl.trailer + trailer.key : "";
      }
      return midia
    }))
  }


  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${tmdbAPI.token}`, // Token Bearer
      'Content-Type': 'application/json;charset=utf-8',
    });
  }
}
