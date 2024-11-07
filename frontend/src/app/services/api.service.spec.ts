import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ITask } from '../interfaces/i-task';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks from API', () => {
    const mockTasks: ITask[] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Task 1 description',
        date: '2024-11-07',
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Task 2 description',
        date: '2024-11-07',
      },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should create a new task', () => {
    const newTask: ITask = {
      id: 3,
      title: 'New Task',
      description: 'New task description',
      date: '2024-11-07',
    };

    service.newTask(newTask).subscribe((response) => {
      expect(response).toEqual(newTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(newTask);
  });

  it('should delete a task', () => {
    const taskId: number = 1;

    service.deleteTask(taskId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should update a task', () => {
    const taskId = 1;
    const updatedTask: ITask = {
      id: 1,
      title: 'Updated Task',
      description: 'Updated description',
      date: '2024-11-07',
    };

    service.editTask(taskId, updatedTask).subscribe((response) => {
      expect(response).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/${taskId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(updatedTask);
  });
});
