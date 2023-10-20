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
    profilePic: yoda,
    content: "Hello master Kenobi!",
    timestamp: "05H 42",
    roomId: "1",
  },
  {
    contactName: "Darth Vader",
    profilePic: vader,
    content: "Where are you hiding?",
    timestamp: "08H 12",
    roomId: "2",
  },
  {
    contactName: "Luke Skywalker",
    profilePic: luke,
    content:
      "Master! I was thinking about the last training we had, and I had some questions regarding some concept we learnt",
    timestamp: "Yesterday",
    roomId: "3",
  },
  {
    contactName: "Padme",
    profilePic: padme,
    content: "I am worried about Anakin",
    timestamp: "Yesterday",
    roomId: "4",
  },
  {
    contactName: "Qui-Gon",
    profilePic: quiGon,
    content: "I am not dead. I mean I am but not like what you think!",
    timestamp: "12 Sept",
    roomId: "2342",
  },
  {
    contactName: "Anakin",
    profilePic: anakin,
    content: "Master, Padme and I we want to get married. What should I do?",
    timestamp: "12 Sept",
    roomId: "5",
  },
  {
    contactName: "Mace Windu",
    profilePic: mace,
    content: "Just so you know ahead, Anakin won't get the rank of master",
    timestamp: "12 Sept",
    roomId: "25124",
  },
  // {
  //   contactName: "Qui-Gon",
  //   profilePic: quiGon,
  //   content: "I am not dead. I mean I am but not like what you think!",
  //   timestamp: "12 Sept",
  //   roomId: "2342",
  // },
  // {
  //   contactName: "Anakin",
  //   profilePic: anakin,
  //   content: "Master, Padme and I we want to get married. What should I do?",
  //   timestamp: "12 Sept",
  //   roomId: "5",
  // },
  // {
  //   contactName: "Mace Windu",
  //   profilePic: mace,
  //   content: "Just so you know ahead, Anakin won't get the rank of master",
  //   timestamp: "12 Sept",
  //   roomId: "25124",
  // },
  // {
  //   contactName: "Qui-Gon",
  //   profilePic: quiGon,
  //   content: "I am not dead. I mean I am but not like what you think!",
  //   timestamp: "12 Sept",
  //   roomId: "2342",
  // },
  // {
  //   contactName: "Anakin",
  //   profilePic: anakin,
  //   content: "Master, Padme and I we want to get married. What should I do?",
  //   timestamp: "12 Sept",
  //   roomId: "5",
  // },
  // {
  //   contactName: "Mace Windu",
  //   profilePic: mace,
  //   content: "Just so you know ahead, Anakin won't get the rank of master",
  //   timestamp: "12 Sept",
  //   roomId: "25124",
  // },
];

const conversations = [
  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T17:41:00Z",
    content: "Master Yoda, disturbed I am.",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T17:42:00Z",
    content: "Hmm. Disturbed, you say? Tell me more, you must.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T17:44:00Z",
    content: "The dark side, I sense. Clouding everything, it is.",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T17:45:00Z",
    content: "Yes, yes. A shroud of the dark side has fallen.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T17:46:00Z",
    content: "Anakin worries me, Master Yoda.",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T17:47:00Z",
    content: "Ahh, Skywalker. Much fear, I sense in him.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T17:49:00Z",
    content: "How do we proceed?",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T17:50:00Z",
    content: "Mind what you have learned. Save you it can.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T17:52:00Z",
    content: "Should I confront him?",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T17:54:00Z",
    content:
      "Dangerous and unpredictable, the path of confrontation is. Proceed with caution, you must.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T17:56:00Z",
    content:
      "What about the Senate? Palpatine’s influence grows stronger every day.",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T17:58:00Z",
    content: "The dark side of the Force surrounds the Chancellor.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T18:00:00Z",
    content: "We must act quickly.",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T18:02:00Z",
    content: "Quickly, but wisely, Obi-Wan. Do or do not, there is no try.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T18:04:00Z",
    content: "Yes, Master Yoda. May the Force be with us.",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T18:05:00Z",
    content: "And also with you, young Kenobi.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T18:08:00Z",
    content: "Shall we inform the council?",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T18:09:00Z",
    content: "When the time is right, we will. Patience, we must have.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T18:11:00Z",
    content: "Understood. I shall meditate on this.",
  },
  {
    username: "Yoda",
    profilePic: yoda,
    time: "2022-09-15T18:12:00Z",
    content:
      "Good.\n Clear your mind must be, if you are to discover the real villains behind this plot.",
  },
];

const conversations2 = [
  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T15:30:00Z",
    content: "Vader, it’s not too late to turn back from the dark side.",
  },
  {
    username: "Darth Vader",
    profilePic: vader,
    time: "2022-09-16T16:45:00Z",
    content: 'The name "Anakin" no longer has any meaning for me.',
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-17T09:20:00Z",
    content: "You were my brother, Anakin. I loved you.",
  },
  {
    username: "Darth Vader",
    profilePic: vader,
    time: "2022-09-18T10:30:00Z",
    content: "Love is a weakness. Something the dark side has freed me from.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-19T11:40:00Z",
    content:
      "The dark side is a path to self-destruction. Don’t make the same mistakes.",
  },
];

const conversations5 = [
  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T14:21:00Z",
    content: "Anakin, where are you? The Council is convening soon.",
  },
  {
    username: "Anakin",
    profilePic: anakin,
    time: "2022-09-15T14:22:00Z",
    content:
      "I’m on my way, Master. Just finishing up some calibrations on my starfighter.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T14:23:00Z",
    content: "You and your machines. Well, make it quick.",
  },
  {
    username: "Anakin",
    profilePic: anakin,
    time: "2022-09-15T14:25:00Z",
    content: "Don’t worry, Master. You know I like to make an entrance.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T14:27:00Z",
    content: "Indeed. Sometimes too grand of an entrance.",
  },
  {
    username: "Anakin",
    profilePic: anakin,
    time: "2022-09-15T14:29:00Z",
    content: "You have to admit, it’s effective.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T14:30:00Z",
    content: "Perhaps, but subtlety has its merits too.",
  },
  {
    username: "Anakin",
    profilePic: anakin,
    time: "2022-09-15T14:31:00Z",
    content: "Subtlety doesn’t win wars.",
  },

  {
    username: "Obi-Wan",
    profilePic: obiwan,
    time: "2022-09-15T14:33:00Z",
    content: "It might not win wars, but it can save lives.",
  },
  {
    username: "Anakin",
    profilePic: anakin,
    time: "2022-09-15T14:34:00Z",
    content: "Fair point, Master. I’m on my way now. See you soon.",
  },
];

export const conversationObject = {
  1: conversations,
  2: conversations2,
  5: conversations5,
};
