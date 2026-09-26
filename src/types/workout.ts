export interface workout {
  id: string;
  title: string;
  category: string[];
  equipment: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
  description?: string;
  instructions?: string[];
  completed?: boolean;
}

export type pagetype = 'home' | 'details' | 'plan';