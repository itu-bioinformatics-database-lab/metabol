import { Component, OnInit } from '@angular/core';
import {LoadingService} from '../../services/loading/loading.service';

@Component({
  moduleId: module.id,
  selector: 'app-documentation',
  templateUrl: 'documentation.component.html',
  styleUrls: ['documentation.component.css'],
})
export class DocumentationComponent implements OnInit {

  constructor(private loading: LoadingService) {

  }

  ngOnInit() {
    this.loading.start();

  }

}
