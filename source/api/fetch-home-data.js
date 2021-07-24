export async function getNewDishesData(){
    await fetch(
        'http://www.mocky.io/v2/5e3315753200008abe94d3d8?mocky-delay=2000ms',
    );
    let result = {
        status: 200,
        ok: true,
        json: {
            "data":[
                {
                    "id": "1",
                    "photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    "dish_name": "Poulet Yassa",
                    "dish_category": "starter",
                    "dish_rating": "4.8/5",
                    "dish_price": "14",
                    "dish_description": "Un succulent poulet Yassa",
                    "dish_country": "Sénégal",
                    "isEnabled": true
                },
                {
                    "id": "2",
                    "photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    "dish_name": "Poulet Yassa",
                    "dish_category": "starter",
                    "dish_rating": "4.8/5",
                    "dish_price": "14",
                    "dish_description": "Un succulent poulet Yassa",
                    "dish_country": "Sénégal",
                    "isEnabled": true
                },
                {
                    "id": "3",
                    "photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    "dish_name": "Poulet Yassa",
                    "dish_category": "starter",
                    "dish_rating": "4.8/5",
                    "dish_price": "14",
                    "dish_description": "Un succulent poulet Yassa",
                    "dish_country": "Sénégal",
                    "isEnabled": true
                },
                {
                    "id": "4",
                    "photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    "dish_name": "Poulet Yassa",
                    "dish_category": "starter",
                    "dish_rating": "4.8/5",
                    "dish_price": "14",
                    "dish_description": "Un succulent poulet Yassa",
                    "dish_country": "Sénégal",
                    "isEnabled": true
                },
                {
                    "id": "5",
                    "photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    "dish_name": "Poulet Yassa",
                    "dish_category": "starter",
                    "dish_rating": "4.8/5",
                    "dish_price": "14",
                    "dish_description": "Un succulent poulet Yassa",
                    "dish_country": "Sénégal",
                    "isEnabled": true
                },
                {
                    "id": "6",
                    "photo": "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    "dish_name": "Poulet Yassa",
                    "dish_category": "starter",
                    "dish_rating": "4.8/5",
                    "dish_price": "14",
                    "dish_description": "Un succulent poulet Yassa",
                    "dish_country": "Sénégal",
                    "isEnabled": true
                }
            ]
        }
    };
    return result.json.data
}
