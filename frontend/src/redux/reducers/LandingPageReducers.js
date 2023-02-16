import { LANDING_PAGE_FALSE, LANDING_PAGE_TRUE } from "../constants/landingPageConstants";

export const landingPageReducer = (state={},action) => {
    switch(action.type){
        case LANDING_PAGE_FALSE:
            return action.payload
        case LANDING_PAGE_TRUE:
            return action.payload
        default:
            return state
    }
}