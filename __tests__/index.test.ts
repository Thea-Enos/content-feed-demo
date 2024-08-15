import { NextApiRequest, NextApiResponse } from "next";

import {
  normalizeData,
  dedupeCards,
  EXTERNAL_API_URL,
  prioritizeCards,
} from "@/pages/api/content";
import getCardsForView from "../pages/api/content";

const fullyDefaultedCard = {
  id: "",
  imageUri: "",
  title: "",
  subTitle: "",
  body: "",
  author: "",
  priority: 0,
  publishDate: "",
  comments: [
    {
      text: "",
      author: "",
      profilePic: "",
      likes: 0,
    },
  ],
};

const validlyTypedCardNormalized = {
  author: "string string",
  body: "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringst",
  comments: [
    {
      text: "string",
      author: "string",
      profilePic: "https://picsum.photos/200",
      likes: 0,
    },
  ],
  id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  imageUri: "https://picsum.photos/500/500",
  priority: 0,
  publishDate: "2019-08-24T14:15:22Z",
  subTitle: "string",
  title: "string",
};

const invalidlyTypedCardRaw = {
  id: 123,
  imageUri: true,
  textData: {
    title: null,
    subTitle: undefined,
    body: 123,
    author: {
      first: true,
      last: false,
    },
  },
  metadata: {
    priority: "high",
    publishDate: new Date(),
  },
  comments: [
    {
      text: 123,
      author: null,
      profilePic: undefined,
      likes: "5",
    },
  ],
};

const validlyTypedCardRaw = {
  id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  imageUri: "https://picsum.photos/500/500",
  textData: {
    title: "string",
    subTitle: "string",
    body: "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringst",
    author: {
      first: "string",
      last: "string",
    },
  },
  metadata: {
    priority: 0,
    publishDate: "2019-08-24T14:15:22Z",
  },
  comments: [
    {
      text: "string",
      author: "string",
      profilePic: "https://picsum.photos/200",
      likes: 0,
    },
  ],
};

describe("getCardsForView", () => {
  // @ts-ignore
  global.fetch = jest.fn(
    () =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            contentCards: [invalidlyTypedCardRaw],
          }),
      }) as unknown as Response,
  );

  const mockRequest = {} as NextApiRequest;
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
  } as unknown as NextApiResponse<ResponseData>;

  it("should return normalized content cards", async () => {
    await getCardsForView(mockRequest, mockResponse);

    // Expect fetch to have been called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(EXTERNAL_API_URL, {
      method: "GET",
      headers: { Prefer: "code=200, dynamic=true", Accept: "application/json" },
    });

    // Expect response status to be 200
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    // Expect response to contain content cards with normalized data
    expect(mockResponse.json).toHaveBeenCalledWith({
      contentCards: [fullyDefaultedCard],
    });
  });
});

describe("cleanCard", () => {
  test("should return the same data but in a different shape when supplied with validly typed card", () => {
    const normalizedData = normalizeData(validlyTypedCardRaw);

    expect(normalizedData).toEqual(validlyTypedCardNormalized);
  });

  test("should return a fully defaulted card when supplied with fully invalidly typed card", () => {
    const normalizedData = normalizeData(invalidlyTypedCardRaw);

    expect(normalizedData).toMatchObject(fullyDefaultedCard);
  });
});

describe("dedupeCards", () => {
  it("should remove duplicate cards based on id", () => {
    const testingCards: Array<TestingCardLean> = [
      { id: "A" },
      { id: "B" },
      { id: "A" },
      { id: "C" },
    ];

    // @ts-ignore
    const dedupedCards: Array<TestingCardLean> = dedupeCards(testingCards);

    expect(dedupedCards).toEqual([{ id: "A" }, { id: "B" }, { id: "C" }]);
  });

  it("should return the same array when supplied with an array that has no duplicates", () => {
    const testingCards: Array<TestingCardLean> = [
      { id: "A" },
      { id: "B" },
      { id: "C" },
    ];

    // @ts-ignore
    const dedupedCards: Array<TestingCardLean> = dedupeCards(testingCards);

    expect(dedupedCards).toEqual(testingCards);
  });

  it("should return an empty array when supplied with an empty array", () => {
    const testingCards: Array<TestingCardLean> = [];

    // @ts-ignore
    const dedupedCards: Array<TestingCardLean> = dedupeCards(testingCards);

    expect(dedupedCards).toEqual([]);
  });
});

describe("prioritizeCards", () => {
  it("should sort cards by priority in descending order", () => {
    const testingCards: Array<TestingCardPriority> = [
      { id: "A", priority: 3 },
      { id: "B", priority: 1 },
      { id: "C", priority: 2 },
    ];

    const sortedCards: Array<TestingCardPriority> =
      // @ts-ignore
      prioritizeCards(testingCards);

    expect(sortedCards).toEqual([
      { id: "A", priority: 3 }, // Highest priority
      { id: "C", priority: 2 },
      { id: "B", priority: 1 }, // Lowest priority
    ]);
  });

  it("should return the same array when supplied with an array that is already sorted by priority", () => {
    const testingCards: Array<TestingCardPriority> = [
      { id: "A", priority: 3 },
      { id: "C", priority: 2 },
      { id: "B", priority: 1 },
    ];

    const sortedCards: Array<TestingCardPriority> =
      // @ts-ignore
      prioritizeCards(testingCards);

    expect(sortedCards).toEqual(testingCards);
  });

  it("should return an empty array when supplied with an empty array", () => {
    const testingCards: Array<TestingCardPriority> = [];

    const prioritizedCards: Array<TestingCardPriority> =
      // @ts-ignore
      prioritizeCards(testingCards);

    expect(prioritizedCards).toEqual([]);
  });
});
