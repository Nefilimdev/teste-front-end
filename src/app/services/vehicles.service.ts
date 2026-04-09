import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { VEHICLES_MOCK } from '../data/vehicles.mock';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  getVehicles(): Observable<Vehicle[]> {
    return of(VEHICLES_MOCK);
  }
}
