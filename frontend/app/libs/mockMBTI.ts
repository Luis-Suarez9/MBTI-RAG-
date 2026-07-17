
export interface MbtiProfile {
  id: number;
  type: string;
  title: string;
  description: string;
  icon: string;
  category: 'Analysts' | 'Diplomats' | 'Sentinels' | 'Explorers';
}

export const mbtiProfiles: MbtiProfile[] = [
  // Analysts
  {
    id: 1,
    type: "INTJ",
    title: "The Architect",
    description: "A strategic thinker who designs long-term master plans.",
    icon: "🦹",
    category: "Analysts",
  },
  {
    id: 2,
    type: "INTP",
    title: "The Logician",
    description: "An analytical theorist driven to unlock hidden patterns.",
    icon: "🕵️",
    category: "Analysts",
  },
  {
    id: 3,
    type: "ENTJ",
    title: "The Commander",
    description: "A bold leader who excels at organizing people and goals.",
    icon: "👑",
    category: "Analysts",
  },
  {
    id: 4,
    type: "ENTP",
    title: "The Debater",
    description: "A quick-witted innovator who loves exploring new ideas.",
    icon: "🎭",
    category: "Analysts",
  },

  // Diplomats
  {
    id: 5,
    type: "INFJ",
    title: "The Advocate",
    description: "An idealistic protector driven to create meaningful change.",
    icon: "🕊️",
    category: "Diplomats",
  },
  {
    id: 6,
    type: "INFP",
    title: "The Mediator",
    description: "An empathetic soul true to their personal values.",
    icon: "🌸",
    category: "Diplomats",
  },
  {
    id: 7,
    type: "ENFJ",
    title: "The Protagonist",
    description: "An inspiring mentor who motivates others to succeed.",
    icon: "🌟",
    category: "Diplomats",
  },
  {
    id: 8,
    type: "ENFP",
    title: "The Campaigner",
    description: "A vibrant enthusiast who sees endless possibilities.",
    icon: "🎨",
    category: "Diplomats",
  },

  // Sentinels
  {
    id: 9,
    type: "ISTJ",
    title: "The Logistician",
    description: "A practical, highly reliable realist who upholds order.",
    icon: "📚",
    category: "Sentinels",
  },
  {
    id: 10,
    type: "ISFJ",
    title: "The Defender",
    description: "A warm, dedicated caretaker who quietly protects others.",
    icon: "🛡️",
    category: "Sentinels",
  },
  {
    id: 11,
    type: "ESTJ",
    title: "The Executive",
    description: "An organized administrator focused on efficiency and rules.",
    icon: "💼",
    category: "Sentinels",
  },
  {
    id: 12,
    type: "ESFJ",
    title: "The Consul",
    description: "A social, attentive helper who builds community harmony.",
    icon: "🤝",
    category: "Sentinels",
  },

  // Explorers
  {
    id: 13,
    type: "ISTP",
    title: "The Virtuoso",
    description: "A hands-on investigator who loves troubleshooting tools.",
    icon: "🔧",
    category: "Explorers",
  },
  {
    id: 14,
    type: "ISFP",
    title: "The Adventurer",
    description: "A flexible artist who explores life on their own terms.",
    icon: "🎸",
    category: "Explorers",
  },
  {
    id: 15,
    type: "ESTP",
    title: "The Entrepreneur",
    description: "An action-oriented thrill-seeker who lives in the moment.",
    icon: "🏍️",
    category: "Explorers",
  },
  {
    id: 16,
    type: "ESFP",
    title: "The Entertainer",
    description: "A spontaneous entertainer who makes everyday life fun.",
    icon: "🎤",
    category: "Explorers",
  },
];