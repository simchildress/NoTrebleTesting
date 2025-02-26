import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className=" grid grid-rows-[20px_1fr_20px] items-center justify-items-center  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="welcome-div flex-col gap-4 items-center justify-items-center  sm:flex-row">
          <h2>Learn Music with No Treble</h2>
          <p className="wd-50">
            No Treble provides an accessible learning environment for blind/visually impaired people to learn music theory and access sheet music reading and writing tools.
          </p>
        </div>
        <button type="submit" className="btn-primary text-xl pl-10 pr-10 pt-5 gap-2 self-center " >Sign up</button>
      </main>
    </div>
    <div className="features-div flex-cols items-center justify-items-center">
            <h2>Features</h2>
          <ul className="features flex gap-4">
            <li className="features-list">
              <h3>Lessons</h3>
              <p>
                Learn music theory concepts in an easy way. From tempo and time signature to dynamics, we’ll teach you all the skills and vocabulary you need to read sheet music. Use the log-in feature to save your progress.
              </p>
            </li>
            <li className="features-list">
              <h3>Sheet Music Reader</h3>
              <p>
              Scan and upload a picture of your sheet music, and we’ll format it to be read aloud. We’ll tell you the key, time signature, and any other sheet music notation in the piece. Save your scanned music with the log-in feature.
              </p>
            </li>
            <li className="features-list">
              <h3>Sheet Music Composer</h3>
              <p>
              Write and edit your own compositions with this feature. You’ll be able to edit your sheet music markings in an easy and accessible way and play it back to perfect your piece.
              </p>
            </li>
          </ul>
    </div>
    <footer className="home-footer flex gap-16 items-center justify-center">
        <p className="self">Sign up for a free account today</p>
        <p className=" self-end p2">Brought to you by Bryte
          <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={20}
          height={20}
          className="inline "
        />
        </p>
        <form className=" flex gap-4 self-center">
          <input type="email" placeholder="Enter your Email" />
          <button type="submit" className="btn-primary pl-5 pr-5 pt-5 gap-2" >Sign up</button>
        </form>
      </footer>
  </>
  );
}
