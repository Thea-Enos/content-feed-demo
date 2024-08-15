import type { NextApiRequest, NextApiResponse } from "next";

const NOT_ARRAY_ERROR =
  "Data from external API did not come back as array so cannot proceed";

const EXTERNAL_API_URL: string =
  "https://theae.free.beeceptor.com/content";

const normalizeData = (input: any) => {
  const authorFirstName =
    typeof input?.textData?.author?.first === "string"
      ? input.textData.author.first
      : "";
  const authorLastName =
    typeof input?.textData?.author?.last === "string"
      ? input.textData.author.last
      : "";
  const authorHasBothNames = authorFirstName && authorLastName;

  return {
    id: typeof input?.id === "string" ? input.id : "",
    imageUri: typeof input?.imageUri === "string" ? input.imageUri : "",
    title:
      typeof input?.textData?.title === "string" ? input.textData.title : "",
    subTitle:
      typeof input?.textData?.subTitle === "string"
        ? input.textData.subTitle
        : "",
    body: typeof input?.textData?.body === "string" ? input.textData.body : "",
    author: `${authorFirstName}${authorHasBothNames ? " " : ""}${authorLastName}`,
    priority:
      typeof input?.metadata?.priority === "number"
        ? input.metadata.priority
        : 0, // Default to lowest priority so nothing that was missing this data point will appear at top of feed
    publishDate:
      typeof input?.metadata?.publishDate === "string"
        ? input.metadata.publishDate
        : "",

    comments: Array.isArray(input?.comments)
      ? input.comments.map((comment: any) => ({
          text: typeof comment?.text === "string" ? comment.text : "",
          author: typeof comment?.author === "string" ? comment.author : "",
          profilePic:
            typeof comment?.profilePic === "string" ? comment.profilePic : "",
          likes: typeof comment?.likes === "number" ? comment.likes : 0,
        }))
      : [],
  };
};

const dedupeCards = (cards: Array<CardMassaged>) => {
  const idsUnique: Set<string> = new Set();
  const duplicateIdsRemoved: Array<string> = [];
  const contentCardsUnique: Array<CardMassaged> = [];

  for (const card of cards) {
    const { id }: { id: string } = card;
    if (!idsUnique.has(id)) {
      // If this card's ID hasn't already come up, add ID to Set of unique IDs
      // and add card to array of unique-ID-having cards
      idsUnique.add(id);
      contentCardsUnique.push(card);
    } else {
      // Otherwise just add it to Array of IDs which were removed on account of
      // being duplicates, for informational purposes
      duplicateIdsRemoved.push(id);
    }
  }

  const removedCount: number = duplicateIdsRemoved.length;
  console.log(
    `duplicateIdsRemoved: ${removedCount ? duplicateIdsRemoved : "none"}`,
  );

  return contentCardsUnique;
};

const prioritizeCards = (cards: Array<CardMassaged>) => {
  // Sort by priority, descending (assuming that a higher priority number means higher priority)
  return cards.toSorted(
    (a: CardMassaged, b: CardMassaged) => b.priority - a.priority,
  );
};

const massageData = (contentCardsRaw: Array<CardRaw>) => {
  // Ensure is array
  if (!Array.isArray(contentCardsRaw)) {
    console.error(NOT_ARRAY_ERROR);
    return [];
  }

  // Ensure elements in array have proper data shape and types
  const contentCardsNormalized: Array<CardMassaged> = contentCardsRaw.map(
    (card: CardRaw) => normalizeData(card),
  );

  // Show highest priority cards first
  const contentCardsPrioritized: Array<CardMassaged> = prioritizeCards(
    contentCardsNormalized,
  );

  // Remove cards with duplicate IDs
  return dedupeCards(contentCardsPrioritized);
};

export default async function getCardsForView(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
): Promise<void> {
  const url: string = EXTERNAL_API_URL;
  const options: {
    method: string;
    headers: { Prefer: string; Accept: string };
  } = {
    method: "GET",
    headers: { Prefer: "code=200, dynamic=true", Accept: "application/json" },
  };

  let data;
  try {
    // Get raw data from external API
    const response: Response = await fetch(url, options);
    data = await response.json();
  } catch (error) {
    console.error(error);
  }
  const contentCardsRaw: Array<CardRaw> = (data && data.contentCards) || [];

  // Perform data cleanup
  const contentCardsUnique: Array<CardMassaged> = massageData(contentCardsRaw);

  // Return cleaned data
  res.status(200).json({ contentCards: contentCardsUnique });
}

export { normalizeData, dedupeCards, EXTERNAL_API_URL, prioritizeCards };
