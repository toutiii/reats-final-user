import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";
import { View } from "react-native";

export default function CustomAlert({ ...props }) {
    return (
        <View style={{ flex: 1 }}>
            <AwesomeAlert
                show={props.show}
                title={props.title}
                message={props.message
                    ? props.message
                    : ""}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                showCancelButton={!!props.showCancelButton}
                cancelText={props.cancelText
                    ? props.cancelText
                    : ""}
                confirmText={props.confirmText
                    ? props.confirmText
                    : "OK"}
                confirmButtonColor={props.confirmButtonColor}
                cancelButtonColor={
                    props.cancelButtonColor
                        ? props.cancelButtonColor
                        : ""
                }
                onConfirmPressed={props.onConfirmPressed}
                onCancelPressed={props.onCancelPressed}
            />
        </View>
    );
}
