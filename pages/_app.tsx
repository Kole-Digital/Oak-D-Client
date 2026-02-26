import { TrackContextProvider } from '@/context/TrackWrapper';
import { UserContext, UserContextProp } from '@/context/UserInformation';
import { ChatContextProvider } from '@/context/ChatContext';
import ChatWidget from '@/components/ChatWidget';
import { useState } from 'react';
import '@/styles/globals.css';
import { ChakraBaseProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { FaIcons } from "react-icons/fa";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserContextProp | undefined>(undefined);

  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <UserContext.Provider value={{user, setUser}}>
    <TrackContextProvider>
    <ChakraBaseProvider>
    <ChatContextProvider>
          <Component {...pageProps} />
          <ChatWidget />
    </ChatContextProvider>
    </ChakraBaseProvider>
    </TrackContextProvider>
    </UserContext.Provider>
    </>
  )
}
