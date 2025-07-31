import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View, Alert, Platform, ToastAndroid } from "react-native";
import {
    ActivityIndicator,
    Drawer,
    Text,
    Title,
    useTheme,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import all_constants from "../constants";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { apiBaseUrl, port } from "../env";
import { callBackEnd } from "../api/callBackend";
import { CommonActions } from "@react-navigation/native";

export default function DrawerContent(props) {
    const paperTheme = useTheme();
    const [
        userData,
        setUserData
    ] = React.useState(null);
    const [
        requesting,
        isRequesting
    ] = React.useState(true);
    const [
        refreshData,
        setRefreshData
    ] = React.useState(false);

    // Fonction pour afficher un message selon la plateforme
    const showMessage = (title, message, onConfirm = null, onCancel = null, confirmText = "OK", cancelText = null) => {
        if (Platform.OS === "android") {
            if (onCancel) {
                // Pour Android avec bouton d'annulation, utiliser Alert au lieu de Toast
                Alert.alert(
                    title,
                    message,
                    [
                        {
                            text: cancelText || all_constants.messages.cancel,
                            onPress: onCancel,
                            style: "cancel"
                        },
                        {
                            text: confirmText || "OK",
                            onPress: onConfirm || (() => {})
                        }
                    ]
                );
            } else {
                // Pour Android sans bouton d'annulation, utiliser Toast
                ToastAndroid.show(message || title, ToastAndroid.SHORT);
                if (onConfirm) {
                    setTimeout(onConfirm, 1000);
                }
            }
        } else {
            // Sur iOS, utiliser Alert au lieu de CustomAlert
            const buttons = [
            ];

            if (cancelText && onCancel) {
                buttons.push({
                    text: cancelText,
                    onPress: onCancel,
                    style: "cancel"
                });
            }

            buttons.push({
                text: confirmText || "OK",
                onPress: onConfirm || (() => {})
            });

            Alert.alert(
                title,
                message,
                buttons
            );
        }
    };

    const resetNavigationStackToLoginView = () => {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [
                { name: "LoginForm" }
            ],
        });
        props.navigation.dispatch(resetAction);
    };

    async function getData() {
        const userID = await getItemFromSecureStore("userID");
        const access = await getItemFromSecureStore("accessToken");
        const result = await callBackEnd(
            new FormData(),
            `${apiBaseUrl}:${port}/api/v1/customers/${userID}/`,
            "GET",
            access,
        );

        setUserData(result.data);
        isRequesting(false);
        setRefreshData(false);
    }

    React.useEffect(() => {
        if (requesting) {
            console.log("Fetching data to feed drawer content");
            getData();
        }

        return () => {
            isRequesting(false);
        };
    }, [
        refreshData
    ]);

    const changeRefreshDataState = () => {
        setRefreshData(true);
        isRequesting(true);
    };

    return (
        <View style={{ flex: 1, backgroundColor: paperTheme.colors.surface }}>
            {requesting
                ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <ActivityIndicator animating={true} color="tomato" />
                    </View>
                )
                : (
                    <DrawerContentScrollView {...props}>
                        <Animated.View style={[
                            styles.drawerContent
                        ]}>
                            {/* Le CustomAlert a été remplacé par un appel à la fonction showMessage */}
                            <View style={styles.userInfoSection}>
                                <TouchableOpacity
                                    style={{ marginLeft: 10 }}
                                    onPress={() => {
                                        props.navigation.toggleDrawer();
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: userData.personal_infos_section.data.photo,
                                        }}
                                        style={{ width: 70, height: 70, borderRadius: 150 / 2 }}
                                    />
                                </TouchableOpacity>
                                <Title style={styles.title}>
                                    {all_constants.drawercontent.hello}
                                    {userData["personal_infos_section"]["data"]["firstname"]}
                                </Title>
                            </View>

                            <Drawer.Section style={{ marginTop: "15%" }}>
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="wallet"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.drawer_item.label.wallet}
                                    onPress={() => {
                                        console.log("Coming soon ?");
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="account"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.drawer_item.label.account}
                                    onPress={() => {
                                        props.navigation.navigate("SettingsPersonalInformationForm", {
                                            item: userData["personal_infos_section"]["data"],
                                            refreshDataStateChanger: changeRefreshDataState,
                                        });
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="map-marker"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={
                                        all_constants.drawercontent.drawer_item.label.localization
                                    }
                                    onPress={() => {
                                        props.navigation.navigate("AdressesStack");
                                    }}
                                />
                                <DrawerItem
                                    icon={({ color, size }) => (
                                        <MaterialCommunityIcons
                                            name="history"
                                            color={color}
                                            size={size}
                                        />
                                    )}
                                    label={all_constants.drawercontent.drawer_item.label.history}
                                    onPress={() => {
                                        props.navigation.navigate("OrdersHistory");
                                    }}
                                />
                            </Drawer.Section>

                            <Drawer.Section>
                                <DrawerItem
                                    icon={({ size }) => (
                                        <MaterialCommunityIcons
                                            name="power"
                                            color="red"
                                            size={size}
                                        />
                                    )}
                                    label={() => (
                                        <Text style={{ color: "red", fontWeight: "bold" }}>
                                            {all_constants.drawercontent.logout}
                                        </Text>
                                    )}
                                    onPress={() => {
                                        showMessage(
                                            all_constants.custom_alert.sign_out_title,
                                            all_constants.custom_alert.sign_out_message,
                                            () => resetNavigationStackToLoginView(),
                                            () => {},
                                            all_constants.custom_alert.sign_out_confirm_text,
                                            all_constants.custom_alert.sign_out_cancel_text
                                        );
                                    }}
                                />
                            </Drawer.Section>
                        </Animated.View>
                    </DrawerContentScrollView>
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 10,
        fontWeight: "bold",
    },
});
