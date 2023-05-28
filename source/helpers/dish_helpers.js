const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getDishes() {
  await sleep(1000);
  const dish_list_data = {
    data: [
      {
        id: "1",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
        dish_name: "Poulet Yassa",
        dish_category: "starter",
        dish_rating: "4.8/5",
        dish_price: "14",
        dish_description: "Un succulent poulet Yassa",
        dish_country: "Sénégal",
      },
      {
        id: "2",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
        dish_name: "Poulet Yassa",
        dish_category: "starter",
        dish_rating: "4.8/5",
        dish_price: "14",
        dish_description: "Un succulent poulet Yassa",
        dish_country: "Sénégal",
      },
      {
        id: "3",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
        dish_name: "Poulet Yassa",
        dish_category: "starter",
        dish_rating: "4.8/5",
        dish_price: "14",
        dish_description: "Un succulent poulet Yassa",
        dish_country: "Sénégal",
      },
      {
        id: "4",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
        dish_name: "Poulet Yassa",
        dish_category: "starter",
        dish_rating: "4.8/5",
        dish_price: "14",
        dish_description: "Un succulent poulet Yassa",
        dish_country: "Sénégal",
      },
      {
        id: "5",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
        dish_name: "Poulet Yassa",
        dish_category: "starter",
        dish_rating: "4.8/5",
        dish_price: "14",
        dish_description: "Un succulent poulet Yassa",
        dish_country: "Sénégal",
      },
      {
        id: "6",
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
        dish_name: "Poulet Yassa",
        dish_category: "starter",
        dish_rating: "4.8/5",
        dish_price: "14",
        dish_description: "Un succulent poulet Yassa",
        dish_country: "Sénégal",
      },
    ],
  };
  return dish_list_data;
}
