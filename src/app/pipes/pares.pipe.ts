import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

  //Transforma el arreglo en pares de arreglo
  //PAra poder mostrar imagenes de 2 en 2
  transform( arr: any[] ): any[] {

    const pares = arr.reduce( (result, value, index, array) => {

      if ( index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);


    return pares;
 }

}
