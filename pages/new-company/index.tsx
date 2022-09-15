import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import ErrorAlerts from "../../components/ErrorAlerts";
import { BASE_API_URL } from "../../utils/apiUrl";

const AddCompany = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [filename, setFilename] = useState("Upload logo");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // handle file change in the logo input
  const changeFileHandler = (e: any) => {
    setLogo(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_API_URL}/api/companies`, {
        name,
        logo,
        phone,
        city,
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      router.push("/");
    } catch (error) {
      setError(getError(error));
    }
  };

  return (
    <>
      <Head>
        <title>Add New Company - Darsolar Energy</title>
      </Head>
      <h1 className="mx-auto px-3 py-6 text-center mt-3 text-3xl">
        Add Company
      </h1>
      {error && <ErrorAlerts>{error}</ErrorAlerts>}
      <form
        className="flex flex-col mx-auto px-3 py-6 mt-5 md:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone
            </label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
          </div>

          <label
            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-600"
            htmlFor="logo"
          >
            {filename}
          </label>
          <input
            className="block w-full p-2 mb-3 text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:border-gray-600"
            id="logo"
            name="logo"
            type="file"
            onChange={changeFileHandler}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <Link href="/" passHref>
          <a
            type="submit"
            className="text-black bg-zinc-700 mt-2 hover:bg-zinc-100 focus:ring-4 focus:outline-none focus:ring-zinc-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-zinc-400 dark:hover:bg-black-700 dark:focus:ring-black-800"
          >
            Cancel
          </a>
        </Link>
      </form>
    </>
  );
};

export default AddCompany;
