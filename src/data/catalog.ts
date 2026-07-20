import { MediaItem, SubtitleRequest } from '../types';

export const initialMediaItems: MediaItem[] = [
  {
    id: 'lion-king-2019',
    title: 'The Lion King',
    originalTitle: 'Mfalme Simba',
    type: 'movie',
    year: 2019,
    genre: ['Adventure', 'Drama', 'Family'],
    description: 'After the murder of his father, a young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.',
    descriptionSw: 'Baada ya mauaji ya baba yake, mwanamfalme mdogo wa simba anakimbia ufalme wake na kuja kujifunza maana halisi ya wajibu na ushujaa.',
    posterUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400',
    rating: 8.5,
    subtitles: [
      {
        id: 'lk-sw-1',
        language: 'Kiswahili',
        languageCode: 'sw',
        translator: 'Simba_Subz_TZ',
        rating: 4.8,
        downloads: 1420,
        fileSize: '32 KB',
        version: '720p.1080p.WEBRip.x264',
        createdAt: '2026-05-12',
        srtContent: `1
00:00:30,400 --> 00:00:34,800
[Muziki wa ufunguzi ukiwa na sauti kubwa ya Kiafrika]

2
00:00:45,100 --> 00:00:48,500
Njoomoni, sote tunakaribishwa kwenye Ardhi ya Fahari!

3
00:00:49,000 --> 00:00:53,200
Leo ni siku kuu ya kumtambulisha mwanamfalme mpya, Simba!

4
00:01:15,000 --> 00:01:19,500
Rafiki: Tazama mwangaza huu wa jua, unaangazia kizazi kipya.

5
00:01:21,200 --> 00:01:25,000
Mufasa: Simba, kila kitu ambacho mwanga huu unagusa ni ufalme wetu.

6
00:01:26,100 --> 00:01:31,400
Simba: Kila kitu? Hata lile eneo lenye giza na kivuli kule mbali?

7
00:01:32,000 --> 00:01:36,200
Mufasa: Hapo ndipo mpaka wetu ulipo. Usiende kule kamwe, mwanangu.

8
00:01:38,500 --> 00:01:42,900
Mufasa: Kuwa mfalme ni zaidi ya kufanya kile unachotaka kufanya tu.

9
00:01:43,300 --> 00:01:47,500
Kazi ya mfalme ni kulinda na kudumisha mzunguko wa maisha ya viumbe vyote.`
      },
      {
        id: 'lk-sw-2',
        language: 'Kiswahili',
        languageCode: 'sw',
        translator: 'Tafsiri_AI_Fast',
        rating: 4.2,
        downloads: 512,
        fileSize: '34 KB',
        version: '1080p.BluRay.x265',
        createdAt: '2026-06-01',
        srtContent: `1
00:00:30,400 --> 00:00:34,800
[Sauti ya kishindo cha Simba kikubwa kuanza]

2
00:00:45,100 --> 00:00:48,500
Mfalme amezaliwa leo kwenye Nyika yetu!

3
00:00:49,000 --> 00:00:53,200
Wanyama wote wanasherehekea kwa furaha na nderemo.

4
00:01:15,000 --> 00:01:19,500
Rafiki: Mwangalie Simba mdogo, amebeba hatima ya ufalme wetu.`
      }
    ]
  },
  {
    id: 'black-panther-2018',
    title: 'Black Panther',
    originalTitle: 'Chui Mweusi',
    type: 'movie',
    year: 2018,
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    description: "T'Challa, heir to the hidden and advanced kingdom of Wakanda, must step forward to lead his people into a new future and confront a challenger.",
    descriptionSw: "T'Challa, mrithi wa ufalme wa Wakanda uliofichika na kuendelea kiteknolojia, lazima ajitokeze kuongoza watu wake katika maisha mpya na kupambana na mpinzani wake.",
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=400',
    rating: 8.9,
    subtitles: [
      {
        id: 'bp-sw-1',
        language: 'Kiswahili',
        languageCode: 'sw',
        translator: 'Wakanda_Tanzania_Crew',
        rating: 4.9,
        downloads: 2310,
        fileSize: '38 KB',
        version: '720p.1080p.BluRay',
        createdAt: '2026-03-10',
        srtContent: `1
00:01:05,200 --> 00:01:10,500
Zamani sana, kimondo kilichojaa Vibranium kiliangukia bara la Afrika.

2
00:01:11,100 --> 00:01:15,800
Kabila tano za asili zilianza kupigana vikali kwa ajili ya kudhibiti chuma hicho.

3
00:01:16,500 --> 00:01:21,200
Hadi shujaa mmoja alipokunywa mmea wenye umbo la moyo na kuwa Black Panther wa kwanza.

4
00:01:23,000 --> 00:01:27,500
T'Challa: Wakanda Milele! Hatutaruhusu nguvu zetu zidhuru ulimwengu.

5
00:01:28,100 --> 00:01:32,400
Killmonger: Tazama jinsi watu wetu wanavyoteseka duniani wakati ninyi mmejificha hapa!`
      }
    ]
  },
  {
    id: 'money-heist-s1',
    title: 'Money Heist (La Casa de Papel)',
    originalTitle: 'Wizi wa Pesa',
    type: 'series',
    year: 2017,
    genre: ['Action', 'Crime', 'Drama'],
    description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.',
    descriptionSw: 'Kundi lisilo la kawaida la wezi linajaribu kufanya wizi mkubwa na kamili zaidi katika historia ya Uhispania - kuiba euro bilioni 2.4 kutoka Royal Mint ya Uhispania.',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=400',
    rating: 8.7,
    subtitles: [
      {
        id: 'mh-sw-1',
        language: 'Kiswahili',
        languageCode: 'sw',
        translator: 'Profesa_Mkuu',
        rating: 4.7,
        downloads: 1845,
        fileSize: '45 KB',
        version: 'S01E01.720p.NF.WEBRip',
        createdAt: '2026-01-15',
        srtContent: `1
00:00:12,100 --> 00:00:15,600
Tokyo: Jina langu ni Tokyo. Na hivi ndivyo nilivyokutana na Profesa.

2
00:00:16,200 --> 00:00:20,400
Alikuwa mtu wa kipekee sana, hakuwa na rekodi zozote za uhalifu.

3
00:00:21,500 --> 00:00:25,100
Profesa: Ninakupa ofa ya kufanya wizi mkubwa zaidi maishani mwako.

4
00:00:26,000 --> 00:00:29,900
Hakuna damu itakayomwagika, hakuna mtu tutakayemwibia pesa zake kibinafsi.

5
00:00:30,200 --> 00:00:34,500
Sisi wenyewe tutachapisha pesa zetu ndani ya Royal Mint!`
      }
    ]
  },
  {
    id: 'inception-2010',
    title: 'Inception',
    originalTitle: 'Kuanzishwa / Ndoto Ndani ya Ndoto',
    type: 'movie',
    year: 2010,
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    descriptionSw: 'Mwizi anayeiba siri za mashirika kupitia teknolojia ya kushiriki ndoto anapewa jukumu gumu la kupandikiza wazo jipya kwenye akili ya Mkurugenzi Mtendaji.',
    posterUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400',
    rating: 8.8,
    subtitles: [
      {
        id: 'ic-sw-1',
        language: 'Kiswahili',
        languageCode: 'sw',
        translator: 'Ndoto_Sub_TZ',
        rating: 4.6,
        downloads: 980,
        fileSize: '31 KB',
        version: '1080p.BluRay.YIFY',
        createdAt: '2026-04-20',
        srtContent: `1
00:00:45,000 --> 00:00:49,500
Cobb: Ndoto inaonekana kuwa halisi tukiwa ndani yake, sivyo?

2
00:00:50,100 --> 00:00:54,800
Ni pale tu tunapoamka ndipo tunapogundua kuwa kitu fulani kilikuwa cha kushangaza.

3
00:00:55,500 --> 00:01:00,200
Saito: Je, unaweza kweli kupandikiza wazo jipya kabisa kwenye akili ya mtu?

4
00:01:01,000 --> 00:01:05,300
Cobb: Ndiyo, tunaweza. Inaitwa 'Inception' au Kuanzishwa kwa Wazo.

5
00:01:06,100 --> 00:01:10,200
Lakini inahitaji kwenda kwenye ngazi tatu ndani ya ndoto zake.`
      }
    ]
  },
  {
    id: 'wednesday-s1',
    title: 'Wednesday',
    originalTitle: 'Jumatano',
    type: 'series',
    year: 2022,
    genre: ['Comedy', 'Fantasy', 'Mystery'],
    description: "While attending Nevermore Academy, Wednesday Addams attempts to master her emerging psychic ability, thwart a killing spree, and solve the mystery that embroiled her parents 25 years ago.",
    descriptionSw: "Akiwa anasoma katika Chuo cha Nevermore, Wednesday Addams anajaribu kudhibiti uwezo wake wa kiakili unaochipuka, kuzuia mauaji mfululizo, na kutatua fumbo lililowahusu wazazi wake miaka 25 iliyopita.",
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400',
    rating: 8.2,
    subtitles: [
      {
        id: 'wd-sw-1',
        language: 'Kiswahili',
        languageCode: 'sw',
        translator: 'Wednesday_Bongo_Fans',
        rating: 4.5,
        downloads: 1105,
        fileSize: '41 KB',
        version: 'S01E01.720p.NF.WEBRip',
        createdAt: '2026-02-18',
        srtContent: `1
00:00:15,000 --> 00:00:19,200
Wednesday: Sijali kama watu hawanipendi. Hilo linanipa nguvu.

2
00:00:20,100 --> 00:00:24,500
Wazazi wangu wananituma kwenda shule ya urekebishaji inayoitwa Nevermore.

3
00:00:25,000 --> 00:00:28,800
Ni sehemu iliyojaa watu wa ajabu, lakini kwa kweli, napenda giza la hapa.

4
00:00:29,200 --> 00:00:33,400
Kitu fulani cha hatari kinatokea, na ninaenda kukichunguza mwenyewe.`
      }
    ]
  }
];

export const initialRequests: SubtitleRequest[] = [
  {
    id: 'req-1',
    title: 'Dune: Part Two',
    type: 'movie',
    year: 2024,
    requestedBy: 'Ali_Kiba99',
    requestDate: '2026-07-15',
    status: 'pending',
    votes: 42
  },
  {
    id: 'req-2',
    title: 'Oppenheimer',
    type: 'movie',
    year: 2023,
    requestedBy: 'BongoCinema',
    requestDate: '2026-07-16',
    status: 'pending',
    votes: 28
  },
  {
    id: 'req-3',
    title: 'Stranger Things - Season 5',
    type: 'series',
    requestedBy: 'SubzLover',
    requestDate: '2026-07-18',
    status: 'pending',
    votes: 19
  },
  {
    id: 'req-4',
    title: 'Interstellar',
    type: 'movie',
    year: 2014,
    requestedBy: 'AstronomyTZ',
    requestDate: '2026-07-12',
    status: 'completed',
    votes: 56
  }
];
