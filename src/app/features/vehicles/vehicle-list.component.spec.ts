import { TestBed } from '@angular/core/testing';

import { VehicleListComponent } from './vehicle-list.component';

describe('VehicleListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleListComponent]
    }).compileComponents();
  });

  it('should render the first page with five vehicles', () => {
    const fixture = TestBed.createComponent(VehicleListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Vehicle list');
    expect(compiled.querySelectorAll('tbody tr').length).toBe(5);
    expect(compiled.textContent).toContain('Showing 1-5 of 14');
    expect(compiled.textContent).toContain('BRA2E19');
  });

  it('should navigate to the next page', () => {
    const fixture = TestBed.createComponent(VehicleListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nextButton = Array.from(compiled.querySelectorAll('button')).find(
      (button) => button.textContent?.trim() === 'Next'
    ) as HTMLButtonElement;

    nextButton.click();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('tbody tr').length).toBe(5);
    expect(compiled.textContent).toContain('Showing 6-10 of 14');
    expect(compiled.textContent).toContain('LVA5N43');
  });

  it('should filter vehicles by license plate, model or brand and reset pagination', () => {
    const fixture = TestBed.createComponent(VehicleListComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const nextButton = Array.from(compiled.querySelectorAll('button')).find(
      (button) => button.textContent?.trim() === 'Next'
    ) as HTMLButtonElement;

    nextButton.click();
    fixture.detectChanges();

    const searchInput = compiled.querySelector('input[type="search"]') as HTMLInputElement;
    searchInput.value = 'toyota';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(compiled.textContent).toContain('Showing 1-3 of 3');
    expect(compiled.textContent).toContain('Corolla XEi');
    expect(compiled.textContent).toContain('Yaris XLS');
    expect(compiled.textContent).toContain('Hilux SRX');
    expect(compiled.textContent).not.toContain('Showing 6-10 of 14');
  });
});
