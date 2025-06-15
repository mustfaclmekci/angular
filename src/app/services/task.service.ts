import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  // Görev ekle
  async addTask(task: Task) {
    const user = await this.auth.currentUser;
    const userId = user?.uid;
    return this.firestore.collection('tasks').add({
      title: task.title,
      description: task.description,
      category: task.category || 'Kategori yok',
      userId: userId,
      completed: false,
      createdAt: new Date(),
    });
  }

  // Görevleri getir (yalnızca giriş yapan kullanıcıya ait olanlar)
  getTasks(): Observable<Task[]> {
    return this.auth.authState.pipe(
      map((user) => user?.uid),
      switchMap((uid) => {
        if (!uid) {
          return of([]); // boş liste döndür
        }
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
                return { id, ...data };
              })
            )
          );
      })
    );
  }

  // Görev sil
  deleteTask(id: string) {
    return this.firestore.doc(`tasks/${id}`).delete();
  }

  // Görev güncelle
  updateTask(id: string, task: Partial<Task>) {
    return this.firestore.doc(`tasks/${id}`).update(task);
  }
}
