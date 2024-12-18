import { Injectable } from '@angular/core';
import { tmdbAPI } from '../../../environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';
import { IMidia, IMovie, IMovieInfo } from '../../shared/models/movie.interface';

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


  constructor(private http: HttpClient) { }

  getPopulars(): Observable<any> {
    return this.http.get<any>(`${baseUrl.api}/movie/popular`, { params: params, headers: this.getHeaders() })
  }

  getLancamentos(): Observable<any> {
    return this.http.get<any>(`${baseUrl.api}/movie/now_playing`, { params: params, headers: this.getHeaders() })
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl.api}/movie/${id}/videos`, { params: params, headers: this.getHeaders() })
  }

  getByDescricao(search: string): Observable<any> {
    return this.http.get<any>(`${baseUrl.api}/search/movie?query=${search}`, { params: params, headers: this.getHeaders() })
  }

  getProvidersById(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl.api}/movie/${id}/watch/providers`, { params: params, headers: this.getHeaders() })
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
