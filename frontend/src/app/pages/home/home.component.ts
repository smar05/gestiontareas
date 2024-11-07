import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/interfaces/i-task';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public tasks: ITask[] = [];
  public idEdit: number = null as any;
  public taskEdit: ITask = null as any;

  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.apiService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (_err) => {
        this.alertService.basicAlert(
          'Error',
          'Ha ocurrido un error consultando las tareas',
          'error'
        );
      }
    );
  }

  public editTask(id: number | undefined): void {
    if (!id) return;
    this.idEdit = id;
    this.taskEdit = this.tasks.find((task) => task.id === id) as any;
  }

  public deleteTask(id: number | undefined): void {
    if (!id) return;
    this.apiService.deleteTask(id).subscribe(
      () => {
        this.getTasks();
        this.alertService.basicAlert(
          'Listo',
          'Se ha eliminado la tarea',
          'success'
        );
      },
      (_error) => {
        this.alertService.basicAlert(
          'Error',
          'Ha ocurrido un error eliminando la tarea',
          'error'
        );
      }
    );
  }

  public onModalClose(): void {
    this.editTask = null as any;
    this.idEdit = null as any;
    this.getTasks();
  }

  public save(): void {
    this.idEdit = null as any;
    this.taskEdit = null as any;
  }
}
