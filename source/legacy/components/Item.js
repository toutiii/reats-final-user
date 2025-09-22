import { Image, Text, View } from "react-native";
import styles_dish from "../styles/styles-dish";
import React from "react";
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";

export default function Item({ ...props }) {
    console.log("props: ", props);
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 5 }}>
                <View style={styles_dish.dish_name}>
                    <Text
                        numberOfLines={1}
                        style={{
                            fontSize: 20,
                        }}
                    >
                        {" "}
                        {props.name}{" "}
                    </Text>
                </View>
                <View style={{ flex: 4 }}>
                    <Image
                        source={{
                            uri: props.photo,
                        }}
                        style={{ flex: 1 }}
                    />
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={styles_dish.dish_price}>
                            <Text style={{ fontSize: 20 }}> {props.price} </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                            }}
                        >
                            {props.acceptance_rate >= 75 && (
                                <MaterialCommunityIcons
                                    name="checkbox-marked-circle"
                                    size={24}
                                    color="green"
                                />
                            )}
                            {props.acceptance_rate >= 50 && props.acceptance_rate < 75 && (
                                <MaterialIcons name="warning-amber" size={24} color="orange" />
                            )}
                            {props.acceptance_rate < 50 && (
                                <MaterialIcons name="dangerous" size={24} color="red" />
                            )}
                            <Text
                                style={[
                                    {
                                        color:
                      props.acceptance_rate >= 75
                          ? "green"
                          : props.acceptance_rate < 50
                              ? "red"
                              : "orange",
                                    },
                                    { fontWeight: "bold" },
                                    { fontSize: 18 },
                                ]}
                            >
                                {props.acceptance_rate + "%"}
                            </Text>
                        </View>
                        <View style={styles_dish.dish_rating}>
                            <AntDesign name="star" size={24} color="tomato" />
                            <Text style={{ fontSize: 18 }}> {props.rating} </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
