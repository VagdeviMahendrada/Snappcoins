import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch-gamer";
import ProfilePicture from "./ProfilePicture";
//import ProfilePictureUpload from "./ProfilePictureUpload";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../redux/actions/merchantAction";
import { merchantProfile } from "../../redux/actions/merchantAction";
import PreLoader from "./utils/PreLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const ProfileNav = (props) => {
  const merchandise = useSelector(state => state.merchantReducer)
  const profile = merchandise.merchant
  const [fetchData, { loading }] = useFetch();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout())
  };

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  /*useEffect(() => {
    const profile_img=profile.image?
    `http://localhost:3003/api/profile/img/${profile.image}`:
    "assets/img/avatar-gamer.jpeg"
    setImageSrc(profile_img)
    
  }, [profile.image]);*/


  

  return (
    <div className="col-lg-3">
      <div className="main_profile edit_section">
      <div className="author">
  <div className="author_thumb veryfied">
    <i className="bi bi-check" />
    <figure>
    {props.page === "dashboard" ? ( 
              <ProfilePicture id={props._id} />
             ) : (
              <ProfilePicture id={props._id} />
            )}
          
    </figure>
  </div>
</div>     
        <h1 id="vendor_name">
          {props.name} <br />
          <br />
          <span
            className="bg-violet"
            style={{
              padding: "10px 15px",
              fontSize: "17px",
              borderRadius: "2px",
            }}
          >
            {props.snappcoins}
            <> Snapps</>
          </span>
        </h1>
        <ul>
          <li>
            <Link
              to="/merchant-dashboard"
              className={props.page === "dashboard" ? "active" : ""}
            >
              <i className="bi bi-file-earmark-arrow-up" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/merchant-profile"
              id="account-settings"
              className={props.page === "settings" ? "active" : ""}
            >
              <i className="bi bi-gear" />
              Account settings
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogOut}>
              <i className="bi bi-box-arrow-right" />
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNav;


