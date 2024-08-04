import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch-gamer";
import { gamerProfile } from "../../redux/actions/gamerAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import PreLoader from "./utils/PreLoader";
//const URL=process.env.REACT_APP_GAMER_API;

const EditProfile = () => {
  const gaming = useSelector((state) => state.gamerReducer);
  const profile = gaming.gamer;

  const [fetchData, { loading }] = useFetch();
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setImageSrc(
      profile.image
        // ? `${process.env.REACT_APP_GAMER_MODULE_URL}/api/profile/img/${profile.image}`
        // : "assets/img/avatar-gamer.jpg"
        ? `http://localhost:3004/api/profile/img/${profile.image}`
        : "assets/img/avatar-gamer.jpg"
    );
  }, [profile.image]);

  const initialFormData = {
    userName: profile ? profile.userName : "",
    email: profile ? profile.email : "",
    image: profile ? profile.image : "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = async (e) => {
    if (e.target.name === "image") {
      if (e.target.files.length > 0) {
        setFormData({
          ...formData,
          [e.target.name]: e.target.files[0],
        });
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (profile) {
      setFormData({
        userName: profile.userName,
        email: profile.email,
        image: profile.image,
      });
    }
  }, [profile, setFormData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const updatedFormData = new FormData();

    updatedFormData.append("userName", formData.userName);
    updatedFormData.append("email", formData.email);

    if (formData.image instanceof File) {
      updatedFormData.append("image", formData.image, formData.image.name);
    }

    const params = {
      id: profile ? profile._id : "",
      prevImgId: profile ? profile.image : "",
    };
console.log(updatedFormData)
    const config = {
      url: "/profile/update",
      method: "put",
      data: updatedFormData,
      headers: { Authorization: token },
      params: params,
    };

    try {
      const data = await fetchData(config);
      console.log("Response from API:", data);
      dispatch(gamerProfile(data.user));
    } catch (error) {
      console.error("Error fetching Gamer data:", error);
    }
  };

  return (
    <div className="edit-profile">
      {loading ? (
        <PreLoader />
      ) : (
        <div
          className="col-6 shadow p-3 mb-5 bg-black rounded"
          style={{
            width: "45rem",
            marginLeft: "19rem",
            marginTop: "2rem",
            padding: "2rem",
          }}
        >
          <h5
            className="card-title"
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "white",
            }}
          >
            Gamer Profile
          </h5>

          {/* Profile picture card */}
          <div
            className="card-body text-center"
            style={{
              textAlign: "center",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "1rem",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!imageLoaded && <div className="loading-spinner"></div>}
            <img
              className={`img-account rounded-circle mb-4 ${
                imageLoaded ? "" : "hidden"
              }`}
              src={imageSrc}
              alt=""
              height="120rem"
              width="120rem"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
              style={{ objectFit: "cover" }}
            />
            <label
              htmlFor="inputGroupFile01"
              className="camera-icon"
              style={{
                position: "absolute",
                bottom: "18%",
                right: "42%",
                cursor: "pointer",
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "6px",
                width: "27px",
                height: "27px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={faCamera} style={{ color: "#ff0071" }} />
            </label>
            <input
              type="file"
              className="form-control hidden-input"
              name="image"
              id="inputGroupFile01"
              accept=".jpeg, .png, .jpg"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>

          <div
            className="form-group text-center"
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <label
              htmlFor="name"
              style={{ color: "gray", marginRight: "0.5rem", width: "100px" }}
            >
              User Name
            </label>
            <div className="d-inline-block">
              <input
                type="text"
                style={{ borderColor: "lightgray", width: "450px" }}
                name="userName"
                id="fname"
                className="form-control"
                value={formData.userName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div
            className="form-group text-center"
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <label
              htmlFor="password"
              style={{ color: "gray", marginRight: "0.5rem", width: "100px" }}
            >
              Password
            </label>
            <div className="d-inline-block">
              <input
                type="text"
                style={{ borderColor: "lightgray", width: "450px" }}
                name="password"
                id="fname"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div
            className="form-group text-center"
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
            }}
          >
            <label
              htmlFor="email"
              style={{ color: "gray", marginRight: "0.5rem", width: "100px" }}
            >
              Email
            </label>
            <div className="d-inline-block">
              <input
                type="text"
                style={{ borderColor: "lightgray", width: "450px" }}
                name="email"
                id="fname"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
