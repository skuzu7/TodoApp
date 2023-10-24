import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://18.230.22.204:8000/api/tasks/';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task) {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(taskId: number) {
    const url = `${this.apiUrl}${taskId}/`;
    return this.http.delete(url);
  }


}
