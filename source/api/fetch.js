import { getToken } from "./token";

export async function callBackEnd(data, url, method) {
  try {
    let response = fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getToken(),
      },
      body: JSON.stringify(data),
    });
    //return response;
    return { status: 200, ok: true }; // For now we mock the API response
  } catch (error) {
    console.log(error);
  }
}
