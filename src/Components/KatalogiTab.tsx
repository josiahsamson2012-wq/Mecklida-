import React, { useState } from 'react';
import { MediaItem, Subtitle } from '../types';
import { Search, Film, Tv, Download, Star, Calendar, Tag, ChevronRight, X, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface KatalogiTabProps {
  mediaItems: MediaItem[];
  onDownload: (subId: string, filename: string, srtContent: string) => void;
}

export default function KatalogiTab({ mediaItems, onDownload }: KatalogiTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'movie' | 'series'>('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Filter logic
  const filteredItems = mediaItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.originalTitle && item.originalTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || item.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Tafuta movie au series (mifano: Lion King, Black Panther...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl py-3 pl-12 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button
              onClick={() => setFilterType('all')}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                filterType === 'all'
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
              }`}
            >
              Zote
            </button>
            <button
              onClick={() => setFilterType('movie')}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                filterType === 'movie'
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              Movies
            </button>
            <button
              onClick={() => setFilterType('series')}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                filterType === 'series'
                  ? 'bg-amber-500 text-slate-950 border-amber-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              Series
            </button>
          </div>
        </div>
      </div>

      {/* Grid of movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            onClick={() => setSelectedItem(item)}
            className="group bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/50 shadow-lg cursor-pointer hover:-translate-y-1 transition-all duration-300"
          >
            <div className="aspect-[16/9] w-full relative overflow-hidden bg-slate-950">
              <img
                src={item.posterUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
              
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase ${
                  item.type === 'movie' ? 'bg-amber-500/90 text-slate-950' : 'bg-indigo-600/90 text-slate-50'
                }`}>
                  {item.type === 'movie' ? 'Filamu' : 'Tamthilia'}
                </span>
                <span className="bg-slate-950/80 backdrop-blur-md border border-slate-800 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-300">
                  {item.year}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                <span className="flex items-center gap-1 bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {item.rating}
                </span>
                <span className="text-slate-400 text-xs bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-800">
                  {item.subtitles.length} Swahili Sub{item.subtitles.length !== 1 && 's'}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                {item.title}
              </h3>
              {item.originalTitle && item.originalTitle !== item.title && (
                <p className="text-xs text-slate-500 mt-0.5 italic">{item.originalTitle}</p>
              )}
              
              <p className="text-xs text-slate-400 mt-3 line-clamp-2">
                {item.descriptionSw}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                {item.genre.slice(0, 3).map(g => (
                  <span key={g} className="text-[10px] font-medium text-slate-500 bg-slate-950 border border-slate-800/80 px-2 py-0.5 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center bg-slate-900 border border-slate-800 rounded-2xl">
            <Film className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">Bado hakuna filamu inayolingana na tafutio lako.</p>
            <p className="text-xs text-slate-500 mt-1">Jaribu kuandika jina jingine au tafsiri mwenyewe kwenye tab ya 'Tafsiri'.</p>
          </div>
        )}
      </div>

      {/* Expanded Movie Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Cover Banner */}
              <div className="h-56 w-full relative bg-slate-950 flex-shrink-0">
                <img
                  src={selectedItem.posterUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover opacity-35"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 p-2 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                      {selectedItem.type === 'movie' ? 'Movie' : 'Series'}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 mt-1.5">
                      {selectedItem.title}
                    </h2>
                    {selectedItem.originalTitle && (
                      <p className="text-xs text-slate-400 italic font-medium">{selectedItem.originalTitle}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1 bg-slate-950/60 border border-slate-800 text-slate-300 px-3 py-1 rounded-xl text-xs font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {selectedItem.year}
                    </span>
                    <span className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-xl text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {selectedItem.rating} IMDB
                    </span>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left panel: Info */}
                  <div className="md:col-span-1 space-y-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Aina (Genres)</h4>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedItem.genre.map(g => (
                          <span key={g} className="text-xs font-medium bg-slate-950 border border-slate-800 text-slate-300 px-3 py-1 rounded-xl">
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Kuhusu Filamu (Kiingereza)</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
                        {selectedItem.description}
                      </p>
                    </div>
                  </div>

                  {/* Right panel: Subtitle Listings */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-100 flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-amber-500" />
                        Subtitles za Kiswahili Zinazopatikana
                      </h3>
                      <p className="text-xs text-slate-500">Chagua toleo (release version) ambalo linalingana na video yako ili kuzuia timing isichelewe</p>
                    </div>

                    <div className="space-y-3">
                      {selectedItem.subtitles.map(sub => (
                        <div
                          key={sub.id}
                          className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 hover:border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
                        >
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold text-slate-200 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                                {sub.version}
                              </span>
                              {sub.translator.includes('AI') && (
                                <span className="bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-500/20 flex items-center gap-0.5">
                                  <Sparkles className="w-3 h-3" />
                                  Tafsiri ya AI
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                              <span className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                {sub.rating.toFixed(1)} / 5.0
                              </span>
                              <span>•</span>
                              <span>Mkalimani: <strong className="text-slate-300">{sub.translator}</strong></span>
                              <span>•</span>
                              <span>Ukubwa: <strong className="text-slate-300">{sub.fileSize}</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/50 justify-between sm:justify-start">
                            <span className="text-xs text-slate-500">
                              Kupakuliwa mara <strong>{sub.downloads}</strong>
                            </span>
                            <button
                              onClick={() => onDownload(sub.id, `${selectedItem.title.replace(/\s+/g, '_')}_Kiswahili_${sub.version}.srt`, sub.srtContent)}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-amber-500/5 hover:scale-[1.02]"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Pakua .SRT
                            </button>
                          </div>
                        </div>
                      ))}

                      {selectedItem.subtitles.length === 0 && (
                        <div className="p-8 text-center bg-slate-950 border border-slate-800 rounded-2xl">
                          <MessageSquare className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                          <p className="text-slate-400 text-sm font-medium">Bado hakuna subtitles zilizowekwa hapa.</p>
                          <p className="text-xs text-slate-500 mt-1">Omba tafsiri au pakia subtitle yako kwenye tab husika.</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl space-y-2 mt-4">
                      <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Jinsi ya kutumia:
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        1. Pakua faili la <strong>.srt</strong> hapo juu.<br />
                        2. Hakikisha faili lina jina sawa kabisa na faili lako la video ya movie (mfano: kama video inaitwa <em>The_Lion_King_1080p.mp4</em>, faili la subtitle liitwe <em>The_Lion_King_1080p.srt</em>).<br />
                        3. Weka yote kwenye folda moja, au buruta (drag-and-drop) faili la srt moja kwa moja ndani ya VLC au player unayotumia wakati video inacheza!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
