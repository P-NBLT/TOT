import vader from "@/assets/images/darth-vader-pic.webp";
import yoda from "@/assets/images/yoda-profile-pic.jpeg";
import luke from "@/assets/images/luke-profile-pic.jpeg";
import obiwan from "@/assets/images/obiwan-profile-pic.jpeg";
import anakin from "@/assets/images/anakin-profile-pic.jpeg";
import padme from "@/assets/images/padme-profile-pic.jpeg";
import quiGon from "@/assets/images/qui-gon-profile-pic.jpeg";
import mace from "@/assets/images/mace-windu-profile-pic.webp";

export const feedData = [
  {
    author: {
      authorPic: luke,
      name: "Luke Skywalker",
      faction: "Rebellion",
    },
    content:
      "In a galaxy far, far away, the Jedi and Sith clashed in epic duels, while starfighters battled among the stars. Amidst it all, hope persisted.",
    metrics: { likes: 10, comments: 1 },
  },
  {
    author: { authorPic: luke, name: "Luke Skywalker", faction: "Rebellion" },

    content:
      "In a galaxy far, far away, the Jedi and Sith clashed in epic duels, while starfighters battled among the stars. Amidst it all, hope persisted.",
    metrics: { likes: 10, comments: 1 },
    engagement: {
      engagementAuthor: {
        name: "Yoda",
        authorPic: yoda,
        faction: "Republic",
      },

      type: "comment",
      engagementComment: {
        content: "indeed",
        metrics: { likes: 1, comments: 0 },
      },
    },
  },

  {
    author: {
      authorPic: luke,
      name: "Luke Skywalker",
      faction: "Rebellion",
    },
    content:
      "In a galaxy far, far away, the Jedi and Sith clashed in epic duels, while starfighters battled among the stars. Amidst it all, hope persisted.",
    metrics: { likes: 10, comments: 1 },
    engagement: {
      type: "like",
      engagementAuthor: {
        name: "Darth Vader",
        authorPic: vader,
        faction: "Empire",
      },
    },
  },
];

export const userData = {
  username: "Obiwan",
  faction: "Republic",
  profilePic: obiwan,
};

export const userMessages = [
  {
    contactName: "Yoda",
    contactPic: yoda,
    content: "Hello master Kenobi!",
    timestamp: "05H 42",
  },
  {
    contactName: "Darth Vader",
    contactPic: vader,
    content: "Where are you hiding?",
    timestamp: "08H 12",
  },
  {
    contactName: "Luke Skywalker",
    contactPic: luke,
    content:
      "Master! I was thinking about the last training we had, and I had some questions regarding some concept we learnt",
    timestamp: "Yesterday",
  },
  {
    contactName: "Padme",
    contactPic: padme,
    content: "I am worried about Anakin",
    timestamp: "Yesterday",
  },
  {
    contactName: "Qui-Gon",
    contactPic: quiGon,
    content: "I am not dead. I mean I am but not like what you think!",
    timestamp: "12 Sept",
  },
  {
    contactName: "Anakin",
    contactPic: anakin,
    content: "Master, Padme and I we want to get married. What should I do?",
    timestamp: "12 Sept",
  },
  {
    contactName: "Mace Windu",
    contactPic: mace,
    content: "Just so you know ahead, Anakin won't get the rank of master",
    timestamp: "12 Sept",
  },
];
