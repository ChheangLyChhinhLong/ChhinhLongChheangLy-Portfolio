"use client";

import { useState } from "react";
import { BiCodeAlt, BiRefresh, BiTerminal } from "react-icons/bi";

const commands = {
  "npm run ship": ["> portfolio@1.0.0 build", "✓ Typecheck passed", "✓ Optimized production bundle", "→ Ready for the next idea."],
  "git status": ["On branch main", "Changes made with intention.", "nothing to hide, everything to learn."],
  "whoami": ["chhinhlong.dev", "full-stack developer / product thinker", "building calm software for busy people."],
};

type Command = keyof typeof commands;

export default function TerminalShowcase() {
  const [command, setCommand] = useState<Command>("npm run ship");

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/[0.1] bg-[#101014] text-zinc-200 shadow-2xl shadow-indigo-950/20">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3 text-xs text-zinc-500">
        <div className="flex items-center gap-1.5" aria-hidden="true"><span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" /><span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" /></div>
        <span className="flex items-center gap-2"><BiTerminal /> terminal / chhinhlong</span>
        <BiCodeAlt className="text-indigo-300" />
      </div>
      <div className="min-h-[230px] p-5 font-mono text-xs leading-7 sm:p-6 sm:text-sm">
        <p className="text-zinc-500">~/portfolio <span className="text-indigo-300">$</span> {command}</p>
        <div className="mt-3 text-emerald-300/90">{commands[command].map((line) => <p key={line}>{line}</p>)}</div>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4" aria-label="Terminal commands">
          {(Object.keys(commands) as Command[]).map((item) => <button key={item} type="button" onClick={() => setCommand(item)} className={`rounded-lg px-2.5 py-1.5 text-[11px] transition ${command === item ? "bg-indigo-400/15 text-indigo-200" : "text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-200"}`}>{item}</button>)}
          <button type="button" onClick={() => setCommand("npm run ship")} className="ml-auto rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/[0.06] hover:text-white" aria-label="Reset terminal"><BiRefresh /></button>
        </div>
      </div>
    </div>
  );
}