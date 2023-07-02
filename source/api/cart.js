import React from "react";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function sendItemToCart(cartItemObject) {
  await sleep(300);

  return { statusCode: 200 };
}

export async function deleteItemFromCart(cartItemObject) {
  await sleep(300);

  return { statusCode: 200 };
}

export async function getAllItemsFromCart() {
  await sleep(300);

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
          dish_ordered_quantity: 1,
          dish_price: 14,
          dish_estimated_delivery_date: "2022-06-01T11:00:00+00:00",
          dish_status: "cooking",
          is_order_deleted: false,
          dish_rating: "4.8/5",
          dish_description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
          id: 2,
          photo:
            "https://www.editions2015.com/cameroun/wp-content/uploads/2015/09/ndole.jpg",
          dish_name: "Ndole",
          dish_ordered_quantity: 2,
          dish_price: 10,
          dish_estimated_delivery_date: "2022-06-01T11:00:00+00:00",
          dish_status: "cooking",
          is_order_deleted: false,
          dish_rating: "4.8/5",
          dish_description: "Un succulent poulet Yassa",
        },
        {
          id: 3,
          photo:
            "https://www.nofi.media/wp-content/uploads/2016/04/4526d7496603f06506b970315d9b30ac-672x448.jpg",
          dish_name: "Sauce gombo au porc",
          dish_ordered_quantity: 2,
          dish_price: 11,
          dish_estimated_delivery_date: "2022-06-01T11:00:00+00:00",
          dish_status: "cooking",
          is_order_deleted: false,
          dish_rating: "4.8/5",
          dish_description: "Un succulent poulet Yassa",
        },
        {
          id: 4,
          photo:
            "https://img.lemde.fr/2018/03/27/0/0/5760/3840/664/0/75/0/532f98c_18068-6hi00q.b16kl.jpg",
          dish_name: "Thiéboudiène rouge au poulet",
          dish_ordered_quantity: 4,
          dish_price: 10,
          dish_estimated_delivery_date: "2022-06-01T11:00:00+00:00",
          dish_status: "cooking",
          is_order_deleted: false,
          dish_rating: "4.8/5",
          dish_description: "Un succulent poulet Yassa",
        },
        {
          id: 5,
          photo:
            "https://cuisinedumboa.com/wp-content/uploads/2019/03/FB_IMG_15307324283946846-1.jpg",
          dish_name: "Eru et son couscous au tapioca",
          dish_ordered_quantity: 2,
          dish_price: 14,
          dish_estimated_delivery_date: "2022-06-01T11:00:00+00:00",
          dish_status: "cooking",
          is_order_deleted: false,
          dish_rating: "4.8/5",
          dish_description: "Un succulent poulet Yassa",
        },
        {
          id: 6,
          photo:
            "https://i0.wp.com/laviebami.com/wp-content/uploads/2021/04/7f66d4_e36b86ee45c4468d8ba0d41a584baad1mv2.png?w=740&ssl=1",
          dish_name: "Beignets haricots",
          dish_ordered_quantity: 2,
          dish_price: 10,
          dish_estimated_delivery_date: "2022-06-01T11:00:00+00:00",
          dish_status: "cooking",
          is_order_deleted: true,
          dish_rating: "4.8/5",
          dish_description: "Un succulent poulet Yassa",
        },
      ],
    },
  };
  return result.json;
}
