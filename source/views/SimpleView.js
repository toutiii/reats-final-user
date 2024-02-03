//Use that view when you just want to render something light.

import React, { Component } from "react";
import { Text, View } from "react-native";

export default class SimpleView extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text> FREESTYLER </Text>
            </View>
        );
    }
}
