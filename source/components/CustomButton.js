import { Text, TouchableHighlight, View } from "react-native";
import React from "react";
import all_constants from "../constants";
import styles_button from "../styles/styles-button";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function CustomButton({ label, ...props }) {
  return (
    <TouchableHighlight
      underlayColor={all_constants.colors.inputBorderColor}
      {...props}
      style={[
        styles_button.default,
        { height: props.height },
        { top: props.top },
        { borderRadius: props.border_radius },
        {
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : "transparent",
        },
        {
          width: props.button_width
            ? props.button_width
            : all_constants.screen.width - 30,
        },
      ]}
    >
      {props.use_second_label ? (
        <View style={styles_button.button_container}>
          <View style={styles_button.button_first_label}>
            {props.icon_name ? (
              <Ionicons name={props.icon_name} size={30} />
            ) : (
              <Text
                numberOfLines={1}
                style={{ color: props.label_color, fontSize: props.font_size }}
              >
                {label}
              </Text>
            )}
          </View>
          <View style={styles_button.button_second_label}>
            <Text
              numberOfLines={1}
              style={{ color: props.label_color, fontSize: props.font_size }}
            >
              {props.second_label}
            </Text>
          </View>
        </View>
      ) : (
        <Text
          numberOfLines={1}
          style={{ color: props.label_color, fontSize: props.font_size }}
        >
          {label}
        </Text>
      )}
    </TouchableHighlight>
  );
}
