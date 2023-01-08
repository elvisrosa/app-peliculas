import { Component, Input, OnInit, NgModule } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { peliculas } from 'src/app/interfaces/movies';
import config from '../../../../capacitor.config';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slidershow-backdrop',
  templateUrl: './slidershow-backdrop.component.html',
  styleUrls: ['./slidershow-backdrop.component.scss'],
})
export class SlidershowBackdropComponent implements OnInit {


  @Input() peliculas:peliculas[]=[];

  slidesOpts={
    slidesPerView:1.3,
    freeMode: true
  }
 
  constructor(private ctr:ModalController) { }

  ngOnInit(){ 
  }
  async verDatalle(id:number){
    const modal = await this.ctr.create({
      component: DetallesComponent,
      componentProps: {
        id
      }
    })

    modal.present();

  }
  

}
