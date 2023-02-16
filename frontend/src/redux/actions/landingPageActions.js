import { LANDING_PAGE_FALSE, LANDING_PAGE_TRUE } from "../constants/landingPageConstants"

export const landingPage = () => (dispatch, getState) => {
    dispatch({
        type: LANDING_PAGE_FALSE,
        payload: false,
    })
    localStorage.setItem("isLandingPage",JSON.stringify(false))
}

export const landingPageTrue = () => dispatch => {
    dispatch({
        type: LANDING_PAGE_TRUE,
        payload: true,
    })
    localStorage.setItem("isLandingPage",JSON.stringify(true))
}