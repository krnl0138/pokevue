import { AboutSection } from "../components/aboutSection/AboutSection";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { Layout } from "../components/utils/layout/Layout";

export const About = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <AboutSection />
      </Layout>
    </ProtectedRoute>
  );
};

export default About;
