import { MutableRefObject } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useAppDispatch } from "src/app/store";
import { setPageScroll } from "src/features/layoutSlice";

export const useSetupScroll = (
  scrollRef: MutableRefObject<HTMLElement | null>
) => {
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });

  const dispatch = useAppDispatch();

  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    dispatch(setPageScroll(latest))
  );
};
