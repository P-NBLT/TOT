import { friendshipBuilder } from "../services/relationship.services.js";

const lightSide = ["'Rebellion'", "'Republic'", "'Jedi Order'", "'Resistance'"];
const federationSide = ["'Separatist Alliance'"];
const darkSide = ["'Empire'", "'First Order'", "'Sith'"];
const criminals = ["'Bounty Hunters'", "'Criminals'", "'Pirates'"];
const alliances = [lightSide, federationSide, darkSide, criminals];

for (let alliance of alliances) {
  await friendshipBuilder(alliance);
}
