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
        height: 155,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    desc: {
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
        marginTop: 18,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.1,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
});
