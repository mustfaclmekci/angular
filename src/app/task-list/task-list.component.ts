// angular'ın bileşen sistemi ve ngOnInit özelliği
import { Component, OnInit } from '@angular/core';
// görev servisimiz (firebase işlemleri için)
import { TaskService } from 'src/app/services/task.service';
// görevlerin yapısı için model
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  // görevleri burada tutuyoruz
  tasks: Task[] = [];

  // sayfa yüklenirken gösterim kontrolü
  loading = true;

  // hata olursa mesaj için
  error: string | null = null;

  // filtreleme için kategori
  selectedCategory: string = 'Tümü';

  // görev ekleme formu için inputlar
  taskTitle: string = '';
  taskDescription: string = '';
  taskCategory: string = '';

  // görevleri göster/gizle kontrolü
  showTasks: boolean = true;

  // servis constructor'da geliyor
  constructor(private taskService: TaskService) {}

  // sayfa açıldığında görevleri firebase'den çek
  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'bir hata oluştu görevleri çekerken';
        this.loading = false;
      }
    });
  }

  // filtreleme işlemi
  get filteredTasks(): Task[] {
    if (this.selectedCategory === 'Tümü') {
      return this.tasks;
    }
    return this.tasks.filter(task => task.category === this.selectedCategory);
  }

  // görev ekle
  addTask() {
    if (!this.taskTitle.trim()) {
      alert('başlık boş olamaz');
      return;
    }

    const newTask: Task = {
      title: this.taskTitle,
      description: this.taskDescription,
      category: this.taskCategory,
      completed: false,
      uid: 'userId', // burayı giriş yapan kullanıcıdan çekmek lazım
      createdAt: undefined // firestore kendisi atayabilir
    };

    this.taskService.addTask(newTask)
      .then(() => {
        this.taskTitle = '';
        this.taskDescription = '';
        this.taskCategory = '';
      })
      .catch(() => alert('ekleme başarısız oldu'));
  }

  // tamamlandı durumunu tersine çevir
  toggleComplete(task: Task) {
    this.taskService.updateTask(task.id!, { completed: !task.completed })
      .catch(() => alert('güncelleme başarısız'));
  }

  // görev silme
  deleteTask(task: Task) {
    if (confirm(`"${task.title}" silinsin mi?`)) {
      this.taskService.deleteTask(task.id!).catch(() => alert('silinemedi'));
    }
  }
}
