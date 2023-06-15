import React from "react";
import { Image, Text, TextInput, View } from "react-native";
import all_constants from "../constants";
import { getDeliveryDateInfo } from "../helpers/toolbox";
import HorizontalLine from "../components/HorizontalLine";
import CustomButton from "../components/CustomButton";
import styles_dish from "../styles/styles-dish";
import { AntDesign } from "@expo/vector-icons";
import { TouchableHighlight } from "react-native-gesture-handler";

export default function SearchItemDetailView({ ...props }) {
  const [numberOfItem, setNumberOfItem] = React.useState(1);
  const maxDishOrder = 10;

  const increaseItemNumber = () => {
    if (numberOfItem < maxDishOrder) {
      setNumberOfItem(numberOfItem + 1);
    }
  };

  const decreaseItemNumber = () => {
    if (numberOfItem > 1) {
      setNumberOfItem(numberOfItem - 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: props.route.params.item.photo }}
        style={{ aspectRatio: 16 / 9 }}
      />

      <View
        style={{
          flex: 2,
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", margin: "4%" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20 }}>
              {props.route.params.item.dish_name}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Text style={{ fontSize: 20 }}>
              <Image
                source={{ uri: all_constants.rating_star }}
                style={styles_dish.rating_star}
              />
              {props.route.params.item.dish_rating}
            </Text>
          </View>
        </View>

        <View style={{ flex: 2, justifyContent: "center", margin: "7%" }}>
          <Text style={{ fontSize: 18, fontStyle: "italic" }}>
            {all_constants.search.delivery_scheduled_at}
            {getDeliveryDateInfo(
              new Date(props.route.params.item.dish_estimated_delivery_date),
              all_constants.french_date_format
            )}
          </Text>
        </View>

        <View style={{ width: "60%" }}>
          <HorizontalLine line_color="tomato" />
        </View>

        <View style={{ flex: 3, justifyContent: "center" }}>
          <Text numberOfLines={3} style={{ fontSize: 16, textAlign: "center" }}>
            {props.route.params.item.dish_description}
          </Text>
        </View>

        <View style={{ width: "60%" }}>
          <HorizontalLine line_color="tomato" />
        </View>

        <View style={{ flex: 4, flexDirection: "row", margin: "10%" }}>
          <View style={{ flex: 2, alignItems: "flex-end" }}>
            <TouchableHighlight onPress={increaseItemNumber}>
              <AntDesign name="pluscircle" size={30} color="green" />
            </TouchableHighlight>
          </View>

          <View style={{ flex: 1, alignItems: "center" }}>
            <TextInput
              value={numberOfItem.toString()}
              style={{ fontSize: 20, color: "black" }}
              editable={false}
            />
          </View>

          <View style={{ flex: 2, alignItems: "flex-start" }}>
            <TouchableHighlight onPress={decreaseItemNumber}>
              <AntDesign name="minuscircle" size={30} color="red" />
            </TouchableHighlight>
          </View>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
            bottom: "10%",
          }}
        >
          <CustomButton
            label={all_constants.search.button.label.add_to_cart}
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
