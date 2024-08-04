import React, { useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { MdCameraAlt } from "react-icons/md";

const ProfilePictureUpload = ({ vendorId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    handleSubmit(file);
  };

  const handleSubmit = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);
    formData.append("vendor_id", vendorId);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_GAMING_VENDOR_API}/gaming-vendor/change-profile-picture`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Profile picture uploaded successfully.");
        window.location.reload();
      } else {
        console.error("Failed to upload profile picture.");
      }
    } catch (error) {
      console.error("Failed to upload profile picture.", error);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="file_upload"
      style={{ height: "100%" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          position: "relative",
          opacity: isHovered ? 0.6 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        <ProfilePicture vendorId={vendorId} />
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
            }}
          >
            <MdCameraAlt size={45} />
          </div>
        )}
      </div>
      <input type="file" name="image" onChange={handleFileChange} />
    </div>
  );
};

export default ProfilePictureUpload;
