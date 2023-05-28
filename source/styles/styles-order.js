import { StyleSheet } from "react-native";
import React from "react";

let styles_order;

export default styles_order = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  order_button_container: {
    flex: 1,
    aspectRatio: 16 / 9,
    paddingTop: "3%",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  order_number: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  order_element: {
    flex: 1,
    paddingLeft: "5%",
  },
  row_element: {
    flexDirection: "row",
  },
  order_text: {
    fontSize: 15,
    paddingBottom: "6%",
  },
  icon_element: {
    flex: 1,
  },
  order_status_text_style: {
    flex: 5,
    alignItems: "flex-start",
  },
});
