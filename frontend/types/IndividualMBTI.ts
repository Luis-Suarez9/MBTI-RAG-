// frontend/types/IndividualMBTI.ts

export interface IndividualMBTI {
  id: number;
  name: string;
  nickname?: string | null;
  aiDescription?: string | null;
  coreExplain?: string | null;
  eiPercent: number;
  snPercent: number;
  tfPercent: number;
  jpPercent: number;
  userId: string;
  createdAt: string;
}
