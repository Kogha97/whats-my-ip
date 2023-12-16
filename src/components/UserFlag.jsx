import { useState, useEffect } from "react";

export default function UserFlag({ code }) {
  const [flagPic, setFlagInfo] = useState("");
  const [flagAlt, setFlagAlt] = useState("");

  const fetchFlagData = async (code) => {
    const url = `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setFlagInfo(data.flags.svg);
      setFlagAlt(data.flags.alt);
      console.log(data);
    } catch (error) {
      console.error("Error fetching country flag data:", error);
    }
  };

  useEffect(() => {
    fetchFlagData(code);
  }, [code]);

  return (
        <img class="rounded-t-lg" src={flagPic} alt={flagAlt} />
      );
}
