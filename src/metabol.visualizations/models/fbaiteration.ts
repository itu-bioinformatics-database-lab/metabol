import * as d3 from 'd3';

export interface FbaIteration {
  id: string;
  fba: number;
  time: number;
  constraints: Array<String>;
  fluxes: Array<Array<number>>;
  nodes: Array<FbaNode>;
  links: Array<FbaLink>;
}

export interface FbaNode extends d3.layout.force.Node {
  id?: number;
  name: string;
  type: string;
  index?: number;
  v?: number;
  isBorder?: boolean;
  concentration?: number;
  change?: string;
  color?: string;
  iteration?: number;
}

export interface FbaLink extends d3.layout.force.Link<FbaNode | Number> {
  role: string;
  stoichiometry?: number;
}
