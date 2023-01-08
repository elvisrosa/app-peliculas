import { Component } from '@angular/core';
import { prependListener } from 'process';
import { peliculas } from '../interfaces/movies';
import { MoviesservicesService } from '../servicios/moviesservices.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  peliculasReciente: peliculas[] = [];
  populares: peliculas[] = [];
  peliculaTendencias:peliculas[]=[];

  constructor(private _servicio: MoviesservicesService) { }

  ngOnInit() {
    this._servicio.getFeature().subscribe((resp) => {
      this.peliculasReciente = resp.results;
      //console.log(this.peliculasReciente)
    });
    this.cargarPopulares();
    this.cargarTendencias();

  }

  cargarMas(){
    this.cargarPopulares();
  }

  cargarPopulares(){
    this._servicio.getPopularities().subscribe(resp=>{
      const arrTmp = [...this.peliculasReciente	, ...resp.results];
      this.populares=arrTmp;
      console.log(this.populares)
    })
  }

  cargarTendencias(){
    this._servicio.cargarTendencias().subscribe(resp=>{
      this.peliculaTendencias=resp.results;
    });
  }

}
