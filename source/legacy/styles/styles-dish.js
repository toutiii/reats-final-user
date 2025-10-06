import { StyleSheet } from "react-native";

let styles_dish = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    dish_button_container: {
        flex: 1,
        aspectRatio: 16 / 9,
        alignItems: "center",
        marginTop: "5%",
        width: "100%",
    },
    images: {
        flex: 1,
    },
    dish_infos: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    dish_price: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    dish_name: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dish_rating: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
    },
    rating_star: {
        width: 20,
        height: 20,
    },
});

export default styles_dish;
