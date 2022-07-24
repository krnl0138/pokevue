export type TRegisterFormData = {
  email: string;
  password: string;
  username: string;
};

type TInitialState = {
  error: string;
  isRegistered: boolean;
  isLoading: boolean;
  data: TRegisterFormData;
};

export const initialStateRegister: TInitialState = {
  error: "",
  isRegistered: false,
  isLoading: false,
  data: {
    email: "",
    password: "",
    username: "",
  },
};

type TRegisterReducer = {
  type: "register" | "success" | "failed" | "field";
  field?: keyof TRegisterFormData;
  value?: string;
};

export const registerReducer = (
  state: TInitialState,
  action: TRegisterReducer
) => {
  switch (action.type) {
    case "register": {
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
        isRegistered: true,
        data: { ...initialStateRegister.data },
      };
    }
    case "failed": {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: "Incorrect username or password",
        data: { ...initialStateRegister.data },
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
