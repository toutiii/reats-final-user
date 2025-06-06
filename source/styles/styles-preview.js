import { StyleSheet } from "react-native";
import all_constants from "../constants";

let styles_preview = StyleSheet.create({
    videoContainer: {
        width: all_constants.flatlist_slider_width,
        justifyContent: "center",
        alignItems: "center",
    },
    videoPreview: {
        width: all_constants.flatlist_slider_width,
    },
    desc: {
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
    },
});

export default styles_preview;