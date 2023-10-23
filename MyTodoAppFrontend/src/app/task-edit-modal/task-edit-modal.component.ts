import { Component, Input } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html'
})
export class TaskEditModalComponent {
  @Input() task: Task = {
    id: 0,
    title: '',
    description: '',
    completed: false,
    category: [],

  };


  showModal: boolean = false;

  open(task: Task) {
    this.task = task;
    this.showModal = true;
  }

  close() {
    this.showModal = false;
  }

  save() {

    this.close();
  }
}
