import Feed from "@components/Feed";

export const Home = () => {
  return (
   <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
   Be Gratitful 
      <br />
      <span className="orange_gradient text-center">
      to attract what you desire</span>
    </h1>
    <p className="desc text-center">
      Unlock what you need by jot them down daily with goodvibes
    </p>

    <Feed/>
   </section>

  )
}

export default Home;
