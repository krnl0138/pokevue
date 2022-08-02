import { useCallback, useEffect, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../lib/redux/index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* Observer state for infinite load on scroll */
export const useInfiniteScroll = (cb: () => void, filterValue: string) => {
  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        cb();
      }
    },
    [cb]
  );

  useEffect(() => {
    if (filterValue) return;
    console.log("Hi from useEffect of Intersection");
    console.log("loadMoreButtonRef.current is : ", loadMoreButtonRef.current);
    const observerOptions = {
      rootMargin: "0px",
      threshold: [1],
    };
    const observer = new IntersectionObserver(handleObserver, observerOptions);
    if (loadMoreButtonRef.current) observer.observe(loadMoreButtonRef.current);
    return () => observer.disconnect();
  }, [handleObserver, filterValue]);

  return loadMoreButtonRef;
};
