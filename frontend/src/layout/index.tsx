import { chakra, Container } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <chakra.div>
      <Navbar />

      <Container maxW="container.2xl" sx={{ margin: "1rem 0" }}>
        {children}
      </Container>
    </chakra.div>
  );
};

export default Layout;
