import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Box, Image, Text, Grid } from "@chakra-ui/react";

import Layout from "../../layout";

export type Root = dataCars[];

export interface dataCars {
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
  const [data, setData] = useState<Root>([]);

  useEffect(() => {
    const getAllCars = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cars");

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllCars();
  }, []);
  return (
    <Layout>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {data.map((item) => (
          <Box
            sx={{
              display: "flex",
              flexDir: "column",
              gap: "8px",
            }}
            key={item._id}
            as={Link}
            to={`/edit/${item._id}`}
          >
            <Image
              boxSize="300px"
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
    </Layout>
  );
};

export default Home;
