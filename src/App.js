import React, { useEffect, useState } from "react";
import BoyfriendsPage from "./BoyfriendsPage";

function App() {
  const [audioAllowed, setAudioAllowed] = useState(false);
  useEffect(() => {
    if (audioAllowed) {
      const audio = document.querySelector("audio");
      audio.play();
    }
  }, [audioAllowed]);

  const handelAudio = () => {
    setAudioAllowed(true);
  };

  return (
    <div
    onScroll={handelAudio}
    onClick={handelAudio}
    >
      <audio src="/mylovr/audio.mp3" autoPlay loop />
      <BoyfriendsPage />;
    </div>
  );
}

export default App;
