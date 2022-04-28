import Head from "next/head";
import styles from "../styles/Home.module.css";
import Login from "./components/Login";
import { HMSRoomProvider } from "@100mslive/react-sdk";

export default function Home() {
  return (
    <HMSRoomProvider>
      <div>
        <Head>
          <title>Videome</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Login />
      </div>
    </HMSRoomProvider>
  );
}
