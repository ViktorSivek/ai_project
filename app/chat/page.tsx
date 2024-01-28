"use client"

import Navbar from "@/components/navbar";
import Chat_window from "@/components/chat_window";
import Table from "@/components/table";
import Footer from "@/components/footer";

export default function Chat() {
  return (
    <>
      <Navbar />
      <Table />
      <Chat_window />
      <Footer />
    </>
  );
}