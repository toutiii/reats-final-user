import { useThemeColor } from "@/hooks/useThemeColor.ts";
import React from "react";
import { View, type ViewProps } from "react-native";



export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <View style={[{ backgroundColor, flex: 1 }, style]} {...otherProps} />;
}