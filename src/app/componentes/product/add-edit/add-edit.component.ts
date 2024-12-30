import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiciosService } from '../../../services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css',
})
export class AddEditComponent implements OnInit {
  isEditing: boolean = false;
  idProducto: string | null = null;
  product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
  };
  lista_errores: string = '';
  categorias: any = [];
  isLoading: boolean = false;

  constructor(
    private serviciosService: ServiciosService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviciosService.listarCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data;
        console.log('Categorias:', this.categorias);
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    this.idProducto = this.route.snapshot.params['idProducto'];
    console.log('idProducto: ' + this.idProducto);
    if (this.idProducto) {
      this.isEditing = true;
      this.isLoading = true;
      this.serviciosService.obtenerProducto(this.idProducto!).subscribe({
        next: (data: any) => {
          this.product = data;
          this.isLoading = false;
          console.log('Editando producto:', this.product);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.log(error);
        },
      });
    } else {
      this.isEditing = false;
      this.isLoading = false;
      console.log('Creando nuevo producto:', this.product);
    }
  }

  onSubmit() {
    this.lista_errores = '';
    if (this.product.category == '') {
      this.lista_errores += 'La categoria es requerida<br>';
    }
    if (this.product.name == '') {
      this.lista_errores += 'El nombre es requerido<br>';
    }
    if (this.product.description == '') {
      this.lista_errores += 'La descripción es requerida<br>';
    }
    if (this.product.price <= 0) {
      this.lista_errores += 'El precio debe ser mayor a 0<br>';
    }
    if (this.product.stock <= 0) {
      this.lista_errores += 'El stock debe ser mayor a 0<br>';
    }

    if (this.lista_errores != '') {
      Swal.fire({
        title: 'Error!',
        html: this.lista_errores,
        icon: 'error',
      });
      return;
    }

    if (this.isEditing) {
      this.serviciosService
        .actualizarProducto(this.product, this.product.id)
        .subscribe({
          next: (data: any) => {
            Swal.fire({
              title: 'Producto!',
              text: data?.message,
              icon: 'success',
            });
            this.router.navigate(['/productos']);
          },
          error: (error: any) => {
            Swal.fire({
              title: 'Error!',
              text: error?.message || 'Ha ocurrido un error',
              icon: 'error',
            });
            console.log(error);
          },
        });
      console.log('Editando producto:', this.product);
    } else {
      this.serviciosService.crearProducto(this.product).subscribe({
        next: (data: any) => {
          Swal.fire({
            title: 'Producto!',
            text: data?.message,
            icon: 'success',
          });
          this.router.navigate(['/productos']);
        },
        error: (error: any) => {
          Swal.fire({
            title: 'Error!',
            text: error?.message || 'Ha ocurrido un error',
            icon: 'error',
          });
          console.log(error);
        },
      });
      console.log('Creando nuevo producto:', this.product);
    }
  }

  onCancel() {
    console.log('Acción cancelada');
  }
}
