import { useOthers } from "../../../liveblocks.config";
import Cursor from "./Cursor";
import { COLORS } from "@/constants";

const LiveCursor = () => {
  const others = useOthers();

  return others.map((other) => {
    if (!other.presence?.cursor) return null;

    return (
      <Cursor
        key={other.connectionId}
        color={COLORS[Number(other.connectionId) % COLORS.length]}
        x={other.presence.cursor.x}
        y={other.presence.cursor.y}
        message={other.presence.message || ""}
      />
    );
  });
};

export default LiveCursor;
