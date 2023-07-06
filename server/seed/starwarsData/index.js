import path from "path";
import fs from "fs";

// this object has for purpose to gather the data from the json files
// data planets and affinities property will be used to as source of
// data to populate the database.

// I got the data from different source such as SWAPI and chat GPT

export const dataManager = {
  characters: null,
  planets: null,
  affinities: null,
  setAffinities() {
    this.affinities = [];
    for (let record of this.characters) {
      let affinity = record.affinity;
      this.affinities.includes(affinity) || affinity == "unknown"
        ? null
        : this.affinities.push(affinity);
    }
  },
  generateEmail() {
    this.characters.map((record) => {
      let email =
        record.name.toLowerCase().split(" ").join("") + "@starmail.com";
      record.email = email;
    });
  },
  parser(fileName, store) {
    const file = path.join(process.cwd(), fileName);
    if (this[store] === null) this[store] = JSON.parse(fs.readFileSync(file));
    else console.log("the json file has already been parsed");
  },
};

dataManager.parser("./seed/starwarsData/characters.json", "characters");
dataManager.parser("./seed/starwarsData/planets.json", "planets");

dataManager.setAffinities();
dataManager.generateEmail();
