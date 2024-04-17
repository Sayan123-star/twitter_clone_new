import { ALL_USER_FAIL, ALL_USER_REQUEST, ALL_USER_SUCCESS, CLEAR_ERRORS, FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_RESET, FOLLOW_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UNFOLLOW_USER_FAIL, UNFOLLOW_USER_REQUEST, UNFOLLOW_USER_RESET, UNFOLLOW_USER_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../consants/user.consants";
// ,otherUsers:{}


export const UserRedeucer = ((state={user:{}},action)=>{
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return{
                loading: true,
                islogged:false
            }
        case REGISTER_SUCCESS:
            return{
                loading: false,
                user: action.payload.registerUser,
                success:action.payload.success
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return{
                loading: false,
                islogged:true,
                user: action.payload.user,
                success:action.payload.success
            }
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return{
                ...state,
                loading: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return{
                loading: false,
                islogged:false,
                user:null,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                loading:false,
                islogged:false,
                user:null
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
})


export const otherUsersReducer=((state = {othUser:[]},action)=>{
    switch (action.type) {

        case ALL_USER_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case ALL_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                othUser: action.payload
            }
        case ALL_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
})

// This reducer shows the admin the selected user details
export const oneUserReducer=((state = {userdetail:{}},action)=>{
    switch (action.type) {

        case USER_DETAILS_REQUEST:
        case FOLLOW_USER_REQUEST:
        case UNFOLLOW_USER_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case USER_DETAILS_SUCCESS: 
            return{
                ...state,
                loading: false,
                userdetail: action.payload
            }
        case FOLLOW_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isFollow:action.payload
            }
        case UNFOLLOW_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isUnfollow:action.payload
            }
        case USER_DETAILS_FAIL:
        case FOLLOW_USER_FAIL:
        case UNFOLLOW_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case FOLLOW_USER_RESET:
            return{
            ...state,
            isFollow:false
        }
        case UNFOLLOW_USER_RESET:
            return{
            ...state,
            isUnfollow:false
        }
        case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
})

export const profileReducer=((state = {},action)=>{
    switch (action.type) {

        case UPDATE_USER_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case UPDATE_USER_SUCCESS:
            return{
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case UPDATE_USER_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_USER_RESET:
            return{
                ...state,
                isUpdated:false,
            }
        case CLEAR_ERRORS:
                return{
                    ...state,
                    error: null
                }
        default:
            return state;
    }
})