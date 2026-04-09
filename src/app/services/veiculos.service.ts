import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { VEICULOS_MOCK } from '../data/veiculos.mock';
import { Veiculo } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {
  listar(): Observable<Veiculo[]> {
    return of(VEICULOS_MOCK);
  }
}
