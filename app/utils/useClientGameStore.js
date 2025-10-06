"use client";
import { useEffect, useState, useRef } from "react";
import { useGameStore } from "./socket";

export function useClientGameStore(selector, equalityFn) {
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const [state, setState] = useState(() =>
    selectorRef.current(useGameStore.getState())
  );

  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
      (newState) => setState(selectorRef.current(newState)),
      selectorRef.current,
      equalityFn
    );
    return unsubscribe;
  }, [equalityFn]); 

  return state;
}
