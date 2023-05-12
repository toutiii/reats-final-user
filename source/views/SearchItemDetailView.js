import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import all_constants from "../constants";
import CountryFlag from "react-native-country-flag";
import CustomButton from "../components/CustomButton";
import Counter from "react-native-counters";
import Feather from "react-native-vector-icons/Feather";
import { getDeliveryDateInfo } from "../helpers/toolbox";

export default function SearchItemDetailView({ ...props }) {
  const [counter, setCounter] = useState(1);

  const [label, setLabel] = useState(
    all_constants.search.search_item_detail_view.button.add_to_basket_default
  );

  const minusIcon = () => {
    return <Feather name="minus-circle" size={35} color={"red"} />;
  };

  const plusIcon = () => {
    return <Feather name="plus-circle" size={35} color={"green"} />;
  };

  const onChangeLabelAndCounter = (counter) => {
    setCounter(counter);

    label_start =
      all_constants.search.search_item_detail_view.button.add_to_basket_start;
    label_end =
      all_constants.search.search_item_detail_view.button.add_to_basket_end;

    setLabel(label_start + counter.toString() + label_end);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Image
          source={{ uri: props.route.params.item.photo }}
          style={{ aspectRatio: 16 / 9, width: "100%" }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1.3,
            backgroundColor: "white",
            paddingLeft: "4%",
            paddingRight: "4%",
          }}
        >
          <View style={{ flex: 1.2 }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 26, fontWeight: "bold" }}
            >
              {props.route.params.item.dish_name}{" "}
              <CountryFlag
                isoCode={props.route.params.item.dish_country_code}
                size={22}
              />
            </Text>
          </View>

          <View style={{ flex: 1.2 }}>
            <Text style={{ fontSize: 22 }}>
              {props.route.params.item.dish_price}
              {all_constants.currency_symbol}
            </Text>
          </View>

          <View style={{ flex: 2.5 }}>
            <ScrollView>
              <Text
                style={{ fontSize: 15, textAlign: "justify", color: "grey" }}
              >
                {props.route.params.item.dish_description}
              </Text>
            </ScrollView>
          </View>
        </View>

        <View style={{ flex: 0.1, padding: 5 }}></View>

        <View
          style={{
            flex: 0.7,
            backgroundColor: "white",
            paddingLeft: "4%",
            paddingRight: "4%",
          }}
        >
          <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: "bold" }}>
            {
              all_constants.search.search_item_detail_view.delivery
                .delivery_info
            }
          </Text>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text numberOfLines={1} style={{ fontSize: 18 }}>
              {getDeliveryDateInfo(
                new Date(props.route.params.item.dish_delivery_datetime),
                all_constants.french_date_format
              )}
              {
                all_constants.search.search_item_detail_view.delivery
                  .delivery_circa
              }
              {getDeliveryDateInfo(
                new Date(props.route.params.item.dish_delivery_datetime),
                all_constants.french_hour_format
              )}
            </Text>
          </View>
        </View>

        <View style={{ flex: 0.1, padding: 5 }}></View>

        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Counter
            start={counter}
            min={1}
            onChange={onChangeLabelAndCounter}
            minusIcon={minusIcon}
            plusIcon={plusIcon}
            countTextStyle={{ color: "black" }}
            buttonStyle={{ borderWidth: 0 }}
          />
        </View>

        <View style={{ flex: 0.1, padding: 5 }}></View>

        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: "center",
            bottom: "2%",
          }}
        >
          <CustomButton
            label={label}
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
    </View>
  );
}
