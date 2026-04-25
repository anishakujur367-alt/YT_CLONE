// 
const makeAvatar = (seed) =>
  `https://api.dicebear.com/7.x/thumbs/svg?seed=${seed}&radius=50&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

export const commentsByVideo = {
  v1: [
    {
      id: "c1-1", author: "@RickAstleyOfficial", avatar: makeAvatar("rickastley"),
      text: "Never gonna give you up, never gonna let you down 🎵 Thanks for 1.7 BILLION views! Still can't believe it.",
      likes: "284K", time: "2 years ago", pinned: true,
      replies: [
        { id: "r1-1-1", author: "@NeverGonnaStopWatching", avatar: makeAvatar("ngw"), text: "I come back to this every year and it always makes me smile 😊", likes: "42K", time: "1 year ago" },
        { id: "r1-1-2", author: "@RickrollVictim2024", avatar: makeAvatar("victim"), text: "I got rickrolled again. And I'm not even mad about it 💀", likes: "89K", time: "8 months ago" },
      ]
    },
    {
      id: "c1-2", author: "@InternetHistorian", avatar: makeAvatar("inth"),
      text: "This video invented the internet. All of it.",
      likes: "561K", time: "5 years ago", replies: []
    },
    {
      id: "c1-3", author: "@ClassicMusicFan", avatar: makeAvatar("classicfan"),
      text: "My grandfather heard this for the first time today. He said 'this is a good young man'. Legend.",
      likes: "134K", time: "3 months ago", replies: [
        { id: "r1-3-1", author: "@GrandpaApproved", avatar: makeAvatar("grandpa"), text: "Your grandfather has excellent taste 😂", likes: "28K", time: "3 months ago" },
      ]
    },
    {
      id: "c1-4", author: "@TheFutureIsNow99", avatar: makeAvatar("future99"),
      text: "The fact this song is more relevant now than when it came out is genuinely remarkable.",
      likes: "98K", time: "1 year ago", replies: []
    },
  ],

  v2: [
    {
      id: "c2-1", author: "@officialpsy", avatar: makeAvatar("psy"),
      text: "GANGNAM STYLE! 강남스타일! Thank you for 5 BILLION views 🎉 Oppa is grateful!",
      likes: "892K", time: "3 years ago", pinned: true,
      replies: [
        { id: "r2-1-1", author: "@KPopWorldwide", avatar: makeAvatar("kpopw"), text: "This video put K-Pop on the world map. Legendary.", likes: "234K", time: "2 years ago" },
        { id: "r2-1-2", author: "@YouTube2012Era", avatar: makeAvatar("yt2012"), text: "This was the first video to hit 1 billion views. A true historical artifact.", likes: "178K", time: "1 year ago" },
      ]
    },
    {
      id: "c2-2", author: "@ViralVideoVault", avatar: makeAvatar("viral"),
      text: "I was in middle school when this dropped. Now I'm a grown adult and I still do the horse dance. No regrets.",
      likes: "445K", time: "4 years ago", replies: []
    },
    {
      id: "c2-3", author: "@DataNerd_42", avatar: makeAvatar("data42"),
      text: "Fun fact: YouTube had to upgrade their view counter just because of this video. They didn't expect views to go past 2.1 billion.",
      likes: "312K", time: "5 years ago", replies: [
        { id: "r2-3-1", author: "@TechHistoryFan", avatar: makeAvatar("techh"), text: "The view counter literally froze for a while. Wild times.", likes: "89K", time: "4 years ago" },
      ]
    },
  ],

  v3: [
    {
      id: "c3-1", author: "@edsheeran", avatar: makeAvatar("edsheeran"),
      text: "This is still one of my proudest achievements. 6 BILLION views is just insane. Thank you all so much 🧡",
      likes: "1.2M", time: "2 years ago", pinned: true,
      replies: [
        { id: "r3-1-1", author: "@ShapeOfMyLife", avatar: makeAvatar("shapemy"), text: "My first dance at my wedding was to this song. Still cry every time 😭", likes: "234K", time: "1 year ago" },
        { id: "r3-1-2", author: "@MusicProducer_Kai", avatar: makeAvatar("kai"), text: "The chord progression in this is deceptively complex. Absolute masterpiece of pop craft.", likes: "145K", time: "1 year ago" },
      ]
    },
    {
      id: "c3-2", author: "@GymPlaylistGod", avatar: makeAvatar("gym"),
      text: "This has been in my workout playlist for 7 years straight. Never gets old. Never.",
      likes: "567K", time: "3 years ago", replies: []
    },
    {
      id: "c3-3", author: "@SongOfTheDecade", avatar: makeAvatar("sotd"),
      text: "If aliens asked what 2010s pop music sounds like, I would show them this.",
      likes: "389K", time: "4 years ago", replies: []
    },
  ],

  v4: [
    {
      id: "c4-1", author: "@LuisFonsiVEVO", avatar: makeAvatar("luisfonsi"),
      text: "8.5 BILLION VIEWS! Gracias a todos por este amor increíble. Despacito forever 🇵🇷❤️",
      likes: "1.4M", time: "1 year ago", pinned: true,
      replies: [
        { id: "r4-1-1", author: "@LatinMusicPride", avatar: makeAvatar("latin"), text: "This song brought Latin music to every corner of the world. True legend.", likes: "312K", time: "1 year ago" },
      ]
    },
    {
      id: "c4-2", author: "@LanguageLearner_Pedro", avatar: makeAvatar("pedro"),
      text: "I learned Spanish just so I could understand the lyrics of this song. No regrets whatsoever.",
      likes: "678K", time: "5 years ago", replies: [
        { id: "r4-2-1", author: "@SpanishTeacher_Maria", avatar: makeAvatar("maria"), text: "As a Spanish teacher, I approve of this method of learning 😂", likes: "123K", time: "4 years ago" },
      ]
    },
    {
      id: "c4-3", author: "@SummerVibes2017", avatar: makeAvatar("summer17"),
      text: "Summer 2017 in a song. Every barbecue, beach trip, and road trip. Absolute time machine.",
      likes: "445K", time: "6 years ago", replies: []
    },
  ],

  v5: [
    {
      id: "c5-1", author: "@MarkRonsonVEVO", avatar: makeAvatar("markronson"),
      text: "5 BILLION! Still can't believe it. Thank you to everyone who's ever Uptown Funk'd themselves 🎷🎺",
      likes: "987K", time: "2 years ago", pinned: true,
      replies: [
        { id: "r5-1-1", author: "@BrunoMars_Fan", avatar: makeAvatar("brunofan"), text: "Bruno's performance in this video is UNREAL. Everything about this is perfection.", likes: "234K", time: "1 year ago" },
      ]
    },
    {
      id: "c5-2", author: "@FunkMusicLover", avatar: makeAvatar("funk"),
      text: "The brass section alone deserves a Grammy. This is how you make a proper hit song.",
      likes: "567K", time: "8 years ago", replies: []
    },
    {
      id: "c5-3", author: "@OfficePartyPlaylist", avatar: makeAvatar("office"),
      text: "This song has been played at literally every office party, wedding, and school dance since 2014. A true cultural institution.",
      likes: "334K", time: "5 years ago", replies: []
    },
  ],

  v6: [
    {
      id: "c6-1", author: "@WizKhalifaVEVO", avatar: makeAvatar("wizkhalifa"),
      text: "This one goes out to Paul. Rest easy brother. 6.4 billion views — the whole world loves you 🙏",
      likes: "2.1M", time: "3 years ago", pinned: true,
      replies: [
        { id: "r6-1-1", author: "@PaulWalkerForever", avatar: makeAvatar("paul"), text: "I will never stop crying at this song. Never. RIP Paul Walker 🙏🏁", likes: "890K", time: "2 years ago" },
        { id: "r6-1-2", author: "@FF_fan_forever", avatar: makeAvatar("ff"), text: "The final scene in Furious 7 with this playing... genuinely one of cinema's most emotional moments.", likes: "678K", time: "2 years ago" },
      ]
    },
    {
      id: "c6-2", author: "@NoTears_Left", avatar: makeAvatar("notears"),
      text: "I was NOT ready for this the first time I heard it. Still not ready 9 years later.",
      likes: "1.3M", time: "7 years ago", replies: []
    },
    {
      id: "c6-3", author: "@CharliePuth_fan", avatar: makeAvatar("charlief"),
      text: "Charlie Puth was 22 years old when he wrote and sang this. Absolute prodigy.",
      likes: "567K", time: "5 years ago", replies: []
    },
  ],

  v7: [
    {
      id: "c7-1", author: "@AlanWalkerMusic", avatar: makeAvatar("alanwalker"),
      text: "3.8 BILLION! Faded was my first ever release and I never imagined it would reach so many people. Thank you 🌍🎶",
      likes: "678K", time: "2 years ago", pinned: true,
      replies: [
        { id: "r7-1-1", author: "@EDM_Historian", avatar: makeAvatar("edmh"), text: "This song defined an entire era of electronic music. The melody is simply iconic.", likes: "145K", time: "1 year ago" },
        { id: "r7-1-2", author: "@Iselin_Fan", avatar: makeAvatar("iselin"), text: "Iselin's voice combined with that drop is otherworldly 🔥", likes: "234K", time: "1 year ago" },
      ]
    },
    {
      id: "c7-2", author: "@LateNight_Studier", avatar: makeAvatar("latestudy"),
      text: "3 AM, headphones in, this song playing. That's the vibe. That will always be the vibe.",
      likes: "1.1M", time: "6 years ago", replies: []
    },
    {
      id: "c7-3", author: "@DrivingPlaylist_King", avatar: makeAvatar("driveking"),
      text: "If this song doesn't make you feel like you're in a movie while driving at night, nothing will.",
      likes: "789K", time: "7 years ago", replies: []
    },
  ],

  v8: [
    {
      id: "c8-1", author: "@AviciiMemorial", avatar: makeAvatar("avicii"),
      text: "Rest in peace Tim. This song carries your legacy. Wake Me Up will echo forever. 🕊️",
      likes: "3.4M", time: "5 years ago", pinned: true,
      replies: [
        { id: "r8-1-1", author: "@AloeBlaccOfficial", avatar: makeAvatar("aloe"), text: "Tim was the most genuine, passionate musician I've ever worked with. Miss him every day. 🙏", likes: "1.2M", time: "4 years ago" },
        { id: "r8-1-2", author: "@EDM_generation", avatar: makeAvatar("edmgen"), text: "He was gone too soon. His music will outlive us all.", likes: "890K", time: "4 years ago" },
      ]
    },
    {
      id: "c8-2", author: "@CountryMeetsEDM", avatar: makeAvatar("countryedm"),
      text: "The folk/EDM fusion in this song was completely revolutionary. No one had done anything like it before.",
      likes: "567K", time: "8 years ago", replies: []
    },
    {
      id: "c8-3", author: "@Nostalgic_2013", avatar: makeAvatar("nostalgia"),
      text: "Summer 2013. Every festival. Every car ride. Every memory. This song IS that year.",
      likes: "789K", time: "7 years ago", replies: []
    },
  ],

  v9: [
    {
      id: "c9-1", author: "@LofiGirlOfficial", avatar: makeAvatar("lofigirl"),
      text: "Thank you for always studying and working with us 📚 You're part of the lofi family 💙",
      likes: "145K", time: "2 years ago", pinned: true,
      replies: [
        { id: "r9-1-1", author: "@StudyWithMe_Aria", avatar: makeAvatar("aria"), text: "This stream has been on my second monitor for 3 years straight. It's genuinely helped my focus.", likes: "34K", time: "1 year ago" },
      ]
    },
    {
      id: "c9-2", author: "@ExamSurvivor_2024", avatar: makeAvatar("exam24"),
      text: "I've written 4 finals, 2 dissertations, and 200+ work presentations with this playing. Works every time.",
      likes: "234K", time: "1 year ago", replies: []
    },
    {
      id: "c9-3", author: "@Insomniac_Dev", avatar: makeAvatar("insomniac"),
      text: "3 AM, coding session, rain outside, this stream playing. I've never been more productive or more at peace.",
      likes: "312K", time: "8 months ago", replies: []
    },
  ],

  v10: [
    {
      id: "c10-1", author: "@EminemVEVO", avatar: makeAvatar("eminem"),
      text: "Guess who's back, back again. Thanks for 1.2 billion views on this classic 🎤",
      likes: "678K", time: "3 years ago", pinned: true,
      replies: [
        { id: "r10-1-1", author: "@SlimShadyFan", avatar: makeAvatar("slim"), text: "This music video is pure comedy and pure bars at the same time. Peak Eminem era.", likes: "234K", time: "2 years ago" },
      ]
    },
    {
      id: "c10-2", author: "@RapHistoryNerd", avatar: makeAvatar("raphist"),
      text: "The layered references and wordplay in this song could be studied in universities. Absolute genius.",
      likes: "445K", time: "8 years ago", replies: []
    },
    {
      id: "c10-3", author: "@Y2K_Nostalgia", avatar: makeAvatar("y2k"),
      text: "Early 2000s radio was something special and this is proof. A completely different era of music.",
      likes: "312K", time: "5 years ago", replies: []
    },
  ],

  v11: [
    {
      id: "c11-1", author: "@ColdplayOfficial", avatar: makeAvatar("coldplay"),
      text: "Yellow was written on a beach in Cornwall in 1999. It's still the most honest song we've ever written. Thank you 💛",
      likes: "234K", time: "2 years ago", pinned: true,
      replies: [
        { id: "r11-1-1", author: "@AlternativeRockFan", avatar: makeAvatar("altrock"), text: "Chris Martin running on that beach at dawn is one of the most iconic music video shots in history.", likes: "89K", time: "1 year ago" },
      ]
    },
    {
      id: "c11-2", author: "@ConfessionTime_00", avatar: makeAvatar("confess"),
      text: "I have ugly-cried to this song more times than I'd like to admit. There's something about it that just hits different.",
      likes: "567K", time: "6 years ago", replies: []
    },
    {
      id: "c11-3", author: "@BritpopEra_Archive", avatar: makeAvatar("britpop"),
      text: "This song defined early 2000s alternative rock. Still gives me chills every single time.",
      likes: "389K", time: "10 years ago", replies: []
    },
  ],

  v12: [
    {
      id: "c12-1", author: "@YRFOfficial", avatar: makeAvatar("yrf"),
      text: "140 MILLION views! Thank you for making #SaiyaaraTheSong such a massive hit ❤️🎵",
      likes: "45K", time: "2 months ago", pinned: true,
      replies: [
        { id: "r12-1-1", author: "@BollywoodMusicFan", avatar: makeAvatar("bwood"), text: "Vishal Mishra has done it again. This melody is absolutely haunting in the best way.", likes: "12K", time: "2 months ago" },
        { id: "r12-1-2", author: "@SaiyaaraFan", avatar: makeAvatar("saiyaara"), text: "Hansika's voice in the chorus is just breathtaking. Pure magic.", likes: "8.9K", time: "1 month ago" },
      ]
    },
    {
      id: "c12-2", author: "@HindiMusicLover_Priya", avatar: makeAvatar("priya"),
      text: "Been on repeat for 3 weeks straight. The lyrics, the melody, the voices — everything is perfect.",
      likes: "28K", time: "2 months ago", replies: []
    },
    {
      id: "c12-3", author: "@NewBollywoodEra", avatar: makeAvatar("newbwood"),
      text: "This is the kind of song that will be played at weddings for the next 20 years. Timeless.",
      likes: "19K", time: "1 month ago", replies: []
    },
  ],
};

export const defaultComments = [
  {
    id: "dc-1", author: "@TopFan_01", avatar: makeAvatar("topfan"),
    text: "This is one of the best videos on YouTube. Absolute fire 🔥",
    likes: "12K", time: "3 months ago", pinned: true,
    replies: [
      { id: "dr-1-1", author: "@AgreePerson", avatar: makeAvatar("agree"), text: "Couldn't agree more! Shared it with everyone I know.", likes: "1.2K", time: "2 months ago" },
    ]
  },
  {
    id: "dc-2", author: "@JustVibing22", avatar: makeAvatar("vibes22"),
    text: "Found this at 2 AM and now I'm 6 videos deep on this channel 😅",
    likes: "8.4K", time: "5 months ago", replies: []
  },
  {
    id: "dc-3", author: "@QualityContent_Fan", avatar: makeAvatar("quality"),
    text: "The production quality here is insane. Subscribed immediately.",
    likes: "5.2K", time: "4 months ago", replies: []
  },
];
