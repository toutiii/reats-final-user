import React from "react";
import { Text, View } from "react-native";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";

export default function CartSummaryView({ ...props }) {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 2, alignItems: "center" }}>
        <Text style={{ fontStyle: "italic", fontSize: 24 }}>
          {all_constants.cart.summary.title}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          margin: "5%",
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: "tomato",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            {all_constants.cart.summary.sub_amount}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            20 {all_constants.currency_symbol}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          margin: "5%",
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: "tomato",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            {all_constants.cart.summary.delivery_fees}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            3 {all_constants.currency_symbol}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          margin: "5%",
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: "tomato",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            {all_constants.cart.summary.service_fees}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            1 {all_constants.currency_symbol}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          margin: "5%",
          flexDirection: "row",
          borderBottomWidth: 2,
          borderBottomColor: "tomato",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            {all_constants.cart.summary.total_amount}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Text style={{ fontStyle: "italic", fontSize: 20 }}>
            24 {all_constants.currency_symbol}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 7,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomButton
          label={all_constants.cart.label.paid}
          height={50}
          border_width={3}
          border_radius={30}
          font_size={17}
          backgroundColor={"green"}
          label_color={"white"}
          button_width={all_constants.screen.width - 40}
          onPress={() => {
            console.log("PRESSED");
          }}
        />
      </View>
    </View>
  );
}
