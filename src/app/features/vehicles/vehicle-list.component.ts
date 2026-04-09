import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { VehiclesService } from '../../services/vehicles.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleListComponent {
  private readonly vehiclesService = inject(VehiclesService);
  private readonly pageSize = 5;
  private readonly vehicles = toSignal(this.vehiclesService.getVehicles(), {
    initialValue: []
  });
  protected readonly currentPage = signal(1);
  protected readonly searchTerm = signal('');

  protected readonly totalColumns = 7;
  protected readonly totalVehicles = computed(() => this.vehicles().length);
  protected readonly filteredVehicles = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) {
      return this.vehicles();
    }

    return this.vehicles().filter((vehicle) => {
      return (
        vehicle.licensePlate.toLowerCase().includes(term) ||
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.brand.toLowerCase().includes(term)
      );
    });
  });
  protected readonly filteredVehiclesCount = computed(
    () => this.filteredVehicles().length
  );
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredVehiclesCount() / this.pageSize))
  );
  protected readonly visibleVehicles = computed(() => {
    const startIndex = (this.currentPage() - 1) * this.pageSize;
    return this.filteredVehicles().slice(startIndex, startIndex + this.pageSize);
  });
  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1)
  );
  protected readonly rangeStart = computed(() =>
    this.filteredVehiclesCount() === 0
      ? 0
      : (this.currentPage() - 1) * this.pageSize + 1
  );
  protected readonly rangeEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize, this.filteredVehiclesCount())
  );
  protected readonly isPreviousDisabled = computed(() => this.currentPage() === 1);
  protected readonly isNextDisabled = computed(
    () => this.currentPage() === this.totalPages()
  );

  protected updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }

    this.currentPage.set(page);
  }

  protected goToPreviousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  protected goToNextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }
}
