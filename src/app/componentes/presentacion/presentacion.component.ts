import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-presentacion',
  imports: [RouterLink],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})
export class PresentacionComponent {
  estudiante:string = 'Rojas Salcedo, Hiroshy Lorenzo';
  profesor:string = 'Del Pozo Matias, Manuel Alfredo';
}
