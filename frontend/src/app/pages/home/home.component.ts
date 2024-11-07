import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/interfaces/i-task';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public tasks: ITask[] = [
    { id: 1, title: 'Titulo', description: 'Descripcion', date: '2024' },
    { id: 2, title: 'Titulo2', description: 'Descripcion', date: '2024' },
  ];

  constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this.apiService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  public editTask(): void {}

  public deleteTask(): void {}
}
