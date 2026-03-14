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
                      src="data:image/jpeg;base64,UklGRiojAABXRUJQVlA4WAoAAAAgAAAAwQEAVwIASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggPCEAALAuAZ0BKsIBWAI/SZrDWjA/v7ql8ky78CkJY26St/ZZZ01pO4hiFkbjkv2E167Cm1L1xN9SVeOjbDv/h6MvjP/D5N/MT/5R+c9tcv2zy29If33/t5oyo7KCZt/Lsw74PtmZ1dyWfh0738gwpc6J7ciOfGpI8nP49qrqI8+463iHHQoaNOhn6iSXU0+mq5ld0fltzSsoYsicjG/jphhuH7y7BwHdJOoLQjg0Gw3rNaDBJYDskSlXYaDglAfm7P14cY/qe2SN9EA0WS/92VUiucQ/jBibKq05/c/nYvV0EA4Wzk8O9nWWqt6Y2CUXrnN+y8SboR7qk7TWtzcN/ha113pSA+gFxcITfhE2OFt5JJ8MNcJKodMRsvUKGCegSpzxkssOfDlqoik3l4D+dlsS8iV2iUfdphicVmrTkqAUZSAD71QCR0K5VErbAJ77tJ0DaUinpFpIObrSh7pAdcJ+LxbOnBBiW+GTmNixAeOmv2Q3KU0ONdIkXQ47OCm0QV74zk6KASryP4SFcPrnibcdpcUThPg6XXxgGHPlZVke1kJoypmBG8LYtDoWnSbRN+bpN610fOM+2q4BBByHuJPGJrTy5axtTmDs/q+Vd1EEVunFzSZeH5YXoepAMy0l6pfYV1ktmNkvZyG71LBXN7AbqsEA54WgIpyqCqDlVbVV/SvTn1b4KIfSAVsP8KTKIi6SaBR1eYq9UxdfvXLJLbIfJkH6+RWh0MgKckdIN96CfliLckfoolYGRAxnT3wpVkoT6f2mbFQBm4f6eBMZc87NFyFGTHVImYbCIll1ztRRoaLemnfEhdYE8Rs9NdniezYprUmGvaSK/J0jOS2zertJ40WwJrQ06WzLGWqcrR/Qw3Rd24HwDI+9Lh2R8jWM8gdSMVKjIrsWu5Zem8aT6HbfNbJR/LjGeWUoCpEsXVl3i4LHwMI98YgnPPl/mpISnUjDu3BQxrQhoZRaTabWuzudb2wwdyACT+FBSzrTSvUrJBMBzB8hx8CsbcnFuUeglDVmTHGophHZSyvuImzSqkPfARbbMX6BGyj8+rDMcKKqV9/f3KxqAV1ozGosS23w1EVf3UjkMoNu63frTUmyLAWcxp9Ubc/G/Wtuvu8krOxvOUycQbJH4W20qejdyrQBXnqZqGun2BpsyKF9IIIpOmz9qiflRJC42TIushNAl1MjGFGmYpIdWPUusTwyX0jAGphu4+v5GB2NI4T83MsrkEvOlJrZQIFb/ZxEdhxy7xFRFA84Wabbatz+lqhRV8yrsVPTkau/TsCEMFHl7yH+qhySyTjuqZaKfCfH3kWTu2uTiiV+QqtpC4IjKmM6WiyZY3n/Fkpjj7X+kCH9BUc6p4V8jim9i8ev5XG4buP+s85eckl+ELiKzQdlmExlWIiVqOahBbVitaP0aDXQVZkRKVDHvxVeuArOcuIwMNQ2RCJQkc/0Ggdvd80s8ko7mVKZFG2Vwcu8Ydv5DR+nVFqCBFgjjRkr6Trf12lAdJZLCRyRFotDeXB4OFNp2AiMt5EZu17uFRuE3VKDP8fBnvoscQWoSiAkAf8N/OtTbOj1v980SUa+v3ETvcH+6K+FX/tQgsGGNaBtUHfz1ngOLl7AjqmPgCTp23hcRIms1kSIqMn8CMDO3pMUhKo03TB1ctaNW4RlGcuPF/p8W953/OAzDutwJ8NKvTBZ3Y5ddyP8onBSO0vBFoN8K/Xp/bAQ/YhV/E+BnktFrjefs1mt8jOd3p33VlbSiL7N/BIIwVirE3m73hPHnZC8M0bSHLF5xnIZIP2mPfsY8r1R1XsEmz7s7mw4cydSHKsuJGmAZboQ36kWM0GVs+GeYBXlZsQnwbiGFc6+9YwctcndLyMMItQG3dzKiuXvaLwz2GuuuiQqfcG0EwdzWeOv8VoNcpajXnKG7hbeAgYtRdylYHJNXATsaWOOdY+I3Dnpznnd9wRomeYDXin0g50gdOtJaaMnb15KWLvQkolev8DURjEeYCC1Uj/impHiac2ABiVOIXMm3vHimF4TQ5t8BsVdAy+qfWyiYOWyuouxZIVRtJPsxCv+nMFdNIoT5UcoLTpHenkhbTEf6TxSls2fXbEIiPUFmL+6pnLg1KHZErD8FfzVCskAsSecz7HmZbSE1dSv21e4QoZ4VJ2+iWqU41/93yUZGxTWDc4mZQCV4S36DxhsiAbkxq3bp6x/sieLBg+ZGVgXZwT6jNRmEkHkMtn1d4xIBz6LlKVA9siBrUKyG0wciMSoJP9gKFIIAE6AOpPaX7L1S24c670RtI6HJfPHXkVZnKIJVqhBjE5qpy9mBGyuvFoZBQcBFRXReohG6iXpSIHWIFPdTtfJb/p6PYubVGj2m/WYwpdfO7TW8u6YL6RyObfMngFor78Mth9gYRc+zaX2xtqA2Uv2/DPQk4SyLNrMfFpvEkJ4Xoq6KVm/+AzeGN0i7iAjycP10S9PFgHac5xJvGcvZPrM2/tx3fadK8yxqYSmGnmGdR3exYp2JbSBUlLO7D6Ol+GrlVsjaPzuWio2k+ZB1CnTOQkf8gm1RZ/6uyZloSvKy8k6o2UCypKs11JN498EE473oRODtPXlADoH1ZaxlELlNnF7n8OG9aP97t2vHpPvRu4TViOuYKavQ3WlPdwF6eplYJLgKhL2ZngftfdUv1azFOOmoR5dse1SxxmMlmxNFEo2jtCdEyV9RH4y53uD93HxFTiIOoyKihml5PyiGtKYaBAGGXPHnpL37SNQ9OVOY7Wbw2LL7Ls86Z0EjkRasBkdXlAXFGfACgCLoBZwucLDEvUcx1zSuO6JC5+xzvM0Dm/zf2DjvtOoGlu9e8AvrtpDiJv1QPbrgWQfn8N6j82Hu/IEre+JVofyKhB+B7LpqyDrLo3aMBWrppMFTtVAlqkxyCZMAZvJoC/fSVor19q3hW/8qDLw8fC9pYDjPdAFPn+9+dYPKZEIvPli5EgL/KXp8qtfNlw8QrtZOMT8sCTDVU+FIcZ57KOBFJpaoH3M5CnymBY5R+bhrkNNbv5mt+/75A19QtUehadjUibbRicXhQZV25sYytf6oJeHP3L8oz7I3t/WbbqZm1TAvrjQI0wXJbS77HqMBs9dY5HHhT4FzCmDjkWDX2w+LpU83nXQVw93fxaNQ+EdeAQN0mLfmiVbhXXCrD0PdTZlguPIH8PLFy4me1xbXLyoUqm/F7iQgSxJauurt2XE5lA86uL+liQCkW6yfyx+/SplCbqvAAD+76PdMef6pvI3r8toHe9tO9Kz6a08ofebUeWgg9+nUOAMlpPdDdlY/WampFF7sNyaE8bTlj9gdV94v8Y+kZ0o1h/3ykDbyNdiO+Eo3No4ec0b7XMmfmJpNkpJYFHXyHm2j1i1dZ31+bc6E93S4rTTBdTKKjl7Jy4GzeVCQVdLQMm+6o563cuMhwf7vl4I2cwgLNDrwYwdp2iGpRVFF7gec746Rp2FLEKKImKQ8Dn0oCoX46PZlbpffgHdqDJmpiTqVn7GZLVFsradYyL46LUEKGSPlxYrWCSUH9A7vEXh+SXXzMoHM+yBRglX0KBxec2bFYhJf5o5xOgvjMdjZIC4rpaWrb/tIMRi7t1Ey9QqWMNvnE0PlEkawbeL9C4/PsEr6AuSkZ8Gr354r92GFAyv+KiAWq16rvPSQkFpW6V+eItXfstKPYmB59Uk+MqRIUmAccQ20vW/6DPWyuznJwUGWcTpv30BrmMs08UFPVlax3HOh1pk/dyTZtH8rYAWO1ELCpwsp/Cz/N2M55YWYoeJZp6Bz0TRTwm36x4n3RW6kl6eZUwX60I+cAYne2Lk6TGPNk/0xWMwAiZwz7adb0mzGuCV1ZCTfUS4g0fxsI3dG7kg+O18EN/1HcRfrJu/4/q54q2NTxp13f3lUSAQxz3xUeylZoC8SAUSd8clWmuZoO0bpViqdQyQvLeSUyaL4xLoz9o4rzVS1HTov1du3tYWOIS0BlEbhgFqFgqmYdcQQExibqSg5NAxroJ31CAM3OnmsbnEUAhlinKz5MOnc790vku2SlsLf1+qSNpfOvVKOPJU8qcQIRp/09NtN5Y0Kpp5glN747ne1/EL27LIR6mLfab4N48Er5duGIJgqdU7TajPklYwsIXPQpiUtfKtzexvaQE/KrShKNq1p/AFAg4oHYgpUAv/1rpt5UP/ziVVNp2dT5B8NBPIBQ1BUzygw3bfwZ8kCkkNSQ4wIAIsWRwu6r5k2uw9BIajlcY8zPLwxd9S9Zn8ECEFX4rMHSeo5JLeJ+eV7WYtR+unuHFWcREeOoQwPZCW6NBnUK00KTtTO5ffkwBF9sVyTipKir+1zNxbNbwa6buMABFDd4duFPKprZfZrjdj9AU9l4nkQAk6VULEMyCZfeKr8zGmQvJonni7BCA952M7TIcdWgadSyBSdV2aqt162TI99s+KR/Bd7BtsgPyOcL3pUFNAfIyx4YP/K2bHKUIdd8yXFSd4Sgu6lNH0Kh6fzwo0onrAXsofQuuPuHxsI/3V96IxX6C0Vs3vUjXwWcR/lIFWDd6yuc0hoSwpSSrgi7jOO4HZmBjKndlJnG5hzeovEM3SU0qthljP3MLbxivw0ccaH29dYXkZa1LLHSq60KNtdv+s+Y1BCfUFhbNXA2jFyyQaM39uEv3pZQBSjXNwglk/JgEuhDOlmYB/abaCxMGoIvsuvgBe/yBRW4UjhXHQes/qXwcEhpSnGB/PZtmEc6WWtbzK/cqgvylKgSjv/G2oMIGXPKwL/U7s7dvAAWivaxyXP70i7neMAlgLq+XwP7fywlwgR4YmsHWBKnVvUIf1oY41X/C5CFRYTchtjXyHSMD2PtS2JneMYGA3RzivQi5uLQ7uHO4nFBkovjiJ18zfgRCO3AAYEsxR8d8ZNXWptTRdYe1osmPERWZRX3Co5Aaw9qsItDoe8/LBo02gb211PUJ9eWCXLeZ3NWAmGc/hMVLHsOmVTxEVz+IIv8QqLzGPbwy5BLhXo2B3n7oNiIzhUGDlKGsqSxhXdbkTpMH9hqcuZD5fqJbrf/wWXGNCYzthsx1gMEBcwGmmQgKZ4c3PnaMOL4DN1D+reYeWDumLNo9jU/w72oTkvr4v/0m10RMsowC1sE1f71jIpV+Cb0B+nyFniwX3Eq8NtI8iHxRKq9MVTEjMM/BqfhQe7I3w4az8XUnndie40kiGTJXV/YXr+Bn4IDLp25FEsD4JH4hZV+UkPPeEFpyJa4LaBjj6OwEC89SC7Ev17Q5wXiiN5dkh5SFbRL9PHPgl3JxMAzFONDhgNicimYSH1wPsRNY/2erf+GrWYalg4fMJce5EeO0/OTSaq8dNJpc3u7LBANcUZ0lWRwhsZK9q2S7tOuBg7MwraKMoOWWTWqub0HAERfgtfe//D9z1cftQh8ssUqK03yJC0GKtbdmtG3hPIPb/RUk+2qBt6rGW3YRH8NtJE+Pjiqa22W3JWxPPahMVsJatEbGopeYvQCpdZ+11h7jbSggNG+mOJWn76zgMV6pM/IFrwyqPqSF+942TvfXjQqv+33ATkOB3Xa363T0SHVopRUJ2CysieZ6kCS5ub7PVkiwmmmCW9VQl+KkkawTHPUUnsOBkHnapDT7e4gLrHybVamJ6rqmOATdV6Wv/+Bm00SFuVmTzUPhgBDKuNvwM95gkdkQk4cfY72NEnxPwwDpQGFIIYVztZsmKKs8eDCE49qU1g6NFKFJoiodiyuUh9qjRSMHcOskpZ3qOe38X39fi6gERd7iokAG+fsMe2DtnRPX67MuPV50VtB2GT1IW48Nf37nJNKl4ArpHtDBfF6GrZgO12/kksz6gOetwlySr4MLuhOZvF/ZXGHn9rQwnmPMLCOotwSdODbTKTfPFFbs/D1XtA+aiFtmy1P3hbWI6S1XXluvocWpScvXTCj0om57e9WQZ8N6Hn6u0RVFEswtAe/XJW98/MpQjAbzm8McXkrwhoK+3YohOwSyJ+HdpSfHP7d1u/RMGnPaehPPR9PXtKB++m5ozEb0Z+iYulkOXpOv9OS3Agm1WBixLbb0atUjpnv9z91R1HZhaXPphaz/yVsBtJ5gAbmVOvtAbrZESbxmT0A7hEZeVVYlFq+844vd7SlZoIQs1t2hGcXbCwsUhjdW9KJ/mYAEPmh9VxvkKejvKmGjPr+aJpEdLBh1+mu3V65b+43oD3G32AT61Ic+x3i4AWLRJ0k3Rw9qu9+7VVgmQKCozkAx5WQ4/xfIVzGTCaG1NAbUmec8+AUM+lHmPzgoFZrYB82/E7cHIHSCP4HcKAp6hNxF0l2A+7HGATKousr5cBeSVtCIRjwzuYUwme5uRpQVIBKq/x4/bw5kRqHSWrAz6uZO3+9yu18HoJvirsnECddN0WdekH5TzYgLjwic1suVwXyTvFlmQNUlIRdhmIQMFytSXHQgfRlRzMrS6Rj2Wo3gXQIrSH2uCY0hD0QIiDfSBCk24YKV+qWJxMK5ixM6cVR8j7zO4biFSjvJwinTwNg9HoXYia0VmsKA/6gghmJgtC2pG9BZFxSBvyqaGHmsB8Cy+IApNC6fEpGn7Q2H3xV4t1COep8ZRdY4kM/6kYKmv14+D7WcoDCh7ksUlRCCyzWdUO8LphC3Nq3pk7rT8jerXev22/wLJby2YDHziHvYX5FY0uiBt7h3XtyIRkvxu9hD+coTVQpaAHNfwEV1PKgVER9qGchuHIo3yHsGYktjjIDJd1CF/cMNJQVIiM5/NmjH06j4psXBHePTUxC9XUXQ9esf3mf7217RB8gII3VFxdmXqnIbQqnhYh9IiyTIFV/KmFhu/AOSKKVFLnxT3ZwTNGLTyq8NviwrVVZCAL7S6C0RCW1Mwaae8J5ltIX3WVJyTiWauiBOA49FzsgFuxQjSp9xEj0/89rhzCKtfupXyFvZP4/DFQDNJW4Advnw4e4VZ42F8JUldn8cKeZG2nH9psR9krAAPHSWHpkdYVc5jusYH6+tFdkbYdxD5SNIGNBIonjYlbuonkZESpAFkrElPZpop73k54qqyYd5a5Yse5sfHsB5w6wZwVISc0F2FHXLnj0T0rShS26pgEJKpGFLaN/eXgy3HLiOnw5y9LvtVVnoXUaS8bLExCfAR5XeASJ6RoTLAPcI4h+epAbRPOAt4Hfy/KMKKfzhWHjkNn+Uu8tSxo/sqUN6u7troojoGWpmPAcd12zsDNH/DioZda41RbQC82x+B9TfcSkh4CwXIvKXazeivI6FVaNS5D3zre5I+2/f9Ga7REWQTNBGt/Snv3z+EDo6l5q1EEa2D0kyECAr3XKVhJduWRtO0x0UplliP2kxEggEfxjD4gWvLCYkCq2Nn098HK3cgomA8XoJyAo5UA/uISYsEXLpepOHwamS2XVksVT2O8WvnD2qVM7Kk8ivzLfIbUY5/XTwcOPSpbSryINv/4tTlJZcsfnNAi+Lx7JLw2owmA/EKz6n/TrtSqtPYOuQoNLAjljr/WPL5QrPZLGIFBwoO8d9+OYs6YeIwmqqilX/hCVmnK2wjrRVYZfB2qPtXWOkNCzjzxhe329vc1zP4cHH0/b4RZX9Q2uI0F+ZUCQkKGh1cWBcPKNYmYQ3mjVnBTZ5+loStCDvdu+ccKV0kMYIArnh5jV1huhrjrZc5gpOb0RwzZSpZp7e3vB7q5vFqu5QvQ51aWhOVok9uCJ1Gr6WP2hE0i3b2QEE0hlMi0gHNGRTvF1H7yNeS180p3U+h9hQJ3C2qNsxtKuYpYE/0lS/EEwTzKmyEXssl1+l4myJGWEL3PHEyTpvYSfiGNb0cnUkJwprUGcL/O/vzyb9jKgVnGxzSyiGjrNOlJt3rTsEKxeX2ah3rSmy5CkI2tJe61JLpMnzin5bbjMxb/pIvbx5N4D5RoapssaTVX/azYiMmmRWIkE+1/xh6RynXeqsG8VeAHLQc5tylMTUxR9oJ10zA79BmryCid+mPzi5JIoG+ijjmJxU+wFv6jTZY8ULbudzRIvwzq6kQ0sGgNQz3y2Uzwkw2p6XXcMH+i5V22Q1EmAIZyrxDtXvGMWjsXMqeb0XWm9idsWmvlrGNqlEnyzau5q43aYb+uVuP9kC9Fu76H+WiekkchjDOxtoUKFmmrqqMZcmDPbJMJOY2u6gjsTMyEMc3wNgZvNMPUvuKHYdThOkthcdulDn/n3U4swIM8IjVavbvbbNio6TN9SV2Me4ZHajQyf0wGeWSq79TkhsC+kqgPEtcu68l5Cw1mUHxzdNLzeVY1VaWkM1xcyp71k5SqF42dKTwEFA42/HDFCbwccWL1JnoSu8fU7nLps2qCxT0NmcySF75F7sU5HGtFgM7+qr6EK82DTmEJ8y07fW4/DCLehVik+cSCY6YIPF9hmSZJvI/TGrx5yyUJZjSvJZTvm4yM36+9uyKFr+BS0bB1RRx96FuWdRWQEUiSLy8uswOv2HL6e3Llhj45SjLBbntm8bJtQpXxrGgEFrwkxc6UyYjEOs9DLYGxysgXS6sYmxdS5WMJo91eD0kVRqOXyGNdZs7gNWblcEFbNf4lo5CEYi0P8MU3+4IKpumTKUtPVm8X9+qrNZ0y9R9flQMlzU8T5sEDmHf38sydH58gwYedOa757M/QD0TAnVEm3aqSesqDpe+Q3TI7b7l6QEU8Hlyw0iCcPbIAU7myp2Z9VYBUwzTzpjzBGrhu3fDSgkn0khvQp+ojMaZyRl0J5VYoqvkRXS62x/IfnRRIBTxnCXaEKg0p+fSaNPDF8otKA2Mvly2OLLFXnxZ17Qoeuab9O6/m5n1faoxX6tlYBt6T5mm6yF+0BWDl59tu/uW0zCSAb54K45xwBwu/kKBDfZKE/3gLjmVdFSGtb83AsEDatBElBaKua7jJ0jAvh0qfhdSfFmExIEiEQmspbty/crTgSdrXsZPEFjuuM3OyT86bnc3/+opT7b2pe0GMLRUlUbRo+mwi942grIz+jQ5Us9VQcShyDfGxuJJpQMLbe68jX1NAmTPBzn73QNU61VuQjq/C45Wb7NNRjrSr7UoyUd5bgLf/CKxu56cbQYwBI8WJbJMzqJDnDNX8ofM0tDShb38I67Y0SyqcR1N165dyuVASYIiiNZhy92fChpBuK0gCV2oWUW1R2fk1yKlnc4bLS84BQoKD99O2rled16NbCwxP64RQbL1OstZQ77MfuLVpmWdwWjd5W/vOdW7ZjiCvLcy26U7W4jqA4y82o+A421OJi5OqTXDoEVIg1GdPsdxEHcW/DoMCxW32V10WptPc8yhIhmRz19nqDAacGfVBjRfgq86Fexi1RFQXrJZMSRZgs5L1d+N2u/dV1sYPKBRyMUNBZ3H5jWhG/SsMw2IfYWUA0UwTc5+pOVW5aKSmZ4q2shS8y7/cU/6wBGA9AOgNf7twfwO3gBbjWU8xN6b1Mp9Tp2tmTrT4v4xCMv/3XNgxPWIBzHc5/d+xUkDAHnkIm/lhCdbd1uMw6synaQr9bSdz+maDI2bkaSNVO59YEFDDHQV12LhoJwsbOEoop97d/2JyJvhL42eWiAMmUZPVVpxQJsde++Oft9S0IV7/WHiIx7MIH9dZaZ69dsX2h0YSKIC44mUwW7ivmTK2y1gV2YzB1PPD7BOHai1k8IQgflBEUkdz/YQSynOisMenvG9V5SpHS1UWrxCQ28pnU3o/IUfmjknMZku+7qnpOOsbsdYCWvcrJ6+96uGnc08o3nF2DQVC4tLuPR9KFmNSsSJikAxU//+DCwixg0MJcxDGIEgAO6OLPPvUG4YgW/lp3xSM9IcqwyyZIMsN+L8ixhTXUlf9yxBQSNVxljuZjJW0RCyene92kyykoiVpbbbCfY24lgevuJF52+Z+oW46pH70nRJ3X9izvpGPHy3VyajrYWk55YugpeczjgqtWe3F9+EfpnUNLZkffEp+d/ekNb59ELrJz2JtM04n35XA+gpn3YlnAuDrKlQmJ2X/BjZhbt5OEsHQfNoiWt53VJjAZ4YQ7oqv//mAMy/kE8n73Kg2EtHgKjOsnUZFG0NWtvUi4RWXcnD6sIQTQnKshvgA5cFCceJshr9zeCKQqPl2QCjHb31zgW4YDQh8NZmbP1lGJq8aQW0Fctz8Flm8f+HprH305ddlerhpeUY0MniHaQUoi13abzuXRqWxdQ/8rUIHItP3KtcH7Irbs3K/pSk0Q8WzD/vVxSqsaoGuukTpx9MuVY8yYh3/4PbWH1PpgUCIyPn1JSA/al110KgkZiJWYcMJ710jfYfUznUZXhP5jbUbo/y6UWCtdFDsXOvkVxWU0Ty4KUkOdu+UwQvwsI4roO5EAujrc403Ud4b5VSDf3hCi32iy1gFc0i+U6uX6447udcXS/6eNWXCLFxva8EKyq/uLAZa1lOvimMP5h4oX66MWTQSVktgApw2vp5eIPhqR77RYhrPVecRfUtsnFD9SdfW9mEYr8Pclv6cE1CpYXQnULhm6e6Fu4wk+fUjA6ACJN1PCFQ05ERuZBLgRyxs3xZ79Uuz18XrA4NIiGYVG2N44vR0D+IjJoOUzobD3WrkNbgNwAAZRkGv1Jiyc2cBFaj2j1pLEKRi1VV2BGJIIwLw7QYQL0fOwDjJHQ7eXCuLrEF6NkEk33G1mukUYHVW6j2VLYk2UOwDlwfFX4G96Rvofaz4iQ0o7f2VgNoZMIbgK1+LN0jN+EZ9zZHmgltP2pw2CQZfcJkoiustNp1Wn+nIDN6c5ZZcjcqcloSanI5/OeRng5c0R4zxPbG8g+rsbLjqQxFEGrsE7hBFUEo2LHRTKAY5+kF/TxDnOLrCdZ/cpv9PD3gwQpaB4DxyLuZwSYi+g4tt1L3A7wn8EIy3bZiAa5TxCL7GMEsX5dTslDeZ1Qz7b8aJ/OJNJ7Ta2MJ7ThcJLxJJzMSnun2X2Ax9P3bZrmnVo2ik2+K/SqOsdZpeCAUG4H1kOu9WA7QT9kzevtUjY+2BI6IiKYvi4FHoaKjSkfAgay8nbjPnCXtkrIt9O9WYxFOPZKUCAxGYLNQpB/aZKpTkHRTHDHhihM06zBdU7qDNDRt1WZUV9UbzOC2t+DXiPE+hhYCWr5nb4LQyofjZv98m7Cdovdmz3X7baNU7m5Jta/aNaQNwCZ73DVCQwOl4RaxgXuWfJTSmJ2v9NsKuAvHDhQcozmuYrr4fP6zqokmb+DRZMmBAY+tfhpsV9/3pp4dzR9s0/dvtQjpsOqSJIfcvpFhoansUqCFCzC0R+TgGudmfznCXbn2MWQgiCliaSsWPzlZbgnVP3lmzeHUvOk1UUKqV6dkPvncL2Rg/KxIbyLKbyfRR7N4XHjX38nGapOwaEbPSuSIIuebkar8uLFmZfKBzCP+Eq+4AA==" 
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
                  src="YOUR_BASE64_STRING_HERE_2" 
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
