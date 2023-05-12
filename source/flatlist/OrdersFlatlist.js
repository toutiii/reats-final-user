import React, { Component } from "react";
import { Animated, Text, TouchableHighlight, View } from "react-native";
import { getOrders } from "../api/fetch-client-orders";
import all_constants from "../constants";
import OrderFlatlistItem from "../components/OrderFlatlistItem";
import HorizontalLine from "../components/HorizontalLine";

export default class OrdersFlatlist extends Component {
  intervalID;

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      listdata: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    this.fetchData();
    this.intervalID = setInterval(this.fetchData.bind(this), 20000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  fetchData() {
    this.setState({ isFetching: true });
    let newData = getOrders();
    newData.then((results) => {
      this.setState({
        listdata: results,
        isFetching: false,
      });
    });
  }

  render() {
    return this.state.listdata ? (
      <Animated.View style={{ flex: 1, backgroundColor: "white" }}>
        <Animated.ScrollView>
          {this.state.listdata.map((orderObject) => {
            return (
              <TouchableHighlight
                key={orderObject.id}
                onPress={() => {
                  this.props.navigation.navigate("OrderDetailView", {
                    item: orderObject,
                  });
                }}
                style={{ alignItems: "center", marginTop: "10%" }}
                underlayColor={all_constants.colors.inputBorderColor}
              >
                <View style={{ flex: 1, alignItems: "center", width: "90%" }}>
                  <View style={{ flex: 1, width: "90%" }}>
                    <OrderFlatlistItem
                      dish_name={orderObject.dish_name}
                      number_of_dishes={orderObject.number_of_dishes}
                      dish_price={orderObject.dish_price}
                      dish_order_datetime={orderObject.dish_order_datetime}
                      dish_status={orderObject.dish_status}
                      dish_photo={orderObject.photo}
                    />
                  </View>

                  <View style={{ paddingTop: 30, width: "80%" }}>
                    <HorizontalLine line_color="tomato" />
                  </View>
                </View>
              </TouchableHighlight>
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ fontSize: 18 }}>
          {all_constants.pending_orders_view.no_pending_orders}
        </Text>
      </View>
    );
  }
}
