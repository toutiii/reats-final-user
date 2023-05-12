import { StyleSheet } from "react-native";

let styles_button;

export default styles_button = StyleSheet.create({
  default: {
    alignItems: "center",
    justifyContent: "center",
  },
  button_first_label: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button_second_label: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: "2%",
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    borderBottomWidth: 1,
  },
});
