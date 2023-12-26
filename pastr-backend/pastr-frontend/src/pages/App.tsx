import { useLoaderData, useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../hooks/usePrevious";
import { socket } from "../utils/socket";
import { saveText } from "../utils/api";
import { PageText } from "../types/PageText";

function App() {
  const { name = "index" } = useParams();
  const data = useLoaderData() as PageText;

  const [value, setValue] = useState<string>(data?.text || "Edit Me!");
  const [cursor, setCursor] = useState<number>(0);
  const previousValue = usePrevious(value);
  const [dirty, setDirty] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const save = useDebouncedCallback(
    (text) => saveText({ path: name, text }),
    5000
  );

  useEffect(() => {
    const onDataUpdated = (data: string) => {
      setValue(data);
      setDirty(true);
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        save.flush();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    socket.on("dataUpdated", onDataUpdated);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      socket.off("dataUpdated", onDataUpdated);
      save.flush();
    };
  }, []);

  useEffect(() => {
    if (dirty) {
      const index = value
        .split("")
        .findIndex((char, i) => char !== previousValue[i]);
      let newCursor = cursor;
      if (index < cursor) {
        newCursor++;
      }
      ref.current?.setSelectionRange(newCursor, newCursor);
      setDirty(false);
      setCursor(newCursor);
    }
  }, [cursor, dirty]);

  return (
    <>
      <textarea
        value={value}
        ref={ref}
        onSelect={(e) => {
          setCursor(e.currentTarget.selectionStart);
        }}
        onInput={(e) => {
          socket.emit("dataUpdated", e.currentTarget.value);
          setValue(e.currentTarget.value);
          save(e.currentTarget.value);
        }}
        autoFocus
        autoComplete="off"
        name="text"
        id={`input-${name}`}
      />
    </>
  );
}

export default App;
