import { LOGOUT, MERCHANT_PROFILE, UPDATE_MERCHANDISE } from "../actions/merchantTypes";

const initialState = {
    loading:false,
    merchandise :{},
    merchant:{},
    isLoggedIn: false,
}

const merchantReducer = (state=initialState,action) =>{
    switch(action.type){
        case UPDATE_MERCHANDISE:
            return {loading:true,merchandise:action.payload.merchandise,merchant:{}, isLoggedIn: true};
        case MERCHANT_PROFILE:
            return {loading:true,merchant:action.payload.merchant,merchandise:{}, isLoggedIn: true};
        case LOGOUT:
            return {loading:false,merchandise:{},merchant:{}, isLoggedIn: false}
        default :
        return state;
    }
}

export default merchantReducer;