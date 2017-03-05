import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {AppSettings} from "../../../../app";
import {LoginService} from "../../../../metabol.auth/services";

@Component({
  selector: 'app-past-analysis',
  templateUrl: './past-analysis.component.html',
  styleUrls: ['./past-analysis.component.css']
})
export class PastAnalysisComponent implements OnInit {

  data;

  constructor(private http: Http, private login: LoginService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let apiUrl = `${AppSettings.API_ENDPOINT}/analysis/list`;
    this.http.get(apiUrl, this.login.optionByAuthorization())
      .map(res => res.json())
      .subscribe((data) => {
        this.data = data;
      });
  }

}
