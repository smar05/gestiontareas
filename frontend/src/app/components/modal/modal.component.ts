import { Component } from '@angular/core';
import { ITask } from 'src/app/interfaces/i-task';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  public task: ITask = {
    title: null as any,
    description: null as any,
    date: null as any,
  };

  constructor(private apiService: ApiService) {}

  public submit(): void {
    this.apiService.newTask(this.task).subscribe(() => {});
  }

  public validSubmit(): boolean {
    return (
      this.task != null &&
      this.task.title != null &&
      this.task.title != '' &&
      this.task.description != null &&
      this.task.description != '' &&
      this.task.date != null &&
      this.task.date != ''
    );
  }
}
