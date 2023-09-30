import { makeRequests } from "../util/makeRequests";
import useRefreshToken from "./useRefreshToken";

const usePrivateRequestSender =  () => {
  const refresh = useRefreshToken();
  const sendRequest = async (
    method: "GET" | "POST",
    url: string,
    data: string | FormData,
    responseType: "json" | "text" | "html",
    contentType: string

  ) => {
    console.log("refresh hook is being called ")
    console.log("the url is ",url)
    const refreshTokenStatus = await refresh();
    if (refreshTokenStatus !== undefined) {
      const response = await makeRequests(
        method,
        url,
        data,
        responseType,
        contentType
      );
    //   throw new Error("token expired");
      return response;
    } else {
      throw new Error("token expired");
    }
  };
  return sendRequest;
};

export default usePrivateRequestSender;
