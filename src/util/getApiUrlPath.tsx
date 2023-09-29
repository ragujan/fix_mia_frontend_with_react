import isNginx from "./isNginx";
import isProduction from "./isProduction";

function getApiUrlPath() {
  let urlPath = "http://localhost:8080/fix_mia_app_war_exploded/";
  if (isNginx() && isProduction()) {
    urlPath = "/api";
  }
  // console.log("hey bro bro bro bro ",urlPath)
  return urlPath;
}

export default getApiUrlPath;
