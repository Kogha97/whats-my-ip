import { useState, useEffect } from "react";
import MapLeaflet from "../components/MapLeaflet";
import UserCountryCapital from "../components/UserCountryCapital";
import UserFlag from "../components/UserFlag";

export default function HomePage() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiUrl = import.meta.env.VITE_API_URL;

  const [userDate, setUserDate] = useState({});

  //time
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  //date
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  //hours and minutes adjusted

  const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  const formattedDay = currentDay < 10 ? `0${currentDay}` : currentDay;
  const formattedHours = currentHours < 10 ? `0${currentHours}` : currentHours;
  const formattedMinutes =
    currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;

  //date and time variables in string
  const formattedDate = ` ${formattedDay}/${formattedMonth}/${currentYear}`;
  const formattedTime = ` ${formattedHours}:${formattedMinutes}`;

  // conditional for AM and PM
  let BeforeAfterMiday;
  if (formattedHours >= 12) {
    BeforeAfterMiday = "PM";
  } else {
    BeforeAfterMiday = "AM";
  }

  useEffect(() => {
    fetch(`${apiUrl}apiKey=${apiKey}`) // will need to change the api key whenever we run out of server calls.
      .then((response) => response.json())
      .then((data) => {
        setUserDate(data);
        console.log(data)
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h3>User Date: {formattedDate}</h3>
      <br />
      {userDate.location ? (
        <>
          <h3>Your IP address is: {userDate.ip}</h3>
          <h3>
            User Time: {formattedTime} {BeforeAfterMiday}{" "}
            {userDate.location.timezone} GMT
          </h3>
          <MapLeaflet
            position={[userDate.location.lat, userDate.location.lng]}
          />
          <UserCountryCapital code={userDate.location.country} />
          <UserFlag code={userDate.location.country} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

