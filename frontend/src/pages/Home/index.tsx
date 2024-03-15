import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Box,
  Image,
  Text,
  Button,
  Grid,
  Stack,
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  Container,
  Input,
} from "@chakra-ui/react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";

import Layout from "../../layout";
import { BASE_URL } from "../../api";

export type carsProps = cars[];

export interface cars {
  _id: string;
  title: string;
  description: string;
  price: number;
  merk: string;
  type: string;
  stock: number;
  createdAt: string;
  __v: number;
}

const Home: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [data, setData] = useState<carsProps>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let didCancel = false;
    // cancel token
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      setIsLoading(true);

      try {
        let response;
        if (keyword !== "") {
          // menggunakan cancel token
          response = await axios.post(
            `${BASE_URL}/merk`,
            {
              merk: keyword,
            },
            { cancelToken: source.token }
          );
        } else {
          // menggunakan cancel
          response = await axios.get(BASE_URL, { cancelToken: source.token });
        }

        if (!didCancel) {
          // Jika komponen belum unmount, update state
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!didCancel) {
          setIsLoading(false);
          console.log(error);
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
      // Membatalkan request ketika komponen unmount atau pengguna mulai mengetik karakter baru
      source.cancel("Component unmounted or keyword changed");
    };
  }, [keyword]);

  return (
    <Layout>
      <Box
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={6}
      >
        <Container>
          <Box
            border="gray.300"
            rounded="full"
            borderWidth="thin"
            borderStyle="solid"
            px={3}
            py={3}
            shadow="md"
            display="flex"
          >
            <Input
              ml={5}
              placeholder="Cari"
              variant="unstyled"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <IconButton
              aria-label="search"
              icon={<SlMagnifier />}
              colorScheme="teal"
              rounded="full"
            />
          </Box>
        </Container>
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner size="xl" />
        </Box>
      ) : data.length <= 0 ? (
        <h1>Buat itemmu</h1>
      ) : (
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 300px)",
            xl: "repeat(4, 300px)",
          }}
          justifyContent="center"
          gap={6}
        >
          {data.map((item) => (
            <Box
              sx={{
                display: { base: "flex", md: "flex", xl: "flex" },
                flexDir: "column",
                gap: "8px",
                position: "relative",
              }}
              key={item._id}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: 2,
                  top: 2,
                }}
              >
                <Stack direction="row" spacing={2}>
                  <IconButton
                    as={Link}
                    to={`/edit/${item._id}`}
                    aria-label="edit"
                    icon={<MdModeEdit />}
                  />
                  <ModalDelete id={item._id} setData={setData} />
                </Stack>
              </Box>
              <Image
                boxSize={{
                  base: "auto",
                  md: "300px",
                  xl: "300px",
                }}
                objectFit="cover"
                rounded="lg"
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDir: "column",
                }}
              >
                <Text fontWeight="bold" fontSize="md">
                  {item.title}
                </Text>
                <Text fontWeight="thin" fontSize="sm">
                  {item.merk} - {item.type}
                </Text>
                <Text fontWeight="thin" fontSize="sm">
                  {item.description}
                </Text>
                <Text fontWeight="thin" fontSize="sm">
                  {item.stock}
                </Text>
              </Box>
              <Box>
                <Text>{item.price}</Text>
              </Box>
            </Box>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

const ModalDelete: React.FC<{
  id: string;
  setData: React.Dispatch<React.SetStateAction<carsProps>>;
}> = ({ id, setData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async (item: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${item}`);

      if (response.status === 201) {
        onClose();

        try {
          const getAllCars = await axios.get(BASE_URL);

          setData(getAllCars.data);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <IconButton aria-label="delete" icon={<IoMdTrash />} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>Apakah anda yakin ingin menghapus ?</h1>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              color="red"
              onClick={() => handleDelete(id)}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
