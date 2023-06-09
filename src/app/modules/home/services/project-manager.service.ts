import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagerService {
  addResource: BehaviorSubject<number> = new BehaviorSubject(0);
  addCost: BehaviorSubject<number> = new BehaviorSubject(0);
  resetCost: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
}
