import React, { Component } from "react";
import { View, Text } from "react-native";
import styles_order_view from "../styles/styles-order-view";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";
import DishModal from "../modals/DishModal";
import {
    AntDesign,
    FontAwesome,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";

export default class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    onPressShowModal = () => {
        this.setState({ modalVisible: true });
    };

    onPressCloseModal = () => {
        this.setState({ modalVisible: false });
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                {this.state.modalVisible && (
                    <DishModal
                        state={this.state.modalVisible}
                        onPressCloseModal={this.onPressCloseModal}
                        modal_data={this.props.route.params.item.dishes}
                    />
                )}
                <View
                    style={{
                        flex: 3,
                        backgroundColor: "white",
                    }}
                >
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    fontSize: 25,
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                {
                                    all_constants.drawercontent.drawer_item.orders_history.infos
                                        .number
                                }
                                {this.props.route.params.item.order_number}
                            </Text>
                        </View>

                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons name="shopping-cart" size={30} color="black" />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history.infos
                                            .ordered
                                    }
                                    {this.props.route.params.item.order_owner} le{" "}
                                    {this.props.route.params.item.order_date} à{" "}
                                    {this.props.route.params.item.order_hour}{" "}
                                </Text>
                            </View>
                        </View>
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <FontAwesome name="money" size={30} color="black" />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history.infos
                                            .amount
                                    }{" "}
                                    {this.props.route.params.item.order_amount}{" "}
                                    {all_constants.currency_symbol}
                                </Text>
                            </View>
                        </View>
                        {this.props.route.params.item.order_status ===
              all_constants.drawercontent.drawer_item.orders_history.status
                  .delivered && (
                            <View style={styles_order_view.order_item_info}>
                                <View style={{ flex: 1 }}>
                                    <AntDesign name="checkcircle" size={30} color="green" />
                                </View>
                                <View style={{ flex: 6 }}>
                                    <Text style={{ fontSize: 17 }}>
                                        {
                                            all_constants.drawercontent.drawer_item.orders_history
                                                .infos.delivered_label
                                        }{" "}
                                        {this.props.route.params.item.order_delivery_date} à{" "}
                                        {this.props.route.params.item.order_delivery_hour}{" "}
                                    </Text>
                                </View>
                            </View>
                        )}
                        {this.props.route.params.item.order_status ===
              all_constants.drawercontent.drawer_item.orders_history.status
                  .canceled && (
                            <View style={styles_order_view.order_item_info}>
                                <View style={{ flex: 1 }}>
                                    <MaterialIcons name="cancel" size={30} color="red" />
                                </View>
                                <View style={{ flex: 6 }}>
                                    <Text style={{ fontSize: 17 }}>
                                        {
                                            all_constants.drawercontent.drawer_item.orders_history
                                                .infos.canceled_label
                                        }{" "}
                                        {this.props.route.params.item.order_cancel_date} à{" "}
                                        {this.props.route.params.item.order_cancel_hour}
                                    </Text>
                                </View>
                            </View>
                        )}

                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialCommunityIcons
                                    name="google-maps"
                                    size={30}
                                    color="black"
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {this.props.route.params.item.order_delivery_address}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <CustomButton
                        label={all_constants.modal.dish_modal.show}
                        backgroundColor="darkgrey"
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        onPress={this.onPressShowModal}
                        label_color="white"
                    />
                </View>
            </View>
        );
    }
}
