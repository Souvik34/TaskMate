import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const messages = [
    "Check it off. Move ahead.",
    "List it. Do it. Done.",
    "Your day, done right.",
    "One list to rule them all."
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [displayedText, setDisplayedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const currentMessage = messages[messageIndex];
        let timeout;

        if (charIndex <= currentMessage.length) {
            timeout = setTimeout(() => {
                setDisplayedText(currentMessage.slice(0, charIndex));
                setCharIndex((prev) => prev + 1);
            }, 75);
        } else {
            timeout = setTimeout(() => {
                setCharIndex(0);
                setMessageIndex((prev) => (prev + 1) % messages.length);
            }, 1500);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, messageIndex]);

    return (
        <section className="relative min-h-screen flex flex-col items-center px-6 bg-gradient-to-br from-black via-[#05010e] to-black overflow-hidden pb-24">
          <div className="absolute -top-[950px] left-1/2 -translate-x-1/2 w-[2200px] h-[1100px] bg-[#2e1c5c] rounded-b-full shadow-[0_20px_60px_20px_#2e1c5c] z-0 blur-sm" />
      
          <div className="h-[200px] w-full" />
      
          <div className="relative z-10 text-center mt-10">
            <h1 className="text-6xl sm:text-9xl font-medium tracking-wider bg-gradient-to-r from-violet-600 via-blue-500 to-pink-500 text-transparent bg-clip-text font-sans drop-shadow-[0_0_25px_#d982ff]">
              TaskMate
            </h1>
      
            <p className="mt-8 max-w-2xl mx-auto text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 min-h-[60px]">
              {displayedText}
              <span className="animate-pulse text-gray-500">|</span>
            </p>
      
            <div className="mt-12 flex gap-6 flex-wrap justify-center">
              <button
                onClick={() => navigate("/signup")}
                className="rounded-3xl px-8 py-4 font-semibold text-white text-lg bg-gradient-to-b from-black via-[#1a0f25] to-[#2d1a5a] transition-all duration-300 hover:bg-gradient-to-br hover:from-[#6e44ff] hover:via-[#8a61ff] hover:to-[#9d7dff]"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="rounded-3xl px-8 py-4 font-semibold text-white text-lg bg-gradient-to-b from-black via-[#1a0f25] to-[#2d1a5a] transition-all duration-300 hover:bg-gradient-to-br hover:from-[#6e44ff] hover:via-[#8a61ff] hover:to-[#9d7dff]"
              >
                Login
              </button>
            </div>
          </div>
      
          <footer className="mt-10 text-sm text-gray-600 font-medium text-center">
            © {new Date().getFullYear()} TaskMate. All rights reserved.
          </footer>
        </section>
      );
      
};

export default LandingPage;
