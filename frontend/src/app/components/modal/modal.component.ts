import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ITask } from 'src/app/interfaces/i-task';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() modalClosed = new EventEmitter<void>();
  @Input() idTask!: number;
  @Input() taskEdit!: ITask;

  public task: ITask = {
    title: null as any,
    description: null as any,
    date: null as any,
  };

  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idTask'] && changes['taskEdit']) {
      if (!this.idTask) {
        this.task = {
          title: null as any,
          description: null as any,
          date: null as any,
        };
      } else if (this.taskEdit) {
        this.task = this.taskEdit;
      }
    }
  }

  public submit(): void {
    if (this.idTask) {
      this.apiService.editTask(this.idTask, this.task).subscribe(
        () => {
          this.modalClosed.emit();
          this.alertService.basicAlert(
            'Listo',
            'Se ha editado la tarea',
            'success'
          );
        },
        (_err) => {
          this.alertService.basicAlert(
            'Error',
            'Ha ocurrido un error actualizando la tarea',
            'error'
          );
        }
      );
    } else {
      this.apiService.newTask(this.task).subscribe(
        () => {
          this.modalClosed.emit();
          this.alertService.basicAlert(
            'Listo',
            'Se ha creado la tarea',
            'success'
          );
        },
        (_error) => {
          this.alertService.basicAlert(
            'Error',
            'Ha ocurrido un error creando la tarea',
            'error'
          );
        }
      );
    }
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
