import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-right">
        <Link
          href="/content"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Check It Out{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            See Content Feed
          </p>
        </Link>
      </div>

      <div className="my-8 px-4 text-justify">
        <p>
          Welcome to my project! I really enjoyed working on this and hope you
          enjoy checking it out 🙂
        </p>
        <br />
        <p>
          I started by reading the spec and letting that guide my choice of
          frameworks/tools. Create React App is something I'm familiar with and
          it seemed like a great candidate for this. I hadn't previously used it
          in order to generate an app that leverages Next.js and Server Side
          Rendering, but some Googling pointed me in the right direction.
        </p>
        <br />
        <p>
          I tried to consider what types of data issues might be likely to occur
          in the response from an API such as this one, as well as how it's
          being hooked into my app. For example - because React asks for unique
          key props to be supplied for arrays that are being iterated over in
          components in order to do its reconciliation properly, and because I'm
          using the card ID as the unique key prop for each item in the feed, I
          figured it would be a good idea to remove any cases where the same ID
          repeats. So I have a function that ensures only one card for each ID
          gets rendered on the frontend.
        </p>
        <br />
        <p>
          The spec called for normalizing data so I used a cleanup function to
          ensure the data types of the card objects are consistent with
          expectations, as well as to flatten out the object a bit for ease of
          use.
        </p>
        <br />
        <p>
          In a real life situation I would get clarity on what the use case is
          and what data transformations are necessary for each field ... perhaps
          all ISO date strings need to be converted from UTC to JavaScript Date
          objects in user's local time, for example. I would also want to keep
          an eye on security, making sure we aren't accidentally ingesting
          strings that end up hacking our system, etc.
        </p>
        <br />
        <p>
          One of the bigger challenges I faced was in frontend styling. Playing
          around with CSS and its many frameworks is something I enjoy though am
          somewhat rusty in as I've been more backend focused recently. But
          given the time constraints and priorities for this exercise I decided
          to keep moving forward with the core application logic while the
          styling question percolated.
        </p>
        <br />
        <p>
          That's generally my approach when I hit a friction point: explore the
          challenge surface enough that I have a sense of what my knowns and
          unknowns are, what I need to solve for. Then move on to another area
          of the task where I can make more immediate progress. That way I still
          feel forward momentum and avoid getting stuck. What often happens is
          that a way through the original challenge presents itself while I'm
          not staring it directly in the face.
        </p>
        <br />
        <p>
          In this case the time constraints won out and I decided to prioritize
          app logic because that's what the spec focuses on. Admittedly this
          content feed won't be challenging Instagram for market share any time
          soon -- it resembles a time capsule to 1997 -- but hey! It works!
        </p>
        <br />
        <p>
          I very much enjoy visual design and would love to flex it more
          frequently so I can crank out beautiful, useful UX elements quickly.
          My design ethos is not that form follows function ... it's that form
          is function. If something is not beautiful, it's not as useful as it
          could be. And if it's not useful, it's not as beautiful as it could
          be. If I were to keep building on this project I would be excited to
          bring that philosophy to life and snazz up the view!
        </p>
      </div>

      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Thea Enos ... with the help of
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
            and
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </a>
        </div>
      </div>
    </main>
  );
}
