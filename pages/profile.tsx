import React from "react";
import { Layout } from "../components/utils/layout/Layout";
import { ProfileForm } from "../components/forms/profileForm/ProfileForm";

export const Profile = () => {
  return (
    <Layout>
      <ProfileForm />
    </Layout>
  );
};

export default Profile;
