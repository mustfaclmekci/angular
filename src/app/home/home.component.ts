import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from '@angular/fire/firestore';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  taskTitle: string = '';
  taskDescription: string = '';
  taskCategory: string = '';
  searchText: string = '';
  tasks$: Observable<any[]> | undefined;
  userId: string = '';
  showCompleted: boolean = true;
  taskDueDate: string = '';
  selectedFilterCategory: string = 'Tümü';



  
  constructor(private firestore: Firestore, private auth: Auth) {}

  ngOnInit() {
     onAuthStateChanged(this.auth, (user) => {
    if (user) {
      this.userId = user.uid;

      const tasksRef = collection(this.firestore, 'tasks');
      const userTasksQuery = query(tasksRef, where('uid', '==', this.userId));
      this.tasks$ = collectionData(userTasksQuery, { idField: 'id' });
    }
  });
  }

  async addTask() {
    if (!this.taskTitle.trim() || !this.taskDescription.trim()) return;

  const user = this.auth.currentUser;
  if (user) {
    const task = {
      uid: user.uid,
      title: this.taskTitle,
      description: this.taskDescription,
      category: this.taskCategory || 'Diğer',
      completed: false,
      createdAt: new Date(),
      dueDate: this.taskDueDate ? new Date(this.taskDueDate) : null
      
    };

    await addDoc(collection(this.firestore, 'tasks'), task);

    // Formu temizle
    this.taskTitle = '';
    this.taskDescription = '';
    this.taskCategory = '';
    this.taskDueDate = '';
  }
  }
  
  //istatistik
  getStats(tasks: any[]) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;
  return { total, completed, remaining };
}

  


  async toggleComplete(task: any) {
    const taskRef = doc(this.firestore, 'tasks', task.id);
    await updateDoc(taskRef, { completed: !task.completed });
  }

  async deleteTask(task: any) {
    const taskRef = doc(this.firestore, 'tasks', task.id);
    await deleteDoc(taskRef);
  }

  getBadgeClass(category: string): string {
    // CSS badge.İş gibi sınıflar için direkt kategori adı dön
    return category || 'Diğer';
  }

  filteredTasks(tasks: any[]) {
  return tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(this.searchText.toLowerCase());
    const matchesCategory = this.selectedFilterCategory === 'Tümü' || task.category === this.selectedFilterCategory;
    return matchesSearch && matchesCategory;
  });
}
}