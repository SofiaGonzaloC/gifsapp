import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];
  private _api      : string = '8Cj2M7PoQWMqd9XfI4j5oLtCLyKZ6e70';

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ){}

  buscarGifs(query: string = ''){

    query = query.trim().toLowerCase(); // Mantiene el valor siempre en minuscula

    if(!this._historial.includes(query)){ // Checa si ya esta el valor por agregar
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10); // Solo obtiene los ultimos 10 resultados
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=8Cj2M7PoQWMqd9XfI4j5oLtCLyKZ6e70&q=${query}&limit=10`)
      .subscribe((resp) => {
        console.log(`query ${query}`)
        this.resultados = resp.data;
        resp.data[0].images
      })

    console.log(this._historial)
  }
}
