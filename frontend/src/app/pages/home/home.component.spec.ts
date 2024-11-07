import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ITask } from 'src/app/interfaces/i-task';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { HomeComponent } from './home.component';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;
  let alertServiceMock: jasmine.SpyObj<AlertService>;

  const mockTasks: ITask[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Task 1 description',
      date: '2024-07-11',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Task 2 description',
      date: '2024-07-11',
    },
  ];

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', [
      'getTasks',
      'deleteTask',
    ]);
    alertServiceMock = jasmine.createSpyObj('AlertService', ['basicAlert']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent, ModalComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceMock },
        { provide: AlertService, useValue: alertServiceMock },
      ],
      imports: [FormsModule],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    apiServiceMock.getTasks.and.returnValue(of(mockTasks));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset edit task data on save', () => {
    component.idEdit = 1;
    component.taskEdit = mockTasks[0];

    component.save();

    expect(component.idEdit).toBeNull();
    expect(component.taskEdit).toBeNull();
  });

  it('should call getTasks and set tasks', () => {
    expect(apiServiceMock.getTasks).toHaveBeenCalled();

    expect(component.tasks).toEqual(mockTasks);
  });

  it('should call getTasks on deleteTask success', () => {
    apiServiceMock.deleteTask.and.returnValue(of(null));

    component.deleteTask(1);

    expect(apiServiceMock.getTasks).toHaveBeenCalled();
  });

  it('should call getTasks on deleteTask success', () => {
    component.deleteTask(undefined);

    expect(apiServiceMock.getTasks).toHaveBeenCalledTimes(1);
  });

  it('should handle error in getTasks', () => {
    apiServiceMock.getTasks.and.returnValue(of([]));

    component['getTasks']();

    expect(component.tasks).toEqual([]);
  });

  it('should handle error in getTasks and call basicAlert', () => {
    apiServiceMock.getTasks.and.returnValue(throwError('Error en la API'));

    component['getTasks']();

    expect(alertServiceMock.basicAlert).toHaveBeenCalledWith(
      'Error',
      'Ha ocurrido un error consultando las tareas',
      'error'
    );
  });

  it('should set idEdit and taskEdit when valid id is provided', () => {
    component.tasks = [
      {
        id: 1,
        title: 'Test Task',
        description: 'Description',
        date: '2024-11-07',
      },
    ];
    component.editTask(1);
    expect(component.idEdit).toBe(1);
    expect(component.taskEdit).toEqual({
      id: 1,
      title: 'Test Task',
      description: 'Description',
      date: '2024-11-07',
    });
  });

  it('should set idEdit and taskEdit null', () => {
    component.editTask(undefined);
    expect(component.idEdit).toBeNull();
    expect(component.taskEdit).toBeNull();
  });

  it('should handle error in deleteTask and call basicAlert', () => {
    apiServiceMock.deleteTask.and.returnValue(throwError('Error en la API'));

    component['deleteTask'](1);

    expect(alertServiceMock.basicAlert).toHaveBeenCalled();
  });

  it('should set editTask to null when onModalClose is called', () => {
    component.editTask = { id: 1, name: 'Test Task' } as any;
    component.onModalClose();
    expect(component.editTask).toBeNull();
  });
});
