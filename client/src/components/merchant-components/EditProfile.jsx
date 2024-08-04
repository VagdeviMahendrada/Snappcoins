import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../hooks/useFetch-merchant'
import { merchantProfile, updateMerchandise } from '../../redux/actions/merchantAction'
import PreLoader from './utils/PreLoader'
import Loader from './utils/Loader'
import FullpageLoader from '../general-components/FullpageLoader'

const EditProfile = () => {
    const merchandise = useSelector(state => state.merchantReducer)
    const profile = merchandise.merchant

    const [fetchData ,{loading}] = useFetch();
    const dispatch = useDispatch()

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [editEmail,setEditEmail] = useState("")

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };
  const handlePasswordUpdate = async () => {
    // const formData = { vendorId, password, password_confirmation };
     try {
       await fetch(`http://localhost:3003/api/profile/change-password`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({email:profile.email,new_password:password,new_password_confirmation:password_confirmation }),
       })
         .then(async function (response) {
           console.log(response)
           if (response.ok) {
             return response.json();
           } else {
             const data = await response.json();
             throw new Error(JSON.stringify(data.errors));
           }
         })
         .then(function (data) {
           toastFunction(data.message);
         })
         .catch(function (error) {
           console.log(error);
 
           const errorMessages = JSON.parse(error.message);
 
           const errorDivs = document.getElementsByClassName("error-message");
           for (var i = 0; i < errorDivs.length; i++) {
             errorDivs[i].textContent = "";
           }
 
           errorMessages.forEach(function (errorMessage, index) {
             if (errorDivs[index]) {
               toastFunction(errorMessage);
             }
           });
         });
     } catch (error) {
       console.error("Error:", error);
     }
   };
 
   function toastFunction(message) {
     const x = document.getElementById("toast");
     x.textContent = message;
     x.className = "show";
     setTimeout(function () {
       x.className = x.className.replace("show", "");
     }, 3000);
   }

   useEffect(() => {
    const profile_image=profile.image?
    `http://localhost:3003/api/profile/img/${profile.image}`:
    "assets/img/avatar-gamer.jpeg"
    setImageSrc(profile_image)
    
  }, [profile.image]);
  const initialFormData = {
    // firstName : profile.firstName,
    // lastName : profile.lastName,
    // dob : new Date(profile.dob).toISOString().substr(0, 10),
    // companyName: profile.companyName,
    // email: profile.email,
    // phoneNumber: profile.phoneNumber,
    // gender: profile.gender,
    // role: profile.role,
   // address: profile.address,
    //image:profile.image
};

const [formData, setFormData] = useState(initialFormData)

const handleChange = async(e) => {
    if (e.target.name === "image") {

        console.log(e.target.files[0])
        setFormData({
          ...formData,
          [e.target.name]: e.target.files[0],
        });
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
}

useEffect(()=>{
    setFormData({companyName: profile.companyName,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        address: profile.address,
        image:profile.image
    })
},[profile,setFormData])

const handleUpdate = async (e) =>{
    e.preventDefault();
    const token = localStorage.getItem('merchant-token');
    const formDataToSend = new FormData();
    console.log(formData.address)
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("address", formData.address);

    if(typeof(formData.image) !== 'string') formDataToSend.append("image", formData.image , formData.image.name);
    console.log(formDataToSend.email)
    const config = { url: `/profile/update`, method: "put", data: formDataToSend, headers: { Authorization: token }, params: { id: profile._id ,prevImgId: profile.image} };
    await fetchData(config).then((data) => {
        dispatch(merchantProfile(data.user))
    })
    .catch(error => {
            console.error('Error fetching merchant data:', error);
    });
}

return (
  <div className="col-8 p-3 mb-5">
  <center><h5 className="card-title my-2">Merchant Profile</h5></center>
 {loading? <FullpageLoader /> :<div className="row">
  <div className="col-xl-4 my-4">
          {/* <!-- Profile picture card--> */}
          <div className="card mb-1 mb-xl-0 bg-dark">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                  {/* <!-- Profile picture image--> */}
                  {!imageLoaded && <div className="loading-spinner"> <Loader /></div>}
                  <img 
                      className={`img-account py-3 rounded mb-4 ${imageLoaded ? "" : "hidden"}`}
                      src={imageSrc}
                      alt=""
                      height="154.375rem"
                      width="154.375rem"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(false)}
                  />
                  {/* <button class="btn btn-primary" type="button">Upload new image</button><label className="form-label fs-6 text-white" htmlFor="inputGroupFile01">Image</label> */}
                  <input type="file" className="form-control" name="image"  id="inputGroupFile01" accept='.jpeg, .png, .jpg' onChange={handleChange} />
              </div>
          </div>
      </div>
      <div className="col-xl-8">
              {/* <div className="form-group">
                  <label htmlFor="password">Change Password</label>
                  <input type="password" id="password" className="form-control" value="********"/>
                  <button>Change Password</button>
              </div> */}
              <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" className="form-control" name="email" value={formData.email}  onChange={handleChange}/>
              </div>
              <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" id="phone" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/>
              </div>
              <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <input type="text" id="company" className="form-control" name='companyName'  value={formData.companyName} onChange={handleChange}/>
              </div>
              <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" className="form-control" name="address" value={formData.address} onChange={handleChange}/>
              </div>
              <center><button type="button" className="content-h2 text-white btn_1" onClick={handleUpdate}>Save Changes</button></center>
          </div>
  </div>}
  </div>
)
}

export default EditProfile