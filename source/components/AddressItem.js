import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddressItem(props) {
    const buildAddress = (props) => {
        return (
            props.street_number +
      " " +
      props.street_name +
      " " +
      props.address_complement +
      " " +
      props.postal_code +
      " " +
      props.town
        );
    };
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                padding: "5%",
                alignItems: "center",
            }}
        >
            <View style={{ flex: 1 }}>
                <MaterialCommunityIcons
                    name="google-maps"
                    size={30}
                    color="black"
                    style={{ color: "tomato" }}
                />
            </View>
            <View style={{ flex: 7 }}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                    {buildAddress(props)}
                </Text>
            </View>
        </View>
    );
}
