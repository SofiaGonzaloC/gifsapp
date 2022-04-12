import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial    : string[] = [];
  private _apiKey       : string = '8Cj2M7PoQWMqd9XfI4j5oLtCLyKZ6e70';
  private _servicioUrl  : string = 'https://api.giphy.com/v1/gifs';

  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = ''){

    query = query.trim().toLowerCase(); // Mantiene el valor siempre en minuscula
    
    if(!this._historial.includes(query)){ // Checa si ya esta el valor por agregar
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10); // Solo obtiene los ultimos 10 resultados
      
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query)

    console.log(params)
    
    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params })
    .subscribe((resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
  }
}
