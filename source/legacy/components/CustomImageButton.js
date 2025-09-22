import { Image, TouchableHighlight, View } from "react-native";
import React from "react";
import styles_home_view from "../styles/styles-home-view";

export default function CustomImageButton({ ...props }) {
    return (
        <TouchableHighlight
            {...props}
            onPress={props.onPress}
            style={[
                styles_home_view.home_button
            ]}
        >
            <View style={{ alignItems: "center" }}>
                <Image source={{ uri: props.uri }} style={{ height: 30, width: 30 }} />
            </View>
        </TouchableHighlight>
    );
}
