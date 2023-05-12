import React from "react";
import { View } from "react-native";

export default function HorizontalLine({ ...props }) {
  return (
    <View
      style={[
        { borderBottomWidth: props.line_width ? props.line_width : 1 },
        { borderBottomColor: props.line_color ? props.line_color : "black" },
      ]}
    />
  );
}
