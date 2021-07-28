import React from "react";
import {Platform, StyleSheet} from "react-native";
import all_constants from "../constants";

let styles_preview;
export default styles_preview = StyleSheet.create({
    videoContainer: {
        width: all_constants.flatlist_slider_width,
        paddingVertical: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    videoPreview: {
        width: all_constants.flatlist_slider_width,
        borderRadius: 8,
    },
    desc: {
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
        marginTop: 18,
    },
});
