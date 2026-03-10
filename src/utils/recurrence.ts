import moment from "moment";
import { RecurrenceRule, Task } from "../types/task";

export function getNextOccurrence(task: Task): Date | null {
  if (!task.recurrence) return null;

  const { frequency, interval } = task.recurrence;
  const base = task.completedAt ? moment(task.completedAt) : moment();

  switch (frequency) {
    case "daily":
      return base.add(interval, "days").toDate();
    case "weekly":
      return base.add(interval, "weeks").toDate();
    case "monthly":
      return base.add(interval, "months").toDate();
    default:
      return null;
  }
}

export function shouldCreateInstance(task: Task, today: Date): boolean {
  if (!task.recurrence || task.status !== "completed") return false;

  const next = getNextOccurrence(task);
  if (!next) return false;

  if (task.recurrence.endDate && moment(next).isAfter(task.recurrence.endDate)) {
    return false;
  }

  return moment(next).isSameOrBefore(today, "day");
}

export function calculateStreak(completionDates: string[], frequency: RecurrenceRule["frequency"], interval: number): number {
  if (completionDates.length === 0) return 0;

  const sorted = [...completionDates]
    .map((d) => moment(d))
    .sort((a, b) => b.valueOf() - a.valueOf());

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = sorted[i - 1].diff(sorted[i], "days");
    const expected = frequency === "daily" ? interval : frequency === "weekly" ? interval * 7 : interval * 30;
    if (diff <= expected + 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
