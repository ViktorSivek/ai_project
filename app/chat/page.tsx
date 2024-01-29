"use client"

import Navbar from "@/components/navbar";
import Chat_window from "@/components/chat_window";
import Table from "@/components/table";
import Footer from "@/components/footer";
import React, { useState } from 'react';

export default function Chat() {
  const [chatData, setChatData] = useState<string>('');

  const handleDataFetch = (jsonString: string) => {
    setChatData(jsonString);
  };

  return (
    <>
      <Navbar />
      <Table onDataFetch={handleDataFetch} />
      <Chat_window jsonData={chatData} />
      <Footer />
    </>
  );
}