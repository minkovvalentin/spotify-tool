import type { NextPage, NextPageContext } from "next";

const Home: NextPage = ({}) => {
  return <>Index Page</>;
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {},
  };
}

export default Home;
