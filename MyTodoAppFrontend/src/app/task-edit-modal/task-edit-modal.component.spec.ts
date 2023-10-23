import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditModalComponent } from './task-edit-modal.component';

describe('TaskEditModalComponent', () => {
  let component: TaskEditModalComponent;
  let fixture: ComponentFixture<TaskEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskEditModalComponent]
    });
    fixture = TestBed.createComponent(TaskEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
