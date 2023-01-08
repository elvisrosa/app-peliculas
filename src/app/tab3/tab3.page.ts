import { Component, OnInit } from '@angular/core';
import { DatalocalService } from '../servicios/datalocal.service';
import { Genre, PeliculaDetalle, peliculas } from '../interfaces/movies';
import { MoviesservicesService } from '../servicios/moviesservices.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: any[] = [];
  generos: Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(private _servicio: DatalocalService, private _serMov: MoviesservicesService) {
  }

  async ionViewWillEnter() {
    this.peliculas = await this._servicio.cargarFavoritos();
    this.generos = await this._serMov.cargarPorGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);

  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {


    this.favoritoGenero = [];

    generos.forEach(genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres?.find(genre => genre.id === genero.id);
        })
      });

    });
  }




}
