"use client";
import React, { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [queryClent] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClent}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
