import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useLocation, useParams } from "react-router-dom";

import {
  Container,
  Input,
  Text,
  chakra,
  Textarea,
  Box,
  Button,
} from "@chakra-ui/react";

import Layout from "../../layout";

type dataProps = {
  title: string;
  description: string;
  price: number;
  merk: string;
  type: string;
  stock: number;
};

const FormPage: React.FC = () => {
  const [data, setData] = useState<dataProps>({
    title: "",
    description: "",
    price: 0,
    merk: "",
    type: "",
    stock: 0,
  });

  const { pathname } = useLocation();
  const { id } = useParams();
  // console.log(pathname.split("/")[1]);

  useEffect(() => {
    const getCars = async () => {
      try {
        const response: AxiosResponse<dataProps> = await axios.get(
          `http://localhost:5000/api/cars/${id}`
        );

        console.log(response.data);
        setData({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          merk: response.data.merk,
          type: response.data.type,
          stock: response.data.stock,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      getCars();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      try {
        await axios.patch(`http://localhost:5000/api/cars/${id}`, data);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios.post("http://localhost:5000/api/cars", data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Layout>
      <Container>
        {pathname.split("/")[1] === "edit" ? (
          <Text fontSize="2xl" fontWeight="bold">
            Edit produk
          </Text>
        ) : (
          <Text fontSize="2xl" fontWeight="bold">
            Tambah produk
          </Text>
        )}

        <chakra.form
          onSubmit={handleSubmit}
          sx={{
            margin: "1rem 0",
            display: "flex",
            flexDir: "column",
            gap: "20px",
          }}
        >
          <Input
            placeholder="Judul"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            value={data.title}
          />
          <Textarea
            placeholder="Deskripsi"
            onChange={(e) => setData({ ...data, description: e.target.value })}
            value={data.description}
          />
          <Input
            placeholder="Harga"
            type="number"
            onChange={(e) =>
              setData({ ...data, price: Number(e.target.value) })
            }
            value={data.price}
          />
          <Input
            placeholder="Merk"
            onChange={(e) => setData({ ...data, merk: e.target.value })}
            value={data.merk}
          />
          <Input
            placeholder="Tipe"
            onChange={(e) => setData({ ...data, type: e.target.value })}
            value={data.type}
          />
          <Input
            value={data.stock}
            placeholder="Stok"
            type="number"
            onChange={(e) =>
              setData({ ...data, stock: Number(e.target.value) })
            }
          />
          <Box>
            {pathname.split("/")[1] === "edit" ? (
              <Button type="submit" colorScheme="teal">
                Update
              </Button>
            ) : (
              <Button type="submit" colorScheme="teal">
                Tambah
              </Button>
            )}
          </Box>
        </chakra.form>
      </Container>
    </Layout>
  );
};

export default FormPage;
