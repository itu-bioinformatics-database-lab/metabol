import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from "../../../../app";
import {LoginService} from "../../../../metabol.auth/services";
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-past-analysis-detail',
  templateUrl: './past-analysis-detail.component.html',
  styleUrls: ['./past-analysis-detail.component.css']
})
export class PastAnalysisDetailComponent implements OnInit {

  data;

  constructor(
    private http: Http,
    private login: LoginService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getData(params['key']);
    });
  }

  getData(id) {
    let apiUrl = `${AppSettings.API_ENDPOINT}/analysis/detail/${id}`;
    this.http.get(apiUrl, this.login.optionByAuthorization())
      .map(res => res.json())
      .subscribe((data) => {
        this.data = data;
      });
  }
}
