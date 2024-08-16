import React from "react";

const Lore = () => {
  return (
    <div className="flex gap-10 items-start justify-start h-screen w-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center mt-5 ml-5">
        <div>
          <div>
            <h1 className="text-3xl">Discover the Heroes of Final Fantasy</h1>
          </div>
          <div className="flex flex-row mt-10">
            <img
              src="/images/clive.webp"
              alt="Clive"
              className="w-96 h-auto ml-2"
            />
            <div className="ml-2">
              <div className="text-3xl font-normal">Clive Rossfield</div>
              <div className="w-60">
                <h2 className="text-teal-600">
                  Heir to Rosaria's Fiery Legacy
                </h2>
                <p className="text-xs">
                  Clive Rosfield, the eldest son of the Archduke of Rosaria, was
                  destined for greatness. Born into a lineage of power, he was
                  expected to inherit the mythical Phoenix, an Eikon of fire
                  that has safeguarded his nation for generations. However, fate
                  had other plans, leaving Clive to forge his own path as a
                  warrior and protector, while grappling with the burdens of
                  legacy and loss in the tumultuous world of Valisthea.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" text-teal-600 w-52  mr-20">
          "I was born into power, yet I must fight to carve my own path. For the
          sake of those I love, I will not falter."
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-5">
        <div>
          <img src="/images/tifa.png" alt="Clive" className="w-56 h-auto" />
          <div className="ml-2">
            <div className="text-3xl font-normal">Tifa Lockhart</div>
            <div className="w-64">
              <h2 className="text-teal-600">Fist of Nibelheim</h2>
              <p className="text-xs">
                Tifa Lockhart is a fierce and determined fighter from the town
                of Nibelheim. With her unmatched martial arts skills and a heart
                full of compassion, Tifa stands strong in the face of adversity,
                driven by her desire to protect those she loves and uncover the
                truth about her past.
              </p>
            </div>
          </div>
        </div>

        <div>
          <img src="/images/torgal.webp" alt="Torgal" className="w-64 h-auto" />
          <div className="ml-2">
            <div className="text-3xl font-normal">Torgal</div>
            <div className="w-64">
              <h2 className="text-teal-600">Loyal Wolf of Rosaria</h2>
              <p className="text-xs">
                Torgal is Clive Rosfield’s loyal and ferocious wolf companion,
                standing by his side through every battle and hardship.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-10">
        <div className="flex justify-center items-center flex-col gap-5">
          <h2 className="text-teal-600 w-48 whitespace-normal mr-20">
            "This is my story. It'll go the way I want it... or I'll end it
            here."
          </h2>
          <img
            src="/images/tidus.webp"
            alt="Clive"
            className="w-80 mt-32 h-auto"
          />
        </div>
        <div className="ml-2">
          <div className="text-3xl font-normal">Tidus</div>
          <div className="w-64">
            <h2 className="text-teal-600">Blitzball Hero of Spira</h2>
            <p className="text-xs">
              Tidus, a star Blitzball player from the futuristic city of
              Zanarkand, finds himself transported to the mysterious world of
              Spira. Struggling to understand his new reality, Tidus embarks on
              a journey with Summoner Yuna and her guardians to defeat the
              malevolent force known as Sin.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-56">
        <img src="/images/Zidane.png" alt="Clive" className="w-64 h-auto" />
        <div className="ml-2">
          <div className="text-3xl font-normal">Tifa Lockhart</div>
          <div className="w-60">
            <h2 className="text-teal-600">Heir to Rosaria's Fiery Legacy</h2>
            <p className="text-sm">
              Clive Rosfield, the eldest son of the Archduke of Rosaria, was
              destined for greatness. Born into a lineage of power, he was
              expected to inherit the mythical Phoenix, an Eikon of fire that
              has safeguarded his nation for generations. However, fate had
              other plans, leaving Clive to forge his own path as a warrior and
              protector, while grappling with the burdens of legacy and loss in
              the tumultuous world of Valisthea.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lore;
