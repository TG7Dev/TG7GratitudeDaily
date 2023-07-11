'use client'
import Feed from "@components/Feed";
import { useSession } from "next-auth/react";
export const Home = () => {
  const {data:session} = useSession();
  return (
   <section className="w-full flex-center flex-col gap-3">
    <h3 className="text-center text-5xl">
    {(session?.user.name? `Hi,  ${session?.user.name}`: "Hi, Anonymous")}<br />
     
    </h3>
    <p className="orange_gradient text-start text-4xl">
      Be Gratitful  To Attract What You Desire</p>
    <p className=" text-center text-green-800 text-3xl font-bold">
     By Sending Good Vibes
    </p>

    <Feed/>
   </section>

  )
}

export default Home;
