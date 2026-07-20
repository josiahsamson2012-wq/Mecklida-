import React, { useState, useRef } from 'react';
import { Upload, Sparkles, FileText, Download, Play, RefreshCw, AlertCircle, Info, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface TafsiriTabProps {
  onDownload: (subId: string, filename: string, srtContent: string) => void;
}

export default function TafsiriTab({ onDownload }: TafsiriTabProps) {
  const [srtContent, setSrtContent] = useState('');
  const [instructions, setInstructions] = useState('Kiswahili cha mitaani (Bongo Style) kinachofaa zaidi mazungumzo ya kawaida ya filamu.');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedSrt, setTranslatedSrt] = useState('');
  const [originalFileName, setOriginalFileName] = useState('');
  const [systemMessage, setSystemMessage] = useState<{ type: 'info' | 'warning' | 'success'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Standard sample SRT to let them try instantly!
  const loadSampleSrt = () => {
    const sample = `1
00:00:01,000 --> 00:00:04,500
Hello my friend! I was waiting for you.

2
00:00:05,200 --> 00:00:08,800
We have a very dangerous mission tonight.

3
00:00:09,100 --> 00:00:13,400
If the police catches us, we are going to jail forever!

4
00:00:14,000 --> 00:00:17,500
No way, I brought the secret map. Trust me.`;
    setSrtContent(sample);
    setOriginalFileName('mission_impossible_sample.srt');
    setSystemMessage({
      type: 'info',
      text: 'Sample ya subtitle imepakiwa kwa ajili ya kujaribu haraka!'
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.srt')) {
      setSystemMessage({
        type: 'warning',
        text: 'Tafadhali pakia faili lililo katika muundo wa .srt pekee.'
      });
      return;
    }

    setOriginalFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setSrtContent(text);
      setSystemMessage({
        type: 'success',
        text: `Faili la "${file.name}" limepakiwa kikamilifu! Lipakie sasa kutafsiri.`
      });
    };
    reader.readAsText(file);
  };

  const handleTranslate = async () => {
    if (!srtContent.trim()) {
      setSystemMessage({
        type: 'warning',
        text: 'Tafadhali weka maudhui ya subtitle kwanza (pika kwa kuandika au pakia faili la .srt).'
      });
      return;
    }

    setIsTranslating(true);
    setSystemMessage(null);
    setTranslatedSrt('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          srtContent,
          instructions
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Tafsiri imefeli kwenye server.');
      }

      setTranslatedSrt(data.translatedSrt);

      if (data.simulated) {
        setSystemMessage({
          type: 'warning',
          text: data.message
        });
      } else {
        setSystemMessage({
          type: 'success',
          text: 'Hongera! Subtitle imetafsiriwa kwa ufanisi mkubwa kwa uwezo wa Gemini AI.'
        });
      }
    } catch (error: any) {
      console.error(error);
      setSystemMessage({
        type: 'warning',
        text: error.message || 'Hitilafu ya mtandao ilitokea. Tafadhali jaribu tena.'
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const downloadResult = () => {
    if (!translatedSrt) return;
    const cleanName = originalFileName 
      ? originalFileName.replace('.srt', '_Kiswahili_AI.srt') 
      : 'Tafsiri_Kiswahili_Sub.srt';
    onDownload('temp-translated', cleanName, translatedSrt);
  };

  const handleClear = () => {
    setSrtContent('');
    setTranslatedSrt('');
    setOriginalFileName('');
    setSystemMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-8" id="tafsiri">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/20 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-6 top-6 opacity-10 hidden md:block">
          <Sparkles className="w-24 h-24 text-amber-500 animate-spin-slow" />
        </div>
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Kitafsiri cha Kiswahili cha Gemini AI
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
            Tafsiri Subtitles za Kiingereza kwenda Kiswahili
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Buruta faili lako la subtitle la Kiingereza (.srt) au weka nakala ya maandishi hapa chini. Mfumo wetu wa AI utasoma, kutafsiri mistari yote, na kukupatia faili halisi la Kiswahili ambalo unaweza kupakua na kuliweka kwenye video yako ya movie!
          </p>
        </div>
      </div>

      {/* System Alerts */}
      {systemMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border flex items-start gap-3 ${
            systemMessage.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
              : systemMessage.type === 'warning'
              ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
          }`}
        >
          {systemMessage.type === 'warning' ? (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
          ) : systemMessage.type === 'success' ? (
            <Sparkles className="w-5 h-5 flex-shrink-0 text-emerald-500 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 flex-shrink-0 text-indigo-500 mt-0.5" />
          )}
          <div className="text-xs leading-relaxed font-medium">
            {systemMessage.text}
            {systemMessage.type === 'warning' && systemMessage.text.includes('GEMINI_API_KEY') && (
              <p className="mt-2 text-slate-400">
                Ili kupata tafsiri halisi isiyo ya simulation, nenda kwenye <strong>Secrets</strong> panel iliyopo upande wa kushoto au chini katika AI Studio UI, weka <strong>GEMINI_API_KEY</strong> yako halisi, kisha upige upya translation!
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Input SRT */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col h-[520px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-sm font-extrabold text-slate-200 flex items-center gap-1.5">
              <FileText className="w-4.5 h-4.5 text-amber-500" />
              1. Subtitle ya Kiingereza (English SRT)
            </h3>
            
            <div className="flex items-center gap-2">
              <button
                onClick={loadSampleSrt}
                className="text-[10px] font-bold text-amber-500 border border-amber-500/20 hover:border-amber-500/40 bg-amber-500/5 px-2.5 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors"
              >
                Jaribu Sample Sub
              </button>
              {srtContent && (
                <button
                  onClick={handleClear}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  Futa Yote
                </button>
              )}
            </div>
          </div>

          {/* File uploader or Text Area container */}
          <div className="flex-1 min-h-0 flex flex-col relative">
            {!srtContent ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-slate-950/20 transition-all group"
              >
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800/80 group-hover:scale-105 transition-transform mb-4 shadow-inner">
                  <Upload className="w-8 h-8 text-slate-500 group-hover:text-amber-500 transition-colors" />
                </div>
                <h4 className="text-sm font-bold text-slate-300">Pakia faili lako la .srt</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                  Bofya hapa au buruta faili la subtitle la Kiingereza (.srt) hapa ndani
                </p>
                <div className="mt-4 text-[10px] bg-slate-950 text-slate-400 px-3 py-1 rounded-full font-semibold border border-slate-800">
                  Ukomo wa faili: 5MB
                </div>
              </div>
            ) : (
              <textarea
                value={srtContent}
                onChange={(e) => setSrtContent(e.target.value)}
                placeholder="Ingiza subtitles zako katika muundo wa SRT hapa..."
                className="flex-1 w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-2xl p-4 text-xs text-slate-300 font-mono focus:outline-none resize-none shadow-inner"
              />
            )}
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".srt"
              className="hidden"
            />
          </div>

          {/* Configuration and Launch Translate Button */}
          <div className="mt-6 space-y-4 flex-shrink-0">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Mtindo wa Lugha ya Kiswahili (Instructions)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Mfano: Kiswahili cha kuchekesha, rasmi..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 px-3.5 pr-10 text-xs text-slate-300 placeholder-slate-600 focus:outline-none"
                />
                <Sparkles className="absolute right-3.5 top-3 w-4 h-4 text-amber-500/50 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={handleTranslate}
              disabled={isTranslating}
              className={`w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                isTranslating
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/10 hover:scale-[1.01]'
              }`}
            >
              {isTranslating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  AI Inatafsiri sasa hivi... (Tafadhali subiri kidogo)
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Anza Kutafsiri kwenda Kiswahili
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Output SRT */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col h-[520px]">
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-sm font-extrabold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-amber-500" />
              2. Matokeo ya Kiswahili (Swahili AI SRT)
            </h3>
            
            {translatedSrt && (
              <button
                onClick={downloadResult}
                className="flex items-center gap-1.5 text-[10px] font-bold px-3.5 py-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Pakua SRT Yako
              </button>
            )}
          </div>

          <div className="flex-1 min-h-0 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative shadow-inner">
            {isTranslating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 p-6 text-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 border-4 border-amber-500/15 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="space-y-1 max-w-xs">
                  <h4 className="text-sm font-bold text-slate-300">Inatafsiri kwa makini</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    AI yetu inatafsiri mistari ya subtitles yako huku ikitunza muda na nyakati (SRT timestamps) zote zisiathirike...
                  </p>
                </div>
              </div>
            ) : translatedSrt ? (
              <textarea
                readOnly
                value={translatedSrt}
                className="w-full h-full bg-slate-950 rounded-2xl p-4 text-xs text-slate-300 font-mono focus:outline-none resize-none"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl mb-4">
                  <FileText className="w-8 h-8 text-slate-600" />
                </div>
                <h4 className="text-sm font-bold text-slate-400">Hakuna tafsiri iliyoanza</h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1 leading-relaxed">
                  Bofya kitufe cha "Anza Kutafsiri" upande wa kushoto, na tafsiri ya lugha adhimu ya Kiswahili itaonekana hapa papo hapo.
                </p>
              </div>
            )}
          </div>

          {/* Useful Tip for users */}
          <div className="mt-6 bg-slate-950/60 p-4 border border-slate-800/80 rounded-2xl flex-shrink-0">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              💡 <strong>Tip ya Kiswahili:</strong> Unaweza kubadilisha mtindo wa maneno kwa kuandika mfano <em>"Tafsiri ukitumia lahaja ya ki-Zanzibar au ki-Mombasa"</em> au <em>"Ondoa maneno yote ya matusi"</em> kwenye kisanduku cha mtindo wa lugha!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
