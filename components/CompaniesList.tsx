import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Company } from "../interfaces/Company";
import { getError } from "../utils/error";
import ErrorAlerts from "./ErrorAlerts";

const BASE_API_URL = process.env.BASE_API_URL || "http://localhost:3001";

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get(`${BASE_API_URL}/api/companies`);
        setCompanies(data.companies);
      } catch (error) {
        setError(getError(error));
      }
    };

    fetchCompanies();
  }, []);

  const deleteCompany = async (id: string) => {
    try {
      const { data } = await axios.delete(
        `${BASE_API_URL}/api/companies/${id}`
      );
      console.log(data.message);

      // update state after deleting a company
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company: Company) => company._id !== id)
      );
    } catch (error) {
      setError(getError(error));
    }
  };

  return (
    <>
      <Head>
        <title>Companies List - Darsolar</title>
      </Head>
      <div className="container overflow-x-auto relative mx-auto py-12 mt-32 sm:rounded-lg px-6 py-6">
        <Link href="/new-company">
          <a
            type="button"
            className="mx-auto mb-3 bg-green-400 p-3 rounded-lg font-semibold text-white"
          >
            Add Company
          </a>
        </Link>
        {error && <ErrorAlerts>{error}</ErrorAlerts>}
        <table className="w-full text-sm text-left text-zinc-600 dark:text-zinc-600">
          <thead className="text-xs text-white uppercase bg-zinc-200 border-b border-black-500 dark:text-zinc-600">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Logo
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                City
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {companies && companies?.length === 0 ? (
              <h2 className="mt-2 text-md">No companies found.</h2>
            ) : (
              companies &&
              companies?.map((company: Company) => {
                return (
                  <>
                    <tr className="bg-zinc-100 border-b border-black-400 hover:bg-zinc-200">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-black whitespace-nowrap dark:text-black"
                      >
                        {company?.name}
                      </th>
                      <td className="py-4 px-6">
                        <img
                          src={`${BASE_API_URL}/${company?.logo}`}
                          alt={company.name}
                          width="50"
                        />
                      </td>
                      <td className="py-4 px-6">
                        {company.phone ? company.phone : "-"}
                      </td>
                      <td className="py-4 px-6">
                        {company.city ? company.city : "-"}
                      </td>
                      <td className="py-4 px-6">
                        <Link href={`/edit/${company?._id}`} passHref>
                          <a className="font-medium text-black hover:underline m-1 text-blue-400">
                            Edit
                          </a>
                        </Link>

                        <button
                          type="button"
                          className="font-medium text-black hover:underline m-2 text-red-600"
                          onClick={() => deleteCompany(company._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(CompaniesList), { ssr: false });
