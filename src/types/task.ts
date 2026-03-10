export interface RecurrenceRule {
  frequency: "daily" | "weekly" | "monthly";
  interval: number;
  daysOfWeek?: number[];
  endDate?: string;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  duration: string;
  status: "pending" | "completed";
  category: string;
  color: string;
  priority: "high" | "medium" | "low";
  order?: number;
  completedAt?: string;
  archivedAt?: string;
  recurrence?: RecurrenceRule;
  streak?: number;
  lastCompletedDate?: string;
  parentTaskId?: string;
}
