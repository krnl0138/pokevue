export type TLoginFormData = {
  email: string;
  password: string;
};

type TInitialState = {
  error: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  data: TLoginFormData;
};

type TLoginAction = {
  type: "field" | "login" | "success" | "failed";
  field?: keyof TLoginFormData;
  value?: string;
};

export const initialStateLogin: TInitialState = {
  error: "",
  isLoggedIn: false,
  isLoading: false,
  data: {
    email: "",
    password: "",
  },
};

export const loginReducer = (state: TInitialState, action: TLoginAction) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    }
    case "success": {
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        data: { ...initialStateLogin.data },
      };
    }
    case "failed": {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: "Incorrect username or password",
        data: { ...initialStateLogin.data },
      };
    }
    case "field": {
      if (!action.field) return state;
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };
    }
    default:
      return state;
  }
};
