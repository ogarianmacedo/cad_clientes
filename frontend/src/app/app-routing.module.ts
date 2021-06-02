import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesCreateComponent } from './modules/clientes/clientes-create/clientes-create.component';
import { ClientesEditComponent } from './modules/clientes/clientes-edit/clientes-edit.component';
import { ClientesListComponent } from './modules/clientes/clientes-list/clientes-list.component';
import { ClientesComponent } from './modules/clientes/clientes.component';

const routes: Routes = [
  { path: '',           component: ClientesListComponent },
  { path: 'cadastrar',  component: ClientesCreateComponent },
  { path: 'editar/:id', component: ClientesEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
