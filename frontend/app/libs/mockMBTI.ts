
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
    description: "Decisive, original, and insightful.",
    icon: "🦹",
    category: "Analysts",
  },
  {
    id: 2,
    type: "INTP",
    title: "The Logician",
    description: "Innovative inventors with an unquenchable thirst for knowledge.",
    icon: "🕵️",
    category: "Analysts",
  },
  {
    id: 3,
    type: "ENTJ",
    title: "The Commander",
    description: "Bold, imaginative, and strong-willed leaders.",
    icon: "👑",
    category: "Analysts",
  },
  {
    id: 4,
    type: "ENTP",
    title: "The Debater",
    description: "Smart and curious thinkers who love intellectual challenges.",
    icon: "🎭",
    category: "Analysts",
  },

  // Diplomats
  {
    id: 5,
    type: "INFJ",
    title: "The Advocate",
    description: "Quiet, inspiring, and dedicated idealists.",
    icon: "🕊️",
    category: "Diplomats",
  },
  {
    id: 6,
    type: "INFP",
    title: "The Mediator",
    description: "Poetic, kind, and guided by their values.",
    icon: "🌸",
    category: "Diplomats",
  },
  {
    id: 7,
    type: "ENFJ",
    title: "The Protagonist",
    description: "Charismatic leaders who inspire others.",
    icon: "🌟",
    category: "Diplomats",
  },
  {
    id: 8,
    type: "ENFP",
    title: "The Campaigner",
    description: "Enthusiastic, creative, and sociable free spirits.",
    icon: "🎨",
    category: "Diplomats",
  },

  // Sentinels
  {
    id: 9,
    type: "ISTJ",
    title: "The Logistician",
    description: "Practical, responsible, and dependable.",
    icon: "📚",
    category: "Sentinels",
  },
  {
    id: 10,
    type: "ISFJ",
    title: "The Defender",
    description: "Warm-hearted protectors always ready to help.",
    icon: "🛡️",
    category: "Sentinels",
  },
  {
    id: 11,
    type: "ESTJ",
    title: "The Executive",
    description: "Excellent organizers who value tradition and order.",
    icon: "💼",
    category: "Sentinels",
  },
  {
    id: 12,
    type: "ESFJ",
    title: "The Consul",
    description: "Caring, social, and eager to support others.",
    icon: "🤝",
    category: "Sentinels",
  },

  // Explorers
  {
    id: 13,
    type: "ISTP",
    title: "The Virtuoso",
    description: "Bold experimenters who master practical skills.",
    icon: "🔧",
    category: "Explorers",
  },
  {
    id: 14,
    type: "ISFP",
    title: "The Adventurer",
    description: "Flexible artists who enjoy exploring life.",
    icon: "🎸",
    category: "Explorers",
  },
  {
    id: 15,
    type: "ESTP",
    title: "The Entrepreneur",
    description: "Energetic, perceptive, and action-oriented.",
    icon: "🏍️",
    category: "Explorers",
  },
  {
    id: 16,
    type: "ESFP",
    title: "The Entertainer",
    description: "Spontaneous, lively, and fun-loving performers.",
    icon: "🎤",
    category: "Explorers",
  },
];