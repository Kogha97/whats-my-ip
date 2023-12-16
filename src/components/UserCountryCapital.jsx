import { useState, useEffect } from "react";

export default function UserCountryCapital({ code }) {
  const [capitalInfo, setCapitalInfo] = useState("");

  const fetchCountryData = async (code) => {
    const apiKey = import.meta.env.VITE_CAPITAL_API_KEY;
    const url = `http://api.countrylayer.com/v2/alpha/${code}?access_key=${apiKey}`;

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

  return <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">This country's capital city is {capitalInfo}!</p>;
}
