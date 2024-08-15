interface Author {
  first: string;
  last: string;
}

interface CardMassaged {
  id: string;
  author: string;
  body: string;
  comments: Array<Comment>;
  imageUri: string;
  priority: number;
  publishDate: string;
  subTitle: string;
  title: string;
}

interface CardRaw {
  id: string;
  imageUri: string;
  textData: TextData;
  metadata: Metadata;
  comments: Array<Comment>;
}

interface Comment {
  text: string;
  author: string;
  profilePic: string;
  likes: number;
}

interface Metadata {
  priority: number;
  publishDate: string;
}

interface TestingCardLean {
  id: string;
}

interface TestingCardPriority {
  id: string;
  priority: number;
}

interface TextData {
  title: string;
  subTitle: string;
  body: string;
  author: Author;
}

interface ResponseData {
  contentCards: Array<Card>;
}
