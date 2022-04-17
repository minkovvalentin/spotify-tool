import type { NextPage, NextPageContext } from "next";

const Playlists: NextPage = ({}) => {
  return <>Playlists Page</>;
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {},
  };
}

export default Playlists;
