import { FlatList, View, Button } from "react-native";
import React from "react";
import DishForModal from "../components/DishForModal";
import Modal from "react-native-modal";
export default function DishModal({ ...props }) {
  return (
    <View>
      <Modal
        testID={"modal"}
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
        isVisible={props.state}
      >
        <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
          <View style={{ flex: 1 }}>
            <Button title="Close" onPress={props.onPressCloseModal} />
          </View>

          <View style={{ flex: 8 }}>
            <FlatList
              data={props.modal_data}
              renderItem={({ item }) => (
                <DishForModal
                  key={item.id}
                  dish_photo={item.photo}
                  dish_name={item.dish_name}
                  dish_rating={item.dish_rating}
                  dish_unit_price={item.dish_unit_price}
                  dish_style={item.dish_style}
                  dish_quantity={item.dish_quantity}
                  dish_order_date={item.dish_order_date}
                  dish_order_status={item.dish_order_status}
                  dish_total={item.dish_total}
                />
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
