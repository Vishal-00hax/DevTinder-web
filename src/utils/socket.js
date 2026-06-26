import { io } from "socket.io-client";
import { BASE_URL } from "./constents";

export const createSocketConnection = () => {
  return io(BASE_URL, { withCredentials: true });
};
