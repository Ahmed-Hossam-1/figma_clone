"use client";

import { useCallback } from "react";
import { useMyPresence, useOthers } from "../../liveblocks.config";
import LiveCursor from "./cursor/LiveCursor";
import CursorChat from "./cursor/CursorChat";

const Live = () => {
  const others = useOthers();
  const [myPresence, updateMyPresence] = useMyPresence() as any;

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();

    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({
      cursor: {
        x,
        y,
      },
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    updateMyPresence({
      cursor: null,
      message: null,
    });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    // get the cursor position in the canvas
    const x = event.clientX - event.currentTarget.getBoundingClientRect().x;
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

    updateMyPresence({
      cursor: {
        x,
        y,
      },
    });
  }, []);

  // hide the cursor when the mouse is up
  // const handlePointerUp = useCallback(() => {
  //   setCursorState((state: CursorState) =>
  //     cursorState.mode === CursorMode.Reaction
  //       ? { ...state, isPressed: false }
  //       : state
  //   );
  // }, []);
  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className='border-2 relative flex h-[100vh] w-full flex-1 items-center justify-center'
    >
      <h1 className='text-2xl text-white'>Hello {others.length}</h1>
      <LiveCursor others={others} />

      {myPresence?.cursor && <CursorChat />}
    </div>
  );
};

export default Live;
