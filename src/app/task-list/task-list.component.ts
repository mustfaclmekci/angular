import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = true;
  error: string | null = null;
  selectedCategory: string = 'Tümü';


  // Yeni görev için form alanları
  taskTitle: string = '';
  taskDescription: string = '';
  taskCategory: string = '';
  showTasks: boolean = true;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe({
    next: (tasks) => {
      this.tasks = tasks;
      console.log('Görevler:', tasks);
      console.log('✅ Görevler geldi:', this.tasks.map(t => ({
        title: t.title,
        category: t.category
      })));
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Görevler yüklenirken hata oluştu.';
      this.loading = false;
    }
  });
  }
  get filteredTasks(): Task[] {
    if (this.selectedCategory === 'Tümü') {
      return this.tasks;
    }
    return this.tasks.filter(task => task.category === this.selectedCategory);
  }

  addTask() {
    if (!this.taskTitle.trim()) {
      alert('Başlık boş olamaz.');
      return;
    }
    console.log("Kategori ne:", this.taskCategory);

    const newTask: Task = {
      title: this.taskTitle,
      description: this.taskDescription,
      category: this.taskCategory,
      completed: false,
      uid: 'userId',
      createdAt: undefined
    };

    this.taskService.addTask(newTask)
      .then(() => {
        this.taskTitle = '';
        this.taskDescription = '';
        this.taskCategory = '';
      })
      .catch(() => alert('Görev eklenemedi.'));
  }

  toggleComplete(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed })
      .catch(() => alert('Durum güncellenemedi.'));
  }

  deleteTask(task: Task) {
    if(confirm(`"${task.title}" görevini silmek istediğine emin misin?`)) {
      this.taskService.deleteTask(task.id!).catch(() => alert('Görev silinemedi.'));
    }
  }
}
