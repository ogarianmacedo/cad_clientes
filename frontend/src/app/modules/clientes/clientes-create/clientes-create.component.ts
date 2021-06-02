import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes-create',
  templateUrl: './clientes-create.component.html',
  styleUrls: ['./clientes-create.component.css']
})
export class ClientesCreateComponent implements OnInit {
  cliente: Cliente;
  formularioCliente: FormGroup;

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.validaFormulario();
  }

  validaFormulario() {
    this.formularioCliente = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      nascimento: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      observacao: ['']
    });
  }

  cadastrar() {
    this.loading = true;

    if (this.isValidCPF(this.formularioCliente.value.cpf)) {
      this.clienteService.cadastrarCliente(this.formularioCliente.value).subscribe((resp: Cliente) => {
        this.loading = false;
        this.toastr.success('Cliente cadastrado com sucesso!');
        this.router.navigate(['/']);
      }, (error) => {
        this.loading = false;
        this.toastr.error('Erro ao cadastrar cliente!');
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
