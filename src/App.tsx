/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Github, Facebook, Send, Mail, Phone, ExternalLink, Minimize2, Maximize2, X } from 'lucide-react';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF00";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-40" />;
};

const Typewriter = ({ text, delay = 50, onComplete }: { text: string, delay?: number, onComplete?: () => void }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return <span>{currentText}</span>;
};

const TerminalSequence = () => {
  const [lines, setLines] = useState<string[]>([]);
  const sequence = [
    "SYSTEM INITIALIZATION...",
    "BYPASSING FIREWALL... [SUCCESS]",
    "ESTABLISHING SECURE CONNECTION... [OK]",
    "DECRYPTING USER PROFILE...",
    "-----------------------------------------",
    "IDENTITY VERIFIED: ARIFUR JAMAN",
    "ALIAS: @Arifur905",
    "ACCESS LEVEL: ROOT / ADMIN",
    "-----------------------------------------",
    "WELCOME TO THE MAINFRAME.",
    "",
    "user@hackworld:~$ whoami",
    "Arifur Jaman - Student | Python Developer | Tech Enthusiast",
    "",
    "user@hackworld:~$ cat skills.txt",
    "[+] Python Programming & Bot Development",
    "[+] Web Development (HTML, CSS, JS)",
    "[+] AI Automation & Prompt Engineering",
    "[+] Terminal: Termux / Linux Server",
    "",
    "user@hackworld:~$ ./fetch_repos.sh --user biplobc384-dotcom",
    "Fetching secured data from GitHub...",
    "[████████████████████] 100% Complete.",
    "-> Base64 Pro Converter",
    "-> Fake Screenshot Generator",
    "-> Telegram Automation Bots",
    "",
    "user@hackworld:~$ echo \"Ready to explore?\"",
    "Ready to explore?"
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < sequence.length) {
      const delay = sequence[currentLineIndex].startsWith("user@") ? 1000 : 400;
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, sequence[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  return (
    <div className="font-mono text-sm md:text-base space-y-1">
      {lines.map((line, i) => (
        <div key={i} className={line.startsWith("user@") ? "text-cyan-400" : "text-green-500"}>
          {line}
        </div>
      ))}
      {currentLineIndex < sequence.length && (
        <div className="text-green-500 animate-pulse">_</div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono selection:bg-green-500 selection:text-black">
      <MatrixRain />

      <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center items-center min-h-screen">
        <div className="w-full max-w-4xl bg-black/80 border border-green-500/50 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.2)] overflow-hidden backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-bottom border-green-500/30">
            <div className="flex items-center space-x-2">
              <Terminal size={16} className="text-green-500" />
              <span className="text-xs text-zinc-400">arifur@mainframes: ~</span>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500/50 flex items-center justify-center cursor-pointer hover:bg-yellow-500"><Minimize2 size={8} className="text-black" /></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50 flex items-center justify-center cursor-pointer hover:bg-green-500"><Maximize2 size={8} className="text-black" /></div>
              <div className="w-3 h-3 rounded-full bg-red-500/50 flex items-center justify-center cursor-pointer hover:bg-red-500"><X size={8} className="text-black" /></div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 space-y-8 overflow-y-auto max-h-[80vh]">
            {/* Profile Card Header */}
            <section className="relative overflow-hidden border border-green-500/30 rounded-lg bg-zinc-900/40 backdrop-blur-md">
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 p-2 text-[9px] text-green-500/30 font-mono select-none text-right">
                ID: 0x882A_AJ <br/>
                AUTH: ROOT_LEVEL_7 <br/>
                SESSION: {new Date().toLocaleTimeString()}
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
              
              <div className="p-6 flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Profile Image with enhanced frame */}
                <div className="relative group shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-sm blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative border-2 border-green-500 p-1 bg-black shadow-[0_0_20px_rgba(0,255,0,0.4)]">
                    <img 
                      src="data:image/jpeg;base64,UklGRrARAABXRUJQVlA4WAoAAAAgAAAAwQEAVwIASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggwg8AAJCoAJ0BKsIBWAI/cbLSYzS/v7Ej0Mmr8C4JZ0vYeLP29J49TUPfd+hsVV0Z+mAUv4D3rp2WN8w7nnu0OWtX3R45gNtn/27luklCHujC82SDhHQLsQVyUliaw5WZAZCEv29ee7ZiJ1Zw/d7Qdt0ephxVnW4s4or7M07+KxL/FsQ4AQYJrIH6sYip07O3rscydaB2zkILroDuYlEh/vU7mLOTgE6uWWLUMnFbcvAgKw3m6nVrPewfhOgV/P/k41a68GXIjYFCBz2np+V6SX7+ujyerzFmqQVWYo24Eg3p/Y5/pNgp7X+0QhyL9RyLemtT2vpOJETs94vPYsbJa5CJnHLTKUIV/jkICt+uXXHOKkmHJ+xSYBaew+FAgLrXhRKJD/eBRWUqqJEsYCqq8gNjMs5RexRDuD7kr+qvUdSoYtABOrG6nClpAOI4qOfckty5alHpH+8GmpDVtogog2A3u4riE61T8xW/F6rqOaBD/cDkxNOdYuGGB+zNk0FEbkNwQOwqa+4EddkBMjHRnVpinPsZC8nIUVae+45RxNyAeucM0yrOKYwdzpsZk6WBjlEk4WRGggyqk5h5jvulU/3fQTcY3GBD9/r9kZ38YcNxI1ALPK4iz9wPCXyTKlKBcG2UjVtyygkQGEfwKyptTOvoMpiEXYH0ury5NUz39YSDdNuFAR1F3livUyf1VZr4qedhUE4GJftPI3ZSgcashIAxsOYsmSfpOiaDcKA9XdF9QMjaY8R1maJZ7nsBfYvhnrpGmtR2Du8B5HrmfBx8xcQ7i/Ft/sH70dBuMJzIS6jEVE+fTcpgvkF93JZbwxeJc2o1F5fUufnv6i4g1+qJe/FlbExsOPcee0TzvNdGb/Dlu8l8SHfFXp2e8XY5C/s92ptpSuRB3/XHp9hIMoNA9yj8xy0ntkszmlnA7kk/deSYfUE5nYC9mRFi0QenYA/n1IGk3v4XcparEL/zjkIBk1yA2U11YirdHvt+kpzP533ezGIEStxUe7Bf/tDbWRWBDFRs7bDCKOrMFsnKDRlfq7P5qNjO0t1JUpeK3hOJdE9i8/ldBxwKICMc0fJxH1eLtiJfiiOP6+daZtlgKVQkgsHnbJFTQv6pqd+3YgOJe5jP0dW8T5RyRBpVdkjphFwoi04muq9p+4SmaKsy4GKYOxkEczSjn3CI0arqN8IOhQa4mGshPGdq9eHWYDxIUcg2stwLwGrn1I7qJ8FUiTpZ62snjIa8cEueOzlKtYT6j7qwZWQOHr1ONedB7SfBkrivRDJZNWGR+BRLTAj93eUQgi1ZasETCo/VJ9SHSFzPi/yRpjltMlVSr7igUd0KpPabA7TrvCgWjYtYetBVg1wyWLuQ0Gein1Ug3+ANwixS/n6+U10dpmp2S5DMTCvDc733yJvyXxBlLfx9B8gewHhuRUqmu7MD2ChVIbAa1UyqtpPc5gT+ogXEYxknCqXcyzpmEk+St5aIbfIWF6grET5bSQnp3gqH5peMiObAnBP53eMYmeBaQLIFWhH75lv93DwaxzCGssYvvN4KXJEc+rdpm8oZVVW+Ncqckx9+S109C0oWjqz9AMY26w+1UFxve7Dh6LiEFiNq/nFILxwpqhXN3MmRGIEWpgHgRXJbQDThI2Jit3ygme4q+KEj88SsdJRRUR5+L/U3L+THwX9/azAYXEo3KoEct93umOVf4/XYi8W2lv/DtZOclvTWCYaD1WM1iPkHmlM2AmY6VSJYWVTD0wMHr1tCRF7oFVIdd5OSZjlcLRkyb/m6Vo9uiBSWh6sw1BwmtR8G4yhYAAH2cVGUwjIA/sDP/3R/Vr9WqD/yOxXtkZjxzAovCXoYthi8orQo1rFh0gRrFWcj5L02SxVZHiBaoTqAAF5Ra8l9cEq1USU7Aj1lZ4qAAAVZsiWKxfbhKNFugaEAXQ1JKLaPvp9y0Fsqr6O9WTOlwOAmksMKh3wzogLP29YDlTCUg6OZEW5Sk+k/QVdrlqlP8wFtTaQBhUITiJgYRQyIrBGSLwImLpBIDinllGpQgaR+pcU4qXNhgzBCzQ0mfFCSvJGKgNgH1kXa8EBrQTbWaTJS0I7dJt1UUTFNY4d1jjIPM4LXtHXtA6ynviFUemyVyguuZyXAAR9O3bQlJqzzCohkFkeLEneVQ7TfdCfqI8FtQHSGttYAzFQnbdgarctAAvdyEw8m0Qc2ZC93Mhte2vg3pZO8oToimNqOKU0IFolhrZA9W1+HLwKxtZQblW0ZDLns7AZaONHQPuJQPnnPoPuCB/NVWEF6ECAK5BHfB5sNmxzmZBLPaLolRsQtvfr/JDx+wqbRScXqIvt6KeD9U5Cfr9K5XqaVbWaNPQDzkR6mOgzARVyJ8jHNTTbYDHvOsDuVFQAE5s6Va4LNYVe4aZRcn+93AZ8uC7DpLTKr+HzJZpKeShdsM0M7Jf+EYaNKAAZW92PqL8srVb/NXw5wOgciP6tPcwi0HTYT5gAzuQhUVIuzWLN6V8E6wvIQaNOWdyqLZOGiPMmfFjhM65dFNTO4ZcI4r/kQ8zZA+7Y88hrzQr9XCWf2Z3x/tQdPx/63Gm69lKonWcK7Ybry+yccQmCGkappdDEjttSt4aU/3MJjKWz/8lNhFYwsV3xTC9KF0JAiCmg39G2wh7qHPcSigjVeCbyT8YJsBIx1GYKiafKqWLxZK/g5KXgb45d1GYVwaPHkNUDUIX8aPAqerIjuT+8P7l+h+UdVd22KOu70d80v/sqwaoxiBysW6CBoFyZrk9ZY10l8EY+6Y+1X8n4DjG1lwTz/4V4sGwQ2iOacco36jFQnJxerrEeL4O1PZjjVn/SFD72MpIw90QdFNplGFGZzhlbAmqGRjYEklKDK87nN6tas2w0Te+J2+hBMpuE6LHeHl5afooEgoheC90t9V1Rp2KO/hbTpkvwXvu6F1j4QW/k/sZOOoIGIZrwrwHOCqryng3WCpA/34dkeShh+VzbIOUNkp/t3xvAGDHuJ3rQLZdsEKdX6JnYlzc3zjPNs95jM5ZNIWEbT4f+g2jFcrD79tTaoAyg2rws3LsDuYd6O3j2a/VOx6mf4py9zNRblpvNiCxvlrdbncLHmQsE89pN2p38cceszL7cYXBvAsx2kFUGWG+smtC+APILSGBLVRHs+t6uhAlkkjpr1iqylmsP7Qj719TNraySBW2SkRea0NF6XUYlUPagwNPvzEeoDGlYvGzitKSbSP5MtHvuBStGGUJG2FUU1KdF7XtBpDw5WHyvGxsEg/uwwP/HmRp4/om44jUDkFKhP69ILyB6Rinm9D8KjWEwpeFw6+iv99CbmMe/7yt+kzggrdTZq0FIt2fW3gENf92WJxEou0c0+SaPQif+rM3nlY0UneFT5RWPkyRo8UmRTMVpEfdDQAYOLslYLidjKbnUz2JUe2rZh8Q933My76hYhyGKupDNNh+wkJwYuTikhN3hfoN2SvvOAoVc2m6kADwL+HYzTSbOmnhBMj6HSSs+yDRhiUPrzmzyN+6hs2NfLyguGR/8e0xXcXuyYnayHexobZf4661NwianBv4/F34r0VFksiqAA78UxTsJh2ouQgugTY9Ukw1mIxPsLK2EUGyVtTc/IjV+ISwDrGRIcbN83UNLsVBsCoc/I84wWy2Cv3f+7QKB75Ek+HCt2huVmzh2f9fw/AM2/nI4VaFS5uQFlKBwnwWNWDapBv+hn4RrHKWYA4jK2Tg2YtDqtJDJfnIEaip3nkM1L+SXjZn31Np8H+Gncqsg2sYA+Cch+Isv4zb46i4DRBr2sWl05rEhkOQf/46bRDeJBw4E9Ka+4toO1kIEUovEZQMlo7WCAg60O3vZ1OYujLd+xScT8Lk3SFcWx1ibRvjSzp0Lme1wquqvhiSDhruzD/6Ekstgu5A6QXIPpMwdteHWvR2kHJVClh1wsAgaGwASzAb8GRIX8UB5xw2tE5rbIBQR50787doPcBjgdzHgZkU5YbbktbZviEZMlMUSYfKQKqiNmYK16YkUYn/hQiM7iBDtaMofRxkUyoumdEhkx8lNvM0d7+wlOJaUxuCb0gcSZ7dnPv2bHRtZCBwqT76tqsEutMzU0kI4b8DMd/jPKf+f9WeaAAMSU+aFfjySn9/Aol7UQFKh4Oci73olZPiiD6PYOWCVD+QG4mddYXbqFYsQkzsJnsyuF0TIMpj2wAiF27eqMXPIMdeq+WXJqG0G2U6YKcBNRLnUEvbD4tZCmzArkkiqw7OynruaKhn7bAgb15586i1cRqpzXorGF51jjk99iG6PkaEnFLzH0LRRqSkpw1e3fdwhny/uqXlQP1YWl9HOrZ8UcYAbWqXRZ3HAyC5iEUs1djKttml01hWItXUZeBRApxEQrtFNxSnpe7MePmNr91FYq8RQb4Cd6QmTF5gLWHghKnVinSyIdiJ+myOX4jhS3q7TsvskTxJNqpIUJqakBboK7BoS5RqI8aBY48DS0kOB83qyGNOWY7SCOXAtKLI9NCW+A1PLTV3d+T1EcotzqB4aULBre8ylwV0VKrdKTwlboYWZKTpi2du+SnOvammHa1kfv/2cg9UCS77FKO03flZUFU8vg/yfl+5z47pCuob/d7f9vGOARpKIuXqrIL3soUDS3sYpXdaThAGJ9j234KCYfKZaRBwUetQD34XSuqL3aj918K/xq4k5kLUUMbcIHe3OjXeExA1qaXTMestNFEGynZGYQxWhQdLaRfCRB4DmuL5pdQED+SEBFhCukqc/iwFlbOt2yZ+W5hJqkfEovzj2IhvpLcTs1kpX7oPrlhtDa/e/PPANXZdIFnfXIvE+HSk9nur4VfUuvuBYIFoUkOMIA4h3cukA2Vy5K3Wq9YIxSj2ru+u0jQ0vdCTR7MSrSQrB7hKH3BVIX6VyWpvRubCbUwYRyH7jY49NeLl9wH0J+ElUFfIWKEw9Me2pnyJstBCCkvh5KDQ1Htx3EILw+k8R8kMLW/oq60z9ZR4f6TCjbDSMa/mKf/fgGGy9jeRRcLxVD7iTCJX1/WaAnySy4DBIS6pXUM+k6syx30rLq+09/BJrs3EK+4mCtXFm+xZaMCBVYcIoH9gNerXjxd8BkZWKxJPnLFO/ZiK0gJtHuM1eNFNRLVO/npiOjevbdu/AyK+hSOljN85drOsSlBRquqEM6I6CFigxXV/DZxM0WoRuTmQOWG+pYdywjLijiVXqvYBtnkII6Kes/cS2PVC5wy+zu7yX+lIzf/Ju73G7NjNatdHGADgb9A3JaFhOLs/DJGZb1Osa4UMJwY1+cQtwiU4ar73daDQSBVbkJBg9jMSXMKPKyNXP+3m7HmZe+OpsP1w845CRy7LRtzNQEmYjXsplW+sT1/YbqQV/3BICV4j11C1sne/RJEiAA"
                      alt="Arifur Jaman Profile" 
                      className="w-32 h-32 md:w-40 md:h-40 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Scanline effect overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
                  </div>
                </div>

                {/* Identity Info Card */}
                <div className="flex-1 space-y-6 text-center md:text-left w-full">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Authorized Identity
                    </div>
                    <h1 
                      className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter glitch leading-none" 
                      data-text="Arifur Jaman"
                    >
                      Arifur Jaman
                    </h1>
                    <div className="text-cyan-400 text-sm md:text-base font-mono font-bold border-l-2 border-cyan-500/50 pl-3 py-1 inline-block">
                      <Typewriter text="Student | Python Developer | Tech Enthusiast | Cyber Security Explorer" delay={70} />
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>
                  
                  {/* Status Badges Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto md:mx-0">
                    <div className="flex flex-col p-2 border border-green-500/20 bg-green-500/5 rounded">
                      <span className="text-[9px] text-zinc-500 uppercase">Status</span>
                      <span className="text-xs text-green-400 font-bold animate-pulse">ONLINE_SECURE</span>
                    </div>
                    <div className="flex flex-col p-2 border border-cyan-500/20 bg-cyan-500/5 rounded">
                      <span className="text-[9px] text-zinc-500 uppercase">Location</span>
                      <span className="text-xs text-cyan-400 font-bold">DHAKA_BD_NODE</span>
                    </div>
                    <div className="flex flex-col p-2 border border-red-500/20 bg-red-500/5 rounded col-span-2 sm:col-span-1">
                      <span className="text-[9px] text-zinc-500 uppercase">Access</span>
                      <span className="text-xs text-red-400 font-bold">ROOT_ADMIN_PRIV</span>
                    </div>
                  </div>

                  {/* Skill / Progress Bars */}
                  <div className="space-y-3 max-w-md mx-auto md:mx-0 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-zinc-500 uppercase">
                        <span>System Access Level</span>
                        <span className="text-green-500">85%</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[85%] shadow-[0_0_10px_rgba(0,255,0,0.5)]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Terminal Sequence */}
            <section className="bg-black/50 p-4 border border-green-500/20 rounded">
              <TerminalSequence />
            </section>

            {/* Secondary Image / Data Frame */}
            <section className="grid grid-cols-1 gap-6">
              <div className="border border-cyan-500/30 p-1 rounded-sm relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <img 
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAJYAcIDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAArEAEBAAICAwACAwABBAIDAAAAAQIRITEDEkEyUSJhcRMEIzNCgbFDUqH/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID/8QAGxEBAQEBAAMBAAAAAAAAAAAAAAERAhIxQSH/2gAMAwEAAhEDEQA/AOjPHhx+TjJ2Z3hx+b8kE3IvpAGmOWmmOf6YRthYDbG1crPGtMQVBTKqMfJSxyHlZ7Qb3LhPbC52NfHlsG2M4VanEZAjPJjarycMbUF+w2z2cpgvYnZQfVHV4+l1hhku5gr6qMpeWmKCgAoE+T8F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"
                   alt="System Data Frame" 
                  className="w-full h-32 object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-cyan-500/50 font-mono">
                  DATA_STREAM_02 // ENCRYPTED
                </div>
              </div>
            </section>

            {/* About Section */}
            <section className="space-y-4">
              <h2 className="text-2xl border-b border-green-500/30 pb-2 flex items-center gap-2">
                <span className="text-cyan-400">$</span> cat about_me.sh
              </h2>
              <div className="space-y-2 text-zinc-300">
                <p><span className="text-green-500"># Hobbies:</span> Hacking, Programming, Website Creation, Learning Python, Creating Telegram bots, Creating apps.</p>
                <p><span className="text-green-500"># Workspace:</span> Building projects on PC and testing automation using Termux on Android.</p>
                <p><span className="text-green-500"># Creative Side:</span> Customizing images, logos, and UI designs.</p>
              </div>
            </section>

            {/* Skills Section */}
            <section className="space-y-4">
              <h2 className="text-2xl border-b border-green-500/30 pb-2 flex items-center gap-2">
                <span className="text-cyan-400">$</span> ./check_skills --all
              </h2>
              <div className="flex flex-wrap gap-3">
                {["Python", "HTML", "CSS", "JavaScript", "Firebase", "Linux", "Bash", "GitHub", "Termux", "Android"].map(skill => (
                  <span key={skill} className="px-3 py-1 border border-cyan-500 text-cyan-400 text-sm rounded hover:bg-cyan-500 hover:text-black transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Projects Section */}
            <section className="space-y-4">
              <h2 className="text-2xl border-b border-green-500/30 pb-2 flex items-center gap-2">
                <span className="text-cyan-400">$</span> ls /hacked_data_logs/
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Base64 Pro Converter", desc: "Advanced encoding/decoding module." },
                  { name: "Fake Screenshot Generator", desc: "System spoofing utility." },
                  { name: "Telegram Bots (Python)", desc: "Automated server-side agents." }
                ].map(project => (
                  <div key={project.name} className="p-4 border border-green-500/30 rounded bg-zinc-900/50 hover:border-green-500 transition-all group">
                    <h3 className="text-green-400 font-bold group-hover:text-green-300">{project.name}</h3>
                    <p className="text-xs text-zinc-500 mt-1">{project.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Image Gallery Section */}
            <section className="space-y-4">
              <h2 className="text-2xl border-b border-green-500/30 pb-2 flex items-center gap-2">
                <span className="text-cyan-400">$</span> ./view_gallery.sh --custom-assets
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[3, 4, 5, 6].map((i) => (
                  <div key={i} className="border border-green-500/30 p-1 rounded-sm relative group overflow-hidden aspect-square bg-zinc-900/50">
                    <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"></div>
                    <img 
                      src={`YOUR_BASE64_STRING_HERE_${i}`} 
                      alt={`Gallery Item ${i}`} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 right-1 text-[8px] text-green-500/50 font-mono">
                      0x0{i}_BLOB
                    </div>
                    <div className="absolute bottom-1 left-1 text-[8px] text-cyan-500/70 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      RENDER_COMPLETE
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-zinc-500 italic">
                // Note: These assets are encrypted. Hover to decrypt visual data.
              </p>
            </section>

            {/* Contact Section */}
            <footer className="space-y-6 pt-8 border-t border-green-500/30">
              <h2 className="text-2xl flex items-center gap-2">
                <span className="text-cyan-400">$</span> ./establish_contact.sh
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <a href="https://github.com/biplobc384-dotcom" target="_blank" className="flex items-center gap-3 px-4 py-3 border border-green-500/30 rounded bg-green-500/5 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all group">
                    <Github size={20} className="text-green-500 group-hover:text-black" /> 
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-bold">GitHub</span>
                      <span className="text-sm">biplobc384-dotcom</span>
                    </div>
                  </a>
                  <a href="https://t.me/Arifur905" target="_blank" className="flex items-center gap-3 px-4 py-3 border border-cyan-500/30 rounded bg-cyan-500/5 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all group">
                    <Send size={20} className="text-cyan-400 group-hover:text-black" /> 
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Telegram</span>
                      <span className="text-sm">@Arifur905</span>
                    </div>
                  </a>
                  <a href="https://t.me/ArifurHackworld" target="_blank" className="flex items-center gap-3 px-4 py-3 border border-cyan-500/30 rounded bg-cyan-500/5 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all group">
                    <ExternalLink size={20} className="text-cyan-400 group-hover:text-black" /> 
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Telegram Group</span>
                      <span className="text-sm">ArifurHackworld</span>
                    </div>
                  </a>
                  <a href="https://www.facebook.com/fary.pol" target="_blank" className="flex items-center gap-3 px-4 py-3 border border-blue-500/30 rounded bg-blue-500/5 hover:bg-blue-500 hover:text-black hover:border-blue-500 transition-all group">
                    <Facebook size={20} className="text-blue-400 group-hover:text-black" /> 
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Facebook</span>
                      <span className="text-sm">fary.pol</span>
                    </div>
                  </a>
                </div>
                
                <div className="space-y-3">
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=arifurjjaman511@gmail.com" target="_blank" className="flex items-center gap-3 px-4 py-3 border border-zinc-700 rounded bg-zinc-900/30 hover:border-green-500 hover:bg-green-500/10 transition-all group">
                    <Mail size={20} className="text-zinc-500 group-hover:text-green-500" />
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Primary Email</span>
                      <span className="text-sm text-zinc-300">arifurjjaman511@gmail.com</span>
                    </div>
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=arifurjjaman51@gmail.com" target="_blank" className="flex items-center gap-3 px-4 py-3 border border-zinc-700 rounded bg-zinc-900/30 hover:border-green-500 hover:bg-green-500/10 transition-all group">
                    <Mail size={20} className="text-zinc-500 group-hover:text-green-500" />
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Secondary Email</span>
                      <span className="text-sm text-zinc-300">arifurjjaman51@gmail.com</span>
                    </div>
                  </a>
                  <a href="https://wa.me/8801700827289" target="_blank" className="flex items-center gap-3 px-4 py-3 border border-green-500/30 rounded bg-green-500/5 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all group">
                    <Phone size={20} className="text-green-500 group-hover:text-black" /> 
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-bold">WhatsApp (Primary)</span>
                      <span className="text-sm">01700827289</span>
                    </div>
                  </a>
                  <a href="https://wa.me/8801799517156" target="_blank" className="flex items-center gap-3 px-4 py-3 border border-green-500/30 rounded bg-green-500/5 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all group">
                    <Phone size={20} className="text-green-500 group-hover:text-black" /> 
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 uppercase font-bold">WhatsApp (Secondary)</span>
                      <span className="text-sm">01799517156</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="text-center text-xs text-zinc-600 mt-8">
                [SYSTEM STATUS: ENCRYPTED] | © 2026 ARIFUR JAMAN
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
