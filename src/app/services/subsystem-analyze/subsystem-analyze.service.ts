import {LoginService} from "../login/login.service";
import {MetaboliteConcentration} from "../../models/metaboliteConcentration";
import {Http} from "@angular/http";
import { Injectable } from '@angular/core';
import {AppSettings} from "../../appSettings";
import {SubsystemTreeNode} from "../../models/subsystem";

@Injectable()
export class SubsystemAnalyzeService {
  apiUrl: String;
  private solutionTree: SubsystemTreeNode;

  constructor(private http: Http, private login: LoginService) {
    this.apiUrl = `${AppSettings.API_ENDPOINT}/subsystems-analyze`;
    this.solutionTree = {
      name: "All",
      children: []
    };
  }

  /**
   * Calls metabolitics api and return solution for subsystem analyze
   * @param analyzeName Analyze name to save database to future review
   * @param data        Concentration of metabolites in network
   * @param callback    Result of analyze as callback function
   */
  getSolutions(
    analyzeName: string,
    data: Array<MetaboliteConcentration>,
    callback: (data: { [solutions: string]: Array<string> }) => void) {

    let postData = {
      "name": analyzeName,
      "concentrationChanges": data
    };

    this.http.post(`${this.apiUrl}`, postData, this.login.optionByAuthorization())
      .map(res => res.json()).subscribe(callback);
  }

  /**
   * Reverse dictionary of solution to dictionary of pathways
   * @param  dict Dictionary of solutions
   * @return Dictionary of pathways
   */
  reverseDict(dict: { [solution: string]: Array<string> }): { [pathways: string]: Array<string> } {
    let reverseDict: { [pathways: string]: Array<string> } = {};
    for (let key in dict)
      dict[key].forEach(x => {
        if (!reverseDict[x]) reverseDict[x] = new Array<string>();
        reverseDict[x].push(key);
      });
    return reverseDict;
  }

  /**
   * Finds most active pathway in solutions
   * @param data solution as dictionary of pathways
   * @return most active pathway
   */
  mostActivePathway(data: { [pathways: string]: Array<string> }): string {
    let max = 0;
    let pmost = "";
    for (let key in data)
      if (data[key].length > max) {
        max = data[key].length;
        pmost = key;
      }
    return pmost;
  }

  /**
   * Calculates new branch of solution visulazition tree
   * Most active pathway's children are intersection pathways without their diff solution
   * Most active pathway's parent's children are dif pathways without their intersection solution
   * @param  pathwayName most active pathways name in solutions tree
   * @param  data        data solution as dictionary of pathways
   * @return data solution as dictionary of pathways
   */
  newBranchsOfSolution(pathwayName: string, data: { [pathways: string]: Array<string> })
    : [{ [children: string]: Array<string> }, { [parentsChildren: string]: Array<string> }] {

    let children: { [pathways: string]: Array<string> } = {};
    let parentsChildren: { [pathways: string]: Array<string> } = {};

    for (let key in data) {
      let intersection = _.intersection(data[pathwayName], data[key]);
      let difference = _.difference(data[key], data[pathwayName]);

      if (intersection.length) children[key] = intersection;
      if (difference.length) parentsChildren[key] = difference;
    }

    delete children[pathwayName];

    return [children, parentsChildren];
  }


  createSolutionTree(parent, data: { [pathways: string]: Array<string> }) {
    let mostActivePathway = this.mostActivePathway(data);
    let nmostActiveNode: SubsystemTreeNode = {
      name: mostActivePathway,
      children: []
    };

    let [children, parentsChildren] = this.newBranchsOfSolution(mostActivePathway, data);

    if (Object.keys(children).length)
      this.createSolutionTree(nmostActiveNode, children)

    if (Object.keys(parentsChildren).length)
      this.createSolutionTree(parent, parentsChildren)


    let other = new Array<string>();

    for (let key in children)
      other = other.concat(data[key]);


    let directSolution: string[] = _.difference(data[mostActivePathway], other)

    for (let s of directSolution)
      nmostActiveNode.children.push(<SubsystemTreeNode>{
        name: s,
      });

    parent.children.push(nmostActiveNode);
  }

  getSolutionTree(data: { [pathways: string]: Array<string> }) {
    this.createSolutionTree(this.solutionTree, data);
    return this.solutionTree;
  }
}
