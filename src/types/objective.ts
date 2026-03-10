export interface Objective {
  id: string;
  title: string;
  progress: number;
  color: string;
  accent: string;
  daysLeft: number;
  completed: boolean;
  completedAt?: string;
  archivedAt?: string;
}
