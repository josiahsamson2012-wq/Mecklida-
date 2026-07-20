import { Film, Sparkles, DownloadCloud } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20">
            <Film className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-50 tracking-tight flex items-center gap-2">
              Subtitles za Kiswahili
              <span className="text-xs bg-amber-500/15 text-amber-500 font-semibold px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Uwezo wa AI
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Maktaba kuu ya kupakua na kutafsiri subtitles za Kiswahili kwa ajili ya movies na series
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-slate-800/60 rounded-xl px-3.5 py-1.5 border border-slate-700/50">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-slate-300 font-semibold">Tafsiri kwa Sekunde</span>
          </div>
          <a
            href="#tafsiri"
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all shadow-md hover:shadow-lg shadow-amber-500/10 hover:scale-[1.02]"
          >
            <DownloadCloud className="w-4 h-4" />
            Tafsiri SRT yako sasa
          </a>
        </div>
      </div>
    </header>
  );
}
