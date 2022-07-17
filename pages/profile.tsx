import React from "react";
import { Layout } from "../components/utils/layout/Layout";
import { ProfileForm } from "../components/forms/profileForm/ProfileForm";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";

export const Profile = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <ProfileForm />
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
