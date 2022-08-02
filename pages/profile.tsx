import { ProfileSection } from "../components/profileSection/profileSection";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { Layout } from "../components/utils/layout/Layout";

export const Profile = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <ProfileSection />
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
