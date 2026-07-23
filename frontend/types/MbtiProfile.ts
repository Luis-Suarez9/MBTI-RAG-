// frontend/types/MbtiProfile.ts

export interface MbtiProfile {
  id: number;
  type: string;
  title: string;
  description: string;
  whoAreThey: string;
  methodology: string;
  coreStrengths: Record<string, string>;
  compatibility: {
    synergy: string;
    challenges: string;
  };
  growthJourney: string;
  quote: string;
}
