import React from "react";
import { View } from "react-native";

export default function HorizontalLine({ ...props }) {
  return (
    <View
      style={[
        { borderBottomWidth: props.line_width ? props.line_width : 1 },
        { borderBottomColor: props.line_color ? props.line_color : "black" },
        { width: props.width ? props.width : "100%" },
        { height: props.height ? props.height : 1 },
        { marginLeft: props.margin_left ? props.margin_left : "0%" },
      ]}
    />
  );
}
