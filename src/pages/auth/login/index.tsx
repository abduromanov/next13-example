import { Box, Button, Checkbox, Container, Heading, HStack, Stack, useBreakpointValue, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { InputPassword } from "@/components/Forms/InputPassword";
import { InputText } from "@/components/Forms/InputText";

import { NextPageWithLayout } from "@/pages/_app";
import { doLogin, TLoginRequest } from "@/services/api/commands/auth.command";
import validators from "@/services/utils/validators";

import logo from "../../../../public/circle.png";

type TStaticProps = {
  pageTitle: string
}

export const getStaticProps: GetStaticProps<TStaticProps> = async () => {
  return {
    props: {
      pageTitle: 'Masuk'
    }
  }
}

export default function Page() {
  const form = useForm<TLoginRequest>();
  const router = useRouter();
  const toast = useToast();

  const postMutation = doLogin().post();

  const submitHandler = (values: TLoginRequest) => {
    postMutation.mutate(values, {
      onSuccess(data) {
        Cookies.set('anggota', JSON.stringify(data.data));
        router.push('/');
      },
      onError() {
        toast({
          position: 'top',
          status: 'error',
          variant: 'top-accent',
          title: 'Kombinasi ID Anggota dan Password tidak cocok',
        });
      },
    })
  }

  return (
    <Box bg={'brand.500'}>
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={8} minH={'100vh'}>
        <Stack spacing="8">
          <Box
            py={8}
            px={{ base: '4', sm: '10' }}
            bg={'white'}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={'xl'}
          >
            <Stack spacing="6">
              <Stack spacing={"6"} textAlign="center" alignItems={'center'}>
                <Image src={logo} alt="" className="max-w-[70%]" priority />
                <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                  {process.env.APP_NAME}
                </Heading>
              </Stack>
              <Stack spacing="5">
                <InputText
                  label="ID Anggota"
                  errors={form.formState.errors.idAnggota}
                  register={{
                    ...form.register('idAnggota', { ...validators().required() })
                  }}
                />
                <InputPassword
                  label="Password"
                  errors={form.formState.errors.password}
                  register={{
                    ...form.register('password', { ...validators().required() })
                  }}
                />
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
              </HStack>
              <Button colorScheme="brand" isLoading={form.formState.isSubmitting} onClick={form.handleSubmit(submitHandler)}>Masuk</Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

Page.getLayout = function getLayout(page: NextPageWithLayout) {
  return page
}