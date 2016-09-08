export class RelatedMetabolite {
  id: Number;
  name: String;
  stoichiometry: Number;
  reactions: RelatedReaction[];
}

export class RelatedReaction {
  id: Number;
  name: String;
  subsystem: String;
  stoichiometry: Number;
  metabolites: RelatedMetabolite[];
}
