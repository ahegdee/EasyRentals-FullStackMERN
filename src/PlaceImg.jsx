import React from "react";
const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return "";
  }

  if (!className) {
    className = "object-cover";
  }

  return (
    <img
      className={className}
      src={"http://localhost:5007/uploads/" + place.photos[index]}
      alt=""
    ></img>
  );
};

export default PlaceImg;
