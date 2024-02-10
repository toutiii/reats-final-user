import { StyleSheet } from "react-native";

let styles_form = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        margin: "2%",
    },
    submit_button: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "4%",
    },
    cancel_button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "4%",
    },
    activityIndicatorContainer: {
        position: "absolute",
        flex: 1,
        top: "40%",
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
    },
    form_button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: "4%",
    },
});
export default styles_form;
