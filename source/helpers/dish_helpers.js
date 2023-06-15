const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getDishes() {
  await sleep(500);
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
        dish_description:
          "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's s",
        dish_country: "Sénégal",
        dish_estimated_delivery_date: "2023-06-18",
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
        dish_estimated_delivery_date: "2023-06-18",
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
        dish_estimated_delivery_date: "2023-06-18",
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
        dish_estimated_delivery_date: "2023-06-18",
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
        dish_estimated_delivery_date: "2023-06-18",
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
        dish_estimated_delivery_date: "2023-06-18",
      },
    ],
  };
  return dish_list_data;
}
