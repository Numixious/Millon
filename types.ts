
export enum AppStep {
  Intro,
  Questionnaire,
  UserInfo,
  Generating,
  Results,
}

export interface Question {
  id: number;
  text: string;
}

export type Answer = 'yes' | 'no';
export type Answers = Map<number, Answer>;

export interface UserInfo {
  fullName: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
}

export interface Interpretation {
  profileSummary: string;
  validityIndices: string;
  clinicalPatterns: string;
  severePathology: string;
  clinicalSyndromes: string;
  diagnosticConsiderations: string;
  recommendations: string;
}

export interface ReportData {
  rawScores: Record<Scale, number>;
  brScores: Record<Scale, number>;
  interpretation: Interpretation;
}

// Updated scale codes to match the provided image exactly.
export type Scale =
  | 'X' | 'Y' | 'Z' // Modifying Indices
  | '1' | '2A' | '2B' | '3' | '4' | '5' | '6A' | '6B' | '7' | '8A' | '8B' // Clinical Personality Patterns
  | 'S' | 'C' | 'P' // Severe Personality Pathology
  | 'A' | 'H' | 'N' | 'D' | 'B' | 'T' | 'R' // Clinical Syndromes
  | 'SS' | 'CC' | 'PP'; // Severe Clinical Syndromes

export interface ScaleDetail {
    name: string;
    category: string;
}
