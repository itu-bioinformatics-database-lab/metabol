export class Reaction {
  id: string;
  name: string;
  reversible: boolean;
  model: string;
  annotation: string;
  sboTerm: string;
  subsystem: string;
  notes: Array<string>;
}

export class ConnectedMetabolite {
  id: string;
  name: string;
  stoichiometry: number;
  reactions: Array<{ id: string, stoichiometry: number }>;
}

export class ConnectedMetabolites {
  metabolites: ConnectedMetabolite[];
}
