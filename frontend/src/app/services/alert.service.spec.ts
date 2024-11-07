import { TestBed } from '@angular/core/testing';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService = new AlertService();

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call Swal.fire with correct parameters', async () => {
    const sweetAlertSpy = spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({} as SweetAlertResult)
    );

    const title = 'Test Title';
    const text = 'Test Text';
    const icon: SweetAlertIcon = 'success';

    await service.basicAlert(title, text, icon);

    expect(sweetAlertSpy).toHaveBeenCalledWith({
      title,
      text,
      icon,
      confirmButtonText: 'Ok',
    } as any);
  });

  it('should return a SweetAlertResult from Swal.fire', async () => {
    const sweetAlertResult: SweetAlertResult<any> = {
      isConfirmed: true,
      value: 'Test value',
    } as any;
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(sweetAlertResult));

    const result = await service.basicAlert(
      'Test Title',
      'Test Text',
      'success'
    );

    expect(result).toEqual(sweetAlertResult);
  });

  it('should resolve with SweetAlertResult when alert is confirmed', async () => {
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true } as any)
    );

    const result = await service.basicAlert(
      'Test Title',
      'Test Text',
      'success'
    );

    expect(result.isConfirmed).toBeTrue();
  });
});
