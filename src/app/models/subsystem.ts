import * as d3 from 'd3';

export interface SubsystemTreeNode extends d3.layout.tree.Node {
  name: string;
}
