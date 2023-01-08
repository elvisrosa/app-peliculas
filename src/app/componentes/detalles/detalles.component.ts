import { Component, Input, OnInit } from '@angular/core';
import { MoviesservicesService } from 'src/app/servicios/moviesservices.service';
import { PeliculaDetalle, Cast, peliculas } from '../../interfaces/movies';
import { ModalController } from '@ionic/angular';
import { DatalocalService } from '../../servicios/datalocal.service';
import { exists } from 'fs';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {

  @Input() id: number;
  detallePelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';
  agregar='add-outline';

  opciones = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  }

  constructor(private _servicio: MoviesservicesService,
    private modalCtr: ModalController,
    private _servicioData: DatalocalService) { }


  ngOnInit() {
    this._servicioData.existePeli(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline');
    this._servicio.getDetallePelicula(this.id).subscribe(resp => {
      this.detallePelicula = resp;
    });


    this._servicio.getActoresPelicula(this.id).subscribe(resp => {
      this.actores = resp.cast;
    });
  }


  regresar() {
    this.modalCtr.dismiss();
  }

  favorito() {
    const existe = this._servicioData.agregarElminarFavorito(this.detallePelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
    this.agregar = (existe) ? 'checkmark-outline' : 'add-outline'
  }
}
