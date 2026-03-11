export interface Objective {
  id: string;
  title: string;
  progress: number;
  color: string;
  accent: string;
  daysLeft: number;
  completed: boolean;
  image?: string;
  completedAt?: string;
  archivedAt?: string;
}
