import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { ITask } from 'src/app/interfaces/i-task';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let alertServiceSpy: jasmine.SpyObj<AlertService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['newTask', 'editTask']);
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['basicAlert']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ModalComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize task correctly when idTask and taskEdit are set', () => {
    const mockTask: ITask = {
      title: 'Test Task',
      description: 'Test Description',
      date: '2024-11-07',
    };

    component.idTask = 1;
    component.taskEdit = mockTask;

    component.ngOnChanges({
      idTask: {
        currentValue: 1,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
      taskEdit: {
        currentValue: mockTask,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });

    expect(component.task).toEqual(mockTask);
  });

  it('should reset task when idTask is not provided', () => {
    component.idTask = null as any;
    component.ngOnChanges({
      idTask: {
        currentValue: null,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false,
      },
      taskEdit: {
        currentValue: undefined,
        previousValue: undefined,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.task).toEqual({
      title: null as any,
      description: null as any,
      date: null as any,
    });
  });

  it('should call newTask and show success alert when task is created', () => {
    const newTask: ITask = {
      title: 'New Task',
      description: 'New Description',
      date: '2024-11-07',
    };

    component.task = newTask;
    apiServiceSpy.newTask.and.returnValue(of(newTask));

    spyOn(component.modalClosed, 'emit');

    component.submit();

    expect(apiServiceSpy.newTask).toHaveBeenCalledWith(newTask);
    expect(component.modalClosed.emit).toHaveBeenCalled();
    expect(alertServiceSpy.basicAlert).toHaveBeenCalledWith(
      'Listo',
      'Se ha creado la tarea',
      'success'
    );
  });

  it('should call editTask and show success alert when task is updated', () => {
    const updatedTask: ITask = {
      title: 'Updated Task',
      description: 'Updated Description',
      date: '2024-11-07',
    };
    component.idTask = 1;
    component.task = updatedTask;

    apiServiceSpy.editTask.and.returnValue(of(updatedTask));

    spyOn(component.modalClosed, 'emit');

    component.submit();

    expect(apiServiceSpy.editTask).toHaveBeenCalledWith(1, updatedTask);
    expect(component.modalClosed.emit).toHaveBeenCalled();
    expect(alertServiceSpy.basicAlert).toHaveBeenCalledWith(
      'Listo',
      'Se ha editado la tarea',
      'success'
    );
  });

  it('should show error alert when task creation fails', () => {
    const newTask: ITask = {
      title: 'New Task',
      description: 'New Description',
      date: '2024-11-07',
    };
    component.task = newTask;

    apiServiceSpy.newTask.and.returnValue(throwError('Error'));

    component.submit();

    expect(alertServiceSpy.basicAlert).toHaveBeenCalledWith(
      'Error',
      'Ha ocurrido un error creando la tarea',
      'error'
    );
  });

  it('should show error alert when task update fails', () => {
    const updatedTask: ITask = {
      title: 'Updated Task',
      description: 'Updated Description',
      date: '2024-11-07',
    };
    component.idTask = 1;
    component.task = updatedTask;

    apiServiceSpy.editTask.and.returnValue(throwError('Error'));

    component.submit();

    expect(alertServiceSpy.basicAlert).toHaveBeenCalledWith(
      'Error',
      'Ha ocurrido un error actualizando la tarea',
      'error'
    );
  });

  it('should return false from validSubmit if task is not valid', () => {
    component.task = { title: '', description: '', date: '' };
    expect(component.validSubmit()).toBeFalse();
  });

  it('should return true from validSubmit if task is valid', () => {
    component.task = {
      title: 'Test Task',
      description: 'Test Description',
      date: '2024-11-07',
    };
    expect(component.validSubmit()).toBeTrue();
  });

  it('should emit modalClosed and show success alert when editTask is successful', () => {
    component.idTask = 123;
    component.task = {
      id: 123,
      title: 'Test Task',
      description: 'Test Description',
      date: '2024',
    };
    apiServiceSpy.editTask.and.returnValue(of({}));

    component.submit();

    expect(apiServiceSpy.editTask).toHaveBeenCalledWith(123, {
      title: 'Test Task',
      description: 'Test Description',
      date: '2024',
    });
    expect(component.modalClosed.emit).toHaveBeenCalled();
    expect(alertServiceSpy.basicAlert).toHaveBeenCalledWith(
      'Listo',
      'Se ha editado la tarea',
      'success'
    );
  });
});
