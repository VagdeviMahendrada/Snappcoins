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
import {  useDispatch, useSelector } from 'react-redux'
import { merchantProfile } from "../../redux/actions/merchantAction";


const ProfilePicture = ({ _id }) => {
  let dispatch = useDispatch();
  const merchandise = useSelector(state => state.merchantReducer)
  const token = localStorage.getItem("merchant-token")
    const profile = merchandise.merchant
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    console.log(profilePictureUrl)
    console.log("merchant Profile",profile)
    //console.log("merchant",profile.image)
  useEffect(() => {
    
    
    const fetchProfilePictureUrl = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/profile/img/${profile.image}`,{headers:{ Authorization: token }} );
        //console.log(JSON.stringify(response))
        if (response.ok) {
          const data = await response.json();
          debugger;
          console.log(data)
          profilePictureUrl= setProfilePictureUrl(data.image);
        } else {
          console.error("Failed to fetch profile picture URL.");
        }
      } catch (error) {
        console.error("Failed to fetch profile picture URL.", error);
      }
    };

    
      fetchProfilePictureUrl();
   
  }, [_id,profile]);

  return (
    <>
      {profilePictureUrl && (
        <img
          src={`http://localhost:3003/api/profile/img/${profilePictureUrl}`}
          alt="Profile Picture"
          className="lazy"
          id="photo"
        />
      )}
    </>
  );
};

export default ProfilePicture;
