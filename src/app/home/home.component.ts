// angular bileşeni için gerekli modül
import { Component, OnInit } from '@angular/core';
// görev listesini gerçek zamanlı izlemek için observable
import { Observable } from 'rxjs';
// firebase firestore işlemleri
import {
  Firestore, collection, collectionData, addDoc,
  doc, updateDoc, deleteDoc, query, where
} from '@angular/fire/firestore';
// kullanıcı oturum kontrolü için firebase auth
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-home', // bu bileşeni html içinde kullanırken adı
  templateUrl: './home.component.html', // html dosyası
  styleUrls: ['./home.component.css'] // css dosyası
})
export class HomeComponent implements OnInit {
  // input alanlarındaki veriler (yeni görev ekleme formu)
  taskTitle: string = '';
  taskDescription: string = '';
  taskCategory: string = '';
  taskDueDate: string = ''; // bitiş tarihi

  // filtreleme için arama ve kategori alanları
  searchText: string = '';
  selectedFilterCategory: string = 'Tümü';
  showCompleted: boolean = true;

  // görev listesi ve kullanıcı bilgisi
  tasks$: Observable<any[]> | undefined; // observable görev dizisi
  userId: string = ''; // giriş yapan kullanıcının id'si

  constructor(private firestore: Firestore, private auth: Auth) {}

  // sayfa ilk yüklendiğinde çalışır
  ngOnInit() {
    // kullanıcı giriş yaptıysa görevleri çekiyoruz
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.userId = user.uid;

        // sadece o kullanıcıya ait görevleri çekiyoruz
        const tasksRef = collection(this.firestore, 'tasks');
        const userTasksQuery = query(tasksRef, where('uid', '==', this.userId));

        // firestore'dan veriyi observable olarak alıyoruz (gerçek zamanlı)
        this.tasks$ = collectionData(userTasksQuery, { idField: 'id' });
      }
    });
  }

  // yeni görev ekleme fonksiyonu
  async addTask() {
    // boş başlık ya da açıklama varsa ekleme
    if (!this.taskTitle.trim() || !this.taskDescription.trim()) return;

    const user = this.auth.currentUser;
    if (user) {
      // görev objesi oluşturuyoruz
      const task = {
        uid: user.uid,
        title: this.taskTitle,
        description: this.taskDescription,
        category: this.taskCategory || 'Diğer',
        completed: false,
        createdAt: new Date(), // şu anki zaman
        dueDate: this.taskDueDate ? new Date(this.taskDueDate) : null
      };

      // firestore'a ekliyoruz
      await addDoc(collection(this.firestore, 'tasks'), task);

      // form alanlarını sıfırla
      this.taskTitle = '';
      this.taskDescription = '';
      this.taskCategory = '';
      this.taskDueDate = '';
    }
  }

  // görevlerle ilgili istatistikleri döner (toplam, tamamlanan, kalan)
  getStats(tasks: any[]) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const remaining = total - completed;
    return { total, completed, remaining };
  }

  // görev tamamlandıysa geri alır, değilse tamamlandı yapar
  async toggleComplete(task: any) {
    const taskRef = doc(this.firestore, 'tasks', task.id);
    await updateDoc(taskRef, { completed: !task.completed });
  }

  // görevi firestore'dan siler
  async deleteTask(task: any) {
    const taskRef = doc(this.firestore, 'tasks', task.id);
    await deleteDoc(taskRef);
  }

  // görev kategorisine göre css badge class'ı döner
  getBadgeClass(category: string): string {
    return category || 'Diğer';
  }

  // arama ve kategoriye göre filtrelenmiş görevleri döner
  filteredTasks(tasks: any[]) {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesCategory = this.selectedFilterCategory === 'Tümü' || task.category === this.selectedFilterCategory;
      return matchesSearch && matchesCategory;
    });
  }
}
