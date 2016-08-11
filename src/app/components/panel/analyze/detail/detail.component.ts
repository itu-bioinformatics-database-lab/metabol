import {AccordionComponent} from "../../../accordion/accordion.component";
import { Component, OnInit, ViewChild } from '@angular/core';
import {SavedResultComponent} from "./saved-result/saved-result.component";
import {AnalyzeService} from "../../../../services/analyze/analyze.service";
import {LoadingService} from "../../../../services/loading/loading.service";
import {ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.css'],
  providers: [AnalyzeService],
  directives: [SavedResultComponent, AccordionComponent]
})
export class DetailComponent implements OnInit {

  data: any;
  iterationLength: number;

  change = {
    '1': 'Increase Slightly',
    '2': 'Increase Dyramaticly',
    '-1': 'Decrease Slightly',
    '-2': 'Decrease Dyramaticly',
    '10': 'Exact Value'
  };

  @ViewChild(SavedResultComponent) savedResultComponent: SavedResultComponent;

  constructor(private route: ActivatedRoute, private analyze: AnalyzeService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.analyze.getDetail(params['key'], (data) => {
        this.data = data;
        this.savedResultComponent.iterationLength = this.data.iterations.length;
        this.savedResultComponent.next();
      });
    });
  }

  nextIteration($event: { iteration: number; callback: (data) => void; }) {
    $event.callback(this.data.iterations[$event.iteration]);
  }

}
