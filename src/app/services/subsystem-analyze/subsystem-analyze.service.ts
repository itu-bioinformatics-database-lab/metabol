import {LoginService} from "../login/login.service";
import {MetaboliteConcentration} from "../../models/metaboliteConcentration";
import {Http} from "@angular/http";
import { Injectable } from '@angular/core';
import {AppSettings} from "../../appSettings";
import {SubsystemTreeNode} from "../../models/subsystem";

@Injectable()
export class SubsystemAnalyzeService {
  apiUrl: String;
  solutionTree: SubsystemTreeNode;

  constructor(private http: Http, private login: LoginService) {
    this.apiUrl = `${AppSettings.API_ENDPOINT}/subsystems-analyze`;
    this.solutionTree = {
      name: "All"
    };
  }

  getSolutions(
    analyzeName: string,
    data: Array<MetaboliteConcentration>,
    callback: (data: { [solutions: string]: Set<string> }) => void) {

    let postData = {
      "name": analyzeName,
      "concentrationChanges": data
    };

    this.http.post(`${this.apiUrl}`, postData, this.login.optionByAuthorization())
      .map(res => res.json()).subscribe(callback);
  }

  reverseDict(dict: { [solution: string]: Set<string> }): { [pathways: string]: Set<string> } {
    let reverseDict: { [pathways: string]: Set<string> } = {};
    for (let key in dict)
      dict[key].forEach(x => {
        if (!reverseDict[x]) reverseDict[x] = new Set<string>();
        reverseDict[x].add(key);
      });
    return reverseDict;
  }

  mostActivePathway(data: { [pathways: string]: Set<string> }): string {
    let max = 0;
    let pmost = "";
    for (let key in data)
      if (data[key].size > max) {
        max = data[key].size;
        pmost = key;
      }
    return pmost;
  }

  pathwayIntersection(pathwayName: string, data: { [pathways: string]: Set<string> })
    : [{ [intersection: string]: Set<string> }, { [nonintersection: string]: Set<string> }] {

    let intersection: { [pathways: string]: Set<string> } = {};
    let nonintersection: { [pathways: string]: Set<string> } = {};

    for (let key in data) {
      if (this.isThereIntersetion(data[pathwayName], data[key]))
        intersection[key] = data[key];
      else
        nonintersection[key] = data[key];
    }

    delete intersection[pathwayName];

    return [intersection, nonintersection];
  }

  private isThereIntersetion(set1: Set<any>, set2: Set<any>) {
    let intersection = false;
    set1.forEach(x => {
      if (set2.has(x)) intersection = true;
    });
    return intersection;
  }

  createSolutionTree(parent, data: { [pathways: string]: Set<string> }) {
    let mostActivePathway = this.mostActivePathway(data);
    let nmostActiveNode: SubsystemTreeNode = {
      name : mostActivePathway
    };

    this.solutionTree.children.push(nmostActiveNode);

    let [intersection, nonintersection] = this.pathwayIntersection(mostActivePathway, data);

  }



}
