import { StyleSheet } from "react-native";
import all_constants from "../constants";

let styles_search_view;

export default styles_search_view = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    width: all_constants.screen.width - 40,
    left: 20,
    zIndex: 99,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: "#888888",
    fontSize: 18,
    height: 50,
  },
});
