/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export function getColorBasedOnIndex(index: number) {
  let color, borderColor;
  switch (index % 4) {
    case 0:
      color = "#F8BA8B";
      borderColor = "#FC6D00";
      break;
    case 1:
      color = "#C7D8A4";
      borderColor = "#669800";
      break;
    case 2:
      color = "#F5E0BA";
      borderColor = "#E89500";
      break;
    case 3:
      color = "#F1AEAF";
      borderColor = "#F9090D";
      break;
    default:
      color = "white";
      borderColor = "black";
  }
  return { color, borderColor };
}
