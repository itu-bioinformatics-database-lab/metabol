export class RelatedMetabolite {
  id: string;
  name: string;
  stoichiometry: number;
  reactions: RelatedReaction[];
}

export class RelatedReaction {
  id: string;
  name: string;
  subsystem: string;
  stoichiometry: number;
  metabolites: RelatedMetabolite[];
}
