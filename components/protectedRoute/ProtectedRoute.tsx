import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { app, getUser } from "../../database";
import { PROJECT_URLS as urls } from "../../utils/constants";
import { useRouter } from "next/router";
import { setUser } from "../../lib/redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { Box, CircularProgress, Container, Typography } from "@mui/material";

type TProtectedRoute = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: TProtectedRoute): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [uid, setUid] = useState<undefined | string>();

  useEffect(() => {
    const auth = getAuth(app);
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
      } else {
        router.push(urls.login);
      }
    });
    // TODO unsubscribe ?
  }, [uid, dispatch, router, user.username]);

  useEffect(() => {
    const populateUser = async (uid: string) => {
      const data = await getUser(uid);
      dispatch(setUser(data));
    };

    if (uid && !user.username) {
      populateUser(uid);
    }
  }, [dispatch, uid, user.username]);

  if (!user.username) {
    return (
      <Box maxWidth={"xl"} sx={{ backgroundColor: "primary.dark" }}>
        <Container>
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Container>
      </Box>
    );
  }

  return children;
};
