import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from '../interfaces/i-task';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private backUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getTasks(): Observable<ITask[]> {
    return this.http.get(`${this.backUrl}/tasks`) as any;
  }

  public newTask(task: ITask): Observable<any> {
    return this.http.post(`${this.backUrl}/tasks`, task);
  }

  public deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.backUrl}/tasks/${id}`);
  }

  public editTask(id: number, task: ITask): Observable<any> {
    return this.http.put(`${this.backUrl}/tasks/${id}`, task);
  }
}
