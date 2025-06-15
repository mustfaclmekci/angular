export interface Task {
  id?: string;
  title: string;
  description?: string;
  category?: string;
  completed: boolean;
  uid: string;
  createdAt: any;
}
