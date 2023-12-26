import { PageText } from "../types/PageText";
import { socket } from "./socket";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const connectSocket = (path: string) => {
  if (socket.io.opts.query) socket.io.opts.query.path = path;
  else {
    socket.io.opts.query = { path };
  }
  socket.connect();
};

export const getText = async (path: string): Promise<PageText> => {
  const response = await fetch(`${BASE_URL}/text/${path}`);
  return response.json();
};

export const saveText = async (data: PageText) => {
  const response = await fetch(`${BASE_URL}/text`, {
    method: "POST",
    body: JSON.stringify(data),
    keepalive: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const loadDataForPage = (path: string) => {
  connectSocket(path);
  return getText(path);
};
