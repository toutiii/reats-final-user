import { format } from "date-fns";
import frFrLocale from "date-fns/locale/fr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import "moment/locale/fr"; // Import French locale

export function getDeliveryDateInfo(dateObject, wantedFormat) {
    let formattedDeliveryDate = format(dateObject, wantedFormat, {
        locale: frFrLocale,
    });
    return formattedDeliveryDate;
}

export function formatDateToFrench(dateString) {
    moment.locale("fr");
    const date = moment(dateString);
    const formattedDate = date.format("dddd D MMMM YYYY");

    return formattedDate;
}

export async function storeCartItem(cartItemObject) {
    try {
        const objectKey = `reats_cart_item_${cartItemObject.id}`;
        const jsonValue = JSON.stringify(cartItemObject);
        console.log("Storing cart item with key: ", objectKey);
        console.log("Storing cart item with value: ", jsonValue);
        await AsyncStorage.setItem(objectKey, jsonValue);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function storeGlobalCookerID(cookerID) {
    try {
        const objectKey = "cooker_id";
        const jsonValue = JSON.stringify(cookerID);
        console.log("Storing global cooker ID with key: ", objectKey);
        console.log("Storing global cooker ID with value: ", jsonValue);
        await AsyncStorage.setItem(objectKey, jsonValue);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getGlobalCookerID() {
    try {
        const objectKey = "cooker_id";
        const jsonValue = await AsyncStorage.getItem(objectKey);
        console.log(jsonValue);
        return jsonValue != null
            ? JSON.parse(jsonValue)
            : null;
    } catch (e) {
        console.error(e);
    }
}

export async function removeGlobalCookerID() {
    try {
        const objectKey = "cooker_id";
        console.log("Removing global cooker ID with key: ", objectKey);
        await AsyncStorage.removeItem(objectKey);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function removeGlobalOrderID() {
    try {
        const objectKey = "orderID";
        console.log("Removing global order ID with key: ", objectKey);
        await AsyncStorage.removeItem(objectKey);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getAdditionalItemsKeys(ItemID) {
    const objectKey = `reats_cart_item_${ItemID}`;
    let objectToRemove = JSON.parse(await AsyncStorage.getItem(objectKey));
    let keysToRemove = [
    ];

    if (objectToRemove.category === "dish") {
        console.log(objectToRemove);
        const keys = await AsyncStorage.getAllKeys();
        const myCartKeys = keys.filter((key) => key.includes("reats_cart_item_"));
        const cartItems = await AsyncStorage.multiGet(myCartKeys);
        let countCookerDishesInCart = 0;

        if (cartItems.length > 0) {
            const cartItemsObjects = cartItems.map((item) => JSON.parse(item[1]));

            cartItemsObjects.map((item) => {
                if (
                    item.cooker.id === objectToRemove.cooker.id &&
          item.category === "dish"
                ) {
                    countCookerDishesInCart += 1;
                }
            });

            console.log("countCookerDishesInCart: ", countCookerDishesInCart);

            if (countCookerDishesInCart === 1) {
                cartItemsObjects.map((item) => {
                    if (item.cooker.id === objectToRemove.cooker.id) {
                        if (
                            item.capacity !== undefined ||
              item.category === "dessert" ||
              item.category === "drink" ||
              item.category === "starter"
                        ) {
                            console.log("Removing cart item with key: ", objectKey);
                            keysToRemove.push(item.id);
                        }
                    }
                });
            }
        }
    }

    console.log("keysToRemove: ", keysToRemove);
    return keysToRemove;
}

export async function getCartItem(ItemID) {
    try {
        const objectKey = `reats_cart_item_${ItemID}`;
        const jsonValue = await AsyncStorage.getItem(objectKey);
        console.log(jsonValue);
        return jsonValue != null
            ? JSON.parse(jsonValue)
            : null;
    } catch (e) {
        console.error(e);
    }
}

export async function removeMultipleItemsFromCart(ItemIDs) {
    try {
        let keysToRemove = [
        ];
        ItemIDs.map((itemID) => {
            keysToRemove.push(`reats_cart_item_${itemID}`);
        });
        await AsyncStorage.multiRemove(keysToRemove);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function removeCartItem(ItemID) {
    try {
        const objectKey = `reats_cart_item_${ItemID}`;
        console.log("Removing cart item with key: ", objectKey);
        await AsyncStorage.removeItem(objectKey);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getAllCartItems() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const myCartKeys = keys.filter((key) => key.includes("reats_cart_item_"));
        console.log(myCartKeys);
        const cartItems = await AsyncStorage.multiGet(myCartKeys);

        if (cartItems.length > 0) {
            const cartItemsObjects = cartItems.map((item) => JSON.parse(item[1]));
            return {
                data: cartItemsObjects,
            };
        }
        return {
            data: [
            ],
        };
    } catch (e) {
        console.error(e);
    }
}

export async function removeAllCartItems() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const myCartKeys = keys.filter((key) => key.includes("reats_cart_item_"));
        console.log(myCartKeys);
        await AsyncStorage.multiRemove(myCartKeys);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export function buildReadableAddress(address) {
    if (address.length === 0) {
        return "";
    }
    let readableAddress =
    address.street_number +
    " " +
    address.street_name +
    " " +
    address.address_complement +
    " " +
    address.postal_code +
    " " +
    address.town;

    readableAddress = readableAddress.replace("null ", "");
    return readableAddress;
}

async function emptyCartItems() {
    const result = await removeAllCartItems();
    console.log("Remove all items from cart: ", result);
}
async function emptyGlobalCookerID() {
    const result = await removeGlobalCookerID();
    console.log("Remove global cooker ID: ", result);
}
async function emptyDeliveryMode() {
    const result = await AsyncStorage.removeItem("delivery_mode");
    console.log("Remove delivery mode: ", result);
}
async function emptyAddressID() {
    const result = await AsyncStorage.removeItem("address_id");
    console.log("Remove address ID: ", result);
}
async function emptyFullDeliveryAddress() {
    const result = await AsyncStorage.removeItem("full_delivery_address");
    console.log("Remove full delivery address: ", result);
}
async function emptyGlobalOrderID() {
    const result = await removeGlobalOrderID();
    console.log("Remove global order ID: ", result);
}

export async function cleanCurrentOrderState() {
    emptyCartItems();
    emptyGlobalCookerID();
    emptyDeliveryMode();
    emptyAddressID();
    emptyFullDeliveryAddress();
    emptyGlobalOrderID();
}
