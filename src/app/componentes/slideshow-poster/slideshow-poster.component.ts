import { Component, Input, OnInit } from '@angular/core';
import { peliculas } from '../../interfaces/movies';
import { ModalController } from '@ionic/angular';
import { DetallesComponent } from '../detalles/detalles.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas:peliculas[]=[];
  
  slidesOpts={
    slidesPerView:3.3,
    freeMode: true
  }

  constructor(private ctr: ModalController) { }

  ngOnInit() {}

  async verDetalle(id:number){
    const modal = await this.ctr.create({
      component: DetallesComponent,
      componentProps:{
        id
      }
    });
    modal.present();  
  }

}
