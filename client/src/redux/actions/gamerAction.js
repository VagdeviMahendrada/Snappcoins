import { LOGOUT,UPDATE_GAMER,GAMER_PROFILE } from "./gamerTypes";

export const updateGamer =(gamer) => async(dispatch) =>{
    try{
        dispatch({
            type: UPDATE_GAMER,
            payload :{ gamer }
        })
    }
    catch(err){
        console.log(err)
    }
}

export const gamerProfile = (gamer) => async(dispatch) =>{
    try{
        dispatch({
            type: GAMER_PROFILE,
            payload : {gamer}
        })
    }
    catch(err){
        console.log(err)
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
    document.location.href = '/';
  }