import React from "react";
import HomeSlider from "../../Component/Layouts/HomeSlider/HomeSlider";
import Blog from "../Blog/Blog";
import Login from "../UserLogin/Login";
import Results from "../Results/Results";

function Home() {
  return (
    <div>
      <HomeSlider />
      <Blog />
     <Results/>
      <Login/>
    </div>
  );
}

export default Home;
