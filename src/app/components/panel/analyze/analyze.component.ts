import { Component, OnInit } from '@angular/core';
import {Http, HTTP_PROVIDERS} from '@angular/http';
import {Router} from '@angular/router';
import {AnalyzeService} from '../../../services/analyze/analyze.service';



@Component({
  moduleId: module.id,
  selector: 'app-analyze',
  templateUrl: 'analyze.component.html',
  styleUrls: ['analyze.component.css']
})
export class AnalyzeComponent {

    constructor(private _AnalyzeService: AnalyzeService,private http: Http){

      }

      getList(){
          this._AnalyzeService.getList((data) => {
              console.log(data);

          });

      }

}
