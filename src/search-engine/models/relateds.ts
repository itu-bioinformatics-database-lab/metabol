export class RelatedMetabolite {
  id: Number;
  type: String;
  name: String;
  stoichiometry: Number;
  reactions: RelatedReaction[];
}

export class RelatedReaction {
  id: Number;
  type: String;
  name: String;
  subsystem: String;
  stoichiometry: Number;
  metabolites: RelatedMetabolite[];
}
