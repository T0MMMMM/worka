import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Task } from "../types/task";

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

interface TaskStore {
  tasks: Task[];
  archivedTasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  archiveTask: (id: string) => void;
  reorderTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: INITIAL_TASKS,
      archivedTasks: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: Date.now().toString() }],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

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

          // If completing a recurring task, create next instance
          if (isCompleting && task.recurrence) {
            const nextTask: Task = {
              ...task,
              id: Date.now().toString(),
              status: "pending",
              completedAt: undefined,
              streak: (task.streak ?? 0) + 1,
            };
            updatedTasks.push(nextTask);
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
    }),
    {
      name: "worka-tasks",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
