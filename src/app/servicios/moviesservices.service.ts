import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { respuesta, PeliculaDetalle, RespuestaCredits, Genre, peliculas } from '../interfaces/movies';

const URL = environment.url;
const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class MoviesservicesService {

  constructor(private http: HttpClient) { }
  pagina: number = 0;
  generos: Genre[] = [];

  private ejecutarQuery<T>(query: string) {
    query = URL + query;
    query += `&api_key=${apiKey}&language=es&include_image_language=es`;
    return this.http.get<T>(query);
  }

  getPopularities() {
    this.pagina++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.pagina}`;
    return this.ejecutarQuery<respuesta>(query);
  }

  getFeature() {
    return this.ejecutarQuery<respuesta>(`/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`);
    //return this.http.get<respuesta>(`${url}/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=${apiKey}&language=es&include_image_language=es`);
  }


  getDetallePelicula(id: number) {
    //return this.http.get<respuesta>(`${URL}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}&language=es&include_image_language=es/movie/${id}`);
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`);
  }

  getActoresPelicula(id: number) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`);
  }

  getSearchMovie(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }

    cargarPorGeneros():Promise<Genre[]> {
    //ccreo una promesa
    return new Promise(resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`)
      .subscribe((resp:any) => {
        this.generos = resp['genres'];
        resolve(this.generos);
      });
    })
  };

  cargarTendencias(){
    return this.ejecutarQuery<respuesta>(`/trending/all/week?a=1`);
  }



}
