import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup; // Declaração do formulário
  categories: string[] = ['Trabalho', 'Pessoal', 'Estudos', 'Lazer', 'Urgente'];

  globalError: string = '';   // Mensagem de erro global
  successMessage: string = '';  // Mensagem de sucesso

  // Injeção dos serviços que serão usados
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) { }

  // Método que é chamado quando o componente é inicializado
  ngOnInit() {
    // Inicialização do formulário com validações
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      category: [[]] , // Agora é inicializado como um array vazio
      completed: [false]
  });

  }

  // Método chamado quando o formulário é submetido
  addTask() {



    // Verifica se o formulário é inválido
    if (this.taskForm.invalid) {
      // Se for, mostra uma mensagem de erro
      this.handleMessage('error', 'Por favor, insira o nome e a descrição da tarefa.');
      return;
    }

    // Prepara os dados da nova tarefa
    const newTask: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      completed: this.taskForm.value.completed,
      category: this.taskForm.value.category // Transforma o array em uma string separada por vírgulas
    };

    console.log("New task data:", newTask);


    // Usa o serviço para adicionar a tarefa
    this.taskService.addTask(newTask).subscribe(task => {
      // Se a tarefa for adicionada com sucesso, mostra uma mensagem de sucesso
      this.handleMessage('success', 'Tarefa adicionada com sucesso!');
      // E reseta o formulário
      this.taskForm.reset();
    }, error => {
      // Se ocorrer um erro, mostra uma mensagem de erro
      this.handleMessage('error', 'Erro ao adicionar a tarefa. Por favor, tente novamente.');
    });
  }

  // Método que verifica erros no campo título
  get titleError() {
    const titleCtrl = this.taskForm.get('title');
    if (titleCtrl?.hasError('required')) {
      return 'O nome é obrigatório.';
    }
    if (titleCtrl?.hasError('minlength')) {
      return 'O nome deve ter pelo menos 3 caracteres.';
    }
    return '';
  }

  // Método que verifica erros no campo descrição
  get descriptionError() {
    const descriptionCtrl = this.taskForm.get('description');
    if (descriptionCtrl?.hasError('required')) {
      return 'A descrição é obrigatória.';
    }
    return '';
  }



  // Método privado para lidar com mensagens de erro ou sucesso
  private handleMessage(type: 'success' | 'error', message: string) {
    if (type === 'success') {
      this.successMessage = message;
      this.globalError = '';
    } else {
      this.globalError = message;
      this.successMessage = '';
    }
  }
}
