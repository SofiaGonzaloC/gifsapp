import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private _api      : string = '8Cj2M7PoQWMqd9XfI4j5oLtCLyKZ6e70';

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = ''){

    query = query.trim().toLowerCase(); // Mantiene el valor siempre en minuscula

    if(!this._historial.includes(query)){ // Checa si ya esta el valor por agregar
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10); // Solo obtiene los ultimos 10 resultados
    }

    console.log(this._historial)
  }
}
