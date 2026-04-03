// src/types/database.ts
// Typed interfaces for every Supabase table.
// Three variants per table: Row (SELECT), Insert (INSERT), Update (UPDATE).
// These are DB-layer types — separate from UI types in task.ts / objective.ts.

// ── Profile ───────────────────────────────────────────────────────────────────

export interface ProfileRow {
  id: string;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface ProfileInsert {
  id: string;
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
  created_at?: string;
}

export interface ProfileUpdate {
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
}

// ── Theme ─────────────────────────────────────────────────────────────────────

export interface ThemeRow {
  id: string;
  user_id: string;
  label: string;
  color: string;
  accent: string;
  emoji: string;
  created_at: string;
}

export interface ThemeInsert {
  id?: string;
  user_id: string;
  label: string;
  color: string;
  accent: string;
  emoji: string;
  created_at?: string;
}

export interface ThemeUpdate {
  label?: string;
  color?: string;
  accent?: string;
  emoji?: string;
}

// ── Task ──────────────────────────────────────────────────────────────────────

export interface TaskRow {
  id: string;
  user_id: string;
  theme_id: string | null;
  title: string;
  date: string;       // "YYYY-MM-DD"
  time: string;       // "HH:MM:SS"
  duration: string | null;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  recurrence: "daily" | "weekly" | "monthly" | null;
  completed_at: string | null;
  created_at: string;
}

export interface TaskInsert {
  id?: string;
  user_id: string;
  theme_id?: string | null;
  title: string;
  date: string;
  time: string;
  duration?: string | null;
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
  recurrence?: "daily" | "weekly" | "monthly" | null;
  completed_at?: string | null;
  created_at?: string;
}

export interface TaskUpdate {
  theme_id?: string | null;
  title?: string;
  date?: string;
  time?: string;
  duration?: string | null;
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
  recurrence?: "daily" | "weekly" | "monthly" | null;
  completed_at?: string | null;
}

// ── ArchivedTask ──────────────────────────────────────────────────────────────

export interface ArchivedTaskRow {
  id: string;
  user_id: string;
  task_data: Record<string, unknown>;
  archived_at: string;
}

export interface ArchivedTaskInsert {
  id?: string;
  user_id: string;
  task_data: Record<string, unknown>;
  archived_at?: string;
}

// ── Objective ─────────────────────────────────────────────────────────────────

export interface ObjectiveRow {
  id: string;
  user_id: string;
  theme_id: string | null;
  title: string;
  progress: number;   // 0.000 – 1.000
  due_date: string | null;  // "YYYY-MM-DD"
  status: "pending" | "completed";
  image: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface ObjectiveInsert {
  id?: string;
  user_id: string;
  theme_id?: string | null;
  title: string;
  progress?: number;
  due_date?: string | null;
  status?: "pending" | "completed";
  image?: string | null;
  completed_at?: string | null;
  created_at?: string;
}

export interface ObjectiveUpdate {
  theme_id?: string | null;
  title?: string;
  progress?: number;
  due_date?: string | null;
  status?: "pending" | "completed";
  image?: string | null;
  completed_at?: string | null;
}

// ── ArchivedObjective ─────────────────────────────────────────────────────────

export interface ArchivedObjectiveRow {
  id: string;
  user_id: string;
  objective_data: Record<string, unknown>;
  archived_at: string;
}

export interface ArchivedObjectiveInsert {
  id?: string;
  user_id: string;
  objective_data: Record<string, unknown>;
  archived_at?: string;
}

// ── Database root type (passed to createClient<Database>) ─────────────────────

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      themes: {
        Row: ThemeRow;
        Insert: ThemeInsert;
        Update: ThemeUpdate;
      };
      tasks: {
        Row: TaskRow;
        Insert: TaskInsert;
        Update: TaskUpdate;
      };
      archived_tasks: {
        Row: ArchivedTaskRow;
        Insert: ArchivedTaskInsert;
        Update: Record<string, never>;
      };
      objectives: {
        Row: ObjectiveRow;
        Insert: ObjectiveInsert;
        Update: ObjectiveUpdate;
      };
      archived_objectives: {
        Row: ArchivedObjectiveRow;
        Insert: ArchivedObjectiveInsert;
        Update: Record<string, never>;
      };
    };
  };
};
