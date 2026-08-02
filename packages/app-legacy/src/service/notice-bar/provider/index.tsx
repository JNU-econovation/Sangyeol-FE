import { ReactNode, useCallback, useMemo, useRef, useState } from "react";

import NoticeBar from "../components/NoticeBar";
import NoticeBarContext from "../context";
import type { NoticeBarState } from "../types";

interface NoticeBarProviderProps {
  children: ReactNode;
}

const NoticeBarProvider = ({ children }: NoticeBarProviderProps) => {
  const [queue, setQueue] = useState<NoticeBarState[]>([]);
  const idRef = useRef(0);

  const showNotice = useCallback(
    ({ message, duration = 2500 }: { message: string; duration?: number }) => {
      const newId = idRef.current++;
      const newNotice: NoticeBarState = { id: newId, message, duration };
      setQueue((prevQueue) => [...prevQueue, newNotice]);
    },
    [],
  );

  const value = useMemo(() => ({ showNotice }), [showNotice]);

  return (
    <NoticeBarContext.Provider value={value}>
      {children}
      {queue.length > 0 &&
        queue.map((notice) => {
          return (
            <NoticeBar
              key={notice.id}
              setQueue={setQueue}
              zIndex={notice.id}
              {...notice}
            />
          );
        })}
    </NoticeBarContext.Provider>
  );
};

export default NoticeBarProvider;
