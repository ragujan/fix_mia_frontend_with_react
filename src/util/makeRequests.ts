async function makeRequests(
    method: 'GET' | 'POST',
    url: string,
    data: string | FormData,
    responseType: 'json' | 'text',
    contentType: string
) {

    interface requestOptionsType {
        method: string,
        headers: HeadersInit | undefined,
        body: string | FormData
    }

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', contentType);
    requestHeaders.set('Accept',responseType === 'json'?'application/json':'text/plain')
    try {
        const requestOptions: requestOptionsType = {
            method,
            headers: undefined,
            body: ""
        }
        if (data !== null) {
            if (method === "GET" && typeof data === 'string') {
                requestOptions.method = "GET";
                const params = new URLSearchParams(data);
                url += `?${params}`
            }
            if (method === "POST") {
                requestOptions.method = "POST";
                requestOptions.body = data;
            }
            if(contentType != ""){
                requestOptions.headers = requestHeaders;
            }
            const response = await fetch(url, requestOptions);
            if (responseType.toLocaleLowerCase() === "json") {
                const json = await response.json();
                return json;
            }
            if (responseType.toLocaleLowerCase() === "text") {
                const text = await response.text();
                return text;
            }
        }

    } catch (e) {
        throw new Error("Request problems")
    }
}

export { makeRequests };