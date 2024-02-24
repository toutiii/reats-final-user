import { apiBaseUrl, apiKeyBackend, appOriginHeader, port } from "../env";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { setItemAsync } from "expo-secure-store";

export async function callBackEnd(
    data,
    url,
    method,
    accessToken = null,
    useFormData = false,
    apiKey = null,
) {
    console.log(data);
    console.log(url);
    console.log(method);
    console.log(accessToken);
    console.log(useFormData);
    console.log(apiKey);

    if (apiKey !== null && accessToken !== null) {
        console.error(
            "You can't use both APIKey and access token in the same request.",
        );
        return { ok: false };
    }

    if (apiKey === null && accessToken === null) {
        console.error("You need to specify at least an access token or an APIKey.");
        return { ok: false };
    }

    let response = "";
    let headers = { Accept: "application/json" };

    if (accessToken !== null) {
        headers["Authorization"] = accessToken;
    }

    if (apiKey !== null) {
        headers["X-Api-Key"] = apiKeyBackend;
        headers["App-Origin"] = appOriginHeader;
    }

    let body = data;

    if (!useFormData) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(data);
    }

    console.log(headers);

    try {
        if (method === "GET") {
            response = await fetch(url, {
                method: method,
                headers: headers,
            });
        } else {
            response = await fetch(url, {
                method: method,
                headers: headers,
                body: body,
            });
        }

        response = await response.json();
        console.log("**************************************");
        console.log("Below initial request's response");
        console.log(JSON.stringify(response));
        console.log("**************************************");

        if (
            response.status_code === 401 &&
      response.error_code === "token_not_valid"
        ) {
            await renewAccessToken();
            const newAccessToken = await getItemFromSecureStore("accessToken");
            if (method === "GET") {
                response = await fetch(url, {
                    method: method,
                    headers: {
                        Accept: "application/json",
                        Authorization: newAccessToken,
                    },
                });
            } else {
                response = await fetch(url, {
                    method: method,
                    headers: {
                        Accept: "application/json",
                        Authorization: newAccessToken,
                    },
                    body: body,
                });
            }
            response = await response.json();
            console.log("-------------------------------------------");
            console.log("Below request response after access token renew only");
            console.log(JSON.stringify(response));
            console.log("-------------------------------------------");
            if (
                response.status_code === 401 &&
        response.error_code === "token_not_valid"
            ) {
                await renewTokenPair();
                const accessTokenFromNewPair =
          await getItemFromSecureStore("accessToken");
                if (method === "GET") {
                    response = await fetch(url, {
                        method: method,
                        headers: {
                            Accept: "application/json",
                            Authorization: accessTokenFromNewPair,
                        },
                    });
                } else {
                    response = await fetch(url, {
                        method: method,
                        headers: {
                            Accept: "application/json",
                            Authorization: accessTokenFromNewPair,
                        },
                        body: body,
                    });
                }

                response = await response.json();
                console.log("-------------------------------------------");
                console.log("Below request response after token pair renew");
                console.log(JSON.stringify(response));
                console.log("-------------------------------------------");
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function renewAccessToken() {
    console.log("=======================================");
    let url = `${apiBaseUrl}:${port}/api/v1/token/refresh/`;
    const refreshToken = await getItemFromSecureStore("refreshToken");

    let formData = new FormData();
    formData.append("refresh", refreshToken);

    console.log(formData);
    console.log(url);

    let response = await fetch(url, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
    });
    response = await response.json();
    console.log(JSON.stringify(response));

    if (response.ok) {
        await setItemAsync("accessToken", `Bearer ${response.access}`);
    }
    console.log("=======================================");
}

export async function renewTokenPair() {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Renewing token pair...");
    let url = `${apiBaseUrl}:${port}/api/v1/token/`;

    let formData = new FormData();
    const phoneNumber = await getItemFromSecureStore("phoneNumber");
    formData.append("phone", phoneNumber);
    console.log(formData);
    console.log(url);

    let response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "X-Api-Key": apiKeyBackend,
            "App-Origin": appOriginHeader,
        },
        body: formData,
    });
    response = await response.json();
    console.log(JSON.stringify(response));

    if (response.ok) {
        await setItemAsync("refreshToken", `${response.token.refresh}`);
        await setItemAsync("accessToken", `Bearer ${response.token.access}`);
    }
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}

export async function callBackendWithFormDataForCustomers(
    data,
    url,
    method,
    userID,
    access,
    apiKeyBackend,
) {
    console.log(data);
    console.log(url);
    console.log(method);
    let formData = new FormData();

    if (method === "DELETE") {
        url += userID + "/";
        return callBackEnd(formData, url, method, access);
    }

    if (data.photo !== undefined && data.photo.startsWith("file:///")) {
        const fileName = data.photo.split("/").pop();
        const fileExtension = fileName.split(".").pop();
        formData.append("photo", {
            uri: data.photo,
            name: fileName,
            type: `image/${fileExtension}`,
        });
    }

    let form_keys = [
        "firstname",
        "lastname",
        "phone"
    ];

    if (method === "PATCH") {
        form_keys.pop();
        url += userID + "/";
    }

    for (let i = 0; i < form_keys.length; i++) {
        if (data[form_keys[i]] !== undefined) {
            formData.append(form_keys[i], data[form_keys[i]]);
        }
    }

    return callBackEnd(formData, url, method, access, true, apiKeyBackend);
}

export async function callBackEndForAuthentication(
    data,
    url,
    method,
    apiKeyBackend,
) {
    console.log(data);
    let formData = new FormData();
    formData.append("phone", data.phone);
    return callBackEnd(formData, url, method, null, true, apiKeyBackend);
}
