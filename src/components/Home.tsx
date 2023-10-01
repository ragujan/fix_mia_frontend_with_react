import useUserLoggedIn from "../hooks/useUserLoggedIn";
import logoIMage from "../assets/resources/image_resources/logo.png";
import { useEffect } from "react";


function Home() {
  const isLoggedIn = useUserLoggedIn();

  useEffect(() => {
    console.log("user logged in", isLoggedIn());
  }, [isLoggedIn]);

  return (
    <div>
      <nav id="header" className="z-30 w-full py-1 sm:hidden md:flex">
        <div className="container flex flex-wrap items-center justify-between w-full px-6 py-3 mx-auto mt-0">
          <label
            htmlFor="menu-toggle"
            className="block cursor-pointer md:hidden"
          >
            <svg
              className="font-semibold fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" />

          <div
            className="order-3 hidden w-full font-semibold text-gray-600 md:flex md:items-center md:w-auto md:order-1"
            id="menu"
          >
            <nav>
              <ul className="items-center justify-between pt-4 text-base md:flex md:pt-0">
                <li>
                  <a className="inline-block px-4 py-2 no-underline hover:text-black hover:underline">
                    <span className="z-50 hidden ml-5 text-4xl cursor-pointer text-text lg:flex left-16"></span>
                  </a>
                </li>
                <li>
                  <a
                    className="hidden px-4 py-2 no-underline md:inline-block hover:text-black hover:underline"
                    href="#"
                  >
                    Discover
                  </a>
                </li>
                <li>
                  <a
                    className="hidden px-4 py-2 no-underline md:inline-block hover:text-black hover:underline"
                    href="#"
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex order-1 md:order-2">
            <a
              className="flex items-center text-xl font-bold tracking-wide no-underline text-main-blue text-maintheme gap-x-2 hover:no-underline "
              href="#"
            >
              <img
                width="24"
                height="24"
                src={logoIMage}
                alt=""
              />
              FIXMIA
            </a>
          </div>

          <div
            className="flex items-center order-2 gap-x-2 md:order-3"
            id="nav-content"
          >
            <div className="hidden md:flex">
              <div className="relative flex-wrap items-stretch hidden w-full ">
                <input
                  type="search"
                  className="relative m-0 -mr-0.5 block w-[100px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.10] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="button-addon1"
                />

                <button
                  className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-maintheme shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                  type="button"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative flex items-center w-full h-12 overflow-hidden ">
                <div className="grid w-12 h-full text-gray-600 cursor-pointer place-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"

                    />
                  </svg>
                </div>

                <input
                  className="w-full h-full pr-2 text-sm text-gray-700 outline-none peer"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                />
              </div>
            </div>

            <a className="inline-block no-underline hover:text-black" href="#">
              <svg
                className="fill-current hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <circle fill="none" cx="12" cy="7" r="3" />
                <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5S14.757 2 12 2zM12 10c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3S13.654 10 12 10zM21 21v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h2v-1c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5v1H21z" />
              </svg>
            </a>
            <a
              className="inline-block pl-3 no-underline hover:text-black"
              href="#"
            >
              <svg
                className="fill-current hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z" />
                <circle cx="10.5" cy="18.5" r="1.5" />
                <circle cx="17.5" cy="18.5" r="1.5" />
              </svg>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Home;
