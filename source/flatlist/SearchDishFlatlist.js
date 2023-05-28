import React from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Dish from "../components/Dish.js";
import { getDishes } from "../helpers/dish_helpers.js";
import { Searchbar } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchFilterModal from "../modals/SearchFilterModal.js";

export default function SearchDishFlatList({ ...props }) {
  const [isSearchFilterModalVisible, setSearchFilterModalVisible] =
    React.useState(false);

  const [selectedDishCategories, setSelectedDishCategories] = React.useState(
    []
  );
  const [dishSortTypeFilter, setDishSortTypeFilter] = React.useState(null);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [runSearchByTextInput, setRunSearchByTextInput] = React.useState(false);

  const minLengthToTriggerSearch = 3;
  const maxInputLength = 100;
  const delaySearch = 2000;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const toggleSearchFilterModal = () => {
    setSearchFilterModalVisible(!isSearchFilterModalVisible);
  };

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => {
    console.log(query);
    if (query.length === 0) {
      setSearchQuery("");
    }

    if (
      query.length > 0 &&
      query.length <= maxInputLength &&
      query.charCodeAt(query.slice(-1)) <= 127
    ) {
      setSearchQuery(query.replace("  ", ""));
    }

    if (
      query.replace("  ", "").replace(" ", "").length >=
      minLengthToTriggerSearch
    ) {
      setRunSearchByTextInput(true);
    }
  };

  const updateSearchingStatus = () => {
    setIsFetchingData(!isFetchingData);
  };

  React.useEffect(() => {
    if (isFetchingData) {
      fadeOut();
      setTimeout(() => {
        async function fetchDataFromBackend() {
          const results = await getDishes();
          setData(results.data);
        }
        fetchDataFromBackend();
        updateSearchingStatus();
        resetFilters();
        setRunSearchByTextInput(false);
        fadeIn();
      }, 5000);
    }
  }, [isFetchingData]);

  React.useEffect(() => {
    if (runSearchByTextInput) {
      const delayDebounceFn = setTimeout(() => {
        updateSearchingStatus();
      }, delaySearch);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [runSearchByTextInput]);

  const onPressFilter = () => {
    toggleSearchFilterModal();

    if (selectedDishCategories.length !== 0 || dishSortTypeFilter !== null) {
      console.log(selectedDishCategories);
      console.log(dishSortTypeFilter);
      updateSearchingStatus();
    }
  };

  const resetFilters = () => {
    setSelectedDishCategories([]);
    setDishSortTypeFilter(null);
  };

  return (
    <Animated.View
      style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
    >
      {isSearchFilterModalVisible && (
        <SearchFilterModal
          enableDishCategoriesFilter={true}
          enableDishSortTypeFilter={true}
          dishSortTypeFilterData={setDishSortTypeFilter}
          selectedDishCategoriesData={setSelectedDishCategories}
          isModalVisible={isSearchFilterModalVisible}
          toggleModal={toggleSearchFilterModal}
          onPressFilter={onPressFilter}
          onPressClear={resetFilters}
        />
      )}

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 4 }}>
          <Searchbar
            placeholder={all_constants.search_bar.placeholder}
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableRipple
            onPress={toggleSearchFilterModal}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <MaterialCommunityIcons
              name="filter-variant"
              color={"black"}
              size={40}
            />
          </TouchableRipple>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {isFetchingData && <ActivityIndicator size="large" color="tomato" />}
        <FlatList
          data={data}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <Text style={{ fontSize: 20 }}>
                {all_constants.search.no_dishes_found}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles_order.order_button_container}>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("SearchItemDetail", {
                    item: item,
                  });
                }}
                style={{ flex: 1, alignItems: "center" }}
                underlayColor={all_constants.colors.inputBorderColor}
              >
                <Dish
                  key={item.id}
                  dish_photo={item.photo}
                  dish_name={item.dish_name}
                  dish_category={item.dish_category}
                  dish_rating={item.dish_rating}
                  dish_price={item.dish_price + all_constants.currency_symbol}
                  dish_description={item.dish_description}
                  dish_country={item.dish_country}
                />
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </Animated.View>
  );
}
