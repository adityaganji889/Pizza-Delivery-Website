import { USER_REGISTER_FAILED, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAILED, GET_USER_INFO, REMOVE_USER_INFO, REMOVE_LOGIN_INFO, REMOVE_REGISTER_INFO, GET_ALLUSERS_FAILED, REMOVE_ALLUSERS_INFO, GET_ALLUSERS_SUCCESS, GET_ALLUSERS_REQUEST } from "../constants/userConstants"

export const registerUserReducer = (state={}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
               loading: true 
            }
        case USER_REGISTER_SUCCESS:
            let user = action.payload
            return {
                loading: false,
                success: user.success,
                message: user.message
            }
        case USER_REGISTER_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case REMOVE_REGISTER_INFO:
            return {}
        default:
            return state
    }
}

export const loginUserReducer = (state={}, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {
               loading: true 
            }
        case USER_LOGIN_SUCCESS:
            let user = action.payload
            return {
                loading: false,
                message: user.message,
                success: user.success,
                token: user.data? user.data : ""
            }
        case USER_LOGIN_FAILED:
            return {
                loading: false,
                error: action.payload
            }
        case REMOVE_LOGIN_INFO:
            return {}
        default:
            return state
    }
}

export const getUserInfoReducer = (state={user:{}},action)=>{
    switch(action.type){
        case GET_USER_INFO:
            return {
               user:action.payload
            }
        case REMOVE_USER_INFO:
            return ""
        default:
            return state
    }
}

export const getAllUsersReducer=(state={users:[]},action) => {
    switch(action.type){
      case GET_ALLUSERS_REQUEST:
        return {
            loading: true,
            ...state
        }
      case GET_ALLUSERS_SUCCESS:
        const data = action.payload
        return {
            loading: false,
            message: data.message,
            success: data.success,
            users: data.data
        }
      case GET_ALLUSERS_FAILED:
        return {
            loading: false,
            error: action.payload
        }
      case REMOVE_ALLUSERS_INFO:
        return {
          users: []
        }
      default:
        return state
    }
}