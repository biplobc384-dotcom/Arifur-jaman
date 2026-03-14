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
