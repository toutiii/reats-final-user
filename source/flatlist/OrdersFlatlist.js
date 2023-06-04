import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { getOrders } from "../api/fetch-client-orders";
import all_constants from "../constants";
import OrderFlatlistItem from "../components/OrderFlatlistItem";
import HorizontalLine from "../components/HorizontalLine";

export default function OrdersFlatlist(props) {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [data, setData] = useState([]);

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeOut();
    setIsFetchingData(true);
    setTimeout(() => {
      async function fetchDataFromBackend() {
        const results = await getOrders();
        setData(results.data);
      }
      fetchDataFromBackend();
      setIsFetchingData(false);
      fadeIn();
    }, 1000);
  }, []);

  const onRefresh = useCallback(() => {
    fadeOut();
    setIsFetchingData(true);
    setTimeout(() => {
      async function fetchDataFromBackend() {
        await getOrders();
      }
      fetchDataFromBackend();
      setIsFetchingData(false);
      fadeIn();
    }, 1000);
  }, [isFetchingData]);

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: "white",
        opacity: fadeAnim,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <FlatList
          data={data}
          onRefresh={onRefresh}
          refreshing={isFetchingData}
          ItemSeparatorComponent={
            <HorizontalLine
              width={"80%"}
              line_color={"tomato"}
              margin_left={"10%"}
            />
          }
          ListEmptyComponent={
            <View
              style={{
                marginTop: "5%",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 18 }}>
                {all_constants.pending_orders_view.no_pending_orders}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: "center",
                margin: "4%",
              }}
            >
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("OrderDetailView", {
                    item: item,
                  });
                }}
                style={{ flex: 1, alignItems: "center", width: "90%" }}
                underlayColor={all_constants.colors.inputBorderColor}
              >
                <OrderFlatlistItem
                  dish_name={item.dish_name}
                  number_of_dishes={item.number_of_dishes}
                  dish_price={item.dish_price}
                  dish_order_datetime={item.dish_order_datetime}
                  dish_status={item.dish_status}
                  dish_photo={item.photo}
                />
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </Animated.View>
  );
}
