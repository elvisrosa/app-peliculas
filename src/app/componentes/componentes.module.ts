import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlidershowBackdropComponent } from './slidershow-backdrop/slidershow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlidesParesComponent } from './slides-pares/slides-pares.component';
import { DetallesComponent } from './detalles/detalles.component';



@NgModule({
  entryComponents:[DetallesComponent],
  declarations: [SlidershowBackdropComponent,SlideshowPosterComponent, SlidesParesComponent, DetallesComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    PipesModule
    ],
    exports:[
      SlidershowBackdropComponent,
      SlideshowPosterComponent,
      SlidesParesComponent,
      DetallesComponent
    ]
})
export class ComponentesModule { }
