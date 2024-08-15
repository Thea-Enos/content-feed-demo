
## Getting Started

- To view the project:

  1. First, install dependencies: `npm install`
  2. Then run the development server: `npm run dev`
  3. Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the project!

- To run the unit tests: `npm run test`

## Assumptions
- I'm assuming that it's acceptable for several cards of the same priority level to be displayed. But if it were stipulated that only one card for each `priority` value can appear, I would then determine what the tie-breaker is (perhaps only the card with most recent `publishDate` should appear) and filter out the others as part of data cleanup.
- I am assuming, however, that if multiple cards with the same ID appear in the raw dataset, we would want to dedupe those. 
  - If nothing else, React won't like having duplicated IDs while I'm using that field as a `key` prop.
  - So I included data cleanup code to remove duplicates, even though thus far while testing I haven't seen any in the wild.
  - The deduping occurs after sorting by priority, in order to ensure that the highest pri card is the one that gets displayed in the case of duplicate ID appearances.

## Acknowledgments
- Boilerplate:
  - This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
  - This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
- Beeceptor:
  - I used Beecepter to set up a mock API that imitates the third party data which is then ingested by this project's API and transformed before being displayed in view.
  - Here is the configuration page for this mock API: https://app.beeceptor.com/console/theae#
- I also found inspiration and guidance in the following resources:
  - https://www.bairesdev.com/blog/server-side-rendering-react/
  - Tons of people on StackOverflow, Medium, Google, etc.!

## API Documentation

**API Endpoint**
- `/pages/api/content/getCardsForView`

**Purpose**
- This endpoint retrieves an array of objects containing data that will populate cards in the frontend content feed.

**Request**
- Method: GET

**Response**
- Status Code: 200 OK
- Content Type: application/json

**Response Body**
- Data shape and types:
  - id (string, required)
  - author (string, required)
  - body (string, required)
  - comments (array of objects)
    - text (string)
    - author (string)
    - profilePic (string)
    - likes (number)
  - imageUri (string, required)
  - priority (number, required)
  - publishDate (string, required)
  - subTitle (string, required)
  - title (string, required)
- Example:
```
{
  "contentCards": [
    {
      "id": "string",
      "author": "string",
      "body": "string",
      "comments": [
        {
          "text": "string",
          "author": "string",
          "profilePic": "string",
          "likes": 0
        }
      ],
      "imageUri": "string",
      "priority": 0,
      "publishDate": "string",
      "subTitle": "string",
      "title": "string"
    }
  ]
}
```