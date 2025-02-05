import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
//import PlacesFormPage from "./PlacesFormPage";
import axios from "axios";
import { useState } from "react";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav></AccountNav>

      <div className="text-center">
        <Link
          to="/account/places/new"
          className="bg-pink-500 gap-1 text-white rounded-full inline-flex py-2 px-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Places
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="flex items-center cursor-pointer gap-4 bg-gray-200 p-4 rounded-2xl"
            >
              <div className="flex items-center justify-center w-32 h-32 bg-gray-100 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover w-full h-full"
                    src={"http://localhost:5007/uploads/" + place.photos[0]}
                    alt=""
                  ></img>
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 ">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
