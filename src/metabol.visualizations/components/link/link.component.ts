import { Component, Input, OnChanges } from '@angular/core';
import {FbaLink, FbaNode} from '../../models';
import {Location} from '@angular/common';

@Component({
  selector: '[link]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnChanges {

  @Input() link: FbaLink;
  url: string;

  constructor(private location: Location) { }

  isLinkActive(link: FbaLink) {
    let source = <FbaNode>link.source, target = <FbaNode>link.target;
    if (target.type == 'r')
      return !target.deactive;
    else if (source.type == 'r')
      return !source.deactive;
    else if (target.type == 'sub')
      return !target.deactive;
    else if (source.type == 'sub')
      return !source.deactive;
    return true;
  }

  linkArc(d) {
    let dx = d.target.x - d.source.x;
    let dy = d.target.y - d.source.y;
    let dr = Math.sqrt(dx * dx + dy * dy);
    return `M ${d.source.x}, ${d.source.y} A ${dr} , ${dr} 0 0,1 ${d.target.x} , ${d.target.y}`;
  }

  linkTextX(d) {
    let vx = d.target.x - d.source.x;
    let vy = d.target.y - d.source.y;
    let dis = Math.sqrt(vx * vx + vy * vy);
    let h = -0.15 * dis;
    let perX = h * (-1 * vy) / dis || 0;
    return perX + (d.target.x + d.source.x) / 2
  }

  linkTextY(d) {
    let vx = d.target.x - d.source.x;
    let vy = d.target.y - d.source.y;
    let dis = Math.sqrt(vx * vx + vy * vy);
    let h = -0.11 * dis;
    let perY = h * vx / dis || 0;
    return perY + (d.target.y + d.source.y) / 2;
  }

  ngOnChanges(d) {
    this.url = this.location.path();
  }

  stroke(d){
    return Math.log(Math.abs(d.stoichiometry)) + 2;
  }

}
