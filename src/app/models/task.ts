// görevlerin yapısını tanımlıyo burda
export interface Task {
  // id firestore’dan geliyo sonradan geldiği için soru işareti koyuyoz
  id?: string;

  // görev adı bu zorunlu olacak
  title: string;

  // açıklama kısmı boş olabilir
  description?: string;

  // görev kategorisi (iş okul vs)
  category?: string;

  // tamamlandı mı değil mi onu tutar
  completed: boolean;

  // kullanıcı kimliği, kim eklediyse onun uid'si
  uid: string;

  // ne zaman eklendiği bilgisi
  createdAt: any;
}
