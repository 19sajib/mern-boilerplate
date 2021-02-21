import { AUTH, LOGOUT } from '../constants/actionTypes'
import { setAuthentication } from '../auth/auth'

const authReducer = (state = { authData : null}, action) => {
      switch (action.type) {
          case AUTH:
              setAuthentication( action?.data.token, action?.data.result)
              //localStorage.setItem('profile', JSON.stringify({...action?.data}))
              return { ...state, authData: action?.data };
          case LOGOUT:
             // localStorage.clear()
              return { ...state, authData: null };
          default:
              return state;
      }
}

export default authReducer