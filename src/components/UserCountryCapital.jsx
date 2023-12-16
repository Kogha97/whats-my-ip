import { useState, useEffect } from "react";

export default function UserCountryCapital({ code }) {
  const [capitalInfo, setCapitalInfo] = useState("");

  const fetchCountryData = async (code) => {
    const url = `https://restcountries.com/v3.1/alpha/${code}?fields=capital`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCapitalInfo(data.capital);
    } catch (error) {
      console.error("Error fetching country captial data:", error);
    }
  };

  useEffect(() => {
    fetchCountryData(code);
  }, [code]);

  return (
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
      This country's capital city is {capitalInfo}!
    </p>
  );
}
