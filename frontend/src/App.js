import "./App.css";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import ReactLoading from "react-loading";
import { Home } from "./components/Home";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      setIsConnected(true);
    });
  }, []);

  return (
    <main className="bg-indigo-100 mx-auto text-center h-screen w-screen flex justify-center items-center">
      {isConnected ? (
        <Home />
      ) : (
        <div className="flex justify-center items-center">
          <ReactLoading type="spin" color="blue" height={200} />
        </div>
      )}
    </main>
  );
}

export default App;
