import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  public basicAlert(
    title: string,
    text: string,
    icon: SweetAlertIcon
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Ok',
    });
  }
}
