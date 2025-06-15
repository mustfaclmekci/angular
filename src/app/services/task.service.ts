// angular servisleri için gerekli modül
import { Injectable } from '@angular/core';
// firestore veritabanı işlemleri için modül
import { AngularFirestore } from '@angular/fire/compat/firestore';
// kullanıcı giriş çıkış işlemleri için auth servisi
import { AngularFireAuth } from '@angular/fire/compat/auth';
// task modelini import ettik
import { Task } from '../models/task';
// observable yapılar ve rxjs operatörleri
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

// bu servis app genelinde kullanılabilir hale geliyor
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // firestore ve auth servislerini constructor ile alıyoruz
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  // yeni görev eklemek için fonksiyon
  async addTask(task: Task) {
    const user = await this.auth.currentUser; // aktif kullanıcıyı alıyoruz
    const userId = user?.uid; // uid'sini çekiyoruz

    // görev bilgilerini veritabanına ekliyoruz
    return this.firestore.collection('tasks').add({
      title: task.title,
      description: task.description,
      category: task.category || 'Kategori yok', // kategori boşsa varsayılan veriyoruz
      userId: userId,
      completed: false, // yeni görev otomatik olarak tamamlanmamış olacak
      createdAt: new Date(), // eklenme zamanı
    });
  }

  // kullanıcıya ait görevleri getirir
  getTasks(): Observable<Task[]> {
    return this.auth.authState.pipe(
      map((user) => user?.uid), // kullanıcı uid'si alınıyor
      switchMap((uid) => {
        if (!uid) {
          return of([]); // kullanıcı yoksa boş array döner
        }

        // görevleri uid'ye göre filtreleyip tarihe göre sıralıyoruz
        return this.firestore
          .collection<Task>('tasks', (ref) =>
            ref.where('userId', '==', uid).orderBy('createdAt', 'desc')
          )
          .snapshotChanges()
          .pipe(
            map((actions) =>
              actions.map((a) => {
                const data = a.payload.doc.data() as Task;
                const id = a.payload.doc.id;
                return { id, ...data }; // her göreve id'yi de ekleyip geri döner
              })
            )
          );
      })
    );
  }

  // görev silme fonksiyonu
  deleteTask(id: string) {
    return this.firestore.doc(`tasks/${id}`).delete();
  }

  // görev güncelleme fonksiyonu (örneğin tamamlandı durumunu değiştirme)
  updateTask(id: string, task: Partial<Task>) {
    return this.firestore.doc(`tasks/${id}`).update(task);
  }
}
