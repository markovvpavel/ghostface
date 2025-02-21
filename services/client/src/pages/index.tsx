import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Image from "next/image";
import axios from "axios";

export default function HomePage() {
  const [aliveMessage, setAliveMessage] = useState("");

  useEffect(() => {
    const handler = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/alive`
      );

      setAliveMessage(response.data.message);
    };

    handler();
  }, []);
  return (
    <article className="h-full w-full overflow-hidden">
      <p className="text-red-500">{aliveMessage}</p>

      {/* <HeroD />
      <HeroM /> */}
    </article>
  );
}

const HeroD = () => {
  const [video, setVideo] = useState("escrow");

  const router = useRouter();

  return (
    <main className="hidden lg:flex h-full w-full">
      <div className="h-full w-1/2 flex flex-col justify-between py-8">
        <header className="pl-8">
          <Image
            alt="logo-1"
            className="h-[40px] w-auto mb-8"
            src="/images/logo-1.svg"
            height={0}
            width={0}
          />

          <nav className="flex space-x-8 text-sm uppercase">
            {["escrow", "exchange", "transfers", "vpn"].map((link, i) => (
              <span
                className={clsx(
                  "hover:underline cursor-pointer select-none",
                  video === link && "underline"
                )}
                key={i}
                onClick={() => setVideo(link)}
              >
                {link}
              </span>
            ))}
          </nav>
        </header>

        <footer className="px-8">
          <AnimatePresence mode="wait">
            <motion.h1
              key={video}
              className="text-4xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {video === "escrow" && "Secure Your Crypto Deals with Confidence"}
              {video === "exchange" && "Swap Crypto, Anytime, Anywhere"}
              {video === "transfers" &&
                "Transfer Crypto, Collect Cash Globally"}
              {video === "vpn" && "Anonymous Browsing, Swiss Standards"}
            </motion.h1>
          </AnimatePresence>
          <div className="flex space-x-8 mb-8">
            <span className="py-2 px-4 font-light text-sm text-_white border border-_white rounded-sm">
              MAKE ORDER
            </span>
            <span
              className="cursor-pointer hover:bg-_blue hover:text-_white py-2 px-4 font-light text-sm bg-_white text-_black rounded-sm"
              onClick={() => router.push(`/services/${video}`)}
            >
              LEARN MORE
            </span>
          </div>

          <h5 className="text-xs font-light">
            At Ghostface, we streamline secure transactions through
            cryptocurrency. Whether it’s escrow, exchanges, or transfers, every
            service we offer is powered by crypto to ensure speed, privacy, and
            global accessibility. Experience seamless, decentralized solutions
            tailored for the modern world.
          </h5>
        </footer>
      </div>
      <div className="h-full w-1/2">
        <AnimatePresence mode="wait">
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            key={video}
            className="h-full w-full object-cover"
            muted
            loop
            autoPlay
            playsInline
            src={`/videos/${video}.mp4`}
          />
        </AnimatePresence>
      </div>
    </main>
  );
};

const HeroM = () => {
  const [video, setVideo] = useState("escrow");

  const router = useRouter();

  return (
    <main className="lg:hidden h-full w-full">
      <section className="h-full w-full flex flex-col justify-between absolute z-[2]">
        <div className="py-8 flex flex-col items-center">
          <Image
            alt="logo-1"
            className="h-[40px] w-auto mb-8"
            src="/images/logo-1.svg"
            height={0}
            width={0}
          />

          <nav className="flex space-x-8 text-sm uppercase">
            {["escrow", "exchange", "transfers", "vpn"].map((link, i) => (
              <span
                className={clsx(
                  "hover:underline cursor-pointer select-none",
                  video === link && "underline"
                )}
                key={i}
                onClick={() => setVideo(link)}
              >
                {link}
              </span>
            ))}
          </nav>
        </div>

        <footer className="px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.h1
              key={video}
              className="text-4xl mb-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {video === "escrow" && "Secure Your Crypto Deals with Confidence"}
              {video === "exchange" && "Swap Crypto, Anytime, Anywhere"}
              {video === "transfers" &&
                "Transfer Crypto, Collect Cash Globally"}
              {video === "vpn" && "Anonymous Browsing, Swiss Standards"}
            </motion.h1>
          </AnimatePresence>
          <div className="flex justify-center space-x-8 mb-8">
            <span className="py-2 px-4 font-light text-sm text-_white border border-_white rounded-sm">
              MAKE ORDER
            </span>

            <span
              className="cursor-pointer py-2 px-4 font-light text-sm bg-_white text-_black rounded-sm"
              onClick={() => router.push(`/services/${video}`)}
            >
              LEARN MORE
            </span>
          </div>

          <h5 className="text-xs font-light text-center">
            At Ghostface, we streamline secure transactions through
            cryptocurrency. Whether it’s escrow, exchanges, or transfers, every
            service we offer is powered by crypto to ensure speed, privacy, and
            global accessibility. Experience seamless, decentralized solutions
            tailored for the modern world.
          </h5>
        </footer>
      </section>
      <section className="h-full w-full absolute z-[1] bg-_black/50" />
      <section className="h-full w-full">
        <AnimatePresence mode="wait">
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            key={video}
            className="h-full w-full object-cover"
            muted
            loop
            autoPlay
            playsInline
            src={`/videos/${video}.mp4`}
          />
        </AnimatePresence>
      </section>
    </main>
  );
};
