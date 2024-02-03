import { Modal, Text, View } from "react-native";
import React from "react";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";

export default function FormLabelModal({ ...props }) {
    return (
        <View>
            <Modal animationType="slide" transparent={false} visible={props.state}>
                <View style={{ flex: 1, alignItems: "center", marginTop: "10%" }}>
                    <CustomButton
                        label={all_constants.modal.dish_modal.hide}
                        backgroundColor="tomato"
                        label_color="black"
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        onPress={props.onPressCloseModal}
                    />
                </View>

                <View style={{ flex: 8, marginBottom: "50%", marginTop: "20%" }}>
                    <View
                        style={{
                            marginLeft: "25%",
                            width: "50%",
                            justifyContent: "center",
                            borderWidth: 2,
                            borderColor: "tomato",
                        }}
                    ></View>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 18,
                            textAlign: "center",
                            padding: "5%",
                        }}
                    >
                        {props.labelModalText}
                    </Text>
                    <View
                        style={{
                            marginLeft: "25%",
                            width: "50%",
                            justifyContent: "center",
                            borderWidth: 2,
                            borderColor: "tomato",
                        }}
                    ></View>
                </View>
            </Modal>
        </View>
    );
}
