import Svg, { Path, Rect } from "react-native-svg";

// --- Icônes calendrier ---

export const CaretLeft = ({ color = "black", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" />
  </Svg>
);

export const CaretRight = ({ color = "black", size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" />
  </Svg>
);

// --- Icônes tabs ---

export const Sparkle = ({ color = "black", size = 28 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 3l3 6l6 3l-6 3l-3 6l-3 -6l-6 -3l6 -3l3 -6" />
  </Svg>
);

export const Dashboard = ({ color = "black", size = 28 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Rect width="7" height="9" x="3" y="3" rx="1" />
    <Rect width="7" height="5" x="14" y="3" rx="1" />
    <Rect width="7" height="9" x="14" y="12" rx="1" />
    <Rect width="7" height="5" x="3" y="16" rx="1" />
  </Svg>
);

export const House = ({ color = "black", size = 28 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M15 18H9"/>
    <Path d="M21.6359 12.9579L21.3572 14.8952C20.8697 18.2827 20.626 19.9764 19.451 20.9882C18.2759 22 16.5526 22 13.1061 22H10.8939C7.44737 22 5.72409 22 4.54903 20.9882C3.37396 19.9764 3.13025 18.2827 2.64284 14.8952L2.36407 12.9579C1.98463 10.3208 1.79491 9.00229 2.33537 7.87495C2.87583 6.7476 4.02619 6.06234 6.32691 4.69181L7.71175 3.86687C9.80104 2.62229 10.8457 2 12 2C13.1543 2 14.199 2.62229 16.2882 3.86687L17.6731 4.69181C19.9738 6.06234 21.1242 6.7476 21.6646 7.87495"/>
  </Svg>
)

export const UserCircle = ({ color = "black", size = 28 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <Path d="M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
    <Path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
  </Svg>
);

export const Calendar = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
    <Path d="M16 3v4" />
    <Path d="M8 3v4" />
    <Path d="M4 11h16" />
    <Path d="M11 15h1" />
    <Path d="M12 15v3" />
  </Svg>
);

export const List = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M9 6l11 0" />
    <Path d="M9 12l11 0" />
    <Path d="M9 18l11 0" />
    <Path d="M5 6l0 .01" />
    <Path d="M5 12l0 .01" />
    <Path d="M5 18l0 .01" />
  </Svg>
);

export const Clock = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <Path d="M12 7v5l3 3" />
  </Svg>
);

export const Plus = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 5v14M5 12h14" />
  </Svg>
);

export const CheckCircle = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M9 12l2 2l4 -4" />
    <Path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  </Svg>
);

export const ChevronRight = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M9 6l6 6l-6 6" />
  </Svg>
);

export const Settings = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37a1.724 1.724 0 0 0 2.572 -1.065z" />
    <Path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
  </Svg>
);

export const LogOut = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
    <Path d="M9 12h12l-3 -3" />
    <Path d="M18 15l3 -3" />
  </Svg>
);

export const Target = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <Path d="M12 12m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
    <Path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  </Svg>
);

export const Flag = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9z" />
    <Path d="M5 21v-7" />
  </Svg>
);

export const X = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M18 6l-12 12" />
    <Path d="M6 6l12 12" />
  </Svg>
);

export const Briefcase = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
    <Path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
    <Path d="M12 12l0 .01" />
    <Path d="M3 13a20 20 0 0 0 18 0" />
  </Svg>
);

export const Palette = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
    <Path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <Path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    <Path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </Svg>
);

export const User = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <Path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </Svg>
);

export const Dumbbell = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M2 12h1" />
    <Path d="M6 8h-2a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h2" />
    <Path d="M6 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
    <Path d="M9 12h6" />
    <Path d="M15 7v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1 -1v-10a1 1 0 0 0 -1 -1h-1a1 1 0 0 0 -1 1z" />
    <Path d="M18 8h2a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-2" />
    <Path d="M22 12h-1" />
  </Svg>
);

export const AlertTriangle = ({ color = "black", size = 24 }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 9v4" />
    <Path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" />
    <Path d="M12 16h.01" />
  </Svg>
);

export const CheckBadge = ({ color = "black", size = 24 }) => (
  <Svg width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <Path d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z"/>
    <Path d="M9 12L10.8189 13.8189V13.8189C10.9189 13.9189 11.0811 13.9189 11.1811 13.8189V13.8189L15 10"/>
  </Svg>
)

export const Check = ({ color = "black", size = 24 }) => (
  <Svg width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M17.0303 8.78039L8.99993 16.8107L5.4696 13.2804L6.53026 12.2197L8.99993 14.6894L15.9696 7.71973L17.0303 8.78039Z"/>
  </Svg>
)
