import axios from "axios";
import FormData from "form-data";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "../Perks";

export default function PlacesFormPage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [extraInfo, setExtraInfo] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setExtraInfo(data.extraInfo);
      setPerks(data.perks);
      setAddedPhotos(data.photos);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }
  function handleAddedPhotosChange(newPhotos) {
    setAddedPhotos(newPhotos);
  }

  function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        //setAddedPhotos((prev) => {
        //console.log(setAddedPhotos);
        //return [...prev, ...filenames];
        // });
        handleAddedPhotosChange([...addedPhotos, ...filenames]);
      });
  }

  async function savePlace(e) {
    e.preventDefault();
    if (id) {
      await axios.put("/places", {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      setRedirect(true);
    } else {
      await axios.post("/places", {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={"/account/places"}></Navigate>;
  }

  function removePhoto(e, filename) {
    e.preventDefault();
    handleAddedPhotosChange(addedPhotos.filter((photo) => photo !== filename));
  }

  function selectAsMainPhoto(e, filename) {
    e.preventDefault();
    const addedPhotosWithoutSelected = addedPhotos.filter(
      (photo) => photo !== filename
    );
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    handleAddedPhotosChange(newAddedPhotos);
  }

  return (
    <div>
      <form onSubmit={savePlace}>
        <h2 className="text-2xl mt-4">Title</h2>
        <input
          type="text"
          placeholder="title-short and catchy"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <h2 className="text-2xl mt-4">Address</h2>
        <input
          type="text"
          placeholder="address to this place"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <h2 className="text-2xl mt-4">Photos</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={"Add using a link ....jpg"}
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          ></input>
          <button
            onClick={addPhotoByLink}
            className="bg-gray-200 px-4 rounded-full text-align-center"
          >
            Add&nbsp;photo
          </button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="h-32 flex relative" key={link}>
                <img
                  className="rounded-2xl w-full object-cover"
                  src={"http://localhost:5007/uploads/" + link}
                ></img>
                <button
                  onClick={(e) => removePhoto(e, link)}
                  className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl px-3 py-2"
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => selectAsMainPhoto(e, link)}
                  className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl px-3 py-2"
                >
                  {link === addedPhotos[0] && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {link !== addedPhotos[0] && (
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
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          <label className="h-32 cursor-pointer border bg-transparent flex items-center gap-1 justify-center rounded-2xl p-2 text-2xl text-gray-500">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            ></input>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            Upload
          </label>
        </div>
        <h2 className="text-2xl mt-4">Description</h2>
        <textarea
          className="w-full border my-1 py-2 px-3 rounded-2xl"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <h2 className="text-2xl mt-4">Perks</h2>
        <p className="text-gray-500 text-sm">Select all perks that apply</p>
        <div className="grid gap-2 grid-cols-2 mt-2 md:grid-cols-4 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks}></Perks>
        </div>
        <h2 className="text-2xl mt-4">Extra Info </h2>
        <p className="text-gray-500 text-sm">House rules,etc</p>
        <textarea
          className="w-full border my-1 py-2 px-3 rounded-2xl mt-2"
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        ></textarea>
        <h2 className="text-2xl mt-4">Check in & out times </h2>
        <p className="text-gray-500 text-sm mb-2">
          Remember to have some time window for cleaning the room between guests
        </p>
        <div className="grid  grid-cols-2 md:grid-cols-4 gap-2">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            ></input>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              placeholder="12:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            ></input>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max guests</h3>
            <input
              type="number"
              placeholder="4"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            ></input>
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              placeholder="4"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
        </div>
        <button className="bg-pink-500 p-2 w-full text-white rounded-2xl my-2">
          Save
        </button>
      </form>
    </div>
  );
}
