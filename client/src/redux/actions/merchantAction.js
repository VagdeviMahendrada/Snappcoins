import { LOGOUT, MERCHANT_PROFILE, UPDATE_MERCHANDISE } from "./merchantTypes";

export const updateMerchandise =(merchandise) => async(dispatch) =>{
    try{
        dispatch({
            type: UPDATE_MERCHANDISE,
            payload :{ merchandise }
        })
    }
    catch(err){
        console.log(err)
    }
}

export const merchantProfile = (merchant) => async(dispatch) =>{
    try{
        dispatch({
            type: MERCHANT_PROFILE,
            payload : {merchant}
        })
    }
    catch(err){
        console.log(err)
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('merchant-token');
    dispatch({ type: LOGOUT });
    document.location.href = '/';
  }