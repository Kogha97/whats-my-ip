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
        console.log(data);
      })
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  return (
    <div>
      <br />
      {userDate.location ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px",
          }}
        >
          <MapLeaflet
            position={[userDate.location.lat, userDate.location.lng]}
          />
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <UserFlag code={userDate.location.country} />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Your IP address is: {userDate.ip}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Date: {formattedDate}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Time: {formattedTime} {BeforeAfterMiday}{" "}
              </p>{" "}
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Time zone: {userDate.location.timezone} GMT
              </p>
              <UserCountryCapital code={userDate.ip} />
              {/* <UserCountryCapital code={userDate.location.country} /> */}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
