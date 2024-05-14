import { client } from "client";
import LoadingScreen from "components/LoadingScreen";
import jwtDecode from "jwt-decode";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import axios from "utils/axios";


export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthUser = null | Record<string, any>;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

enum Types {
  Init = "INIT",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Register = "REGISTER",
}

type JWTAuthPayload = {
  [Types.Init]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Login]: { user: AuthUser };
  [Types.Register]: { user: AuthUser };
};

type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const isValidToken = (accessToken: string) => {
  if (!accessToken) return false;

  const decodedToken = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken: string | null, user:any | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("loggedInUserId", user);
    

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case "INIT": {
      return {
        isInitialized: true,
        user: action.payload.user,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
    case "REGISTER": {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    }

    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: "JWT",
  login: (email: string, password: string) => Promise.resolve(),
  logout: () => {},
  register: (name:string, email: string, password: string) =>
    Promise.resolve(),
});

// props type
type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: string, password: string) => {
    const response = await client.post("users/login", {
      email,
      password,
    }); 
    //@ts-ignore
    const { token, user } = response;

    setSession(token, user._id);
    dispatch({
      type: Types.Login,
      payload: {
        user,
      },
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    
    const response = await client.post(
     "http://localhost:5000/api/users/signup",
      {
        name,
        email,
        password,
      }
    );
    console.log("response-->", response);
    
      // @ts-ignore
      const { token, user } = response;
    setSession(token, user._id);

    dispatch({
      type: Types.Register,
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null, null);
    dispatch({ type: Types.Logout });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        const loggedInUserId = window.localStorage.getItem("loggedInUserId");

        if (accessToken && isValidToken(accessToken)) {
          
          setSession(accessToken, loggedInUserId);

          const response = await client.get("users/profile");
          //@ts-ignore
          const { user } = response;

          dispatch({
            type: Types.Init,
            payload: {
              user,
              isAuthenticated: true,
            },
          });
        } else {
          dispatch({
            type: Types.Init,
            payload: {
              user: null,
              isAuthenticated: false,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Init,
          payload: {
            user: null,
            isAuthenticated: false,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialized) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
