import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  task: Partial<Task> = {
    title: '',
    description: '',
    category: '',
  };

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.task.title?.trim()) {
      this.taskService.addTask(this.task as Task).then(() => {
        alert('Görev eklendi!');
        this.task = { title: '', description: '', category: '' }; // formu temizle
      });
    } else {
      alert('Başlık zorunludur');
    }
  }
}
