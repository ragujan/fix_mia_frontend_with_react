import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useApiUrl from "../../hooks/useApiUrl";
import { validate } from "../../util/Validate";
import { makeRequests } from "../../util/makeRequests";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import useClearCookies from "../../hooks/useClearCookies";
import useLogout from "../../hooks/useLogout";

const SellerRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // Assuming Price is a number
  const [serviceCategoryId, setServiceCategoryId] = useState(0); // Assuming Service Category id is a number
  const [image, setImage]: [
    null | File | undefined,
    Dispatch<SetStateAction<null | File | undefined>>
  ] = useState();
  const [inputErrorState, setInputErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const clearCookies = useClearCookies();
  const logout = useLogout();

  const apiUrl = useApiUrl();
  const [cookies] = useCookies();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setImage(selectedFile);
      } else {
        setImage(null); // Reset image state if no file is selected
      }
    }
  };
  const registerSeller = async () => {
    if (!validate(firstName, "name")) {
      setErrorMessage("Invalid first name only numbers and texts are allowed");
      setInputErrorState(true);
      return;
    }

    if (!validate(lastName, "name")) {
      setErrorMessage("Invalid last name only numbers and texts are allowed");
      setInputErrorState(true);
      return;
    }
    if (!validate(price, "price")) {
      setErrorMessage("Invalid price");
      setInputErrorState(true);
      return;
    }
    if (!validate(description, "name")) {
      setErrorMessage("Invalid description");
      setInputErrorState(true);
      return;
    }
    if (!validate(serviceCategoryId.toString(), "number")) {
      setErrorMessage("Invalid description");
      setInputErrorState(true);
      return;
    }
    const formData = new FormData();
    formData.append("token", cookies["access_token"]);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("serviceCategoryId", serviceCategoryId.toString());
    console.log("formdata is", formData);
    if (image) {
      formData.append("image", image);
    }
    const path = "service-provider/register";
    const url = `${apiUrl}${path}`;
    const response = await makeRequests("POST", url, formData, "text", "");
    console.log(response);
    if (response === "success") {
      // setDescription("");
      // setFirstName("");
      // setLastName("");
      // setPrice("");
      // setImage(null);
      // navigate("/home", { replace: true })
    }else if(response === "invalid token"){
        logout();
        clearCookies();
    }
  };
  return (
    <div className="w-full pt-5 pb-5 bg-gray-200">
      <section className="max-w-4xl px-6 pt-10 pb-5 mx-auto mt-0 text-black bg-white rounded-md shadow-md dark:bg-gray-800">
        <h1 className="text-xl font-bold text-black capitalize dark:text-white">
          Account settings
        </h1>

        <div className="grid grid-cols-1 mt-4 gap-x-4 gap-y-2 sm:grid-cols-2">
          <div>
            <label className=" dark:text-gray-200" htmlFor="username">
              First Name
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className=" dark:text-gray-200">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div className="col-span-2">
            <label
              className=" dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="textarea"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
          <div>
            <label className=" dark:text-gray-200">Price</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label
              className=" dark:text-gray-200"
              htmlFor="passwordConfirmation"
            >
              Service Category
            </label>
            <select
              value={serviceCategoryId}
              onChange={(e) => setServiceCategoryId(parseInt(e.target.value))}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            >
              <option value={1}>Surabaya</option>
              <option value={2}>Jakarta</option>
              <option>Tangerang</option>
              <option>Bandung</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Image
            </label>
            <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="w-12 h-12 mx-auto "
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="">Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 text-white">or drag and drop</p>
                </div>
                <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => registerSeller()}
            className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
          >
            Save
          </button>
        </div>
      </section>
      {/* 
      <section className="max-w-4xl p-6 mx-auto mt-20 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Account settings
        </h2>

        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-gray-700 dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
                id="passwordConfirmation"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section> */}
    </div>
  );
};

export default SellerRegister;
