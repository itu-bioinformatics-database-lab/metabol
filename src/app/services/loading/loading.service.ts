import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {

  loading: boolean;
  constructor() { this.loading = false };
  start() { this.loading = true };
  finish() { this.loading = false };
}
