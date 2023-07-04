'use client';

import { SessionProvider } from "next-auth/client";

const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
)

export default Provider;