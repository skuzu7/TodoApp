import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {

  @ViewChild(TaskEditModalComponent, { static: false }) editModal!: TaskEditModalComponent;

  tasks: Task[] = []; // Lista de tarefas a serem exibidas
  allTasks: Task[] = []; // Lista de todas as tarefas recebidas
  searchQuery: string = ''; // Texto usado para pesquisa
  sortByOption: 'category' | 'name' = 'name'; // Opção de ordenação escolhida

  // Injetando o serviço de tarefas no componente
  constructor(private taskService: TaskService) { }

  // Método executado ao iniciar o componente
  ngOnInit(): void {
    this.getTasks(); // Chama o método para pegar tarefas
  }

  // Método para pegar tarefas do serviço
  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      console.log('Tarefas recebidas:', tasks); // Log das tarefas recebidas
      this.allTasks = tasks; // Guarda todas as tarefas
      this.sortTasks(this.sortByOption); // Chama a função de ordenação após carregar as tarefas
    });
  }

  // Método para editar uma tarefa
  editTask(taskId: number) {
    const taskToEdit = this.tasks.find(t => t.id === taskId);
    if (taskToEdit) {
      this.editModal.open(taskToEdit);
    }
  }

  // Método para excluir uma tarefa
  deleteTask(taskId: number) {
    // Pede confirmação ao usuário
    const userConfirmed = window.confirm('Você tem certeza que deseja excluir esta tarefa?');

    // Se o usuário confirmar, exclui a tarefa
    if (userConfirmed) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        // Ao excluir com sucesso, atualiza a lista
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      }, error => {
        // Se houver erro, mostra no console
        console.error('Erro ao excluir a tarefa:', error);
      });
    }
  }

  // Método para filtrar as tarefas conforme a pesquisa
  filterTasks() {
    // Se não houver texto de pesquisa, mostra todas as tarefas
    if (!this.searchQuery) {
      this.sortTasks(this.sortByOption); // Chama a função de ordenação
      return;
    }

    // Filtra as tarefas conforme o texto de pesquisa
    this.tasks = this.allTasks.filter(task =>
      task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Método para ordenar as tarefas com base na opção escolhida
  sortTasks(option: 'category' | 'name'): void {
    if (option === 'category') {
      this.tasks = this.allTasks
        .filter(task => typeof task.category === 'string' || (task.category && task.category.length > 0))
        .slice()
        .sort((a, b) => {
          const categoryA = (typeof a.category === 'string' ? a.category : '').toLowerCase();
          const categoryB = (typeof b.category === 'string' ? b.category : '').toLowerCase();
          return categoryA.localeCompare(categoryB);
        });
    } else {
      this.tasks = this.allTasks.slice().sort((a, b) => a.title.localeCompare(b.title));
    }
    this.sortByOption = option; // Atualize a opção de ordenação escolhida
  }
}
