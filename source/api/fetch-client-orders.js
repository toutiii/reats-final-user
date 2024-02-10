/* eslint-disable max-len */
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getOrders() {
    await sleep(1000);

    let result = {
        status: 200,
        ok: true,
        json: {
            data: [
                {
                    id: 1,
                    photo:
            "https://cdn.shopify.com/s/files/1/0046/8687/2649/articles/20180428-224841_grande_da48bffe-31ad-4658-b9af-383f745ea8b3.jpg?v=1550656688",
                    dish_name: "okok ignames",
                    number_of_dishes: 1,
                    dish_price: 14,
                    dish_order_datetime: "2022-06-01T11:00:00+00:00",
                    dish_status: "cooking",
                    is_order_deleted: false,
                },
                {
                    id: 2,
                    photo:
            "https://www.editions2015.com/cameroun/wp-content/uploads/2015/09/ndole.jpg",
                    dish_name: "Ndole",
                    number_of_dishes: 2,
                    dish_price: 10,
                    dish_order_datetime: "2022-06-01T11:00:00+00:00",
                    dish_status: "cooking",
                    is_order_deleted: false,
                },
                {
                    id: 3,
                    photo:
            "https://www.nofi.media/wp-content/uploads/2016/04/4526d7496603f06506b970315d9b30ac-672x448.jpg",
                    dish_name: "Sauce gombo au porc",
                    number_of_dishes: 2,
                    dish_price: 11,
                    dish_order_datetime: "2022-06-01T11:00:00+00:00",
                    dish_status: "cooking",
                    is_order_deleted: false,
                },
                {
                    id: 4,
                    photo:
            "https://img.lemde.fr/2018/03/27/0/0/5760/3840/664/0/75/0/532f98c_18068-6hi00q.b16kl.jpg",
                    dish_name: "Thiéboudiène rouge au poulet",
                    number_of_dishes: 4,
                    dish_price: 10,
                    dish_order_datetime: "2022-06-01T11:00:00+00:00",
                    dish_status: "cooking",
                    is_order_deleted: false,
                },
                {
                    id: 5,
                    photo:
            "https://cuisinedumboa.com/wp-content/uploads/2019/03/FB_IMG_15307324283946846-1.jpg",
                    dish_name: "Eru et son couscous au tapioca",
                    number_of_dishes: 2,
                    dish_price: 14,
                    dish_order_datetime: "2022-06-01T11:00:00+00:00",
                    dish_status: "cooking",
                    is_order_deleted: false,
                },
                {
                    id: 6,
                    photo:
            "https://i0.wp.com/laviebami.com/wp-content/uploads/2021/04/7f66d4_e36b86ee45c4468d8ba0d41a584baad1mv2.png?w=740&ssl=1",
                    dish_name: "Beignets haricots",
                    number_of_dishes: 2,
                    dish_price: 10,
                    dish_order_datetime: "2022-06-01T11:00:00+00:00",
                    dish_status: "cooking",
                    is_order_deleted: true,
                },
            ],
        },
    };
    return result.json;
}
