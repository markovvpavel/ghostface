import { useMotionValue, MotionValue } from "motion/react";
import { useEffect } from "react";
import { useAppSelector } from "src/app/store";

export const useParseScroll = (): MotionValue<number> => {
  const { pageScroll } = useAppSelector((s) => s.layout);

  const scrollY = useMotionValue(pageScroll);

  useEffect(() => {
    scrollY.set(pageScroll);
  }, [pageScroll, scrollY]);

  return scrollY;
};
