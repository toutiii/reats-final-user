import React from "react";
import { FlatList, Text, TouchableHighlight, View } from "react-native";
import AddressItem from "../components/AddressItem";
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import CustomButton from "../components/CustomButton";

export default function AddressesFlatlist(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ flex: 7 }}>
        <FlatList
          data={props.route.params.item}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                {all_constants.search.no_addresses_found}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("SettingsAddressForm", {
                    item: item,
                  });
                }}
                style={{ alignItems: "center", marginTop: "10%" }}
                underlayColor={all_constants.colors.inputBorderColor}
              >
                <View style={{ flex: 1, alignItems: "center", width: "90%" }}>
                  <View style={{ flex: 1, width: "90%" }}>
                    <AddressItem
                      key={item.id}
                      street_number={item.street_number}
                      street_name={item.street_name}
                      address_complement={item.address_complement}
                      postal_code={item.postal_code}
                      town={item.town}
                    />
                  </View>
                  <View
                    style={{
                      paddingTop: "5%",
                      width: "80%",
                    }}
                  >
                    <HorizontalLine line_color="tomato" />
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <CustomButton
          label={all_constants.drawercontent.button.labels.add_address}
          backgroundColor="green"
          label_color="white"
          height={50}
          border_width={3}
          border_radius={30}
          font_size={17}
          onPress={() => {
            props.navigation.navigate("SettingsAddressForm", {
              item: {},
            });
          }}
        />
      </View>
    </View>
  );
}
