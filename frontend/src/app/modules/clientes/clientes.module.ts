import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesEditComponent } from './clientes-edit/clientes-edit.component';
import { ClientesCreateComponent } from './clientes-create/clientes-create.component';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule.forChild(),
    NgbModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [
    ClientesComponent,
    ClientesListComponent,
    ClientesEditComponent,
    ClientesCreateComponent
  ]
})
export class ClientesModule { }
