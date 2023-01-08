import { Injectable, OnInit } from '@angular/core';
import { PeliculaDetalle, peliculas, respuesta } from '../interfaces/movies';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService implements OnInit{

  async ngOnInit() {
  }
 

  constructor(private data: Storage, private ctr: ToastController) {
                this.cargarFavoritos()
               }
  

  async presentToast(msj:string) {
    const toast = await this.ctr.create({
      message: msj,
      duration: 1000
    });

    await toast.present();
  }

  peliculasFav: PeliculaDetalle[] = [];

  agregarElminarFavorito(p: PeliculaDetalle) {
    let existe = false;
    let mensaje ='';
    //Verificamos su existe
    for (const peli of this.peliculasFav){
      if(peli.id===p.id){
        existe=true;
        break;
      }
    }
    
    if (existe) {
      this.peliculasFav = this.peliculasFav.filter(pelis => pelis.id !== p.id );
      mensaje = 'Removido de mi lista';
    } else {
      mensaje='Agregado a mi lista';
      this.peliculasFav.push(p);
    }

    this.presentToast(mensaje);
    this.data.set('peliculas', this.peliculasFav);
  
    //nos devuelve la negacion de existe para pdoer desmarcar o no el relleno del boton favorito
    return !existe;
  }

  async cargarFavoritos(){
    this.data.create();
    const peliculas = await this.data.get('peliculas');
    this.peliculasFav=peliculas || [];
    return this.peliculasFav;
  }

  async existePeli(id:number){
    await this.cargarFavoritos();
    const existe = this.peliculasFav.find(peli=>peli.id==id);
    return (existe)?true:false;
  }

}
