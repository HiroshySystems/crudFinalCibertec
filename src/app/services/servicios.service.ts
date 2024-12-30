import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) { }

  listarProductos():Observable<any>{
    return this.http.get(`${environment.BASE_URL}/products`)
  }

  borrarProducto(idProduct:string):Observable<any>{
    return this.http.delete(`${environment.BASE_URL}/products/${idProduct}`)
  }

  obtenerProducto(idProduct:string):Observable<any>{
    return this.http.get(`${environment.BASE_URL}/products/${idProduct}`)
  }

  actualizarProducto(productos:any,idProduct:string):Observable<any>{
    return this.http.put(`${environment.BASE_URL}/products/${idProduct}`,productos)
  }
  crearProducto(productos:any):Observable<any>{
    return this.http.post(`${environment.BASE_URL}/products`,productos)
  }
  private categorias = [
    { id: 'TV', nombre: 'Televisor' },
    { id: 'PHONE', nombre: 'Celular' },
    { id: 'LAPTOP', nombre: 'Laptop' },
  ];
  listarCategorias():Observable<any>{
    return of(this.categorias);
  }

  filtrarProductosxCategoria(categoria:string):Observable<any>{
    return this.http.get(`${environment.BASE_URL}/products/category/${categoria}`)
  }
}
