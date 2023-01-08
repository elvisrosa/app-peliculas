import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { peliculas } from 'src/app/interfaces/movies';
import { DetallesComponent } from '../detalles/detalles.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slides-pares',
  templateUrl: './slides-pares.component.html',
  styleUrls: ['./slides-pares.component.scss'],
})
export class SlidesParesComponent implements OnInit {

  @Input() peliculas: peliculas[] = [];
  @Output() cargarMas = new EventEmitter();

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  }
  constructor(private ctr: ModalController) { }

  ngOnInit() { }

  onClick() {
    this.cargarMas.emit();
  }

  async verDatalle(id: number) {
    const modal = await this.ctr.create({
      component: DetallesComponent,
      componentProps: {
        id
      }
    })
    modal.present();
  }

}
