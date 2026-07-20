export interface Subtitle {
  id: string;
  language: string;
  languageCode: string;
  translator: string;
  rating: number;
  downloads: number;
  fileSize: string;
  version: string;
  createdAt: string;
  srtContent: string;
}

export interface MediaItem {
  id: string;
  title: string;
  originalTitle?: string;
  type: 'movie' | 'series';
  year: number;
  genre: string[];
  description: string;
  descriptionSw: string;
  posterUrl: string;
  rating: number;
  subtitles: Subtitle[];
}

export interface SubtitleRequest {
  id: string;
  title: string;
  type: 'movie' | 'series';
  year?: number;
  requestedBy: string;
  requestDate: string;
  status: 'pending' | 'completed';
  votes: number;
}
