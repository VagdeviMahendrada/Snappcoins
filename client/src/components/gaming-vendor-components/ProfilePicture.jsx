// import React, { useState, useEffect } from "react";

// const ProfilePictureUpload = (props) => {
//   const [vendorId, setVendorId] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [profilePictureUrl, setProfilePictureUrl] = useState("");

//   useEffect(() => {
//     setVendorId(props.vendorId);
//   }, [props.vendorId]);

//   useEffect(() => {
//     const fetchProfilePictureUrl = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:3001/gaming-vendor/get-profile-picture?vendor_id=${vendorId}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setProfilePictureUrl(data.profilePictureUrl);
//         } else {
//           console.error("Failed to fetch profile picture URL.");
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile picture URL.", error);
//       }
//     };

//     if (vendorId) {
//       fetchProfilePictureUrl();
//     }
//   }, [vendorId]);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("profilePicture", selectedFile);
//     formData.append("vendor_id", props.vendorId);

//     try {
//       const response = await fetch(
//         "http://localhost:3001/gaming-vendor/change-profile-picture",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         console.log("Profile picture uploaded successfully.");
//         // Update the profile picture URL after successful upload
//         const fetchUrl = async () => {
//           try {
//             const response = await fetch(
//               `http://localhost:3001/gaming-vendor/get-profile-picture?vendor_id=${vendorId}`
//             );
//             const data = await response.json();
//             if (response.ok) {
//               setProfilePictureUrl(data.profilePictureUrl);
//             } else {
//               console.error("Failed to fetch profile picture URL.");
//             }
//           } catch (error) {
//             console.error("Failed to fetch profile picture URL.", error);
//           }
//         };

//         fetchUrl();
//       } else {
//         console.error("Failed to upload profile picture.");
//       }
//     } catch (error) {
//       console.error("Failed to upload profile picture.", error);
//     }
//   };

//   return (
//     <>
//       <div className="author">
//         <div className="author_thumb veryfied">
//           <i className="bi bi-check" />
//           <figure>
//             {profilePictureUrl && (
//               <img
//                 src={`http://localhost:3001/${profilePictureUrl}`}
//                 alt="Profile Picture"
//                 className="lazy"
//               />
//             )}
//           </figure>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <button type="submit">Upload</button>
//       </form>
//     </>
//   );
// };

// export default ProfilePictureUpload;

import React, { useState, useEffect } from "react";

const ProfilePicture = ({ vendorId }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  useEffect(() => {
    const fetchProfilePictureUrl = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_GAMING_VENDOR_API}/gaming-vendor/get-profile-picture?vendor_id=${vendorId}`
        );
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setProfilePictureUrl(data.profilePictureUrl);
        } else {
          console.error("Failed to fetch profile picture URL.");
        }
      } catch (error) {
        console.error("Failed to fetch profile picture URL.", error);
      }
    };

    if (vendorId) {
      fetchProfilePictureUrl();
    }
  }, [vendorId]);

  return (
    <>
      {profilePictureUrl && (
        <img
          src={`http://localhost:3001/${profilePictureUrl}`}
          alt="Profile Picture"
          className="lazy"
          id="photo"
        />
      )}
    </>
  );
};

export default ProfilePicture;
