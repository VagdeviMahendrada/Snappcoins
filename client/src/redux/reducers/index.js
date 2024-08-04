import { combineReducers } from "redux";
import merchantReducer from "./merchantReducer";
import gamerReducer from "./gamerReducer";

const rootReducer = combineReducers({
    merchantReducer,gamerReducer,
});

export default rootReducer;