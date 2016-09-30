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
  v?: number;
  isBorder?: boolean;
  concentration?: number;
  change?: string;
  color?: string;
  iteration?: number;
  deactive?: boolean;
}

export interface FbaLink extends d3.layout.force.Link<FbaNode | Number | SubsystemNode> {
  role: string;
  stoichiometry?: number;
}

export interface SubsystemNode extends d3.layout.force.Node {
  name: string;
  type: string;
  reactions?: FbaNode[];
  deactive?: boolean;
}
