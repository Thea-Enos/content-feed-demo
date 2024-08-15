import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";

import Header from "../../components/Header";
import CardTile from "../../components/CardTile";
import "../../styles/globals.css";

const GENERIC_ERROR: string =
  "Oopsy Daisy! It looks like something went wrong :( Most likely the external mock API endpoint reached its limit. Take a look here: https://app.beeceptor.com/console/theae#";
const REFRESH_FEED_ERROR: string = "Error refreshing feed: ";

const LOCAL_API_URL: string = "http://localhost:3000/api/content";

const ContentFeedPage = ({
  contentCardsInitial,
}: {
  contentCardsInitial: Array<CardMassaged>;
}) => {
  const [contentCards, setContentCards]: [
    contentCards: Array<CardMassaged>,
    setContentCards: Dispatch<SetStateAction<Array<CardMassaged>>>,
  ] = useState(contentCardsInitial);
  const [loading, setLoading]: [
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ] = useState(false);

  const refreshCards = async (): Promise<void> => {
    setLoading(true);
    try {
      const res: Response = await fetch(LOCAL_API_URL);
      const { contentCards } = await res.json();
      setContentCards(contentCards);
    } catch (error) {
      console.error(REFRESH_FEED_ERROR, error);
      setContentCards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div>
          <button
            className="mr-4 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            onClick={refreshCards}
          >
            {loading ? "Refreshing ..." : "Refresh Feed"}
          </button>
        </div>
        <div>
          <button className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600">
            <Link href="/">Return Home</Link>
          </button>
        </div>
      </div>
      <Header title={"Lorem Picsum Ipsum"} />
      <div className="flex flex-wrap justify-center px-4 py-8">
        {contentCards.length ? (
          contentCards.map((contentCard: CardMassaged) => (
            <div key={contentCard.id}>
              <CardTile contentCard={contentCard} />
            </div>
          ))
        ) : (
          <p>{GENERIC_ERROR}</p>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  let data;
  try {
    // Get cleaned data from internal API
    const response: Response = await fetch(LOCAL_API_URL);
    data = await response.json();
  } catch (error) {
    console.error(error);
  }
  const contentCardsInitial = (data && data.contentCards) || [];

  // Pass cleaned data to components
  return { props: { contentCardsInitial } };
}

export default ContentFeedPage;
