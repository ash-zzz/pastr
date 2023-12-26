import { useLoaderData, useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { socket } from "../utils/socket";
import { saveText } from "../utils/api";
import { PageText } from "../types/PageText";

function App() {
  const { name = "index" } = useParams();
  const data = useLoaderData() as PageText;

  const [value, setValue] = useState<string>(data?.text || "Edit Me!");
  const save = useDebouncedCallback(
    (text) => saveText({ path: name, text }),
    5000
  );

  useEffect(() => {
    const onDataUpdated = (data: string) => {
      setValue(data);
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

  return (
    <>
      <textarea
        value={value}
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
