# Supabase Auth Integration — Design Spec

**Date:** 2026-04-03
**Project:** Worka (React Native / Expo Router)

---

## Overview

Connect the Worka app to its Supabase database. Implement a clean typed layer over the DB schema, and wire up real authentication (sign-in / sign-up / sign-out) into the existing auth pages.

---

## 1. Supabase Client (`src/lib/supabase.ts`)

A singleton Supabase client exported from one file. Uses `AsyncStorage` as the session storage adapter so sessions persist across app restarts (option A — auto re-login).

**Credentials:**
- URL: `https://gocuruxfpsezhrxoxbzg.supabase.co`
- Anon key: `sb_publishable_8FvqxPtwpjR-TcS1au0Fbw_PBEvtGc7`

**Config:**
- `auth.storage`: `AsyncStorage`
- `auth.autoRefreshToken`: `true`
- `auth.persistSession`: `true`
- `auth.detectSessionInUrl`: `false` (React Native, no URL scheme auth)

---

## 2. Database Types (`src/types/database.ts`)

One file, organized by table. Each table gets three TypeScript interfaces:

| Suffix | Purpose |
|--------|---------|
| `Row` | Shape returned by SELECT queries |
| `Insert` | Shape for INSERT (required fields only) |
| `Update` | Shape for UPDATE (all fields optional, no `id`) |

**Tables:**
- `ProfileRow / ProfileInsert / ProfileUpdate`
- `ThemeRow / ThemeInsert / ThemeUpdate`
- `TaskRow / TaskInsert / TaskUpdate`
- `ArchivedTaskRow / ArchivedTaskInsert`
- `ObjectiveRow / ObjectiveInsert / ObjectiveUpdate`
- `ArchivedObjectiveRow / ArchivedObjectiveInsert`

Field types mirror the SQL schema exactly (e.g., `progress: number` is `0–1`, `status` uses string union literals).

The existing UI types (`src/types/task.ts`, `src/types/objective.ts`) are **not modified** — they serve the component layer and may diverge from DB shape.

---

## 3. Auth Service (`src/services/auth.ts`)

Four exported async functions. Each returns a typed result object — no thrown exceptions, errors are returned as a string message.

```ts
signIn(email: string, password: string): Promise<{ user: User; session: Session } | { error: string }>

signUp(email: string, password: string, name: string): Promise<{ user: User } | { error: string }>

signOut(): Promise<void>

getProfile(userId: string): Promise<ProfileRow | null>
```

Error messages are in French (matching app language). Internal Supabase error codes are mapped to user-friendly strings.

---

## 4. Auth Routing (`src/app/_layout.tsx`)

`onAuthStateChange` listener registered in `RootLayout` (after fonts load). Handles:

| Event | Action |
|-------|--------|
| `INITIAL_SESSION` with session | `router.replace('/(tabs)/planning')` |
| `INITIAL_SESSION` without session | stay on current screen (WelcomePage) |
| `SIGNED_IN` | `router.replace('/(tabs)/planning')` |
| `SIGNED_OUT` | `router.replace('/')` |

A `sessionChecked` boolean state prevents navigation before the initial session check resolves (avoids flash of wrong screen).

---

## 5. LoginPage (`src/components/pages/LoginPage.tsx`)

**Added state:** `loading: boolean`, `error: string | null`

**On submit:**
1. Set `loading = true`, `error = null`
2. Call `authService.signIn(email, password)`
3. If error → set `error`, set `loading = false`
4. If success → do nothing (routing handled by `onAuthStateChange`)

**UI additions:**
- Button shows spinner or is disabled when `loading = true`
- Error message displayed in red below the form if `error !== null`

---

## 6. RegisterPage (`src/components/pages/RegisterPage.tsx`)

Same pattern as LoginPage.

**On submit:**
1. Set `loading = true`, `error = null`
2. Call `authService.signUp(email, password, name)`
3. If error → set `error`, set `loading = false`
4. If success → do nothing (routing handled by `onAuthStateChange`)

After successful sign-up, Supabase auto-creates the profile row via the `handle_new_user` trigger defined in the SQL schema.

---

## 7. userStore Updates (`src/store/userStore.ts`)

After sign-in, `getProfile(userId)` is called and `userStore.setUser()` is populated with `name`, `email`, `avatarUrl`. On sign-out, `userStore.logout()` is called.

This keeps profile data accessible to the Profile tab without extra Supabase calls per render.

---

## Files Created / Modified

| File | Action |
|------|--------|
| `src/lib/supabase.ts` | Create |
| `src/types/database.ts` | Create |
| `src/services/auth.ts` | Create |
| `src/app/_layout.tsx` | Modify — add auth listener |
| `src/components/pages/LoginPage.tsx` | Modify — wire up signIn |
| `src/components/pages/RegisterPage.tsx` | Modify — wire up signUp |
| `src/store/userStore.ts` | Modify — remove hardcoded user, add `isLoggedIn: false` default |

---

## Package to Install

```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage
```

Note: `@react-native-async-storage/async-storage` is likely already installed (used by Zustand stores). Only `@supabase/supabase-js` is new.
