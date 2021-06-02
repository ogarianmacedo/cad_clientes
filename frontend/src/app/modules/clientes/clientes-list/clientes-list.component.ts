import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[];
  idCliente: number;
  cliente: Cliente;

  clientesFiltrados: Cliente[];
  _filtroListaNome = '';
  _filtroListaEmail = '';

  numPagina: number = 1;

  loading = false;

  constructor(
    private clienteService: ClienteService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  get filtroListaNome(): string {
    return this._filtroListaNome;
  }

  set filtroListaNome(value: string) {
    this._filtroListaNome = value;
    this.clientesFiltrados = this.filtroListaNome ? this.filtarClienteNome(this.filtroListaNome) : this.clientes;
  }

  get filtroListaEmail(): string {
    return this._filtroListaEmail;
  }

  set filtroListaEmail(value: string) {
    this._filtroListaEmail = value;
    this.clientesFiltrados = this.filtroListaEmail ? this.filtarClienteEmail(this.filtroListaEmail) : this.clientes;
  }

  ngOnInit() {
    this.buscarClientes();
  }

  filtarClienteNome(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  filtarClienteEmail(filtrarPor: string): Cliente[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.clientes.filter(
      cliente => cliente.email.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  buscarClientes(pagina = 1) {
    this.loading = true;
    this.clienteService.getClientes(pagina)
      .subscribe((resp: Cliente[]) => {
        this.clientes = resp;
        this.clientesFiltrados = resp;
        this.loading = false;
      });
  }

  openModalExcluir(content: any, cliente: Cliente) {
    this.cliente = cliente;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if ("sim" === result) {
        this.clienteService.excluirCliente(cliente.id).subscribe((resp: any) => {
          this.toastr.success('Cliente excluído com sucesso!');
          this.buscarClientes();
        }, (error: any) => {
          this.toastr.error('Erro ao excluir cliente!');
        })
      }
    }, (reason) => {
    });
  }

  nextPage() {
    this.numPagina = this.numPagina + 1;
    if (this.numPagina >= 1) {
      this.buscarClientes(this.numPagina);
    }
  }

  backPage() {
    this.numPagina = this.numPagina - 1;
    if (this.numPagina >= 1) {
      this.buscarClientes(this.numPagina);
    }
  }
}
