import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente.interface';

/**
 * Usado em requisições post e put
 */
 const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type': 'application/json'}
  )
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlApiCliente = environment.api_url + 'clientes';

  constructor(private http: HttpClient) { }

  getClientes (pagina = 1): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlApiCliente + '?page=' + pagina);
  }

  cadastrarCliente (dados): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlApiCliente + '/create', dados, httpOptions);
  }

  getClienteId(id) {
    return this.http.get<Cliente>(this.urlApiCliente + '/' + id);
  }

  editarCliente (id, dados): Observable<Cliente> {
    return this.http.put<Cliente>(this.urlApiCliente + '/update/' + id, dados, httpOptions);
  }

  excluirCliente(id) {
    return this.http.delete(this.urlApiCliente + '/delete/' + id);
  }
}
