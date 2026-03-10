# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npx expo start              # Start dev server
npx expo start --android    # Run on Android
npx expo start --ios        # Run on iOS
npx expo start --web        # Run on web
npx expo lint               # Lint
```

## Architecture

**Worka** is a React Native productivity app built with Expo SDK 54 and Expo Router (file-based navigation). The app is in French and focuses on task planning and objective tracking.

### Navigation structure

```
src/app/
  index.tsx              → WelcomePage (entry point)
  (auth)/                → Login / Register screens
  (tabs)/
    objectives/          → Objective tracking tab
    planning/            → Daily task planning tab
    profile/             → User profile tab
  modals/
    add-task.tsx         → Slide-up modal (presentation: 'modal')
    add-objective.tsx    → Slide-up modal (presentation: 'modal')
```

### Component structure

Tab route files (`src/app/(tabs)/*/index.tsx`) are thin re-exports that delegate to page components in `src/components/pages/`. Feature components are grouped by domain:

- `objectives/` — `ObjectiveItem` (with gesture-based progress), `ObjectivesList`, `UrgentSection`
- `planning/` — `TaskItem`, `TasksList`
- `profile/` — `ProfileHeader`, `StatsContainer`, `StatItem`, `MenuContainer`, `MenuItem`
- `modals/` — `ModalHeader`, `ModalInput`, `ModalSection`, `ModalFooter`
- `shared/` — `GradientPageLayout` (dark screen container), `PageHeader`
- `ui/` — `Icons` (custom SVG components), `Calendar`

Each domain folder exports via an `index.ts` barrel file.

### Design system

- **Theme**: Dark futuristic design. All colors and fonts come from `src/constants/theme.tsx`. Colors use a dark palette (`bg: #08080F`, `surface: #111118`, `accent: #7B61FF`). Never hardcode colors.
- **Fonts**: Urbanist only. Use `theme.fonts.bold`, `theme.fonts.semiBold`, `theme.fonts.regular`, `theme.fonts.light`, `theme.fonts.extraBold`.
- **Icons**: Custom SVG components in `src/components/ui/Icons.tsx`. Add new icons there.
- **Page layout**: Wrap tab pages in `<GradientPageLayout>` from `src/components/shared` (dark bg + SafeAreaView).
- **Cards**: Use `theme.colors.surface` bg with `theme.colors.border` border and `borderRadius: 16`.
- **Buttons**: Primary uses `theme.colors.accent` bg with white text, `borderRadius: 14`.
- **Date handling**: Uses `moment` with French locale. Date picker uses `react-native-modal-datetime-picker` with `locale="fr_FR"`.
- **Animations**: MotiView for entrance animations, Reanimated for gesture-driven animations.
- **State**: Currently local `useState` only — no global state manager.
- **Path alias**: `@/` maps to the repo root.
- **StatusBar**: Light style (white text on dark bg), set in root layout.
- **New Architecture**: `newArchEnabled: true`, `reactCompiler: true`.
