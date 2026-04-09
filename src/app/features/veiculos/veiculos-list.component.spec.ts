import { TestBed } from '@angular/core/testing';

import { VeiculosListComponent } from './veiculos-list.component';

describe('VeiculosListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeiculosListComponent]
    }).compileComponents();
  });

  it('should render the vehicle list page title', () => {
    const fixture = TestBed.createComponent(VeiculosListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Lista de veiculos');
    expect(compiled.querySelectorAll('tbody tr').length).toBe(5);
  });
});
