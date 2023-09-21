async function makeRequests(
    method: 'GET' | 'POST',
    url: string,
    data: string | FormData,
    responseType: 'json' | 'text' | 'html',
    contentType: string
): Promise<string | JSON | undefined> {

    interface requestOptionsType {
        method: string,
        headers: HeadersInit | undefined,
        body: string | FormData
    }
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', contentType);
    requestHeaders.set('Accept', responseType === 'json' ? 'application/json' : (responseType === 'text' ? 'text/plain' : 'text/html'))
    try {
        const requestOptions: requestOptionsType = {
            method,
            headers: undefined,
            body: ""
        }
        if (data !== null) {
            if (contentType != "") {
                requestOptions.headers = requestHeaders;
            }
            let response;
            if (method === "POST") {
                requestOptions.method = "POST";
                requestOptions.body = data;
                response = await fetch(url, requestOptions);
            }
            if (method === "GET" && typeof data === 'string') {
                requestOptions.method = "GET";
                const params = new URLSearchParams(data);
                // if (data != "") {
                url += `?${params}`
                // }
                response = await fetch(url);
            }


            if (responseType.toLocaleLowerCase() === "json") {
                // const json: JSON = await (response as Response).json();
                if (typeof response === "object" && response !== null) {
                    const json = await response.json();
                    return json;
                }
            }
            if (responseType.toLocaleLowerCase() === "text") {
                const text: string = await (response as Response).text();
                console.log("text is ", text)
                return text;
            }
        }

    } catch (e) {
        console.log(JSON.stringify(e))
        // throw new Error(JSON.stringify(e))
    }
}

export { makeRequests };