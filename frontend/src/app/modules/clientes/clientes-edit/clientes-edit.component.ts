import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-edit',
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.css']
})
export class ClientesEditComponent implements OnInit {
  cliente: Cliente;
  formularioCliente: FormGroup;

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private routerActivated: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.buscaClienteSelecionado();
  }

  buscaClienteSelecionado() {
    this.loading = true;
    const id = this.routerActivated.snapshot.params['id'];

    this.clienteService.getClienteId(id).subscribe((resp: Cliente) => {
        this.cliente = resp[0];
        this.validaFormulario(this.cliente);
        this.loading = false;
      });
  }

  validaFormulario(cliente: Cliente) {
    this.formularioCliente = this.formBuilder.group({
      id: [cliente.id],
      nome: [cliente.nome, [Validators.required]],
      email: [cliente.email, [Validators.required, Validators.email]],
      nascimento: [cliente.nascimento, [Validators.required]],
      cpf: [cliente.cpf, [Validators.required]],
      celular: [cliente.celular, [Validators.required]],
      endereco: [cliente.endereco, [Validators.required]],
      observacao: [cliente.observacao]
    });
  }

  editar() {
    this.loading = true;

    if (this.isValidCPF(this.formularioCliente.value.cpf)) {
      this.clienteService.editarCliente(this.cliente.id, this.formularioCliente.value).subscribe((resp: Cliente) => {
        this.loading = false;
        this.toastr.success('Cliente editado com sucesso!');
        this.router.navigate(['/']);
      }, (error) => {
        this.loading = false;
        this.toastr.error('Erro ao editar cliente!');
      })
    }
  }

  isValidCPF(cpf) {
    if (typeof cpf !== "string") {
      this.toastr.error('CPF inválido!');
      this.loading = false;
      return false;
    }

    cpf = cpf.replace(/[\s.-]*/igm, '');

    if (!cpf ||
        cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999") {
        this.toastr.error('CPF inválido!');
        this.loading = false;
        return false;
    }

    var soma = 0
    var resto

    for (var i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) {
      resto = 0;
    }

    if (resto != parseInt(cpf.substring(9, 10))) {
      this.toastr.error('CPF inválido!');
      this.loading = false;
      return false;
    }

    soma = 0;

    for (var i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
        
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) {
      resto = 0;
    }

    if (resto != parseInt(cpf.substring(10, 11))) {
      this.toastr.error('CPF inválido!');
      this.loading = false;
      return false;
    }

    return true
  }
}
