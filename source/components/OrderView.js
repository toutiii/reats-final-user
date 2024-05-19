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
import moment from "moment";
import "moment/locale/fr"; // Import French locale
import { buildReadableAddress } from "../helpers/toolbox";

export default class OrderView extends Component {
    constructor(props) {
        super(props);
        moment.locale("fr");
        this.state = {
            modalVisible: false,
        };
    }

    iconSize = 25;

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
                        modal_data={this.props.route.params.item.items}
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
                                {this.props.route.params.item.id}
                            </Text>
                        </View>

                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialIcons
                                    name="shopping-cart"
                                    size={this.iconSize}
                                    color="black"
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {
                                        all_constants.drawercontent.drawer_item.orders_history
                                            .status.ordered
                                    }{" "}
                                    {moment(this.props.route.params.item.created).format(
                                        "dddd DD MMM à HH[h]mm",
                                    )}
                                </Text>
                            </View>
                        </View>
                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <FontAwesome name="money" size={this.iconSize} color="black" />
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
                        {this.props.route.params.item.status ===
              all_constants.drawercontent.drawer_item.orders_history
                  .original_status.delivered && (
                            <View style={styles_order_view.order_item_info}>
                                <View style={{ flex: 1 }}>
                                    <AntDesign
                                        name="checkcircle"
                                        size={this.iconSize}
                                        color="green"
                                    />
                                </View>
                                <View style={{ flex: 6 }}>
                                    <Text style={{ fontSize: 17 }}>
                                        {
                                            all_constants.drawercontent.drawer_item.orders_history
                                                .status.delivered
                                        }{" "}
                                        {moment(this.props.route.params.item.delivery_date).format(
                                            "dddd DD MMM à HH[h]mm",
                                        )}
                                    </Text>
                                </View>
                            </View>
                        )}
                        {this.props.route.params.item.status ===
              all_constants.drawercontent.drawer_item.orders_history
                  .original_status.cancelled_by_cooker && (
                            <View style={styles_order_view.order_item_info}>
                                <View style={{ flex: 1 }}>
                                    <MaterialIcons
                                        name="cancel"
                                        size={this.iconSize}
                                        color="red"
                                    />
                                </View>
                                <View style={{ flex: 6 }}>
                                    <Text style={{ fontSize: 17 }}>
                                        {
                                            all_constants.drawercontent.drawer_item.orders_history
                                                .status.cancelled_by_cooker
                                        }{" "}
                                        {moment(this.props.route.params.item.modified).format(
                                            "dddd DD MMM à HH[h]mm",
                                        )}
                                    </Text>
                                </View>
                            </View>
                        )}

                        {this.props.route.params.item.status ===
              all_constants.drawercontent.drawer_item.orders_history
                  .original_status.cancelled_by_customer && (
                            <View style={styles_order_view.order_item_info}>
                                <View style={{ flex: 1 }}>
                                    <MaterialIcons
                                        name="cancel"
                                        size={this.iconSize}
                                        color="red"
                                    />
                                </View>
                                <View style={{ flex: 6 }}>
                                    <Text style={{ fontSize: 17 }}>
                                        {
                                            all_constants.drawercontent.drawer_item.orders_history
                                                .status.cancelled_by_customer
                                        }{" "}
                                        {moment(this.props.route.params.item.modified).format(
                                            "dddd DD MMM à HH[h]mm",
                                        )}
                                    </Text>
                                </View>
                            </View>
                        )}

                        <View style={styles_order_view.order_item_info}>
                            <View style={{ flex: 1 }}>
                                <MaterialCommunityIcons
                                    name="google-maps"
                                    size={this.iconSize}
                                    color="black"
                                />
                            </View>
                            <View style={{ flex: 6 }}>
                                <Text style={{ fontSize: 17 }}>
                                    {buildReadableAddress(this.props.route.params.item.address)}
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
