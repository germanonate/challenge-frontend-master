import { Pipe, PipeTransform } from '@angular/core';

// Used to cast objects in template
@Pipe({ name: 'as', pure: true })
export class AsPipe implements PipeTransform {
  transform<T>(value: any, args?: T): T {
    return value as T;
  }
}
