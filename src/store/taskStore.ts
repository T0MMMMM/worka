import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Task } from "../types/task";

// ─── Task Theme ──────────────────────────────────────────────────────────────

export interface TaskTheme {
  id: string;
  label: string;
  color: string;
  emoji: string;
}

const DEFAULT_THEMES: TaskTheme[] = [
  { id: "1", label: "Lavande", color: "#7B6FCC", emoji: "🌿" },
  { id: "2", label: "Pêche",   color: "#C87060", emoji: "🌸" },
  { id: "3", label: "Sauge",   color: "#5A8A6A", emoji: "🏃" },
  { id: "4", label: "Or",      color: "#C0A020", emoji: "⭐" },
  { id: "5", label: "Ciel",    color: "#4B8FE0", emoji: "✈️" },
  { id: "6", label: "Lilas",   color: "#9060A0", emoji: "💜" },
  { id: "7", label: "Menthe",  color: "#3A9080", emoji: "🧘" },
  { id: "8", label: "Sable",   color: "#A08060", emoji: "🏖️" },
];

// ─── Initial tasks ────────────────────────────────────────────────────────────

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Appel client : Projet Worka",
    time: "10:00",
    duration: "30 min",
    status: "pending",
    category: "Travail",
    color: "#FF5722",
    priority: "high",
  },
  {
    id: "2",
    title: "Session Design System",
    time: "14:30",
    duration: "1h 30min",
    status: "completed",
    category: "Design",
    color: "#2196F3",
    priority: "medium",
  },
];

// ─── Store ────────────────────────────────────────────────────────────────────

interface TaskStore {
  // tasks
  tasks: Task[];
  archivedTasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  archiveTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
  // themes
  themes: TaskTheme[];
  addTheme: (theme: Omit<TaskTheme, "id">) => void;
  deleteTheme: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      // ── tasks ──
      tasks: INITIAL_TASKS,
      archivedTasks: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),

      toggleTask: (id) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (!task) return state;

          const isCompleting = task.status === "pending";
          const updatedTasks = state.tasks.map((t) =>
            t.id === id
              ? {
                  ...t,
                  status: (isCompleting ? "completed" : "pending") as Task["status"],
                  completedAt: isCompleting ? new Date().toISOString() : undefined,
                  streak: isCompleting && t.recurrence ? (t.streak ?? 0) + 1 : t.streak,
                  lastCompletedDate: isCompleting ? new Date().toISOString() : t.lastCompletedDate,
                }
              : t
          );

          if (isCompleting && task.recurrence) {
            const base = task.date ?? new Date().toISOString().split("T")[0];
            const d = new Date(base + "T12:00:00");
            if (task.recurrence.frequency === "daily") d.setDate(d.getDate() + 1);
            else if (task.recurrence.frequency === "weekly") d.setDate(d.getDate() + 7);
            else if (task.recurrence.frequency === "monthly") d.setMonth(d.getMonth() + 1);
            const nextDate = d.toISOString().split("T")[0];
            updatedTasks.push({
              ...task,
              id: (Date.now() + 1).toString(),
              date: nextDate,
              status: "pending",
              completedAt: undefined,
              streak: (task.streak ?? 0) + 1,
            });
          }

          return { tasks: updatedTasks };
        }),

      archiveTask: (id) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === id);
          if (!task) return state;
          return {
            tasks: state.tasks.filter((t) => t.id !== id),
            archivedTasks: [
              ...state.archivedTasks,
              { ...task, archivedAt: new Date().toISOString() },
            ],
          };
        }),

      reorderTasks: (tasks) => set({ tasks }),

      // ── themes ──
      themes: DEFAULT_THEMES,

      addTheme: (theme) =>
        set((state) => ({
          themes: [...state.themes, { ...theme, id: Date.now().toString() }],
        })),

      deleteTheme: (id) =>
        set((state) => ({
          themes: state.themes.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "worka-tasks-v2",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
