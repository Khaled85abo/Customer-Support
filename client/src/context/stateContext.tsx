import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useReducer,
} from "react";
import * as axios from "../axios";
import { saveToken } from "../axios";
type StateContextType = {
  authorized: boolean;
  login: (isClient: boolean, email: string, password: string) => void;
  loginState: LoginState;
  logout: () => void;
  setUiError: (error: string) => void;
  resetUiError: () => void;
};
interface LoginState {
  isLoading: boolean;
  error: string;
  role: string | null;
  isLoggedIn: boolean;
}
const StateContext = createContext<StateContextType | null>(null);

export function useStateContext() {
  const stateContext = useContext(StateContext);
  if (!stateContext) {
    throw Error(
      "Error: check if your element is wrapped by StateContextProvider"
    );
  }
  return stateContext;
}

const initialState: LoginState = {
  isLoading: false,
  error: "",
  role: null,
  isLoggedIn: false,
};

const PAYLOADACTIONS = {
  error: "error",
  success: "success",
} as const;
const SOLOACTIONS = {
  login: "login",
  logOut: "logOut",
  resetError: "resetError",
} as const;
type PayloadActionsType = typeof PAYLOADACTIONS[keyof typeof PAYLOADACTIONS];
type soloActionsType = typeof SOLOACTIONS[keyof typeof SOLOACTIONS];

type LoginAction =
  | { type: soloActionsType }
  | { type: PayloadActionsType; payload: string };

function loginReducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case SOLOACTIONS.login: {
      return {
        ...state,
        error: "",
        isLoading: true,
      };
    }
    case PAYLOADACTIONS.success: {
      return {
        ...state,
        role: action.payload,
        isLoggedIn: true,
        isLoading: false,
      };
    }
    case PAYLOADACTIONS.error: {
      return {
        ...state,
        error: action.payload,
        isLoggedIn: false,
        isLoading: false,
      };
    }
    case SOLOACTIONS.logOut: {
      return {
        ...state,
        role: null,
        isLoggedIn: false,
      };
    }
    case SOLOACTIONS.resetError: {
      return {
        ...state,
        error: "",
      };
    }
    default:
      return state;
  }
}

export default function StateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  const [stateLogin, setStateLogin] = useState<{
    error: string;
    role: string | null;
    loggedin: boolean;
    loading: boolean;
  }>({ error: "", role: null, loggedin: false, loading: false });
  const login = async (isClient: boolean, email: string, password: string) => {
    dispatch({ type: SOLOACTIONS.login });
    setStateLogin((prev) => ({ ...prev, loading: true }));
    try {
      let res: { data: { token: string; role: string } };
      if (isClient) {
        res = await axios.loginClient({ email, password });
      } else {
        res = await axios.loginEmployee({ email, password });
      }

      saveToken(res.data.token);
      dispatch({ type: PAYLOADACTIONS.success, payload: res.data.role });
      setStateLogin((prev) => ({ ...prev, role: res.data.role }));
    } catch (error: any) {
      setStateLogin((prev) => ({
        ...prev,
        error: error.response.data.error,
        loading: false,
      }));
      dispatch({
        type: PAYLOADACTIONS.error,
        payload: error.response.data.error,
      });
    }
  };

  const setUiError = (error: string) => {
    dispatch({ type: PAYLOADACTIONS.error, payload: error });
  };
  const resetUiError = () => {
    dispatch({ type: SOLOACTIONS.resetError });
  };

  const logout = () => {
    dispatch({ type: SOLOACTIONS.logOut });
    axios.removeToken();
  };
  const values = {
    authorized,
    login,
    loginState,
    logout,
    setUiError,
    resetUiError,
  };

  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
}
