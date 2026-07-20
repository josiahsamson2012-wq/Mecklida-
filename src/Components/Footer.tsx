import { Heart, Github, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">Subtitles za Kiswahili</h3>
          <p className="text-xs text-slate-500 mt-1">
            Programu ya kwanza ya kutafsiri na kupakua maelezo ya chini (subtitles) kwa Lugha yetu adhimu ya Kiswahili kwa urahisi zaidi.
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-slate-400">
            Imetengenezwa na
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            kwa ajili ya Afrika Mashariki
          </div>
          
          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1 hover:text-amber-500 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              Kiswahili Sanifu
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">© 2026 Subtitles za Kiswahili</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
