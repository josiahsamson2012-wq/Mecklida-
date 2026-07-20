import React, { useState, useRef } from 'react';
import { MediaItem } from '../types';
import { Upload, Sparkles, User, FileText, CheckCircle2, ChevronRight, RefreshCw, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ChangiaTabProps {
  mediaItems: MediaItem[];
  onUploadSubmit: (mediaId: string, translator: string, srtContent: string, version: string) => Promise<void>;
}

export default function ChangiaTab({ mediaItems, onUploadSubmit }: ChangiaTabProps) {
  const [selectedMediaId, setSelectedMediaId] = useState('');
  const [translator, setTranslator] = useState('');
  const [version, setVersion] = useState('');
  const [srtContent, setSrtContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.srt')) {
      setErrorMsg('Tafadhali pakia faili lenye muundo wa .srt pekee.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setSrtContent(text);
      setErrorMsg('');
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!selectedMediaId) {
      setErrorMsg('Tafadhali chagua filamu unayotaka kuichangia.');
      return;
    }
    if (!translator.trim()) {
      setErrorMsg('Tafadhali weka jina lako la mkalimani.');
      return;
    }
    if (!srtContent.trim()) {
      setErrorMsg('Tafadhali weka maudhui ya subtitle yako (pakia .srt au weka nakala ya maandishi).');
      return;
    }

    setIsSubmitting(true);
    try {
      await onUploadSubmit(selectedMediaId, translator, srtContent, version);
      setSuccessMsg('Asante sana kwa mchango wako! Subtitle yako imepakiwa na sasa inapatikana kwa kila mtu kupakua kwenye katalogi.');
      setTranslator('');
      setVersion('');
      setSrtContent('');
      setSelectedMediaId('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Kuna hitilafu imetokea wakati wa kupakia. Tafadhali jaribu tena.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Intro Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 flex items-start gap-4 shadow-xl">
        <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-500 flex-shrink-0 border border-amber-500/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-extrabold text-slate-100">Kuza Lugha ya Kiswahili Kwenye Filamu!</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ikiwa una subtitle ya Kiswahili ambayo umeitengeneza mwenyewe, umeitafsiri, au uliipakua kutoka vyanzo vingine vya kuaminika, ichangie hapa. Utasaidia maelfu ya wapenzi wa filamu nchini Tanzania, Kenya, Uganda, na duniani kote kupata burudani kwa lugha yao wanayoielewa vyema zaidi.
          </p>
        </div>
      </div>

      {/* Forms */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <h4 className="text-sm font-bold text-slate-200 mb-6 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4.5 h-4.5 text-amber-500" />
          Fomu ya Kuchangia Subtitle ya Kiswahili (.SRT)
        </h4>

        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-2xl flex items-start gap-3 mb-6 font-semibold leading-relaxed"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-2xl flex items-start gap-3 mb-6 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Choose Media */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                Chagua Filamu/Tamthilia *
              </label>
              <select
                required
                value={selectedMediaId}
                onChange={(e) => setSelectedMediaId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-3 px-4 text-xs text-slate-300 focus:outline-none"
              >
                <option value="">-- Chagua kutoka kwenye katalogi yetu --</option>
                {mediaItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.title} ({item.year}) - {item.type === 'movie' ? 'Filamu' : 'Series'}
                  </option>
                ))}
              </select>
            </div>

            {/* Translator Name */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                Jina lako la Mkalimani / Credit *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Mfano: BongoSubz_Crew"
                  value={translator}
                  onChange={(e) => setTranslator(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-3 pl-11 pr-4 text-xs text-slate-300 placeholder-slate-600 focus:outline-none"
                />
                <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Version */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                Toleo la Video linalofaa (Release Version)
              </label>
              <input
                type="text"
                placeholder="Mfano: WEBRip.x264, BluRay, HDRip..."
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-3 px-4 text-xs text-slate-300 placeholder-slate-600 focus:outline-none"
              />
              <p className="text-[10px] text-slate-500">Mfano: HDRip, WEBRip au BluRay. Inasaidia wenzako kupata timing nzuri.</p>
            </div>

            {/* Upload File shortcut */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                Pakia faili la .srt (Si lazima kama unaandika)
              </label>
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".srt"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-3 px-4 rounded-xl border border-dashed border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-400 hover:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Upload className="w-4 h-4 text-slate-500" />
                  Chagua faili la .srt
                </button>
              </div>
            </div>
          </div>

          {/* Textarea for SRT content */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide">
                Maudhui ya SRT (Srt Content) *
              </label>
              <span className="text-[10px] text-slate-500">Inapaswa kuanza na 1, ikifuatiwa na timing na maneno</span>
            </div>
            <textarea
              required
              rows={8}
              placeholder={`Ingiza au bandika srt content hapa...\n\n1\n00:01:10,000 --> 00:01:14,200\n[Mambo vipi wanangu! Karibuni sana!]`}
              value={srtContent}
              onChange={(e) => setSrtContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-4 text-xs text-slate-300 font-mono focus:outline-none resize-none shadow-inner"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/5"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Inapakia na kusajili mchango wako kwenye katalogi...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Pakia Subtitle Yako ya Kiswahili
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
