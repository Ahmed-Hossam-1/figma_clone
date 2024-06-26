"use client";

import { useCallback, useRef } from "react";
import { ThreadData } from "@liveblocks/client";

import { useMaxZIndex } from "@/lib/useMaxZIndex";

import { PinnedThread } from "./PinnedThread";
import {
  ThreadMetadata,
  useEditThreadMetadata,
  useThreads,
  useUser,
} from "../../../liveblocks.config";

type OverlayThreadProps = {
  thread: ThreadData<ThreadMetadata>;
  maxZIndex: number;
};

export const CommentsOverlay = () => {
  const { threads } = useThreads();

  // get the max z-index of a thread
  const maxZIndex = useMaxZIndex();

  return (
    <div>
      {threads
        .filter((thread) => !thread.metadata.resolved)
        .map((thread) => (
          <OverlayThread
            key={thread.id}
            thread={thread}
            maxZIndex={maxZIndex}
          />
        ))}
    </div>
  );
};

const OverlayThread = ({ thread, maxZIndex }: OverlayThreadProps) => {
  const editThreadMetadata = useEditThreadMetadata();
  // const { isLoading, user } = useUser(thread?.comments[0]?.userId);
  // console.log(user, "ussssssssssssssssssssser");
  const threadRef = useRef<HTMLDivElement>(null);

  const handleIncreaseZIndex = useCallback(() => {
    if (maxZIndex === thread.metadata.zIndex) {
      return;
    }

    editThreadMetadata({
      threadId: thread.id,
      metadata: {
        zIndex: maxZIndex + 1,
      },
    });
  }, [thread, editThreadMetadata, maxZIndex]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div
      ref={threadRef}
      id={`thread-${thread.id}`}
      className='absolute left-0 top-0 flex gap-5'
      style={{
        transform: `translate(${thread.metadata.x}px, ${thread.metadata.y}px)`,
      }}
    >
      <PinnedThread thread={thread} onFocus={handleIncreaseZIndex} />
    </div>
  );
};
