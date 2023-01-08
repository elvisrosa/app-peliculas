import { Component, ɵdevModeEqual } from '@angular/core';
import { MoviesservicesService } from '../servicios/moviesservices.service';
import { peliculas } from '../interfaces/movies';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../componentes/detalles/detalles.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private _servicio: MoviesservicesService, private ctr: ModalController) { }
  peliculas: peliculas[] = [];
  cargando = false;
  textBuscar = '';


  ideas = {
      nombre: [
        'Avenger',
        'Spiderman',
        'El señor de los anillos',
        'La vida es bella'
      ],
      img:[
        'Hola',
        'Hola',
        'hola',
        'hola'
      ]   
    
}

buscar(even: any) {
  this.cargando = true;
  this.textBuscar = even.detail.value;
  if (this.textBuscar.length === 0) {
    this.cargando = false;
    this.peliculas = [];
    return;
  }
  this._servicio.getSearchMovie(this.textBuscar).subscribe((resp: any) => {
    this.peliculas = resp['results'];
    this.cargando = false;
  });
}

  async verDetalle(id: number) {
  const modal = await this.ctr.create({
    component: DetallesComponent,
    componentProps: {
      id
    }
  })
  modal.present();
}



}
