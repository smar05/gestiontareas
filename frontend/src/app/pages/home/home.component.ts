import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ITask } from 'src/app/interfaces/i-task';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public tasks: ITask[] = [];

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

  public deleteTask(id: number | undefined): void {
    if (!id) return;
    this.apiService.deleteTask(id).subscribe(() => {
      this.getTasks();
    });
  }
}
