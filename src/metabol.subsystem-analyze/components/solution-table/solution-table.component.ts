import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'solution-table',
  templateUrl: './solution-table.component.html',
  styleUrls: ['./solution-table.component.css'],
})
export class SolutionTableComponent implements OnChanges {

  rows = [];

  activeVisualization: string;

  @Input() solutions = {};
  @Input() inactiveSubsystems = [];
  @Output() rowClick = new EventEmitter();

  ngOnChanges() {
    if (this.solutions) {
      this.rows = _.toPairs(this.solutions).map((p) => {
        return { "name": p[0], "subsystems": p[1], "active": true }
      });
    }
    for (let s of this.inactiveSubsystems)
      for (let r of this.rows)
        if (_.includes(r.subsystems, s))
          r.active = false;
  }

  rowOnclick(s) {
    this.activeVisualization = s.name;
    this.rowClick.emit(s.name);
    this.rows = this.rows.filter(x => x.name != s.name);
    this.rows.unshift(s);
  }

}
