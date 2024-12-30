import { Routes } from '@angular/router';
import { PresentacionComponent } from './componentes/presentacion/presentacion.component';
import { ListarComponent } from './componentes/product/listar/listar.component';
import { AddEditComponent } from './componentes/product/add-edit/add-edit.component';

export const routes: Routes = [
    {path:'',component:PresentacionComponent},
    {path:'productos',component:ListarComponent},
    {path:'addProducto',component:AddEditComponent},
    {path:'editProducto/:idProducto',component:AddEditComponent},
    {path:'**',redirectTo:'productos'}
];
