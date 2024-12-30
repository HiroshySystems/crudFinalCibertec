import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css',
})
export class ListarComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string = '';
  isLoading: boolean = false;
  categorias: any = [];
  constructor(
    private serviciosService: ServiciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }
  loadCategories(): void {
    this.serviciosService.listarCategorias().subscribe({
      next:(data:any)=>{
        this.categorias = data;
        console.log('Categorias:', this.categorias);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }
  loadProducts(): void {
    this.isLoading = true;
    this.serviciosService.listarProductos().subscribe((products: any[]) => {
      this.products = products;
      this.filteredProducts = products;
      this.isLoading = false;
    });
  }

  deleteProduct(productId: string): void {
    Swal.fire({
      title: 'Estas seguro de borrar el Producto?',
      text: this.products.find((product) => product.id === productId).name,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviciosService.borrarProducto(productId).subscribe(() => {
          this.loadProducts();
          Swal.fire({
            title: 'Borrado!',
            text: 'Producto borrado correctamente.',
            icon: 'success',
          });
        });
        
      }
    });
  }

  filterByCategory(): void {
    if (this.selectedCategory) {
      this.isLoading=true;
      this.serviciosService
        .filtrarProductosxCategoria(this.selectedCategory)
        .subscribe({
          next:(products: any[]) => {
          this.filteredProducts = products;
          this.isLoading=false;
        }
        });
    } else {
      this.filteredProducts = this.products;
      this.isLoading=false;
    }
  }
}
