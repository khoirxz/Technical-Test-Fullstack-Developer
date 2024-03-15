import {
  chakra,
  useColorModeValue,
  Flex,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex
          as="header"
          alignItems="center"
          justifyContent="space-between"
          mx="auto"
        >
          <Flex>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              <Link to="/">Beli Mobil</Link>
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              zIndex={9}
              display={{
                md: "inline-flex",
              }}
            >
              <Button variant="ghost" as={Link} to="/add">
                Tambah
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};

export default Navbar;
