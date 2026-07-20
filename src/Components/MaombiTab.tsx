import React, { useState } from 'react';
import { SubtitleRequest } from '../types';
import { MessageSquare, ThumbsUp, Plus, User, Film, Tv, Calendar, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface MaombiTabProps {
  requests: SubtitleRequest[];
  onVote: (reqId: string) => void;
  onRequestSubmit: (title: string, type: 'movie' | 'series', year?: string, requestedBy?: string) => Promise<void>;
}

export default function MaombiTab({ requests, onVote, onRequestSubmit }: MaombiTabProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'movie' | 'series'>('movie');
  const [year, setYear] = useState('');
  const [requestedBy, setRequestedBy] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setSuccessMsg('');
    try {
      await onRequestSubmit(title, type, year, requestedBy);
      setSuccessMsg('Ombi lako limepokelewa kikamilifu! Litajumuishwa kwenye ubao wa maombi hapa chini.');
      setTitle('');
      setYear('');
      setRequestedBy('');
      setTimeout(() => setSuccessMsg(''), 6000);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sort by completed status (pending first) then by votes descending
  const sortedRequests = [...requests].sort((a, b) => {
    if (a.status === 'pending' && b.status === 'completed') return -1;
    if (a.status === 'completed' && b.status === 'pending') return 1;
    return b.votes - a.votes;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form section */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24">
          <div className="space-y-2 mb-6">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Omba Subtitle ya Kiswahili
            </span>
            <h3 className="text-lg font-bold text-slate-100">
              Je, una movie unayoipenda lakini haina Kiswahili?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tuma jina la movie au series hapa, na jamii yetu ya wakalimani au mifumo yetu ya AI itaizalisha mapema iwezekanavyo!
            </p>
          </div>

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-start gap-2 mb-4 font-semibold"
            >
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                Jina la Movie au Series *
              </label>
              <input
                type="text"
                required
                placeholder="Mfano: Gladiator II, Bad Boys..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                Aina (Type)
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType('movie')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    type === 'movie'
                      ? 'bg-amber-500/10 border-amber-500/45 text-amber-500'
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-400'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  Movie
                </button>
                <button
                  type="button"
                  onClick={() => setType('series')}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    type === 'series'
                      ? 'bg-amber-500/10 border-amber-500/45 text-amber-500'
                      : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-400'
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  Series
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Mwaka (Si lazima)
                </label>
                <input
                  type="number"
                  placeholder="2026"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                  Jina Lako (Si lazima)
                </label>
                <input
                  type="text"
                  placeholder="Juma_TZ"
                  value={requestedBy}
                  onChange={(e) => setRequestedBy(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-2.5 px-3.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/5 mt-4"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Inatuma...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Tuma Ombi
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Board list section */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-slate-905 p-2 rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-100 flex items-center gap-1.5">
              <MessageSquare className="w-4.5 h-4.5 text-amber-500" />
              Ubao wa Maombi ya Subtitles ({requests.length})
            </h3>
            <p className="text-xs text-slate-500">Filamu zenye kura nyingi zinapewa kipaumbele cha kutafsiriwa na AI kwanza</p>
          </div>
        </div>

        <div className="space-y-3">
          {sortedRequests.map((req, idx) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
              className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 sm:p-5 hover:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="flex gap-3 items-start">
                <div className={`p-2.5 rounded-xl border flex-shrink-0 ${
                  req.status === 'completed'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : req.type === 'movie'
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                }`}>
                  {req.type === 'movie' ? <Film className="w-4.5 h-4.5" /> : <Tv className="w-4.5 h-4.5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-200">{req.title}</h4>
                    {req.year && (
                      <span className="text-[10px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800/80">
                        {req.year}
                      </span>
                    )}
                    {req.status === 'completed' ? (
                      <span className="text-[9px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-md flex items-center gap-0.5 uppercase tracking-wider">
                        Tayari ipo!
                      </span>
                    ) : (
                      <span className="text-[9px] font-extrabold bg-slate-950 text-slate-500 border border-slate-800/80 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Inasubiriwa
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 items-center">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {req.requestedBy}
                    </span>
                    <span>•</span>
                    <span>{req.requestDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-slate-800/50 pt-3 sm:pt-0">
                <span className="text-xs text-slate-400 font-semibold">
                  Kura: <strong className="text-slate-100">{req.votes}</strong>
                </span>

                <button
                  onClick={() => req.status !== 'completed' && onVote(req.id)}
                  disabled={req.status === 'completed'}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    req.status === 'completed'
                      ? 'bg-slate-950 border border-slate-800/50 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-500 hover:scale-[1.02]'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Piga Kura
                </button>
              </div>
            </motion.div>
          ))}

          {requests.length === 0 && (
            <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-2xl">
              <MessageSquare className="w-10 h-10 text-slate-700 mx-auto mb-2" />
              <p className="text-slate-400 text-sm font-medium">Bado hakuna ombi lililotumwa.</p>
              <p className="text-xs text-slate-500 mt-1">Kuwa wa kwanza kutuma ombi kwa kutumia fomu iliyo kushoto kwako.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
