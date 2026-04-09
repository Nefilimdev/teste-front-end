import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { VeiculosService } from '../../services/veiculos.service';

@Component({
  selector: 'app-veiculos-list',
  imports: [AsyncPipe],
  templateUrl: './veiculos-list.component.html',
  styleUrl: './veiculos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VeiculosListComponent {
  private readonly veiculosService = inject(VeiculosService);

  protected readonly veiculos$ = this.veiculosService.listar();
  protected readonly totalColunas = 7;
}
