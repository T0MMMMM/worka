import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Objective } from "../types/objective";

const INITIAL_OBJECTIVES: Objective[] = [
  {
    id: "1",
    title: "Forces & Qualités personnelles",
    progress: 0.75,
    color: "#D4CFEE",
    accent: "#7B6FCC",
    daysLeft: 12,
    completed: false,
    image: "🌿",
  },
  {
    id: "2",
    title: "Construire la confiance",
    progress: 0.4,
    color: "#F0E8C0",
    accent: "#C0A020",
    daysLeft: 18,
    completed: false,
    image: "⭐",
  },
  {
    id: "3",
    title: "Marathon de Paris",
    progress: 0.9,
    color: "#C8DDCC",
    accent: "#5A8A6A",
    daysLeft: 3,
    completed: false,
    image: "🏃",
  },
  {
    id: "4",
    title: "Activation comportementale",
    progress: 0.55,
    color: "#F0E8D8",
    accent: "#A08060",
    daysLeft: 25,
    completed: false,
    image: "🧘",
  },
];

interface ObjectiveStore {
  objectives: Objective[];
  archivedObjectives: Objective[];
  addObjective: (objective: Omit<Objective, "id">) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  deleteObjective: (id: string) => void;
  updateProgress: (id: string, progress: number, completed: boolean) => void;
  archiveObjective: (id: string) => void;
}

export const useObjectiveStore = create<ObjectiveStore>()(
  persist(
    (set) => ({
      objectives: INITIAL_OBJECTIVES,
      archivedObjectives: [],

      addObjective: (objective) =>
        set((state) => ({
          objectives: [
            ...state.objectives,
            { ...objective, id: Date.now().toString() },
          ],
        })),

      updateObjective: (id, updates) =>
        set((state) => ({
          objectives: state.objectives.map((o) =>
            o.id === id ? { ...o, ...updates } : o
          ),
        })),

      deleteObjective: (id) =>
        set((state) => ({
          objectives: state.objectives.filter((o) => o.id !== id),
        })),

      updateProgress: (id, progress, completed) =>
        set((state) => ({
          objectives: state.objectives.map((o) =>
            o.id === id
              ? {
                  ...o,
                  progress: completed ? 1 : progress,
                  completed,
                  completedAt: completed
                    ? new Date().toISOString()
                    : undefined,
                }
              : o
          ),
        })),

      archiveObjective: (id) =>
        set((state) => {
          const objective = state.objectives.find((o) => o.id === id);
          if (!objective) return state;
          return {
            objectives: state.objectives.filter((o) => o.id !== id),
            archivedObjectives: [
              ...state.archivedObjectives,
              { ...objective, archivedAt: new Date().toISOString() },
            ],
          };
        }),
    }),
    {
      name: "worka-objectives-v3",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
