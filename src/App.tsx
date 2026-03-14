/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Github, Facebook, Send, Mail, Phone, ExternalLink, Minimize2, Maximize2, X, Globe, Bot } from 'lucide-react';

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
                      src="data:image/jpeg;base64,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" 
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
                  src="data:image/jpeg;base64,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" 
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

            {/* Deployed Web Nodes Section */}
            <section className="space-y-4">
              <h2 className="text-2xl border-b border-green-500/30 pb-2 flex items-center gap-2">
                <span className="text-cyan-400">$</span> ls /deployed_web_nodes/
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Base64 Pro", url: "https://base64pro.netlify.app", desc: "Advanced encoding module." },
                  { name: "Fake Screenshot", url: "https://arifurfakescrinshot.netlify.app", desc: "System spoofing utility." },
                  { name: "Holy Quran Light", url: "https://the-light-of-the-holy-quran.web.app", desc: "Religious knowledge node." },
                  { name: "Free Call Gateway", url: "https://free-call-for-all.web.app", desc: "VoIP communication bridge." },
                  { name: "User Access Portal", url: "https://any-user-for-free.web.app", desc: "Identity management system." },
                  { name: "System Node B12EB", url: "https://web-site-b12eb.web.app", desc: "Encrypted web terminal." },
                  { name: "GitHub Pages Node", url: "https://biplobc384-dotcom.github.io/-/", desc: "Static deployment branch." }
                ].map(project => (
                  <a 
                    key={project.name} 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 border border-green-500/30 rounded bg-zinc-900/50 hover:border-green-500 hover:bg-green-500/5 transition-all group block"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-green-400 font-bold group-hover:text-green-300">{project.name}</h3>
                      <Globe size={14} className="text-cyan-500 opacity-50 group-hover:opacity-100" />
                    </div>
                    <p className="text-[10px] text-zinc-500">{project.desc}</p>
                    <div className="mt-2 text-[9px] text-cyan-500/70 font-mono truncate">
                      {project.url.replace('https://', '')}
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {/* Telegram Bot Network Section */}
            <section className="space-y-4">
              <h2 className="text-2xl border-b border-green-500/30 pb-2 flex items-center gap-2">
                <span className="text-cyan-400">$</span> ./scan_bot_network --active
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: "Chat Bondhu BD", url: "http://t.me/ChatBondhuBD_Bot", desc: "Social interaction agent." },
                  { name: "SMS Taker Bot", url: "https://t.me/Smstekerbot", desc: "Message interception module." },
                  { name: "Hashtag Master Pro", url: "https://t.me/HashtagMasterPro_Bot", desc: "Metadata optimization bot." },
                  { name: "Arifur Hackworld", url: "https://t.me/ArifurHackworld_bot", desc: "Community management bot." },
                  { name: "My Data Store", url: "https://t.me/my_data_store_bot", desc: "Cloud storage automation." }
                ].map(bot => (
                  <a 
                    key={bot.name} 
                    href={bot.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 border border-cyan-500/30 rounded bg-zinc-900/50 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all group block"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-cyan-400 font-bold group-hover:text-cyan-300">{bot.name}</h3>
                      <Bot size={14} className="text-green-500 opacity-50 group-hover:opacity-100" />
                    </div>
                    <p className="text-[10px] text-zinc-500">{bot.desc}</p>
                    <div className="mt-2 text-[9px] text-green-500/70 font-mono">
                      {bot.url.split('/').pop()}
                    </div>
                  </a>
                ))}
              </div>
            </section>
        {/* Image Gallery Section */}
            <section className="space-y-4">
              <h2 className="text-2xl border-b border-green-500/30 pb-2 flex items-center gap-2">
                <span className="text-cyan-400">$</span> ./view_gallery.sh --custom-assets
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "data:image/webp;base64,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",
                  "data:image/webp;base64,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",
                  "data:image/webp;base64,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",
                  "data:image/webp;base64,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",
                  "data:image/webp;base64,UklGRuQKAABXRUJQVlA4WAoAAAAgAAAAKwEAjwEASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDgg9ggAANBcAJ0BKiwBkAE/ZbDQXzM5NTyl0en7kCyJZ27VGc7iVXeAdvGjNjq54+uWbfypK88uyrjkxFdO1/rzy06fUmivzvraWfSS0nzreAL2pqsMXZ3RJ9zRYK4AS5uhbYLZFKw41iesXRLFjaofeNZbdFZZ7O8j50pTjqgabzSs2R84BTsbiPi6b0V5eS3Y9gXhkOwkNhjNF9lJhsCmA2VfY758OS7IdBlFlXSAYyndPFO5PmrRyT1bbSzcJfUKUcvC5EEmgVYAdewgf+elFIji+ybwcSYA1miFSANZIzGJSRXOGCeu6B2wAHmp2wD34on5Q9lhVkLEdrKCfADuggLih/LMzDh2hM9c/+4PKpIBt81Yao9IkcWek8WUvnJiVgU+f+leT7SIhbdgkn+Ra52FpSSRhe+/nJYa6ZY+2Qig+aKCrRe1V1/ofbCU4OqNUuxFRXveLzKau2MaQQK1x8R8gHTIJR0OBcX+KKhqSViH1nJe/ypawZ7TTu9RCh/oddf4FdcTjV26MXh7CJHzGt4B3y0cumYndV/gKtlaCs0U0V+yYye9moSLANFdvi6gtIRTHlVcuD05gutQIZItvZgilpMPmiiNq1k/LY+ylFD1acG0jesprQk0jhVOg8IIiHNRWQpyUVmBZYXc572M1ONd8rSUoFcUcphnISkjur265YvA14/xUBOCXrZ3U3xKIzdp3B/F/904l8sehYAl0vVtCFJk6/B2fQd2uO9wPBE1K92+RUhtyZ5i8wiAE1qQJYJldk9z/aT8ZHdMswRrqyV4vv3KIhmC/OkF+sNuicx8IXSfljmp/Xqvdde+q5vL7KM+HfbCgNqWEjuxzbd4XOzubBHrm2xrZHh9PAi3tRCXVpzIPqMNnHSyWfdZU8JMrbd+sAxfcEYjIo/Oio3xKszVmp+N9xKqvt3WjQ8fpdvM30VOuuxYtOPJ/P/VSDvgk+hxy9a1cZG/OuIMxyKjkAXU2Q6MiI2AT0YxfhsFhvwjpIAA/ucxbBO1p5WLi2dTquCv4d+fjyVkSDtp9GbMIPpJxryyw3mhvwlPwcKYj0XDM9v/L7vZndMOGlQFy51lBrx7RdwRMjXT1ab9pRbPPKeeaMxVM1ABMq7X7vjHFt8DZxdMUpDTqVptSG+59/U7XKwdXtNzE4qEfv5/z9Y0G1eGlqUSfnOGu95v0LYhl47HyZ1938yiWSftcpt2tUoUxKnLK7BFouLE6RbWaAHXVruwKwCR7Ku0M5Sn/kahnz9lt4GlOpAWploQaRjn8TNJymcwbH3uYleknaqLMjJQu5On/pMNjhIsoJ+IN+BhqPrt3bXJAT56Gt28Cg/OlldLA2o1pca/ps2zF0OCB9LAAozqGSEtQEm3rxrM2CWzRvqHqcODXkqdCdhSKtZEvVi6FXHNoKHolitnj8acxZRFadKp4YOxG/qgpzUS75HBzxGq0YEf2sayO64NNbliwbAqlJVkVVW4jwEsIcHZQD1rlTOlIhXJdqYO+S/oIl4zKCz8shvc4pjpIKCn3zl9jsXDx5O6rImbg17vMVGesQogdQ4EtAvr7zfif6Io/KKwOXwO8SRJoUB4mbvPm2FwZGH9dsejUTxVwfPStDk0N60XIRkqEIxZKeS8XA6T1wREJmhD0fFlxzZ0m1PUFGY4YqEeevAKqlpkbkB3JTg9ep2IppsEqKxFji8lcxGMGWQbSA4WPWgmLaPFqCx5Z7aBjhCna5Ws5rD7VCsYTCiFuLX6hnC+zUNbrpQQEPiuE5eLIXgHFTICyz0JHysiSlbbKb3y//Exf8NFyBoju5OZ1lRczje+jqq5UcThC5BoxfZRSvbLKav0ZemEHB0I8YolRS9pBBjupnH7xNLfHOYoQsGtFK7fKG1WgkZPqFrP8j9CxV29I3rBVk6JsqfvgSlfDjFDQy5xGZu747ewvJtUIaxRyWLc1okz7jHBk2jDlL4rk0nDaF5jbFiB9JSbW4Tkcgg0tz90rwSpuUher/hw4QbQu8LLS2tLLVTGhL8GsfKEq6XTIgU+vccUMBMuOaMXchqsbBcJvLzoeoXoP+5D18nn+7TXm+OdhnQmRG/wwhnJKaObqYki7Tn1mL0GoeaIkVBMQuaQvpFKaO5DsY3cBBRbgaXWAIEPKM+H2DIpwgYj/08whcT4wGa4SCm0FQbT+EBs5CuaSSdHiwcy/AF2pnnT2pJux9HfTLwxaKrrp9QJfnymotrj+9kfGjgcfHCMeR5mqKhU3KCHa2md4Q+bF4+7FWmTfFgVPcxmZWsupVRX3oiclrnLOHTQ6BLXyM6JngyRHotqRFu/PIYWOKNFgT8IHWZpNA98m0ek3opSdWE4aYTeyNA2WSHJeRQgC7lV9y1ZZ1OEExu4EMZS/dxBlwSB6Rb535XLhhSDbsdeTYa0a5umoilVN2UF90CKKGtf8jX8Ze+DOYoA4lnVGT6CeBBxMmjzhxai5+W3HgUDK8QkQNGrc2DHiHO7m0QphOazB/rLxLVxZMMLzFvvRFfZg+6tmk+hcfdXLZtiU8lyXY4B5bZHcmXAyBXNoH2VEhbmmgMdYiptQKeW76n6WUElng2sZsjVRvOHCi14+V5HooSUYg9DwVeMjnkFX5Ggl54sVqvgz1WoZfxMDhC1hpmygnsNAsu3B1uuEHk4qJtxOGOD8WKyue/AzeCCAgEo2q0VOJN/qrpkmqUwOSyiGT4DKXGxI664R0nIIlgHWtvvG0DEy3JORhO/5mz8I0FOrMuSvv29B/orRiUV1lD9GAxHFNtLGstNxBsLlMs5KPsVB1/SPTwXTFwbZasgTaqGc/frjtqaQQpj5C556+tEbTagJHF2kHxpo5MxWyhC49jjWoKwsGwXGRB9vtctjPm+MQgVFtDbutcAEIzuIYsoyrmsXKMSXyx4XUy1AU2/NlVtXTs/ixDLV0c8WsZSgCDF5jV2DI5GuGCzgnzdM3WRj4UYHTkhrl1qopbH2lrvDqsurudYpV52T2obNHT7/CiDrOXs3C4M43w5bQXUqQwX57ITpfJQbMWeBOJcsjeD3PTM9J6lKEcGAuZ5tUb/YMgAE64",
                  "data:image/webp;base64,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"
                ].map((imgSrc, i) => (
                  <div key={i} className="border border-green-500/30 p-1 rounded-sm relative group overflow-hidden aspect-square bg-zinc-900/50">
                    <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"></div>
                    <img 
                      src={imgSrc} 
                      alt={`Gallery Item ${i + 1}`} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1 right-1 text-[8px] text-green-500/50 font-mono">
                      0x0{i + 3}_BLOB
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
