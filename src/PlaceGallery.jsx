import React, { useState } from "react";

const PlaceGallery = ({ place }) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="p-8 grid gap-4 bg-black">
          <div>
            <h2 className="text-3xl mr-48 ">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 text-black rounded-2xl shadow shadow-gray-500"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div className="flex justify-center items-center">
                <img
                  src={"http://localhost:5007/uploads/" + photo}
                  alt=""
                ></img>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden ">
        <div className="w-full h-full">
          {place.photos?.[0] && (
            <div className="w-full h-full">
              <img
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-full object-cover cursor-pointer aspect-square"
                src={"http://localhost:5007/uploads/" + place.photos[0]}
              ></img>
            </div>
          )}
        </div>
        <div className="grid grid-rows-2 gap-2">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="w-full h-full object-cover cursor-pointer aspect-square"
              src={"http://localhost:5007/uploads/" + place.photos[1]}
            ></img>
          )}
          <div className="w-full h-full overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-full object-cover relative top-2 cursor-pointer aspect-square"
                src={"http://localhost:5007/uploads/" + place.photos[2]}
              ></img>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
            clipRule="evenodd"
          />
        </svg>
        Show more images
      </button>
    </div>
  );
};

export default PlaceGallery;
