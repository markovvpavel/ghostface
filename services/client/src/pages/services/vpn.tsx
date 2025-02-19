import clsx from "clsx";
import Image from "next/image";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function VPNPage() {
  const scrollRef = useLenisScroll();

  const { scrollY } = useScroll({
    container: scrollRef,
  });

  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <article className="h-full w-full overflow-y-scroll" ref={scrollRef}>
      <header className="fixed w-screen top-0 z-[1000]">
        <div className="h-full w-full relative p-8 flex flex-col items-center justify-center">
          <motion.div
            className="h-full w-full absolute top-0 left-0 bg-_black z-[-1]"
            style={{ opacity }}
          />

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
                  "vpn" === link && "underline"
                )}
                key={i}
              >
                {link}
              </span>
            ))}
          </nav>
        </div>
      </header>
      <section className="h-[calc(100%-50px)] w-full">
        <video
          className="h-full w-full object-cover"
          src="/videos/vpn.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </section>
      <section className="h-[50px] bg-_blue flex justify-center items-center">
        <span className="text-sm text-center">
          IP addresses are available in the following countries:
        </span>
      </section>

      <section className="h-[calc(100%-50px)] w-full flex flex-col lg:flex-row">
        {["Finland", "Brazil", "USA", "Germany"].map((country, i) => (
          <Country
            text={country}
            src={`/services/vpn/${country.toLowerCase()}.jpg`}
            key={i}
          />
        ))}
        <Country text="and more..." />
      </section>
    </article>
  );
}

const Country: React.FC<{ src?: string; text: string }> = ({ src, text }) => {
  const { isDesktop } = useMediaQuery();

  return (
    <div className="h-1/5 w-full lg:h-full lg:w-1/5 relative bg-_blue">
      <div className="h-full w-full absolute inset-0 m-auto z-[1] flex justify-center items-center lg:items-end lg:py-8">
        <span
          className="h-fit w-fit text-[60px] lg:text-[125px] lg:rotate-180"
          style={
            isDesktop
              ? {
                  writingMode: "vertical-lr",
                }
              : undefined
          }
        >
          {text}
        </span>
      </div>
      {src && <Image alt={text} className="object-cover" fill src={src} />}
    </div>
  );
};
