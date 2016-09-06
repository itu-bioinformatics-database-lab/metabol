import {ChangeDetectorRef} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoadingService {

  loading$: Observable<boolean>;
  private loadingSubject: Subject<boolean>;

  constructor() {
    this.loadingSubject = new Subject<boolean>();
    this.loading$ = this.loadingSubject.asObservable();
  }

  start() { this.loadingSubject.next(true) }
  finish() { this.loadingSubject.next(false) }

}
