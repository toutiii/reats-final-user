/* eslint-disable max-len */
export async function getNewDishesData() {
    await fetch(
        "http://www.mocky.io/v2/5e3315753200008abe94d3d8?mocky-delay=2000ms",
    );
    let result = {
        status: 200,
        ok: true,
        json: {
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
                    dish_country_code: "sn",
                    dish_delivery_datetime: "2022-06-01T11:00:00+00:00",
                    isEnabled: true,
                },
                {
                    id: "2",
                    photo:
            "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    dish_name: "Poulet Yassa",
                    dish_category: "starter",
                    dish_rating: "4.8/5",
                    dish_price: "14",
                    dish_description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                    dish_country: "Sénégal",
                    dish_country_code: "sn",
                    dish_delivery_datetime: "2022-06-01T11:00:00",
                    isEnabled: true,
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
                    dish_country_code: "sn",
                    dish_delivery_datetime: "2022-06-01T11:00:00",
                    isEnabled: true,
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
                    dish_country_code: "sn",
                    dish_delivery_datetime: "2022-06-01T11:00:00",
                    isEnabled: true,
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
                    dish_country_code: "sn",
                    dish_delivery_datetime: "2022-06-01T11:00:00",
                    isEnabled: true,
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
                    dish_country_code: "sn",
                    dish_delivery_datetime: "2022-06-01T11:00:00",
                    isEnabled: true,
                },
            ],
        },
    };
    return result.json.data;
}
