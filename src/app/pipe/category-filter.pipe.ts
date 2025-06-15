import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {
  transform(tasks: any[], category: string): any[] {
    if (!category) return tasks;
    return tasks.filter(task => task.category === category);
  }
}
