export type User = {
  id: string;
  username?: string;
  bot: boolean;
  side?: string;
  affinity?: string;
  profilePic?: string;
};

type Session = {};

export enum SWFactions {
  REPUBLIC = "Republic",
  CONFEDERATION = "Separatiste Alliance",
  EMPIRE = "Empire",
  REBELLION = "Rebellion",
  // FIRST_ORDER = "First Order",
  // BOUNTY_HUNTER = "Bount Hunter",
}
