import { Pipe, PipeTransform } from '@angular/core';
import { url } from 'inspector';
import { environment } from '../../environments/environment';

const URL = environment.imagenPath;

@Pipe({
  name: 'imagen'
})

export class ImagenPipe implements PipeTransform {


  transform(imagen: string, size:string= 'w500'): unknown {

    if(!imagen){
      return './assets/no-imagen-banner.jpg';
    }

    const urlImg = `${URL}/${size}${imagen}`;
    return urlImg;
  }

}
