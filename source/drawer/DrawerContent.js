import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Drawer,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import all_constants from "../constants";
import { getUserSettings } from "../helpers/settings_helpers";

export default function DrawerContent(props) {
  const paperTheme = useTheme();
  const [userData, getUserData] = React.useState(null);
  const [requesting, isRequesting] = React.useState(true);

  React.useEffect(() => {
    if (requesting) {
      console.log("Fetching data to feed drawer content");
      async function getData() {
        const data = await getUserSettings();
        getUserData(data);
      }
      getData();
    }

    return () => {
      isRequesting(false);
    };
  }, [userData]);

  return (
    <View style={{ flex: 1, backgroundColor: paperTheme.colors.surface }}>
      {requesting ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator animating={true} color="tomato" />
        </View>
      ) : (
        <DrawerContentScrollView {...props}>
          <Animated.View style={[styles.drawerContent]}>
            <View style={styles.userInfoSection}>
              <Title style={styles.title}>
                {all_constants.drawercontent.hello}
                {userData["personal_infos_section"]["data"]["firstname"]}
              </Title>
            </View>

            <Drawer.Section style={{ marginTop: "15%" }}>
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialCommunityIcons
                    name="lock"
                    color={color}
                    size={size}
                  />
                )}
                label={all_constants.drawercontent.drawer_item.label.connection}
                onPress={() => {
                  props.navigation.navigate("SettingsCredentialsForm", {
                    item: userData["credential_infos_section"]["data"],
                  });
                }}
              />
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
                  props.navigation.navigate("SettingsOrderInformationForm", {
                    item: userData["order_infos_section"]["data"],
                  });
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
                  props.navigation.navigate("SettingsAddressForm", {
                    item: userData["address_section"]["data"],
                  });
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
                onPress={() => {}}
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
