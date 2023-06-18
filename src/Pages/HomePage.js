import { 
  Box, 
  Skeleton, 
  Stack, 
  Card, 
  Image, 
  CardBody, 
  CardFooter, 
  Text, 
  Heading, 
  Button, 
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody, 
  Flex,
  Badge
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { Categories } from "../Enum/Category";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DateFormat } from "../Format/DateFormat";

const HomePage = () => {
  const checkApiKey = process.env.REACT_APP_NEWS_KEY;

  const [listNews, setListNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isCategory, setIsCategory] = useState('');

  const HandleGetListNews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=id&apiKey=${checkApiKey}`);
      const getList = await response.json();
      setLoading(false);
      setListNews(getList.articles)

    } catch (err) {
      setLoading(false);
      console.log(err);
    }

  }, [checkApiKey]);

  const HandleGetListNewsByCategory = useCallback(async (category) => {
    onClose();
    setLoading(true);
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?country=id&category=${category}&apiKey=${checkApiKey}`);
      const getList = await response.json();
      setLoading(false);
      setIsCategory(category);
      setListNews(getList.articles);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }

  }, [checkApiKey, onClose]);

  useEffect(() => {
    HandleGetListNews();
  }, [HandleGetListNews]);

  return (
    <div>
      <Flex alignItems="center" marginBottom="3" justifyContent="space-between">
        <Flex gap="3">
          <Button colorScheme="blue" onClick={onOpen} leftIcon={<HamburgerIcon/>}>
            Kategori Berita
          </Button>
          {isCategory !== '' && <Button onClick={() => {
            HandleGetListNews();
            setIsCategory('');
          }}>
            Home
          </Button>}
        </Flex>
        {Categories.map((value) => {
          return isCategory === value.value && (
            <Badge colorScheme="green">{value.label}</Badge>
          )
        })}
      </Flex>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Kategori Berita</DrawerHeader>
          <DrawerBody>
            <Stack>
              {Categories.map((value) => (
                <Button onClick={() => {
                  HandleGetListNewsByCategory(value.value);
                }}
                isActive={isCategory === value.value}>
                  {value.label}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {loading && (
        <Stack>
          <Skeleton height="60px" />
          <Skeleton height="30px" />
          <Skeleton height="60px" />
          <Skeleton height="30px" />
          <Skeleton height="60px" />
        </Stack>
      )}
      <Box>
        <Stack>
          {!loading && listNews && listNews.map((value, index) => (
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
              key={index}
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src='/images/no-image.png'
                alt='Caffe Latte'
              />

              <Stack>
                <CardBody>
                  <Heading size='md'>{value?.title}</Heading>

                  <Text py='2'>{value?.author} - {DateFormat(value?.publishedAt)}</Text>
                </CardBody>

                <CardFooter>
                  <a href={value?.url}>
                    <Button variant='solid' colorScheme='blue'>
                      Lihat Berita
                    </Button>
                  </a>
                </CardFooter>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default HomePage;