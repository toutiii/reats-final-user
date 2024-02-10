import { apiKeyBackend, appOriginHeader } from "../env";

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
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function callBackendWithFormDataForCustomers(
    data,
    url,
    method,
    apiKeyBackend,
) {
    console.log(data);
    console.log(url);
    console.log(method);
    let formData = new FormData();
    let form_keys = [
        "firstname",
        "lastname",
        "phone"
    ];

    for (let i = 0; i < form_keys.length; i++) {
        if (data[form_keys[i]] !== undefined) {
            formData.append(form_keys[i], data[form_keys[i]]);
        }
    }

    return callBackEnd(formData, url, method, null, true, apiKeyBackend);
}
