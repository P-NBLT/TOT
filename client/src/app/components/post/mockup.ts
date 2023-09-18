import vader from "@/assets/images/darth-vader-pic.webp";
import yoda from "@/assets/images/yoda-profile-pic.jpeg";
import luke from "@/assets/images/luke-profile-pic.jpeg";

export const data = [
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
