export type TProfileFormData = {
  email: string;
  password: string;
  username: string;
  avatar: null | File;
};

type TInitialState = {
  error: string;
  isSubmitted: boolean;
  isLoading: boolean;
  data: TProfileFormData;
};

type TProfileAction = {
  type: "field" | "submit" | "success" | "failed" | "wrongAvatar";
  field?: keyof TProfileFormData;
  value?: string | File;
};

export const initialStateProfile: TInitialState = {
  error: "",
  isSubmitted: false,
  isLoading: false,
  data: {
    email: "",
    password: "",
    avatar: null,
    username: "",
  },
};

export const profileReducer = (
  state: TInitialState,
  action: TProfileAction
) => {
  switch (action.type) {
    case "submit": {
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
        isSubmitted: true,
        data: { ...initialStateProfile.data },
      };
    }
    case "failed": {
      return {
        ...state,
        isLoading: false,
        isFailed: true,
        error: typeof action.value === "string" ? action.value : "",
        data: { ...initialStateProfile.data },
      };
    }
    case "field": {
      if (!action.field) return state;
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };
    }
    case "wrongAvatar": {
      return {
        ...state,
        error:
          "Your file exceeds the limit of 2mb or it is not an image. Try another file.",
        data: { ...state.data, avatar: null },
      };
    }
    default:
      return state;
  }
};
