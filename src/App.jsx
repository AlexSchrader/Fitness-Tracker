// VocaLingo v1.3.93 — Stage 1, Sprint 3
/**
 * VocaLingo - Multilingual Learning App
 * 
 * Issues resolved:
 * #1  - feat: unified single-file app
 * #2  - feat: home screen with stats, streak, days, tests
 * #3  - feat: lesson tab with facts and phrases
 * #4  - feat: characters tab with flip cards
 * #5  - feat: daily quiz 30 questions 90% unlock
 * #6  - feat: test 1 and test 2 built into app
 * #7  - feat: localStorage save across all sections
 * #8  - fix: mobile whitespace fills full screen
 * #9  - feat: streak tracker
 * #10 - content: week 1 days 1-5 lesson data
 * #12 - feat: sound effects
 * #13 - feat: dynamic feedback messages
 * #14 - feat: visual feedback animations
 * #39 - fix: blank test screen hook violation
 * #47 - fix: normalize strips punctuation
 * #48 - feat: MC answer positions randomize
 */

import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════
// #10 — CONTENT DATA
// ═══════════════════════════════════════════
const WEEKS = [
  {
    weekNum: 1,
    days: [
      {
        day: 1,
        facts: [
          "Japan has over 6,800 islands but most people live on just 4 — Honshu, Hokkaido, Kyushu, and Shikoku.",
          "Japan is slightly smaller than California yet houses 126+ million people — over 3x California's population.",
          "Tokyo's greater metro area holds 37–38 million people, making it the largest metropolitan area on Earth.",
          "Japan has no natural land borders — it is completely surrounded by ocean.",
          "Forests cover about 68% of Japan's land despite being one of the most urbanized nations on Earth.",
          "Japan has 18 UNESCO World Heritage Sites including ancient temples, forests, and atomic bomb memorials.",
          "The Shinkansen bullet train averages delays of under 1 minute and has run for 60+ years with zero passenger fatalities.",
          "Japan experiences around 1,500 earthquakes per year — most too small to feel.",
          "Japan invented emoji — the word literally means 'picture character' in Japanese.",
          "Japan has no jury system — cases are decided by professional judges with a conviction rate over 99%.",
        ],
        phrases: [
          { jp: "いただきます", romaji: "Itadakimasu", en: "I humbly receive — said before eating" },
          { jp: "ありがとう", romaji: "Arigatou", en: "Thank you (casual)" },
          { jp: "すみません", romaji: "Sumimasen", en: "Excuse me / Sorry" },
          { jp: "大丈夫", romaji: "Daijoubu", en: "It's okay / I'm fine" },
          { jp: "もったいない", romaji: "Mottainai", en: "Regret over waste — no direct English translation" },
        ],
        hiragana: [
          { char: "あ", romaji: "a" }, { char: "い", romaji: "i" },
          { char: "う", romaji: "u" }, { char: "え", romaji: "e" },
          { char: "お", romaji: "o" },
        ],
        katakana: [
          { char: "ア", romaji: "a" }, { char: "イ", romaji: "i" },
          { char: "ウ", romaji: "u" }, { char: "エ", romaji: "e" },
          { char: "オ", romaji: "o" },
        ],
      },
      {
        day: 2,
        facts: [
          "Japan has 118 active volcanoes — more than almost any other country. Mount Fuji last erupted in 1707.",
          "In Japan, tipping is considered rude — service is done with pride, not for extra money.",
          "Wabi-Sabi (侘び寂び) — finding beauty in imperfection. A cracked bowl isn't broken, it's more interesting.",
          "Karoshi (過労死) means dying from overwork — a real legal classification and national crisis in Japan.",
          "Japan has over 80,000 restaurants in Tokyo alone — more Michelin stars than any other city on Earth.",
          "Japan has more pets than children — a direct result of its declining birth rate.",
          "Kit Kat is massive in Japan — over 300 flavors including sake, wasabi, matcha, and sweet potato.",
          "Japan has a tradition of 'Noren' (暑簾) — split fabric curtains hung at shop entrances that signal the business is open. The older and more worn a noren, the more established and trustworthy the shop — a worn noren is pride, not neglect.",
          "The Shinkansen system has over 2,897 km of track connecting most major cities.",
          "Japan's lost and found culture is legendary — wallets left on trains regularly come back with all cash.",
        ],
        phrases: [
          { jp: "いくらですか", romaji: "Ikura desu ka", en: "How much does this cost?" },
          { jp: "どこですか", romaji: "Doko desu ka", en: "Where is it?" },
          { jp: "乾杯", romaji: "Kanpai", en: "Cheers!" },
          { jp: "よろしくおねがいします", romaji: "Yoroshiku onegaishimasu", en: "Nice to meet you / I'm in your care" },
          { jp: "侘び寂び", romaji: "Wabi-Sabi", en: "Beauty in imperfection and impermanence" },
        ],
        hiragana: [
          { char: "か", romaji: "ka" }, { char: "き", romaji: "ki" },
          { char: "く", romaji: "ku" }, { char: "け", romaji: "ke" },
          { char: "こ", romaji: "ko" },
        ],
        katakana: [
          { char: "カ", romaji: "ka" }, { char: "キ", romaji: "ki" },
          { char: "ク", romaji: "ku" }, { char: "ケ", romaji: "ke" },
          { char: "コ", romaji: "ko" },
        ],
      },
      {
        day: 3,
        facts: [
          "Sumo wrestling is Japan's national sport dating back 1,500+ years — rituals are rooted in Shinto religion.",
          "Baseball is actually more popular than sumo — introduced by Americans in the 1870s.",
          "Karaoke was invented in Japan in the early 1970s. The word means 'empty orchestra' — kara + oke.",
          "Japan has a deer park in Nara where 1,000+ wild deer roam freely and bow to tourists who bow first.",
          "Kyoto was Japan's capital for over 1,000 years before Tokyo took over in 1869.",
          "Sanja Matsuri is one of Tokyo's three great Shinto festivals held every May in Asakusa.",
          "Historically, Yakuza operated under a code — don't harm civilians, handle disputes internally.",
          "Japan has over 50,000 people aged 100 or older. The government sends every centenarian a silver sake cup.",
          "Japan's postal service delivers 'Nengajo' New Year's cards — billions are printed every December and held by post offices to arrive simultaneously on January 1st. The tradition of collective greeting is a uniquely Japanese institution.",
          "The Japanese concept of Ma (間) refers to meaningful pause — emptiness holds just as much meaning.",
        ],
        phrases: [
          { jp: "頑張って", romaji: "Ganbatte", en: "Do your best / Keep going" },
          { jp: "わかりました", romaji: "Wakarimashita", en: "I understand" },
          { jp: "間", romaji: "Ma", en: "Negative space / meaningful pause" },
          { jp: "ただいま", romaji: "Tadaima", en: "I'm home — said every time you walk through the door" },
          { jp: "おかえり", romaji: "Okaeri", en: "Welcome back / Welcome home" },
        ],
        hiragana: [
          { char: "さ", romaji: "sa" }, { char: "し", romaji: "shi" },
          { char: "す", romaji: "su" }, { char: "せ", romaji: "se" },
          { char: "そ", romaji: "so" },
        ],
        katakana: [
          { char: "サ", romaji: "sa" }, { char: "シ", romaji: "shi" },
          { char: "ス", romaji: "su" }, { char: "セ", romaji: "se" },
          { char: "ソ", romaji: "so" },
        ],
      },
      {
        day: 4,
        facts: [
          "Shinrin-yoku (森林浴) means Forest Bathing — walking slowly through nature. Doctors actually prescribe it.",
          "In Japan punctuality is respect. Arriving even 1 minute late to a business meeting can damage a relationship.",
          "Kaizen (改善) means continuous improvement through small daily steps. Toyota built their empire on this.",
          "Japan has a Cat Café culture — you pay to sit and hang out with cats. Also owl, hedgehog, and reptile cafés.",
          "In Japan silence is respect, not awkwardness. Pausing before answering shows you take someone seriously.",
          "Japan's 'Koban' (交番) system places small police boxes on neighborhood corners — officers know residents by name, respond within minutes, and serve as community anchors unlike anything found in most Western countries.",
          "Samurai were abolished in 1876 during the Meiji Restoration when Japan modernized rapidly.",
          "Japan has a Rabbit Island called Okunoshima where hundreds of wild rabbits roam freely.",
          "Japan spends more on adult diapers than baby diapers — a result of its aging population crisis.",
          "Japan has over 120,000 Buddhist temples — many open at dawn for meditation. On New Year's Eve temple bells ring exactly 108 times (joya no kane) to cleanse 108 human desires. The sound is broadcast live on national television.",
        ],
        phrases: [
          { jp: "すごい", romaji: "Sugoi", en: "Wow / Amazing / Incredible" },
          { jp: "なるほど", romaji: "Naruhodo", en: "I see / That makes sense" },
          { jp: "改善", romaji: "Kaizen", en: "Continuous improvement — small steps every day" },
          { jp: "どうぞ", romaji: "Douzo", en: "Please go ahead / Here you go" },
          { jp: "失礼します", romaji: "Shitsurei shimasu", en: "Excuse me / I'm being rude — used entering or leaving rooms" },
        ],
        hiragana: [
          { char: "た", romaji: "ta" }, { char: "ち", romaji: "chi" },
          { char: "つ", romaji: "tsu" }, { char: "て", romaji: "te" },
          { char: "と", romaji: "to" },
        ],
        katakana: [
          { char: "タ", romaji: "ta" }, { char: "チ", romaji: "chi" },
          { char: "ツ", romaji: "tsu" }, { char: "テ", romaji: "te" },
          { char: "ト", romaji: "to" },
        ],
      },
      {
        day: 5,
        facts: [
          "Shokunin (職人) — a craftsman who dedicates their entire life to mastering one skill.",
          "Japan has over 50,000 Konbini (convenience stores) — 7-Eleven, FamilyMart, Lawson. Full hot meals, banking.",
          "Nemawashi (根回し) — quietly building consensus before a formal decision. Business moves through relationships.",
          "Japan has a rental family industry — you can hire fake friends, fake partners, even fake parents.",
          "Mount Fuji from the fifth station to the summit is privately owned by Fujisan Hongu Sengen Taisha shrine.",
          "Honne and Tatemae — Honne is your true feelings, Tatemae is the face you show publicly.",
          "Japan's Maglev L0 Series hit 603 km/h (375 mph) in testing — the fastest train ever recorded.",
          "The Chuo Shinkansen Maglev connecting Tokyo to Osaka is expected to open around 2034–2037.",
          "At 600 km/h you cover 10 kilometers every single minute — Charlotte to Raleigh in about 4 minutes.",
          "The Maglev floats 10cm above the track using superconducting magnets cooled to -269°C — zero friction.",
        ],
        phrases: [
          { jp: "職人", romaji: "Shokunin", en: "Craftsman / Master of one skill" },
          { jp: "本音と建前", romaji: "Honne to Tatemae", en: "True feelings vs the public face you show others" },
          { jp: "根回し", romaji: "Nemawashi", en: "Quietly laying groundwork / building consensus" },
          { jp: "生き甲斐", romaji: "Ikigai", en: "Reason for living / reason to get up in the morning" },
          { jp: "おはようございます", romaji: "Ohayou gozaimasu", en: "Good morning (polite)" },
        ],
        hiragana: [
          { char: "な", romaji: "na" }, { char: "に", romaji: "ni" },
          { char: "ぬ", romaji: "nu" }, { char: "ね", romaji: "ne" },
          { char: "の", romaji: "no" },
        ],
        katakana: [
          { char: "ナ", romaji: "na" }, { char: "ニ", romaji: "ni" },
          { char: "ヌ", romaji: "nu" }, { char: "ネ", romaji: "ne" },
          { char: "ノ", romaji: "no" },
        ],
      },
    ],
  },

  {
    weekNum: 2,
    days: [
      {
        day: 6,
        facts: [
          "Japan's convenience stores (konbini) sell over 3 billion rice balls (onigiri) per year — one of the most popular foods in the country.",
          "The Japanese concept of 'Omotenashi' (おもてなし) means wholehearted hospitality — serving guests with total care and no expectation of reward.",
          "Japan has over 25,000 shrines and 75,000 temples — more places of worship per capita than almost any nation.",
          "The Japanese rail network is so precise that if a train is delayed more than 5 minutes, passengers receive a delay certificate for their employer.",
          "Japan's cherry blossom season (Hanami) is a national event — people gather under trees for picnics and celebrations every spring.",
          "Sumo wrestlers follow a strict diet called 'chankonabe' — a protein-rich stew designed to build mass. Some wrestlers consume 10,000+ calories per day.",
          "Japan has a 'herbivore men' cultural phenomenon — a growing number of young men rejecting traditional masculinity and career ambition.",
          "The Japanese word for Japan — Nihon (にほん) — literally means 'origin of the sun', which is why Japan is called the Land of the Rising Sun.",
          "Japan's literacy rate is 99% — one of the highest in the world. Reading is deeply embedded in the culture from childhood.",
          "Capsule hotels were invented in Osaka in 1979 — individual sleeping pods stacked in rows, designed for business travelers who missed the last train.",
        ],
        phrases: [
          { jp: "おもてなし", romaji: "Omotenashi", en: "Wholehearted hospitality — serving with total care and no expectation of reward" },
          { jp: "花見", romaji: "Hanami", en: "Cherry blossom viewing — the annual spring tradition of gathering under sakura trees" },
          { jp: "いってきます", romaji: "Ittekimasu", en: "I'm heading out — said when leaving home, like a farewell ritual" },
          { jp: "いってらっしゃい", romaji: "Itterasshai", en: "Go and come back safely — the response to Ittekimasu" },
          { jp: "お疲れ様です", romaji: "Otsukaresama desu", en: "Thank you for your hard work — said to colleagues at end of work day" },
        ],
        hiragana: [
          { char: "は", romaji: "ha" }, { char: "ひ", romaji: "hi" },
          { char: "ふ", romaji: "fu" }, { char: "へ", romaji: "he" },
          { char: "ほ", romaji: "ho" },
        ],
        katakana: [
          { char: "ハ", romaji: "ha" }, { char: "ヒ", romaji: "hi" },
          { char: "フ", romaji: "fu" }, { char: "ヘ", romaji: "he" },
          { char: "ホ", romaji: "ho" },
        ],
      },
      {
        day: 7,
        facts: [
          "Japan has the world's oldest company — Kongo Gumi, a construction company founded in 578 AD that operated for over 1,400 years.",
          "The Japanese work philosophy of 'Ganbaru' (頑張る) means to persist and do your best no matter what — it's the cultural engine behind Japan's post-war economic miracle.",
          "Japan produces over 60% of the world's animation (anime) — the industry generates billions of dollars annually and employs over 100,000 people.",
          "The city of Osaka is considered the food capital of Japan — locals say 'kuidaore' meaning 'eat until you drop', which is the city's unofficial motto.",
          "Japan's suicide forest Aokigahara at the base of Mount Fuji has such dense magnetic iron deposits that compasses stop working inside it.",
          "The Japanese concept of 'Mono no Aware' (物の哀れ) means the bittersweet awareness of impermanence — the sadness and beauty of things passing.",
          "Tokyo's Shibuya crossing is the busiest pedestrian intersection in the world — up to 3,000 people cross simultaneously when the lights change.",
          "Japan has a specific word for death by overwork — Karoshi — and also a word for suicide due to work stress — Karojisatsu.",
          "Japanese students clean their own schools every day — there are no janitors. This builds responsibility and respect for shared spaces from childhood.",
          "Japan's bullet train was introduced in 1964 for the Tokyo Olympics — the same year Japan re-introduced itself to the world after WWII.",
        ],
        phrases: [
          { jp: "頑張る", romaji: "Ganbaru", en: "To persist / to do your best — the verb form of ganbatte" },
          { jp: "物の哀れ", romaji: "Mono no Aware", en: "The bittersweet awareness of impermanence — beauty in things that pass" },
          { jp: "ただし", romaji: "Tadashi", en: "However / but — used to introduce a condition or exception" },
          { jp: "なぜ", romaji: "Naze", en: "Why — question word used to ask for a reason" },
          { jp: "どうして", romaji: "Doushite", en: "Why / how come — more casual version of naze" },
        ],
        hiragana: [
          { char: "ま", romaji: "ma" }, { char: "み", romaji: "mi" },
          { char: "む", romaji: "mu" }, { char: "め", romaji: "me" },
          { char: "も", romaji: "mo" },
        ],
        katakana: [
          { char: "マ", romaji: "ma" }, { char: "ミ", romaji: "mi" },
          { char: "ム", romaji: "mu" }, { char: "メ", romaji: "me" },
          { char: "モ", romaji: "mo" },
        ],
      },
      {
        day: 8,
        facts: [
          "Japan is the world's third largest economy despite having almost no natural resources — oil, gas, iron, and coal are all imported.",
          "The Japanese concept of 'Shu-Ha-Ri' (守破離) describes mastery in three stages: follow the rules, break the rules, transcend the rules.",
          "Japan has over 100 active volcanoes and sits on the Pacific Ring of Fire — about 10% of the world's active volcanoes are in Japan.",
          "The 2011 Tohoku earthquake was the most powerful ever recorded in Japan at magnitude 9.0 — it shifted the Earth's axis by 10 to 25 cm.",
          "Ramen was brought to Japan from China in the early 1900s — Japan then transformed it into one of the world's most beloved dishes with thousands of regional variations.",
          "Japan's population is declining — it peaked around 128 million in 2008 and has been shrinking ever since due to low birth rates and limited immigration.",
          "The Japanese train system carries 12 billion passengers per year — more than any other country and nearly double the second place.",
          "'Wa' (和) is a core Japanese cultural value meaning harmony, peace, and unity. It underpins everything from business etiquette to conflict resolution.",
          "Japan has 67 National Parks covering about 14% of the country's land — protecting everything from tropical islands to arctic mountains.",
          "The Japanese government has officially designated over 4,000 varieties of sake — Japan's traditional rice wine brewed for over 2,000 years.",
        ],
        phrases: [
          { jp: "守破離", romaji: "Shu-Ha-Ri", en: "Three stages of mastery — follow, break, transcend the rules" },
          { jp: "和", romaji: "Wa", en: "Harmony / peace / unity — a core Japanese cultural value" },
          { jp: "どうぞよろしく", romaji: "Douzo yoroshiku", en: "Please treat me kindly — casual version of yoroshiku onegaishimasu" },
          { jp: "お元気ですか", romaji: "Ogenki desu ka", en: "How are you? — polite way to ask about someone's wellbeing" },
          { jp: "元気です", romaji: "Genki desu", en: "I'm well / I'm fine — standard response to ogenki desu ka" },
        ],
        hiragana: [
          { char: "や", romaji: "ya" }, { char: "ゆ", romaji: "yu" },
          { char: "よ", romaji: "yo" }, { char: "ら", romaji: "ra" },
          { char: "り", romaji: "ri" },
        ],
        katakana: [
          { char: "ヤ", romaji: "ya" }, { char: "ユ", romaji: "yu" },
          { char: "ヨ", romaji: "yo" }, { char: "ラ", romaji: "ra" },
          { char: "リ", romaji: "ri" },
        ],
      },
      {
        day: 9,
        facts: [
          "Japan's bluefin tuna auctions at Toyosu Market begin at 5am and top specimens sell for millions of dollars. Japan consumes over 80% of the world's bluefin tuna — the fish is so culturally significant it has its own grading vocabulary.",
          "The Japanese concept of 'Shokunin Kishitsu' (職人気質) means the craftsman spirit — an obsessive dedication to craft that goes beyond mere skill into a way of life.",
          "Japan spends more per capita on manga (comic books) than any other country — manga accounts for roughly 40% of all printed material sold in Japan.",
          "The Japanese school year starts in April to align with cherry blossom season — symbolizing new beginnings rather than autumn like most Western countries.",
          "Japan has strict rules around business card exchange (meishi koukan) — cards must be given and received with both hands, bowed, and never written on or stuffed in a pocket.",
          "The Yakuza at their peak in the 1960s had over 184,000 members. Today membership has fallen below 24,000 due to strict anti-organized crime laws.",
          "Japan is the only country to have suffered atomic bomb attacks — Hiroshima on August 6, 1945 and Nagasaki on August 9, 1945.",
          "The Japanese city of Kyoto has 17 UNESCO World Heritage Sites — more than almost any single city in the world.",
          "Japan produces some of the world's finest whisky — Yamazaki, Hibiki, and Nikka have beaten Scottish whiskies in international competitions.",
          "The average Japanese person walks over 7,000 steps per day — significantly more than the global average — largely due to train commuting culture.",
        ],
        phrases: [
          { jp: "職人気質", romaji: "Shokunin kishitsu", en: "Craftsman spirit — obsessive dedication to craft as a way of life" },
          { jp: "よかった", romaji: "Yokatta", en: "That's great / I'm glad — expression of relief or happiness" },
          { jp: "大変", romaji: "Taihen", en: "Tough / difficult / serious — used for hard situations" },
          { jp: "本当に", romaji: "Hontou ni", en: "Really / truly — used for emphasis" },
          { jp: "少し", romaji: "Sukoshi", en: "A little / a bit — very useful in daily conversation" },
        ],
        hiragana: [
          { char: "る", romaji: "ru" }, { char: "れ", romaji: "re" },
          { char: "ろ", romaji: "ro" }, { char: "わ", romaji: "wa" },
          { char: "を", romaji: "wo" },
        ],
        katakana: [
          { char: "ル", romaji: "ru" }, { char: "レ", romaji: "re" },
          { char: "ロ", romaji: "ro" }, { char: "ワ", romaji: "wa" },
          { char: "ヲ", romaji: "wo" },
        ],
      },
      {
        day: 10,
        facts: [
          "Japan's concept of 'Ikigai' has been adopted globally but in Okinawa it's lived daily — elders wake with purpose, move constantly, eat moderately, and maintain deep community bonds.",
          "Japan's Haiku (俣句) is one of the world's shortest poetic forms — 17 syllables across three lines. Matsuo Basho's frog poem written in 1686 remains Japan's most quoted literary line over 300 years later.",
          "Japan has a professional service called 'Ossan Rental' where you can rent a middle-aged man by the hour to listen to your problems and offer life advice.",
          "Mount Fuji has been climbed by over 300,000 people per year — so many that the mountain now charges a climbing fee and has a gate that closes at night.",
          "Japan's healthcare system consistently ranks among the top 10 globally — universal coverage, low costs, and average wait times under 30 minutes.",
          "The Japanese word 'Tsundoku' (積ん読) means buying books and letting them pile up unread — a habit so common it has its own dedicated word.",
          "Japan leads the world in robot density — over 300 industrial robots per 10,000 workers, more than any other country.",
          "The Japanese concept of 'Oubaitori' (桜梅桃李) means never comparing yourself to others — each person blooms in their own time like cherry, plum, peach, and plum trees.",
          "Japan's golden week is a cluster of four national holidays in late April and early May — the country effectively shuts down for a week as everyone travels at once.",
          "The Japanese have a specific word for the sun filtering through leaves — Komorebi (木漏れ日) — a concept so beautiful it needed its own name.",
        ],
        phrases: [
          { jp: "積ん読", romaji: "Tsundoku", en: "Buying books and letting them pile up unread — a uniquely Japanese habit" },
          { jp: "木漏れ日", romaji: "Komorebi", en: "Sunlight filtering through leaves — a concept beautiful enough to have its own word" },
          { jp: "桜梅桃李", romaji: "Oubaitori", en: "Never compare yourself to others — each person blooms in their own time" },
          { jp: "もうすぐ", romaji: "Mousugu", en: "Almost / soon / any minute now" },
          { jp: "ゆっくり", romaji: "Yukkuri", en: "Slowly / take your time — also said to guests meaning 'make yourself at home'" },
        ],
        hiragana: [
          { char: "ん", romaji: "n" }, { char: "が", romaji: "ga" },
          { char: "ぎ", romaji: "gi" }, { char: "ぐ", romaji: "gu" },
          { char: "げ", romaji: "ge" },
        ],
        katakana: [
          { char: "ン", romaji: "n" }, { char: "ガ", romaji: "ga" },
          { char: "ギ", romaji: "gi" }, { char: "グ", romaji: "gu" },
          { char: "ゲ", romaji: "ge" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // WEEK 3
  // ─────────────────────────────────────────
  {
    weekNum: 3,
    days: [
      {
        day: 11,
        facts: [
          "Japan's concept of 'Tatemae and Honne' runs so deep that there are specific social situations where saying the truth directly would be considered deeply offensive.",
          "The Japanese island of Okinawa has a disproportionate number of people over 100 — researchers studying them found they stop eating when they are 80% full, a practice called 'Hara Hachi Bu'.",
          "Japan has a museum dedicated entirely to instant noodles — the Cup Noodles Museum in Yokohama where visitors can design their own custom cup ramen.",
          "The Japanese practice of 'forest bathing' was officially recognized as a medical treatment in 1982 and is now prescribed by Japanese doctors for stress and anxiety.",
          "Japan's Okinawa prefecture was once an independent kingdom called the Ryukyu Kingdom — it wasn't annexed by Japan until 1879.",
          "Japanese high school baseball (Koshien) is one of the most watched sporting events in the country — rivaling professional sports in viewership.",
          "The Japanese concept of 'Natsukashii' (懐かしい) means a bittersweet nostalgia for the past — a warm longing for something lost.",
          "Japan has vending machines that sell live crabs, fresh eggs, hot ramen, and even used schoolgirl uniforms — the country has a vending machine for everything.",
          "The Japanese writing system has over 50,000 kanji characters — though daily life requires knowledge of only about 2,000.",
          "Japan's Bullet Train (Shinkansen) has carried over 10 billion passengers since 1964 with zero fatalities from derailments or collisions.",
        ],
        phrases: [
          { jp: "懐かしい", romaji: "Natsukashii", en: "Bittersweet nostalgia — a warm longing for the past" },
          { jp: "腹八分目", romaji: "Hara hachi bu", en: "Eat until 80% full — the Okinawan longevity practice" },
          { jp: "いつも", romaji: "Itsumo", en: "Always / usually — describing habitual actions" },
          { jp: "たまに", romaji: "Tama ni", en: "Sometimes / occasionally — used for infrequent actions" },
          { jp: "全然", romaji: "Zenzen", en: "Not at all / completely (with negative) — very common intensifier" },
        ],
        hiragana: [
          { char: "ご", romaji: "go" }, { char: "ざ", romaji: "za" },
          { char: "じ", romaji: "ji" }, { char: "ず", romaji: "zu" },
          { char: "ぜ", romaji: "ze" },
        ],
        katakana: [
          { char: "ゴ", romaji: "go" }, { char: "ザ", romaji: "za" },
          { char: "ジ", romaji: "ji" }, { char: "ズ", romaji: "zu" },
          { char: "ゼ", romaji: "ze" },
        ],
      },
      {
        day: 12,
        facts: [
          "Japan has a concept called 'Omakase' (お任せ) — leaving the choice entirely to the expert. Used in sushi restaurants it means 'I trust you completely.' In Japanese business, saying omakase to a partner signals deep trust and carries enormous relational weight.",
          "The Japanese concept of 'Ma' (間) applies not just to silence but to architecture, music, art, and even cooking — empty space is considered as important as filled space.",
          "Japan's convenience stores are open 24 hours, 365 days a year — even on Christmas, New Year's, and major typhoons.",
          "The Japanese word 'Kuchisabishii' (口寂しい) means eating not because you're hungry but because your mouth is lonely — a word for stress or boredom eating.",
          "Japan's 'Teishoku' (定食) — a set meal with rice, miso soup, a main dish, and pickles — is the quintessential balanced Japanese lunch. Available at thousands of restaurants for under $10, it embodies the belief that everyday meals deserve care and craftsmanship.",
          "The Japanese practice of 'Kaizen' was adopted by Toyota and then by companies worldwide — it's the foundation of lean manufacturing and modern productivity culture.",
          "Japan's earthquake preparedness infrastructure is invisible but extraordinary — underground flood reservoirs the size of cathedrals lie beneath Tokyo, designed to hold 670,000 cubic meters of water during typhoons and prevent city-wide flooding.",
          "The Japanese tea ceremony (Chado) is not about drinking tea — it is a meditative practice about mindfulness, aesthetics, and the philosophy of Wabi-Sabi.",
          "Japan's Akihabara district in Tokyo is the world center for electronics, anime, and gaming culture — it attracts over 50 million visitors per year.",
          "The Japanese word 'Amae' (甘え) describes the behavior of depending on another's goodwill — a concept of sweet dependence that has no English equivalent.",
        ],
        phrases: [
          { jp: "口寂しい", romaji: "Kuchisabishii", en: "Eating when your mouth is lonely — eating from boredom or stress, not hunger" },
          { jp: "甘え", romaji: "Amae", en: "Sweet dependence on another's goodwill — a uniquely Japanese social concept" },
          { jp: "お願い", romaji: "Onegai", en: "Please / I beg you — casual form of onegaishimasu" },
          { jp: "確かに", romaji: "Tashika ni", en: "Certainly / that's true — agreeing with something said" },
          { jp: "なんとなく", romaji: "Nantonaku", en: "Somehow / vaguely / for no particular reason" },
        ],
        hiragana: [
          { char: "ぞ", romaji: "zo" }, { char: "だ", romaji: "da" },
          { char: "ぢ", romaji: "di" }, { char: "づ", romaji: "du" },
          { char: "で", romaji: "de" },
        ],
        katakana: [
          { char: "ゾ", romaji: "zo" }, { char: "ダ", romaji: "da" },
          { char: "ヂ", romaji: "di" }, { char: "ヅ", romaji: "du" },
          { char: "デ", romaji: "de" },
        ],
      },
      {
        day: 13,
        facts: [
          "Japan's concept of 'Ikigai' is most powerful not as a grand life purpose but as thousands of small daily reasons to get up — a morning coffee ritual, a garden, a commute conversation.",
          "The Japanese word 'Yūgen' (幽玄) describes a profound awareness of the universe that triggers emotional responses too deep for words — the feeling when watching fog roll over mountains.",
          "Japan has over 6.5 million vending machines — roughly one for every 20 people. They collectively generate over $60 billion annually.",
          "The Japanese concept of 'Kodawari' (こだわり) means an uncompromising dedication to a personal standard — the obsessive pursuit of quality in one specific thing.",
          "Japan's Lost Decade of the 1990s saw the economy stagnate for over 10 years after a massive asset bubble collapsed — it permanently shaped Japanese attitudes toward wealth and work.",
          "The Japanese practice of 'Osoji' (大掃除) is a national deep cleaning ritual performed every December — homes, offices, and temples are cleaned from top to bottom before the new year.",
          "Japan's Noh theater is the world's oldest continuously performed theatrical tradition — dating back to the 14th century and still performed in its original form today.",
          "The Japanese word 'Wabi' refers to the beauty found in rustic simplicity — an imperfect, incomplete, transient beauty that is central to Japanese aesthetics.",
          "Japan has a law called the 'metabo law' that requires citizens between 40-74 to have their waistlines measured annually — companies are fined if too many employees are overweight.",
          "The Japanese concept of 'Furoshiki' (風呂敷) is the ancient art of wrapping objects in cloth — an eco-friendly practice that has seen a modern revival as an alternative to plastic bags.",
        ],
        phrases: [
          { jp: "幽玄", romaji: "Yuugen", en: "A profound awareness of the universe too deep for words — beauty beyond expression" },
          { jp: "こだわり", romaji: "Kodawari", en: "Uncompromising dedication to a personal standard — obsessive pursuit of quality" },
          { jp: "風呂敷", romaji: "Furoshiki", en: "Traditional cloth wrapping — an eco-friendly alternative to bags or boxes" },
          { jp: "少々お待ちください", romaji: "Shoushou omachi kudasai", en: "Please wait a moment — polite way to ask someone to wait" },
          { jp: "お邪魔します", romaji: "Ojama shimasu", en: "Sorry for intruding — said when entering someone's home or office" },
        ],
        hiragana: [
          { char: "ど", romaji: "do" }, { char: "ば", romaji: "ba" },
          { char: "び", romaji: "bi" }, { char: "ぶ", romaji: "bu" },
          { char: "べ", romaji: "be" },
        ],
        katakana: [
          { char: "ド", romaji: "do" }, { char: "バ", romaji: "ba" },
          { char: "ビ", romaji: "bi" }, { char: "ブ", romaji: "bu" },
          { char: "ベ", romaji: "be" },
        ],
      },
      {
        day: 14,
        facts: [
          "Japan's 'Salaryman' culture created an entire subculture of corporate workers who define themselves entirely by their company — a phenomenon studied worldwide as both devotion and cautionary tale.",
          "The Japanese word 'Gambaru' is more than encouragement — it describes a national trait of pushing through adversity that rebuilt Japan from the ruins of WWII into the world's second largest economy.",
          "Japan has over 200 cat cafés — but also hedgehog cafés, owl cafés, rabbit cafés, penguin cafés, and even a goat café. Animals are therapeutic in Japan's high-stress society.",
          "The Japanese concept of 'Shoganai' (しょうがない) means 'it can't be helped' — a cultural acceptance of situations beyond your control that is both pragmatic and psychologically protective.",
          "Japan's Pachinko gambling industry generates more revenue than Las Vegas, Macau, and Singapore combined — yet it technically isn't gambling because prizes can't be directly exchanged for cash.",
          "The Japanese word 'Mendokusai' (面倒くさい) means troublesome, annoying, or too much effort — a deeply relatable concept used constantly in casual speech.",
          "Japan has a national holiday called 'Respect for the Aged Day' — on this day communities honor their elders, particularly those over 100.",
          "The tea master Sen no Rikyu (1522-1591) developed the Japanese tea ceremony into a complete philosophy of living — his concept of Wabi-cha shaped Japanese culture for 500 years.",
          "Japan's Hiroshima Peace Memorial Park receives over 1.5 million visitors per year — it stands where the atomic bomb detonated and is a powerful symbol of global anti-nuclear advocacy.",
          "The Japanese concept of 'Uchi-Soto' (内外) divides the world into in-group (uchi) and out-group (soto) — behavior, language, and obligations shift entirely depending on which group you're in.",
        ],
        phrases: [
          { jp: "しょうがない", romaji: "Shoganai", en: "It can't be helped — cultural acceptance of situations beyond your control" },
          { jp: "面倒くさい", romaji: "Mendokusai", en: "Troublesome / too much effort — very common in casual speech" },
          { jp: "内外", romaji: "Uchi-Soto", en: "In-group vs out-group — behavior and language shift depending on who you're with" },
          { jp: "気をつけて", romaji: "Ki wo tsukete", en: "Take care / be careful — said when someone is leaving or in a risky situation" },
          { jp: "お大事に", romaji: "Odaiji ni", en: "Take care of yourself — said to someone who is sick" },
        ],
        hiragana: [
          { char: "ぼ", romaji: "bo" }, { char: "ぱ", romaji: "pa" },
          { char: "ぴ", romaji: "pi" }, { char: "ぷ", romaji: "pu" },
          { char: "ぺ", romaji: "pe" },
        ],
        katakana: [
          { char: "ボ", romaji: "bo" }, { char: "パ", romaji: "pa" },
          { char: "ピ", romaji: "pi" }, { char: "プ", romaji: "pu" },
          { char: "ペ", romaji: "pe" },
        ],
      },
      {
        day: 15,
        facts: [
          "Japan's traditional performing arts — Noh, Kabuki, and Bunraku puppet theater — are all UNESCO Intangible Cultural Heritage. A Kabuki actor trains from childhood and may not perform leading roles until their 40s. The art form transmits unchanged across 400 years.",
          "The Japanese word 'Itadakimasu' contains the humble verb form 'itadaku' — expressing that you are lowering yourself to humbly receive the gift of the meal.",
          "Japan has a tradition of 'Nanakusa' — eating a rice porridge with seven spring herbs on January 7th to wish for good health throughout the year.",
          "The Japanese concept of 'Ensō' (円相) — a hand-drawn circle in Zen philosophy — represents the universe, completeness, and the perfection of imperfection.",
          "Japan's earthquake early warning system can detect a tremor and alert Tokyo within seconds — giving residents 10-30 precious seconds before shaking begins.",
          "The Japanese word 'Aware' in 'Mono no Aware' derives from an exclamation — like 'ah' — expressing the gut-level emotional response to fleeting beauty.",
          "Japan has a tradition called 'Setsubun' where on February 3rd people throw roasted soybeans out their doors while shouting 'Oni wa soto, Fuku wa uchi' — Out with demons, in with fortune.",
          "The Japanese concept of 'Zanshin' (残心) means remaining mind — a state of relaxed alertness maintained even after completing an action. Used in martial arts and tea ceremony.",
          "Japan's anime industry exports content to over 140 countries — it is one of Japan's most powerful tools of soft power and cultural diplomacy.",
          "The Japanese writing system requires mastery of three separate scripts — hiragana, katakana, and kanji — plus the ability to read and write roman letters (romaji). Most Japanese people master all four.",
        ],
        phrases: [
          { jp: "円相", romaji: "Ensou", en: "A Zen circle representing completeness and the perfection of imperfection" },
          { jp: "残心", romaji: "Zanshin", en: "Remaining mind — relaxed alertness maintained after completing an action" },
          { jp: "どんまい", romaji: "Donmai", en: "Don't mind / no worries — casual encouragement after a mistake (from English 'don't mind')" },
          { jp: "マジで", romaji: "Maji de", en: "Seriously? / For real? — very casual expression of disbelief or emphasis" },
          { jp: "やばい", romaji: "Yabai", en: "Crazy / incredible / dangerous — originally negative slang, now used for anything extreme" },
        ],
        hiragana: [
          { char: "ぽ", romaji: "po" }, { char: "きゃ", romaji: "kya" },
          { char: "きゅ", romaji: "kyu" }, { char: "きょ", romaji: "kyo" },
          { char: "しゃ", romaji: "sha" },
        ],
        katakana: [
          { char: "ポ", romaji: "po" }, { char: "キャ", romaji: "kya" },
          { char: "キュ", romaji: "kyu" }, { char: "キョ", romaji: "kyo" },
          { char: "シャ", romaji: "sha" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // WEEK 4
  // ─────────────────────────────────────────
  {
    weekNum: 4,
    days: [
      {
        day: 16,
        facts: [
          "Japan's 'Meiji Restoration' of 1868 was one of history's most rapid modernizations — in 40 years Japan went from feudal samurai society to a modern industrial nation.",
          "The Japanese concept of 'Bunmei Kaika' (文明開化) — civilization and enlightenment — was the Meiji era slogan as Japan adopted Western technology while preserving Japanese values.",
          "Japan has a tradition of 'Hanko' (判子) — personal seal stamps used instead of signatures on official documents. Every Japanese person has their own unique stamp.",
          "The Japanese word 'Senpai' (先輩) refers to a senior or mentor in school or work — the Senpai-Kohai relationship is a cornerstone of Japanese social structure.",
          "Japan's Osaka-Kobe-Kyoto region (Kansai) has its own dialect, culture, comedy style, and even different ways of riding escalators — stand on the right, not the left.",
          "The Japanese concept of 'Kintsugi' (金継ぎ) is the art of repairing broken pottery with gold — turning damage into beauty. A physical embodiment of Wabi-Sabi.",
          "Japan produces over 1 billion manga volumes per year — the industry is larger than all of Hollywood's domestic box office combined.",
          "The Japanese word 'Giri' (義理) means social obligation or duty — doing things not out of desire but out of obligation to maintain harmony in relationships.",
          "Japan's 'Mottainai' philosophy has become a global environmental movement — the idea that wasting any resource shows disrespect for the effort that went into creating it.",
          "Japan hosts the world's most elaborate convenience store culture — 7-Eleven Japan is completely different from American 7-Eleven, offering fresh food, banking, and government services.",
        ],
        phrases: [
          { jp: "金継ぎ", romaji: "Kintsugi", en: "Repairing broken pottery with gold — turning damage into beauty" },
          { jp: "先輩", romaji: "Senpai", en: "Senior / mentor — someone with more experience in school or work" },
          { jp: "後輩", romaji: "Kouhai", en: "Junior — someone with less experience, the counterpart to senpai" },
          { jp: "義理", romaji: "Giri", en: "Social obligation / duty — doing things to maintain harmony in relationships" },
          { jp: "判子", romaji: "Hanko", en: "Personal seal stamp — used instead of a signature on official documents" },
        ],
        hiragana: [
          { char: "しゅ", romaji: "shu" }, { char: "しょ", romaji: "sho" },
          { char: "ちゃ", romaji: "cha" }, { char: "ちゅ", romaji: "chu" },
          { char: "ちょ", romaji: "cho" },
        ],
        katakana: [
          { char: "シュ", romaji: "shu" }, { char: "ショ", romaji: "sho" },
          { char: "チャ", romaji: "cha" }, { char: "チュ", romaji: "chu" },
          { char: "チョ", romaji: "cho" },
        ],
      },
      {
        day: 17,
        facts: [
          "Japan's 'Lost Generation' — those who graduated during the economic stagnation of the 1990s and 2000s — never fully recovered economically, creating a lasting demographic scar.",
          "The Japanese word 'Hikikomori' (引きこもり) describes people who withdraw completely from society, sometimes not leaving their rooms for years — Japan has an estimated 1+ million hikikomori.",
          "Japan's Golden Gate equivalent — the Akashi Kaikyo Bridge — is the world's longest suspension bridge at 3,911 meters, connecting Honshu to Awaji Island.",
          "The Japanese concept of 'Seijaku' (静寂) means silence and tranquility — the ability to find stillness in the middle of activity, like the eye of a storm.",
          "Japan has a tradition called 'Mizuage' — a coming of age ceremony for sumo wrestlers when they first enter the professional ranks, marked by a distinctive hairstyle.",
          "The Japanese word 'Shibui' (渋い) describes a subtle, unassuming beauty that reveals itself slowly — the opposite of flashy, it's the aesthetic of quiet elegance.",
          "Japan's 'Super Aged Society' is the most extreme in the world — over 28% of the population is 65 or older, creating enormous pension and healthcare pressures.",
          "The Japanese concept of 'Mushin' (無心) from Zen Buddhism means 'no mind' — acting without conscious thought, ego, or hesitation. The mental state of peak performance.",
          "Japan leads the world in robot-assisted elder care — with a shrinking workforce and aging population, robots now help bathe, lift, and socialize with elderly residents.",
          "The Japanese art of 'Ikebana' (生け花) — flower arranging — is not decoration but a meditative discipline with centuries of formal schools, rules, and philosophy.",
        ],
        phrases: [
          { jp: "静寂", romaji: "Seijaku", en: "Silence and tranquility — finding stillness in the middle of activity" },
          { jp: "無心", romaji: "Mushin", en: "No mind — acting without ego or hesitation, the state of peak performance" },
          { jp: "渋い", romaji: "Shibui", en: "Subtle understated elegance — quiet beauty that reveals itself slowly" },
          { jp: "生け花", romaji: "Ikebana", en: "Japanese flower arranging — a meditative art form with formal schools and philosophy" },
          { jp: "引きこもり", romaji: "Hikikomori", en: "Extreme social withdrawal — people who isolate completely from society" },
        ],
        hiragana: [
          { char: "にゃ", romaji: "nya" }, { char: "にゅ", romaji: "nyu" },
          { char: "にょ", romaji: "nyo" }, { char: "ひゃ", romaji: "hya" },
          { char: "ひゅ", romaji: "hyu" },
        ],
        katakana: [
          { char: "ニャ", romaji: "nya" }, { char: "ニュ", romaji: "nyu" },
          { char: "ニョ", romaji: "nyo" }, { char: "ヒャ", romaji: "hya" },
          { char: "ヒュ", romaji: "hyu" },
        ],
      },
      {
        day: 18,
        facts: [
          "Japan's concept of 'Omoiyari' (思いやり) means empathy and consideration for others — anticipating needs before they are expressed. It's the invisible force behind Japan's legendary service culture.",
          "The Japanese word 'Ninjou' (人情) means human feeling and compassion — the warm humanity that connects people beyond formal rules and obligations.",
          "Japan's Shinto religion has no founder, no sacred scripture, and no fixed set of prayers — it is a nature-based spiritual practice of honoring the divine in all things.",
          "The Japanese word 'Kami' (神) refers to spirits or gods in Shinto — but it's broader than Western concepts of god, encompassing nature spirits, ancestral spirits, and forces of nature.",
          "Japan's population density in urban areas is extreme — Tokyo's 23 special wards house 9.7 million people in an area roughly the size of Los Angeles county.",
          "The Japanese word 'Gaman' (我慢) means enduring the seemingly unbearable with patience and dignity — a cultural value that helped Japan survive earthquakes, tsunamis, and atomic bombs.",
          "Japan has an island called Aogashima — a remote volcanic island with only 200 residents, accessible only by helicopter or boat when weather permits.",
          "Japan has a ritual called 'Misogi' (禅ぎ) — purification through cold water — that predates recorded history. It survives in Shinto shrine ceremonies, cold-water marathons, and the Japanese belief that discomfort willingly endured builds character.",
          "Japan's samurai class developed 'Bushido' (武士道) — the way of the warrior — a code of ethics emphasizing loyalty, honor, and discipline that still influences Japanese culture today.",
          "The Japanese word 'Otaku' (オタク) originally meant a socially awkward obsessive — but has been reclaimed globally as a badge of honor for deep fandom of any subject.",
        ],
        phrases: [
          { jp: "思いやり", romaji: "Omoiyari", en: "Empathy and consideration — anticipating others' needs before they express them" },
          { jp: "我慢", romaji: "Gaman", en: "Enduring with patience and dignity — resilience in the face of hardship" },
          { jp: "武士道", romaji: "Bushido", en: "The way of the warrior — samurai code of loyalty, honor, and discipline" },
          { jp: "人情", romaji: "Ninjou", en: "Human warmth and compassion — the warm humanity connecting people beyond formal rules" },
          { jp: "オタク", romaji: "Otaku", en: "Obsessive fan — originally negative slang, now a global badge of deep fandom" },
        ],
        hiragana: [
          { char: "ひょ", romaji: "hyo" }, { char: "みゃ", romaji: "mya" },
          { char: "みゅ", romaji: "myu" }, { char: "みょ", romaji: "myo" },
          { char: "りゃ", romaji: "rya" },
        ],
        katakana: [
          { char: "ヒョ", romaji: "hyo" }, { char: "ミャ", romaji: "mya" },
          { char: "ミュ", romaji: "myu" }, { char: "ミョ", romaji: "myo" },
          { char: "リャ", romaji: "rya" },
        ],
      },
      {
        day: 19,
        facts: [
          "Japan's architecture firm Kengo Kuma designed the 2020 Tokyo Olympic Stadium using wood and natural materials — deliberately creating harmony between modern construction and traditional Japanese aesthetics.",
          "The Japanese word 'Tobikomi' (飛び込み) means jumping in — in sales it refers to cold calling, walking into businesses without appointments, a practice still common in Japan.",
          "Japan has a unique form of street food culture called 'Yatai' (屋台) — mobile food stalls that appear at festivals, streets, and parks serving everything from ramen to takoyaki.",
          "The Japanese concept of 'Kaigi' (会議) — meetings — are notoriously long and detailed because every stakeholder must reach consensus before a decision is finalized.",
          "Japan's Aichi prefecture has more industrial robots than most countries combined — it is the manufacturing heart of Japan and home to Toyota's global headquarters.",
          "Japan's Udon vs Soba divide is a cultural fault line — western Japan (Osaka, Kyoto) prefers thick udon in light dashi broth while eastern Japan (Tokyo) favors buckwheat soba in darker soy broth. What you order reveals which cultural tradition you belong to.",
          "Japan's 'Taiko' drumming tradition dates back over 1,400 years — the drums were originally used in religious ceremonies, then warfare, and now world-touring performance art.",
          "The Japanese concept of 'En' (縁) means fate or connection — the invisible thread that connects people who were meant to meet. Meeting someone is never coincidence in Japanese thinking.",
          "Japan has a practice of giving 'Omiyage' (お土産) — souvenir gifts — whenever you travel anywhere. Returning from a trip without gifts for colleagues and family is considered very rude.",
          "The Japanese word 'Kuuki wo yomu' (空気を読む) means 'read the air' — the social skill of understanding unspoken context, mood, and expectations in a room.",
        ],
        phrases: [
          { jp: "縁", romaji: "En", en: "Fate or connection — the invisible thread that connects people meant to meet" },
          { jp: "お土産", romaji: "Omiyage", en: "Souvenir gifts — brought back whenever you travel, giving them is socially mandatory" },
          { jp: "空気を読む", romaji: "Kuuki wo yomu", en: "Read the air — understand unspoken social context and expectations in a room" },
          { jp: "屋台", romaji: "Yatai", en: "Mobile food stall — appears at festivals and streets serving street food" },
          { jp: "ご縁がありますように", romaji: "Goen ga arimasu you ni", en: "May we be connected by fate — a blessing said when parting from someone special" },
        ],
        hiragana: [
          { char: "りゅ", romaji: "ryu" }, { char: "りょ", romaji: "ryo" },
          { char: "ぎゃ", romaji: "gya" }, { char: "ぎゅ", romaji: "gyu" },
          { char: "ぎょ", romaji: "gyo" },
        ],
        katakana: [
          { char: "リュ", romaji: "ryu" }, { char: "リョ", romaji: "ryo" },
          { char: "ギャ", romaji: "gya" }, { char: "ギュ", romaji: "gyu" },
          { char: "ギョ", romaji: "gyo" },
        ],
      },
      {
        day: 20,
        facts: [
          "Japan's concept of 'Ikigai' has been misrepresented in the West — the famous four-circle Venn diagram was actually created by a Western author. Real Ikigai in Japan is simpler: small daily joys.",
          "The Japanese word 'Shouganai' is sometimes criticized as enabling passivity — but Japanese psychologists argue it reduces anxiety by separating what you can and cannot control.",
          "Japan's Bullet Train network is expanding — by 2050 maglev lines connecting Tokyo, Nagoya, and Osaka will shrink the trip from 3 hours to under 40 minutes.",
          "The Japanese concept of 'Miyabi' (雅) represents the Heian court aesthetic of elegance, refinement, and sensitivity to beauty — the cultural DNA behind Japanese art for 1,000 years.",
          "Japan has a concept called 'Ishin-Denshin' (以心伝心) — communicating heart to heart without words. The Japanese believe deep relationships require no explanation.",
          "The Japanese word 'Noh' (能) describes the theatrical tradition but also means 'skill' or 'talent' — reminding performers that the art demands a lifetime of mastery.",
          "Japan's 'Ryokan' (旅館) — traditional inns — offer full-service experiences including multi-course kaiseki meals, yukata robes, and communal hot spring baths.",
          "The Japanese concept of 'Furyu' (風流) means an appreciation for nature-inspired elegance — finding beauty in seasons, impermanence, and natural cycles.",
          "Japan's earthquake preparedness is among the world's best — every September 1st is Disaster Prevention Day and the entire country practices emergency drills.",
          "The Japanese word 'Shibumi' (渋み) — related to shibui — is the quality of elegant restraint in design, speech, and behavior. Less is infinitely more.",
        ],
        phrases: [
          { jp: "雅", romaji: "Miyabi", en: "Elegant refinement and sensitivity to beauty — the aesthetic ideal of the Heian court" },
          { jp: "以心伝心", romaji: "Ishin-denshin", en: "Communicating heart to heart without words — understanding without explanation" },
          { jp: "旅館", romaji: "Ryokan", en: "Traditional Japanese inn — hot springs, kaiseki meals, and yukata robes" },
          { jp: "渋み", romaji: "Shibumi", en: "Elegant restraint — the quality of less being infinitely more" },
          { jp: "いらっしゃいませ", romaji: "Irasshaimase", en: "Welcome to our establishment — heard in every shop, restaurant, and hotel in Japan" },
        ],
        hiragana: [
          { char: "じゃ", romaji: "ja" }, { char: "じゅ", romaji: "ju" },
          { char: "じょ", romaji: "jo" }, { char: "びゃ", romaji: "bya" },
          { char: "びゅ", romaji: "byu" },
        ],
        katakana: [
          { char: "ジャ", romaji: "ja" }, { char: "ジュ", romaji: "ju" },
          { char: "ジョ", romaji: "jo" }, { char: "ビャ", romaji: "bya" },
          { char: "ビュ", romaji: "byu" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // WEEK 5
  // ─────────────────────────────────────────
  {
    weekNum: 5,
    days: [
      {
        day: 21,
        facts: [
          "Japan's window tinting industry is growing rapidly — car customization culture is strong, and UV protection is critical given Japan's intense summer sun.",
          "Japan's automotive market is unique — nearly 40% of cars sold are 'Kei' cars (軽自動車), miniature vehicles designed for Japan's narrow streets. These tiny cars have their own distinct insurance tier, tax category, and design culture.",
          "Japan has over 80 million registered vehicles — making it one of the world's largest automotive markets and a massive opportunity for automotive service businesses.",
          "The Japanese word 'Eigyo' (営業) means business or sales — but in Japanese culture it implies building trust over time, not aggressive selling.",
          "Japan's Keiretsu (系列) business system links manufacturers, suppliers, and distributors in tight networks of mutual loyalty — very different from Western arm's-length business relationships.",
          "In Japanese business, prolonged silence after a proposal is rarely neutral — it often signals discomfort too polite to express directly. Reading 'ma' (間) — the meaningful pause — is one of the most valuable and least taught skills in Japanese business culture.",
          "Japan has a tradition of 'Meishi Koukan' (名刺交換) — business card exchange as a ritual. How you handle a card signals how you will handle the relationship.",
          "The Japanese concept of 'Shoubai' (商売) — commerce and trade — carries a moral dimension. A good merchant creates value for the community, not just profit for themselves.",
          "Japan's automotive aftermarket is worth over $30 billion annually — modifications, accessories, and maintenance services are deeply embedded in Japanese car culture.",
          "The word 'Ganbarimasu' (頑張ります) — I will do my best — is said before undertaking any serious commitment in Japan. It's a declaration of full effort, not just a casual promise.",
        ],
        phrases: [
          { jp: "営業", romaji: "Eigyo", en: "Business / sales — implies trust-building over time, not aggressive selling" },
          { jp: "系列", romaji: "Keiretsu", en: "Business network — tightly linked companies in mutual loyalty relationships" },
          { jp: "名刺交換", romaji: "Meishi koukan", en: "Business card exchange — a ritual that signals how you will handle the relationship" },
          { jp: "商売", romaji: "Shoubai", en: "Commerce — carrying moral weight, good merchants create value for the community" },
          { jp: "頑張ります", romaji: "Ganbarimasu", en: "I will do my best — a declaration of full effort before serious commitment" },
        ],
        hiragana: [
          { char: "びょ", romaji: "byo" }, { char: "ぴゃ", romaji: "pya" },
          { char: "ぴゅ", romaji: "pyu" }, { char: "ぴょ", romaji: "pyo" },
          { char: "っ", romaji: "(double consonant)" },
        ],
        katakana: [
          { char: "ビョ", romaji: "byo" }, { char: "ピャ", romaji: "pya" },
          { char: "ピュ", romaji: "pyu" }, { char: "ピョ", romaji: "pyo" },
          { char: "ッ", romaji: "(double consonant)" },
        ],
      },
      {
        day: 22,
        facts: [
          "Japan's four seasons — 'Shiki' (四季) — are a national obsession. Seasonal menus, fashion, greetings, and convenience store products change with the season. Being seasonally aware — noticing the first autumn leaf, the first spring blossom — is a mark of cultural sophistication.",
          "Japan's Onsen (温泉) hot spring culture has over 27,000 facilities nationwide. Bathing is both therapeutic and deeply social — the etiquette is strict, the silence often absolute, and the experience considered essential to understanding what it means to rest in Japan.",
          "Japan's Akihabara district transformed from a post-war black market into the global center of electronics culture — showing Japan's ability to reinvent itself completely.",
          "The Japanese word 'Chotto' (ちょっと) literally means 'a little' but is used to politely decline, delay, or soften any request. Saying 'chotto...' with a pause means 'I'd rather not.'",
          "Japan has a tradition called 'Hatsumode' (初詣) — the first shrine or temple visit of the New Year. Over 100 million Japanese people make this pilgrimage in January.",
          "The Japanese word 'Sempuku' means hidden or underground — Japanese culture has a long tradition of hidden beauty, secret gardens, and private worlds beneath the public surface.",
          "Japan's Okinawa has its own distinct culture, music (Ryukyuan), dialect, and cuisine — distinctly different from mainland Japan in ways that still create political tension today.",
          "The Japanese concept of 'Sodo' (騒動) means commotion or uproar — and the Japanese instinct to avoid it at all costs drives much of Japanese social behavior.",
          "Japan has a specific guilt around receiving an overly lavish gift — creating an obligation the recipient cannot match causes discomfort, not gratitude. Japanese gift-giving is a carefully calibrated social system where balance matters as much as generosity.",
          "The Japanese word 'Otsukaresama' is said constantly in workplaces — it literally means 'you must be tired' but is used as a greeting, a farewell, and an acknowledgment of effort.",
        ],
        phrases: [
          { jp: "ちょっと", romaji: "Chotto", en: "A little / just a moment — also a soft polite way to decline or hesitate" },
          { jp: "初詣", romaji: "Hatsumode", en: "First shrine visit of the New Year — over 100 million people participate" },
          { jp: "お疲れ様でした", romaji: "Otsukaresama deshita", en: "Thank you for your hard work — said at end of day or after completing a task" },
          { jp: "いかがですか", romaji: "Ikaga desu ka", en: "How about it? / How are you? — polite way to offer or inquire" },
          { jp: "かまいません", romaji: "Kamaimasen", en: "I don't mind / it's fine — polite way to say something is no problem" },
        ],
        hiragana: [
          { char: "ー", romaji: "(long vowel mark)" }, { char: "きゃ", romaji: "kya" },
          { char: "にゃ", romaji: "nya" }, { char: "ひゃ", romaji: "hya" },
          { char: "りゃ", romaji: "rya" },
        ],
        katakana: [
          { char: "ー", romaji: "(long vowel mark)" }, { char: "ファ", romaji: "fa" },
          { char: "フィ", romaji: "fi" }, { char: "フェ", romaji: "fe" },
          { char: "フォ", romaji: "fo" },
        ],
      },
      {
        day: 23,
        facts: [
          "Japan's Shinkansen uses an advanced system called 'ATC' — Automatic Train Control — that communicates between trains and track sensors thousands of times per second to prevent collisions.",
          "The Japanese word 'Katachi' (形) means form or shape — in Japanese art and design, the shape of something carries as much meaning as its function.",
          "Japan has a tradition of 'Origami' (折り紙) — the art of paper folding — that dates back to the 17th century. Today NASA uses origami principles to fold solar panels for space deployment.",
          "The Japanese concept of 'Zoka' (造化) means the creative force of nature — the idea that nature itself is the greatest designer and humans should follow rather than fight it.",
          "Japan's mobile payment adoption is growing rapidly after years of cash dominance — the country is transitioning from one of the most cash-dependent economies to digital payments.",
          "The Japanese word 'Kokoro' (心) means heart, mind, and soul simultaneously — Japanese culture does not separate intellectual and emotional intelligence as Western cultures do.",
          "Japan has a concept called 'Kokorozashi' (志) — a burning ambition or life mission that goes beyond career goals into a sense of duty to contribute something meaningful to the world.",
          "Japan's 'Kadō' (華道) — the way of flowers — is one of Japan's traditional arts alongside tea ceremony and calligraphy. All three are considered paths to self-cultivation.",
          "The Japanese word 'Aware' appears in the concept of Mono no Aware but also stands alone — it's the sound of a sigh, the gut-level response to transient beauty.",
          "Japan's 'Zazen' (座禅) — seated Zen meditation — is practiced widely in Japan and exported globally as mindfulness. It's about sitting with discomfort until the mind stills.",
        ],
        phrases: [
          { jp: "心", romaji: "Kokoro", en: "Heart / mind / soul — Japanese does not separate intellect and emotion" },
          { jp: "志", romaji: "Kokorozashi", en: "Burning ambition / life mission — a sense of duty to contribute something meaningful" },
          { jp: "形", romaji: "Katachi", en: "Form or shape — carries as much meaning as function in Japanese art and design" },
          { jp: "座禅", romaji: "Zazen", en: "Seated Zen meditation — sitting with discomfort until the mind stills" },
          { jp: "よろしければ", romaji: "Yoroshikereba", en: "If it's alright with you — extremely polite way to make a suggestion or request" },
        ],
        hiragana: [
          { char: "じゃ", romaji: "ja" }, { char: "ちゃ", romaji: "cha" },
          { char: "しゃ", romaji: "sha" }, { char: "にゃ", romaji: "nya" },
          { char: "みゃ", romaji: "mya" },
        ],
        katakana: [
          { char: "ウィ", romaji: "wi" }, { char: "ウェ", romaji: "we" },
          { char: "ウォ", romaji: "wo" }, { char: "ヴァ", romaji: "va" },
          { char: "ヴィ", romaji: "vi" },
        ],
      },
      {
        day: 24,
        facts: [
          "Japan's concept of service excellence means a ramen shop owner who has spent 30 years perfecting one broth recipe is held in the same esteem as a surgeon or professor.",
          "The Japanese word 'Teinei' (丁寧) means polite, careful, and thorough — it describes both the quality of work and the manner of a person. Being teinei is one of the highest compliments.",
          "Japan has a tradition called 'Shichi-Go-San' (七五三) — a ceremony for children aged 3, 5, and 7 who visit shrines in formal dress to pray for healthy growth.",
          "The Japanese concept of 'Sabi' — the 'Sabi' in Wabi-Sabi — means the beauty that comes with age, wear, and the passage of time. Older is often more beautiful in Japan.",
          "Japan's automotive culture includes a phenomenon called 'Shakotan' — modified cars lowered dramatically close to the ground, reflecting a distinctly Japanese aesthetic of customization.",
          "The Japanese word 'Kando' (感動) means being deeply moved — the emotional resonance that comes from witnessing something truly excellent, beautiful, or kind.",
          "The Japanese concept of 'Kata' (型) — a practiced form passed down through generations — appears in martial arts, calligraphy, tea ceremony, and carpentry. Kata is how Japan transmits exact knowledge across centuries without losing precision or intent.",
          "The Japanese concept of 'Tao' in its Japanese form 'Do' (道) means 'the way' — Judo, Kendo, Bushido all use Do to signify a path of self-cultivation through practice.",
          "Japan's Studio Ghibli films are among the highest-grossing animated films in history — Spirited Away became the first non-English film to win the Academy Award for Best Animated Feature.",
          "The Japanese word 'Makoto' (誠) means sincerity, honesty, and integrity — it was one of the key virtues of Bushido and remains a core Japanese value today.",
        ],
        phrases: [
          { jp: "丁寧", romaji: "Teinei", en: "Polite, careful, and thorough — one of the highest compliments in Japanese" },
          { jp: "感動", romaji: "Kando", en: "Being deeply moved — the emotional resonance from witnessing true excellence" },
          { jp: "道", romaji: "Do", en: "The way — a path of self-cultivation through disciplined practice" },
          { jp: "誠", romaji: "Makoto", en: "Sincerity, honesty, integrity — a core Bushido virtue that remains central today" },
          { jp: "失礼ですが", romaji: "Shitsurei desu ga", en: "Excuse me but — polite way to interrupt or raise a potentially uncomfortable topic" },
        ],
        hiragana: [
          { char: "ぎゃ", romaji: "gya" }, { char: "じゃ", romaji: "ja" },
          { char: "びゃ", romaji: "bya" }, { char: "ぴゃ", romaji: "pya" },
          { char: "りゃ", romaji: "rya" },
        ],
        katakana: [
          { char: "ヴェ", romaji: "ve" }, { char: "ヴォ", romaji: "vo" },
          { char: "ティ", romaji: "ti" }, { char: "ディ", romaji: "di" },
          { char: "トゥ", romaji: "tu" },
        ],
      },
      {
        day: 25,
        facts: [
          "Japan's Polar Tint equivalent businesses thrive in the country's hot, humid summers — UV protection is not just cosmetic but medical, as Japan has rising skin cancer awareness.",
          "Japan's quality philosophy produced 'poka-yoke' (ポカヨケ) — mistake-proofing — a manufacturing discipline that builds errors out of processes by design. This concept from Toyota's factory floors now underpins global quality systems from aviation to surgical instruments.",
          "Japan's business registration system is changing — foreigners can now register businesses more easily than before, though having a Japanese partner still significantly smooths the process.",
          "The Japanese word 'Kigyouka' (起業家) means entrepreneur — and entrepreneurship culture in Japan, while historically less celebrated than in America, is rapidly changing with a new generation.",
          "Japan's 'Monozukuri' (物作り) — the art of making things — is a national philosophy that elevates manufacturing to cultural expression. Making something well is an act of love.",
          "The Japanese concept of 'Niche' markets is extremely strong — Japanese consumers are among the world's most specialized and willing to pay premium prices for excellence in specific categories.",
          "Japan's franchise system is highly advanced — companies like 7-Eleven Japan have perfected franchise operations with centralized supply chains, data analytics, and real-time inventory.",
          "The Japanese word 'Jibun' (自分) means oneself or one's own — understanding your own identity and values (your Ikigai) is considered the foundation of all successful endeavors.",
          "Japan's window film industry is estimated at over $500 million annually — combining automotive, architectural, and safety film applications across one of the world's most quality-conscious markets.",
          "The Japanese concept of 'Kaizen' applied to business means never being satisfied with the current state — every process can always be improved by 1% and those 1%s compound into transformation.",
        ],
        phrases: [
          { jp: "物作り", romaji: "Monozukuri", en: "The art of making things — elevating manufacturing to cultural expression" },
          { jp: "起業家", romaji: "Kigyouka", en: "Entrepreneur — entrepreneurship culture growing rapidly in modern Japan" },
          { jp: "自分", romaji: "Jibun", en: "Oneself — understanding your own identity and values is the foundation of success" },
          { jp: "ご苦労様です", romaji: "Gokurousama desu", en: "Thank you for your efforts — said to someone who has worked hard for you specifically" },
          { jp: "末永くよろしく", romaji: "Suenagaku yoroshiku", en: "I look forward to a long relationship — said when starting a long-term business partnership" },
        ],
        hiragana: [
          { char: "あ", romaji: "a" }, { char: "い", romaji: "i" },
          { char: "う", romaji: "u" }, { char: "え", romaji: "e" },
          { char: "お", romaji: "o" },
        ],
        katakana: [
          { char: "ア", romaji: "a" }, { char: "イ", romaji: "i" },
          { char: "ウ", romaji: "u" }, { char: "エ", romaji: "e" },
          { char: "オ", romaji: "o" },
        ],
      },
    ],
  },
];

// ═══════════════════════════════════════════
// QUIZ QUESTION BANK
// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
// UNIFIED QUESTION BANK
// Quizzes pull by day key; tests flatten all and shuffle.
// Type "matching" uses pairs[] instead of options/answer.
// ═══════════════════════════════════════════
const QUESTION_BANK = {
  1: [
    { type: "mc", cat: "Fact", q: "Which four islands do most Japanese people live on?", options: ["Okinawa, Kyushu, Shikoku, Hokkaido", "Honshu, Hokkaido, Kyushu, Shikoku", "Honshu, Tokyo, Osaka, Kyoto", "Kyushu, Nara, Fuji, Hokkaido"], answer: 1, exp: "The four main islands are Honshu, Hokkaido, Kyushu, and Shikoku." },
    { type: "mc", cat: "Fact", q: "What does the word 'emoji' literally mean?", options: ["Funny face", "Picture character", "Small drawing", "Digital art"], answer: 1, exp: "'E' = picture, 'moji' = character. 100% Japanese origin." },
    { type: "tf", cat: "Fact", q: "Japan is larger than California in land area.", answer: false, exp: "False — California is slightly larger. But Japan has 3x more people." },
    { type: "tf", cat: "Fact", q: "Tokyo's greater metro area is the largest in the world.", answer: true, exp: "True — 37–38 million people. Largest metropolitan area on Earth." },
    { type: "mc", cat: "Phrase", q: "What does Itadakimasu mean?", options: ["Good morning", "I humbly receive — said before eating", "Thank you", "Excuse me"], answer: 1, exp: "Said before every meal as gratitude for the food." },
    { type: "mc", cat: "Phrase", q: "What does Sumimasen mean?", options: ["Good evening", "Excuse me / Sorry", "I'm full", "See you later"], answer: 1, exp: "Incredibly versatile — apologize, get attention, or thank someone." },
    { type: "tf", cat: "Phrase", q: "Daijoubu means it's okay / I'm fine.", answer: true, exp: "True — very versatile, used constantly." },
    { type: "spell", cat: "Phrase", q: "Type the ROMAJI spelling:\nありがとう", answer: "arigatou", answers: ["arigatou", "arigato"], exp: "Arigatou — thank you. あ=a り=ri が=ga と=to う=u." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nあ", answer: "a", answers: ["a"], exp: "あ = 'a' — first hiragana vowel." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nい", answer: "i", answers: ["i"], exp: "い = 'i' — second vowel." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nう", answer: "u", answers: ["u"], exp: "う = 'u' — third vowel." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nえ", answer: "e", answers: ["e"], exp: "え = 'e' — fourth vowel." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nお", answer: "o", answers: ["o"], exp: "お = 'o' — fifth vowel." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nア", answer: "a", answers: ["a"], exp: "ア = 'a' — katakana version of あ." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nイ", answer: "i", answers: ["i"], exp: "イ = 'i' — katakana version of い." },
    { type: "soundToChar", cat: "Hiragana", q: "Type the HIRAGANA for 'a'\n🎌 Japanese keyboard", answer: "あ", answers: ["あ"], exp: "あ = 'a'. First hiragana vowel." },
    { type: "soundToChar", cat: "Hiragana", q: "Type the HIRAGANA for 'i'\n🎌 Japanese keyboard", answer: "い", answers: ["い"], exp: "い = 'i'. Second vowel." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'yes'\n🎌 Japanese keyboard", answer: "はい", answers: ["はい"], exp: "Hai (はい) — yes." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'no'\n🎌 Japanese keyboard", answer: "いいえ", answers: ["いいえ"], exp: "Iie (いいえ) — no." },
    { type: "translateJPEN", cat: "Phrase", q: "Translate to ENGLISH:\nいただきます", answer: "i humbly receive", answers: ["i humbly receive", "let's eat", "thank you for the food", "itadakimasu"], exp: "Itadakimasu — I humbly receive. Said before every meal." },
    { type:"wordorder", cat:"Phrase", q:"Arrange: 'How much does it cost?'\n⚠️ Not all words belong", words:["ka","ikura","doko","desu","nani"], answer:["ikura","desu","ka"], exp:"Ikura desu ka — question word + desu + ka." },
    { type:"wordorder", cat:"Phrase", q:"Arrange: 'Where is it?'\n⚠️ Not all words belong", words:["desu","doko","ikura","ka","mo"], answer:["doko","desu","ka"], exp:"Doko desu ka — same ka structure." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nいただき_____。(Said before eating)", answer:"ます", answers:["ます","masu"], exp:"いただきます — I humbly receive. ます is the polite verb ending." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"いただきます", words:["いただき","ます","です","した"], answer:["いただき","ます"], exp:"いただきます (Itadakimasu) — I humbly receive. Said before eating." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"ありがとうございます", words:["ありがとう","ございます","ください","おはよう"], answer:["ありがとう","ございます"], exp:"ありがとうございます — Thank you (polite)." },
    { type:"mc", cat:"Vocab", q:"Which Japanese concept means \"your reason for living\"?", options:["わびさび","いきがい","かいぜん","もったいない"], answer:1, exp:"Ikigai — where passion, skill, purpose, and livelihood meet." },
    { type:"mc", cat:"Vocab", q:"Which concept describes \"beauty in imperfection\"?", options:["いきがい","かろうし","わびさび","おもてなし"], answer:2, exp:"Wabi-Sabi — finding beauty in the imperfect and impermanent." },
    { type:"mc", cat:"Vocab", q:"Which word means \"continuous improvement\"?", options:["もったいない","かいぜん","いきがい","わびさび"], answer:1, exp:"Kaizen — small improvements every day. Toyota built an empire on it." },
    { type:"mc", cat:"Vocab", q:"Which word describes \"regret over waste\"?", options:["かいぜん","いきがい","もったいない","わびさび"], answer:2, exp:"Mottainai — refusing to waste anything as a form of respect." },
    { type:"tf", cat:"Fact", q:"Japan has four main islands: Honshu, Hokkaido, Kyushu, and Shikoku.", answer:true, exp:"True — these four islands are home to the vast majority of Japan's population." },
    { type:"tf", cat:"Fact", q:"Kaizen means \"death from overwork\".", answer:false, exp:"False — Kaizen means continuous improvement. Karoshi means death from overwork." },
    { type:"tf", cat:"Fact", q:"いただきます is said after finishing a meal.", answer:false, exp:"False — いただきます is said BEFORE eating. ごちそうさまでした is said after." },
    { type:"tf", cat:"Vocab", q:"もったいない has a direct English translation.", answer:false, exp:"False — Mottainai has no single English equivalent. It expresses deep regret over waste." },
    { type:"mc", cat:"Context", q:"You accidentally bump into someone on the train in Tokyo. What do you say?", options:["ありがとう","いただきます","すみません","おはよう"], answer:2, exp:"Sumimasen — excuse me / sorry. The most versatile apology in Japanese." },
    { type:"mc", cat:"Context", q:"Someone gives you a gift. What do you say?", options:["すみません","ありがとう","もったいない","いただきます"], answer:1, exp:"Arigatou — thank you. Add gozaimasu for politeness." },
  ],
  2: [
    { type: "mc", cat: "Fact", q: "What does Karoshi mean?", options: ["Forest bathing", "Continuous improvement", "Dying from overwork", "Finding beauty in imperfection"], answer: 2, exp: "Karoshi (過労死) — death from overwork. A real legal classification." },
    { type: "mc", cat: "Fact", q: "What does Wabi-Sabi represent?", options: ["Extreme perfection", "Hard work", "Beauty in imperfection", "Respect for elders"], answer: 2, exp: "Wabi-Sabi — finding beauty in what is imperfect or impermanent." },
    { type: "tf", cat: "Fact", q: "In Japan, tipping is considered polite.", answer: false, exp: "False — tipping is rude in Japan. Service is done with pride." },
    { type: "tf", cat: "Fact", q: "Japan has more pets than children.", answer: true, exp: "True — a result of the declining birth rate." },
    { type: "mc", cat: "Phrase", q: "What does Kanpai mean?", options: ["Good luck", "I'm sorry", "Cheers!", "Let's eat"], answer: 2, exp: "Kanpai (乾杯) — Cheers! Said every time you raise a glass." },
    { type: "tf", cat: "Phrase", q: "Yoroshiku onegaishimasu is important in Japanese business culture.", answer: true, exp: "True — the most important phrase when meeting someone professionally." },
    { type: "spell", cat: "Phrase", q: "Type the ROMAJI spelling:\nすみません", answer: "sumimasen", answers: ["sumimasen"], exp: "Sumimasen — excuse me. す=su み=mi ま=ma せ=se ん=n." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nか", answer: "ka", answers: ["ka"], exp: "か = 'ka'. First of the K-row." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nき", answer: "ki", answers: ["ki"], exp: "き = 'ki' — like 'key'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nく", answer: "ku", answers: ["ku"], exp: "く = 'ku'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nけ", answer: "ke", answers: ["ke"], exp: "け = 'ke'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nこ", answer: "ko", answers: ["ko"], exp: "こ = 'ko'." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nカ", answer: "ka", answers: ["ka"], exp: "カ = 'ka' — katakana version of か." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nコ", answer: "ko", answers: ["ko"], exp: "コ = 'ko' — appears in コーヒー (coffee)." },
    { type: "soundToChar", cat: "Hiragana", q: "Type the HIRAGANA for 'ka'\n🎌 Japanese keyboard", answer: "か", answers: ["か"], exp: "か = 'ka'. First of K-row." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'water'\n🎌 Japanese keyboard", answer: "みず", answers: ["みず"], exp: "Mizu (みず) — water." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'delicious'\n🎌 Japanese keyboard", answer: "おいしい", answers: ["おいしい"], exp: "Oishii (おいしい) — delicious." },
    { type: "translateJPEN", cat: "Phrase", q: "Translate to ENGLISH:\nいくらですか", answer: "how much does it cost", answers: ["how much does it cost", "how much is it", "how much is this", "ikura desu ka"], exp: "Ikura desu ka — How much does it cost?" },
    { type: "translateENJP", cat: "Phrase", q: "Translate to ROMAJI:\n'Thank you (casual)'", answer: "arigatou", answers: ["arigatou", "arigato"], exp: "Arigatou (ありがとう) — casual thank you." },
    { type: "wordorder", cat: "Phrase", q: "Arrange to say 'How much does it cost?'\n⚠️ Not all words belong", words: ["ka", "ikura", "doko", "desu", "nani"], answer: ["ikura", "desu", "ka"], exp: "Ikura desu ka — question word + desu + ka. Doko=where, nani=what are decoys." },
    { type:"wordorder", cat:"Phrase", q:"Arrange: 'Nice to meet you'\n⚠️ Not all words belong", words:["onegaishimasu","yoroshiku","sumimasen","gozaimasu"], answer:["yoroshiku","onegaishimasu"], exp:"Yoroshiku onegaishimasu." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nよろしく おねがい_____。(Nice to meet you)", answer:"します", answers:["します","shimasu"], exp:"よろしくおねがいします — します completes the polite request." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"よろしくおねがいします", words:["よろしく","おねがい","します","ください","です"], answer:["よろしく","おねがい","します"], exp:"よろしくおねがいします — Nice to meet you / Please treat me kindly." },
    { type:"mc", cat:"Vocab", q:"Which greeting means \"good afternoon\"?", options:["おはよう","こんにちは","こんばんは","おやすみ"], answer:1, exp:"Konnichiwa — good afternoon / hello. Used from late morning to evening." },
    { type:"mc", cat:"Vocab", q:"Which phrase means \"good evening\"?", options:["こんにちは","おはよう","こんばんは","さようなら"], answer:2, exp:"Konbanwa — good evening." },
    { type:"tf", cat:"Fact", q:"こんにちは can only be used at exactly noon.", answer:false, exp:"False — Konnichiwa is used from late morning through the afternoon/evening." },
    { type:"tf", cat:"Phrase", q:"おやすみなさい means \"good night\" and is said before sleeping.", answer:true, exp:"True — Oyasuminasai is the polite good night. Oyasumi is casual." },
    { type:"mc", cat:"Context", q:"It's 8 PM and you greet your Japanese host. What do you say?", options:["おはよう","こんにちは","こんばんは","おやすみ"], answer:2, exp:"Konbanwa — good evening. Used from sunset onward." },
    { type:"mc", cat:"Context", q:"You're leaving work. What do colleagues say to each other?", options:["いただきます","おつかれさまです","いってきます","おはよう"], answer:1, exp:"Otsukaresama desu — thank you for your hard work. Said daily." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nこんにちは", answer:"konnichiwa", answers:["konnichiwa","konnitiwa"], exp:"Konnichiwa — hello / good afternoon." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nこんばんは", answer:"konbanwa", answers:["konbanwa","konbanha"], exp:"Konbanwa — good evening." },
  ],
  3: [
    { type: "mc", cat: "Fact", q: "What does Karaoke literally mean?", options: ["Singing together", "Empty orchestra", "Night music", "Happy voice"], answer: 1, exp: "Kara = empty, oke = orchestra. Singer performs without a live band." },
    { type: "mc", cat: "Fact", q: "Which sport is more popular than sumo in Japan?", options: ["Soccer", "Basketball", "Baseball", "Tennis"], answer: 2, exp: "Baseball was introduced in the 1870s and Japan made it their own." },
    { type: "tf", cat: "Fact", q: "Kyoto was Japan's capital for over 1,000 years.", answer: true, exp: "True — capital from 794 until 1869 when Tokyo took over." },
    { type: "tf", cat: "Fact", q: "Japan's court conviction rate exceeds 99%.", answer: true, exp: "True — all cases decided by professional judges, not juries." },
    { type: "mc", cat: "Phrase", q: "What does Ganbatte mean?", options: ["Good morning", "Thank you", "Do your best / Keep going", "I understand"], answer: 2, exp: "Ganbatte — do your best. More personal than just saying good luck." },
    { type: "mc", cat: "Phrase", q: "What do you say when you walk through your door in Japan?", options: ["Konnichiwa", "Okaeri", "Tadaima", "Sumimasen"], answer: 2, exp: "Tadaima — I'm home. Said every single time without exception." },
    { type: "tf", cat: "Phrase", q: "Okaeri is said by the person arriving home.", answer: false, exp: "False — Tadaima is said by the person arriving. Okaeri is the response from those inside." },
    { type: "spell", cat: "Phrase", q: "Type the ROMAJI spelling:\nわかりました", answer: "wakarimashita", answers: ["wakarimashita"], exp: "Wakarimashita — I understand. わ=wa か=ka り=ri ま=ma し=shi た=ta." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nさ", answer: "sa", answers: ["sa"], exp: "さ = 'sa'. First of S-row." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nし", answer: "shi", answers: ["shi", "si"], exp: "し = 'shi' — irregular, not 'si'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nす", answer: "su", answers: ["su"], exp: "す = 'su'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nせ", answer: "se", answers: ["se"], exp: "せ = 'se'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nそ", answer: "so", answers: ["so"], exp: "そ = 'so'." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nサ", answer: "sa", answers: ["sa"], exp: "サ = 'sa' — katakana version of さ." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nシ", answer: "shi", answers: ["shi", "si"], exp: "シ = 'shi' — katakana version of し." },
    { type: "soundToChar", cat: "Hiragana", q: "Type the HIRAGANA for 'sa'\n🎌 Japanese keyboard", answer: "さ", answers: ["さ"], exp: "さ = 'sa'. First of S-row." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'friend'\n🎌 Japanese keyboard", answer: "ともだち", answers: ["ともだち"], exp: "Tomodachi (ともだち) — friend." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'I'm home'\n🎌 Japanese keyboard", answer: "ただいま", answers: ["ただいま"], exp: "Tadaima (ただいま) — I'm home." },
    { type: "translateJPEN", cat: "Phrase", q: "Translate to ENGLISH:\nただいま", answer: "i'm home", answers: ["i'm home", "im home", "i am home", "tadaima"], exp: "Tadaima — I'm home. Said every time you walk through the door." },
    { type: "wordorder", cat: "Phrase", q: "Arrange to say 'Where is it?'\n⚠️ Not all words belong", words: ["desu", "doko", "ikura", "ka", "mo", "ne"], answer: ["doko", "desu", "ka"], exp: "Doko desu ka — Where is it? Same ka structure as ikura desu ka." },
    { type:"complete", cat:"Grammar", q:"Complete — type the correct particle:\nともだち ___ はなします。('I talk with a friend.')", answer:"と", answers:["と","to"], exp:"と (to) marks the person you do an action with." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nおはよう _____。(Good morning - polite)", answer:"ございます", answers:["ございます","gozaimasu"], exp:"おはようございます — ございます is the polite suffix." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"おはようございます", words:["おはよう","ございます","こんにちは","します"], answer:["おはよう","ございます"], exp:"おはようございます — Good morning (polite)." },
    { type:"mc", cat:"Fact", q:"Which Japanese concept describes \"death from overwork\"?", options:["かいぜん","いきがい","かろうし","わびさび"], answer:2, exp:"Karoshi — Japan's dark side. Working yourself to death is so common it has its own word." },
    { type:"mc", cat:"Vocab", q:"What does ま mean as a concept?", options:["Food","Negative space / meaningful pause","Speed","Strength"], answer:1, exp:"Ma — the silence between notes, the space between objects. Emptiness with purpose." },
    { type:"tf", cat:"Fact", q:"がんばって means \"give up\".", answer:false, exp:"False — Ganbatte means do your best / keep going. The opposite of giving up." },
    { type:"tf", cat:"Fact", q:"Japan's trains are so punctual that delays of over 5 minutes result in delay certificates.", answer:true, exp:"True — employers accept these certificates as valid excuses for being late." },
    { type:"mc", cat:"Context", q:"Your friend is about to take a difficult exam. What do you say?", options:["すみません","がんばって","いただきます","おやすみ"], answer:1, exp:"Ganbatte — do your best! Said to encourage someone facing a challenge." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nがんばって", answer:"ganbatte", answers:["ganbatte"], exp:"Ganbatte — do your best / keep going!" },
  ],
  4: [
    { type: "mc", cat: "Fact", q: "What is Shinrin-yoku?", options: ["A martial art", "Forest bathing", "A tea ceremony", "Calligraphy"], answer: 1, exp: "Shinrin-yoku — forest bathing. Walking slowly through nature. Doctors prescribe it." },
    { type: "mc", cat: "Fact", q: "What does Kaizen mean?", options: ["Silent respect", "Continuous improvement", "Empty space", "Forest bathing"], answer: 1, exp: "Kaizen (改善) — continuous improvement through small daily steps." },
    { type: "tf", cat: "Fact", q: "In Japan, silence during a conversation is awkward and rude.", answer: false, exp: "False — silence is a sign of respect and thoughtfulness in Japan." },
    { type: "tf", cat: "Fact", q: "Samurai were abolished in 1876 during the Meiji Restoration.", answer: true, exp: "True — the warrior class was dismantled when Japan modernized." },
    { type: "mc", cat: "Phrase", q: "What does Sugoi mean?", options: ["Good morning", "Excuse me", "Wow / Amazing / Incredible", "I'm hungry"], answer: 2, exp: "Sugoi — wow / amazing / incredible. Very common exclamation." },
    { type: "mc", cat: "Phrase", q: "What does Douzo mean?", options: ["Goodbye", "Please go ahead / Here you go", "I'm sorry", "Watch out"], answer: 1, exp: "Douzo — please go ahead / here you go. Used when offering something." },
    { type: "spell", cat: "Phrase", q: "Type the ROMAJI spelling:\nただいま", answer: "tadaima", answers: ["tadaima"], exp: "Tadaima — I'm home. た=ta だ=da い=i ま=ma." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nた", answer: "ta", answers: ["ta"], exp: "た = 'ta'. First of T-row." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nち", answer: "chi", answers: ["chi", "ti"], exp: "ち = 'chi' — irregular, not 'ti'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nつ", answer: "tsu", answers: ["tsu"], exp: "つ = 'tsu' — like in tsunami." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nて", answer: "te", answers: ["te"], exp: "て = 'te'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nと", answer: "to", answers: ["to"], exp: "と = 'to'." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nタ", answer: "ta", answers: ["ta"], exp: "タ = 'ta' — katakana version of た." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nテ", answer: "te", answers: ["te"], exp: "テ = 'te' — appears in テレビ (TV)." },
    { type: "soundToChar", cat: "Hiragana", q: "Type the HIRAGANA for 'ta'\n🎌 Japanese keyboard", answer: "た", answers: ["た"], exp: "た = 'ta'. First of T-row." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'welcome back'\n🎌 Japanese keyboard", answer: "おかえり", answers: ["おかえり"], exp: "Okaeri (おかえり) — welcome back / welcome home." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'beautiful'\n🎌 Japanese keyboard", answer: "きれい", answers: ["きれい"], exp: "Kirei (きれい) — beautiful, pretty, or clean." },
    { type: "translateJPEN", cat: "Phrase", q: "Translate to ENGLISH:\nなるほど", answer: "i see", answers: ["i see", "that makes sense", "naruhodo"], exp: "Naruhodo — I see / that makes sense." },
    { type: "translateENJP", cat: "Phrase", q: "Translate to ROMAJI:\n'Do your best'", answer: "ganbatte", answers: ["ganbatte"], exp: "Ganbatte (頑張って) — do your best / keep going." },
    { type: "wordorder", cat: "Phrase", q: "Arrange to say 'Good morning' (polite)\n⚠️ Not all words belong", words: ["gozaimasu", "ohayou", "konnichiwa", "masu", "ne"], answer: ["ohayou", "gozaimasu"], exp: "Ohayou gozaimasu — polite good morning. Konnichiwa, masu, ne are decoys." },
    { type:"fill", cat:"Fact", q:"Fill in the blank — type ROMAJI:\nForest bathing → ___________", answer:"shinrin-yoku", answers:["shinrin-yoku","shinrinyoku","shinrin yoku"], exp:"Shinrin-yoku — doctors prescribe walking through nature." },
    { type:"fill", cat:"Fact", q:"Fill in the blank — type ROMAJI:\nContinuous improvement → ___________", answer:"kaizen", answers:["kaizen"], exp:"Kaizen — small steps every day. Toyota built their empire on it." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nしつれい_____。(Excuse me - formal)", answer:"します", answers:["します","shimasu"], exp:"しつれいします — します makes it a polite action." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"いくらですか", words:["いくら","です","か","は","を"], answer:["いくら","です","か"], exp:"いくらですか — How much does it cost?" },
    { type:"mc", cat:"Vocab", q:"Which word means \"wow / amazing / incredible\"?", options:["なるほど","すごい","ちょっと","だいじょうぶ"], answer:1, exp:"Sugoi — used to express amazement. One of the most common Japanese exclamations." },
    { type:"mc", cat:"Vocab", q:"What does なるほど express?", options:["Anger","Understanding — \"I see, that makes sense\"","Hunger","Sadness"], answer:1, exp:"Naruhodo — I see / that makes sense. Used constantly in conversation." },
    { type:"tf", cat:"Phrase", q:"すごい can only be used for positive things.", answer:false, exp:"False — Sugoi can express shock at anything extreme, positive or negative." },
    { type:"tf", cat:"Phrase", q:"どうぞ means \"please go ahead\" or \"here you go\".", answer:true, exp:"True — Douzo is used when offering something or giving way to someone." },
    { type:"mc", cat:"Context", q:"Someone shows you an incredible view of Mount Fuji. What do you exclaim?", options:["なるほど","すみません","すごい","ちょっと"], answer:2, exp:"Sugoi! — Wow / Amazing! Natural reaction to something impressive." },
    { type:"mc", cat:"Context", q:"Someone explains why Japanese trains are always on time. You understand now. What do you say?", options:["すごい","なるほど","すみません","がんばって"], answer:1, exp:"Naruhodo — I see / that makes sense. Shows you understood the explanation." },
  ],
  5: [
    { type: "mc", cat: "Fact", q: "What is a Shokunin?", options: ["A government official", "A craftsman dedicated to mastering one skill", "A type of noodle", "A Shinto priest"], answer: 1, exp: "Shokunin (職人) — a master craftsman who dedicates their life to one skill." },
    { type: "mc", cat: "Fact", q: "What does Nemawashi mean?", options: ["A martial art", "Quietly building consensus before a formal decision", "A dance", "Saying goodbye"], answer: 1, exp: "Nemawashi — laying groundwork and building quiet consensus before any meeting." },
    { type: "tf", cat: "Fact", q: "Mount Fuji from the fifth station to the summit is government owned.", answer: false, exp: "False — privately owned by Fujisan Hongu Sengen Taisha shrine." },
    { type: "tf", cat: "Fact", q: "Japan's Maglev L0 Series hit 603 km/h in testing.", answer: true, exp: "True — the fastest train ever recorded. 603 km/h = 375 mph." },
    { type: "mc", cat: "Phrase", q: "What does Honne mean?", options: ["The public face you show others", "Your true inner feelings", "A formal greeting", "A ceremony"], answer: 1, exp: "Honne (本音) — your true feelings. The opposite of Tatemae." },
    { type: "mc", cat: "Phrase", q: "What does Ohayou gozaimasu mean?", options: ["Good evening", "Good afternoon", "Good morning (polite)", "Goodbye"], answer: 2, exp: "Ohayou gozaimasu — polite good morning. Ohayou alone is casual." },
    { type: "spell", cat: "Phrase", q: "Type the ROMAJI spelling:\nはじめまして", answer: "hajimemashite", answers: ["hajimemashite"], exp: "Hajimemashite — nice to meet you. Said only on first meeting." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nな", answer: "na", answers: ["na"], exp: "な = 'na'. First of N-row." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nに", answer: "ni", answers: ["ni"], exp: "に = 'ni'. Also the location particle." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nぬ", answer: "nu", answers: ["nu"], exp: "ぬ = 'nu'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nね", answer: "ne", answers: ["ne"], exp: "ね = 'ne'." },
    { type: "charSound", cat: "Hiragana", q: "Type the ROMAJI sound:\nの", answer: "no", answers: ["no"], exp: "の = 'no'. Also the possessive particle." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nナ", answer: "na", answers: ["na"], exp: "ナ = 'na' — katakana version of な." },
    { type: "charSound", cat: "Katakana", q: "Type the ROMAJI sound:\nニ", answer: "ni", answers: ["ni"], exp: "ニ = 'ni' — katakana version of に." },
    { type: "soundToChar", cat: "Hiragana", q: "Type the HIRAGANA for 'na'\n🎌 Japanese keyboard", answer: "な", answers: ["な"], exp: "な = 'na'. First of N-row." },
    { type: "soundToChar", cat: "Katakana", q: "Type the KATAKANA for 'na'\n🎌 Japanese keyboard", answer: "ナ", answers: ["ナ"], exp: "ナ = 'na'. Katakana version of な." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'teacher'\n🎌 Japanese keyboard", answer: "せんせい", answers: ["せんせい"], exp: "Sensei (せんせい) — teacher / professor." },
    { type: "typeJP", cat: "Vocab", q: "Type the Japanese for 'rice / meal'\n🎌 Japanese keyboard", answer: "ごはん", answers: ["ごはん"], exp: "Gohan (ごはん) — rice or meal." },
    { type: "translateJPEN", cat: "Phrase", q: "Translate to ENGLISH:\nおはようございます", answer: "good morning", answers: ["good morning", "ohayou gozaimasu"], exp: "Ohayou gozaimasu — good morning (polite)." },
    { type: "wordorder", cat: "Phrase", q: "Arrange 'Nice to meet you / I'm in your care'\n⚠️ Not all words belong", words: ["onegaishimasu", "yoroshiku", "sumimasen", "hajimemashite", "gozaimasu"], answer: ["yoroshiku", "onegaishimasu"], exp: "Yoroshiku onegaishimasu — the most important business greeting." },
    // ── Matching Pairs — Day 5 ──
    { type: "matching", cat: "Vocab", q: "Match each Japanese word to its meaning", pairs: [
      { jp: "職人", en: "Craftsman / master of one skill" },
      { jp: "本音", en: "Your true inner feelings" },
      { jp: "建前", en: "The public face you show others" },
      { jp: "根回し", en: "Quietly building consensus" },
    ], exp: "Shokunin, Honne, Tatemae, Nemawashi — core Week 1 concepts." },
    { type:"wordorder", cat:"Phrase", q:"Arrange: 'See you tomorrow'\n⚠️ Not all words belong", words:["ashita","mata","ato","nochi","de"], answer:["mata","ashita"], exp:"Mata ashita — see you tomorrow." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"どこですか", words:["どこ","です","か","なに","も"], answer:["どこ","です","か"], exp:"どこですか — Where is it?" },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"しつれいします", words:["しつれい","します","ください","ません"], answer:["しつれい","します"], exp:"しつれいします — Excuse me (formal)." },
    { type:"mc", cat:"Vocab", q:"What is the relationship between ほんね and たてまえ?", options:["Teacher and student","True feelings vs public face","Food and drink","Morning and evening"], answer:1, exp:"Honne = true inner feelings. Tatemae = the public face you show. Everyone in Japan navigates both." },
    { type:"mc", cat:"Vocab", q:"Which concept describes \"quietly building consensus before a meeting\"?", options:["ほんね","たてまえ","ねまわし","しょくにん"], answer:2, exp:"Nemawashi — laying groundwork behind the scenes. Real decisions happen before the formal meeting." },
    { type:"tf", cat:"Fact", q:"ねまわし happens during the formal meeting.", answer:false, exp:"False — Nemawashi happens BEFORE the meeting. The meeting just formalizes what was already decided." },
    { type:"tf", cat:"Vocab", q:"しょくにん means \"beginner\".", answer:false, exp:"False — Shokunin means craftsman / master of one skill. The opposite of a beginner." },
    { type:"mc", cat:"Context", q:"You notice a Japanese colleague seems to agree in a meeting but looks uncomfortable. What's happening?", options:["They are sick","たてまえ — their public face differs from their true feelings","They don't understand","They are bored"], answer:1, exp:"Tatemae — reading between the lines is essential in Japanese business culture." },
  ],

  // ─────────────────────────────────────────
  // DAY 6 — Week 2: Omotenashi, Hanami, H-row
  // ─────────────────────────────────────────
  6: [
    { type:"mc", cat:"Fact", q:"What does Omotenashi mean?", options:["Goodbye ceremony","Wholehearted hospitality with no expectation of reward","A type of Japanese food","A tea ceremony"], answer:1, exp:"Omotenashi — serving guests with total care. The foundation of Japan's legendary service culture." },
    { type:"mc", cat:"Fact", q:"What is Hanami?", options:["A type of sushi","A martial art","Cherry blossom viewing — gathering under sakura trees","A traditional dance"], answer:2, exp:"Hanami — the annual spring tradition of picnicking under cherry blossom trees." },
    { type:"tf", cat:"Fact", q:"Japan has over 25,000 shrines and 75,000 temples.", answer:true, exp:"True — more places of worship per capita than almost any nation on Earth." },
    { type:"tf", cat:"Fact", q:"Japan's literacy rate is among the lowest in the developed world.", answer:false, exp:"False — Japan's literacy rate is 99%, one of the highest in the world." },
    { type:"mc", cat:"Fact", q:"Where were capsule hotels invented?", options:["Tokyo","Kyoto","Osaka","Nara"], answer:2, exp:"Capsule hotels were invented in Osaka in 1979 for business travelers who missed the last train." },
    { type:"mc", cat:"Phrase", q:"What does Ittekimasu mean?", options:["Welcome home","I'm heading out — said when leaving home","Thank you for your hard work","Good morning"], answer:1, exp:"Ittekimasu — said every time you leave home. Itterasshai is the response." },
    { type:"mc", cat:"Phrase", q:"What does Otsukaresama desu mean?", options:["Good morning","I'm home","Thank you for your hard work","Excuse me"], answer:2, exp:"Otsukaresama desu — said to colleagues at end of a work day acknowledging their efforts." },
    { type:"tf", cat:"Phrase", q:"Itterasshai is said by the person leaving home.", answer:false, exp:"False — Itterasshai is said by those staying home. Ittekimasu is said by the person leaving." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nは", answer:"ha", answers:["ha"], exp:"は = 'ha'. First of H-row." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nひ", answer:"hi", answers:["hi"], exp:"ひ = 'hi'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nふ", answer:"fu", answers:["fu"], exp:"ふ = 'fu' — irregular, not 'hu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nへ", answer:"he", answers:["he"], exp:"へ = 'he'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nほ", answer:"ho", answers:["ho"], exp:"ほ = 'ho'." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nハ", answer:"ha", answers:["ha"], exp:"ハ = 'ha' — katakana version of は." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nフ", answer:"fu", answers:["fu"], exp:"フ = 'fu' — appears in フランス (France)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ha'\n🎌 Japanese keyboard", answer:"は", answers:["は"], exp:"は = 'ha'. Also the topic particle in Japanese sentences." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'fu'\n🎌 Japanese keyboard", answer:"ふ", answers:["ふ"], exp:"ふ = 'fu'. Irregular sound in H-row." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nおもてなし", answer:"omotenashi", answers:["omotenashi"], exp:"Omotenashi — wholehearted hospitality." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nいってきます", answer:"i'm heading out", answers:["i'm heading out","im heading out","i am heading out","ittekimasu","going out"], exp:"Ittekimasu — said every time you leave home." },
    { type:"matching", cat:"Phrase", q:"Match each phrase to its meaning", pairs:[
      { jp:"おもてなし", en:"Wholehearted hospitality" },
      { jp:"はなみ", en:"Cherry blossom viewing" },
      { jp:"いってきます", en:"I'm heading out" },
      { jp:"いってらっしゃい", en:"Go and come back safely" },
    ], exp:"Four essential Week 2 Day 6 phrases." },
    { type:"complete", cat:"Grammar", q:"Complete — type the correct particle:\nにほん ___ いきます。('I go to Japan.')", answer:"に", answers:["に","ni"], exp:"に (ni) marks the destination with movement verbs." },
    { type:"complete", cat:"Grammar", q:"Complete — type the correct particle:\nでんしゃ ___ のります。('I ride the train.')", answer:"に", answers:["に","ni"], exp:"に (ni) marks what you board or ride." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nおつかれさま_____。(Thank you for your hard work)", answer:"です", answers:["です","desu"], exp:"おつかれさまです — です makes it polite." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"いってきます", words:["いって","きます","ください","ません"], answer:["いって","きます"], exp:"いってきます — I'm heading out." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"おつかれさまです", words:["おつかれ","さま","です","ます","した"], answer:["おつかれ","さま","です"], exp:"おつかれさまです — Thank you for your hard work." },
    { type:"mc", cat:"Vocab", q:"Which concept describes \"hospitality with no expectation of reward\"?", options:["はなみ","おもてなし","ねまわし","いきがい"], answer:1, exp:"Omotenashi — the foundation of Japan's legendary service culture." },
    { type:"mc", cat:"Vocab", q:"What is はなみ?", options:["A type of food","Cherry blossom viewing in spring","A martial art","A business practice"], answer:1, exp:"Hanami — gathering under cherry blossom trees every spring. A national tradition." },
    { type:"tf", cat:"Phrase", q:"いってらっしゃい is said by the person leaving home.", answer:false, exp:"False — Itterasshai is said by those STAYING home. The person leaving says Ittekimasu." },
    { type:"tf", cat:"Fact", q:"Capsule hotels were invented in Tokyo.", answer:false, exp:"False — Capsule hotels were invented in Osaka in 1979." },
    { type:"mc", cat:"Context", q:"You're leaving your Japanese host family's house for the day. What do you say?", options:["ただいま","おかえり","いってきます","いってらっしゃい"], answer:2, exp:"Ittekimasu — I'm heading out. They'll respond with Itterasshai." },
    { type:"mc", cat:"Context", q:"You return to your host family's house. What do you say?", options:["いってきます","いってらっしゃい","ただいま","おはよう"], answer:2, exp:"Tadaima — I'm home. They'll respond with Okaeri (welcome back)." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nいってらっしゃい", answer:"itterasshai", answers:["itterasshai","itterashai","itte rasshai"], exp:"Itterasshai — go and come back safely." },
  ],

  // ─────────────────────────────────────────
  // DAY 7 — Week 2: Ganbaru, Mono no Aware, M-row
  // ─────────────────────────────────────────
  7: [
    { type:"mc", cat:"Fact", q:"What does the Japanese word Ganbaru mean?", options:["To sleep","To persist and do your best no matter what","To eat","To travel"], answer:1, exp:"Ganbaru — the cultural engine behind Japan's post-war economic miracle. Never give up." },
    { type:"mc", cat:"Fact", q:"What percentage of the world's animation does Japan produce?", options:["20%","40%","60%","80%"], answer:2, exp:"Japan produces over 60% of the world's animation — anime is a massive global export." },
    { type:"tf", cat:"Fact", q:"Tokyo's Shibuya crossing is the busiest pedestrian intersection in the world.", answer:true, exp:"True — up to 3,000 people cross simultaneously when the lights change." },
    { type:"tf", cat:"Fact", q:"Japanese students have janitors who clean their schools.", answer:false, exp:"False — Japanese students clean their own schools daily, building responsibility and respect." },
    { type:"mc", cat:"Fact", q:"What does Mono no Aware describe?", options:["A type of food","The bittersweet awareness of impermanence","A martial art","A festival"], answer:1, exp:"Mono no Aware — the sadness and beauty of things passing. Core to Japanese aesthetics." },
    { type:"mc", cat:"Phrase", q:"What does Ganbaru mean as a verb?", options:["To eat","To sleep","To persist / do your best","To travel"], answer:2, exp:"Ganbaru — the verb form. Ganbatte is the command form meaning 'do your best!'" },
    { type:"mc", cat:"Phrase", q:"What does Naze mean?", options:["Thank you","Why — a question word","Where","When"], answer:1, exp:"Naze — why. Used to ask for a reason or explanation." },
    { type:"tf", cat:"Phrase", q:"Doushite and Naze both mean 'why' in Japanese.", answer:true, exp:"True — Doushite is more casual, Naze is more formal. Both ask 'why'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nま", answer:"ma", answers:["ma"], exp:"ま = 'ma'. First of M-row." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nみ", answer:"mi", answers:["mi"], exp:"み = 'mi'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nむ", answer:"mu", answers:["mu"], exp:"む = 'mu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nめ", answer:"me", answers:["me"], exp:"め = 'me'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nも", answer:"mo", answers:["mo"], exp:"も = 'mo'." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nマ", answer:"ma", answers:["ma"], exp:"マ = 'ma' — katakana version of ま." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nミ", answer:"mi", answers:["mi"], exp:"ミ = 'mi' — katakana version of み." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ma'\n🎌 Japanese keyboard", answer:"ま", answers:["ま"], exp:"ま = 'ma'. First of M-row." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'mo'\n🎌 Japanese keyboard", answer:"も", answers:["も"], exp:"も = 'mo'. Also means 'also/too' as a particle." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nどうして", answer:"doushite", answers:["doushite","doshite"], exp:"Doushite — why / how come. Casual version of naze." },
    { type:"translateJPEN", cat:"Fact", q:"What does もののあわれ mean in English?", answer:"the bittersweet awareness of impermanence", answers:["the bittersweet awareness of impermanence","bittersweet impermanence","mono no aware","sadness of things passing"], exp:"Mono no Aware — core Japanese aesthetic concept." },
    { type:"matching", cat:"Hiragana", q:"Match each hiragana to its romaji sound", pairs:[
      { jp:"ま", en:"ma" },
      { jp:"み", en:"mi" },
      { jp:"む", en:"mu" },
      { jp:"も", en:"mo" },
    ], exp:"M-row hiragana." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'why'\n🎌 Japanese keyboard", answer:"なぜ", answers:["なぜ"], exp:"Naze (なぜ) — why." },
    { type:"mc", cat:"Vocab", q:"Which concept means \"the bittersweet awareness that all things pass\"?", options:["わびさび","もののあわれ","いきがい","かいぜん"], answer:1, exp:"Mono no Aware — the beauty and sadness of impermanence." },
    { type:"tf", cat:"Fact", q:"Japan produces about 20% of the world's animation.", answer:false, exp:"False — Japan produces over 60% of the world's animation." },
    { type:"tf", cat:"Fact", q:"Shibuya crossing handles up to 3,000 people at once.", answer:true, exp:"True — the busiest pedestrian intersection in the world." },
    { type:"mc", cat:"Context", q:"Your Japanese colleague just did something embarrassing. You want to say \"why?\" politely. Which word?", options:["なに","だれ","なぜ","いつ"], answer:2, exp:"Naze — why (formal). Doushite is more casual." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nもののあわれ", answer:"mono no aware", answers:["mono no aware","mononoaware"], exp:"Mono no Aware — bittersweet impermanence." },
  ],

  // ─────────────────────────────────────────
  // DAY 8 — Week 2: Shu-Ha-Ri, Wa, Y/R-rows
  // ─────────────────────────────────────────
  8: [
    { type:"mc", cat:"Fact", q:"What does Shu-Ha-Ri describe?", options:["A type of food","Three stages of mastery: follow, break, transcend the rules","A Japanese festival","A fighting style"], answer:1, exp:"Shu-Ha-Ri — the path to mastery. Follow the rules, break the rules, transcend the rules." },
    { type:"mc", cat:"Fact", q:"What does 'Wa' represent in Japanese culture?", options:["War","Harmony, peace, and unity","Food","Travel"], answer:1, exp:"Wa — harmony and unity. Underpins everything from business etiquette to conflict resolution." },
    { type:"tf", cat:"Fact", q:"Japan is the world's third largest economy.", answer:true, exp:"True — despite having almost no natural resources, importing oil, gas, iron, and coal." },
    { type:"tf", cat:"Fact", q:"Japan has fewer than 50 active volcanoes.", answer:false, exp:"False — Japan has over 100 active volcanoes and sits on the Pacific Ring of Fire." },
    { type:"mc", cat:"Fact", q:"How many passengers does Japan's train system carry per year?", options:["2 billion","5 billion","8 billion","12 billion"], answer:3, exp:"12 billion passengers per year — more than any other country." },
    { type:"mc", cat:"Phrase", q:"What does Ogenki desu ka mean?", options:["Good morning","How are you? — polite way to ask about wellbeing","Thank you","Goodbye"], answer:1, exp:"Ogenki desu ka — how are you? Genki desu is the standard response meaning I'm well." },
    { type:"mc", cat:"Phrase", q:"What is the response to Ogenki desu ka?", options:["Sumimasen","Genki desu — I'm well","Tadaima","Kanpai"], answer:1, exp:"Genki desu — I'm fine/well. The standard response to how are you." },
    { type:"tf", cat:"Phrase", q:"Douzo yoroshiku is a more casual version of Yoroshiku onegaishimasu.", answer:true, exp:"True — same meaning but less formal. Both mean please treat me kindly." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nや", answer:"ya", answers:["ya"], exp:"や = 'ya'. Y-row only has ya, yu, yo." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nゆ", answer:"yu", answers:["yu"], exp:"ゆ = 'yu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nよ", answer:"yo", answers:["yo"], exp:"よ = 'yo'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nら", answer:"ra", answers:["ra"], exp:"ら = 'ra'. First of R-row." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nり", answer:"ri", answers:["ri"], exp:"り = 'ri'." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nヤ", answer:"ya", answers:["ya"], exp:"ヤ = 'ya' — katakana version of や." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nラ", answer:"ra", answers:["ra"], exp:"ラ = 'ra' — appears in ラーメン (ramen)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ya'\n🎌 Japanese keyboard", answer:"や", answers:["や"], exp:"や = 'ya'. Y-row." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ra'\n🎌 Japanese keyboard", answer:"ら", answers:["ら"], exp:"ら = 'ra'. R-row." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nげんきです", answer:"genki desu", answers:["genki desu","genkidesu"], exp:"Genki desu — I'm fine/well." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nおげんきですか", answer:"how are you", answers:["how are you","are you well","ogenki desu ka"], exp:"Ogenki desu ka — polite how are you." },
    { type:"wordorder", cat:"Phrase", q:"Arrange 'How are you?' (polite)\n⚠️ Not all words belong", words:["desu","ogenki","ka","masu","ne","wa"], answer:["ogenki","desu","ka"], exp:"Ogenki desu ka — polite how are you. Same desu ka structure." },
    { type:"complete", cat:"Grammar", q:"Complete — type the correct particle:\nレストラン ___ たべます。('I eat at a restaurant.')", answer:"で", answers:["で","de"], exp:"で (de) marks the location where an action takes place." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nおげんき_____か。(How are you?)", answer:"です", answers:["です","desu"], exp:"おげんきですか — です + か makes it a polite question." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"おげんきですか", words:["おげんき","です","か","は","も"], answer:["おげんき","です","か"], exp:"おげんきですか — How are you? (polite)" },
    { type:"mc", cat:"Vocab", q:"What are the three stages of しゅはり?", options:["Eat, sleep, repeat","Follow rules, break rules, transcend rules","Run, walk, crawl","Think, act, reflect"], answer:1, exp:"Shu-Ha-Ri — the Japanese path to mastery in any discipline." },
    { type:"mc", cat:"Vocab", q:"What does わ represent in Japanese culture?", options:["War","Harmony and unity","Wealth","Weather"], answer:1, exp:"Wa — harmony. Underpins everything from business to daily interactions." },
    { type:"tf", cat:"Fact", q:"Japan has fewer than 50 active volcanoes.", answer:false, exp:"False — Japan has over 100 active volcanoes on the Pacific Ring of Fire." },
    { type:"mc", cat:"Context", q:"Someone asks おげんきですか. How do you respond?", options:["すみません","げんきです","いただきます","さようなら"], answer:1, exp:"Genki desu — I'm well. The standard response to how are you." },
  ],

  // ─────────────────────────────────────────
  // DAY 9 — Week 2: Shokunin Kishitsu, R/W-rows
  // ─────────────────────────────────────────
  9: [
    { type:"mc", cat:"Fact", q:"What does Shokunin Kishitsu mean?", options:["A type of food","The craftsman spirit — obsessive dedication to craft as a way of life","A festival","A martial art"], answer:1, exp:"Shokunin Kishitsu — going beyond skill into a complete way of life dedicated to one craft." },
    { type:"tf", cat:"Fact", q:"Japan's manga industry is larger than all of Hollywood's domestic box office combined.", answer:true, exp:"True — Japan produces over 1 billion manga volumes per year." },
    { type:"mc", cat:"Fact", q:"When does Japan's school year start?", options:["September","January","April","July"], answer:2, exp:"April — aligned with cherry blossom season, symbolizing new beginnings." },
    { type:"tf", cat:"Fact", q:"Business cards in Japan can be written on during a meeting.", answer:false, exp:"False — writing on a business card is deeply disrespectful. Handle with both hands and bow." },
    { type:"mc", cat:"Fact", q:"How many Yakuza members were there at their peak in the 1960s?", options:["50,000","100,000","184,000","250,000"], answer:2, exp:"Over 184,000 members at peak. Today membership has fallen below 24,000." },
    { type:"mc", cat:"Phrase", q:"What does Yokatta mean?", options:["I'm tired","That's great / I'm glad — expression of relief or happiness","Watch out","I don't know"], answer:1, exp:"Yokatta — that's great / I'm glad. Used to express relief or happiness." },
    { type:"mc", cat:"Phrase", q:"What does Taihen mean?", options:["Thank you","Tough / difficult / serious — used for hard situations","Beautiful","Interesting"], answer:1, exp:"Taihen — tough or difficult. Also used to express sympathy: taihen deshita = that must have been rough." },
    { type:"mc", cat:"Phrase", q:"What does Sukoshi mean?", options:["A lot","Never","A little / a bit","Always"], answer:2, exp:"Sukoshi — a little. Sukoshi wakarimasu = I understand a little." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nる", answer:"ru", answers:["ru"], exp:"る = 'ru'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nれ", answer:"re", answers:["re"], exp:"れ = 're'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nろ", answer:"ro", answers:["ro"], exp:"ろ = 'ro'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nわ", answer:"wa", answers:["wa"], exp:"わ = 'wa'. W-row." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nを", answer:"wo", answers:["wo","o"], exp:"を = 'wo' — the object marking particle. Pronounced 'o' in modern Japanese." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nル", answer:"ru", answers:["ru"], exp:"ル = 'ru' — appears in ルール (rule)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nワ", answer:"wa", answers:["wa"], exp:"ワ = 'wa' — katakana W." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'wa'\n🎌 Japanese keyboard", answer:"わ", answers:["わ"], exp:"わ = 'wa'. W-row." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'wo'\n🎌 Japanese keyboard", answer:"を", answers:["を"], exp:"を = 'wo' — the direct object particle." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nよかった", answer:"yokatta", answers:["yokatta"], exp:"Yokatta — that's great / I'm relieved." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nすこし", answer:"a little", answers:["a little","a bit","sukoshi"], exp:"Sukoshi — a little. Very useful in conversation." },
    { type:"matching", cat:"Hiragana", q:"Match each hiragana to its romaji sound", pairs:[
      { jp:"る", en:"ru" },
      { jp:"れ", en:"re" },
      { jp:"ろ", en:"ro" },
      { jp:"わ", en:"wa" },
    ], exp:"R-row and W-row completion." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'a little'\n🎌 Japanese keyboard", answer:"すこし", answers:["すこし"], exp:"Sukoshi (すこし) — a little / a bit." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'really / truly'\n🎌 Japanese keyboard", answer:"ほんとうに", answers:["ほんとうに","ほんとに"], exp:"Hontou ni (ほんとうに) — really." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nすこし わかり_____。(I understand a little)", answer:"ます", answers:["ます","masu"], exp:"すこしわかります — ます is the polite verb ending." },
    { type:"mc", cat:"Vocab", q:"Which phrase means \"that's great / I'm glad\"?", options:["たいへん","よかった","すこし","ちょっと"], answer:1, exp:"Yokatta — expression of relief or happiness about an outcome." },
    { type:"mc", cat:"Vocab", q:"What does たいへん mean?", options:["Easy","Tough / difficult / serious","Happy","Sleepy"], answer:1, exp:"Taihen — used for hard situations. Taihen deshita = that must have been rough." },
    { type:"tf", cat:"Vocab", q:"すこし means \"a lot\".", answer:false, exp:"False — Sukoshi means a little / a bit. Takusan means a lot." },
    { type:"mc", cat:"Context", q:"You learn your flight to Japan wasn't cancelled after all. What do you say?", options:["たいへん","よかった","すみません","ちょっと"], answer:1, exp:"Yokatta! — I'm glad / that's a relief!" },
    { type:"mc", cat:"Context", q:"Your friend just worked a 16-hour shift. You want to express sympathy. What do you say?", options:["よかった","すごい","たいへんでしたね","がんばって"], answer:2, exp:"Taihen deshita ne — that must have been tough. Shows empathy." },
  ],

  // ─────────────────────────────────────────
  // DAY 10 — Week 2: Tsundoku, Komorebi, N/G-rows
  // ─────────────────────────────────────────
  10: [
    { type:"mc", cat:"Fact", q:"What does Tsundoku mean?", options:["A type of cooking","Buying books and letting them pile up unread","A meditation practice","A type of garden"], answer:1, exp:"Tsundoku — buying books and never reading them. So common in Japan it has its own word." },
    { type:"mc", cat:"Fact", q:"What does Komorebi describe?", options:["A type of food","Sunlight filtering through leaves","A mountain","A river"], answer:1, exp:"Komorebi — sunlight filtering through leaves. A concept so beautiful it got its own word." },
    { type:"tf", cat:"Fact", q:"Mount Fuji is climbed by over 300,000 people per year.", answer:true, exp:"True — so popular it now charges a climbing fee and closes at night." },
    { type:"tf", cat:"Fact", q:"Japan leads the world in robot density in industry.", answer:true, exp:"True — over 300 industrial robots per 10,000 workers, more than any other country." },
    { type:"mc", cat:"Fact", q:"What does Oubaitori mean?", options:["A type of flower","Never comparing yourself to others — each person blooms in their own time","A festival","A meal"], answer:1, exp:"Oubaitori — cherry, plum, peach, and plum trees all bloom differently. So do people." },
    { type:"mc", cat:"Phrase", q:"What does Mousugu mean?", options:["Never","Always","Almost / soon / any minute now","Far away"], answer:2, exp:"Mousugu — almost there / soon. Mousugu tsukimasu = we'll arrive soon." },
    { type:"mc", cat:"Phrase", q:"What does Yukkuri mean?", options:["Quickly","Slowly / take your time","Loudly","Quietly"], answer:1, exp:"Yukkuri — slowly. Yukkuri shite kudasai = please take your time / make yourself at home." },
    { type:"tf", cat:"Phrase", q:"Yukkuri can be said to guests to make them feel welcome.", answer:true, exp:"True — Yukkuri shite kudasai means please make yourself at home / relax." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nん", answer:"n", answers:["n"], exp:"ん = 'n'. The only standalone consonant in Japanese — never starts a word." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nが", answer:"ga", answers:["ga"], exp:"が = 'ga'. Voiced version of か." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぎ", answer:"gi", answers:["gi"], exp:"ぎ = 'gi'. Voiced version of き." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぐ", answer:"gu", answers:["gu"], exp:"ぐ = 'gu'. Voiced version of く." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nげ", answer:"ge", answers:["ge"], exp:"げ = 'ge'. Voiced version of け." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nン", answer:"n", answers:["n"], exp:"ン = 'n' — katakana standalone N. Appears in ラーメン (ramen)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nガ", answer:"ga", answers:["ga"], exp:"ガ = 'ga' — voiced katakana K." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'n'\n🎌 Japanese keyboard", answer:"ん", answers:["ん"], exp:"ん = 'n'. The only standalone consonant." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ga'\n🎌 Japanese keyboard", answer:"が", answers:["が"], exp:"が = 'ga'. Subject particle and voiced か." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nゆっくり", answer:"yukkuri", answers:["yukkuri"], exp:"Yukkuri — slowly / take your time." },
    { type:"translateJPEN", cat:"Fact", q:"What does つんどく mean in English?", answer:"buying books and letting them pile up unread", answers:["buying books and letting them pile up unread","buying books without reading them","tsundoku"], exp:"Tsundoku — a uniquely Japanese habit." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"つんどく", en:"Buying books unread" },
      { jp:"こもれび", en:"Sunlight through leaves" },
      { jp:"おうばいとうり", en:"Each person blooms in their own time" },
      { jp:"もうすぐ", en:"Almost / soon" },
    ], exp:"Week 2 Day 10 key concepts." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'slowly'\n🎌 Japanese keyboard", answer:"ゆっくり", answers:["ゆっくり"], exp:"Yukkuri (ゆっくり) — slowly / take your time." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'soon'\n🎌 Japanese keyboard", answer:"もうすぐ", answers:["もうすぐ"], exp:"Mousugu (もうすぐ) — almost / soon." },
    { type:"mc", cat:"Vocab", q:"Which Japanese word means \"buying books and never reading them\"?", options:["こもれび","つんどく","おうばいとうり","もったいない"], answer:1, exp:"Tsundoku — so common in Japan it has its own word." },
    { type:"mc", cat:"Vocab", q:"What does こもれび describe?", options:["Moonlight on water","Sunlight filtering through leaves","Wind through grass","Rain on rooftops"], answer:1, exp:"Komorebi — a beauty so specific only Japanese has a word for it." },
    { type:"tf", cat:"Fact", q:"おうばいとうり teaches that everyone should bloom at the same time.", answer:false, exp:"False — Oubaitori teaches the opposite: each person blooms in their own time." },
    { type:"mc", cat:"Context", q:"You want to tell someone to relax and take their time. What do you say?", options:["はやく","ゆっくりしてください","がんばって","すみません"], answer:1, exp:"Yukkuri shite kudasai — please take your time / make yourself at home." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nもうすぐ", answer:"mousugu", answers:["mousugu","mosugu"], exp:"Mousugu — almost / soon / any minute now." },
  ],

  // ─────────────────────────────────────────
  // DAY 11 — Week 3: Natsukashii, Hara Hachi Bu, G/Z-rows
  // ─────────────────────────────────────────
  11: [
    { type:"mc", cat:"Fact", q:"What does Natsukashii mean?", options:["Exciting","A bittersweet nostalgia for the past — warm longing for something lost","Delicious","Beautiful"], answer:1, exp:"Natsukashii — that warm bittersweet feeling when something from the past resurfaces." },
    { type:"mc", cat:"Fact", q:"What is Hara Hachi Bu?", options:["A type of food","The Okinawan practice of eating until 80% full","A martial art","A festival"], answer:1, exp:"Hara Hachi Bu — eat until 80% full. A key practice behind Okinawa's extraordinary longevity." },
    { type:"tf", cat:"Fact", q:"Japan has a museum dedicated to instant noodles.", answer:true, exp:"True — the Cup Noodles Museum in Yokohama where you can design your own custom cup ramen." },
    { type:"tf", cat:"Fact", q:"Forest bathing was officially recognized as medical treatment in Japan in 1982.", answer:true, exp:"True — Shinrin-yoku is now prescribed by Japanese doctors for stress and anxiety." },
    { type:"mc", cat:"Fact", q:"What was the Ryukyu Kingdom?", options:["A type of food","An independent kingdom in what is now Okinawa, annexed in 1879","A mountain range","A famous temple"], answer:1, exp:"The Ryukyu Kingdom — an independent nation for centuries before Japan annexed it in 1879." },
    { type:"mc", cat:"Phrase", q:"What does Itsumo mean?", options:["Never","Sometimes","Always / usually — describing habitual actions","Rarely"], answer:2, exp:"Itsumo — always or usually. Itsumo arigatou = thank you as always." },
    { type:"mc", cat:"Phrase", q:"What does Zenzen mean?", options:["A little","Not at all / completely (with negative)","Sometimes","Often"], answer:1, exp:"Zenzen — not at all. Zenzen wakarimasen = I don't understand at all." },
    { type:"tf", cat:"Phrase", q:"Tama ni means 'always' in Japanese.", answer:false, exp:"False — Tama ni means sometimes / occasionally. Itsumo means always." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nご", answer:"go", answers:["go"], exp:"ご = 'go'. Voiced version of こ." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nざ", answer:"za", answers:["za"], exp:"ざ = 'za'. Voiced version of さ." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nじ", answer:"ji", answers:["ji"], exp:"じ = 'ji'. Voiced version of し." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nず", answer:"zu", answers:["zu"], exp:"ず = 'zu'. Voiced version of す." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぜ", answer:"ze", answers:["ze"], exp:"ぜ = 'ze'. Voiced version of せ." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nゴ", answer:"go", answers:["go"], exp:"ゴ = 'go' — voiced katakana." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nジ", answer:"ji", answers:["ji"], exp:"ジ = 'ji' — appears in ジュース (juice)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'za'\n🎌 Japanese keyboard", answer:"ざ", answers:["ざ"], exp:"ざ = 'za'. Voiced S-row." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ji'\n🎌 Japanese keyboard", answer:"じ", answers:["じ"], exp:"じ = 'ji'. Voiced し." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nなつかしい", answer:"natsukashii", answers:["natsukashii"], exp:"Natsukashii — bittersweet nostalgia." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nいつも", answer:"always", answers:["always","usually","itsumo"], exp:"Itsumo — always or usually." },
    { type:"matching", cat:"Vocab", q:"Match each word to its meaning", pairs:[
      { jp:"なつかしい", en:"Bittersweet nostalgia" },
      { jp:"はらはちぶ", en:"Eat until 80% full" },
      { jp:"いつも", en:"Always / usually" },
      { jp:"ぜんぜん", en:"Not at all" },
    ], exp:"Day 11 key vocabulary." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'always'\n🎌 Japanese keyboard", answer:"いつも", answers:["いつも"], exp:"Itsumo (いつも) — always." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'sometimes'\n🎌 Japanese keyboard", answer:"たまに", answers:["たまに"], exp:"Tama ni (たまに) — sometimes." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"ぜんぜんわかりません", words:["ぜんぜん","わかり","ません","ます","です"], answer:["ぜんぜん","わかり","ません"], exp:"ぜんぜんわかりません — I don't understand at all." },
    { type:"mc", cat:"Vocab", q:"Which word describes \"warm bittersweet nostalgia\"?", options:["ゆうげん","なつかしい","こだわり","あまえ"], answer:1, exp:"Natsukashii — that feeling when a song from your childhood plays." },
    { type:"mc", cat:"Vocab", q:"What is はらはちぶ?", options:["A martial art","Eating until 80% full","A type of tea","A festival"], answer:1, exp:"Hara Hachi Bu — the Okinawan secret to longevity." },
    { type:"tf", cat:"Phrase", q:"いつも means \"sometimes\".", answer:false, exp:"False — Itsumo means always. Tama ni means sometimes." },
    { type:"mc", cat:"Context", q:"You see your childhood school in Japan. What emotion do you feel?", options:["なつかしい","こわい","つまらない","むずかしい"], answer:0, exp:"Natsukashii — warm nostalgia. A deeply Japanese emotional response." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Always / usually'", answer:"itsumo", answers:["itsumo"], exp:"Itsumo (いつも) — always, usually. Used for habitual actions." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Not at all'", answer:"zenzen", answers:["zenzen"], exp:"Zenzen (全然) — not at all. Paired with a negative verb." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Sometimes / occasionally'", answer:"tama ni", answers:["tama ni","tamani"], exp:"Tama ni (たまに) — sometimes, occasionally. For infrequent actions." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Bittersweet nostalgia for the past'", answer:"natsukashii", answers:["natsukashii"], exp:"Natsukashii (懐かしい) — bittersweet nostalgia for something lost." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'I always eat until 80% full'", words:["itsumo","hara","hachi","bu","desu"], answer:["itsumo","hara","hachi","bu","desu"], exp:"Itsumo hara hachi bu desu — I always eat until 80% full." },
    { type:"fill", cat:"Vocab", q:"Fill in the blank — type ROMAJI:\nEat until _____ percent full (Okinawan practice)", answer:"80", answers:["80","eighty","hachi ju"], exp:"Hara Hachi Bu — eat until 80% full. Key to Okinawan longevity." },
    { type:"complete", cat:"Phrase", q:"Complete the phrase — type ROMAJI:\n_____ wa zenzen wakaranai. (I don't understand at all)", answer:"watashi", answers:["watashi","boku","ore"], exp:"Watashi wa zenzen wakaranai — I don't understand at all." },
  ],

  // ─────────────────────────────────────────
  // DAY 12 — Week 3: Kuchisabishii, Amae, Z/D-rows
  // ─────────────────────────────────────────
  12: [
    { type:"mc", cat:"Fact", q:"What does Kuchisabishii mean?", options:["Being thirsty","Eating not because you're hungry but because your mouth is lonely","Being bored","Missing someone"], answer:1, exp:"Kuchisabishii — eating from boredom or stress. Your mouth is lonely. Japan has a word for everything." },
    { type:"mc", cat:"Fact", q:"What does Amae describe?", options:["A type of food","The behavior of depending on another's goodwill — sweet dependence","A martial art","A festival"], answer:1, exp:"Amae — sweet dependence on another's goodwill. A uniquely Japanese social concept." },
    { type:"tf", cat:"Fact", q:"Tokyo has more Michelin starred restaurants than any other city.", answer:true, exp:"True — Tokyo has more Michelin stars than Paris, New York, and London combined." },
    { type:"tf", cat:"Fact", q:"The Japanese tea ceremony is primarily about drinking tea.", answer:false, exp:"False — Chado is a meditative practice about mindfulness and Wabi-Sabi philosophy, not just tea." },
    { type:"mc", cat:"Fact", q:"What is Akihabara famous for?", options:["Temples","Electronics, anime, and gaming culture — attracts 50 million visitors per year","Sumo wrestling","Cherry blossoms"], answer:1, exp:"Akihabara — the world center for electronics, anime, and gaming culture." },
    { type:"mc", cat:"Phrase", q:"What does Nantonaku mean?", options:["Definitely","Somehow / vaguely / for no particular reason","Never","Always"], answer:1, exp:"Nantonaku — somehow or vaguely. Nantonaku suki = I like it for no particular reason." },
    { type:"mc", cat:"Phrase", q:"What does Tashika ni mean?", options:["I don't know","Certainly / that's true — agreeing with something","Maybe","Never"], answer:1, exp:"Tashika ni — certainly / that's true. Used to agree or confirm something." },
    { type:"tf", cat:"Phrase", q:"Onegai is a casual form of Onegaishimasu.", answer:true, exp:"True — both mean please / I beg you. Onegai is casual, Onegaishimasu is formal." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぞ", answer:"zo", answers:["zo"], exp:"ぞ = 'zo'. Voiced version of そ." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nだ", answer:"da", answers:["da"], exp:"だ = 'da'. Voiced version of た." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nで", answer:"de", answers:["de"], exp:"で = 'de'. Location/means particle and voiced て." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nど", answer:"do", answers:["do"], exp:"ど = 'do'. Voiced version of と." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nゾ", answer:"zo", answers:["zo"], exp:"ゾ = 'zo' — voiced katakana." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nダ", answer:"da", answers:["da"], exp:"ダ = 'da' — voiced katakana." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nデ", answer:"de", answers:["de"], exp:"デ = 'de' — appears in デパート (department store)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'da'\n🎌 Japanese keyboard", answer:"だ", answers:["だ"], exp:"だ = 'da'. Voiced た." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'de'\n🎌 Japanese keyboard", answer:"で", answers:["で"], exp:"で = 'de'. Location and means particle." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nなんとなく", answer:"nantonaku", answers:["nantonaku"], exp:"Nantonaku — somehow / vaguely / for no particular reason." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nたしかに", answer:"certainly", answers:["certainly","that's true","indeed","tashika ni"], exp:"Tashika ni — certainly / that's true." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"くちさびしい", en:"Eating when bored/stressed" },
      { jp:"あまえ", en:"Sweet dependence on goodwill" },
      { jp:"なんとなく", en:"Somehow / for no reason" },
      { jp:"たしかに", en:"Certainly / that's true" },
    ], exp:"Day 12 key concepts." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'certainly'\n🎌 Japanese keyboard", answer:"たしかに", answers:["たしかに"], exp:"Tashika ni (たしかに) — certainly / that's true." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Please / I beg you (casual)'", answer:"onegai", answers:["onegai"], exp:"Onegai (お願い) — please. Casual form of onegaishimasu." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Eating when not hungry — out of boredom'", answer:"kuchisabishii", answers:["kuchisabishii"], exp:"Kuchisabishii (口寂しい) — eating from loneliness or boredom, not hunger." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Somehow / vaguely / for no real reason'", answer:"nantonaku", answers:["nantonaku"], exp:"Nantonaku (なんとなく) — somehow, vaguely, without clear reason." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Sweet emotional dependence on another'", answer:"amae", answers:["amae"], exp:"Amae (甘え) — the comfort of depending on another person's goodwill." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'Can you please help me?'", words:["onegai","tasukete","kudasai","chotto"], answer:["chotto","tasukete","kudasai"], exp:"Chotto tasukete kudasai — please help me a little." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nKuchi_____ — eating when your mouth is lonely", answer:"sabishii", answers:["sabishii"], exp:"Kuchisabishii — kuchi (mouth) + sabishii (lonely). Eating from boredom." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'please (casual)'\n🎌 Japanese keyboard", answer:"おねがい", answers:["おねがい"], exp:"Onegai (お願い) — please, casual form." },
  ],

  // ─────────────────────────────────────────
  // DAY 13 — Week 3: Yuugen, Kodawari, B-row
  // ─────────────────────────────────────────
  13: [
    { type:"mc", cat:"Fact", q:"What does Yuugen describe?", options:["A type of food","A profound awareness of the universe too deep for words","A festival","A martial art"], answer:1, exp:"Yuugen — the feeling when watching fog roll over mountains. Beauty beyond expression." },
    { type:"mc", cat:"Fact", q:"What does Kodawari mean?", options:["Laziness","Uncompromising dedication to a personal standard — obsessive pursuit of quality","Flexibility","Indifference"], answer:1, exp:"Kodawari — the obsessive pursuit of one specific standard of quality." },
    { type:"tf", cat:"Fact", q:"Japan has over 6.5 million vending machines.", answer:true, exp:"True — roughly one for every 20 people, generating over $60 billion annually." },
    { type:"tf", cat:"Fact", q:"Japan's Lost Decade refers to economic stagnation in the 1970s.", answer:false, exp:"False — the Lost Decade was the 1990s, following the collapse of a massive asset bubble." },
    { type:"mc", cat:"Fact", q:"What is Furoshiki?", options:["A type of food","Traditional cloth wrapping — eco-friendly alternative to bags","A dance","A temple"], answer:1, exp:"Furoshiki — the ancient art of wrapping objects in cloth. Having a modern eco revival." },
    { type:"mc", cat:"Phrase", q:"What does Ojama shimasu mean?", options:["Thank you","Sorry for intruding — said when entering someone's home or office","Goodbye","Good morning"], answer:1, exp:"Ojama shimasu — sorry for intruding. Said every time you enter someone else's space." },
    { type:"mc", cat:"Phrase", q:"What does Shoushou omachi kudasai mean?", options:["Please eat","Please wait a moment","Please come in","Please sit down"], answer:1, exp:"Shoushou omachi kudasai — please wait a moment. Very polite." },
    { type:"tf", cat:"Fact", q:"Japan's Noh theater is the world's oldest continuously performed theatrical tradition.", answer:true, exp:"True — dating back to the 14th century, still performed in its original form today." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nば", answer:"ba", answers:["ba"], exp:"ば = 'ba'. Voiced version of は." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nび", answer:"bi", answers:["bi"], exp:"び = 'bi'. Voiced version of ひ." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぶ", answer:"bu", answers:["bu"], exp:"ぶ = 'bu'. Voiced version of ふ." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nべ", answer:"be", answers:["be"], exp:"べ = 'be'. Voiced version of へ." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぼ", answer:"bo", answers:["bo"], exp:"ぼ = 'bo'. Voiced version of ほ." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nバ", answer:"ba", answers:["ba"], exp:"バ = 'ba' — appears in バス (bus)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nビ", answer:"bi", answers:["bi"], exp:"ビ = 'bi' — appears in ビール (beer)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ba'\n🎌 Japanese keyboard", answer:"ば", answers:["ば"], exp:"ば = 'ba'. Voiced H-row." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'bo'\n🎌 Japanese keyboard", answer:"ぼ", answers:["ぼ"], exp:"ぼ = 'bo'." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nこだわり", answer:"kodawari", answers:["kodawari"], exp:"Kodawari — uncompromising personal standard." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nおじゃまします", answer:"sorry for intruding", answers:["sorry for intruding","excuse me for intruding","ojama shimasu"], exp:"Ojama shimasu — said when entering someone's home or office." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"ゆうげん", en:"Profound beauty beyond words" },
      { jp:"こだわり", en:"Obsessive personal standard" },
      { jp:"ふろしき", en:"Traditional cloth wrapping" },
      { jp:"おじゃまします", en:"Sorry for intruding" },
    ], exp:"Day 13 key concepts." },
    { type:"fill", cat:"Fact", q:"Fill in the blank — type ROMAJI:\nProfound beauty beyond words → ___________", answer:"yuugen", answers:["yuugen","yugen"], exp:"Yuugen — beauty too deep for words." },
    { type:"fill", cat:"Phrase", q:"Fill in the blank — type ROMAJI:\nSorry for intruding → ___________", answer:"ojama shimasu", answers:["ojama shimasu","ojamashimasu"], exp:"Ojama shimasu — said when entering someone's space." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nしょうしょう おまち_____。(Please wait a moment)", answer:"ください", answers:["ください","kudasai"], exp:"おまちください — ください means please (do something)." },
    { type:"mc", cat:"Vocab", q:"Which concept means \"obsessive dedication to a personal quality standard\"?", options:["ゆうげん","こだわり","あまえ","ふろしき"], answer:1, exp:"Kodawari — going beyond quality into obsessive personal standards." },
    { type:"mc", cat:"Vocab", q:"What is ふろしき?", options:["A type of food","Traditional cloth wrapping — eco-friendly alternative to bags","A martial art","A tea ceremony"], answer:1, exp:"Furoshiki — ancient wrapping art having a modern eco revival." },
    { type:"tf", cat:"Fact", q:"Japan has over 6.5 million vending machines.", answer:true, exp:"True — roughly one for every 20 people." },
    { type:"mc", cat:"Context", q:"You enter a colleague's office for a meeting. What do you say?", options:["いらっしゃいませ","おじゃまします","いただきます","さようなら"], answer:1, exp:"Ojama shimasu — sorry for intruding. Said when entering someone's space." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Profound beauty beyond words'", answer:"yuugen", answers:["yuugen"], exp:"Yuugen (幽玄) — beauty so deep it cannot be expressed." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Obsessive dedication to a personal standard'", answer:"kodawari", answers:["kodawari"], exp:"Kodawari (こだわり) — uncompromising pursuit of quality in your craft." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Please wait a moment' (polite)", answer:"shoushou omachi kudasai", answers:["shoushou omachi kudasai","shoushō omachi kudasai"], exp:"Shoushou omachi kudasai (少々お待ちください) — please wait a moment." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Sorry for intruding' (entering a space)", answer:"ojama shimasu", answers:["ojama shimasu"], exp:"Ojama shimasu (お邪魔します) — said when entering someone's home or office." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'Please wait just a moment'", words:["shoushou","omachi","kudasai","ima"], answer:["shoushou","omachi","kudasai"], exp:"Shoushou omachi kudasai — please wait a moment." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'Sorry for intruding' (entering)", words:["ojama","shimasu","sumimasen","hai"], answer:["ojama","shimasu"], exp:"Ojama shimasu — sorry for intruding / excuse me for entering." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'sorry for intruding'\n🎌 Japanese keyboard", answer:"おじゃまします", answers:["おじゃまします"], exp:"Ojama shimasu — said when entering someone's home or workspace." },
  ],

  // ─────────────────────────────────────────
  // DAY 14 — Week 3: Shoganai, Mendokusai, P-row
  // ─────────────────────────────────────────
  14: [
    { type:"mc", cat:"Fact", q:"What does Shoganai mean?", options:["Let's fight","It can't be helped — cultural acceptance of situations beyond your control","Let's eat","Let's go"], answer:1, exp:"Shoganai — it can't be helped. The psychological protection of accepting what can't be changed." },
    { type:"mc", cat:"Fact", q:"What does Mendokusai mean?", options:["Beautiful","Troublesome / too much effort — very common in casual speech","Delicious","Interesting"], answer:1, exp:"Mendokusai — too troublesome or annoying. One of the most relatable words in Japanese." },
    { type:"tf", cat:"Fact", q:"Pachinko gambling generates more revenue than Las Vegas, Macau, and Singapore combined.", answer:true, exp:"True — yet it's technically not gambling because prizes can't be directly exchanged for cash." },
    { type:"tf", cat:"Fact", q:"Japan has a national holiday called Respect for the Aged Day.", answer:true, exp:"True — communities honor elders, particularly those over 100." },
    { type:"mc", cat:"Fact", q:"What does Uchi-Soto mean?", options:["In-group vs out-group — behavior and language shift depending on who you're with","A type of food","A festival","A sport"], answer:0, exp:"Uchi-Soto — in-group (uchi) and out-group (soto). Everything about how you act changes." },
    { type:"mc", cat:"Phrase", q:"What does Ki wo tsukete mean?", options:["Good morning","Take care / be careful","Thank you","Goodbye"], answer:1, exp:"Ki wo tsukete — take care / be careful. Said when someone is leaving or in a risky situation." },
    { type:"mc", cat:"Phrase", q:"What does Odaiji ni mean?", options:["Good morning","Thank you","Take care of yourself — said to someone who is sick","Goodbye"], answer:2, exp:"Odaiji ni — take care of yourself. Said specifically when someone is ill or unwell." },
    { type:"tf", cat:"Phrase", q:"Ki wo tsukete and Odaiji ni mean the same thing.", answer:false, exp:"False — Ki wo tsukete is general be careful, Odaiji ni is specifically said to sick people." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぱ", answer:"pa", answers:["pa"], exp:"ぱ = 'pa'. P-row — created by adding a circle (handakuten) to H-row." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぴ", answer:"pi", answers:["pi"], exp:"ぴ = 'pi'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぷ", answer:"pu", answers:["pu"], exp:"ぷ = 'pu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぺ", answer:"pe", answers:["pe"], exp:"ぺ = 'pe'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぽ", answer:"po", answers:["po"], exp:"ぽ = 'po'." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nパ", answer:"pa", answers:["pa"], exp:"パ = 'pa' — appears in パン (bread) and パソコン (PC)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nピ", answer:"pi", answers:["pi"], exp:"ピ = 'pi' — appears in ピアノ (piano)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'pa'\n🎌 Japanese keyboard", answer:"ぱ", answers:["ぱ"], exp:"ぱ = 'pa'. P-row from H-row + circle mark." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'po'\n🎌 Japanese keyboard", answer:"ぽ", answers:["ぽ"], exp:"ぽ = 'po'." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nしょうがない", answer:"shoganai", answers:["shoganai","shouganai"], exp:"Shoganai — it can't be helped." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nおだいじに", answer:"take care of yourself", answers:["take care of yourself","get well soon","odaiji ni"], exp:"Odaiji ni — said to someone who is sick." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"しょうがない", en:"It can't be helped" },
      { jp:"めんどうくさい", en:"Too troublesome / too much effort" },
      { jp:"うちそと", en:"In-group vs out-group" },
      { jp:"きをつけて", en:"Take care / be careful" },
    ], exp:"Day 14 key concepts." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'it can't be helped'\n🎌 Japanese keyboard", answer:"しょうがない", answers:["しょうがない","しょがない"], exp:"Shoganai (しょうがない) — it can't be helped." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'take care'\n🎌 Japanese keyboard", answer:"きをつけて", answers:["きをつけて"], exp:"Ki wo tsukete (きをつけて) — take care / be careful." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nき___つけて。(Take care / Be careful)", answer:"を", answers:["を","wo","o"], exp:"きをつけて — を connects き (spirit) to つけて (attach)." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"きをつけて", words:["き","を","つけて","ください","して"], answer:["き","を","つけて"], exp:"きをつけて — Take care / Be careful." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'It can't be helped / nothing to be done'", answer:"shoganai", answers:["shoganai","shouganai"], exp:"Shoganai (しょうがない) — it can't be helped. Acceptance of the inevitable." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Troublesome / too much effort'", answer:"mendokusai", answers:["mendokusai"], exp:"Mendokusai (面倒くさい) — too much trouble. Very common in casual speech." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Take care of yourself' (to someone sick)", answer:"odaiji ni", answers:["odaiji ni","odaijini"], exp:"Odaiji ni (お大事に) — take care of yourself. Said to someone who is ill." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Take care / be careful' (parting)", answer:"ki wo tsukete", answers:["ki wo tsukete","ki o tsukete"], exp:"Ki wo tsukete (気をつけて) — take care. Said when someone is leaving." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'Take care on your way home'", words:["ki","wo","tsukete","kaette"], answer:["ki","wo","tsukete"], exp:"Ki wo tsukete — take care. The verb kaette (go home) adds context." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nUchi-Soto: in-group vs _____-group", answer:"out", answers:["out","outside","soto"], exp:"Uchi (inside/in-group) vs Soto (outside/out-group). Behavior shifts between these." },
    { type:"mc", cat:"Concept", q:"You are texting a close friend who just caught a cold. Which is most appropriate?", options:["Shoganai","Odaiji ni","Mendokusai","Maji de"], answer:1, exp:"Odaiji ni — take care of yourself. The right phrase for someone who is sick." },
  ],

  // ─────────────────────────────────────────
  // DAY 15 — Week 3: Ensou, Zanshin, Compound chars
  // ─────────────────────────────────────────
  15: [
    { type:"mc", cat:"Fact", q:"What does Ensou represent in Zen philosophy?", options:["A type of food","A hand-drawn circle representing the universe, completeness, and perfection of imperfection","A dance","A temple"], answer:1, exp:"Ensou — the Zen circle. One brushstroke, representing everything and nothing." },
    { type:"mc", cat:"Fact", q:"What does Zanshin mean?", options:["A fighting move","Remaining mind — relaxed alertness maintained even after completing an action","A type of food","A greeting"], answer:1, exp:"Zanshin — the mental state after action. Used in martial arts, tea ceremony, and archery." },
    { type:"tf", cat:"Fact", q:"Japan exports anime content to over 140 countries.", answer:true, exp:"True — anime is one of Japan's most powerful tools of soft power and cultural diplomacy." },
    { type:"tf", cat:"Fact", q:"Japan's writing system requires mastery of only one script.", answer:false, exp:"False — hiragana, katakana, kanji, and romaji. Most Japanese people master all four." },
    { type:"mc", cat:"Fact", q:"What does Donmai mean?", options:["Watch out","Don't mind / no worries — casual encouragement after a mistake","Thank you","Goodbye"], answer:1, exp:"Donmai — from English 'don't mind'. Used casually to say no worries after a mistake." },
    { type:"mc", cat:"Phrase", q:"What does Yabai mean in modern Japanese?", options:["Dangerous only","Boring","Crazy / incredible / extreme — originally negative, now used for anything intense","Quiet"], answer:2, exp:"Yabai — originally meant dangerous, now used by young Japanese for anything extreme or amazing." },
    { type:"mc", cat:"Phrase", q:"What does Maji de mean?", options:["Good morning","Seriously? / For real? — very casual expression of disbelief","Thank you","Goodbye"], answer:1, exp:"Maji de — seriously? For real? Very casual, used among friends." },
    { type:"tf", cat:"Phrase", q:"Donmai comes from an English phrase.", answer:true, exp:"True — from 'don't mind'. Japanese has many loan words from English called gairaigo." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nきゃ", answer:"kya", answers:["kya"], exp:"きゃ = 'kya'. Compound character ki + small ya." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nきゅ", answer:"kyu", answers:["kyu"], exp:"きゅ = 'kyu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nきょ", answer:"kyo", answers:["kyo"], exp:"きょ = 'kyo'. Appears in とうきょう (Tokyo)." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nしゃ", answer:"sha", answers:["sha"], exp:"しゃ = 'sha'. Compound character shi + small ya." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nキャ", answer:"kya", answers:["kya"], exp:"キャ = 'kya' — katakana compound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nシャ", answer:"sha", answers:["sha"], exp:"シャ = 'sha' — appears in シャワー (shower)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'kya'\n🎌 Japanese keyboard", answer:"きゃ", answers:["きゃ"], exp:"きゃ = 'kya'. Ki + small ya." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'sha'\n🎌 Japanese keyboard", answer:"しゃ", answers:["しゃ"], exp:"しゃ = 'sha'. Shi + small ya." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nざんしん", answer:"zanshin", answers:["zanshin"], exp:"Zanshin — remaining mind / relaxed alertness." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nどんまい", answer:"don't mind", answers:["don't mind","dont mind","no worries","donmai"], exp:"Donmai — don't mind / no worries. From English." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"えんそう", en:"Zen circle — completeness" },
      { jp:"ざんしん", en:"Remaining mind / relaxed alertness" },
      { jp:"どんまい", en:"Don't mind / no worries" },
      { jp:"やばい", en:"Crazy / extreme / intense" },
    ], exp:"Day 15 key concepts." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'seriously?'\n🎌 Japanese keyboard", answer:"マジで", answers:["マジで","まじで"], exp:"Maji de (マジで) — seriously? / for real?" },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'no worries'\n🎌 Japanese keyboard", answer:"どんまい", answers:["どんまい"], exp:"Donmai (どんまい) — don't mind / no worries." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Seriously? / For real?' (casual disbelief)", answer:"maji de", answers:["maji de","majide"], exp:"Maji de (マジで) — seriously? For real? Very casual, strong expression." },
    { type:"translateENJP", cat:"Vocab", q:"Translate to ROMAJI:\n'Crazy / incredible' (modern slang)", answer:"yabai", answers:["yabai"], exp:"Yabai (やばい) — originally dangerous, now means anything extreme or amazing." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Don't mind / forget about it' (from English)", answer:"donmai", answers:["donmai"], exp:"Donmai — from 'don't mind'. Used to comfort someone after a mistake." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Remaining mind — alertness after completing an action'", answer:"zanshin", answers:["zanshin"], exp:"Zanshin (残心) — the state of relaxed awareness that follows an action." },
    { type:"wordorder", cat:"Phrase", q:"Arrange a casual expression: 'Seriously?! That's incredible!'", words:["maji","de","yabai","sore"], answer:["maji","de","sore","yabai"], exp:"Maji de? Sore yabai! — Seriously? That's incredible!" },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\n_____ is a Zen circle symbolizing completeness", answer:"ensou", answers:["ensou","enso"], exp:"Ensou (円相) — the Zen circle. Represents completeness, the universe, the void." },
    { type:"complete", cat:"Phrase", q:"Complete — type ROMAJI:\nA mistake happens. Friend says: 'Daijobu! _____!' (Don't worry about it!)", answer:"donmai", answers:["donmai"], exp:"Donmai — don't mind it. The casual Japanese way to say forget about it." },
  ],

  // ─────────────────────────────────────────
  // DAY 16 — Week 4: Kintsugi, Senpai, Compound chars
  // ─────────────────────────────────────────
  16: [
    { type:"mc", cat:"Fact", q:"What is Kintsugi?", options:["A type of food","The art of repairing broken pottery with gold — turning damage into beauty","A martial art","A festival"], answer:1, exp:"Kintsugi — gold joinery. The break becomes part of the story. A physical embodiment of Wabi-Sabi." },
    { type:"mc", cat:"Fact", q:"What does Senpai mean?", options:["A junior","A senior or mentor in school or work","A stranger","A teacher"], answer:1, exp:"Senpai — senior or mentor. The Senpai-Kouhai relationship is a cornerstone of Japanese social structure." },
    { type:"tf", cat:"Fact", q:"Japan produces over 1 billion manga volumes per year.", answer:true, exp:"True — larger than all of Hollywood's domestic box office combined." },
    { type:"tf", cat:"Fact", q:"Giri refers to genuine personal desire in Japanese culture.", answer:false, exp:"False — Giri means social obligation or duty. Doing things for harmony, not personal desire." },
    { type:"mc", cat:"Fact", q:"What does Mottainai philosophy promote?", options:["Spending freely","Avoiding waste — disrespecting the effort that went into creating something","Eating more","Traveling more"], answer:1, exp:"Mottainai — regret over waste. Refusing to waste anything as a form of respect." },
    { type:"mc", cat:"Phrase", q:"What does Kouhai mean?", options:["Senior","Teacher","Junior — someone with less experience, the counterpart to Senpai","Stranger"], answer:2, exp:"Kouhai — junior. Always younger or less experienced than you in the senpai-kouhai relationship." },
    { type:"mc", cat:"Phrase", q:"What does Hanko mean?", options:["A greeting","Personal seal stamp — used instead of a signature on official documents","A festival","A type of food"], answer:1, exp:"Hanko — every Japanese person has their own unique personal stamp used on official documents." },
    { type:"tf", cat:"Phrase", q:"Kintsugi is a philosophy as well as an art form.", answer:true, exp:"True — kintsugi teaches that breakage and repair are part of the history of an object, not something to hide." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nしゅ", answer:"shu", answers:["shu"], exp:"しゅ = 'shu'. Compound shi + small yu." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nしょ", answer:"sho", answers:["sho"], exp:"しょ = 'sho'. Appears in しょうゆ (soy sauce)." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nちゃ", answer:"cha", answers:["cha"], exp:"ちゃ = 'cha'. Appears in おちゃ (tea)." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nちゅ", answer:"chu", answers:["chu"], exp:"ちゅ = 'chu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nちょ", answer:"cho", answers:["cho"], exp:"ちょ = 'cho'. Appears in ちょっと (a little)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nシュ", answer:"shu", answers:["shu"], exp:"シュ = 'shu' — appears in シュート (shoot)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nチャ", answer:"cha", answers:["cha"], exp:"チャ = 'cha' — appears in チャンス (chance)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'cha'\n🎌 Japanese keyboard", answer:"ちゃ", answers:["ちゃ"], exp:"ちゃ = 'cha'. Chi + small ya." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'sho'\n🎌 Japanese keyboard", answer:"しょ", answers:["しょ"], exp:"しょ = 'sho'. Shi + small yo." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nきんつぎ", answer:"kintsugi", answers:["kintsugi"], exp:"Kintsugi — repairing with gold." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nせんぱい", answer:"senior", answers:["senior","mentor","senpai","upperclassman"], exp:"Senpai — senior or mentor. One of the most well-known Japanese words globally." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"きんつぎ", en:"Repair with gold — beauty in damage" },
      { jp:"せんぱい", en:"Senior / mentor" },
      { jp:"こうはい", en:"Junior" },
      { jp:"ぎり", en:"Social obligation / duty" },
    ], exp:"Day 16 key concepts." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'senior / mentor'\n🎌 Japanese keyboard", answer:"せんぱい", answers:["せんぱい"], exp:"Senpai (せんぱい) — senior in school or work." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'junior'\n🎌 Japanese keyboard", answer:"こうはい", answers:["こうはい"], exp:"Kouhai (こうはい) — junior." },
    { type:"mc", cat:"Vocab", q:"Which art form repairs broken pottery with gold?", options:["いけばな","きんつぎ","ふろしき","おりがみ"], answer:1, exp:"Kintsugi — the break becomes part of the beauty. A physical embodiment of Wabi-Sabi." },
    { type:"mc", cat:"Vocab", q:"What is the relationship between せんぱい and こうはい?", options:["Enemy and ally","Senior and junior","Teacher and student","Parent and child"], answer:1, exp:"Senpai-Kouhai — the cornerstone of Japanese social hierarchy." },
    { type:"tf", cat:"Vocab", q:"ぎり refers to genuine personal desire.", answer:false, exp:"False — Giri means social obligation or duty, not personal desire." },
    { type:"mc", cat:"Context", q:"Your pottery breaks. A Japanese friend says it can be repaired beautifully. What concept are they referencing?", options:["かいぜん","きんつぎ","わびさび","もったいない"], answer:1, exp:"Kintsugi — turning damage into art. The philosophy that breakage is part of the story." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Repairing broken things with gold — beauty through damage'", answer:"kintsugi", answers:["kintsugi"], exp:"Kintsugi (金継ぎ) — the art of repairing broken pottery with gold. Damage is part of the story." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Senior — experienced person who guides others'", answer:"senpai", answers:["senpai"], exp:"Senpai (先輩) — a senior who guides and mentors a junior (kouhai)." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Social obligation / duty to repay kindness'", answer:"giri", answers:["giri"], exp:"Giri (義理) — a deep sense of social duty. Receiving a favor creates an obligation to return it." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Personal seal stamp used instead of a signature'", answer:"hanko", answers:["hanko"], exp:"Hanko (判子) — a personal stamp used on official documents in Japan instead of a handwritten signature." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'Is this kintsugi?'", words:["kore","wa","kintsugi","desu","ka","kouhai"], answer:["kore","wa","kintsugi","desu","ka"], exp:"Kore wa kintsugi desu ka? — Is this kintsugi? Kouhai is a decoy." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nThe ___-kouhai relationship structures Japanese workplaces and schools", answer:"senpai", answers:["senpai"], exp:"The senpai-kouhai hierarchy defines mentorship in Japan across workplaces, schools, and clubs." },
    { type:"mc", cat:"Usage", q:"You received a great gift from a colleague. You feel pressure to return the favor equally or more. Which concept describes this feeling?", options:["Kintsugi","Giri","Senpai","Hanko"], answer:1, exp:"Giri — social obligation. In Japan, receiving kindness creates a duty to reciprocate appropriately." },
  ],

  // ─────────────────────────────────────────
  // DAY 17 — Week 4: Seijaku, Mushin, Shibui
  // ─────────────────────────────────────────
  17: [
    { type:"mc", cat:"Fact", q:"What does Seijaku mean?", options:["Loud activity","Silence and tranquility — finding stillness in the middle of activity","Extreme speed","Chaos"], answer:1, exp:"Seijaku — the eye of the storm. Finding stillness while surrounded by activity." },
    { type:"mc", cat:"Fact", q:"What does Mushin mean in Zen Buddhism?", options:["Overthinking","No mind — acting without conscious thought, ego, or hesitation","Anger","Fear"], answer:1, exp:"Mushin — no mind. The mental state of peak performance. Athletes and artists describe it as the zone." },
    { type:"tf", cat:"Fact", q:"Japan's Akashi Kaikyo Bridge is the world's longest suspension bridge.", answer:true, exp:"True — 3,911 meters, connecting Honshu to Awaji Island." },
    { type:"tf", cat:"Fact", q:"Japan's population is growing rapidly.", answer:false, exp:"False — Japan's population peaked around 128 million in 2008 and has been shrinking ever since." },
    { type:"mc", cat:"Fact", q:"What does Shibui describe?", options:["Loud flashy beauty","A subtle, unassuming beauty that reveals itself slowly — the opposite of flashy","A type of food","A festival"], answer:1, exp:"Shibui — quiet elegance. The aesthetic of less is more, slow reveal, understated beauty." },
    { type:"mc", cat:"Phrase", q:"What does Hikikomori describe?", options:["A type of food","Extreme social withdrawal — people who isolate completely from society","A festival","A sport"], answer:1, exp:"Hikikomori — complete social withdrawal. Japan has an estimated 1+ million hikikomori." },
    { type:"mc", cat:"Phrase", q:"What does Ikebana mean?", options:["A type of food","Japanese flower arranging — a meditative discipline with centuries of formal schools","A martial art","A festival"], answer:1, exp:"Ikebana — the way of flowers. Not decoration but a complete meditative discipline." },
    { type:"tf", cat:"Fact", q:"Over 28% of Japan's population is 65 or older.", answer:true, exp:"True — Japan is the world's most extreme super-aged society." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nにゃ", answer:"nya", answers:["nya"], exp:"にゃ = 'nya'. Compound ni + small ya. Also the sound cats make in Japanese!" },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nにゅ", answer:"nyu", answers:["nyu"], exp:"にゅ = 'nyu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nにょ", answer:"nyo", answers:["nyo"], exp:"にょ = 'nyo'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nひゃ", answer:"hya", answers:["hya"], exp:"ひゃ = 'hya'. Compound hi + small ya." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nニャ", answer:"nya", answers:["nya"], exp:"ニャ = 'nya' — katakana compound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nニュ", answer:"nyu", answers:["nyu"], exp:"ニュ = 'nyu' — appears in ニュース (news)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'nya'\n🎌 Japanese keyboard", answer:"にゃ", answers:["にゃ"], exp:"にゃ = 'nya'. Ni + small ya." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'nyu'\n🎌 Japanese keyboard", answer:"にゅ", answers:["にゅ"], exp:"にゅ = 'nyu'." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nせいじゃく", answer:"seijaku", answers:["seijaku"], exp:"Seijaku — silence and tranquility." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nむしん", answer:"no mind", answers:["no mind","mushin","empty mind","acting without thought"], exp:"Mushin — no mind. Peak performance state." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"せいじゃく", en:"Stillness within activity" },
      { jp:"むしん", en:"No mind — peak performance" },
      { jp:"しぶい", en:"Subtle understated elegance" },
      { jp:"いけばな", en:"Meditative flower arranging" },
    ], exp:"Day 17 key concepts." },
    { type:"complete", cat:"Grammar", q:"Complete — type the correct particle:\nバス ___ がっこう ___ いきます。('I go to school by bus.')", answer:"で に", answers:["で に","de ni"], exp:"で marks the means of transport, に marks the destination." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Silence and tranquility — peaceful stillness'", answer:"seijaku", answers:["seijaku"], exp:"Seijaku (静寂) — deep silence and tranquility. The kind of stillness found in a forest or zen garden." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'No-mind — state of mental clarity without distraction'", answer:"mushin", answers:["mushin"], exp:"Mushin (無心) — literally no mind. A state of complete mental clarity and presence, sought in martial arts and meditation." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Subtle, understated elegance that deepens over time'", answer:"shibui", answers:["shibui"], exp:"Shibui (渋い) — quiet, restrained beauty that improves with age. The opposite of flashy." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'The Japanese art of flower arranging'", answer:"ikebana", answers:["ikebana"], exp:"Ikebana (生け花) — living flowers. A discipline of flower arrangement emphasizing form, space, and balance." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'I learn ikebana'", words:["ikebana","wo","manabu","de","ni"], answer:["ikebana","wo","manabu"], exp:"Ikebana wo manabu — I learn ikebana. を marks the direct object." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nThe master achieves ___ — total absence of distracting thought", answer:"mushin", answers:["mushin"], exp:"Mushin — no mind. Achieved through practice until action becomes effortless and automatic." },
    { type:"mc", cat:"Usage", q:"A tea bowl is simple, slightly irregular, and aged — beautiful in its restraint. Which concept best describes it?", options:["Shibui","Hikikomori","Ikebana","Mushin"], answer:0, exp:"Shibui — understated, quiet elegance. Beauty that does not demand attention but rewards a closer look." },
  ],

  // ─────────────────────────────────────────
  // DAY 18 — Week 4: Omoiyari, Gaman, Bushido
  // ─────────────────────────────────────────
  18: [
    { type:"mc", cat:"Fact", q:"What does Omoiyari mean?", options:["Selfishness","Empathy and consideration — anticipating others' needs before they express them","Indifference","Competition"], answer:1, exp:"Omoiyari — the invisible force behind Japan's legendary service culture. Anticipate, don't wait." },
    { type:"mc", cat:"Fact", q:"What does Gaman mean?", options:["Giving up","Enduring with patience and dignity — resilience in the face of hardship","Anger","Laziness"], answer:1, exp:"Gaman — enduring the seemingly unbearable. Helped Japan survive earthquakes, tsunamis, and atomic bombs." },
    { type:"tf", cat:"Fact", q:"Bushido is the code of ethics developed by samurai.", answer:true, exp:"True — the way of the warrior. Loyalty, honor, and discipline. Still influences Japanese culture today." },
    { type:"tf", cat:"Fact", q:"Japan's Shinto religion has a single founder and sacred text.", answer:false, exp:"False — Shinto has no founder, no sacred scripture, and no fixed prayers. It's nature-based and ancient." },
    { type:"mc", cat:"Fact", q:"What does Kami refer to in Shinto?", options:["Food","Spirits or gods — broader than Western concepts, encompassing nature spirits and ancestral spirits","Money","Clothing"], answer:1, exp:"Kami — spirits or gods. Everything from mountains to rivers to ancestors can be kami." },
    { type:"mc", cat:"Phrase", q:"What does Ninjou mean?", options:["Obligation","Human warmth and compassion — the warm humanity connecting people beyond formal rules","Indifference","Competition"], answer:1, exp:"Ninjou — human feeling. The warmth that exists between people beyond obligations." },
    { type:"mc", cat:"Phrase", q:"What does Otaku mean in modern usage?", options:["A rude insult only","Obsessive fan — originally negative slang, now a global badge of deep fandom","A samurai","A chef"], answer:1, exp:"Otaku — originally meant socially awkward obsessive. Now reclaimed globally as a badge of honor." },
    { type:"tf", cat:"Phrase", q:"Gaman is considered a weakness in Japanese culture.", answer:false, exp:"False — Gaman is a cultural strength. Enduring hardship with dignity is deeply respected." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nひゅ", answer:"hyu", answers:["hyu"], exp:"ひゅ = 'hyu'. Compound hi + small yu." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nひょ", answer:"hyo", answers:["hyo"], exp:"ひょ = 'hyo'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nみゃ", answer:"mya", answers:["mya"], exp:"みゃ = 'mya'. Compound mi + small ya." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nみゅ", answer:"myu", answers:["myu"], exp:"みゅ = 'myu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nみょ", answer:"myo", answers:["myo"], exp:"みょ = 'myo'." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nヒョ", answer:"hyo", answers:["hyo"], exp:"ヒョ = 'hyo' — katakana compound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nミュ", answer:"myu", answers:["myu"], exp:"ミュ = 'myu' — appears in ミュージック (music)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'hyo'\n🎌 Japanese keyboard", answer:"ひょ", answers:["ひょ"], exp:"ひょ = 'hyo'." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'myo'\n🎌 Japanese keyboard", answer:"みょ", answers:["みょ"], exp:"みょ = 'myo'." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nおもいやり", answer:"omoiyari", answers:["omoiyari"], exp:"Omoiyari — empathy and consideration." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nがまん", answer:"endurance", answers:["endurance","patience","gaman","enduring with dignity"], exp:"Gaman — enduring with patience and dignity." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"おもいやり", en:"Anticipate others' needs" },
      { jp:"がまん", en:"Endure with dignity" },
      { jp:"ぶしどう", en:"The way of the warrior" },
      { jp:"にんじょう", en:"Human warmth beyond rules" },
    ], exp:"Day 18 key concepts." },
    { type:"fill", cat:"Fact", q:"Fill in the blank — type ROMAJI:\nThe way of the warrior → ___________", answer:"bushido", answers:["bushido","bushidou"], exp:"Bushido — samurai code of loyalty, honor, discipline." },
    { type:"fill", cat:"Phrase", q:"Fill in the blank — type ROMAJI:\nEnduring with patience and dignity → ___________", answer:"gaman", answers:["gaman"], exp:"Gaman — resilience in hardship." },
    { type:"mc", cat:"Vocab", q:"Which concept means \"anticipating others' needs before they express them\"?", options:["がまん","おもいやり","ぶしどう","にんじょう"], answer:1, exp:"Omoiyari — the invisible force behind Japan's service culture." },
    { type:"mc", cat:"Vocab", q:"What does がまん mean?", options:["Giving up","Enduring with patience and dignity","Running away","Complaining"], answer:1, exp:"Gaman — helped Japan survive earthquakes, tsunamis, and atomic bombs." },
    { type:"tf", cat:"Fact", q:"ぶしどう is the code of ethics developed by sumo wrestlers.", answer:false, exp:"False — Bushido is the samurai code. Sumo has its own traditions." },
    { type:"mc", cat:"Context", q:"Your Japanese colleague is visibly tired but keeps working without complaint. What are they demonstrating?", options:["おもいやり","がまん","ねまわし","おもてなし"], answer:1, exp:"Gaman — enduring with quiet dignity. Deeply respected in Japanese culture." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Empathy and considerate care for others'", answer:"omoiyari", answers:["omoiyari"], exp:"Omoiyari (思いやり) — anticipating and attending to others' needs without being asked. A cornerstone of Japanese social harmony." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Enduring hardship with patience and dignity'", answer:"gaman", answers:["gaman"], exp:"Gaman (我慢) — quiet endurance. Not just putting up with difficulty, but doing so with grace and composure." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'The way of the warrior — samurai code of ethics'", answer:"bushido", answers:["bushido"], exp:"Bushido (武士道) — the samurai code emphasizing loyalty, honor, discipline, and martial skill." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Human warmth, compassion, and emotional connection'", answer:"ninjou", answers:["ninjou"], exp:"Ninjou (人情) — human warmth and natural feeling. The emotional side of being human, often in tension with giri (duty)." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'Gaman is important in Japan'", words:["gaman","wa","taisetsu","desu","ga"], answer:["gaman","wa","taisetsu","desu"], exp:"Gaman wa taisetsu desu — Gaman is important. は marks the topic, ga is a decoy." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nThe samurai code of ethics is called ___", answer:"bushido", answers:["bushido"], exp:"Bushido — the way of the warrior. It governed samurai conduct and still influences Japanese values today." },
    { type:"mc", cat:"Usage", q:"Your colleague is visibly struggling but has not asked for help. You quietly assist them without waiting to be asked. Which value guides your action?", options:["Gaman","Omoiyari","Bushido","Otaku"], answer:1, exp:"Omoiyari — anticipating others' needs. Acting with consideration before being asked is the highest form of this value." },
  ],

  // ─────────────────────────────────────────
  // DAY 19 — Week 4: En, Omiyage, Kuuki wo yomu
  // ─────────────────────────────────────────
  19: [
    { type:"mc", cat:"Fact", q:"What does En mean in Japanese?", options:["Money","Fate or connection — the invisible thread that connects people who were meant to meet","Food","Travel"], answer:1, exp:"En — fate or connection. Meeting someone is never coincidence in Japanese thinking." },
    { type:"mc", cat:"Fact", q:"What is Omiyage?", options:["A greeting","Souvenir gifts — brought back whenever you travel, giving them is socially mandatory","A type of food","A festival"], answer:1, exp:"Omiyage — returning from a trip without gifts for colleagues and family is considered very rude." },
    { type:"tf", cat:"Fact", q:"Kuuki wo yomu literally means 'read the air'.", answer:true, exp:"True — the social skill of understanding unspoken context, mood, and expectations in a room." },
    { type:"tf", cat:"Fact", q:"Yatai are permanent restaurants in Japan.", answer:false, exp:"False — Yatai are mobile food stalls that appear at festivals, streets, and parks." },
    { type:"mc", cat:"Fact", q:"What does Kaigi mean?", options:["A type of food","Meetings — notoriously long because every stakeholder must reach consensus","A festival","A sport"], answer:1, exp:"Kaigi — meetings. In Japan, real decisions happen through nemawashi before the formal meeting." },
    { type:"mc", cat:"Phrase", q:"What does Kuuki wo yomu mean as a social skill?", options:["Cooking","Read the air — understand unspoken social context and expectations","Read books","Speak clearly"], answer:1, exp:"Kuuki wo yomu — one of the most important social skills in Japan. Read what's not being said." },
    { type:"mc", cat:"Phrase", q:"What does Goen ga arimasu you ni mean?", options:["Goodbye","May we be connected by fate — a blessing when parting from someone special","Good morning","Thank you"], answer:1, exp:"Goen ga arimasu you ni — a beautiful farewell blessing acknowledging the fate of having met." },
    { type:"tf", cat:"Phrase", q:"In Japan it's acceptable to return from a trip without bringing gifts.", answer:false, exp:"False — Omiyage is socially mandatory. Not bringing gifts is considered rude and inconsiderate." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nりゃ", answer:"rya", answers:["rya"], exp:"りゃ = 'rya'. Compound ri + small ya." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nりゅ", answer:"ryu", answers:["ryu"], exp:"りゅ = 'ryu'. Appears in りゅうがくせい (international student)." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nりょ", answer:"ryo", answers:["ryo"], exp:"りょ = 'ryo'. Appears in りょかん (ryokan inn)." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぎゃ", answer:"gya", answers:["gya"], exp:"ぎゃ = 'gya'. Voiced compound." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぎゅ", answer:"gyu", answers:["gyu"], exp:"ぎゅ = 'gyu'. Appears in ぎゅうにゅう (milk)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nリュ", answer:"ryu", answers:["ryu"], exp:"リュ = 'ryu' — katakana compound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nギャ", answer:"gya", answers:["gya"], exp:"ギャ = 'gya' — voiced katakana compound." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ryo'\n🎌 Japanese keyboard", answer:"りょ", answers:["りょ"], exp:"りょ = 'ryo'. Ri + small yo." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'gyu'\n🎌 Japanese keyboard", answer:"ぎゅ", answers:["ぎゅ"], exp:"ぎゅ = 'gyu'. Voiced compound." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nおみやげ", answer:"omiyage", answers:["omiyage"], exp:"Omiyage — souvenir gifts. Mandatory when returning from travel." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nくうきをよむ", answer:"read the air", answers:["read the air","kuuki wo yomu","understand unspoken context"], exp:"Kuuki wo yomu — read the air / understand unspoken expectations." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"えん", en:"Fate / connection" },
      { jp:"おみやげ", en:"Souvenir gifts from travel" },
      { jp:"くうきをよむ", en:"Read the air" },
      { jp:"やたい", en:"Mobile food stall" },
    ], exp:"Day 19 key concepts." },
    { type:"complete", cat:"Grammar", q:"Complete — type the correct particle:\nともだち ___ おみやげ ___ あげます。('I give a souvenir to my friend.')", answer:"に を", answers:["に を","ni wo","ni o"], exp:"に marks the recipient, を marks what is given." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Fate or destined connection between people'", answer:"en", answers:["en"], exp:"En (縁) — the invisible thread of fate connecting people. Even brief meetings are seen as destined." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Souvenir gifts brought back for colleagues and family'", answer:"omiyage", answers:["omiyage"], exp:"Omiyage (お土産) — the deep-rooted custom of bringing back local gifts whenever you travel." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Read the air — sense the unspoken mood of a room'", answer:"kuuki wo yomu", answers:["kuuki wo yomu"], exp:"Kuuki wo yomu (空気を読む) — literally read the air. The critical social skill of sensing what is unspoken." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'May we be connected by fate'", answer:"goen ga arimasu you ni", answers:["goen ga arimasu you ni","goen ga arimasu youni"], exp:"Goen ga arimasu you ni (ご縁がありますように) — a heartfelt wish for a fateful connection with someone." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'read the air'", words:["kuuki","wo","yomu","ni","wa"], answer:["kuuki","wo","yomu"], exp:"Kuuki wo yomu — read the air. を marks kuuki (air) as the object being read." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nWhen traveling in Japan, always bring ___ back for colleagues", answer:"omiyage", answers:["omiyage"], exp:"Omiyage — souvenir gifts. Bringing back local treats for coworkers is deeply expected in Japanese culture." },
    { type:"mc", cat:"Usage", q:"You are in a meeting and sense everyone is uncomfortable but no one speaks up. Which skill helps you navigate this?", options:["En","Omiyage","Kuuki wo yomu","Yatai"], answer:2, exp:"Kuuki wo yomu — reading the air. The ability to sense unspoken feelings and adjust your behavior accordingly." },
  ],

  // ─────────────────────────────────────────
  // DAY 20 — Week 4: Miyabi, Ishin-denshin, Ryokan
  // ─────────────────────────────────────────
  20: [
    { type:"mc", cat:"Fact", q:"What does Miyabi represent?", options:["Chaos","Elegant refinement and sensitivity to beauty — the aesthetic ideal of the Heian court","Strength","Speed"], answer:1, exp:"Miyabi — the cultural DNA behind Japanese art for 1,000 years. Refined, sensitive elegance." },
    { type:"mc", cat:"Fact", q:"What does Ishin-denshin mean?", options:["Speaking loudly","Communicating heart to heart without words — understanding without explanation","Arguing","Competing"], answer:1, exp:"Ishin-denshin — deep relationships in Japan require no explanation. Understanding is felt, not spoken." },
    { type:"tf", cat:"Fact", q:"A Ryokan is a traditional Japanese inn.", answer:true, exp:"True — hot springs, kaiseki meals, yukata robes, and communal baths. The complete Japanese experience." },
    { type:"tf", cat:"Fact", q:"Japan's maglev train will connect Tokyo to Osaka in 40 minutes.", answer:true, exp:"True — expected to open around 2034-2037, just in time for Alex's Japan expansion." },
    { type:"mc", cat:"Fact", q:"What does Shibumi describe?", options:["Loudness","Elegant restraint — the quality of less being infinitely more","Complexity","Speed"], answer:1, exp:"Shibumi — elegant restraint. Related to shibui. The ultimate Japanese aesthetic of understatement." },
    { type:"mc", cat:"Phrase", q:"What does Irasshaimase mean?", options:["Goodbye","Welcome to our establishment — heard in every shop and restaurant in Japan","Thank you","Good morning"], answer:1, exp:"Irasshaimase — you will hear this every single time you enter a shop in Japan. Welcome!" },
    { type:"mc", cat:"Phrase", q:"What does Ryokan offer guests?", options:["Fast food","Hot springs, kaiseki meals, yukata robes, and communal baths","Only a bed","Only food"], answer:1, exp:"Ryokan — the complete traditional Japanese hospitality experience." },
    { type:"tf", cat:"Phrase", q:"Irasshaimase requires a response from the customer.", answer:false, exp:"False — you don't need to respond. Just acknowledge with a nod or continue browsing." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぎょ", answer:"gyo", answers:["gyo"], exp:"ぎょ = 'gyo'. Voiced compound." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nじゃ", answer:"ja", answers:["ja"], exp:"じゃ = 'ja'. Appears in じゃあね (see you later)." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nじゅ", answer:"ju", answers:["ju"], exp:"じゅ = 'ju'. Appears in じゅうしょ (address)." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nじょ", answer:"jo", answers:["jo"], exp:"じょ = 'jo'. Appears in じょうず (skilled)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nジャ", answer:"ja", answers:["ja"], exp:"ジャ = 'ja' — appears in ジャム (jam)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nジュ", answer:"ju", answers:["ju"], exp:"ジュ = 'ju' — appears in ジュース (juice)." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'ja'\n🎌 Japanese keyboard", answer:"じゃ", answers:["じゃ"], exp:"じゃ = 'ja'. Ji + small ya." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'jo'\n🎌 Japanese keyboard", answer:"じょ", answers:["じょ"], exp:"じょ = 'jo'." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nいらっしゃいませ", answer:"irasshaimase", answers:["irasshaimase","irassyaimase"], exp:"Irasshaimase — welcome to our establishment." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nりょかん", answer:"traditional japanese inn", answers:["traditional japanese inn","japanese inn","ryokan"], exp:"Ryokan — the full traditional Japanese hospitality experience." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"みやび", en:"Refined elegant sensitivity" },
      { jp:"いしんでんしん", en:"Heart to heart without words" },
      { jp:"りょかん", en:"Traditional Japanese inn" },
      { jp:"いらっしゃいませ", en:"Welcome to our establishment" },
    ], exp:"Day 20 key concepts." },
    { type:"typeJP", cat:"Phrase", q:"Type the Japanese for 'welcome' (shop greeting)\n🎌 Japanese keyboard", answer:"いらっしゃいませ", answers:["いらっしゃいませ"], exp:"Irasshaimase — heard in every shop in Japan." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"いらっしゃいませ", words:["いらっしゃい","ませ","ます","です"], answer:["いらっしゃい","ませ"], exp:"いらっしゃいませ — Welcome to our establishment." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Elegant refinement and deep sensitivity to beauty'", answer:"miyabi", answers:["miyabi"], exp:"Miyabi (雅) — courtly elegance. A refined aesthetic appreciation cultivated in classical Japanese culture." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Heart-to-heart communication without words'", answer:"ishin-denshin", answers:["ishin-denshin","ishindenshin"], exp:"Ishin-denshin (以心伝心) — literally from mind to mind. Communication through intuition and deep understanding." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Traditional Japanese inn with tatami and onsens'", answer:"ryokan", answers:["ryokan"], exp:"Ryokan (旅館) — a traditional inn offering tatami rooms, kaiseki meals, and often natural hot spring baths." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Welcome to our establishment' (said by all staff upon entry)", answer:"irasshaimase", answers:["irasshaimase"], exp:"Irasshaimase (いらっしゃいませ) — the formal welcome called out whenever a customer enters a Japanese shop or restaurant." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'I stay at a ryokan'", words:["ryokan","ni","tomaru","de","wo"], answer:["ryokan","ni","tomaru"], exp:"Ryokan ni tomaru — stay at a ryokan. に marks the destination/place of the action." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nHeart-to-heart understanding without words is called ___", answer:"ishin-denshin", answers:["ishin-denshin","ishindenshin"], exp:"Ishin-denshin — a profound non-verbal understanding between people who know each other deeply." },
    { type:"mc", cat:"Usage", q:"You walk into a Japanese restaurant and every staff member turns and says the same phrase in unison. What do they say?", options:["Otsukaresama desu","Irasshaimase","Yoroshiku onegaishimasu","Shitsurei shimasu"], answer:1, exp:"Irasshaimase — the universal welcome call in Japanese establishments. It means welcome to our store." },
  ],

  // ─────────────────────────────────────────
  // DAY 21 — Week 5: Eigyo, Keiretsu, Business JP
  // ─────────────────────────────────────────
  21: [
    { type:"mc", cat:"Fact", q:"What does Eigyo mean in Japanese business?", options:["Marketing only","Business or sales — implies trust-building over time, not aggressive selling","Finance","Management"], answer:1, exp:"Eigyo — sales in Japan is about relationship building. Never aggressive. Always long-term." },
    { type:"mc", cat:"Fact", q:"What is a Keiretsu?", options:["A type of food","A tightly linked network of companies in mutual loyalty relationships","A festival","A martial art"], answer:1, exp:"Keiretsu — Toyota, Honda, and Sony all operate within keiretsu networks. Loyalty over pure profit." },
    { type:"tf", cat:"Fact", q:"Japan has over 80 million registered vehicles.", answer:true, exp:"True — one of the world's largest automotive markets and a massive opportunity for service businesses." },
    { type:"tf", cat:"Fact", q:"In Japanese business, tipping after a successful deal is expected.", answer:false, exp:"False — tipping is never appropriate in Japan. Excellence is expected, not rewarded with cash." },
    { type:"mc", cat:"Fact", q:"What is Meishi Koukan?", options:["A type of food","Business card exchange — a ritual that signals how you will handle the relationship","A dance","A greeting bow"], answer:1, exp:"Meishi Koukan — receive with both hands, bow slightly, study it carefully. Never write on it." },
    { type:"mc", cat:"Phrase", q:"What does Ganbarimasu mean?", options:["I give up","I will do my best — a declaration of full effort before serious commitment","I'm tired","I'm hungry"], answer:1, exp:"Ganbarimasu — I will do my best. More serious than ganbatte. A real commitment." },
    { type:"mc", cat:"Phrase", q:"What does Shoubai mean?", options:["Sport","Commerce — carrying moral weight, good merchants create value for the community","Entertainment","Food"], answer:1, exp:"Shoubai — commerce with moral dimension. A good merchant makes the community better." },
    { type:"tf", cat:"Phrase", q:"Meishi should be handled carefully and respectfully in Japanese business.", answer:true, exp:"True — how you handle a business card shows how you will handle the relationship." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nびゃ", answer:"bya", answers:["bya"], exp:"びゃ = 'bya'. Voiced compound." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nびゅ", answer:"byu", answers:["byu"], exp:"びゅ = 'byu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nびょ", answer:"byo", answers:["byo"], exp:"びょ = 'byo'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぴゃ", answer:"pya", answers:["pya"], exp:"ぴゃ = 'pya'. P-row compound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nビョ", answer:"byo", answers:["byo"], exp:"ビョ = 'byo' — voiced compound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nピャ", answer:"pya", answers:["pya"], exp:"ピャ = 'pya' — P-row compound." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'byo'\n🎌 Japanese keyboard", answer:"びょ", answers:["びょ"], exp:"びょ = 'byo'." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'pya'\n🎌 Japanese keyboard", answer:"ぴゃ", answers:["ぴゃ"], exp:"ぴゃ = 'pya'." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nえいぎょう", answer:"eigyou", answers:["eigyou","eigyo"], exp:"Eigyo — business / sales." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nがんばります", answer:"i will do my best", answers:["i will do my best","ill do my best","ganbarimasu"], exp:"Ganbarimasu — declaration of full effort." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"えいぎょう", en:"Sales / trust-building business" },
      { jp:"けいれつ", en:"Linked company network" },
      { jp:"めいしこうかん", en:"Business card exchange ritual" },
      { jp:"しょうばい", en:"Commerce with moral dimension" },
    ], exp:"Day 21 business Japanese concepts." },
    { type:"wordorder", cat:"Phrase", q:"Arrange: 'I will do my best'\n⚠️ Not all words belong", words:["ganbarimasu","ganbatte","arigatou","hai"], answer:["ganbarimasu"], exp:"Ganbarimasu — declaration of full effort." },
    { type:"complete", cat:"Vocab", q:"Complete — type the FULL WORD:\nがんばり_____。(I will do my best)", answer:"ます", answers:["ます","masu"], exp:"がんばります — the polite declaration of full effort." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"がんばります", words:["がんばり","ます","です","ました","した"], answer:["がんばり","ます"], exp:"がんばります — I will do my best." },
    { type:"mc", cat:"Vocab", q:"What does えいぎょう mean in Japanese business?", options:["Marketing","Sales through trust-building relationships","Finance","Manufacturing"], answer:1, exp:"Eigyo — Japanese sales is about long-term relationships, never aggressive." },
    { type:"mc", cat:"Vocab", q:"What is a けいれつ?", options:["A type of food","A network of companies in mutual loyalty","A festival","A government office"], answer:1, exp:"Keiretsu — Toyota, Honda, Sony all operate in these networks." },
    { type:"tf", cat:"Fact", q:"Writing on a business card in Japan is acceptable.", answer:false, exp:"False — writing on a meishi is deeply disrespectful." },
    { type:"mc", cat:"Context", q:"You receive a business card in Japan. What should you do?", options:["Put it in your pocket immediately","Write notes on it","Receive with both hands, bow, study it carefully","Hand it back"], answer:2, exp:"Meishi Koukan — how you handle the card shows how you will handle the relationship." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Sales / business operations'", answer:"eigyo", answers:["eigyo"], exp:"Eigyo (営業) — business, specifically sales and client-facing operations. A core role in Japanese companies." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Network of interconnected businesses that support each other'", answer:"keiretsu", answers:["keiretsu"], exp:"Keiretsu (系列) — a web of companies with cross-shareholding and mutual support. Toyota, Sony, and Mitsubishi all have keiretsu networks." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'I will do my best' (formal commitment)", answer:"ganbarimasu", answers:["ganbarimasu"], exp:"Ganbarimasu (頑張ります) — the formal present/future form of ganbaru. A promise to persist and give full effort." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Business card exchange ritual'", answer:"meishi koukan", answers:["meishi koukan","meishikoukan"], exp:"Meishi koukan (名刺交換) — the formal business card exchange. Both hands, slight bow, read the card carefully." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'I will do my best'", words:["watashi","wa","ganbarimasu","ga"], answer:["watashi","wa","ganbarimasu"], exp:"Watashi wa ganbarimasu — I will do my best. A sincere commitment, not just encouragement." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nAt a first business meeting in Japan, always begin with ___", answer:"meishi koukan", answers:["meishi koukan","meishikoukan"], exp:"Meishi koukan is the first ritual of any Japanese business relationship. The card represents the person — treat it with respect." },
  ],

  // ─────────────────────────────────────────
  // DAY 22 — Week 5: Omotenashi in business, Chotto
  // ─────────────────────────────────────────
  22: [
    { type:"mc", cat:"Fact", q:"What does Chotto mean when used as a polite decline?", options:["Yes please","A little — also a soft polite way to say no or hesitate","Goodbye","Thank you"], answer:1, exp:"Chotto... with a pause is how Japanese people politely decline. The silence says no." },
    { type:"mc", cat:"Fact", q:"What is Hatsumode?", options:["A type of food","The first shrine or temple visit of the New Year — over 100 million Japanese participate","A festival dance","A greeting"], answer:1, exp:"Hatsumode — one of Japan's most important traditions. Over 100 million visits in January alone." },
    { type:"tf", cat:"Fact", q:"Okinawa has its own distinct culture separate from mainland Japan.", answer:true, exp:"True — distinct music, dialect, cuisine, and history as the Ryukyu Kingdom until 1879." },
    { type:"tf", cat:"Fact", q:"Japanese people always give a direct yes or no in business meetings.", answer:false, exp:"False — Tatemae means the public position may differ from Honne (true feelings). Read the context." },
    { type:"mc", cat:"Fact", q:"What does Otsukaresama deshita mean?", options:["Good morning","Thank you for your hard work — said at end of day or after completing a task","Goodbye","I'm home"], answer:1, exp:"Otsukaresama deshita — you will hear this constantly in Japanese workplaces." },
    { type:"mc", cat:"Phrase", q:"What does Ikaga desu ka mean?", options:["What is your name","How about it? / How are you? — polite way to offer or inquire","Where are you going","What time is it"], answer:1, exp:"Ikaga desu ka — polite inquiry. More formal than genki desu ka." },
    { type:"mc", cat:"Phrase", q:"What does Kamaimasen mean?", options:["I'm hungry","I don't mind / it's fine — polite way to say something is no problem","Goodbye","Thank you"], answer:1, exp:"Kamaimasen — I don't mind. Polite way to say no problem when someone apologizes." },
    { type:"tf", cat:"Phrase", q:"Chotto can only mean 'a little' in Japanese.", answer:false, exp:"False — Chotto also functions as a polite soft no, a request for a moment, or an expression of hesitation." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぴゅ", answer:"pyu", answers:["pyu"], exp:"ぴゅ = 'pyu'." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぴょ", answer:"pyo", answers:["pyo"], exp:"ぴょ = 'pyo'." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nファ", answer:"fa", answers:["fa"], exp:"ファ = 'fa' — foreign sound. Appears in ファン (fan)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nフィ", answer:"fi", answers:["fi"], exp:"フィ = 'fi' — foreign sound. Appears in フィリピン (Philippines)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nフェ", answer:"fe", answers:["fe"], exp:"フェ = 'fe' — foreign sound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nフォ", answer:"fo", answers:["fo"], exp:"フォ = 'fo' — foreign sound. Appears in フォーク (fork)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nウィ", answer:"wi", answers:["wi"], exp:"ウィ = 'wi' — foreign sound." },
    { type:"soundToChar", cat:"Katakana", q:"Type the KATAKANA for 'fa'\n🎌 Japanese keyboard", answer:"ファ", answers:["ファ"], exp:"ファ = 'fa'. Used for foreign words with F sounds." },
    { type:"soundToChar", cat:"Katakana", q:"Type the KATAKANA for 'fo'\n🎌 Japanese keyboard", answer:"フォ", answers:["フォ"], exp:"フォ = 'fo'. Used in foreign loanwords." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nはつもうで", answer:"hatsumode", answers:["hatsumode","hatsumōde"], exp:"Hatsumode — first shrine visit of the new year." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nおつかれさまでした", answer:"thank you for your hard work", answers:["thank you for your hard work","good work","otsukaresama deshita"], exp:"Otsukaresama deshita — said constantly in Japanese workplaces." },
    { type:"matching", cat:"Vocab", q:"Match each phrase to its meaning", pairs:[
      { jp:"ちょっと", en:"A little / soft polite no" },
      { jp:"はつもうで", en:"First shrine visit of new year" },
      { jp:"いかがですか", en:"How about it? (polite)" },
      { jp:"かまいません", en:"I don't mind / no problem" },
    ], exp:"Day 22 key phrases." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'a little' (soft no)\n🎌 Japanese keyboard", answer:"ちょっと", answers:["ちょっと"], exp:"Chotto (ちょっと) — a little, also a polite soft decline." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'A little — also used as a polite soft refusal'", answer:"chotto", answers:["chotto"], exp:"Chotto (ちょっと) — a little. When used alone with hesitation, it is a polite way to say no without saying no." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Thank you for your hard work' (completed task/day)", answer:"otsukaresama deshita", answers:["otsukaresama deshita"], exp:"Otsukaresama deshita (お疲れ様でした) — past tense. Said at the end of the day or after a completed effort." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'I do not mind / please go right ahead'", answer:"kamaimasen", answers:["kamaimasen"], exp:"Kamaimasen (構いません) — I do not mind. A polite way to give permission or say you have no objection." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'First shrine visit of the New Year'", answer:"hatsumode", answers:["hatsumode"], exp:"Hatsumode (初詣) — the first visit to a shrine or temple in the New Year. One of the most widely observed Japanese traditions." },
    { type:"wordorder", cat:"Phrase", q:"Arrange 'Thank you for your hard work (past)'", words:["otsukaresama","deshita","wo","ga"], answer:["otsukaresama","deshita"], exp:"Otsukaresama deshita — thank you for your effort (completed). Said to acknowledge someone who has finished a task or shift." },
    { type:"fill", cat:"Usage", q:"Fill in the blank — type ROMAJI:\nWhen a colleague finishes a big project, you say: ___", answer:"otsukaresama deshita", answers:["otsukaresama deshita"], exp:"Otsukaresama deshita — thank you for your hard work. The essential acknowledgment when someone completes an effort." },
    { type:"mc", cat:"Usage", q:"Your colleague invites you to dinner but you are too tired. You say Chotto... and trail off. What are you communicating?", options:["I am very excited","I will definitely come","I cannot make it (polite refusal)","I am hungry"], answer:2, exp:"Chotto... used with hesitation is a classic soft refusal in Japanese. It avoids direct rejection to preserve harmony." },
  ],

  // ─────────────────────────────────────────
  // DAY 23 — Week 5: Kokoro, Kokorozashi, Zazen
  // ─────────────────────────────────────────
  23: [
    { type:"mc", cat:"Fact", q:"What does Kokoro mean?", options:["Money","Heart / mind / soul simultaneously — Japanese does not separate intellect and emotion","Body","Strength"], answer:1, exp:"Kokoro — one of the most important words in Japanese. Heart, mind, and soul are the same thing." },
    { type:"mc", cat:"Fact", q:"What does Kokorozashi mean?", options:["A type of food","A burning ambition or life mission — a sense of duty to contribute something meaningful","A sport","A greeting"], answer:1, exp:"Kokorozashi — beyond career goals. A calling to make the world better through your work." },
    { type:"tf", cat:"Fact", q:"NASA uses origami principles to fold solar panels for space deployment.", answer:true, exp:"True — the Japanese art of paper folding has applications from art to aerospace engineering." },
    { type:"tf", cat:"Fact", q:"Japan's mobile payment adoption has been slow to change from cash.", answer:true, exp:"True — Japan was one of the most cash-dependent economies but is now rapidly transitioning." },
    { type:"mc", cat:"Fact", q:"What is Zazen?", options:["A type of food","Seated Zen meditation — sitting with discomfort until the mind stills","A dance","A sport"], answer:1, exp:"Zazen — the foundation of Zen practice. Sitting still with whatever arises until mind quiets." },
    { type:"mc", cat:"Phrase", q:"What does Yoroshikereba mean?", options:["Goodbye","If it's alright with you — extremely polite way to make a suggestion","Thank you","Good morning"], answer:1, exp:"Yoroshikereba — used before making a request in the most polite possible way." },
    { type:"mc", cat:"Phrase", q:"What does Katachi mean in Japanese art and design?", options:["Color","Form or shape — carries as much meaning as function","Size","Material"], answer:1, exp:"Katachi — form. In Japanese design, the shape of something IS its meaning." },
    { type:"tf", cat:"Phrase", q:"In Japanese culture, Kokoro separates intellectual and emotional thinking.", answer:false, exp:"False — Kokoro unifies them. Heart, mind, and soul are not separate concepts in Japanese." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nウェ", answer:"we", answers:["we"], exp:"ウェ = 'we' — foreign sound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nウォ", answer:"wo", answers:["wo"], exp:"ウォ = 'wo' — foreign sound. Appears in ウォーター (water)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nヴァ", answer:"va", answers:["va"], exp:"ヴァ = 'va' — foreign sound for V." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nヴィ", answer:"vi", answers:["vi"], exp:"ヴィ = 'vi' — foreign V sound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nヴェ", answer:"ve", answers:["ve"], exp:"ヴェ = 've' — foreign V sound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nヴォ", answer:"vo", answers:["vo"], exp:"ヴォ = 'vo' — foreign V sound." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nティ", answer:"ti", answers:["ti"], exp:"ティ = 'ti' — foreign sound. Appears in パーティー (party)." },
    { type:"soundToChar", cat:"Katakana", q:"Type the KATAKANA for 'va'\n🎌 Japanese keyboard", answer:"ヴァ", answers:["ヴァ"], exp:"ヴァ = 'va'. Katakana V sound." },
    { type:"soundToChar", cat:"Katakana", q:"Type the KATAKANA for 'ti'\n🎌 Japanese keyboard", answer:"ティ", answers:["ティ"], exp:"ティ = 'ti'. Used in foreign loanwords." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nこころ", answer:"kokoro", answers:["kokoro"], exp:"Kokoro — heart / mind / soul." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nこころざし", answer:"life mission", answers:["life mission","burning ambition","kokorozashi","sense of purpose"], exp:"Kokorozashi — a burning mission to contribute something meaningful." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"こころ", en:"Heart / mind / soul" },
      { jp:"こころざし", en:"Life mission / burning purpose" },
      { jp:"ざぜん", en:"Seated Zen meditation" },
      { jp:"かたち", en:"Form or shape" },
    ], exp:"Day 23 key concepts." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'heart / mind / soul'\n🎌 Japanese keyboard", answer:"こころ", answers:["こころ"], exp:"Kokoro (こころ) — heart, mind, soul unified." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Heart, mind, and soul — the inner self unified'", answer:"kokoro", answers:["kokoro"], exp:"Kokoro (心) — encompasses heart, mind, and spirit together. There is no single English equivalent." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Burning ambition / noble aspiration that drives you'", answer:"kokorozashi", answers:["kokorozashi"], exp:"Kokorozashi (志) — a deeply felt ambition or calling. More than a goal — it is a life mission." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Seated Zen meditation'", answer:"zazen", answers:["zazen"], exp:"Zazen (座禅) — seated meditation at the heart of Zen practice. Still body, still mind, present awareness." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'If it is alright with you' (polite offer or suggestion)", answer:"yoroshikereba", answers:["yoroshikereba"], exp:"Yoroshikereba (よろしければ) — a beautifully polite phrase for offering help or making a suggestion without imposing." },
    { type:"wordorder", cat:"Phrase", q:"Arrange to say 'I practice zazen'", words:["zazen","wo","suru","ni","de"], answer:["zazen","wo","suru"], exp:"Zazen wo suru — I do/practice zazen. を marks zazen as the object of the action suru (do)." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\n___ is the unified concept of heart, mind, and soul in Japanese", answer:"kokoro", answers:["kokoro"], exp:"Kokoro — the Japanese concept that does not separate the emotional, intellectual, and spiritual self." },
    { type:"mc", cat:"Usage", q:"You want to offer your seat on the train to an elderly person without making them feel obligated. Which phrase do you use to make it feel optional?", options:["Gaman","Yoroshikereba","Zazen","Kokorozashi"], answer:1, exp:"Yoroshikereba — if it is alright with you. It frames your offer as entirely optional, showing true consideration." },
  ],

  // ─────────────────────────────────────────
  // DAY 24 — Week 5: Teinei, Kando, Bushido Do
  // ─────────────────────────────────────────
  24: [
    { type:"mc", cat:"Fact", q:"What does Teinei mean?", options:["Rude","Polite, careful, and thorough — one of the highest compliments in Japanese","Lazy","Loud"], answer:1, exp:"Teinei — if someone calls your work teinei, that is one of the best things they can say." },
    { type:"mc", cat:"Fact", q:"What does Kando mean?", options:["Boredom","Being deeply moved — the emotional resonance from witnessing true excellence","Indifference","Hunger"], answer:1, exp:"Kando — that feeling when you witness something so good it moves you. Japan designs for kando." },
    { type:"tf", cat:"Fact", q:"Spirited Away was the first non-English film to win the Academy Award for Best Animated Feature.", answer:true, exp:"True — Studio Ghibli's Spirited Away made history in 2003." },
    { type:"tf", cat:"Fact", q:"In Japan a ramen chef with 30 years experience is less respected than a surgeon.", answer:false, exp:"False — in Japan, a master of one craft earns the same deep respect regardless of the field." },
    { type:"mc", cat:"Fact", q:"What does Do (道) mean in Japanese martial arts?", options:["Fighting","The way — a path of self-cultivation through disciplined practice","Speed","Strength"], answer:1, exp:"Do — the way. Judo, Kendo, Bushido all use Do to signify a lifelong path of self-development." },
    { type:"mc", cat:"Phrase", q:"What does Makoto mean?", options:["Food","Sincerity, honesty, integrity — a core Bushido virtue","Speed","Wealth"], answer:1, exp:"Makoto — sincerity and integrity. One of the seven Bushido virtues." },
    { type:"mc", cat:"Phrase", q:"What does Shitsurei desu ga mean?", options:["Thank you","Excuse me but — polite way to interrupt or raise a potentially uncomfortable topic","Goodbye","Good morning"], answer:1, exp:"Shitsurei desu ga — used before bringing up something sensitive. Acknowledges the intrusion." },
    { type:"tf", cat:"Phrase", q:"Kando can be manufactured through clever marketing.", answer:false, exp:"False — Kando is genuine deep emotional resonance. Japanese consumers can tell the difference immediately." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nディ", answer:"di", answers:["di"], exp:"ディ = 'di' — foreign sound. Appears in ディズニー (Disney)." },
    { type:"charSound", cat:"Katakana", q:"Type the ROMAJI sound:\nトゥ", answer:"tu", answers:["tu"], exp:"トゥ = 'tu' — foreign sound." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぎゃ", answer:"gya", answers:["gya"], exp:"ぎゃ = 'gya'. Voiced K compound." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nじゃ", answer:"ja", answers:["ja"], exp:"じゃ = 'ja'. Voiced S compound." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nびゃ", answer:"bya", answers:["bya"], exp:"びゃ = 'bya'. Voiced H compound." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nぴゃ", answer:"pya", answers:["pya"], exp:"ぴゃ = 'pya'. P compound." },
    { type:"charSound", cat:"Hiragana", q:"Type the ROMAJI sound:\nりゃ", answer:"rya", answers:["rya"], exp:"りゃ = 'rya'. R compound." },
    { type:"soundToChar", cat:"Katakana", q:"Type the KATAKANA for 'di'\n🎌 Japanese keyboard", answer:"ディ", answers:["ディ"], exp:"ディ = 'di'. Used in foreign loanwords." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'rya'\n🎌 Japanese keyboard", answer:"りゃ", answers:["りゃ"], exp:"りゃ = 'rya'. R compound." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nていねい", answer:"teinei", answers:["teinei"], exp:"Teinei — polite, careful, thorough." },
    { type:"translateJPEN", cat:"Phrase", q:"Translate to ENGLISH:\nかんどう", answer:"being deeply moved", answers:["being deeply moved","deep emotion","kando","moved by excellence"], exp:"Kando — the deep emotional resonance of witnessing true excellence." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"ていねい", en:"Polite, careful, thorough" },
      { jp:"かんどう", en:"Deeply moved by excellence" },
      { jp:"どう", en:"The way / path of cultivation" },
      { jp:"まこと", en:"Sincerity and integrity" },
        { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Polite, careful, and thorough in manner'", answer:"teinei", answers:["teinei"], exp:"Teinei (丁寧) — polite, careful, thorough. Both a social manner and an approach to work." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Being deeply moved or emotionally touched'", answer:"kando", answers:["kando"], exp:"Kando (感動) — deep emotional resonance. The feeling when art, music, or a moment moves you profoundly." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'The Way — path of mastery in disciplines like judo or kendo'", answer:"do", answers:["do"], exp:"Do (道) — the way. Appears in judo, kendo, sado (tea ceremony), and ikebana — any discipline with a path of mastery." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Sincerity and absolute integrity'", answer:"makoto", answers:["makoto"], exp:"Makoto (誠) — complete sincerity and truth. One of the highest virtues in Japanese culture and bushido." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Excuse me but...' (polite way to interrupt or ask a favor)", answer:"shitsurei desu ga", answers:["shitsurei desu ga"], exp:"Shitsurei desu ga (失礼ですが) — excuse me but... A polite prefix before asking something of a stranger." },
    { type:"wordorder", cat:"Phrase", q:"Arrange the polite interruption phrase 'Excuse me but...'", words:["shitsurei","desu","ga","wo","wa"], answer:["shitsurei","desu","ga"], exp:"Shitsurei desu ga — excuse me but... Used before asking directions, requesting help, or getting someone's attention." },
    { type:"mc", cat:"Usage", q:"You need to ask a stranger for directions. Which phrase do you open with to be most appropriately polite?", options:["Irasshaimase","Otsukaresama desu","Shitsurei desu ga","Kamaimasen"], answer:2, exp:"Shitsurei desu ga — excuse me but... The perfect polite opener when approaching a stranger for help." },
], exp:"Day 24 key concepts." },
  ],

  // ─────────────────────────────────────────
  // DAY 25 — Week 5: Monozukuri, Business wrap-up
  // ─────────────────────────────────────────
  25: [
    { type:"mc", cat:"Fact", q:"What does Monozukuri mean?", options:["Eating","The art of making things — elevating manufacturing to cultural expression","Traveling","Resting"], answer:1, exp:"Monozukuri — making something well is an act of love in Japan. Manufacturing as cultural art." },
    { type:"mc", cat:"Fact", q:"What does Jibun mean?", options:["Others","Oneself — understanding your own identity is the foundation of all success","Money","Food"], answer:1, exp:"Jibun — oneself. Know yourself first. Your Ikigai comes from deep self-understanding." },
    { type:"tf", cat:"Fact", q:"Japan's window film industry is estimated at over $500 million annually.", answer:true, exp:"True — combining automotive, architectural, and safety film across one of the world's most quality-conscious markets." },
    { type:"tf", cat:"Fact", q:"Japan's franchise system is underdeveloped compared to the US.", answer:false, exp:"False — Japan's franchise system is highly advanced with centralized supply chains and data analytics." },
    { type:"mc", cat:"Fact", q:"What does Kigyouka mean?", options:["Employee","Entrepreneur — entrepreneurship culture growing rapidly in modern Japan","Manager","Customer"], answer:1, exp:"Kigyouka — entrepreneur. Japan's startup culture is growing especially among younger generations." },
    { type:"mc", cat:"Phrase", q:"What does Gokurousama desu mean?", options:["Good morning","Thank you for your efforts — said to someone who has worked hard specifically for you","Goodbye","I'm home"], answer:1, exp:"Gokurousama desu — more personal than Otsukaresama. Said specifically when someone did work FOR you." },
    { type:"mc", cat:"Phrase", q:"What does Suenagaku yoroshiku mean?", options:["Goodbye","I look forward to a long relationship — said when starting a long-term business partnership","Thank you","Good morning"], answer:1, exp:"Suenagaku yoroshiku — the perfect phrase when establishing a long-term business relationship in Japan." },
    { type:"tf", cat:"Phrase", q:"Monozukuri applies only to physical manufacturing, not service businesses.", answer:false, exp:"False — Monozukuri spirit applies to any craft or service. A Shokunin window tinter embodies Monozukuri." },
    { type:"mc", cat:"Context", q:"You're starting a long-term business partnership in Japan. What do you say?", options:["どうぞよろしく","すえながくよろしく","おつかれさまでした","いらっしゃいませ"], answer:1, exp:"Suenagaku yoroshiku — specifically for long-term relationship beginnings." },
    { type:"mc", cat:"Context", q:"A Japanese colleague just finished a big project for your company. What do you say?", options:["いただきます","ごくろうさまです","かんぱい","おはようございます"], answer:1, exp:"Gokurousama desu — thank you for your efforts on my behalf." },
    { type:"mc", cat:"Context", q:"You enter a shop in Japan. What do you hear?", options:["ただいま","いらっしゃいませ","おかえり","いってきます"], answer:1, exp:"Irasshaimase — welcome to our establishment. Every single shop, every single time." },
    { type:"mc", cat:"Context", q:"Someone did you a big favor in Japan. Beyond arigatou, what shows deep gratitude?", options:["どうも","ありがとうございます","おそれいります","すみません"], answer:2, exp:"Osore irimasu — I am humbled. The deepest expression of gratitude in formal Japanese." },
    { type:"charSound", cat:"Hiragana", q:"Review — Type the ROMAJI sound:\nきょ", answer:"kyo", answers:["kyo"], exp:"きょ = 'kyo'. Appears in とうきょう (Tokyo)." },
    { type:"charSound", cat:"Hiragana", q:"Review — Type the ROMAJI sound:\nしゃ", answer:"sha", answers:["sha"], exp:"しゃ = 'sha'." },
    { type:"charSound", cat:"Hiragana", q:"Review — Type the ROMAJI sound:\nちょ", answer:"cho", answers:["cho"], exp:"ちょ = 'cho'. Appears in ちょっと (a little)." },
    { type:"charSound", cat:"Hiragana", q:"Review — Type the ROMAJI sound:\nにゅ", answer:"nyu", answers:["nyu"], exp:"にゅ = 'nyu'." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'kyo'\n🎌 Japanese keyboard", answer:"きょ", answers:["きょ"], exp:"きょ = 'kyo'. In とうきょう = Tokyo." },
    { type:"soundToChar", cat:"Hiragana", q:"Type the HIRAGANA for 'cho'\n🎌 Japanese keyboard", answer:"ちょ", answers:["ちょ"], exp:"ちょ = 'cho'. In ちょっと = a little." },
    { type:"spell", cat:"Phrase", q:"Type the ROMAJI spelling:\nものづくり", answer:"monozukuri", answers:["monozukuri"], exp:"Monozukuri — the art of making things." },
    { type:"matching", cat:"Vocab", q:"Match each concept to its meaning", pairs:[
      { jp:"ものづくり", en:"Art of making things" },
      { jp:"きぎょうか", en:"Entrepreneur" },
      { jp:"じぶん", en:"Oneself" },
      { jp:"すえながくよろしく", en:"Long-term relationship blessing" },
    ], exp:"Day 25 — Week 5 complete! Business Japanese foundation built." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'oneself'\n🎌 Japanese keyboard", answer:"じぶん", answers:["じぶん"], exp:"Jibun (じぶん) — oneself." },
    { type:"typeJP", cat:"Vocab", q:"Type the Japanese for 'entrepreneur'\n🎌 Japanese keyboard", answer:"きぎょうか", answers:["きぎょうか"], exp:"Kigyouka (きぎょうか) — entrepreneur." },
    { type:"listen", cat:"Listening", q:"Listen and arrange the words you hear", audio:"すえながくよろしく", words:["すえながく","よろしく","おねがい","ください"], answer:["すえながく","よろしく"], exp:"すえながくよろしく — I look forward to a long relationship." },
    { type:"mc", cat:"Vocab", q:"Which concept elevates manufacturing to cultural expression?", options:["えいぎょう","ものづくり","けいれつ","しょうばい"], answer:1, exp:"Monozukuri — making something well is an act of love in Japan." },
    { type:"mc", cat:"Vocab", q:"What does こころ mean?", options:["Body","Heart, mind, and soul simultaneously","Money","Food"], answer:1, exp:"Kokoro — Japanese doesn't separate intellect from emotion." },
    { type:"tf", cat:"Fact", q:"きぎょうか means \"employee\".", answer:false, exp:"False — Kigyouka means entrepreneur." },
    { type:"mc", cat:"Context", q:"You are starting a long-term business partnership in Japan. What do you say?", options:["さようなら","すえながくよろしく","いただきます","がんばって"], answer:1, exp:"Suenagaku yoroshiku — I look forward to a long relationship." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'The art of making things — deep craft and manufacturing culture'", answer:"monozukuri", answers:["monozukuri"], exp:"Monozukuri (物作り) — the spirit of making things. Japan's culture of craftsmanship, quality, and pride in manufacturing." },
    { type:"translateENJP", cat:"Concept", q:"Translate to ROMAJI:\n'Oneself — your own self or identity'", answer:"jibun", answers:["jibun"], exp:"Jibun (自分) — oneself. Used in reflection, self-improvement, and expressions like jibun rashiku (true to yourself)." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'Thank you for your great efforts' (formal acknowledgment)", answer:"gokurousama desu", answers:["gokurousama desu"], exp:"Gokurousama desu (ご苦労様です) — formal recognition of someone's hard effort. More formal than otsukaresama." },
    { type:"translateENJP", cat:"Phrase", q:"Translate to ROMAJI:\n'I look forward to a long relationship'", answer:"suenagaku yoroshiku", answers:["suenagaku yoroshiku"], exp:"Suenagaku yoroshiku (末永くよろしく) — a warm closing phrase expressing hope for a lasting relationship." },
    { type:"wordorder", cat:"Phrase", q:"Arrange the closing phrase 'I look forward to a long relationship'", words:["suenagaku","yoroshiku","wo","ga","wa"], answer:["suenagaku","yoroshiku"], exp:"Suenagaku yoroshiku — a gracious close to a relationship or conversation. Used at business and personal farewells." },
    { type:"fill", cat:"Concept", q:"Fill in the blank — type ROMAJI:\nJapan's culture of deep pride in craftsmanship is called ___", answer:"monozukuri", answers:["monozukuri"], exp:"Monozukuri — the spirit of making. It drives Japan's reputation for quality in everything from sushi to semiconductors." },
    { type:"mc", cat:"Usage", q:"You are ending a long-term partnership with a Japanese company. Which phrase closes the relationship most warmly?", options:["Irasshaimase","Giri","Suenagaku yoroshiku","Shitsurei desu ga"], answer:2, exp:"Suenagaku yoroshiku — I look forward to a long relationship. A warm, sincere close that honors the connection." },
  ],

};



// Extra questions that test across all weeks — merged into the flat pool by buildTest
// These live outside the day keys so they only appear in tests, not daily quizzes
const BONUS_QUESTIONS = [
  { type:"mc",cat:"Fact",q:"What does Ikigai mean?",options:["Empty orchestra","Your reason for living","Dying from overwork","Beauty in imperfection"],answer:1,exp:"Ikigai — your reason for living. Where passion, skill, purpose, and livelihood meet."},
  { type:"mc",cat:"Fact",q:"What does Karaoke literally mean?",options:["Singing together","Empty orchestra","Night music","Happy voice"],answer:1,exp:"Kara = empty, oke = orchestra."},
  { type:"mc",cat:"Vocab",q:"What does かっこいい mean?",options:["Delicious","Beautiful","Cool / stylish","Interesting"],answer:2,exp:"Kakkoii — cool, stylish, good-looking."},
  { type:"mc",cat:"Vocab",q:"What does えき mean?",options:["Airport","Hotel","Train station","Convenience store"],answer:2,exp:"Eki — train station."},
  { type:"mc",cat:"Katakana",q:"What does ピザ mean?",options:["Pasta","Sushi","Pizza","Salad"],answer:2,exp:"Piza (ピザ) = pizza."},
  { type:"mc",cat:"Katakana",q:"What does ホテル mean?",options:["Hospital","Hotel","Home","Harbor"],answer:1,exp:"Hoteru (ホテル) = hotel."},
  { type:"mc",cat:"Katakana",q:"What does テレビ mean?",options:["Telephone","Temple","TV","Taxi"],answer:2,exp:"Terebi (テレビ) = TV."},
  { type:"mc",cat:"Grammar",q:"Which particle marks the TOPIC of a sentence?",options:["を","に","は","が"],answer:2,exp:"は (wa) is the topic marker particle."},
  { type:"mc",cat:"Grammar",q:"Which particle marks the DIRECT OBJECT?",options:["は","が","の","を"],answer:3,exp:"を (wo) marks the direct object."},
  { type:"mc",cat:"Grammar",q:"Which particle shows POSSESSION?",options:["に","の","を","で"],answer:1,exp:"の (no) is the possessive particle."},
  { type:"tf",cat:"Fact",q:"In Japan tipping your server is polite.",answer:false,exp:"False — tipping is rude in Japan."},
  { type:"tf",cat:"Fact",q:"Japan has a jury system.",answer:false,exp:"False — professional judges decide all cases."},
  { type:"tf",cat:"Katakana",q:"Katakana is used to write foreign borrowed words.",answer:true,exp:"True — pizza, hotel, ramen all use katakana."},
  { type:"tf",cat:"Grammar",q:"は (wa) marks the topic of a sentence.",answer:true,exp:"True — わたしはがくせいです = I (topic) am a student."},
  { type:"fill",cat:"Phrase",q:"Fill in the blank — type ROMAJI:\nSaid before eating → ___________",answer:"itadakimasu",answers:["itadakimasu"],exp:"Itadakimasu — I humbly receive."},
  { type:"fill",cat:"Phrase",q:"Fill in the blank — type ROMAJI:\nCheers! → ___________",answer:"kanpai",answers:["kanpai"],exp:"Kanpai — cheers!"},
  { type:"fill",cat:"Fact",q:"Fill in the blank — type ROMAJI:\nYour reason for living → ___________",answer:"ikigai",answers:["ikigai"],exp:"Ikigai — where passion, skill, purpose, and livelihood meet."},
  { type:"fill",cat:"Vocab",q:"Fill in the blank — type ROMAJI:\nJapanese for train station → ___________",answer:"eki",answers:["eki"],exp:"Eki — train station."},
  { type:"charSound",cat:"Katakana",q:"Type the ROMAJI sound:\nラ",answer:"ra",answers:["ra"],exp:"ラ = 'ra' — appears in ラーメン."},
  { type:"complete",cat:"Grammar",q:"Complete — type the correct particle:\nわたし ___ がくせいです。('I am a student.')",answer:"は",answers:["は","wa"],exp:"は (wa) marks the topic of the sentence."},
  { type:"complete",cat:"Grammar",q:"Complete — type the correct particle:\nえいが ___ みます。('I watch a movie.')",answer:"を",answers:["を","wo","o"],exp:"を (wo) marks the direct object."},
  { type:"complete",cat:"Grammar",q:"Complete — type the correct particle:\nとうきょう ___ すんでいます。('I live in Tokyo.')",answer:"に",answers:["に","ni"],exp:"に (ni) marks location with verbs like 'live'."},
  { type:"mc",cat:"Context",q:"You're about to eat a meal with Japanese hosts. What do you say?",options:["かんぱい","がんばって","いただきます","おかえり"],answer:2,exp:"Itadakimasu — said before every meal. A shared ritual of gratitude."},
  { type:"mc",cat:"Context",q:"You want to know the price of something in Japan. What do you ask?",options:["なんじですか","どこですか","いくらですか","おなまえは"],answer:2,exp:"Ikura desu ka — How much does it cost?"},
  { type:"mc",cat:"Odd One Out",q:"Which word does NOT belong?\n(No hints — use what you know 🎌)",options:["ごはん","みず","おちゃ","えき"],answer:3,exp:"えき = train station. The others are food/drink."},
  { type:"mc",cat:"Odd One Out",q:"Which does NOT belong?\n(No hints 🎌)",options:["せんせい","がくせい","いしゃ","くうこう"],answer:3,exp:"くうこう = airport. The others are professions."},
  // Matching Pairs — cross-week bonus
  { type: "matching", cat: "Vocab", q: "Match each concept to its meaning", pairs: [
    { jp: "改善", en: "Continuous improvement" },
    { jp: "侘び寂び", en: "Beauty in imperfection" },
    { jp: "生き甲斐", en: "Reason for living" },
    { jp: "間", en: "Meaningful pause / negative space" },
  ], exp: "Kaizen, Wabi-Sabi, Ikigai, Ma — the four cornerstone Japanese concepts." },
  { type: "matching", cat: "Hiragana", q: "Match each hiragana to its romaji sound", pairs: [
    { jp: "あ", en: "a" },
    { jp: "か", en: "ka" },
    { jp: "さ", en: "sa" },
    { jp: "な", en: "na" },
  ], exp: "The first character of each row: A-row, K-row, S-row, N-row." },
  { type: "matching", cat: "Phrase", q: "Match each phrase to its English meaning", pairs: [
    { jp: "いただきます", en: "I humbly receive (before eating)" },
    { jp: "ただいま", en: "I'm home" },
    { jp: "すみません", en: "Excuse me / Sorry" },
    { jp: "がんばって", en: "Do your best!" },
  ], exp: "Four essential daily phrases every Japanese speaker uses." },
];

// ═══════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeLower(str) {
  return str.trim().toLowerCase()
    .replace(/[?？。、！!.,]/g, "") // strip punctuation
    .replace(/\s+/g, " ")
    .trim();
}

function checkTyped(input, answers, cs = false) {
  const n = cs ? input.trim() : normalizeLower(input);
  return answers.some(a => (cs ? a.trim() : normalizeLower(a)) === n);
}

function buildDailyQuiz(dayNum) {
  const today = QUESTION_BANK[dayNum] || [];
  const prior = Object.entries(QUESTION_BANK)
    .filter(([d]) => parseInt(d) < dayNum)
    .flatMap(([, qs]) => qs);
  // Deduplicate by question text before sampling
  const dedup = (arr) => {
    const seen = new Set();
    return arr.filter(q => { if(seen.has(q.q)) return false; seen.add(q.q); return true; });
  };
  const todayPick = shuffle(dedup(today)).slice(0, 20);
  const remaining = 30 - todayPick.length;
  const seenToday = new Set(todayPick.map(q => q.q));
  const priorPick = shuffle(dedup(prior).filter(q => !seenToday.has(q.q))).slice(0, remaining);
  return shuffle([...todayPick, ...priorPick]).slice(0, 30);
}

function buildTest(testNum = 1, count = 75) {
  // Flatten QUESTION_BANK (day-keyed) + BONUS_QUESTIONS into one pool
  const dayQ = Object.values(QUESTION_BANK).flat();
  const allQ = [...dayQ, ...BONUS_QUESTIONS];
  // Deduplicate by question text
  const seen = new Set();
  const unique = allQ.filter(q => {
    if (seen.has(q.q)) return false;
    seen.add(q.q);
    return true;
  });
  // Both tests draw fresh random samples from the full pool each time
  return shuffle(unique).slice(0, Math.min(count, unique.length));
}

// ═══════════════════════════════════════════
// STORAGE KEYS
// ═══════════════════════════════════════════
const STORAGE = {
  progress: "nihongo_progress",
  test1Save: "nihongo_test1_save",
  test2Save: "nihongo_test2_save",
};


// ═══════════════════════════════════════════
// XP & RANK SYSTEM
// ═══════════════════════════════════════════
const XP_PER_CORRECT = 10;
const XP_STREAK_BONUS = { 3: 10, 5: 20, 10: 40, 15: 60, 20: 80, 25: 100, 30: 120 };
const XP_QUIZ_PASS = 25;
const XP_TEST_PASS = 50;
const XP_PERFECT = 75;
const APP_VERSION = "v1.3.94";

const RANKS = [
  { min: 0,        name: "Minarai",  jp: "見習い",  kanji:"見",  color: "#9ca3af" },
  { min: 3001,     name: "Ashigaru", jp: "足軽",    kanji:"軽",  color: "#6366f1" },
  { min: 10001,    name: "Samurai",  jp: "侍",      kanji:"侍",  color: "#3b82f6" },
  { min: 30001,    name: "Hatamoto", jp: "旗本",    kanji:"旗",  color: "#10b981" },
  { min: 80001,    name: "Daimyo",   jp: "大名",    kanji:"大",  color: "#f59e0b" },
  { min: 175001,   name: "Shogun",   jp: "将軍",    kanji:"将",  color: "#f97316" },
  { min: 350001,   name: "Tenno",    jp: "天皇",    kanji:"天",  color: "#ef4444" },
  { min: 750001,   name: "Kami",     jp: "神",      kanji:"神",  color: "#ec4899" },
  { min: 1750001,  name: "Shinpi",   jp: "神秘",    kanji:"秘",  color: "#a855f7" },
];
const SUBLEVEL_NUMERALS = ["I","II","III","IV","V"];

function getRank(xp) {
  let rank = RANKS[0];
  for (const r of RANKS) { if (xp >= r.min) rank = r; }
  const idx = RANKS.indexOf(rank);
  const nextRank = idx < RANKS.length - 1 ? RANKS[idx + 1] : null;
  const rankSize = nextRank ? nextRank.min - rank.min : null;
  const sublevel = rankSize ? Math.min(5, Math.floor((xp - rank.min) / (rankSize / 5)) + 1) : 5;
  const subMin = rank.min + (sublevel - 1) * (rankSize ? rankSize / 5 : 0);
  const subMax = rank.min + sublevel * (rankSize ? rankSize / 5 : 1);
  const subProgress = rankSize ? (xp - subMin) / (subMax - subMin) : 1;
  const progress = nextRank ? (xp - rank.min) / rankSize : 1;
  return {
    ...rank, xp, nextRank, progress: Math.min(progress, 1),
    sublevel, sublevelName: SUBLEVEL_NUMERALS[sublevel-1],
    subProgress: Math.min(subProgress, 1),
    xpInSublevel: Math.floor(xp - subMin),
    xpForSublevel: Math.ceil(subMax - subMin),
    nextLabel: sublevel < 5 ? rank.name+" "+SUBLEVEL_NUMERALS[sublevel] : (nextRank ? nextRank.name+" I" : "MAX"),
  };
}

function calcXP(correct, total, bestStreak, passPercent) {
  let xp = correct * XP_PER_CORRECT;
  for (const [t, bonus] of Object.entries(XP_STREAK_BONUS)) {
    if (bestStreak >= parseInt(t)) xp += bonus;
  }
  const pct = Math.round((correct / total) * 100);
  if (pct >= passPercent) xp += passPercent >= 85 ? XP_TEST_PASS : XP_QUIZ_PASS;
  if (pct === 100) xp += XP_PERFECT;
  return xp;
}

function mergeCategoryStats(existing, results) {
  const stats = { ...existing };
  results.forEach(r => {
    if (!stats[r.cat]) stats[r.cat] = { ok: 0, total: 0 };
    stats[r.cat].total++;
    if (r.ok) stats[r.cat].ok++;
  });
  return stats;
}
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE.progress);
    return raw ? JSON.parse(raw) : { completedDays: [], dayScores: {}, totalXP: 0, categoryStats: {}, test1Score: null, test2Score: null };
  } catch { return { completedDays: [], dayScores: {}, totalXP: 0, categoryStats: {}, test1Score: null, test2Score: null }; }
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE.progress, JSON.stringify(data)); } catch { }
}

function loadTestSave(testNum) {
  try {
    const raw = localStorage.getItem(testNum === 1 ? STORAGE.test1Save : STORAGE.test2Save);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveTestState(testNum, questions, cur, score, results, bestStreak) {
  try {
    const key = testNum === 1 ? STORAGE.test1Save : STORAGE.test2Save;
    localStorage.setItem(key, JSON.stringify({ questions, cur, score, results, bestStreak, savedAt: new Date().toISOString() }));
  } catch { }
}

function clearTestSave(testNum) {
  try { localStorage.removeItem(testNum === 1 ? STORAGE.test1Save : STORAGE.test2Save); } catch { }
}

// ═══════════════════════════════════════════
// COLORS
// ═══════════════════════════════════════════
const CAT_COLORS = {
  Fact: "#3b82f6", Phrase: "#10b981", Vocab: "#ec4899",
  Hiragana: "#f59e0b", Katakana: "#a855f7", Grammar: "#84cc16",
  Reading: "#f43f5e", Listening: "#8b5cf6", Context: "#06b6d4",
  "Odd One Out": "#f97316",
};

const TYPE_LABELS = {
  mc: "Multiple Choice", tf: "True / False", fill: "Fill in the Blank",
  spell: "Spelling → Romaji", charSound: "Character → Sound",
  soundToChar: "Sound → Type Character", typeJP: "English → Japanese",
  translateJPEN: "Translate JP → English", translateENJP: "Translate EN → Romaji",
  wordorder: "Word Order", complete: "Complete the Sentence", listen: "Listen & Arrange",
  matching: "Matching Pairs",
};

// ═══════════════════════════════════════════
// #12 — SOUND EFFECTS
// ═══════════════════════════════════════════
function speakJP(text) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.8;
    speechSynthesis.speak(u);
  } catch(e) { /* Speech not supported */ }
}

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === "correct") {
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "wrong") {
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "streak") {
      // Special sound for streaks of 5+
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(550, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) { /* Audio not supported */ }
}

// ═══════════════════════════════════════════
// #13 — DYNAMIC FEEDBACK MESSAGES
// ═══════════════════════════════════════════
const CORRECT_MESSAGES = [
  "✓ Correct! 🎯", "✓ Nice work! 🔥", "✓ Nailed it! 💪",
  "✓ そうです！ (That's right!)", "✓ 正解！ (Seikai = Correct!)",
  "✓ Keep it up!", "✓ You know this! 🏯", "✓ Sensei level! 🎌",
  "✓ Perfect!", "✓ Outstanding!",
];

const STREAK_MESSAGES = {
  3: "🔥 3 in a row! You're on fire!",
  5: "🔥🔥 5 streak! Unstoppable!",
  10: "🔥🔥🔥 10 STREAK! LEGENDARY!",
  15: "👹 15 IN A ROW! ARE YOU EVEN HUMAN?!",
};

const WRONG_MESSAGES = [
  "✗ Not quite — study the explanation below",
  "✗ Close! Review and try again next time",
  "✗ Keep going — mistakes are how you learn",
  "✗ That one's tricky — you'll get it next time",
  "✗ Don't sweat it — read the note below",
];

function getFeedbackMessage(ok, streak, typed) {
  if (ok) {
    if (STREAK_MESSAGES[streak]) return STREAK_MESSAGES[streak];
    return CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)];
  }
  return WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)] +
    (typed ? ` — you typed: "${typed}"` : "");
}
function MCQ({ q, answered, selected, onSelect }) {
  // #48 — Shuffle option positions on every new question
  const [shuffled] = useState(() => {
    const opts = q.options.map((text, originalIdx) => ({ text, originalIdx }));
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  });
  const L = ["A","B","C","D"];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
      {shuffled.map(({text, originalIdx}, displayIdx) => {
        let bg="#0f0f1a",border="#1e1e35",color="#aaa";
        if(answered){if(originalIdx===q.answer){bg="#0a2a1a";border="#10b981";color="#10b981";}else if(selected===originalIdx){bg="#2a0a0a";border="#ef4444";color="#ef4444";}}
        else if(selected===originalIdx){bg="#1a1a2e";border="#6366f1";color="#fff";}
        return(
          <button key={originalIdx} onClick={()=>!answered&&onSelect(originalIdx)}
            style={{background:bg,border:`1px solid ${border}`,borderRadius:"10px",padding:"14px 16px",color,fontSize:"15px",textAlign:"left",cursor:answered?"default":"pointer",display:"flex",gap:"12px",alignItems:"center"}}>
            <span style={{width:"26px",height:"26px",borderRadius:"50%",border:`1px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"800",flexShrink:0,color}}>{L[displayIdx]}</span>
            {text}
          </button>
        );
      })}

    </div>
  );
}

function TFQ({ answered, selected, onSelect, ans }) {
  return(
    <div style={{display:"flex",gap:"12px"}}>
      {[true,false].map(val=>{
        let bg="#0f0f1a",border="#1e1e35",color="#aaa";
        if(answered){if(val===ans){bg="#0a2a1a";border="#10b981";color="#10b981";}else if(selected===val){bg="#2a0a0a";border="#ef4444";color="#ef4444";}}
        else if(selected===val){bg="#1a1a2e";border="#6366f1";color="#fff";}
        return(<button key={String(val)} onClick={()=>!answered&&onSelect(val)} style={{flex:1,background:bg,border:`1px solid ${border}`,borderRadius:"12px",padding:"20px",color,fontSize:"18px",fontWeight:"900",cursor:answered?"default":"pointer"}}>{val?"TRUE":"FALSE"}</button>);
      })}
    </div>
  );
}

function TypedInput({placeholder,value,onChange,answered,isCorrect,onSubmit,fontSize,hint}){
  return(
    <div>
      {hint&&<div style={{background:"#0f0f1a",border:`1px solid ${hint.color}33`,borderRadius:"10px",padding:"10px 14px",marginBottom:"12px"}}><span style={{color:hint.color,fontSize:"13px"}}>🎌 {hint.text}</span></div>}
      <input type="text" value={value} onChange={e=>!answered&&onChange(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!answered&&value.trim()&&onSubmit()} placeholder={placeholder} disabled={answered}
        style={{width:"100%",padding:"16px",background:answered?(isCorrect?"#0a2a1a":"#2a0a0a"):"#0f0f1a",border:`1px solid ${answered?(isCorrect?"#10b981":"#ef4444"):"#1e1e35"}`,borderRadius:"12px",color:answered?(isCorrect?"#10b981":"#ef4444"):"#fff",fontSize:fontSize||"17px",fontFamily:"inherit",outline:"none",boxSizing:"border-box",textAlign:"center"}}/>
      {!answered&&<button onClick={onSubmit} disabled={!value.trim()} style={{marginTop:"12px",width:"100%",padding:"14px",background:value.trim()?"#6366f1":"#1a1a2e",border:"none",borderRadius:"12px",color:value.trim()?"#fff":"#444",fontSize:"15px",fontWeight:"700",cursor:value.trim()?"pointer":"default"}}>Submit Answer</button>}
    </div>
  );
}

function WordQ({words,answered,selected,onToggle,onSubmit,correctAnswer}){
  return(
    <div>
      <div style={{marginBottom:"6px",color:"#555",fontSize:"11px",letterSpacing:"1px"}}>YOUR PHRASE</div>
      <div style={{minHeight:"56px",background:"#0f0f1a",border:"1px solid #1e1e35",borderRadius:"12px",padding:"12px",display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"16px",alignItems:"center"}}>
        {selected.length===0&&<span style={{color:"#333",fontSize:"13px"}}>Tap words below...</span>}
        {selected.map((wi,pos)=>{const ok=answered&&words[wi]===correctAnswer[pos];return(<button key={pos} onClick={()=>!answered&&onToggle(wi)} style={{padding:"10px 16px",background:answered?(ok?"#0a2a1a":"#2a0a0a"):"#1a1a2e",border:`1px solid ${answered?(ok?"#10b981":"#ef4444"):"#6366f1"}`,borderRadius:"8px",color:answered?(ok?"#10b981":"#ef4444"):"#fff",fontSize:"15px",fontWeight:"700",cursor:answered?"default":"pointer"}}>{words[wi]}</button>);})}
      </div>
      <div style={{marginBottom:"6px",color:"#555",fontSize:"11px",letterSpacing:"1px"}}>WORD BANK</div>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"16px"}}>
        {words.map((word,idx)=>{if(selected.includes(idx))return null;return(<button key={idx} onClick={()=>!answered&&onToggle(idx)} style={{padding:"10px 16px",background:"#13131e",border:"1px solid #2a2a3e",borderRadius:"8px",color:"#ccc",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}>{word}</button>);})}
      </div>
      {!answered&&selected.length>=correctAnswer.length&&<button onClick={onSubmit} style={{width:"100%",padding:"14px",background:"#6366f1",border:"none",borderRadius:"12px",color:"#fff",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}>Check Answer</button>}
    </div>
  );
}

// ═══════════════════════════════════════════
// MATCHING PAIRS COMPONENT (#13 new type)
// ═══════════════════════════════════════════
function MatchingPairsQ({ pairs, answered, onSubmit }) {
  // Build shuffled left (JP) and right (EN) columns on mount
  const [leftOrder] = useState(() => shuffle(pairs.map((_, i) => i)));
  const [rightOrder] = useState(() => shuffle(pairs.map((_, i) => i)));
  const [selectedLeft, setSelectedLeft] = useState(null);   // index into pairs
  const [selectedRight, setSelectedRight] = useState(null); // index into pairs
  const [matched, setMatched] = useState({});   // { pairIdx: true } when correctly matched
  const [wrong, setWrong] = useState(null);     // highlight wrong pair briefly

  const isComplete = Object.keys(matched).length === pairs.length;

  const handleLeft = (pairIdx) => {
    if (answered || matched[pairIdx]) return;
    setSelectedLeft(pairIdx);
    if (selectedRight !== null) tryMatch(pairIdx, selectedRight);
  };

  const handleRight = (pairIdx) => {
    if (answered || matched[pairIdx]) return;
    setSelectedRight(pairIdx);
    if (selectedLeft !== null) tryMatch(selectedLeft, pairIdx);
  };

  const tryMatch = (leftIdx, rightIdx) => {
    if (leftIdx === rightIdx) {
      // Correct!
      setMatched(m => ({ ...m, [leftIdx]: true }));
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      // Wrong — flash red briefly
      setWrong({ l: leftIdx, r: rightIdx });
      setTimeout(() => {
        setWrong(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 800);
    }
  };

  // Once all matched, report complete to engine
  const allMatched = Object.keys(matched).length === pairs.length;

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        {/* LEFT COLUMN — JP */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ color: "#f59e0b", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", marginBottom: "4px" }}>JAPANESE</div>
          {leftOrder.map(pairIdx => {
            const isMatched = matched[pairIdx];
            const isSelected = selectedLeft === pairIdx;
            const isWrong = wrong?.l === pairIdx;
            let bg = "#0f0f1a", border = "#1e1e35", color = "#ccc";
            if (isMatched) { bg = "#0a2a1a"; border = "#10b981"; color = "#10b981"; }
            else if (isWrong) { bg = "#2a0a0a"; border = "#ef4444"; color = "#ef4444"; }
            else if (isSelected) { bg = "#1a1a2e"; border = "#6366f1"; color = "#fff"; }
            return (
              <button key={pairIdx} onClick={() => handleLeft(pairIdx)}
                style={{ background: bg, border: `1px solid ${border}`, borderRadius: "10px", padding: "10px", color, fontSize: "20px", cursor: isMatched ? "default" : "pointer", textAlign: "center", transition: "all 0.2s", height: "64px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                {pairs[pairIdx].jp}
              </button>
            );
          })}
        </div>
        {/* RIGHT COLUMN — EN */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ color: "#5b8dee", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", marginBottom: "4px" }}>ENGLISH</div>
          {rightOrder.map(pairIdx => {
            const isMatched = matched[pairIdx];
            const isSelected = selectedRight === pairIdx;
            const isWrong = wrong?.r === pairIdx;
            let bg = "#0f0f1a", border = "#1e1e35", color = "#ccc";
            if (isMatched) { bg = "#0a2a1a"; border = "#10b981"; color = "#10b981"; }
            else if (isWrong) { bg = "#2a0a0a"; border = "#ef4444"; color = "#ef4444"; }
            else if (isSelected) { bg = "#1a1a2e"; border = "#6366f1"; color = "#fff"; }
            return (
              <button key={pairIdx} onClick={() => handleRight(pairIdx)}
                style={{ background: bg, border: `1px solid ${border}`, borderRadius: "10px", padding: "10px", color, fontSize: "12px", fontWeight: "600", cursor: isMatched ? "default" : "pointer", textAlign: "center", lineHeight: "1.4", transition: "all 0.2s", height: "64px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                {pairs[pairIdx].en}
              </button>
            );
          })}
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ height: "4px", background: "#1e1e30", borderRadius: "2px", marginBottom: "12px" }}>
        <div style={{ height: "100%", width: `${(Object.keys(matched).length / pairs.length) * 100}%`, background: "linear-gradient(90deg,#6366f1,#10b981)", borderRadius: "2px", transition: "width 0.3s" }} />
      </div>
      <div style={{ color: "#555", fontSize: "12px", textAlign: "center" }}>
        {allMatched ? "✓ All matched!" : `${Object.keys(matched).length} / ${pairs.length} matched — tap a JP word, then its English meaning`}
      </div>
      {allMatched && !answered && (
        <button onClick={() => onSubmit(true)} style={{ marginTop: "14px", width: "100%", padding: "14px", background: "linear-gradient(135deg,#10b981,#059669)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
          ✓ Continue →
        </button>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════
// QUIZ ENGINE
// ═══════════════════════════════════════════
function QuizEngine({ questions: initialQuestions, passPercent = 90, onComplete, onBack, title = "Quiz", testNum = null, initialState = null }) {
  const [questions] = useState(() => initialState?.questions || initialQuestions);
  const [cur, setCur] = useState(initialState?.cur || 0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [typed, setTyped] = useState("");
  const [wordSel, setWordSel] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [animClass, setAnimClass] = useState(""); // "flash-correct" | "flash-wrong"
  const scoreRef = useRef(initialState?.score || 0);
  const streakRef = useRef(0);
  const bestStreakRef = useRef(initialState?.bestStreak || 0);
  const [score, setScore] = useState(initialState?.score || 0);
  const [streak, setStreak] = useState(0);
  const [results, setResults] = useState(initialState?.results || []);
  const [finished, setFinished] = useState(false);
  const questionStartRef = useRef(Date.now());
  const timingsRef = useRef([]); // ms per question

  const q = questions[cur];
  const catColor = CAT_COLORS[q?.cat] || "#888";
  const isMC = q?.type === "mc" && q?.options;
  const isTF = q?.type === "tf";
  const isTyped = ["fill","spell","charSound","translateJPEN","translateENJP","typeJP","soundToChar","complete"].includes(q?.type);
  const isWO = q?.type === "wordorder" || q?.type === "listen";
  const isMatching = q?.type === "matching";
  const needsJP = ["soundToChar","typeJP"].includes(q?.type);

  const submit = (val, ok) => {
    if (answered) return;
    setAnswered(true); setIsCorrect(ok);
    const newScore = ok ? scoreRef.current + 1 : scoreRef.current;
    let newStreak = 0;
    if (ok) {
      scoreRef.current = newScore; setScore(newScore);
      streakRef.current += 1; newStreak = streakRef.current;
      setStreak(newStreak);
      if (streakRef.current > bestStreakRef.current) bestStreakRef.current = streakRef.current;
      // #12 Sound
      playSound(newStreak >= 5 ? "streak" : "correct");
      // #14 Animation
      setAnimClass("flash-correct");
    } else {
      streakRef.current = 0; setStreak(0);
      // #12 Sound
      playSound("wrong");
      // #14 Animation
      setAnimClass("flash-wrong");
    }
    // Track per-character accuracy (quizzes/tests only, not games)
    try {
      let trackedChar = null;
      if (q.type === 'charSound') {
        const parts = (q.q || '').split('\n');
        if (parts.length > 1) trackedChar = parts[parts.length - 1].trim();
      } else if (q.type === 'mc' && q.q && q.q.includes('Which character makes') && q.options && q.answer !== undefined) {
        trackedChar = q.options[q.answer];
      }
      if (trackedChar) {
        const key = 'nihongo_char_acc_' + trackedChar;
        const existing = JSON.parse(localStorage.getItem(key) || '{"correct":0,"attempts":0}');
        existing.attempts += 1;
        if (ok) existing.correct += 1;
        localStorage.setItem(key, JSON.stringify(existing));
      }
    } catch {}
    // #13 Dynamic message
    const isTyped = ["fill","spell","charSound","translateJPEN","translateENJP","typeJP","soundToChar","complete"].includes(q.type);
    setFeedbackMsg(getFeedbackMessage(ok, newStreak, isTyped ? val : null));
    // Clear animation after 600ms
    setTimeout(() => setAnimClass(""), 600);
    const elapsed = Date.now() - questionStartRef.current;
    timingsRef.current = [...timingsRef.current, elapsed];
    const newResults = [...results, { ok, cat: q.cat, q: q.q, type: q.type, correctAnswer: q.answer, options: q.options, answers: q.answers, exp: q.exp }];
    setResults(newResults);
    if (testNum) saveTestState(testNum, questions, cur, newScore, newResults, bestStreakRef.current);
  };

  const next = () => {
    if (cur + 1 >= questions.length) {
      setFinished(true);
      if (testNum) clearTestSave(testNum);
      onComplete && onComplete(scoreRef.current / questions.length * 100, bestStreakRef.current, results);
    } else {
      setCur(c => c+1);
      setAnswered(false); setSelected(null); setTyped(""); setWordSel([]); setIsCorrect(false);
      // Auto-play audio for listen questions
      const nextQ = questions[cur + 1];
      if (nextQ?.type === "listen" && nextQ?.audio) setTimeout(() => speakJP(nextQ.audio), 500);
      questionStartRef.current = Date.now();
    }
  };

  const handleTyped = () => submit(typed, checkTyped(typed, q.answers || [], needsJP));
  const handleWO = () => { const a = wordSel.map(i => q.words[i]); submit(a, JSON.stringify(a) === JSON.stringify(q.answer)); };

  if (finished) {
    const pct = Math.round((scoreRef.current / questions.length) * 100);
    const passed = pct >= passPercent;
    const gc = passed ? "#10b981" : "#ef4444";
    const grade = pct >= 95 ? "A+" : pct >= 90 ? "A" : pct >= 85 ? "B+" : pct >= 80 ? "B" : pct >= 70 ? "C" : "D";

    // ── Category breakdown ──
    const cats = {};
    results.forEach(r => {
      if (!cats[r.cat]) cats[r.cat] = { ok: 0, total: 0 };
      cats[r.cat].total++;
      if (r.ok) cats[r.cat].ok++;
    });
    const catEntries = Object.entries(cats).sort((a, b) => (a[1].ok/a[1].total) - (b[1].ok/b[1].total));
    const strongCats = catEntries.filter(([,v]) => v.ok/v.total >= 0.8);
    const weakCats = catEntries.filter(([,v]) => v.ok/v.total < 0.6);

    // ── Timing ──
    const timings = timingsRef.current;
    const avgMs = timings.length ? Math.round(timings.reduce((a,b)=>a+b,0)/timings.length) : 0;
    const avgSec = (avgMs/1000).toFixed(1);

    // ── Missed questions ──
    const missed = results.map((r,i) => ({...r, qObj: questions[i]})).filter(r => !r.ok);

    return (
      <div style={{minHeight:"100vh",background:"#06060f",fontFamily:"'Georgia',serif",display:"flex",flexDirection:"column"}}>
        {/* Sticky header */}
        <div style={{background:"#0a0a14",borderBottom:"1px solid #1e1e30",padding:"12px 20px",display:"flex",alignItems:"center",gap:"12px",position:"sticky",top:0,zIndex:10}}>
          <span style={{color:"#fff",fontWeight:"900",fontSize:"15px"}}>📊 Results</span>
          <span style={{marginLeft:"auto",color:gc,fontWeight:"900",fontSize:"14px"}}>{pct}% — {grade}</span>
        </div>

        <div style={{flex:1,maxWidth:"600px",width:"100%",margin:"0 auto",padding:"20px 16px 48px",display:"flex",flexDirection:"column",gap:"16px"}}>

          {/* Hero score */}
          <div style={{background:"#10101c",border:`1px solid ${gc}44`,borderRadius:"16px",padding:"24px",textAlign:"center"}}>
            <div style={{fontSize:"52px",marginBottom:"8px"}}>{passed?"🏯":"💪"}</div>
            <div style={{fontSize:"56px",fontWeight:"900",color:gc,lineHeight:1}}>{grade}</div>
            <div style={{color:"#fff",fontSize:"22px",fontWeight:"700",margin:"8px 0"}}>{scoreRef.current} / {questions.length} correct</div>
            <div style={{color:passed?"#10b981":"#ef4444",fontSize:"13px",fontWeight:"700",marginBottom:"16px"}}>
              {passed?`✓ Passed! (${passPercent}% required)`:`✗ Need ${passPercent}% to pass — ${passPercent - pct}% more`}
            </div>
            {/* XP Earned */}
            <div style={{background:"#0f0f1a",borderRadius:"12px",padding:"12px",marginBottom:"12px"}}>
              <div style={{color:"#f59e0b",fontSize:"14px",fontWeight:"700",textAlign:"center"}}>{"⭐ +" + calcXP(scoreRef.current, questions.length, bestStreakRef.current, passPercent) + " XP"}</div>
            </div>
            {/* Stats row */}
            <div style={{display:"flex",gap:"8px",justifyContent:"center"}}>
              <div style={{background:"#0f0f1a",borderRadius:"10px",padding:"10px 16px",textAlign:"center"}}>
                <div style={{color:"#f97316",fontSize:"18px",fontWeight:"900"}}>🔥 {bestStreakRef.current}</div>
                <div style={{color:"#555",fontSize:"10px",marginTop:"2px"}}>BEST STREAK</div>
              </div>
              <div style={{background:"#0f0f1a",borderRadius:"10px",padding:"10px 16px",textAlign:"center"}}>
                <div style={{color:"#6366f1",fontSize:"18px",fontWeight:"900"}}>⏱ {avgSec}s</div>
                <div style={{color:"#555",fontSize:"10px",marginTop:"2px"}}>AVG / QUESTION</div>
              </div>
              <div style={{background:"#0f0f1a",borderRadius:"10px",padding:"10px 16px",textAlign:"center"}}>
                <div style={{color:"#ef4444",fontSize:"18px",fontWeight:"900"}}>✗ {missed.length}</div>
                <div style={{color:"#555",fontSize:"10px",marginTop:"2px"}}>MISSED</div>
              </div>
            </div>
          </div>

          {/* Category breakdown */}
          <div style={{background:"#10101c",border:"1px solid #1e1e30",borderRadius:"14px",padding:"16px"}}>
            <div style={{color:"#aaa",fontSize:"11px",fontWeight:"700",letterSpacing:"1px",marginBottom:"12px"}}>BREAKDOWN BY CATEGORY</div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {catEntries.map(([cat, v]) => {
                const catPct = Math.round(v.ok/v.total*100);
                const barColor = catPct >= 80 ? "#10b981" : catPct >= 60 ? "#f59e0b" : "#ef4444";
                const cc = CAT_COLORS[cat] || "#888";
                return (
                  <div key={cat}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
                      <span style={{color:cc,fontSize:"12px",fontWeight:"700"}}>{cat}</span>
                      <span style={{color:"#aaa",fontSize:"12px"}}>{v.ok}/{v.total} · {catPct}%</span>
                    </div>
                    <div style={{height:"6px",background:"#1e1e30",borderRadius:"3px"}}>
                      <div style={{height:"100%",width:`${catPct}%`,background:barColor,borderRadius:"3px",transition:"width 0.5s"}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* What you did well / need work */}
          {(strongCats.length > 0 || weakCats.length > 0) && (
            <div style={{display:"flex",gap:"10px"}}>
              {strongCats.length > 0 && (
                <div style={{flex:1,background:"#0a1a0a",border:"1px solid #10b98133",borderRadius:"12px",padding:"14px"}}>
                  <div style={{color:"#10b981",fontSize:"11px",fontWeight:"700",marginBottom:"8px"}}>💪 STRONG</div>
                  {strongCats.map(([cat]) => <div key={cat} style={{color:"#ccc",fontSize:"12px",marginBottom:"3px"}}>· {cat}</div>)}
                </div>
              )}
              {weakCats.length > 0 && (
                <div style={{flex:1,background:"#1a0a0a",border:"1px solid #ef444433",borderRadius:"12px",padding:"14px"}}>
                  <div style={{color:"#ef4444",fontSize:"11px",fontWeight:"700",marginBottom:"8px"}}>📖 REVIEW</div>
                  {weakCats.map(([cat]) => <div key={cat} style={{color:"#ccc",fontSize:"12px",marginBottom:"3px"}}>· {cat}</div>)}
                </div>
              )}
            </div>
          )}

          {/* Missed questions */}
          {missed.length > 0 && (
            <div style={{background:"#10101c",border:"1px solid #1e1e30",borderRadius:"14px",padding:"16px"}}>
              <div style={{color:"#ef4444",fontSize:"11px",fontWeight:"700",letterSpacing:"1px",marginBottom:"12px"}}>✗ MISSED QUESTIONS ({missed.length})</div>
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                {missed.map((r, i) => {
                  const q = r.qObj;
                  const cc = CAT_COLORS[r.cat] || "#888";
                  const correctDisplay = q?.type === "tf" ? (q.answer ? "TRUE" : "FALSE")
                    : q?.type === "wordorder" ? (Array.isArray(q.answer) ? q.answer.join(" → ") : q.answer)
                    : q?.type === "matching" ? "See pairs"
                    : q?.answers?.[0] ?? q?.options?.[q?.answer] ?? "—";
                  return (
                    <div key={i} style={{background:"#0f0f1a",border:"1px solid #2a0a0a",borderRadius:"10px",padding:"12px"}}>
                      <div style={{display:"flex",gap:"6px",marginBottom:"6px",flexWrap:"wrap"}}>
                        <span style={{background:cc+"22",color:cc,fontSize:"10px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px"}}>{r.cat}</span>
                        <span style={{background:"#1a1a2e",color:"#6366f1",fontSize:"10px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px"}}>{TYPE_LABELS[q?.type]||q?.type}</span>
                      </div>
                      <div style={{color:"#ddd",fontSize:"13px",lineHeight:"1.5",marginBottom:"6px",whiteSpace:"pre-line"}}>{q?.q}</div>
                      <div style={{color:"#10b981",fontSize:"12px",fontWeight:"700",marginBottom:"4px"}}>✓ {correctDisplay}</div>
                      <div style={{color:"#666",fontSize:"11px",lineHeight:"1.5"}}>📖 {q?.exp}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back button */}
          <div style={{display:"flex",gap:"10px"}}>
            <button onClick={onBack} style={{flex:1,padding:"16px",background:"#1a1a2e",border:"1px solid #2a2a3e",borderRadius:"12px",color:"#aaa",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>← Back</button>
            <button onClick={()=>{setFinished(false);setCur(0);setAnswered(false);setSelected(null);setTyped("");setWordSel([]);setIsCorrect(false);scoreRef.current=0;streakRef.current=0;bestStreakRef.current=0;setScore(0);setStreak(0);setResults([]);}} style={{flex:1,padding:"16px",background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"12px",color:"#fff",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>Retake ↻</button>
          </div>
        </div>
      </div>
    );
  }

  const progress = Math.round(((cur+1)/questions.length)*100);
  return (
    <div style={{minHeight:"100vh",background:"#06060f",fontFamily:"'Georgia',serif",display:"flex",flexDirection:"column"}}>
      <div style={{background:"#0a0a14",borderBottom:"1px solid #1e1e30",padding:"12px 20px",display:"flex",alignItems:"center",gap:"12px",position:"sticky",top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",fontSize:"18px",padding:0}}>←</button>
        <span style={{color:"#fff",fontWeight:"900",fontSize:"14px"}}>{title}</span>
        <div style={{flex:1,height:"4px",background:"#1e1e30",borderRadius:"2px"}}>
          <div style={{height:"100%",width:`${progress}%`,background:"linear-gradient(90deg,#6366f1,#10b981)",borderRadius:"2px",transition:"width 0.3s"}}/>
        </div>
        <span style={{color:"#555",fontSize:"13px"}}>{cur+1}/{questions.length}</span>
        <span style={{color:"#10b981",fontSize:"13px",fontWeight:"700"}}>{score}✓</span>
        {streak>=2&&<span style={{background:"#f97316",color:"#fff",fontSize:"11px",fontWeight:"900",padding:"2px 8px",borderRadius:"20px"}}>🔥{streak}</span>}
      </div>
      <div style={{flex:1,maxWidth:"600px",width:"100%",margin:"0 auto",padding:"24px 20px",display:"flex",flexDirection:"column"}}>
        <div style={{display:"flex",gap:"8px",marginBottom:"16px",flexWrap:"wrap"}}>
          <span style={{background:(catColor||"#888")+"22",color:catColor||"#888",fontSize:"11px",fontWeight:"700",padding:"3px 10px",borderRadius:"20px",border:`1px solid ${catColor||"#888"}44`}}>{q.cat}</span>
          <span style={{background:"#1a1a2e",color:"#6366f1",fontSize:"11px",fontWeight:"700",padding:"3px 10px",borderRadius:"20px",border:"1px solid #2a2a3e"}}>{TYPE_LABELS[q.type]||q.type}</span>
        </div>
        <h2 style={{color:"#f0f0f0",fontSize:"18px",fontWeight:"600",marginBottom:"24px",lineHeight:"1.7",whiteSpace:"pre-line",
          transition:"background 0.3s",
          background: animClass==="flash-correct"?"rgba(16,185,129,0.08)":animClass==="flash-wrong"?"rgba(239,68,68,0.08)":"transparent",
          borderRadius:"12px",padding:animClass?"8px":"0"
        }}>{q.q}</h2>
        <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <div>
            {isMC&&<MCQ key={cur} q={q} answered={answered} selected={selected} onSelect={idx=>{setSelected(idx);submit(idx,idx===q.answer);}}/>}
            {isTF&&<TFQ key={cur} answered={answered} selected={selected} onSelect={val=>{setSelected(val);submit(val,val===q.answer);}} ans={q.answer}/>}
            {isTyped&&!needsJP&&<TypedInput placeholder="Type your answer..." value={typed} onChange={setTyped} answered={answered} isCorrect={isCorrect} onSubmit={handleTyped}/>}
            {isTyped&&needsJP&&<TypedInput placeholder="日本語でタイプ..." value={typed} onChange={setTyped} answered={answered} isCorrect={isCorrect} onSubmit={handleTyped} fontSize="24px" hint={{color:"#f59e0b",text:"Switch to your Japanese keyboard"}}/>}
            {q?.type==="listen"&&(
              <div style={{textAlign:"center",marginBottom:"16px"}}>
                <button onClick={()=>speakJP(q.audio)} style={{background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"50%",width:"80px",height:"80px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto",boxShadow:"0 4px 20px rgba(99,102,241,0.3)"}}>
                  <span style={{fontSize:"36px"}}>🔊</span>
                </button>
                <div style={{color:"#888",fontSize:"12px",marginTop:"8px"}}>Tap to listen again</div>
              </div>
            )}
            {isWO&&<WordQ words={q.words} answered={answered} selected={wordSel} onToggle={idx=>setWordSel(p=>p.includes(idx)?p.filter(i=>i!==idx):[...p,idx])} onSubmit={handleWO} correctAnswer={q.answer}/>}
            {isMatching&&<MatchingPairsQ key={cur} pairs={q.pairs} answered={answered} onSubmit={(ok)=>submit("all-matched",ok)}/>}
            {answered&&(
              <div style={{marginTop:"16px",padding:"14px",background:isCorrect?"#0a2a1a":"#1a0a0a",border:`1px solid ${isCorrect?"#10b981":"#ef4444"}`,borderRadius:"12px"}}>
                <div style={{color:isCorrect?"#10b981":"#ef4444",fontWeight:"700",fontSize:"15px",marginBottom:"6px"}}>
                  {feedbackMsg}
                </div>
                {!isCorrect&&<div style={{color:"#aaa",fontSize:"13px",marginBottom:"6px"}}><strong style={{color:"#fff"}}>Correct: </strong>{isTF?(q.answer?"TRUE":"FALSE"):isWO?q.answer.join(" → "):isMatching?"See pairs above":isTyped?(q.answers||[])[0]:q.options?.[q.answer]}</div>}
                <div style={{color:"#888",fontSize:"13px",lineHeight:"1.6"}}>📖 {q.exp}</div>
              </div>
            )}
          </div>
          {answered&&<button onClick={next} style={{marginTop:"16px",width:"100%",padding:"16px",background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"12px",color:"#fff",fontSize:"16px",fontWeight:"700",cursor:"pointer"}}>{cur+1>=questions.length?"See Results →":"Next →"}</button>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// DAY SCREEN
// ═══════════════════════════════════════════

// ═══════════════════════════════════════════
// CHARACTER SPEED MATCH GAME
// ═══════════════════════════════════════════

// ═══════════════════════════════════════════
// AUDIO MATCHING PAIRS GAME
// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
// AUDIO MATCH — Rounds wrapper
// ═══════════════════════════════════════════
function AudioMatchGame({ chars, onBack, totalRounds = 3, endless = false, onXPEarned }) {
  const [round, setRound] = useState(1);
  const [roundResults, setRoundResults] = useState([]);
  const [done, setDone] = useState(false);

  const handleRoundComplete = (accuracy, elapsed, attempts) => {
    const nr = [...roundResults, { accuracy, elapsed, attempts }];
    setRoundResults(nr);
    if (!endless && round >= totalRounds) {
      const xp = nr.reduce((s, r) => s + 5 * 10 + (r.accuracy === 100 ? 50 : 0), 0);
      if (onXPEarned) onXPEarned(xp);
      setDone(true);
    } else { setRound(r => r + 1); }
  };

  if (done) {
    const avgAcc = Math.round(roundResults.reduce((s, r) => s + r.accuracy, 0) / roundResults.length);
    const totalTime = roundResults.reduce((s, r) => s + r.elapsed, 0);
    const perfectCount = roundResults.filter(r => r.accuracy === 100).length;
    const xp = roundResults.reduce((s, r) => s + 5 * 10 + (r.accuracy === 100 ? 50 : 0), 0);
    return (
      <div style={{textAlign:"center",padding:"40px 20px"}}>
        <div style={{fontSize:"60px",marginBottom:"16px"}}>{perfectCount === totalRounds ? "🏆" : avgAcc >= 80 ? "✅" : "💪"}</div>
        <div style={{color:"#fff",fontSize:"22px",fontWeight:"900",marginBottom:"4px"}}>{totalRounds} Rounds Complete!</div>
        {perfectCount === totalRounds && <div style={{color:"#f59e0b",fontSize:"13px",fontWeight:"700",marginBottom:"8px"}}>Perfect game — all rounds flawless!</div>}
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"20px",textAlign:"left"}}>
          {roundResults.map((r, i) => (
            <div key={i} style={{background:"#10101c",borderRadius:"10px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#666",fontSize:"12px",fontWeight:"700"}}>ROUND {i + 1}</span>
              <div style={{display:"flex",gap:"16px"}}>
                <span style={{color:r.accuracy===100?"#f59e0b":"#10b981",fontSize:"13px",fontWeight:"700"}}>{r.accuracy}%</span>
                <span style={{color:"#555",fontSize:"12px"}}>{r.elapsed}s</span>
                <span style={{color:"#888",fontSize:"12px"}}>{r.attempts} tries</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#10101c",borderRadius:"12px",padding:"14px 20px",marginBottom:"20px",display:"flex",justifyContent:"space-around"}}>
          <div><div style={{color:"#10b981",fontSize:"22px",fontWeight:"900"}}>{avgAcc}%</div><div style={{color:"#555",fontSize:"10px"}}>AVG ACC</div></div>
          <div><div style={{color:"#6366f1",fontSize:"22px",fontWeight:"900"}}>{totalTime}s</div><div style={{color:"#555",fontSize:"10px"}}>TOTAL TIME</div></div>
          <div><div style={{color:"#a855f7",fontSize:"22px",fontWeight:"900"}}>{perfectCount}/{totalRounds}</div><div style={{color:"#555",fontSize:"10px"}}>PERFECT</div></div>
        </div>
        <div style={{color:"#f59e0b",fontSize:"14px",fontWeight:"700",marginBottom:"24px"}}>{"⭐ +" + xp + " XP"}</div>
        <button onClick={()=>{setRound(1);setRoundResults([]);setDone(false);}} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"16px",fontWeight:"900",cursor:"pointer",marginBottom:"10px"}}>
          Play Again
        </button>
        <button onClick={onBack} style={{width:"100%",padding:"14px",background:"none",border:"1px solid #2a2a3e",borderRadius:"12px",color:"#666",fontSize:"14px",cursor:"pointer"}}>
          ← Back to Games
        </button>
      </div>
    );
  }

  return (
    <AudioMatchRound
      key={round}
      chars={chars}
      round={round}
      totalRounds={totalRounds}
      endless={endless}
      onComplete={handleRoundComplete}
      onBack={onBack}
      onEndSession={endless ? ()=>setDone(true) : null}
    />
  );
}

// ═══════════════════════════════════════════
// AUDIO MATCH — Single round (5 pairs)
// ═══════════════════════════════════════════
function AudioMatchRound({ chars, round, totalRounds, endless = false, onComplete, onBack, onEndSession }) {
  const [pairs] = useState(() => [...chars].sort(() => Math.random() - 0.5).slice(0, 5));
  const [leftOrder]  = useState(() => pairs.map((_, i) => i).sort(() => Math.random() - 0.5));
  const [rightOrder] = useState(() => pairs.map((_, i) => i).sort(() => Math.random() - 0.5));
  const [matched, setMatched]       = useState({});
  const [wrong, setWrong]           = useState(null);
  const [selectedLeft, setSelectedLeft]   = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [attempts, setAttempts]     = useState(0);
  const [startTime]                 = useState(Date.now());

  const handleLeft = (idx) => {
    if (matched[idx]) return;
    speakJP(pairs[idx].char);
    setSelectedLeft(idx);
    if (selectedRight !== null) tryMatch(idx, selectedRight);
  };

  const handleRight = (idx) => {
    if (matched[idx]) return;
    setSelectedRight(idx);
    if (selectedLeft !== null) tryMatch(selectedLeft, idx);
  };

  const tryMatch = (leftIdx, rightIdx) => {
    setAttempts(a => a + 1);
    if (leftIdx === rightIdx) {
      playSound('correct');
      setMatched(m => ({ ...m, [leftIdx]: true }));
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      playSound('wrong');
      setWrong({ l: leftIdx, r: rightIdx });
      setTimeout(() => { setWrong(null); setSelectedLeft(null); setSelectedRight(null); }, 800);
    }
  };

  const allMatched = Object.keys(matched).length === pairs.length;
  const elapsed    = allMatched ? Math.round((Date.now() - startTime) / 1000) : 0;
  const accuracy   = allMatched && attempts > 0 ? Math.round((pairs.length / attempts) * 100) : 0;
  const isLastRound = !endless && round >= totalRounds;

  if (allMatched) {
    return (
      <div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:'60px',marginBottom:'16px'}}>{accuracy === 100 ? '🏆' : '✅'}</div>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'4px'}}>
          {endless ? 'ENDLESS — Round ' + round : 'ROUND ' + round + ' / ' + totalRounds}
        </div>
        <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'4px'}}>
          {accuracy === 100 ? 'Perfect Round!' : 'Round Complete!'}
        </div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'20px'}}>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}>
            <div style={{color:'#6366f1',fontSize:'24px',fontWeight:'900'}}>{elapsed}s</div>
            <div style={{color:'#555',fontSize:'10px'}}>TIME</div>
          </div>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}>
            <div style={{color:'#10b981',fontSize:'24px',fontWeight:'900'}}>{accuracy}%</div>
            <div style={{color:'#555',fontSize:'10px'}}>ACCURACY</div>
          </div>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}>
            <div style={{color:'#f59e0b',fontSize:'24px',fontWeight:'900'}}>{attempts}</div>
            <div style={{color:'#555',fontSize:'10px'}}>TRIES</div>
          </div>
        </div>
        <button onClick={() => onComplete(accuracy, elapsed, attempts)}
          style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>
          {endless ? 'Next Round →' : isLastRound ? 'See Results →' : 'Round ' + (round + 1) + ' →'}
        </button>
        {endless && onEndSession && (
          <button onClick={onEndSession}
            style={{width:'100%',padding:'12px',background:'none',border:'1px solid #ef4444',borderRadius:'12px',color:'#ef4444',fontSize:'13px',fontWeight:'700',cursor:'pointer',marginBottom:'8px'}}>
            End Session
          </button>
        )}
        <button onClick={onBack}
          style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>
          ← Back to Games
        </button>
      </div>
    );
  }

  return (
    <div style={{padding:'10px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px'}}>
          {endless ? 'ENDLESS' : 'ROUND ' + round + '/' + totalRounds}
        </div>
        <div style={{color:'#6366f1',fontSize:'13px',fontWeight:'700'}}>
          {Object.keys(matched).length}/{pairs.length}
        </div>
      </div>
      <div style={{color:'#aaa',fontSize:'12px',marginBottom:'12px',textAlign:'center'}}>
        Match the sound to the character
      </div>
      <div style={{display:'flex',gap:'10px'}}>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:'8px'}}>
          <div style={{color:'#a855f7',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'4px',textAlign:'center'}}>LISTEN</div>
          {leftOrder.map(idx => {
            const isMatched  = matched[idx];
            const isSelected = selectedLeft === idx;
            const isWrong    = wrong?.l === idx;
            let bg = '#0f0f1a', border = '#1e1e35';
            if (isMatched)       { bg = '#0a2a1a'; border = '#10b981'; }
            else if (isWrong)    { bg = '#2a0a0a'; border = '#ef4444'; }
            else if (isSelected) { bg = '#1a1a2e'; border = '#6366f1'; }
            return (
              <button key={'l'+idx} onClick={() => handleLeft(idx)}
                style={{background:bg,border:'1px solid '+border,borderRadius:'10px',padding:'14px',cursor:isMatched?'default':'pointer',height:'64px',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',gap:'8px',transition:'all 0.2s'}}>
                <span style={{fontSize:'20px'}}>🔊</span>
                {isMatched && <span style={{color:'#10b981',fontSize:'12px'}}>{pairs[idx].romaji}</span>}
              </button>
            );
          })}
        </div>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:'8px'}}>
          <div style={{color:'#f59e0b',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'4px',textAlign:'center'}}>MATCH</div>
          {rightOrder.map(idx => {
            const isMatched  = matched[idx];
            const isSelected = selectedRight === idx;
            const isWrong    = wrong?.r === idx;
            let bg = '#0f0f1a', border = '#1e1e35', color = '#ccc';
            if (isMatched)       { bg = '#0a2a1a'; border = '#10b981'; color = '#10b981'; }
            else if (isWrong)    { bg = '#2a0a0a'; border = '#ef4444'; color = '#ef4444'; }
            else if (isSelected) { bg = '#1a1a2e'; border = '#6366f1'; color = '#fff'; }
            return (
              <button key={'r'+idx} onClick={() => handleRight(idx)}
                style={{background:bg,border:'1px solid '+border,borderRadius:'10px',padding:'14px',cursor:isMatched?'default':'pointer',height:'64px',display:'flex',alignItems:'center',justifyContent:'center',width:'100%',fontSize:'24px',color,transition:'all 0.2s'}}>
                {pairs[idx].char}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{height:'4px',background:'#1e1e30',borderRadius:'2px',marginTop:'16px'}}>
        <div style={{height:'100%',width:(Object.keys(matched).length/pairs.length*100)+'%',background:'linear-gradient(90deg,#a855f7,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// CHARACTER SPEED MATCH — Rounds wrapper
// ═══════════════════════════════════════════
function CharacterSpeedMatch({ chars, onBack, totalRounds = 3, endless = false, onXPEarned }) {
  const [round, setRound] = useState(1);
  const [roundResults, setRoundResults] = useState([]);
  const [done, setDone] = useState(false);

  const handleRoundDone = (score, bestStreak) => {
    const nr = [...roundResults, { score, bestStreak }];
    setRoundResults(nr);
    if (!endless && round >= totalRounds) {
      const xp = nr.reduce((s, r) => s + r.score * 5 + (r.bestStreak >= 5 ? 30 : 0) + (r.bestStreak >= 10 ? 75 : 0), 0);
      if (onXPEarned) onXPEarned(xp);
      setDone(true);
    } else { setRound(r => r + 1); }
  };

  if (done) {
    const totalScore = roundResults.reduce((s, r) => s + r.score, 0);
    const bestOverall = Math.max(...roundResults.map(r => r.bestStreak));
    const xp = totalScore * 5 + (bestOverall >= 5 ? 30 : 0) + (bestOverall >= 10 ? 75 : 0);
    return (
      <div style={{textAlign:"center",padding:"40px 20px"}}>
        <div style={{fontSize:"60px",marginBottom:"16px"}}>⚡</div>
        <div style={{color:"#fff",fontSize:"22px",fontWeight:"900",marginBottom:"4px"}}>{totalRounds} Rounds Done!</div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"20px",textAlign:"left"}}>
          {roundResults.map((r, i) => (
            <div key={i} style={{background:"#10101c",borderRadius:"10px",padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{color:"#666",fontSize:"12px",fontWeight:"700"}}>ROUND {i + 1}</span>
              <div style={{display:"flex",gap:"16px"}}>
                <span style={{color:"#6366f1",fontSize:"13px",fontWeight:"700"}}>{r.score} pts</span>
                <span style={{color:"#f59e0b",fontSize:"12px"}}>🔥 {r.bestStreak}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#10101c",borderRadius:"12px",padding:"14px 20px",marginBottom:"20px",display:"flex",justifyContent:"space-around"}}>
          <div><div style={{color:"#6366f1",fontSize:"22px",fontWeight:"900"}}>{totalScore}</div><div style={{color:"#555",fontSize:"10px"}}>TOTAL PTS</div></div>
          <div><div style={{color:"#f59e0b",fontSize:"22px",fontWeight:"900"}}>{bestOverall}</div><div style={{color:"#555",fontSize:"10px"}}>BEST STREAK</div></div>
        </div>
        <div style={{color:"#f59e0b",fontSize:"14px",fontWeight:"700",marginBottom:"24px"}}>{"⭐ +" + xp + " XP"}</div>
        <button onClick={()=>{setRound(1);setRoundResults([]);setDone(false);}} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"16px",fontWeight:"900",cursor:"pointer",marginBottom:"10px"}}>
          Play Again
        </button>
        <button onClick={onBack} style={{width:"100%",padding:"14px",background:"none",border:"1px solid #2a2a3e",borderRadius:"12px",color:"#666",fontSize:"14px",cursor:"pointer"}}>
          ← Back to Games
        </button>
      </div>
    );
  }

  return (
    <CharacterSpeedMatchRound
      key={round}
      chars={chars}
      round={round}
      totalRounds={totalRounds}
      endless={endless}
      onRoundDone={handleRoundDone}
      onBack={onBack}
      onEndSession={endless ? ()=>setDone(true) : null}
    />
  );
}

// ═══════════════════════════════════════════
// CHARACTER SPEED MATCH — Single round
// ═══════════════════════════════════════════
function CharacterSpeedMatchRound({ chars, round, totalRounds, endless = false, onRoundDone, onBack, onEndSession }) {
  const [gameState, setGameState] = useState("ready"); // ready, playing, over
  const [currentChar, setCurrentChar] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3000);
  const [maxTime, setMaxTime] = useState(3000);
  const [flash, setFlash] = useState(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const highScoreKey = "nihongo_speedmatch_high";
  const [highScore] = useState(() => {
    try { return parseInt(localStorage.getItem(highScoreKey) || "0"); } catch { return 0; }
  });

  const nextQuestion = (currentScore) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    // Build 4 options — 1 correct + 3 wrong
    const wrongChars = chars.filter(c => c.romaji !== char.romaji);
    const shuffledWrong = wrongChars.sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [...shuffledWrong.map(c => c.romaji), char.romaji].sort(() => Math.random() - 0.5);
    setCurrentChar(char);
    setOptions(opts);
    // Speed up: reduce max time by 50ms per correct, minimum 1000ms
    const newMax = Math.max(1000, 3000 - currentScore * 50);
    setMaxTime(newMax);
    setTimeLeft(newMax);
    startTimeRef.current = Date.now();
  };

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    nextQuestion(0);
  };

  // Timer countdown
  useEffect(() => {
    if (gameState !== "playing") return;
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = maxTime - elapsed;
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        endGame();
      } else {
        setTimeLeft(remaining);
      }
    }, 50);
    return () => clearInterval(timerRef.current);
  }, [gameState, currentChar, maxTime]);

  const endGame = () => {
    clearInterval(timerRef.current);
    setGameState("over");
    playSound("wrong");
    // Save high score
    const finalScore = score;
    if (finalScore > highScore) {
      localStorage.setItem(highScoreKey, String(finalScore));
    }
  };

  const handleAnswer = (romaji) => {
    clearInterval(timerRef.current);
    if (romaji === currentChar.romaji) {
      playSound("correct");
      setFlash("correct");
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setTimeout(() => {
        setFlash(null);
        nextQuestion(newScore);
      }, 300);
    } else {
      setFlash("wrong");
      setTimeout(() => {
        setFlash(null);
        endGame();
      }, 500);
    }
  };

  const timerPercent = (timeLeft / maxTime) * 100;
  const timerColor = timerPercent > 50 ? "#10b981" : timerPercent > 25 ? "#f59e0b" : "#ef4444";

  // ── READY SCREEN ──
  // Auto-start on mount — picker already handled round selection
  useEffect(() => { if (gameState === "ready") startGame(); }, []);
  if (gameState === "ready") return null;

  // ── GAME OVER ──
  if (gameState === "over") {
    const isNewHigh = score > highScore;
    const isLastRound = round >= totalRounds;
    const xpEarned = score * 5 + (bestStreak >= 5 ? 30 : 0) + (bestStreak >= 10 ? 75 : 0);
    return (
      <div style={{textAlign:"center",padding:"40px 20px"}}>
        <div style={{fontSize:"60px",marginBottom:"16px"}}>{isNewHigh ? "🏆" : "💥"}</div>
        <div style={{color:"#555",fontSize:"11px",fontWeight:"700",letterSpacing:"1px",marginBottom:"4px"}}>ROUND {round} OF {totalRounds}</div>
        <div style={{color:"#fff",fontSize:"22px",fontWeight:"900",marginBottom:"4px"}}>Round Over!</div>
        {isNewHigh && <div style={{color:"#f59e0b",fontSize:"14px",fontWeight:"700",marginBottom:"12px"}}>🎉 NEW HIGH SCORE!</div>}
        <div style={{display:"flex",gap:"12px",justifyContent:"center",marginBottom:"24px"}}>
          <div style={{background:"#10101c",borderRadius:"12px",padding:"16px 24px"}}>
            <div style={{color:"#6366f1",fontSize:"28px",fontWeight:"900"}}>{score}</div>
            <div style={{color:"#555",fontSize:"10px"}}>SCORE</div>
          </div>
          <div style={{background:"#10101c",borderRadius:"12px",padding:"16px 24px"}}>
            <div style={{color:"#f59e0b",fontSize:"28px",fontWeight:"900"}}>{bestStreak}</div>
            <div style={{color:"#555",fontSize:"10px"}}>BEST STREAK</div>
          </div>
        </div>
        <div style={{color:"#f59e0b",fontSize:"14px",fontWeight:"700",marginBottom:"24px"}}>{"⭐ +" + xpEarned + " XP"}</div>
        <button onClick={()=>onRoundDone(score, bestStreak)} style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"16px",fontWeight:"900",cursor:"pointer",marginBottom:"10px"}}>
          {endless ? "Next Round →" : isLastRound ? "See Results →" : "Round " + (round + 1) + " →"}
        </button>
        <button onClick={onBack} style={{width:"100%",padding:"14px",background:"none",border:"1px solid #2a2a3e",borderRadius:"12px",color:"#666",fontSize:"14px",cursor:"pointer"}}>
          ← Back to Games
        </button>
        {endless && onEndSession && (
          <button onClick={onEndSession} style={{width:"100%",padding:"12px",background:"none",border:"1px solid #ef4444",borderRadius:"12px",color:"#ef4444",fontSize:"13px",fontWeight:"700",cursor:"pointer",marginTop:"8px"}}>
            End Session
          </button>
        )}
      </div>
    );
  }

  // ── PLAYING ──
  return (
    <div style={{padding:"20px",textAlign:"center"}}>
      {/* Score and streak */}
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"16px"}}>
        <div style={{color:"#6366f1",fontSize:"16px",fontWeight:"900"}}>Score: {score}</div>
        {streak >= 3 && <div style={{color:"#f59e0b",fontSize:"14px",fontWeight:"700"}}>{"🔥 " + streak}</div>}
      </div>

      {/* Timer bar */}
      <div style={{height:"6px",background:"#1e1e30",borderRadius:"3px",marginBottom:"30px",overflow:"hidden"}}>
        <div style={{height:"100%",width:timerPercent+"%",background:timerColor,borderRadius:"3px",transition:"width 0.05s linear"}}/>
      </div>

      {/* Character display */}
      <div style={{background:flash==="correct"?"#0a2a1a":flash==="wrong"?"#2a0a0a":"#10101c",border:"2px solid "+(flash==="correct"?"#10b981":flash==="wrong"?"#ef4444":"#2a2a3e"),borderRadius:"20px",padding:"40px",marginBottom:"30px",transition:"all 0.2s"}}>
        <div style={{fontSize:"72px",color:"#fff"}}>{currentChar?.char}</div>
      </div>

      {/* Options */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}}>
        {options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)}
            style={{padding:"20px",background:"#10101c",border:"1px solid #2a2a3e",borderRadius:"14px",color:"#fff",fontSize:"20px",fontWeight:"700",cursor:"pointer"}}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// TRACE IT — #70
// ═══════════════════════════════════════════
function TraceIt({ chars, onBack, onXPEarned }) {
  const TOTAL = Math.min(chars.length, 10);
  const [questions] = useState(() => [...chars].sort(() => Math.random() - 0.5).slice(0, TOTAL));
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const [done, setDone] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const current = questions[qIdx];

  useEffect(() => { if (!done && current) speakJP(current.char); }, [qIdx, done]);

  const clearCanvas = () => {
    const cv = canvasRef.current; if (!cv) return;
    cv.getContext('2d').clearRect(0, 0, cv.width, cv.height);
    setDrawn(false);
  };

  const getPos = (e, cv) => {
    const r = cv.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - r.left) * (cv.width / r.width), y: (cy - r.top) * (cv.height / r.height) };
  };

  const startDraw = (e) => {
    e.preventDefault();
    const cv = canvasRef.current; if (!cv) return;
    isDrawing.current = true;
    const { x, y } = getPos(e, cv);
    const ctx = cv.getContext('2d');
    ctx.beginPath(); ctx.moveTo(x, y);
  };

  const draw = (e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 8;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const { x, y } = getPos(e, cv);
    ctx.lineTo(x, y); ctx.stroke();
    setDrawn(true);
  };

  const endDraw = (e) => { e.preventDefault(); isDrawing.current = false; };

  const handleResult = (nailed) => {
    if (nailed) { setScore(s => s + 1); playSound('correct'); } else playSound('wrong');
    clearCanvas();
    if (qIdx + 1 >= TOTAL) {
      const finalScore = score + (nailed ? 1 : 0);
      if (onXPEarned) onXPEarned(finalScore * 12);
      setDone(true);
    } else setQIdx(q => q + 1);
  };

  if (done) {
    const totalAttempts = score + wrongAttempts;
    const pct = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 100;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    return (
      <div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:'60px',marginBottom:'16px'}}>{pct >= 80 ? '✍️' : '💪'}</div>
        <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'4px'}}>Trace Complete!</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'20px'}}>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#10b981',fontSize:'24px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px'}}>NAILED</div></div>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#6366f1',fontSize:'24px',fontWeight:'900'}}>{elapsed}s</div><div style={{color:'#555',fontSize:'10px'}}>TIME</div></div>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#f59e0b',fontSize:'24px',fontWeight:'900'}}>{pct}%</div><div style={{color:'#555',fontSize:'10px'}}>ACCURACY</div></div>
        </div>
        <div style={{color:'#f59e0b',fontSize:'14px',fontWeight:'700',marginBottom:'24px'}}>{'⭐ +' + (score * 12) + ' XP'}</div>
        <button onClick={onBack} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer'}}>← Back to Games</button>
      </div>
    );
  }

  return (
    <div style={{padding:'10px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'12px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px'}}>{qIdx + 1}/{TOTAL}</div>
        <div style={{color:'#10b981',fontSize:'13px',fontWeight:'700'}}>{score} nailed</div>
      </div>
      <div style={{textAlign:'center',marginBottom:'8px'}}>
        <div style={{color:'#888',fontSize:'11px',fontWeight:'700',letterSpacing:'2px',marginBottom:'6px'}}>TRACE THIS CHARACTER</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'16px'}}>
          <div style={{color:'#fff',fontSize:'64px',lineHeight:1}}>{current.char}</div>
          <button onClick={()=>speakJP(current.char)} style={{background:'none',border:'none',fontSize:'22px',cursor:'pointer'}}>🔊</button>
          <div style={{color:'#555',fontSize:'16px',fontWeight:'700'}}>{current.romaji}</div>
        </div>
      </div>
      <div style={{position:'relative',marginBottom:'12px',borderRadius:'14px',overflow:'hidden',border:'1px solid #2a2a3e'}}>
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',zIndex:1}}>
          <div style={{fontSize:'110px',color:'rgba(255,255,255,0.05)',lineHeight:1,userSelect:'none'}}>{current.char}</div>
        </div>
        <canvas ref={canvasRef} width={320} height={200}
          style={{display:'block',width:'100%',height:'200px',background:'#0a0a14',touchAction:'none',position:'relative',zIndex:2,cursor:'crosshair'}}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}/>
      </div>
      <div style={{display:'flex',gap:'10px'}}>
        <button onClick={clearCanvas} style={{padding:'12px 16px',background:'#10101c',border:'1px solid #2a2a3e',borderRadius:'10px',color:'#666',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>Clear</button>
        <button onClick={()=>handleResult(false)} style={{flex:1,padding:'14px',background:'#1a0a0a',border:'1px solid #ef4444',borderRadius:'10px',color:'#ef4444',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>Still Learning</button>
        <button onClick={()=>handleResult(true)} disabled={!drawn}
          style={{flex:1,padding:'14px',background:drawn?'linear-gradient(135deg,#10b981,#059669)':'#1a1a2e',border:'none',borderRadius:'10px',color:drawn?'#fff':'#444',fontSize:'13px',fontWeight:'900',cursor:drawn?'pointer':'default',transition:'all 0.2s'}}>
          Nailed It ✓
        </button>
      </div>
      <div style={{height:'4px',background:'#1e1e30',borderRadius:'2px',marginTop:'12px'}}>
        <div style={{height:'100%',width:(qIdx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// KANA RAIN — #71
// ═══════════════════════════════════════════
function KanaRain({ chars, onBack, onXPEarned }) {
  const COLS = 4;
  const [gameState, setGameState] = useState('ready');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [drops, setDrops] = useState([]);
  const [targetRomaji, setTargetRomaji] = useState('');
  const [flash, setFlash] = useState(null);
  const [highScore] = useState(() => { try { return parseInt(localStorage.getItem('nihongo_kanarain_high') || '0'); } catch { return 0; } });
  const dropIdRef = useRef(0);
  const livesRef = useRef(3);
  const scoreRef = useRef(0);
  const xpAwardedRef = useRef(false);

  const makeDrops = () => Array.from({ length: COLS }, (_, col) => ({
    id: dropIdRef.current++,
    ...chars[Math.floor(Math.random() * chars.length)],
    col,
    y: -(10 + col * 8),
    speed: 0.25 + Math.random() * 0.15,
  }));

  const startGame = () => {
    livesRef.current = 3; scoreRef.current = 0;
    const initial = makeDrops();
    setDrops(initial);
    setTargetRomaji(initial[Math.floor(Math.random() * initial.length)].romaji);
    setScore(0); setLives(3); setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setDrops(prev => {
        let fell = false;
        const next = prev.map(d => {
          if (d.y > 100) {
            fell = true;
            return { ...d, ...chars[Math.floor(Math.random() * chars.length)], id: dropIdRef.current++, y: -10 - Math.random() * 20, speed: 0.25 + Math.random() * 0.15 };
          }
          return { ...d, y: d.y + d.speed };
        });
        if (fell) {
          livesRef.current = Math.max(0, livesRef.current - 1);
          setLives(livesRef.current);
          playSound('wrong');
          if (livesRef.current <= 0) {
            try { if (scoreRef.current > highScore) localStorage.setItem('nihongo_kanarain_high', String(scoreRef.current)); } catch {}
            if (!xpAwardedRef.current && onXPEarned) { xpAwardedRef.current = true; onXPEarned(scoreRef.current * 8); }
            setGameState('over');
          }
        }
        return next;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [gameState]);

  const handleTap = (drop) => {
    if (gameState !== 'playing') return;
    if (drop.romaji === targetRomaji) {
      playSound('correct');
      scoreRef.current += 1; setScore(scoreRef.current);
      setFlash({ id: drop.id, type: 'correct' });
      setDrops(prev => {
        const next = prev.map(d => d.id === drop.id
          ? { ...d, ...chars[Math.floor(Math.random() * chars.length)], id: dropIdRef.current++, y: -10, speed: 0.25 + Math.random() * 0.15 }
          : d);
        setTargetRomaji(next[Math.floor(Math.random() * next.length)].romaji);
        return next;
      });
      setTimeout(() => setFlash(null), 250);
    } else {
      playSound('wrong');
      setFlash({ id: drop.id, type: 'wrong' });
      livesRef.current = Math.max(0, livesRef.current - 1);
      setLives(livesRef.current);
      if (livesRef.current <= 0) {
        try { if (scoreRef.current > highScore) localStorage.setItem('nihongo_kanarain_high', String(scoreRef.current)); } catch {}
        if (!xpAwardedRef.current && onXPEarned) { xpAwardedRef.current = true; onXPEarned(scoreRef.current * 8); }
        setTimeout(() => setGameState('over'), 400);
      }
      setTimeout(() => setFlash(null), 250);
    }
  };

  if (gameState === 'ready') return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'60px',marginBottom:'16px'}}>🌧️</div>
      <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'8px'}}>Kana Rain</div>
      <div style={{color:'#888',fontSize:'13px',marginBottom:'8px'}}>Tap the falling character that matches the romaji</div>
      <div style={{color:'#f59e0b',fontSize:'12px',marginBottom:'24px'}}>High Score: {highScore}</div>
      <button onClick={startGame} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'18px',fontWeight:'900',cursor:'pointer',marginBottom:'12px'}}>Start</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>← Back</button>
    </div>
  );

  if (gameState === 'over') {
    const isNew = score > highScore;
    return (
      <div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:'60px',marginBottom:'16px'}}>💧</div>
        <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'4px'}}>Washed Out!</div>
        {isNew && <div style={{color:'#f59e0b',fontSize:'14px',fontWeight:'700',marginBottom:'8px'}}>🎉 NEW HIGH SCORE!</div>}
        <div style={{background:'#10101c',borderRadius:'12px',padding:'20px',marginBottom:'20px'}}>
          <div style={{color:'#6366f1',fontSize:'48px',fontWeight:'900'}}>{score}</div>
          <div style={{color:'#555',fontSize:'12px'}}>CAUGHT</div>
        </div>
        <div style={{color:'#f59e0b',fontSize:'14px',fontWeight:'700',marginBottom:'24px'}}>{'⭐ +' + (score * 8) + ' XP'}</div>
        <button onClick={startGame} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
        <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
      </div>
    );
  }

  const colW = 100 / COLS;
  return (
    <div style={{position:'relative',height:'calc(100vh - 160px)',minHeight:'480px',overflow:'hidden',background:'#06060f',borderRadius:'14px',userSelect:'none',WebkitUserSelect:'none'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,padding:'10px 16px',background:'rgba(6,6,15,0.92)',zIndex:10,display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #1e1e30'}}>
        <div style={{color:'#6366f1',fontSize:'15px',fontWeight:'900'}}>{score}</div>
        <div style={{textAlign:'center'}}>
          <div style={{color:'#555',fontSize:'9px',fontWeight:'700',letterSpacing:'2px'}}>TAP</div>
          <div style={{color:'#fff',fontSize:'26px',fontWeight:'900',lineHeight:1}}>{targetRomaji}</div>
        </div>
        <div style={{fontSize:'16px',letterSpacing:'2px'}}>{'❤️'.repeat(lives)}{'🖤'.repeat(Math.max(0, 3 - lives))}</div>
      </div>
      {drops.map(drop => {
        const isFlash = flash?.id === drop.id;
        return (
          <div key={drop.id} onClick={() => handleTap(drop)}
            style={{position:'absolute',left:(drop.col * colW + colW / 2) + '%',top:drop.y + '%',transform:'translateX(-50%)',
              background:isFlash ? (flash.type === 'correct' ? '#0a2a1a' : '#2a0a0a') : '#13131e',
              border:'2px solid ' + (isFlash ? (flash.type === 'correct' ? '#10b981' : '#ef4444') : '#2a2a3e'),
              borderRadius:'12px',padding:'10px 14px',cursor:'pointer',fontSize:'26px',color:'#fff',
              transition:'background 0.15s,border-color 0.15s',zIndex:5,lineHeight:1}}>
            {drop.char}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════
// MIRROR MATCH — #72
// ═══════════════════════════════════════════
function MirrorMatch({ hiraChars, kataChars, onBack, onXPEarned }) {
  const pairs = hiraChars.filter(h => kataChars.some(k => k.romaji === h.romaji));
  const TOTAL = Math.min(pairs.length, 10);
  const [questions] = useState(() => [...pairs].sort(() => Math.random() - 0.5).slice(0, TOTAL).map(h => h.romaji));
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selHira, setSelHira] = useState(null);
  const [selKata, setSelKata] = useState(null);
  const [flash, setFlash] = useState(null);
  const [done, setDone] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [startTime] = useState(Date.now());

  const buildOpts = (pool, romaji, n = 4) => {
    const correct = pool.find(c => c.romaji === romaji);
    const wrongs = pool.filter(c => c.romaji !== romaji).sort(() => Math.random() - 0.5).slice(0, n - 1);
    return [correct, ...wrongs].sort(() => Math.random() - 0.5);
  };

  const [hiraOpts] = useState(() => questions.map(r => buildOpts(hiraChars, r)));
  const [kataOpts] = useState(() => questions.map(r => buildOpts(kataChars, r)));

  useEffect(() => {
    if (selHira === null || selKata === null || flash) return;
    const romaji = questions[qIdx];
    if (selHira.romaji === romaji && selKata.romaji === romaji) {
      playSound('correct'); setFlash('correct'); setScore(s => s + 1);
      setTimeout(() => {
        setFlash(null); setSelHira(null); setSelKata(null);
        if (qIdx + 1 >= TOTAL) {
          const finalScore = score + 1;
          const pct = Math.round((finalScore / TOTAL) * 100);
          if (onXPEarned) onXPEarned(finalScore * 15 + (pct === 100 ? 50 : 0));
          setDone(true);
        } else setQIdx(q => q + 1);
      }, 600);
    } else {
      playSound('wrong'); setFlash('wrong'); setWrongAttempts(w => w + 1); setWrongAttempts(w => w + 1);
      setTimeout(() => { setFlash(null); setSelHira(null); setSelKata(null); }, 700);
    }
  }, [selHira, selKata]);

  if (done) {
    const totalAttempts = score + wrongAttempts;
    const pct = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 100;
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    return (
      <div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:'60px',marginBottom:'16px'}}>{pct === 100 ? '🏆' : pct >= 70 ? '✅' : '💪'}</div>
        <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'4px'}}>Mirror Match Done!</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'20px'}}>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#10b981',fontSize:'24px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px'}}>SCORE</div></div>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#6366f1',fontSize:'24px',fontWeight:'900'}}>{elapsed}s</div><div style={{color:'#555',fontSize:'10px'}}>TIME</div></div>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#f59e0b',fontSize:'24px',fontWeight:'900'}}>{pct}%</div><div style={{color:'#555',fontSize:'10px'}}>ACC</div></div>
        </div>
        <div style={{color:'#f59e0b',fontSize:'14px',fontWeight:'700',marginBottom:'24px'}}>{'⭐ +' + (score * 15 + (pct === 100 ? 50 : 0)) + ' XP'}</div>
        <button onClick={onBack} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer'}}>← Back to Games</button>
      </div>
    );
  }

  const romaji = questions[qIdx];
  const hOpts = hiraOpts[qIdx] || [];
  const kOpts = kataOpts[qIdx] || [];
  const borderColor = flash === 'correct' ? '#10b981' : flash === 'wrong' ? '#ef4444' : '#2a2a3e';

  return (
    <div style={{padding:'10px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'12px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px'}}>{qIdx + 1}/{TOTAL}</div>
        <div style={{color:'#10b981',fontSize:'13px',fontWeight:'700'}}>{score} matched</div>
      </div>
      <div style={{textAlign:'center',padding:'16px',background:'#10101c',borderRadius:'14px',marginBottom:'14px',border:'1px solid ' + borderColor,transition:'border-color 0.2s'}}>
        <div style={{color:'#888',fontSize:'10px',fontWeight:'700',letterSpacing:'2px',marginBottom:'4px'}}>FIND BOTH SCRIPTS FOR</div>
        <div style={{color:'#fff',fontSize:'44px',fontWeight:'900',letterSpacing:'6px'}}>{romaji}</div>
        <div style={{color:'#555',fontSize:'11px',marginTop:'4px'}}>Select one from each column</div>
      </div>
      <div style={{display:'flex',gap:'10px'}}>
        <div style={{flex:1}}>
          <div style={{color:'#f59e0b',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'8px',textAlign:'center'}}>HIRAGANA</div>
          {hOpts.map((opt, i) => {
            const sel = selHira?.char === opt.char;
            const ok = flash === 'correct' && sel; const bad = flash === 'wrong' && sel;
            return (
              <button key={i} onClick={() => { if (!flash) setSelHira(opt); }}
                style={{width:'100%',padding:'14px',marginBottom:'8px',background:ok?'#0a2a1a':bad?'#2a0a0a':sel?'#1a1a2e':'#0f0f1a',border:'1px solid '+(ok?'#10b981':bad?'#ef4444':sel?'#f59e0b':'#1e1e35'),borderRadius:'10px',color:'#fff',fontSize:'26px',cursor:'pointer',transition:'all 0.15s'}}>
                {opt.char}
              </button>
            );
          })}
        </div>
        <div style={{flex:1}}>
          <div style={{color:'#a855f7',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'8px',textAlign:'center'}}>KATAKANA</div>
          {kOpts.map((opt, i) => {
            const sel = selKata?.char === opt.char;
            const ok = flash === 'correct' && sel; const bad = flash === 'wrong' && sel;
            return (
              <button key={i} onClick={() => { if (!flash) setSelKata(opt); }}
                style={{width:'100%',padding:'14px',marginBottom:'8px',background:ok?'#0a2a1a':bad?'#2a0a0a':sel?'#1a1a2e':'#0f0f1a',border:'1px solid '+(ok?'#10b981':bad?'#ef4444':sel?'#a855f7':'#1e1e35'),borderRadius:'10px',color:'#fff',fontSize:'26px',cursor:'pointer',transition:'all 0.15s'}}>
                {opt.char}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{height:'4px',background:'#1e1e30',borderRadius:'2px',marginTop:'8px'}}>
        <div style={{height:'100%',width:(qIdx/TOTAL*100)+'%',background:'linear-gradient(90deg,#f59e0b,#a855f7)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// CHARACTER QUIZ BUILDERS
// ═══════════════════════════════════════════

// Quiz 1 — 20 questions: today's hiragana × 2 types + katakana × 2 types
// ═══════════════════════════════════════════
// WORDS & PHRASES — shared data util
// ═══════════════════════════════════════════
function getPhrases(allDays, currentDay) {
  return allDays
    .filter(d => d.day <= currentDay.day)
    .flatMap(d => (d.phrases || []).map(p => ({ ...p, dayNum: d.day })));
}

// ═══════════════════════════════════════════
// MASTERY SYSTEM — per-character accuracy tiers
// ═══════════════════════════════════════════
function getCharMastery(char) {
  try {
    const raw = localStorage.getItem('nihongo_char_acc_' + char);
    if (!raw) return { level: 0, label: 'New', color: '#888888' };
    const { correct, attempts } = JSON.parse(raw);
    const acc = attempts > 0 ? (correct / attempts) * 100 : 0;
    if (attempts >= 10000 && acc >= 98) return { level: 8, label: '神 Kami',       color: '#fbbf24' };
    if (attempts >= 5000  && acc >= 97) return { level: 7, label: '達人 Tatsujin', color: '#a855f7' };
    if (attempts >= 2500  && acc >= 95) return { level: 6, label: '師範 Shihan',   color: '#6366f1' };
    if (attempts >= 1500  && acc >= 95) return { level: 5, label: 'Master',        color: '#f59e0b' };
    if (attempts >= 500   && acc >= 90) return { level: 4, label: 'Expert',        color: '#10b981' };
    if (attempts >= 200   && acc >= 80) return { level: 3, label: 'Confident',     color: '#10b981' };
    if (attempts >= 75    && acc >= 60) return { level: 2, label: 'Familiar',      color: '#f59e0b' };
    if (attempts >= 25)                 return { level: 1, label: 'Learning',      color: '#6366f1' };
    return { level: 0, label: 'New', color: '#888888' };
  } catch { return { level: 0, label: 'New', color: '#888888' }; }
}

function CharAccuracyBar({ char }) {
  const m = getCharMastery(char);
  return (
    <div style={{
      position:'absolute',top:0,left:0,right:0,
      height:'18px',
      background:m.color+'66',
      borderBottom:'1px solid '+m.color+'99',
      borderRadius:'10px 10px 0 0',
      display:'flex',alignItems:'center',justifyContent:'center',
    }}>
      <span style={{fontSize:'8px',color:'#fff',fontWeight:'700',letterSpacing:'0.5px'}}>{m.label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════
// PHRASE AUDIO MATCH
// ═══════════════════════════════════════════
function PhraseAudioMatch({ phrases, onBack, onXPEarned, totalRounds = 3, endless = false }) {
  const PAIRS = 4;
  const [round, setRound] = useState(1);
  const [roundResults, setRoundResults] = useState([]);
  const [done, setDone] = useState(false);
  const handleRoundComplete = (accuracy, elapsed, attempts) => {
    const nr = [...roundResults, { accuracy, elapsed, attempts }];
    setRoundResults(nr);
    if (!endless && round >= totalRounds) {
      const xp = nr.reduce((s,r) => s + PAIRS*8 + (r.accuracy===100?40:0), 0);
      if (onXPEarned) onXPEarned(xp);
      setDone(true);
    } else setRound(r => r+1);
  };
  const handleEndSession = () => {
    const xp = roundResults.reduce((s,r) => s + PAIRS*8 + (r.accuracy===100?40:0), 0);
    if (onXPEarned) onXPEarned(xp);
    setDone(true);
  };
  if (done) {
    const avgAcc = roundResults.length ? Math.round(roundResults.reduce((s,r)=>s+r.accuracy,0)/roundResults.length) : 0;
    const xp = roundResults.reduce((s,r) => s + PAIRS*8 + (r.accuracy===100?40:0), 0);
    return (
      <div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:'60px',marginBottom:'16px'}}>{avgAcc===100?'🏆':'✅'}</div>
        <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'20px'}}>Session Complete!</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'20px'}}>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#6366f1',fontSize:'24px',fontWeight:'900'}}>{roundResults.length}</div><div style={{color:'#555',fontSize:'10px'}}>ROUNDS</div></div>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#10b981',fontSize:'24px',fontWeight:'900'}}>{avgAcc}%</div><div style={{color:'#555',fontSize:'10px'}}>ACCURACY</div></div>
          <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#f59e0b',fontSize:'24px',fontWeight:'900'}}>+{xp}</div><div style={{color:'#555',fontSize:'10px'}}>XP</div></div>
        </div>
        <button onClick={onBack} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
        <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
      </div>
    );
  }
  return <PhraseAudioRound key={round} phrases={phrases} pairs={PAIRS} round={round} totalRounds={totalRounds} endless={endless}
    onComplete={handleRoundComplete} onBack={onBack} onEndSession={endless?handleEndSession:null}/>;
}

function PhraseAudioRound({ phrases, pairs, round, totalRounds, endless, onComplete, onBack, onEndSession }) {
  const [pool, setPool] = useState(()=>[...phrases].sort(()=>Math.random()-0.5).slice(0,Math.min(pairs,phrases.length)));
  const [rightOrder] = useState(()=>pool.map((_,i)=>i).sort(()=>Math.random()-0.5));
  const [matched, setMatched] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const speak = (phrase) => {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(phrase.jp||phrase.romaji);
    u.lang='ja-JP'; u.rate=0.85;
    const v = window.speechSynthesis.getVoices().find(v=>v.lang.startsWith('ja'));
    if(v) u.voice=v;
    window.speechSynthesis.speak(u);
  };
  const tryMatch = (li,ri) => {
    setAttempts(a=>a+1);
    if(li===ri){playSound('correct');setMatched(m=>({...m,[li]:true}));setSelectedLeft(null);setSelectedRight(null);}
    else{playSound('wrong');setWrong({l:li,r:ri});setTimeout(()=>{setWrong(null);setSelectedLeft(null);setSelectedRight(null);},800);}
  };
  const allMatched = Object.keys(matched).length===pool.length;
  const elapsed = allMatched?Math.round((Date.now()-startTime)/1000):0;
  const accuracy = allMatched&&attempts>0?Math.round((pool.length/attempts)*100):0;
  const isLast = !endless&&round>=totalRounds;
  if(allMatched) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'50px',marginBottom:'12px'}}>{accuracy===100?'🏆':'✅'}</div>
      <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'4px'}}>{endless?'ENDLESS — Round '+round:'ROUND '+round+' / '+totalRounds}</div>
      <div style={{color:'#fff',fontSize:'20px',fontWeight:'900',marginBottom:'4px'}}>{accuracy===100?'Perfect!':'Round Complete!'}</div>
      <div style={{display:'flex',gap:'10px',justifyContent:'center',marginBottom:'20px'}}>
        <div style={{background:'#10101c',borderRadius:'10px',padding:'12px 16px'}}><div style={{color:'#6366f1',fontSize:'20px',fontWeight:'900'}}>{elapsed}s</div><div style={{color:'#555',fontSize:'9px'}}>TIME</div></div>
        <div style={{background:'#10101c',borderRadius:'10px',padding:'12px 16px'}}><div style={{color:'#10b981',fontSize:'20px',fontWeight:'900'}}>{accuracy}%</div><div style={{color:'#555',fontSize:'9px'}}>ACCURACY</div></div>
      </div>
      <button onClick={()=>onComplete(accuracy,elapsed,attempts)} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'8px'}}>
        {endless?'Next Round →':isLast?'See Results →':'Round '+(round+1)+' →'}
      </button>
      {endless&&onEndSession&&<button onClick={onEndSession} style={{width:'100%',padding:'12px',background:'none',border:'1px solid #ef4444',borderRadius:'12px',color:'#ef4444',fontSize:'13px',fontWeight:'700',cursor:'pointer',marginBottom:'8px'}}>End Session</button>}
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );
  return (
    <div style={{padding:'10px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700'}}>{endless?'ENDLESS':'ROUND '+round+'/'+totalRounds}</div>
        <div style={{color:'#6366f1',fontSize:'13px',fontWeight:'700'}}>{Object.keys(matched).length}/{pool.length}</div>
      </div>
      <div style={{color:'#aaa',fontSize:'12px',marginBottom:'12px',textAlign:'center'}}>Tap 🔊 to hear — match to meaning</div>
      <div style={{display:'flex',gap:'10px'}}>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:'8px'}}>
          <div style={{color:'#a855f7',fontSize:'10px',fontWeight:'700',textAlign:'center',marginBottom:'4px'}}>LISTEN</div>
          {pool.map((phrase,idx)=>{
            const isMatched=matched[idx];const isSel=selectedLeft===idx;const isWrong=wrong?.l===idx;
            let bg='#0f0f1a',border='#1e1e35';
            if(isMatched){bg='#0a2a1a';border='#10b981';}else if(isWrong){bg='#2a0a0a';border='#ef4444';}else if(isSel){bg='#1a1a2e';border='#6366f1';}
            return <button key={'l'+idx} onClick={()=>{if(!isMatched){speak(phrase);setSelectedLeft(idx);if(selectedRight!==null)tryMatch(idx,selectedRight);}}}
              style={{background:bg,border:'1px solid '+border,borderRadius:'10px',padding:'14px',cursor:isMatched?'default':'pointer',height:'60px',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',transition:'all 0.2s'}}>
              <span style={{fontSize:'18px'}}>🔊</span>
              {isMatched&&<span style={{color:'#10b981',fontSize:'10px'}}>{phrase.romaji}</span>}
            </button>;
          })}
        </div>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:'8px'}}>
          <div style={{color:'#f59e0b',fontSize:'10px',fontWeight:'700',textAlign:'center',marginBottom:'4px'}}>MEANING</div>
          {rightOrder.map(idx=>{
            const phrase=pool[idx];const isMatched=matched[idx];const isSel=selectedRight===idx;const isWrong=wrong?.r===idx;
            let bg='#0f0f1a',border='#1e1e35',color='#888';
            if(isMatched){bg='#0a2a1a';border='#10b981';color='#10b981';}else if(isWrong){bg='#2a0a0a';border='#ef4444';color='#ef4444';}else if(isSel){bg='#1a1a2e';border='#6366f1';color='#fff';}
            return <button key={'r'+idx} onClick={()=>{if(!isMatched){setSelectedRight(idx);if(selectedLeft!==null)tryMatch(selectedLeft,idx);}}}
              style={{background:bg,border:'1px solid '+border,borderRadius:'10px',padding:'8px',cursor:isMatched?'default':'pointer',height:'60px',display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',color,fontSize:'11px',fontWeight:'600',lineHeight:'1.3',transition:'all 0.2s'}}>
              {phrase.en.split(' — ')[0]}
            </button>;
          })}
        </div>
      </div>
      <div style={{height:'4px',background:'#1e1e30',borderRadius:'2px',marginTop:'12px'}}>
        <div style={{height:'100%',width:(Object.keys(matched).length/pool.length*100)+'%',background:'linear-gradient(90deg,#a855f7,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// FLASH TRANSLATE — see Japanese, type English
// ═══════════════════════════════════════════
function FlashTranslate({ phrases, totalRounds=1, endless=false, onBack, onXPEarned }) {
  const PER_ROUND = 10;
  const audioRef = useRef({});
  const speakThrottled = (text) => {
    const now = Date.now();
    if (audioRef.current[text] && now - audioRef.current[text] < 5000) return;
    audioRef.current[text] = now;
    speakJP(text);
  };

  const makePool = () => [...phrases].sort(()=>Math.random()-0.5).slice(0, Math.min(phrases.length, PER_ROUND));

  const [round, setRound]       = useState(1);
  const [pool, setPool]         = useState(makePool);
  const [idx, setIdx]           = useState(0);
  const [score, setScore]       = useState(0);
  const [totalXP, setTotalXP]   = useState(0);
  const [input, setInput]       = useState('');
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [roundDone, setRoundDone] = useState(false);
  const [sessionDone, setSessionDone] = useState(false);

  const TOTAL = pool.length;

  // Speak when question changes
  useEffect(() => {
    if (!roundDone && !sessionDone && pool[idx]) {
      speakThrottled(pool[idx].jp);
    }
  }, [idx, round, roundDone]);

  const checkAnswer = (ans, phrase) => {
    const clean = s => s.toLowerCase().trim().split(' — ')[0].split(' / ')[0];
    const correct = clean(phrase.en);
    const given   = clean(ans);
    if (!given) return false;
    // exact or contains full correct
    if (given === correct) return true;
    if (correct.includes(given) && given.length >= 4) return true;
    if (given.includes(correct)) return true;
    // key word match — first meaningful word of correct answer
    const key = correct.split(/[s,/]+/).filter(w => w.length > 2)[0] || correct;
    return given.includes(key);
  };

  const submit = () => {
    if (!input.trim() || feedback) return;
    const phrase = pool[idx];
    const ok = checkAnswer(input, phrase);
    const newScore = score + (ok ? 1 : 0);
    if (ok) { playSound('correct'); } else { playSound('wrong'); }
    setFeedback(ok ? 'correct' : 'wrong');
    setScore(newScore);

    setTimeout(() => {
      setFeedback(null);
      setInput('');
      if (idx + 1 >= TOTAL) {
        // Round over
        const roundXP = newScore * 15;
        const newTotalXP = totalXP + roundXP;
        setTotalXP(newTotalXP);
        if (round >= totalRounds && !endless) {
          if (onXPEarned) onXPEarned(newTotalXP);
          setSessionDone(true);
        } else {
          setRoundDone(true);
        }
      } else {
        setIdx(i => i + 1);
      }
    }, 1200);
  };

  const nextRound = () => {
    setPool(makePool());
    setIdx(0);
    setScore(0);
    setFeedback(null);
    setInput('');
    setRound(r => r + 1);
    setRoundDone(false);
  };

  const endSession = () => {
    if (onXPEarned) onXPEarned(totalXP);
    setSessionDone(true);
  };

  // ── Session done screen ──
  if (sessionDone) return (
    <div style={{padding:'24px', textAlign:'center'}}>
      <div style={{fontSize:'56px', marginBottom:'12px'}}>{totalXP >= 100 ? '🏆' : '✅'}</div>
      <div style={{color:'#fff', fontSize:'22px', fontWeight:'900', marginBottom:'4px'}}>Flash Translate</div>
      <div style={{color:'#555', fontSize:'13px', marginBottom:'24px'}}>{round} round{round>1?'s':''} complete</div>
      <div style={{display:'flex', gap:'12px', justifyContent:'center', marginBottom:'28px'}}>
        <div style={{background:'#0d0d18', border:'1px solid #1e1e30', borderRadius:'14px', padding:'16px 24px'}}>
          <div style={{color:'#10b981', fontSize:'26px', fontWeight:'900'}}>{score}/{TOTAL}</div>
          <div style={{color:'#555', fontSize:'10px', letterSpacing:'1px', marginTop:'4px'}}>LAST ROUND</div>
        </div>
        <div style={{background:'#0d0d18', border:'1px solid #1e1e30', borderRadius:'14px', padding:'16px 24px'}}>
          <div style={{color:'#f59e0b', fontSize:'26px', fontWeight:'900'}}>+{totalXP}</div>
          <div style={{color:'#555', fontSize:'10px', letterSpacing:'1px', marginTop:'4px'}}>TOTAL XP</div>
        </div>
      </div>
      <button onClick={()=>{setPool(makePool());setIdx(0);setScore(0);setTotalXP(0);setRound(1);setRoundDone(false);setSessionDone(false);setInput('');setFeedback(null);}}
        style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>
        Play Again
      </button>
      <button onClick={onBack}
        style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>
        ← Back to Games
      </button>
    </div>
  );

  // ── Round done screen ──
  if (roundDone) return (
    <div style={{padding:'24px', textAlign:'center'}}>
      <div style={{fontSize:'48px', marginBottom:'12px'}}>{score === TOTAL ? '🔥' : score >= TOTAL*0.7 ? '⭐' : '💪'}</div>
      <div style={{color:'#fff', fontSize:'20px', fontWeight:'900', marginBottom:'4px'}}>Round {round} done</div>
      <div style={{color:'#555', fontSize:'13px', marginBottom:'24px'}}>{endless ? 'Endless mode' : `Round ${round} of ${totalRounds}`}</div>
      <div style={{display:'flex', gap:'12px', justifyContent:'center', marginBottom:'28px'}}>
        <div style={{background:'#0d0d18', border:'1px solid #1e1e30', borderRadius:'14px', padding:'16px 24px'}}>
          <div style={{color:'#10b981', fontSize:'26px', fontWeight:'900'}}>{score}/{TOTAL}</div>
          <div style={{color:'#555', fontSize:'10px', letterSpacing:'1px', marginTop:'4px'}}>CORRECT</div>
        </div>
        <div style={{background:'#0d0d18', border:'1px solid #1e1e30', borderRadius:'14px', padding:'16px 24px'}}>
          <div style={{color:'#f59e0b', fontSize:'26px', fontWeight:'900'}}>+{score*15}</div>
          <div style={{color:'#555', fontSize:'10px', letterSpacing:'1px', marginTop:'4px'}}>XP THIS ROUND</div>
        </div>
      </div>
      <button onClick={nextRound}
        style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>
        Next Round →
      </button>
      {endless && (
        <button onClick={endSession}
          style={{width:'100%',padding:'14px',background:'none',border:'1px solid #ef4444',borderRadius:'12px',color:'#ef4444',fontSize:'14px',cursor:'pointer',marginBottom:'10px'}}>
          End Session
        </button>
      )}
      <button onClick={onBack}
        style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>
        ← Back to Games
      </button>
    </div>
  );

  const phrase = pool[idx];
  return (
    <div style={{padding:'20px'}}>
      {/* Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:'#555',fontSize:'22px',cursor:'pointer',padding:'0'}}>←</button>
        <div style={{textAlign:'center'}}>
          <div style={{color:'#fff', fontSize:'13px', fontWeight:'700'}}>⚡ Flash Translate</div>
          <div style={{color:'#555', fontSize:'11px'}}>{endless ? 'ENDLESS' : `Round ${round} / ${totalRounds}`}</div>
        </div>
        <div style={{color:'#10b981', fontSize:'12px', fontWeight:'700'}}>{score} ✓</div>
      </div>

      {/* Progress */}
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
        <div style={{color:'#555', fontSize:'11px'}}>{idx+1} / {TOTAL}</div>
      </div>
      <div style={{height:'4px', background:'#1e1e30', borderRadius:'2px', marginBottom:'20px'}}>
        <div style={{height:'100%', width:((idx)/TOTAL*100)+'%', background:'linear-gradient(90deg,#6366f1,#10b981)', borderRadius:'2px', transition:'width 0.3s'}}/>
      </div>

      {/* Card */}
      <div style={{background: feedback==='correct'?'#0a2a1a': feedback==='wrong'?'#1a0a0a':'#0d0d18',
        border:'1px solid '+(feedback==='correct'?'#10b981': feedback==='wrong'?'#ef4444':'#1e1e30'),
        borderRadius:'16px', padding:'32px 20px', textAlign:'center', marginBottom:'20px', transition:'all 0.2s'}}>
        <div style={{color:'#555', fontSize:'11px', fontWeight:'700', letterSpacing:'1px', marginBottom:'12px'}}>TRANSLATE TO ENGLISH</div>
        <button onClick={()=>speakThrottled(phrase.jp)}
          style={{background:'none', border:'none', color:'#6366f1', fontSize:'28px', cursor:'pointer', padding:'0', marginBottom:'8px', display:'block', margin:'0 auto 8px'}}>
          {phrase.jp}
        </button>
        <div style={{color:'#6366f1', fontSize:'14px', marginBottom:'4px'}}>{phrase.romaji}</div>
        {feedback==='wrong' && (
          <div style={{color:'#ff8888', fontSize:'13px', marginTop:'12px', padding:'8px 12px', background:'#2a0a0a', borderRadius:'8px'}}>
            ✗ {phrase.en.split(' — ')[0]}
          </div>
        )}
        {feedback==='correct' && (
          <div style={{color:'#10b981', fontSize:'13px', marginTop:'12px'}}>✓ Correct!</div>
        )}
      </div>

      {/* Input */}
      <input value={input} onChange={e=>setInput(e.target.value)}
        onKeyDown={e=>e.key==='Enter'&&submit()}
        placeholder="Type the English meaning..."
        disabled={!!feedback}
        style={{width:'100%', padding:'16px', background:'#0a0a14', border:'1px solid '+(feedback?'#2a2a3e':'#3a3a4e'),
          borderRadius:'12px', color:'#fff', fontSize:'16px', marginBottom:'12px',
          boxSizing:'border-box', outline:'none', opacity: feedback ? 0.5 : 1}}/>
      <button onClick={submit} disabled={!!feedback || !input.trim()}
        style={{width:'100%', padding:'16px', background: (feedback||!input.trim())?'#1e1e30':'linear-gradient(135deg,#6366f1,#4f46e5)',
          border:'none', borderRadius:'12px', color: (feedback||!input.trim())?'#555':'#fff',
          fontSize:'16px', fontWeight:'900', cursor: (feedback||!input.trim())?'default':'pointer'}}>
        Submit →
      </button>
    </div>
  );
}
// ═══════════════════════════════════════════
// WORD BUILDER — given English, type romaji
// ═══════════════════════════════════════════
function WordBuilder({ phrases, onBack, onXPEarned }) {
  const TOTAL = Math.min(phrases.length, 10);
  const [pool, setPool] = useState(()=>[...phrases].sort(()=>Math.random()-0.5).slice(0,TOTAL));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const submit = () => {
    if(!input.trim()||feedback) return;
    const phrase=pool[idx];
    const ans=input.trim().toLowerCase().replace(/s+/g,' ');
    const correct=phrase.romaji.toLowerCase();
    const ok=ans===correct||correct.startsWith(ans);
    if(ok){setScore(s=>s+1);setFeedback('correct');playSound('correct');}
    else{setFeedback('wrong');playSound('wrong');}
    setTimeout(()=>{
      setFeedback(null);setInput('');setShowHint(false);
      if(idx+1>=TOTAL){if(onXPEarned)onXPEarned(score*12);setDone(true);}
      else setIdx(i=>i+1);
    },900);
  };
  if(done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'60px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':'✅'}</div>
      <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'8px'}}>Word Builder Done!</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'24px'}}>
        <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#10b981',fontSize:'24px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#f59e0b',fontSize:'24px',fontWeight:'900'}}>+{score*12}</div><div style={{color:'#555',fontSize:'10px'}}>XP</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );
  const phrase=pool[idx];
  return (
    <div style={{padding:'20px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1}/{TOTAL}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} correct</div>
      </div>
      <div style={{background:feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#2a0a0a':'#10101c',border:'1px solid '+(feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e'),borderRadius:'16px',padding:'28px 20px',textAlign:'center',marginBottom:'20px',transition:'all 0.2s'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'8px'}}>TYPE THE ROMAJI FOR</div>
        <div style={{fontSize:'20px',color:'#fff',fontWeight:'700',marginBottom:'4px'}}>{phrase.en.split(' — ')[0]}</div>
        {showHint&&<div style={{fontSize:'13px',color:'#6366f1',marginTop:'8px'}}>Hint: {phrase.jp}</div>}
        {feedback==='wrong'&&<div style={{fontSize:'13px',color:'#ef4444',marginTop:'8px'}}>Answer: {phrase.romaji}</div>}
      </div>
      <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}
        placeholder="Type romaji..." autoFocus
        style={{width:'100%',padding:'16px',background:'#0a0a14',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#fff',fontSize:'16px',marginBottom:'8px',boxSizing:'border-box'}}/>
      <div style={{display:'flex',gap:'8px'}}>
        <button onClick={()=>setShowHint(true)} style={{flex:1,padding:'12px',background:'none',border:'1px solid #2a2a3e',borderRadius:'10px',color:'#555',fontSize:'13px',cursor:'pointer'}}>💡 Hint</button>
        <button onClick={submit} style={{flex:2,padding:'12px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'10px',color:'#fff',fontSize:'15px',fontWeight:'900',cursor:'pointer'}}>Submit →</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// PHRASE COMPLETE — fill the missing word (MC)
// ═══════════════════════════════════════════
function PhraseComplete({ phrases, onBack, onXPEarned }) {
  const TOTAL = Math.min(phrases.length, 8);
  const [pool, setPool] = useState(()=>[...phrases].sort(()=>Math.random()-0.5).slice(0,TOTAL));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);

  const [questions] = useState(()=>pool.map((phrase,i)=>{
    const words=phrase.en.split(' — ')[0].split(' ');
    const blankIdx=Math.floor(Math.random()*words.length);
    const answer=words[blankIdx];
    const blanked=words.map((w,j)=>j===blankIdx?'_____':w).join(' ');
    const others=pool.filter((_,k)=>k!==i);
    const wrongs=shuffle(others.map(p=>p.en.split(' ')[0])).filter(w=>w!==answer).slice(0,3);
    return {blanked,answer,options:shuffle([answer,...wrongs]),romaji:phrase.romaji};
  }));

  const pick = (opt) => {
    if(answered) return;
    setSelected(opt);setAnswered(true);
    const ok=opt===questions[idx].answer;
    if(ok){setScore(s=>s+1);playSound('correct');}else playSound('wrong');
    setTimeout(()=>{
      setSelected(null);setAnswered(false);
      if(idx+1>=TOTAL){if(onXPEarned)onXPEarned(score*8);setDone(true);}
      else setIdx(i=>i+1);
    },900);
  };

  if(done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'60px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':'✅'}</div>
      <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'8px'}}>Phrase Complete Done!</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'24px'}}>
        <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#10b981',fontSize:'24px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#f59e0b',fontSize:'24px',fontWeight:'900'}}>+{score*8}</div><div style={{color:'#555',fontSize:'10px'}}>XP</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );
  const q=questions[idx];
  return (
    <div style={{padding:'20px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1}/{TOTAL}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} correct</div>
      </div>
      <div style={{background:'#10101c',border:'1px solid #2a2a3e',borderRadius:'16px',padding:'24px',textAlign:'center',marginBottom:'20px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'12px'}}>FILL IN THE BLANK</div>
        <div style={{color:'#fff',fontSize:'18px',fontWeight:'700',lineHeight:'1.6'}}>{q.blanked}</div>
        <div style={{color:'#6366f1',fontSize:'13px',marginTop:'8px'}}>{q.romaji}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
        {q.options.map(opt=>{
          const isSel=selected===opt;
          const isCorrect=answered&&opt===q.answer;
          const isWrong=answered&&isSel&&opt!==q.answer;
          let bg='#0a0a14',border='#2a2a3e',color='#ccc';
          if(isCorrect){bg='#0a2a1a';border='#10b981';color='#10b981';}
          else if(isWrong){bg='#2a0a0a';border='#ef4444';color='#ef4444';}
          else if(isSel){bg='#1a1a2e';border='#6366f1';color='#fff';}
          return <button key={opt} onClick={()=>pick(opt)}
            style={{padding:'14px 16px',background:bg,border:'1px solid '+border,borderRadius:'12px',color,fontSize:'15px',fontWeight:'600',cursor:'pointer',textAlign:'left',transition:'all 0.2s'}}>
            {opt}
          </button>;
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// VOCAB SPEED ROUND — rapid fire EN → JP romaji
// ═══════════════════════════════════════════
function VocabSpeedRound({ phrases, onBack, onXPEarned }) {
  const TIME_PER_Q = 8;
  const TOTAL = Math.min(phrases.length, 10);
  const [pool, setPool] = useState(()=>[...phrases].sort(()=>Math.random()-0.5).slice(0,TOTAL));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);
  const answeredRef = useRef(false);

  const [questions] = useState(()=>pool.map(p=>{
    const answer=p.romaji;
    const wrongs=shuffle(pool.filter(x=>x.romaji!==answer)).slice(0,3).map(x=>x.romaji);
    return {phrase:p,options:shuffle([answer,...wrongs])};
  }));

  const advance = useCallback((ok) => {
    answeredRef.current=false;
    setSelected(null);setAnswered(false);setTimeLeft(TIME_PER_Q);
    setIdx(i=>{
      const next=i+1;
      if(next>=TOTAL){setDone(true);}
      return next;
    });
  },[TOTAL]);

  useEffect(()=>{
    if(answered||done) return;
    answeredRef.current=false;
    timerRef.current=setInterval(()=>{
      setTimeLeft(t=>{
        if(t<=1){
          clearInterval(timerRef.current);
          if(!answeredRef.current){answeredRef.current=true;playSound('wrong');setTimeout(()=>advance(false),600);}
          return 0;
        }
        return t-1;
      });
    },1000);
    return ()=>clearInterval(timerRef.current);
  },[idx,answered,done]);

  const pick = (opt) => {
    if(answered||answeredRef.current) return;
    answeredRef.current=true;
    clearInterval(timerRef.current);
    setSelected(opt);setAnswered(true);
    const ok=opt===questions[Math.min(idx,TOTAL-1)].phrase.romaji;
    if(ok){setScore(s=>s+1);playSound('correct');}else playSound('wrong');
    if(ok&&idx+1>=TOTAL){if(onXPEarned)onXPEarned((score+1)*15);setDone(true);return;}
    if(!ok&&idx+1>=TOTAL){if(onXPEarned)onXPEarned(score*15);setDone(true);return;}
    setTimeout(()=>advance(ok),800);
  };

  if(done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'60px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':'✅'}</div>
      <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'8px'}}>Speed Round Complete!</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'24px'}}>
        <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#10b981',fontSize:'24px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'12px',padding:'14px 20px'}}><div style={{color:'#f59e0b',fontSize:'24px',fontWeight:'900'}}>+{score*15}</div><div style={{color:'#555',fontSize:'10px'}}>XP</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'16px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'16px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#666',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );

  const safeIdx=Math.min(idx,TOTAL-1);
  const q=questions[safeIdx];
  const timerPct=(timeLeft/TIME_PER_Q)*100;
  const timerColor=timerPct>60?'#10b981':timerPct>30?'#f59e0b':'#ef4444';
  return (
    <div style={{padding:'20px'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{safeIdx+1}/{TOTAL}</div>
        <div style={{color:timerColor,fontSize:'22px',fontWeight:'900'}}>{timeLeft}s</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'4px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:timerPct+'%',background:timerColor,borderRadius:'2px',transition:'width 1s linear'}}/>
      </div>
      <div style={{background:'#10101c',border:'1px solid #2a2a3e',borderRadius:'16px',padding:'28px 20px',textAlign:'center',marginBottom:'20px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'8px'}}>SAY IN JAPANESE (romaji)</div>
        <div style={{fontSize:'22px',color:'#fff',fontWeight:'700'}}>{q.phrase.en.split(' — ')[0]}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
        {q.options.map(opt=>{
          const isSel=selected===opt;
          const isCorrect=answered&&opt===q.phrase.romaji;
          const isWrong=answered&&isSel&&opt!==q.phrase.romaji;
          let bg='#0a0a14',border='#2a2a3e',color='#ccc';
          if(isCorrect){bg='#0a2a1a';border='#10b981';color='#10b981';}
          else if(isWrong){bg='#2a0a0a';border='#ef4444';color='#ef4444';}
          else if(isSel){bg='#1a1a2e';border='#6366f1';color='#fff';}
          return <button key={opt} onClick={()=>pick(opt)}
            style={{padding:'14px',background:bg,border:'1px solid '+border,borderRadius:'12px',color,fontSize:'15px',fontWeight:'600',cursor:'pointer',transition:'all 0.2s'}}>
            {opt}
          </button>;
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SENTENCE DATABASE — all kana, novel contexts
// minDay = earliest day all vocabulary is covered
// tokens = Japanese tiles shown to player
// romaji = hint text per token
// exp = explanation shown after answering
// ═══════════════════════════════════════════
const SENTENCE_DB = [

  // ═══ DAY 1 ═══ いただきます・ありがとう・すみません・だいじょうぶ・もったいない
  { minDay:1, en:"Excuse me, are you okay?",
    tokens:["すみません","だいじょうぶ","ですか"],
    romaji:["sumimasen","daijoubu","desu ka"],
    exp:"すみません = excuse me / sorry. だいじょうぶ = okay / fine. ですか = question marker." },

  { minDay:1, en:"I'm fine, thank you!",
    tokens:["だいじょうぶ","です","ありがとう"],
    romaji:["daijoubu","desu","arigatou"],
    exp:"だいじょうぶです = I am fine. ありがとう = thank you (casual)." },

  { minDay:1, en:"This is wasteful, isn't it?",
    tokens:["これは","もったいない","ですね"],
    romaji:["kore wa","mottainai","desu ne"],
    exp:"これは = as for this. もったいない = what a waste. ですね = isn't it / right?" },

  { minDay:1, en:"Thank you, I'll eat!",
    tokens:["ありがとう","いただきます"],
    romaji:["arigatou","itadakimasu"],
    exp:"ありがとう = thank you. いただきます = I humbly receive — always said before eating." },

  { minDay:1, en:"Excuse me! Is this okay?",
    tokens:["すみません","これは","だいじょうぶ","ですか"],
    romaji:["sumimasen","kore wa","daijoubu","desu ka"],
    exp:"すみません = excuse me. これは = as for this. だいじょうぶですか = is it okay?" },

  { minDay:1, en:"That IS wasteful, excuse me.",
    tokens:["もったいない","ですよ","すみません"],
    romaji:["mottainai","desu yo","sumimasen"],
    exp:"もったいないですよ = it IS wasteful (よ adds emphasis / conviction). すみません = sorry." },

  { minDay:1, en:"Thank you very much, I'll eat!",
    tokens:["ありがとうございます","いただきます"],
    romaji:["arigatou gozaimasu","itadakimasu"],
    exp:"ありがとうございます = thank you very much (formal). いただきます = I'll eat!" },

  { minDay:1, en:"It's okay! Don't worry.",
    tokens:["だいじょうぶ","ですよ"],
    romaji:["daijoubu","desu yo"],
    exp:"だいじょうぶですよ = it's okay! よ reassures the listener — adds warmth and conviction." },

  // ═══ DAY 2 ═══ いくらですか・どこですか・かんぱい・よろしくおねがいします
  { minDay:2, en:"Excuse me, how much is this?",
    tokens:["すみません","これは","いくらですか"],
    romaji:["sumimasen","kore wa","ikura desu ka"],
    exp:"すみません gets attention. これは = this. いくらですか = how much is it?" },

  { minDay:2, en:"Excuse me, where is the bathroom?",
    tokens:["すみません","トイレは","どこですか"],
    romaji:["sumimasen","toire wa","doko desu ka"],
    exp:"すみません = excuse me. トイレは = as for the bathroom. どこですか = where is it?" },

  { minDay:2, en:"Nice to meet you! Cheers!",
    tokens:["よろしくおねがいします","かんぱい"],
    romaji:["yoroshiku onegaishimasu","kanpai"],
    exp:"よろしくおねがいします = nice to meet you / I'm in your care. かんぱい = cheers!" },

  { minDay:2, en:"Cheers! Is it okay?",
    tokens:["かんぱい","だいじょうぶ","ですか"],
    romaji:["kanpai","daijoubu","desu ka"],
    exp:"かんぱい = cheers! だいじょうぶですか = is it okay? (checking in during a toast)" },

  { minDay:2, en:"How much? Is it okay?",
    tokens:["いくらですか","だいじょうぶ","ですか"],
    romaji:["ikura desu ka","daijoubu","desu ka"],
    exp:"いくらですか = how much? だいじょうぶですか = is it okay? (checking if within budget)" },

  { minDay:2, en:"Thank you very much, nice to meet you!",
    tokens:["ありがとうございます","よろしくおねがいします"],
    romaji:["arigatou gozaimasu","yoroshiku onegaishimasu"],
    exp:"ありがとうございます = thank you very much. よろしくおねがいします = nice to meet you." },

  { minDay:2, en:"Cheers! Thank you very much!",
    tokens:["かんぱい","ありがとうございます"],
    romaji:["kanpai","arigatou gozaimasu"],
    exp:"かんぱい = cheers! ありがとうございます = thank you very much — a warm toast response." },

  { minDay:2, en:"Where is it? Excuse me.",
    tokens:["どこですか","すみません"],
    romaji:["doko desu ka","sumimasen"],
    exp:"どこですか = where is it? すみません = excuse me / sorry to bother you." },

  // ═══ DAY 3 ═══ がんばって・わかりました・ただいま・おかえり
  { minDay:3, en:"Please do your best!",
    tokens:["がんばって","ください"],
    romaji:["ganbatte","kudasai"],
    exp:"がんばって = do your best. ください = please — adds a polite, caring request." },

  { minDay:3, en:"I understand, thank you.",
    tokens:["わかりました","ありがとう"],
    romaji:["wakarimashita","arigatou"],
    exp:"わかりました = I understand / understood. ありがとう = thank you." },

  { minDay:3, en:"I'm home! Welcome back!",
    tokens:["ただいま","おかえり"],
    romaji:["tadaima","okaeri"],
    exp:"ただいま = I'm home (said by the arriving person). おかえり = welcome back (the response)." },

  { minDay:3, en:"Are you okay? Do your best!",
    tokens:["だいじょうぶ","ですか","がんばって"],
    romaji:["daijoubu","desu ka","ganbatte"],
    exp:"だいじょうぶですか = are you okay? がんばって = do your best! (encouraging someone struggling)" },

  { minDay:3, en:"I understand, I'm fine.",
    tokens:["わかりました","だいじょうぶ","です"],
    romaji:["wakarimashita","daijoubu","desu"],
    exp:"わかりました = I understand. だいじょうぶです = I am fine." },

  { minDay:3, en:"Welcome home! Do your best!",
    tokens:["おかえり","がんばって"],
    romaji:["okaeri","ganbatte"],
    exp:"おかえり = welcome back. がんばって = do your best! (said as they head back out)" },

  { minDay:3, en:"Excuse me, I understand.",
    tokens:["すみません","わかりました"],
    romaji:["sumimasen","wakarimashita"],
    exp:"すみません = excuse me / sorry. わかりました = I understand — acknowledging the correction." },

  { minDay:3, en:"I'm home! Thank you very much!",
    tokens:["ただいま","ありがとうございます"],
    romaji:["tadaima","arigatou gozaimasu"],
    exp:"ただいま = I'm home. ありがとうございます = thank you very much (grateful to be home)." },

  // ═══ DAY 4 ═══ すごい・なるほど・どうぞ・しつれいします
  { minDay:4, en:"That's amazing, isn't it?",
    tokens:["すごい","ですね"],
    romaji:["sugoi","desu ne"],
    exp:"すごい = amazing / wow. ですね = right? / isn't it? Creates a shared moment of awe." },

  { minDay:4, en:"I see, I understand.",
    tokens:["なるほど","わかりました"],
    romaji:["naruhodo","wakarimashita"],
    exp:"なるほど = I see / that makes sense. わかりました = I understood — two layers of comprehension." },

  { minDay:4, en:"Please go ahead, thank you.",
    tokens:["どうぞ","ありがとうございます"],
    romaji:["douzo","arigatou gozaimasu"],
    exp:"どうぞ = please go ahead / here you go. ありがとうございます = thank you very much." },

  { minDay:4, en:"Excuse me for intruding, please go ahead.",
    tokens:["しつれいします","どうぞ"],
    romaji:["shitsurei shimasu","douzo"],
    exp:"しつれいします = excuse me for being rude (formal). どうぞ = please go ahead." },

  { minDay:4, en:"Wow, that makes sense!",
    tokens:["すごい","なるほど"],
    romaji:["sugoi","naruhodo"],
    exp:"すごい = wow / amazing! なるほど = I see / that makes sense. A natural reaction combo." },

  { minDay:4, en:"Wow, please do your best!",
    tokens:["すごい","がんばって","ください"],
    romaji:["sugoi","ganbatte","kudasai"],
    exp:"すごい = wow / amazing! がんばってください = please do your best — impressed and encouraging." },

  { minDay:4, en:"I see, that's amazing.",
    tokens:["なるほど","すごい","ですね"],
    romaji:["naruhodo","sugoi","desu ne"],
    exp:"なるほど = I see. すごいですね = that's amazing, right? Reacting to something impressive." },

  { minDay:4, en:"Excuse me, please go ahead.",
    tokens:["すみません","どうぞ"],
    romaji:["sumimasen","douzo"],
    exp:"すみません = excuse me. どうぞ = please, go right ahead." },

  // ═══ DAY 5 ═══ おはようございます
  { minDay:5, en:"Good morning! Are you okay?",
    tokens:["おはようございます","だいじょうぶ","ですか"],
    romaji:["ohayou gozaimasu","daijoubu","desu ka"],
    exp:"おはようございます = good morning (polite). だいじょうぶですか = are you okay?" },

  { minDay:5, en:"Good morning! Please do your best.",
    tokens:["おはようございます","がんばって","ください"],
    romaji:["ohayou gozaimasu","ganbatte","kudasai"],
    exp:"おはようございます = good morning. がんばってください = please do your best today." },

  { minDay:5, en:"Good morning! I understand.",
    tokens:["おはようございます","わかりました"],
    romaji:["ohayou gozaimasu","wakarimashita"],
    exp:"おはようございます = good morning. わかりました = I understand / got it." },

  { minDay:5, en:"Good morning! That's amazing!",
    tokens:["おはようございます","すごい","ですね"],
    romaji:["ohayou gozaimasu","sugoi","desu ne"],
    exp:"おはようございます = good morning. すごいですね = that's amazing, right? Starting the day excited." },

  { minDay:5, en:"Good morning, nice to meet you!",
    tokens:["おはようございます","よろしくおねがいします"],
    romaji:["ohayou gozaimasu","yoroshiku onegaishimasu"],
    exp:"おはようございます = good morning. よろしくおねがいします = nice to meet you (first morning meeting)." },

  { minDay:5, en:"Good morning, I'm fine!",
    tokens:["おはようございます","だいじょうぶ","ですよ"],
    romaji:["ohayou gozaimasu","daijoubu","desu yo"],
    exp:"おはようございます = good morning. だいじょうぶですよ = I'm fine! (reassuring someone in the morning)" },

  // ═══ DAY 6 ═══ いってきます・いってらっしゃい・おつかれさまです
  { minDay:6, en:"I'm heading out! Go and come back safely!",
    tokens:["いってきます","いってらっしゃい"],
    romaji:["ittekimasu","itterasshai"],
    exp:"いってきます = I'm heading out. いってらっしゃい = go and come back safely. The classic Japanese exchange." },

  { minDay:6, en:"Good morning! Thank you for your hard work.",
    tokens:["おはようございます","おつかれさまです"],
    romaji:["ohayou gozaimasu","otsukare sama desu"],
    exp:"おはようございます = good morning. おつかれさまです = thank you for your effort — recognizing their work." },

  { minDay:6, en:"I'm heading out! Please do your best.",
    tokens:["いってきます","がんばって","ください"],
    romaji:["ittekimasu","ganbatte","kudasai"],
    exp:"いってきます = I'm heading out. がんばってください = please do your best!" },

  { minDay:6, en:"Go safely! Do your best!",
    tokens:["いってらっしゃい","がんばって"],
    romaji:["itterasshai","ganbatte"],
    exp:"いってらっしゃい = go and come back safely. がんばって = do your best — a warm send-off." },

  { minDay:6, en:"Thank you for your work! I'm fine.",
    tokens:["おつかれさまです","だいじょうぶ","ですよ"],
    romaji:["otsukare sama desu","daijoubu","desu yo"],
    exp:"おつかれさまです = thank you for your hard work. だいじょうぶですよ = I'm fine — still going strong." },

  { minDay:6, en:"I'm home! Thank you for your work.",
    tokens:["ただいま","おつかれさまです"],
    romaji:["tadaima","otsukare sama desu"],
    exp:"ただいま = I'm home. おつかれさまです = thank you for your hard work (said to family too)." },

  // ═══ DAY 7 ═══ なぜ・どうして
  { minDay:7, en:"Why? I understand.",
    tokens:["なぜですか","わかりました"],
    romaji:["naze desu ka","wakarimashita"],
    exp:"なぜですか = why? (formal / slightly formal). わかりました = I understand — accepting the reason." },

  { minDay:7, en:"Why? That's amazing!",
    tokens:["どうして","すごい","ですね"],
    romaji:["doushite","sugoi","desu ne"],
    exp:"どうして = why? (casual, curious). すごいですね = that's amazing! Surprised and impressed." },

  { minDay:7, en:"Why? Excuse me, where is it?",
    tokens:["なぜ","すみません","どこですか"],
    romaji:["naze","sumimasen","doko desu ka"],
    exp:"なぜ = why. すみません = excuse me. どこですか = where is it? Confused and asking for help." },

  { minDay:7, en:"Why? Excuse me.",
    tokens:["どうして","ですか","すみません"],
    romaji:["doushite","desu ka","sumimasen"],
    exp:"どうしてですか = why is that? すみません = excuse me / sorry — gently asking why." },

  { minDay:7, en:"I understand. But why?",
    tokens:["わかりました","でも","どうして"],
    romaji:["wakarimashita","demo","doushite"],
    exp:"わかりました = I understand. でも = but / however. どうして = why? Accepting but questioning." },

  // ═══ DAY 8 ═══ おげんきですか・げんきです・どうぞよろしく
  { minDay:8, en:"How are you? I'm well, thank you.",
    tokens:["おげんきですか","げんきです","ありがとう"],
    romaji:["ogenki desu ka","genki desu","arigatou"],
    exp:"おげんきですか = how are you? (formal). げんきです = I'm well. ありがとう = thank you." },

  { minDay:8, en:"Good morning, how are you?",
    tokens:["おはようございます","おげんきですか"],
    romaji:["ohayou gozaimasu","ogenki desu ka"],
    exp:"おはようございます = good morning. おげんきですか = how are you? A polite morning greeting pair." },

  { minDay:8, en:"I'm well! Please treat me kindly.",
    tokens:["げんきです","どうぞよろしく"],
    romaji:["genki desu","douzo yoroshiku"],
    exp:"げんきです = I'm well / fine. どうぞよろしく = please treat me kindly — a warm introduction." },

  { minDay:8, en:"How are you? Are you okay?",
    tokens:["おげんきですか","だいじょうぶ","ですか"],
    romaji:["ogenki desu ka","daijoubu","desu ka"],
    exp:"おげんきですか = how are you? だいじょうぶですか = are you okay? Checking in with genuine care." },

  { minDay:8, en:"I'm well, do your best!",
    tokens:["げんきです","がんばって","ください"],
    romaji:["genki desu","ganbatte","kudasai"],
    exp:"げんきです = I'm well. がんばってください = please do your best! Energetic and encouraging." },

  // ═══ DAY 9 ═══ よかった・たいへん・ほんとうに・すこし
  { minDay:9, en:"That's great! I understand.",
    tokens:["よかった","わかりました"],
    romaji:["yokatta","wakarimashita"],
    exp:"よかった = that's great / I'm glad / what a relief. わかりました = I understand." },

  { minDay:9, en:"Really? That's amazing!",
    tokens:["ほんとうに","すごい","ですね"],
    romaji:["hontou ni","sugoi","desu ne"],
    exp:"ほんとうに = really / truly. すごいですね = that's amazing, right? Genuinely impressed." },

  { minDay:9, en:"That's tough, isn't it? Are you okay?",
    tokens:["たいへん","ですね","だいじょうぶ","ですか"],
    romaji:["taihen","desu ne","daijoubu","desu ka"],
    exp:"たいへんですね = that must be tough, right? だいじょうぶですか = are you okay?" },

  { minDay:9, en:"That's great! Really!",
    tokens:["よかった","ほんとうに"],
    romaji:["yokatta","hontou ni"],
    exp:"よかった = that's great / I'm relieved. ほんとうに = really / truly — emphasizing the relief." },

  { minDay:9, en:"A little, thank you.",
    tokens:["すこし","ありがとうございます"],
    romaji:["sukoshi","arigatou gozaimasu"],
    exp:"すこし = a little / a bit. ありがとうございます = thank you very much. (Just a little, but grateful)" },

  { minDay:9, en:"It's tough, but do your best!",
    tokens:["たいへん","ですね","がんばって"],
    romaji:["taihen","desu ne","ganbatte"],
    exp:"たいへんですね = that's tough, right? がんばって = do your best! Acknowledging hardship then encouraging." },

  { minDay:9, en:"Really? I understand.",
    tokens:["ほんとうに","わかりました"],
    romaji:["hontou ni","wakarimashita"],
    exp:"ほんとうに = really / truly. わかりました = I understand — fully convinced now." },

  // ═══ DAY 10 ═══ もうすぐ・ゆっくり
  { minDay:10, en:"Almost there! Do your best!",
    tokens:["もうすぐ","がんばって","ください"],
    romaji:["mou sugu","ganbatte","kudasai"],
    exp:"もうすぐ = almost / nearly there. がんばってください = please do your best! So close, keep going!" },

  { minDay:10, en:"Slowly, I understand.",
    tokens:["ゆっくり","わかりました"],
    romaji:["yukkuri","wakarimashita"],
    exp:"ゆっくり = slowly / at a relaxed pace. わかりました = I understand — taking time to absorb it." },

  { minDay:10, en:"Almost! That's amazing!",
    tokens:["もうすぐ","すごい","ですね"],
    romaji:["mou sugu","sugoi","desu ne"],
    exp:"もうすぐ = almost there. すごいですね = that's amazing! Marveling at how close they are." },

  { minDay:10, en:"Slowly, please go ahead.",
    tokens:["ゆっくり","どうぞ"],
    romaji:["yukkuri","douzo"],
    exp:"ゆっくり = slowly / take your time. どうぞ = please go ahead. Inviting someone to take their time." },

  { minDay:10, en:"Almost there, I'm fine!",
    tokens:["もうすぐ","だいじょうぶ","ですよ"],
    romaji:["mou sugu","daijoubu","desu yo"],
    exp:"もうすぐ = almost / nearly. だいじょうぶですよ = I'm okay! Nearly at the finish line." },

  // ═══ DAY 11 ═══ なつかしい・いつも・たまに・ぜんぜん
  { minDay:11, en:"It's nostalgic, isn't it?",
    tokens:["なつかしい","ですね"],
    romaji:["natsukashii","desu ne"],
    exp:"なつかしい = nostalgic / bittersweet longing. ですね = isn't it? Sharing a tender moment." },

  { minDay:11, en:"Always, thank you!",
    tokens:["いつも","ありがとうございます"],
    romaji:["itsumo","arigatou gozaimasu"],
    exp:"いつも = always / as always. ありがとうございます = thank you very much — grateful for consistency." },

  { minDay:11, en:"Sometimes it's tough, isn't it?",
    tokens:["たまに","たいへん","ですね"],
    romaji:["tama ni","taihen","desu ne"],
    exp:"たまに = sometimes / occasionally. たいへんですね = that's tough right? Acknowledging occasional hardship." },

  { minDay:11, en:"Not at all! I'm fine.",
    tokens:["ぜんぜん","だいじょうぶ","ですよ"],
    romaji:["zenzen","daijoubu","desu yo"],
    exp:"ぜんぜん = not at all. だいじょうぶですよ = I'm fine! Emphatically reassuring someone." },

  { minDay:11, en:"Always, do your best!",
    tokens:["いつも","がんばって","ください"],
    romaji:["itsumo","ganbatte","kudasai"],
    exp:"いつも = always. がんばってください = please do your best! Consistently encouraging someone." },

  { minDay:11, en:"Sometimes, it's nostalgic.",
    tokens:["たまに","なつかしい","ですね"],
    romaji:["tama ni","natsukashii","desu ne"],
    exp:"たまに = sometimes / occasionally. なつかしいですね = it's nostalgic right? Brief waves of longing." },

  // ═══ DAY 12 ═══ おねがい・たしかに・なんとなく
  { minDay:12, en:"Please, I understand.",
    tokens:["おねがいします","わかりました"],
    romaji:["onegai shimasu","wakarimashita"],
    exp:"おねがいします = please / I'm asking you. わかりました = I understand — accepting the request." },

  { minDay:12, en:"Certainly, that's right.",
    tokens:["たしかに","そうですね"],
    romaji:["tashika ni","sou desu ne"],
    exp:"たしかに = certainly / indeed / that's true. そうですね = that's right, isn't it? Firm agreement." },

  { minDay:12, en:"Somehow, it's nostalgic.",
    tokens:["なんとなく","なつかしい","ですね"],
    romaji:["nantonaku","natsukashii","desu ne"],
    exp:"なんとなく = somehow / for no particular reason. なつかしいですね = nostalgic, right? A vague, warm feeling." },

  { minDay:12, en:"Certainly, I understand!",
    tokens:["たしかに","わかりました"],
    romaji:["tashika ni","wakarimashita"],
    exp:"たしかに = certainly / indeed. わかりました = I understand — confirming with conviction." },

  { minDay:12, en:"Please, slowly.",
    tokens:["おねがいします","ゆっくり"],
    romaji:["onegai shimasu","yukkuri"],
    exp:"おねがいします = please. ゆっくり = slowly / take your time. Politely asking for a slower pace." },

  { minDay:12, en:"Somehow, I'm fine.",
    tokens:["なんとなく","だいじょうぶ","ですよ"],
    romaji:["nantonaku","daijoubu","desu yo"],
    exp:"なんとなく = somehow / vaguely. だいじょうぶですよ = I'm okay! — a slightly uncertain but positive reply." },

  // ═══ DAY 13 ═══ しょうしょうおまちください・おじゃまします
  { minDay:13, en:"Please wait a moment, I understand.",
    tokens:["しょうしょうおまちください","わかりました"],
    romaji:["shou shou omachi kudasai","wakarimashita"],
    exp:"しょうしょうおまちください = please wait a moment. わかりました = I understand." },

  { minDay:13, en:"Sorry for intruding, please go ahead.",
    tokens:["おじゃまします","どうぞ"],
    romaji:["ojama shimasu","douzo"],
    exp:"おじゃまします = sorry for intruding (said when entering). どうぞ = please go ahead." },

  { minDay:13, en:"Please wait a moment. Excuse me.",
    tokens:["しょうしょうおまちください","すみません"],
    romaji:["shou shou omachi kudasai","sumimasen"],
    exp:"しょうしょうおまちください = please wait a moment. すみません = excuse me / I'm sorry." },

  { minDay:13, en:"Sorry for intruding! I understand.",
    tokens:["おじゃまします","わかりました"],
    romaji:["ojama shimasu","wakarimashita"],
    exp:"おじゃまします = sorry for intruding. わかりました = I understand — acknowledging you're in their space." },

  { minDay:13, en:"Please wait. Thank you very much.",
    tokens:["おまちください","ありがとうございます"],
    romaji:["omachi kudasai","arigatou gozaimasu"],
    exp:"おまちください = please wait. ありがとうございます = thank you very much — grateful for their patience." },

  // ═══ DAY 14 ═══ しょうがない・めんどうくさい・きをつけて・おだいじに
  { minDay:14, en:"It can't be helped. Take care!",
    tokens:["しょうがない","きをつけて"],
    romaji:["shoganai","ki wo tsukete"],
    exp:"しょうがない = it can't be helped — Japanese acceptance. きをつけて = take care / be careful." },

  { minDay:14, en:"Take care of yourself, I understand.",
    tokens:["おだいじに","わかりました"],
    romaji:["odaiji ni","wakarimashita"],
    exp:"おだいじに = take care of yourself (said to someone unwell). わかりました = I understand." },

  { minDay:14, en:"It can't be helped, do your best.",
    tokens:["しょうがない","がんばって"],
    romaji:["shoganai","ganbatte"],
    exp:"しょうがない = it can't be helped. がんばって = do your best! Accept the situation and press on." },

  { minDay:14, en:"That's troublesome, isn't it?",
    tokens:["めんどうくさい","ですね"],
    romaji:["mendou kusai","desu ne"],
    exp:"めんどうくさい = troublesome / too much effort. ですね = right? Commiserating over a tedious task." },

  { minDay:14, en:"Take care! I'm fine.",
    tokens:["きをつけて","だいじょうぶ","ですよ"],
    romaji:["ki wo tsukete","daijoubu","desu yo"],
    exp:"きをつけて = take care / be careful. だいじょうぶですよ = I'm fine! Concern and reassurance." },

  { minDay:14, en:"Take care of yourself! Really.",
    tokens:["おだいじに","ほんとうに"],
    romaji:["odaiji ni","hontou ni"],
    exp:"おだいじに = take care of yourself. ほんとうに = really / truly — emphasizing the sincerity." },

  // ═══ DAY 15 ═══ どんまい・マジで・やばい
  { minDay:15, en:"Don't mind it! It's okay.",
    tokens:["どんまい","だいじょうぶ","ですよ"],
    romaji:["donmai","daijoubu","desu yo"],
    exp:"どんまい = don't mind it (from English). だいじょうぶですよ = it's okay! Comforting after a mistake." },

  { minDay:15, en:"Seriously? That's amazing!",
    tokens:["マジで","すごい","ですね"],
    romaji:["maji de","sugoi","desu ne"],
    exp:"マジで = seriously? / for real? すごいですね = that's amazing, right? Surprised and impressed." },

  { minDay:15, en:"That's wild! Seriously?",
    tokens:["やばい","マジで"],
    romaji:["yabai","maji de"],
    exp:"やばい = crazy / wild / incredible (modern slang). マジで = seriously? for real?" },

  { minDay:15, en:"Don't mind it! Do your best.",
    tokens:["どんまい","がんばって"],
    romaji:["donmai","ganbatte"],
    exp:"どんまい = don't mind it / forget about it. がんばって = do your best! Pick yourself up and go." },

  { minDay:15, en:"Seriously? That's great!",
    tokens:["マジで","よかった"],
    romaji:["maji de","yokatta"],
    exp:"マジで = seriously? / for real? よかった = that's great / I'm so glad. Surprised and relieved." },

  { minDay:15, en:"That's wild, it can't be helped.",
    tokens:["やばい","しょうがない","ですね"],
    romaji:["yabai","shoganai","desu ne"],
    exp:"やばい = crazy / wild. しょうがないですね = it can't be helped, right? Chaos accepted with grace." },

  // ═══ REVIEW — multi-day combinations (shows mastery of mixing vocabulary) ═══
  { minDay:6, en:"I'm heading out! Thank you for your hard work.",
    tokens:["いってきます","おつかれさまです"],
    romaji:["ittekimasu","otsukare sama desu"],
    exp:"いってきます = I'm heading out. おつかれさまです = thank you for your effort — grateful before leaving." },

  { minDay:9, en:"It's tough! Really, do your best.",
    tokens:["たいへん","ほんとうに","がんばって"],
    romaji:["taihen","hontou ni","ganbatte"],
    exp:"たいへん = tough / hard. ほんとうに = really / truly. がんばって = do your best. Deep encouragement." },

  { minDay:11, en:"Always, take care!",
    tokens:["いつも","きをつけて"],
    romaji:["itsumo","ki wo tsukete"],
    exp:"いつも = always. きをつけて = take care / be careful. A warm, habitual farewell." },

  { minDay:14, en:"This is wasteful! It can't be helped.",
    tokens:["もったいない","しょうがない","ですね"],
    romaji:["mottainai","shoganai","desu ne"],
    exp:"もったいない = what a waste. しょうがないですね = it can't be helped, right? Resignation over waste." },

  { minDay:9, en:"That's great! Good morning!",
    tokens:["よかった","おはようございます"],
    romaji:["yokatta","ohayou gozaimasu"],
    exp:"よかった = that's great / I'm glad. おはようございます = good morning. Waking up to good news." },

  { minDay:12, en:"Somehow, always, thank you.",
    tokens:["なんとなく","いつも","ありがとうございます"],
    romaji:["nantonaku","itsumo","arigatou gozaimasu"],
    exp:"なんとなく = somehow / vaguely. いつも = always. ありがとうございます = thank you. Quietly grateful." },
];

// ═══════════════════════════════════════════
// SENTENCE BUILDER — tap kana tiles in order
// Sessions adapt to current day, weighted toward
// newest vocabulary. All tiles in Japanese (kana).
// ═══════════════════════════════════════════
function SentenceBuilder({ currentDay, onBack, onXPEarned, totalRounds = 1, endless = false }) {
  // Select session: 5 current-day + 4 recent + 3 review = 12 sentences
  const [pool, setPool] = useState(() => {
    const available = SENTENCE_DB.filter(s => s.minDay <= currentDay);
    const curr    = available.filter(s => s.minDay === currentDay);
    const recent  = available.filter(s => s.minDay >= currentDay - 3 && s.minDay < currentDay);
    const review  = available.filter(s => s.minDay < currentDay - 3);
    const pick = (arr, n) => shuffle([...arr]).slice(0, Math.min(n, arr.length));
    const session = [...pick(curr, 5), ...pick(recent, 4), ...pick(review, 3)];
    // If not enough, pad from all available
    if (session.length < 5) return shuffle(available).slice(0, Math.min(8, available.length));
    return shuffle(session).slice(0, 10);
  });
  const TOTAL = pool.length;

  const [idx, setIdx]           = useState(0);
  const [placed, setPlaced]     = useState([]);
  const [bank, setBank]         = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [round, setRound]       = useState(1);
  const [roundXP, setRoundXP]   = useState(0);

  const buildBank = (sentenceIdx) => {
    const s = pool[sentenceIdx];
    const tiles = s.tokens.map((t, i) => ({ id: 'r' + i + '_' + t, text: t, hint: s.romaji[i], real: true }));
    const otherTiles = pool
      .filter((_, k) => k !== sentenceIdx)
      .flatMap(os => os.tokens.map((t, i) => ({ id: 'd' + i + '_' + t, text: t, hint: os.romaji[i], real: false })))
      .filter(t => !s.tokens.includes(t.text));
    const decoys = shuffle(otherTiles).slice(0, 2);
    return shuffle([...tiles, ...decoys]);
  };

  useEffect(() => {
    if (pool.length > 0) { setBank(buildBank(0)); setPlaced([]); }
  }, []);

  // Audio throttle — 5s cooldown per tile text
  const audioThrottle = useRef({});
  const speakThrottled = (text) => {
    const now = Date.now();
    if ((now - (audioThrottle.current[text] || 0)) >= 5000) {
      speakJP(text);
      audioThrottle.current[text] = now;
    }
  };

  // ── Unified drag: works for bank tiles AND placed tiles ──
  const [dragInfo, setDragInfo]     = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const dmRef   = useRef({ moved:false, startX:0, startY:0, source:null, token:null });
  const dropRef = useRef(null);

  const startDrag = (e, token, source) => {
    if (feedback) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dmRef.current = { moved:false, startX:e.clientX, startY:e.clientY, source, token };
  };

  const moveDrag = (e, excludeId) => {
    const dm = dmRef.current;
    if (!dm.token) return;
    const dx = Math.abs(e.clientX - dm.startX);
    const dy = Math.abs(e.clientY - dm.startY);
    if (dx > 8 || dy > 8) {
      dm.moved = true;
      setDragInfo({ token: dm.token, source: dm.source, x: e.clientX, y: e.clientY });
      const els = document.elementsFromPoint(e.clientX, e.clientY);
      const t = els.find(el => el.dataset && el.dataset.tileId && el.dataset.tileId !== excludeId);
      dropRef.current = t ? t.dataset.tileId : null;
      setDropTarget(dropRef.current);
    } else if (dm.moved) {
      setDragInfo(di => di ? { ...di, x: e.clientX, y: e.clientY } : di);
    }
  };

  const endDrag = (e, token, source) => {
    const dm = dmRef.current;
    if (dm.moved && dragInfo) {
      const toId = dropRef.current;
      if (source === 'placed') {
        if (toId) {
          // Drop on another tile → swap
          setPlaced(prev => {
            const arr = [...prev];
            const fi = arr.findIndex(t => t.id === token.id);
            const ti = arr.findIndex(t => t.id === toId);
            if (fi !== -1 && ti !== -1) [arr[fi], arr[ti]] = [arr[ti], arr[fi]];
            return arr;
          });
        } else {
          // Dragged outside answer box → send back to bank
          setPlaced(p => p.filter(t => t.id !== token.id));
          setBank(b => [...b, token]);
        }
      } else {
        // Bank tile drag → insert into answer at target or append
        setBank(b => b.filter(t => t.id !== token.id));
        setPlaced(prev => {
          const arr = [...prev];
          if (toId) {
            const ti = arr.findIndex(t => t.id === toId);
            if (ti !== -1) { arr.splice(ti, 0, token); return arr; }
          }
          return [...arr, token];
        });
      }
    } else {
      // Short tap
      speakThrottled(token.text);
      if (source === 'bank') {
        // Tap bank → add to answer
        setBank(b => b.filter(t => t.id !== token.id));
        setPlaced(p => [...p, token]);
      } else {
        // Tap placed → remove back to bank
        setPlaced(p => p.filter(t => t.id !== token.id));
        setBank(b => [...b, token]);
      }
    }
    setDragInfo(null);
    setDropTarget(null);
    dropRef.current = null;
    dmRef.current = { moved:false, startX:0, startY:0, source:null, token:null };
  };

  const check = () => {
    if (feedback || placed.length === 0) return;
    setDragInfo(null); setDropTarget(null);
    const s = pool[idx];
    const ok = JSON.stringify(placed.map(t => t.text)) === JSON.stringify(s.tokens);
    if (ok) { setScore(sc => sc + 1); setFeedback('correct'); playSound('correct'); }
    else { setFeedback('wrong'); playSound('wrong'); }
    setShowHint(true);
  };

  const next = () => {
    const ni = idx + 1;
    if (ni >= TOTAL) {
      const xpThisRound = score * 20;
      const newTotalXP = roundXP + xpThisRound;
      if (!endless && round >= totalRounds) {
        if (onXPEarned) onXPEarned(newTotalXP);
        setDone(true);
      } else {
        setRoundXP(newTotalXP);
        setRound(r => r + 1);
        setPool(p => shuffle([...p]));
        setIdx(0);
        setBank(buildBank(0));
        setPlaced([]);
        setFeedback(null);
        setShowHint(false);
        setScore(0);
      }
    } else { setIdx(ni); setBank(buildBank(ni)); setPlaced([]); setFeedback(null); setShowHint(false); }
  };
  const endSession = () => {
    if (onXPEarned) onXPEarned(roundXP + score * 20);
    setDone(true);
  };

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score >= TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>
        {endless ? 'ENDLESS — ' + round + ' rounds' : 'Round ' + round + ' / ' + totalRounds} · Day {currentDay}
      </div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}>
          <div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div>
          <div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div>
        </div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}>
          <div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{score*20}</div>
          <div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div>
        </div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}>
          <div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div>
          <div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div>
        </div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>
        Play Again
      </button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>
        ← Back to Games
      </button>
      {endless && (
        <button onClick={endSession} style={{width:'100%',padding:'12px',background:'none',border:'1px solid #ef4444',borderRadius:'12px',color:'#ef4444',fontSize:'13px',fontWeight:'700',cursor:'pointer',marginTop:'8px'}}>
          End Session
        </button>
      )}
      {endless && (
        <button onClick={endSession} style={{width:'100%',padding:'12px',background:'none',border:'1px solid #ef4444',borderRadius:'12px',color:'#ef4444',fontSize:'13px',fontWeight:'700',cursor:'pointer',marginTop:'8px'}}>
          End Session
        </button>
      )}
    </div>
  );

  const s = pool[idx];
  const bgColor = feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor = feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e';

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      {/* Progress */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless ? '∞' : 'Round ' + round + '/' + totalRounds} · Day {currentDay}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      {/* English prompt */}
      <div style={{background:'#10101c',borderRadius:'14px',padding:'20px',marginBottom:'16px',textAlign:'center'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'8px'}}>BUILD THIS IN JAPANESE</div>
        <div style={{color:'#fff',fontSize:'20px',fontWeight:'700',lineHeight:'1.4'}}>{s.en}</div>
      </div>

      {/* Answer area */}
      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'14px',minHeight:'70px',padding:'12px',
        marginBottom:'12px',display:'flex',flexWrap:'wrap',gap:'8px',alignItems:'center',
        justifyContent:'center',transition:'all 0.25s'}}>
        {placed.length===0&&!feedback&&(
          <div style={{color:'#333',fontSize:'13px'}}>Tap tiles below to place them here</div>
        )}
        {placed.map(token=>{
          const isDragging = dragInfo?.token?.id === token.id && dragInfo?.source === 'placed';
          const isTarget   = dropTarget === token.id;
          return (
            <button key={token.id}
              data-tile-id={token.id}
              onPointerDown={(e)=>startDrag(e,token,'placed')}
              onPointerMove={(e)=>moveDrag(e,token.id)}
              onPointerUp={(e)=>endDrag(e,token,'placed')}
              style={{padding:'10px 16px',
                background:isDragging?'#4f46e5':'#6366f1',
                border:isTarget?'2px solid #f59e0b':'2px solid transparent',
                borderRadius:'10px',color:'#fff',fontSize:'18px',fontWeight:'700',
                cursor:'grab',fontFamily:'inherit',
                boxShadow:isTarget?'0 0 12px rgba(245,158,11,0.5)':'0 2px 8px rgba(99,102,241,0.4)',
                opacity:isDragging?0.4:1,
                transform:isTarget?'scale(1.06)':'scale(1)',
                transition:'opacity 0.1s,transform 0.1s',
                touchAction:'none',userSelect:'none'}}>
              {token.text}
            </button>
          );
        })}
        {dragInfo&&(
          <div style={{position:'fixed',
            left:dragInfo.x-30,top:dragInfo.y-22,
            pointerEvents:'none',zIndex:9999,
            padding:'10px 16px',background:dragInfo.source==='bank'?'#374151':'#6366f1',
            borderRadius:'10px',color:'#fff',fontSize:'18px',fontWeight:'700',
            fontFamily:'inherit',boxShadow:'0 6px 24px rgba(0,0,0,0.5)',
            transform:'scale(1.12)',opacity:0.95}}>
            {dragInfo.token.text}
          </div>
        )}
        {feedback==='correct'&&(
          <div style={{width:'100%',textAlign:'center',marginTop:'6px'}}>
            <div style={{color:'#10b981',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>✓ {s.tokens.join(' ')}</div>
            <div style={{color:'#10b981',fontSize:'11px',opacity:0.7}}>{s.romaji.join(' ')}</div>
          </div>
        )}
        {dragInfo&&(
          <div style={{position:'fixed',
            left:dragInfo.x-30,top:dragInfo.y-22,
            pointerEvents:'none',zIndex:9999,padding:'10px 16px',
            background:dragInfo.source==='bank'?'#374151':'#6366f1',
            borderRadius:'10px',color:'#fff',fontSize:'18px',fontWeight:'700',
            fontFamily:'inherit',boxShadow:'0 6px 24px rgba(0,0,0,0.5)',
            transform:'scale(1.12)',opacity:0.95}}>
            {dragInfo.token.text}
          </div>
        )}
        {feedback==='wrong'&&(
          <div style={{width:'100%',textAlign:'center',marginTop:'6px'}}>
            <div style={{color:'#ef4444',fontSize:'12px',marginBottom:'4px'}}>Correct: <span style={{fontWeight:'700',color:'#fff'}}>{s.tokens.join(' ')}</span></div>
            <div style={{color:'#ef4444',fontSize:'11px',opacity:0.7}}>{s.romaji.join(' ')}</div>
          </div>
        )}
      </div>

      {/* Explanation after answer */}
      {feedback&&(
        <div style={{background:'#0a0a14',border:'1px solid #1e1e30',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
          <div style={{color:'#6366f1',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'6px'}}>BREAKDOWN</div>
          <div style={{color:'#aaa',fontSize:'13px',lineHeight:'1.6'}}>{s.exp}</div>
        </div>
      )}

      {/* Word bank */}
      {!feedback&&(
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center',marginBottom:'12px',minHeight:'52px'}}>
          {bank.map(token=>{
          const isBankDragging = dragInfo?.token?.id === token.id && dragInfo?.source === 'bank';
          return (
            <button key={token.id}
              data-tile-id={token.id}
              onPointerDown={(e)=>startDrag(e,token,'bank')}
              onPointerMove={(e)=>moveDrag(e,token.id)}
              onPointerUp={(e)=>endDrag(e,token,'bank')}
              style={{padding:'12px 18px',background:'#13131e',border:'1px solid #2a2a3e',
                borderRadius:'10px',color:'#ccc',fontSize:'18px',fontWeight:'600',
                cursor:'grab',fontFamily:'inherit',transition:'opacity 0.1s',
                opacity:isBankDragging?0.35:1,
                touchAction:'none',userSelect:'none'}}>
              {token.text}
              {showHint&&<div style={{fontSize:'9px',color:'#6366f1',marginTop:'2px'}}>{token.hint}</div>}
            </button>
          );
        })}
        </div>
      )}

      {/* Buttons */}
      {!feedback?(
        <div style={{display:'flex',gap:'8px',marginTop:'auto'}}>
          <button onClick={()=>setShowHint(h=>!h)}
            style={{flex:1,padding:'16px',background:'none',border:'1px solid #2a2a3e',
              borderRadius:'14px',color:showHint?'#6366f1':'#555',fontSize:'14px',cursor:'pointer'}}>
            {showHint?'Hide Hint':'💡 Hint'}
          </button>
          <button onClick={check} disabled={placed.length===0}
            style={{flex:2,padding:'16px',background:placed.length===0?'#1a1a2e':'linear-gradient(135deg,#6366f1,#4f46e5)',
              border:'none',borderRadius:'14px',color:placed.length===0?'#333':'#fff',
              fontSize:'17px',fontWeight:'900',cursor:placed.length===0?'default':'pointer',transition:'all 0.2s'}}>
            Check →
          </button>
        </div>
      ):(
        <button onClick={next} style={{marginTop:'auto',width:'100%',padding:'18px',
          background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
          border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
          {idx+1>=TOTAL?'See Results →':'Next →'}
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// BUILD A SENTENCE — #88 Words & Phrases
// Whole-word tiles, max 9, click=place+speak
// Drag to rearrange. Decoys scale with week.
// ═══════════════════════════════════════════
function BuildSentence({ currentDay, onBack, onXPEarned, totalRounds=1, endless=false }) {
  const getDecoyCount = (day) => {
    if (day <= 5)  return 2;
    if (day <= 10) return 3;
    if (day <= 15) return 4;
    return 5;
  };
  const decoyCount = getDecoyCount(currentDay);

  const [pool, setPool] = useState(() => {
    const available = SENTENCE_DB.filter(s => s.minDay <= currentDay);
    // Pull from all available days for maximum variation
    // Weight today's sentences 2x by including them twice before shuffle
    const curr = available.filter(s => s.minDay === currentDay);
    const all  = shuffle([...available, ...curr]);
    return all.slice(0, Math.min(8, all.length));
  });
  const TOTAL = pool.length;

  const buildBank = (sentenceIdx) => {
    const s = pool[sentenceIdx];
    const tiles = s.tokens.map((t, i) => ({ id: 'r' + i + '_' + t, text: t, hint: s.romaji[i] }));
    const otherTiles = pool
      .filter((_, k) => k !== sentenceIdx)
      .flatMap(os => os.tokens.map((t, i) => ({ id: 'd' + i + '_' + t, text: t, hint: os.romaji[i] })))
      .filter(t => !s.tokens.includes(t.text));
    const decoys = shuffle(otherTiles).slice(0, decoyCount);
    return shuffle([...tiles, ...decoys].slice(0, 9));
  };

  const [idx, setIdx]           = useState(0);
  const [placed, setPlaced]     = useState([]);
  const [bank, setBank]         = useState(() => pool.length > 0 ? buildBank(0) : []);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [round, setRound]       = useState(1);
  const [roundXP, setRoundXP]   = useState(0);

  const audioRef = useRef({ _last: 0 });
  const speakTile = (text) => {
    const now = Date.now();
    const sinceAny  = now - (audioRef.current._last  || 0);
    const sinceSame = now - (audioRef.current[text]   || 0);
    if (sinceAny >= 400 && sinceSame >= 3000) {
      speakJP(text);
      audioRef.current[text] = now;
      audioRef.current._last  = now;
    }
  };

  const [dragInfo, setDragInfo]     = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const dmRef   = useRef({ moved:false, startX:0, startY:0, source:null, token:null });
  const dropRef = useRef(null);

  const startDrag = (e, token, source) => {
    if (feedback) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dmRef.current = { moved:false, startX:e.clientX, startY:e.clientY, source, token };
  };

  const moveDrag = (e, excludeId) => {
    const dm = dmRef.current;
    if (!dm.token) return;
    const dx = Math.abs(e.clientX - dm.startX);
    const dy = Math.abs(e.clientY - dm.startY);
    if (dx > 8 || dy > 8) {
      dm.moved = true;
      setDragInfo({ token: dm.token, source: dm.source, x: e.clientX, y: e.clientY });
      const els = document.elementsFromPoint(e.clientX, e.clientY);
      const t = els.find(el => el.dataset && el.dataset.tileId && el.dataset.tileId !== excludeId);
      dropRef.current = t ? t.dataset.tileId : null;
      setDropTarget(dropRef.current);
    } else if (dm.moved) {
      setDragInfo(di => di ? { ...di, x: e.clientX, y: e.clientY } : di);
    }
  };

  const endDrag = (e, token, source) => {
    const dm = dmRef.current;
    if (dm.moved && dragInfo) {
      const toId = dropRef.current;
      if (source === 'placed') {
        if (toId) {
          setPlaced(prev => {
            const arr = [...prev];
            const fi = arr.findIndex(t => t.id === token.id);
            const ti = arr.findIndex(t => t.id === toId);
            if (fi !== -1 && ti !== -1) [arr[fi], arr[ti]] = [arr[ti], arr[fi]];
            return arr;
          });
        } else {
          setPlaced(p => p.filter(t => t.id !== token.id));
          setBank(b => [...b, token]);
        }
      } else {
        setBank(b => b.filter(t => t.id !== token.id));
        setPlaced(prev => {
          const arr = [...prev];
          if (toId) {
            const ti = arr.findIndex(t => t.id === toId);
            if (ti !== -1) { arr.splice(ti, 0, token); return arr; }
          }
          return [...arr, token];
        });
      }
    } else {
      speakTile(token.text);
      if (source === 'bank') {
        setBank(b => b.filter(t => t.id !== token.id));
        setPlaced(p => [...p, token]);
      } else {
        setPlaced(p => p.filter(t => t.id !== token.id));
        setBank(b => [...b, token]);
      }
    }
    setDragInfo(null); setDropTarget(null);
    dropRef.current = null;
    dmRef.current = { moved:false, startX:0, startY:0, source:null, token:null };
  };

  const check = () => {
    if (feedback || placed.length === 0) return;
    setDragInfo(null); setDropTarget(null);
    const s = pool[idx];
    const ok = JSON.stringify(placed.map(t => t.text)) === JSON.stringify(s.tokens);
    if (ok) { setScore(sc => sc + 1); setFeedback('correct'); playSound('correct'); }
    else { setFeedback('wrong'); playSound('wrong'); }
    setShowHint(true);
  };

  const next = () => {
    const ni = idx + 1;
    if (ni >= TOTAL) {
      const xpThisRound = score * 20;
      const newTotalXP = roundXP + xpThisRound;
      if (!endless && round >= totalRounds) {
        if (onXPEarned) onXPEarned(newTotalXP);
        setDone(true);
      } else {
        setRoundXP(newTotalXP); setRound(r => r + 1);
        setIdx(0); setBank(buildBank(0)); setPlaced([]);
        setFeedback(null); setShowHint(false); setScore(0);
      }
    } else {
      setIdx(ni); setBank(buildBank(ni)); setPlaced([]);
      setFeedback(null); setShowHint(false);
    }
  };

  const endSession = () => { if (onXPEarned) onXPEarned(roundXP + score * 20); setDone(true); };

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>
        {endless ? 'ENDLESS — ' + round + ' rounds' : 'Round ' + round + ' / ' + totalRounds} · Day {currentDay}
      </div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{score*20}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );

  const s = pool[idx];
  const bgColor = feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor = feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e';

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless ? '∞' : 'Round ' + round + '/' + totalRounds} · Day {currentDay}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>
      <div style={{background:'#10101c',borderRadius:'14px',padding:'20px',marginBottom:'16px',textAlign:'center'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'8px'}}>BUILD THIS IN JAPANESE</div>
        <div style={{color:'#fff',fontSize:'20px',fontWeight:'700',lineHeight:'1.4'}}>{s.en}</div>
        <div style={{color:'#333',fontSize:'11px',marginTop:'8px'}}>Tap to place · tap placed tile to remove · drag to rearrange</div>
      </div>
      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'14px',minHeight:'70px',padding:'12px',
        marginBottom:'12px',display:'flex',flexWrap:'wrap',gap:'8px',alignItems:'center',
        justifyContent:'center',transition:'all 0.25s',position:'relative'}}>
        {placed.length===0&&!feedback&&<div style={{color:'#333',fontSize:'13px'}}>Tap tiles below to place them here</div>}
        {placed.map(token=>{
          const isDragging = dragInfo?.token?.id === token.id && dragInfo?.source === 'placed';
          const isTarget = dropTarget === token.id;
          return (
            <button key={token.id} data-tile-id={token.id}
              onPointerDown={(e)=>startDrag(e,token,'placed')}
              onPointerMove={(e)=>moveDrag(e,token.id)}
              onPointerUp={(e)=>endDrag(e,token,'placed')}
              style={{padding:'10px 16px',background:isDragging?'#4f46e5':'#6366f1',
                border:isTarget?'2px solid #f59e0b':'2px solid transparent',
                borderRadius:'10px',color:'#fff',fontSize:'18px',fontWeight:'700',cursor:'grab',
                fontFamily:'inherit',opacity:isDragging?0.4:1,
                transform:isTarget?'scale(1.06)':'scale(1)',
                transition:'opacity 0.1s,transform 0.1s',touchAction:'none',userSelect:'none'}}>
              {token.text}
            </button>
          );
        })}
        {dragInfo&&(
          <div style={{position:'fixed',left:dragInfo.x-30,top:dragInfo.y-22,pointerEvents:'none',zIndex:9999,
            padding:'10px 16px',background:dragInfo.source==='bank'?'#374151':'#6366f1',
            borderRadius:'10px',color:'#fff',fontSize:'18px',fontWeight:'700',fontFamily:'inherit',
            opacity:0.95,transform:'scale(1.12)'}}>
            {dragInfo.token.text}
          </div>
        )}
        {feedback==='correct'&&(
          <div style={{width:'100%',textAlign:'center',marginTop:'6px'}}>
            <div style={{color:'#10b981',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>✓ {s.tokens.join(' ')}</div>
            <div style={{color:'#10b981',fontSize:'11px',opacity:0.7}}>{s.romaji.join(' ')}</div>
          </div>
        )}
        {feedback==='wrong'&&(
          <div style={{width:'100%',textAlign:'center',marginTop:'6px'}}>
            <div style={{color:'#ef4444',fontSize:'12px',marginBottom:'4px'}}>Correct: <span style={{fontWeight:'700',color:'#fff'}}>{s.tokens.join(' ')}</span></div>
            <div style={{color:'#ef4444',fontSize:'11px',opacity:0.7}}>{s.romaji.join(' ')}</div>
          </div>
        )}
      </div>
      {feedback&&(
        <div style={{background:'#0a0a14',border:'1px solid #1e1e30',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
          <div style={{color:'#6366f1',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'6px'}}>BREAKDOWN</div>
          <div style={{color:'#aaa',fontSize:'13px',lineHeight:'1.6'}}>{s.exp}</div>
        </div>
      )}
      {!feedback&&(
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center',marginBottom:'12px',minHeight:'52px'}}>
          {bank.map(token=>{
            const isBankDragging = dragInfo?.token?.id === token.id && dragInfo?.source === 'bank';
            return (
              <button key={token.id} data-tile-id={token.id}
                onPointerDown={(e)=>startDrag(e,token,'bank')}
                onPointerMove={(e)=>moveDrag(e,token.id)}
                onPointerUp={(e)=>endDrag(e,token,'bank')}
                style={{padding:'12px 18px',background:'#13131e',border:'1px solid #2a2a3e',
                  borderRadius:'10px',color:'#ccc',fontSize:'18px',fontWeight:'600',cursor:'grab',
                  fontFamily:'inherit',opacity:isBankDragging?0.35:1,touchAction:'none',userSelect:'none'}}>
                {token.text}
                {showHint&&<div style={{fontSize:'9px',color:'#6366f1',marginTop:'2px'}}>{token.hint}</div>}
              </button>
            );
          })}
        </div>
      )}
      {!feedback?(
        <div style={{display:'flex',gap:'8px',marginTop:'auto'}}>
          <button onClick={()=>setShowHint(h=>!h)}
            style={{flex:1,padding:'16px',background:'none',border:'1px solid #2a2a3e',
              borderRadius:'14px',color:showHint?'#6366f1':'#555',fontSize:'14px',cursor:'pointer'}}>
            {showHint?'Hide Hint':'💡 Hint'}
          </button>
          <button onClick={check} disabled={placed.length===0}
            style={{flex:2,padding:'16px',background:placed.length===0?'#1a1a2e':'linear-gradient(135deg,#6366f1,#4f46e5)',
              border:'none',borderRadius:'14px',color:placed.length===0?'#333':'#fff',
              fontSize:'17px',fontWeight:'900',cursor:placed.length===0?'default':'pointer'}}>
            Check →
          </button>
        </div>
      ):(
        <div style={{display:'flex',gap:'8px',marginTop:'auto'}}>
          {endless&&(
            <button onClick={endSession}
              style={{flex:1,padding:'16px',background:'none',border:'1px solid #ef4444',
                borderRadius:'14px',color:'#ef4444',fontSize:'14px',cursor:'pointer'}}>
              End Session
            </button>
          )}
          <button onClick={next}
            style={{flex:3,padding:'18px',
              background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
              border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
            {idx+1>=TOTAL?'See Results →':'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════
// FILL THE GAP — #86 Words & Phrases
// Sentence shown with 1-2 blanks. Tap tiles
// to fill. Auto-checks when all blanks filled.
// ═══════════════════════════════════════════
function FillTheGap({ currentDay, onBack, onXPEarned, totalRounds=1, endless=false }) {
  const [questions] = useState(() => {
    const available = SENTENCE_DB.filter(s => s.minDay <= currentDay);
    const curr = available.filter(s => s.minDay === currentDay);
    // Weight today's sentences by including them twice, then shuffle all
    const pool = shuffle([...available, ...curr]).slice(0, Math.min(8, available.length));

    return pool.map(sentence => {
      const tokens = sentence.tokens;
      // 2-token sentences: always 1 blank
      // 3+ token sentences: 1 blank mostly, sometimes 2
      const maxBlanks = tokens.length >= 3 ? (Math.random() > 0.6 ? 2 : 1) : 1;
      const numBlanks = Math.min(maxBlanks, tokens.length - 1); // always keep at least 1 token visible
      const positions = shuffle([...Array(tokens.length).keys()]).slice(0, numBlanks).sort((a,b)=>a-b);

      // Build word bank: correct answer tiles + decoys from other sentences
      const otherTokens = [...new Set(
        available.filter(s => s !== sentence).flatMap(s => s.tokens).filter(t => !tokens.includes(t))
      )];
      const decoys = shuffle(otherTokens).slice(0, 3);
      const correctTiles = positions.map((pos, i) => ({ id: 'c'+i+'_'+tokens[pos], text: tokens[pos] }));
      const decoyTiles   = decoys.map((t, i)    => ({ id: 'd'+i+'_'+t,            text: t            }));
      const bank = shuffle([...correctTiles, ...decoyTiles]);

      return { sentence, positions, bank };
    });
  });

  const TOTAL = questions.length;
  const [idx, setIdx]           = useState(0);
  const [blanks, setBlanks]     = useState(() => Array(questions[0]?.positions.length||1).fill(null));
  const [bank, setBank]         = useState(() => [...(questions[0]?.bank||[])]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [round, setRound]       = useState(1);
  const [roundXP, setRoundXP]   = useState(0);

  const audioRef = useRef({ _last: 0 });
  const speakTile = (text) => {
    const now = Date.now();
    const sinceAny  = now - (audioRef.current._last  || 0);
    const sinceSame = now - (audioRef.current[text]   || 0);
    if (sinceAny >= 400 && sinceSame >= 3000) {
      speakJP(text);
      audioRef.current[text] = now;
      audioRef.current._last  = now;
    }
  };

  const loadQ = (qIdx) => {
    const q = questions[qIdx];
    setBlanks(Array(q.positions.length).fill(null));
    setBank([...q.bank]);
    setFeedback(null);
  };

  const placeTile = (tile) => {
    if (feedback) return;
    speakTile(tile.text);
    const emptyIdx = blanks.findIndex(b => b === null);
    if (emptyIdx === -1) return;
    const newBlanks = [...blanks];
    newBlanks[emptyIdx] = tile;
    setBlanks(newBlanks);
    setBank(prev => prev.filter(t => t.id !== tile.id));
    // Auto-check when all blanks filled
    if (newBlanks.every(b => b !== null)) {
      const q = questions[idx];
      const ok = newBlanks.every((t, i) => t.text === q.sentence.tokens[q.positions[i]]);
      setTimeout(() => {
        if (ok) { setScore(s => s+1); setFeedback('correct'); playSound('correct'); }
        else    { setFeedback('wrong');  playSound('wrong'); }
      }, 350);
    }
  };

  const removeTile = (blankIdx) => {
    if (feedback) return;
    const tile = blanks[blankIdx];
    if (!tile) return;
    const newBlanks = [...blanks];
    newBlanks[blankIdx] = null;
    setBlanks(newBlanks);
    setBank(prev => [...prev, tile]);
  };

  const next = () => {
    const ni = idx + 1;
    if (ni >= TOTAL) {
      const xpThisRound = score * 15;
      const newTotalXP = roundXP + xpThisRound;
      if (!endless && round >= totalRounds) {
        if (onXPEarned) onXPEarned(newTotalXP);
        setDone(true);
      } else {
        setRoundXP(newTotalXP); setRound(r => r+1);
        setPool(p => shuffle([...p]));
        setIdx(0); loadQ(0); setScore(0);
      }
    } else { setIdx(ni); loadQ(ni); }
  };

  const endSession = () => { if (onXPEarned) onXPEarned(roundXP + score*15); setDone(true); };

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>
        {endless ? 'ENDLESS — '+round+' rounds' : 'Round '+round+' / '+totalRounds} · Day {currentDay}
      </div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{score*15}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );

  const q = questions[idx];
  const allFilled = blanks.every(b => b !== null);
  const bgColor = feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor = feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e';

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      {/* Progress */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless ? '∞' : 'Round '+round+'/'+totalRounds} · Day {currentDay}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      {/* English prompt */}
      <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 20px',marginBottom:'16px',textAlign:'center'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'8px'}}>FILL IN THE MISSING WORD{q.positions.length>1?'S':''}</div>
        <div style={{color:'#fff',fontSize:'18px',fontWeight:'700',lineHeight:'1.5'}}>{q.sentence.en}</div>
      </div>

      {/* Sentence with blanks */}
      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'14px',padding:'16px',
        marginBottom:'16px',transition:'all 0.25s',minHeight:'80px',
        display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'center',alignItems:'center'}}>
        {q.sentence.tokens.map((token, i) => {
          const blankIdx = q.positions.indexOf(i);
          if (blankIdx !== -1) {
            const filled = blanks[blankIdx];
            const isCorrect = feedback==='correct' && filled;
            const isWrong   = feedback==='wrong'   && filled && filled.text !== q.sentence.tokens[q.positions[blankIdx]];
            return (
              <button key={i} onClick={()=>!feedback&&removeTile(blankIdx)}
                style={{minWidth:'80px',height:'48px',padding:'0 14px',
                  background:isCorrect?'#0a2a1a':isWrong?'#2a0a0a':filled?'#6366f1':'#13131e',
                  border:'2px dashed '+(isCorrect?'#10b981':isWrong?'#ef4444':filled?'transparent':'#6366f1'),
                  borderRadius:'10px',color:isCorrect?'#10b981':isWrong?'#ef4444':filled?'#fff':'#6366f1',
                  fontSize:'18px',fontWeight:'700',cursor:filled&&!feedback?'pointer':'default',
                  fontFamily:'inherit',transition:'all 0.2s',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {filled ? filled.text : '　　'}
              </button>
            );
          }
          return (
            <div key={i} style={{padding:'10px 14px',background:'#10101c',borderRadius:'10px',
              color:'#ccc',fontSize:'18px',fontWeight:'600',fontFamily:'inherit'}}>
              {token}
            </div>
          );
        })}
      </div>

      {/* Explanation after answer */}
      {feedback&&(
        <div style={{background:'#0a0a14',border:'1px solid #1e1e30',borderRadius:'12px',padding:'14px',marginBottom:'12px'}}>
          {feedback==='wrong'&&(
            <div style={{color:'#fff',fontSize:'13px',fontWeight:'700',marginBottom:'8px'}}>
              Correct: {q.sentence.tokens.map((t,i)=>(
                <span key={i} style={{color:q.positions.includes(i)?'#10b981':'#888',marginRight:'4px'}}>{t}</span>
              ))}
            </div>
          )}
          <div style={{color:'#6366f1',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'6px'}}>BREAKDOWN</div>
          <div style={{color:'#aaa',fontSize:'13px',lineHeight:'1.6'}}>{q.sentence.exp}</div>
        </div>
      )}

      {/* Word bank */}
      {!feedback&&(
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center',marginBottom:'12px',minHeight:'52px'}}>
          {bank.map(tile=>(
            <button key={tile.id} onClick={()=>placeTile(tile)}
              style={{padding:'12px 18px',background:'#13131e',border:'1px solid #2a2a3e',
                borderRadius:'10px',color:'#ccc',fontSize:'18px',fontWeight:'600',
                cursor:'pointer',fontFamily:'inherit'}}>
              {tile.text}
            </button>
          ))}
          {bank.length===0&&!allFilled&&<div style={{color:'#333',fontSize:'13px'}}>All tiles placed</div>}
        </div>
      )}

      {/* Next button (shown after feedback) */}
      {feedback?(
        <div style={{display:'flex',gap:'8px',marginTop:'auto'}}>
          {endless&&<button onClick={endSession} style={{flex:1,padding:'16px',background:'none',border:'1px solid #ef4444',borderRadius:'14px',color:'#ef4444',fontSize:'14px',cursor:'pointer'}}>End Session</button>}
          <button onClick={next}
            style={{flex:3,padding:'18px',
              background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
              border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
            {idx+1>=TOTAL?'See Results →':'Next →'}
          </button>
        </div>
      ):(
        <div style={{marginTop:'auto',color:'#333',fontSize:'12px',textAlign:'center'}}>
          Tap a tile to fill the blank · tap a filled blank to remove it
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════
// KANA TYPEWRITER — #84 Words & Phrases
// Days 1-10: tap kana tiles to spell the word
// Days 11+: type on Japanese keyboard
// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
// KANA TYPEWRITER — #84 Words & Phrases
// Tile mode Days 1-10, type mode Days 11+
// Streak bonus · speed bonus · char feedback
// ═══════════════════════════════════════════
function KanaTypewriter({ phrases, currentDay, onBack, onXPEarned, totalRounds=1, endless=false }) {
  const isKanaOnly = (str) => /^[぀-ゟ゠-ヿ]+$/.test(str);
  const tileMode = currentDay <= 10;

  // Dakuten/handakuten close pairs as sorted-key Set (no duplicate keys)
  const CLOSE_SET = new Set([
    'かが','きぎ','くぐ','けげ','こご',
    'さざ','しじ','すず','せぜ','そぞ',
    'ただ','ちぢ','つづ','てで','とど',
    'はば','ひび','ふぶ','へべ','ほぼ',
    'はぱ','ひぴ','ふぷ','へぺ','ほぽ',
    'っつ','ゃや','ゅゆ','ょよ',
  ].map(p => p.split('').sort().join('')));
  const isClose = (a, b) => { const k=[a,b].sort().join(''); return CLOSE_SET.has(k); };

  const [pool, setPool] = useState(() => {
    const eligible = phrases.filter(p => p.jp && p.en);
    const noKanji  = eligible.filter(p => !/[一-鿿㐀-䶿]/.test(p.jp));
    const kanaOnly = eligible.filter(p => isKanaOnly(p.jp));
    const source   = tileMode ? (kanaOnly.length > 0 ? kanaOnly : noKanji) : eligible;
    // Stratify: pick up to 3 from each learned day for even coverage
    const byDay = {};
    source.forEach(p => { if(!byDay[p.dayNum]) byDay[p.dayNum]=[]; byDay[p.dayNum].push(p); });
    const stratified = Object.values(byDay).flatMap(day => shuffle(day).slice(0, 3));
    // Weight today double
    const today = source.filter(p => p.dayNum === currentDay);
    return shuffle([...stratified, ...today]).slice(0, Math.min(8, stratified.length + today.length));
  });

  const buildBank = (phrase) => {
    if (!tileMode) return [];
    const chars = phrase.jp.split('');
    const correctTiles = chars.map((ch, i) => ({ id: 'c'+i+'_'+ch, ch }));
    const others = [...new Set(
      pool.filter(p => p !== phrase).flatMap(p => p.jp.split('')).filter(ch => !chars.includes(ch) && /^[぀-ゟ゠-ヿ]$/.test(ch))
    )];
    const decoys = shuffle(others).slice(0, 4).map((ch, i) => ({ id: 'd'+i+'_'+ch, ch }));
    return shuffle([...correctTiles, ...decoys]);
  };

  const TOTAL = pool.length;
  const [idx, setIdx]           = useState(0);
  const [placed, setPlaced]     = useState([]);
  const [bank, setBank]         = useState(() => buildBank(pool[0]));
  const [typed, setTyped]       = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore]       = useState(0);
  const [streak, setStreak]     = useState(0);
  const [done, setDone]         = useState(false);
  const [round, setRound]       = useState(1);
  const [roundXP, setRoundXP]   = useState(0);
  const [totalXPEarned, setTotalXPEarned] = useState(0);
  const [lastXP, setLastXP]     = useState(null);

  const startTimeRef = useRef(Date.now());
  const audioRef     = useRef({});

  const speakTile = (text) => {
    const now = Date.now();
    if ((now - (audioRef.current[text] || 0)) >= 5000) {
      speakJP(text); audioRef.current[text] = now;
    }
  };

  const loadQ = (qIdx) => {
    setPlaced([]); setBank(buildBank(pool[qIdx]));
    setTyped(''); setFeedback(null); setShowHint(false);
    startTimeRef.current = Date.now();
  };

  const calcXP = (ok, elapsed) => {
    if (!ok) return 0;
    let xp = 20;
    if (elapsed < 5) xp += 10;           // speed bonus
    if (streak >= 4) xp = Math.round(xp * 1.5); // streak multiplier (5th+ in a row)
    return xp;
  };

  const placeTile = (tile) => {
    if (feedback) return;
    speakTile(tile.ch);
    const newPlaced = [...placed, tile];
    setPlaced(newPlaced);
    setBank(b => b.filter(t => t.id !== tile.id));
    const target = pool[idx].jp.split('');
    if (newPlaced.length === target.length) {
      const ok = newPlaced.every((t, i) => t.ch === target[i]);
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const xp = calcXP(ok, elapsed);
      setTimeout(() => {
        if (ok) {
          setScore(s => s+1); setFeedback('correct'); playSound('correct');
          setStreak(s => s+1); setLastXP(xp); setTotalXPEarned(t => t+xp);
        } else {
          setFeedback('wrong'); playSound('wrong'); setStreak(0); setLastXP(0);
        }
      }, 350);
    }
  };

  const removePlaced = (tileIdx) => {
    if (feedback) return;
    const tile = placed[tileIdx];
    if (!tile) return;
    setPlaced(p => p.filter((_, i) => i !== tileIdx));
    setBank(b => [...b, tile]);
  };

  const submitTyped = () => {
    if (!typed.trim() || feedback) return;
    const ok = typed.trim() === pool[idx].jp;
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const xp = calcXP(ok, elapsed);
    if (ok) {
      setScore(s => s+1); setFeedback('correct'); playSound('correct');
      speakJP(pool[idx].jp); setStreak(s => s+1); setLastXP(xp); setTotalXPEarned(t => t+xp);
    } else {
      setFeedback('wrong'); playSound('wrong'); setStreak(0); setLastXP(0);
    }
  };

  const next = () => {
    const ni = idx + 1;
    if (ni >= TOTAL) {
      const newTotalXP = roundXP + totalXPEarned;
      if (!endless && round >= totalRounds) {
        if (onXPEarned) onXPEarned(newTotalXP); setDone(true);
      } else {
        setRoundXP(newTotalXP); setRound(r => r+1);
        setPool(p => shuffle([...p]));
        setIdx(0); loadQ(0); setScore(0); setTotalXPEarned(0);
      }
    } else { setIdx(ni); loadQ(ni); }
  };

  const endSession = () => { if (onXPEarned) onXPEarned(roundXP + totalXPEarned); setDone(true); };

  if (!pool.length) return (
    <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>No phrases available yet.</div>
  );

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{endless?'ENDLESS — '+round+' rounds':'Round '+round+' / '+totalRounds} · Day {currentDay}</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{roundXP+totalXPEarned}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );

  const phrase  = pool[idx];
  const target  = phrase.jp.split('');
  const bgColor = feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor = feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e';

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      {/* Progress + streak */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          {streak >= 2 && <div style={{color:'#f59e0b',fontSize:'12px',fontWeight:'700'}}>🔥 {streak}</div>}
          <div style={{color:'#555',fontSize:'11px'}}>{tileMode?'🟣 Tile':'⌨️ Type'}</div>
        </div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      {/* Prompt card */}
      <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 20px',marginBottom:'16px',textAlign:'center'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'10px'}}>TYPE IN JAPANESE</div>
        <div style={{color:'#fff',fontSize:'20px',fontWeight:'700',lineHeight:'1.4',marginBottom:'6px'}}>
          {phrase.en.split(' — ')[0]}
        </div>
        {showHint && <div style={{color:'#6366f1',fontSize:'14px',marginBottom:'6px'}}>{phrase.romaji}</div>}
        <button onClick={()=>speakJP(phrase.jp)}
          style={{background:'rgba(99,102,241,0.15)',border:'1px solid #6366f133',borderRadius:'8px',
            color:'#6366f1',fontSize:'13px',cursor:'pointer',padding:'4px 12px',marginTop:'4px'}}>
          🔊 Hear it
        </button>
      </div>

      {/* Answer display */}
      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'14px',
        padding:'16px',marginBottom:'16px',minHeight:'72px',
        display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center',alignItems:'center',transition:'all 0.25s'}}>
        {tileMode?(
          <>
            {placed.map((tile,i)=>{
              const tgt = target[i];
              const correct = feedback && tile.ch === tgt;
              const close   = feedback && !correct && isClose(tile.ch, tgt);
              const wrong   = feedback && !correct && !close;
              const bg    = correct?'#0a2a1a':close?'#2a1a00':wrong?'#2a0a0a':'#6366f1';
              const border = correct?'#10b981':close?'#f59e0b':wrong?'#ef4444':'transparent';
              const color  = correct?'#10b981':close?'#f59e0b':wrong?'#ef4444':'#fff';
              return (
                <div key={tile.id} onClick={()=>!feedback&&removePlaced(i)}
                  style={{width:'48px',height:'52px',background:bg,border:'2px solid '+border,
                    borderRadius:'10px',display:'flex',flexDirection:'column',alignItems:'center',
                    justifyContent:'center',color,fontSize:'22px',fontWeight:'700',
                    cursor:feedback?'default':'pointer',transition:'all 0.2s',userSelect:'none'}}>
                  {tile.ch}
                  {feedback && close && <div style={{fontSize:'8px',color:'#f59e0b',marginTop:'1px'}}>~{tgt}</div>}
                </div>
              );
            })}
            {!feedback&&Array(target.length - placed.length).fill(null).map((_,i)=>(
              <div key={'blank'+i}
                style={{width:'48px',height:'52px',background:'#13131e',
                  border:'2px dashed #2a2a3e',borderRadius:'10px',
                  display:'flex',alignItems:'center',justifyContent:'center',color:'#333',fontSize:'20px'}}>
                ＿
              </div>
            ))}
            {feedback&&(
              <div style={{width:'100%',textAlign:'center',marginTop:'8px'}}>
                <div style={{color:feedback==='correct'?'#10b981':'#aaa',fontSize:'13px',fontWeight:'700'}}>
                  {feedback==='correct'?'✓ ':'Answer: '}{phrase.jp} · {phrase.romaji}
                </div>
                {feedback==='correct' && lastXP > 20 && (
                  <div style={{color:'#f59e0b',fontSize:'11px',marginTop:'4px'}}>
                    {lastXP > 25 ? '🔥 Streak bonus! ' : ''}{(Date.now() - startTimeRef.current)/1000 < 5 ? '⚡ Speed bonus!' : ''}
                  </div>
                )}
              </div>
            )}
          </>
        ):(
          <>
            {!feedback&&(
              <div style={{color:'#fff',fontSize:'32px',letterSpacing:'4px',minWidth:'80px',textAlign:'center'}}>
                {typed||<span style={{color:'#333'}}>＿</span>}
              </div>
            )}
            {feedback&&(
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:'28px',fontWeight:'700',marginBottom:'4px'}}>
                  {phrase.jp.split('').map((ch,i)=>{
                    const typed_ch = typed[i];
                    const correct  = typed_ch === ch;
                    const close_c  = typed_ch && isClose(typed_ch, ch);
                    return <span key={i} style={{color:correct?'#10b981':close_c?'#f59e0b':'#ef4444'}}>{ch}</span>;
                  })}
                </div>
                <div style={{color:'#666',fontSize:'13px'}}>{phrase.romaji}</div>
                {typed !== phrase.jp && <div style={{color:'#ef4444',fontSize:'12px',marginTop:'4px'}}>You typed: {typed}</div>}
              </div>
            )}
          </>
        )}
      </div>

      {/* Explanation after feedback */}
      {feedback&&(
        <div style={{background:'#0a0a14',border:'1px solid #1e1e30',borderRadius:'12px',padding:'12px 14px',marginBottom:'12px'}}>
          <div style={{color:'#aaa',fontSize:'13px',lineHeight:'1.6'}}>{phrase.en}</div>
        </div>
      )}

      {/* Tile bank */}
      {!feedback&&tileMode&&(
        <div style={{marginBottom:'12px'}}>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center',marginBottom:'8px',minHeight:'52px'}}>
            {bank.map(tile=>(
              <button key={tile.id} onClick={()=>placeTile(tile)}
                style={{width:'52px',height:'52px',background:'#13131e',border:'1px solid #2a2a3e',
                  borderRadius:'10px',color:'#ccc',fontSize:'24px',fontWeight:'600',cursor:'pointer',fontFamily:'inherit'}}>
                {tile.ch}
              </button>
            ))}
          </div>
          <div style={{color:'#333',fontSize:'11px',textAlign:'center'}}>Tap a placed tile to remove it</div>
        </div>
      )}

      {/* Type input */}
      {!feedback&&!tileMode&&(
        <div style={{marginBottom:'12px'}}>
          <input value={typed} onChange={e=>setTyped(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&submitTyped()}
            placeholder="日本語でタイプ..."
            style={{width:'100%',padding:'16px',background:'#0a0a14',border:'1px solid #2a2a3e',
              borderRadius:'12px',color:'#fff',fontSize:'24px',textAlign:'center',
              marginBottom:'10px',boxSizing:'border-box',outline:'none',fontFamily:'inherit'}}/>
          <button onClick={submitTyped} disabled={!typed.trim()}
            style={{width:'100%',padding:'16px',
              background:typed.trim()?'linear-gradient(135deg,#6366f1,#4f46e5)':'#1a1a2e',
              border:'none',borderRadius:'12px',color:typed.trim()?'#fff':'#333',
              fontSize:'16px',fontWeight:'900',cursor:typed.trim()?'pointer':'default'}}>
            Submit →
          </button>
        </div>
      )}

      {/* Hint / Next */}
      {!feedback?(
        <div style={{display:'flex',gap:'8px',marginTop:'auto'}}>
          <button onClick={()=>setShowHint(h=>!h)}
            style={{flex:1,padding:'14px',background:'none',border:'1px solid #2a2a3e',
              borderRadius:'14px',color:showHint?'#6366f1':'#555',fontSize:'14px',cursor:'pointer'}}>
            {showHint?'Hide hint':'💡 Romaji hint'}
          </button>
        </div>
      ):(
        <div style={{display:'flex',gap:'8px',marginTop:'auto'}}>
          {endless&&<button onClick={endSession} style={{flex:1,padding:'16px',background:'none',border:'1px solid #ef4444',borderRadius:'14px',color:'#ef4444',fontSize:'14px',cursor:'pointer'}}>End Session</button>}
          <button onClick={next}
            style={{flex:3,padding:'18px',
              background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
              border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
            {idx+1>=TOTAL?'See Results →':'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}


function FlashGauntlet({ phrases, currentDay, onBack, onXPEarned, totalRounds=1, endless=false, romajiOn=false }) {
  const getFlashMs = (jp) => {
    const len = jp ? jp.length : 1;
    if (len <= 2) return 1500;
    if (len <= 4) return 2000;
    if (len <= 6) return 2800;
    if (len <= 8) return 3500;
    return 4200;
  };
  const QUESTION_TIME = 10;
  const RESHOW_COST   = 3;
  const RESHOW_MS     = 1000;

  const isKanaOnly = (str) => /^[぀-ゟ゠-ヿ]+$/.test(str);

  const [pool, setPool] = useState(() => {
    const eligible = phrases.filter(p => p.jp && isKanaOnly(p.jp));
    const source   = eligible.length >= 4 ? eligible : phrases.filter(p => p.jp);
    const byDay = {};
    source.forEach(p => { if(!byDay[p.dayNum]) byDay[p.dayNum]=[]; byDay[p.dayNum].push(p); });
    const stratified = Object.values(byDay).flatMap(day => shuffle(day).slice(0, 3));
    const today = source.filter(p => p.dayNum === currentDay);
    return shuffle([...stratified, ...today]).slice(0, Math.min(8, stratified.length + today.length));
  });

  const TOTAL = pool.length;

  const buildQuestion = (qIdx) => {
    const correct     = pool[qIdx];
    const distractors = shuffle(phrases.filter(p => p.jp !== correct.jp)).slice(0, 3);
    return { correct, options: shuffle([correct, ...distractors]) };
  };

  const [idx, setIdx]               = useState(0);
  const [question, setQuestion]     = useState(() => buildQuestion(0));
  const [phase, setPhase]           = useState('flash');
  const [timeLeft, setTimeLeft]     = useState(QUESTION_TIME);
  const [showRomaji, setShowRomaji] = useState(romajiOn);
  const [reshowing, setReshowing]   = useState(false);
  const [selected, setSelected]     = useState(null);
  const [feedback, setFeedback]     = useState(null);
  const [score, setScore]           = useState(0);
  const [done, setDone]             = useState(false);
  const [round, setRound]           = useState(1);
  const [roundXP, setRoundXP]       = useState(0);

  const timerRef = useRef(null);
  const flashRef = useRef(null);
  const timeRef  = useRef(QUESTION_TIME);

  const stopTimer = () => { if(timerRef.current) clearInterval(timerRef.current); };

  const startAnswerPhase = () => {
    setPhase('answer');
    timeRef.current = QUESTION_TIME;
    setTimeLeft(QUESTION_TIME);
    timerRef.current = setInterval(() => {
      timeRef.current = Math.round((timeRef.current - 0.1) * 10) / 10;
      if(timeRef.current <= 0){
        timeRef.current = 0;
        setTimeLeft(0);
        stopTimer();
        setPhase('result');
        setFeedback('timeout');
      } else {
        setTimeLeft(timeRef.current);
      }
    }, 100);
  };

  const beginQuestion = (phrase) => {
    setPhase('flash');
    setTimeLeft(QUESTION_TIME);
    setSelected(null);
    setFeedback(null);
    setReshowing(false);
    flashRef.current = setTimeout(() => startAnswerPhase(), getFlashMs(phrase?.jp));
  };

  useEffect(() => {
    beginQuestion(pool[0]?.correct);
    return () => { clearTimeout(flashRef.current); stopTimer(); };
  }, []);

  const answer = (opt) => {
    if(phase !== 'answer') return;
    stopTimer();
    setSelected(opt);
    setPhase('result');
    const ok = opt.jp === question.correct.jp;
    if(ok){ setScore(s => s+1); setFeedback('correct'); playSound('correct'); }
    else  { setFeedback('wrong'); playSound('wrong'); }
  };

  const reshow = () => {
    if(phase !== 'answer' || reshowing) return;
    timeRef.current = Math.max(1, timeRef.current - RESHOW_COST);
    setTimeLeft(timeRef.current);
    setReshowing(true);
    speakJP(question.correct.jp);
    setTimeout(() => setReshowing(false), RESHOW_MS);
  };

  const next = () => {
    stopTimer(); clearTimeout(flashRef.current);
    const ni = idx + 1;
    if(ni >= TOTAL){
      const xp    = score * 20;
      const total = roundXP + xp;
      if(!endless && round >= totalRounds){
        if(onXPEarned) onXPEarned(total); setDone(true);
      } else {
        setRoundXP(total); setRound(r => r+1); setScore(0);
        const reshuffled = shuffle([...pool]);
        setPool(reshuffled);
        const newQ0 = buildQuestion(0);
        setIdx(0); setQuestion(newQ0);
        beginQuestion(newQ0.correct);
      }
    } else {
      const newQN = buildQuestion(ni);
      setIdx(ni); setQuestion(newQN);
      beginQuestion(newQN.correct);
    }
  };

  useEffect(() => () => { stopTimer(); clearTimeout(flashRef.current); }, [done]);

  const endSession = () => {
    stopTimer(); clearTimeout(flashRef.current);
    if(onXPEarned) onXPEarned(roundXP + score*20); setDone(true);
  };

  if(done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{endless?'ENDLESS — '+round+' rounds':'Round '+round+' / '+totalRounds} · Day {currentDay}</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{score*20}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );

  const timerPct   = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = timeLeft > 6 ? '#10b981' : timeLeft > 3 ? '#f59e0b' : '#ef4444';

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless?'∞':'Round '+round+'/'+totalRounds} · Day {currentDay}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      {/* Flash card */}
      <div style={{background:'#10101c',borderRadius:'16px',padding:'40px 20px',marginBottom:'20px',
        textAlign:'center',minHeight:'140px',display:'flex',flexDirection:'column',
        alignItems:'center',justifyContent:'center'}}>
        {phase === 'flash' && (
          <>
            <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'16px'}}>READ THIS</div>
            <div style={{color:'#fff',fontSize:'52px',fontWeight:'900',letterSpacing:'4px',lineHeight:'1.2'}}>{question.correct.jp}</div>
          </>
        )}
        {phase === 'answer' && reshowing && (
          <div style={{color:'#fff',fontSize:'52px',fontWeight:'900',letterSpacing:'4px',lineHeight:'1.2'}}>{question.correct.jp}</div>
        )}
        {phase === 'answer' && !reshowing && (
          <div style={{color:'#2a2a3e',fontSize:'16px',fontWeight:'700',letterSpacing:'2px'}}>? ? ?</div>
        )}
        {phase === 'result' && (
          <>
            <div style={{color:'#fff',fontSize:'40px',fontWeight:'900',letterSpacing:'3px',marginBottom:'8px'}}>{question.correct.jp}</div>
            <div style={{color:'#555',fontSize:'14px'}}>{question.correct.romaji}</div>
          </>
        )}
      </div>

      {/* Timer + controls row — answer phase */}
      {phase === 'answer' && (
        <>
          <div style={{height:'5px',background:'#1e1e30',borderRadius:'3px',marginBottom:'8px',overflow:'hidden'}}>
            <div style={{height:'100%',width:timerPct+'%',background:timerColor,transition:'width 0.1s linear,background 0.3s',borderRadius:'3px'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px'}}>
            <div style={{color:timerColor,fontSize:'22px',fontWeight:'900'}}>{timeLeft.toFixed(1)}s</div>
            <button onClick={reshow} disabled={reshowing}
              style={{padding:'6px 12px',
                background:reshowing?'#13131e':'#1a1a2e',
                border:'1px solid '+(reshowing?'#1e1e30':'#6366f1'),
                borderRadius:'8px',color:reshowing?'#333':'#6366f1',
                fontSize:'12px',fontWeight:'700',cursor:reshowing?'default':'pointer'}}>
              {reshowing ? 'Reshowing...' : 'Reshow -'+RESHOW_COST+'s'}
            </button>
          </div>
        </>
      )}


      {/* Options */}
      {(phase === 'answer' || phase === 'result') && (
        <div style={{display:'flex',flexDirection:'column',gap:'10px',flex:1}}>
          {question.options.map((opt, i) => {
            const isSelected = selected?.jp === opt.jp;
            const isCorrect  = phase==='result' && opt.jp === question.correct.jp;
            const isWrong    = phase==='result' && isSelected && opt.jp !== question.correct.jp;
            return (
              <button key={opt.jp+i} onClick={()=>answer(opt)} disabled={phase==='result'}
                style={{padding:'14px 18px',
                  background:isCorrect?'#0a2a1a':isWrong?'#1a0a0a':'#10101c',
                  border:'2px solid '+(isCorrect?'#10b981':isWrong?'#ef4444':isSelected?'#6366f1':'#1e1e30'),
                  borderRadius:'12px',color:isCorrect?'#10b981':isWrong?'#ef4444':'#ccc',
                  fontSize:'14px',fontWeight:isSelected?'700':'400',
                  textAlign:'left',cursor:phase==='result'?'default':'pointer',
                  fontFamily:'inherit',transition:'all 0.15s'}}>
                <span style={{color:'#444',marginRight:'10px',fontSize:'12px'}}>{['A','B','C','D'][i]}</span>
                {opt.en.split(' — ')[0]}
                {showRomaji && <span style={{color:'#6366f1',fontSize:'11px',marginLeft:'8px'}}>· {opt.romaji}</span>}
              </button>
            );
          })}
        </div>
      )}

      {phase === 'result' && feedback === 'timeout' && (
        <div style={{background:'#1a0a0a',border:'1px solid #ef444433',borderRadius:'12px',
          padding:'12px',marginTop:'12px',textAlign:'center',color:'#ef4444',fontSize:'13px',fontWeight:'700'}}>
          Time's up!
        </div>
      )}

      {phase === 'result' && (
        <div style={{display:'flex',gap:'8px',marginTop:'12px'}}>
          {endless && <button onClick={endSession} style={{flex:1,padding:'14px',background:'none',border:'1px solid #ef4444',borderRadius:'14px',color:'#ef4444',fontSize:'14px',cursor:'pointer'}}>End</button>}
          <button onClick={next}
            style={{flex:3,padding:'18px',
              background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
              border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
            {idx+1>=TOTAL ? 'See Results →' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════
// DICTATION DROP — #87 Words & Phrases
// Audio plays a phrase. User types the kana.
// No hints, no multiple choice. Pure recall.
// ═══════════════════════════════════════════
function DictationDrop({ phrases, currentDay, onBack, onXPEarned, totalRounds=1, endless=false }) {
  const isKanaOnly = (str) => /^[぀-ゟ゠-ヿ]+$/.test(str);

  const isKanaOnlyPool = (str) => !/[一-鿿㐀-䶿]/.test(str);
  const [pool, setPool] = useState(() => {
    const eligible = phrases.filter(p => p.jp && p.en && isKanaOnlyPool(p.jp));
    const source   = eligible.length > 0 ? eligible : phrases.filter(p => p.jp && p.en);
    const byDay = {};
    source.forEach(p => { if(!byDay[p.dayNum]) byDay[p.dayNum]=[]; byDay[p.dayNum].push(p); });
    const stratified = Object.values(byDay).flatMap(day => shuffle(day).slice(0, 3));
    const today = source.filter(p => p.dayNum === currentDay);
    return shuffle([...stratified, ...today]).slice(0, Math.min(8, stratified.length + today.length));
  });

  const TOTAL = pool.length;

  const [idx, setIdx]           = useState(0);
  const [typed, setTyped]       = useState('');
  const [feedback, setFeedback] = useState(null);
  const [played, setPlayed]     = useState(false);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [round, setRound]       = useState(1);
  const [roundXP, setRoundXP]   = useState(0);
  const [replays, setReplays]   = useState(0);
  const inputRef = useRef(null);

  const playAudio = () => {
    speakJP(pool[idx].jp);
    setPlayed(true);
    setReplays(r => r + 1);
  };

  useEffect(() => {
    // Auto-play when question loads
    const t = setTimeout(() => playAudio(), 600);
    return () => clearTimeout(t);
  }, [idx]);

  useEffect(() => {
    if(played && inputRef.current) inputRef.current.focus();
  }, [played]);

  const normalize = (str) => str.trim().replace(/s+/g, '');

  const submit = () => {
    if (!typed.trim() || feedback) return;
    const correct = normalize(pool[idx].jp);
    const answer  = normalize(typed);
    const ok      = answer === correct;
    if (ok) { setScore(s => s+1); setFeedback('correct'); playSound('correct'); }
    else    { setFeedback('wrong'); playSound('wrong'); }
  };

  const loadQ = (qIdx) => {
    setTyped(''); setFeedback(null); setPlayed(false); setReplays(0);
  };

  const next = () => {
    const ni = idx + 1;
    if (ni >= TOTAL) {
      const xpThisRound = score * 25;
      const newTotalXP  = roundXP + xpThisRound;
      if (!endless && round >= totalRounds) {
        if (onXPEarned) onXPEarned(newTotalXP); setDone(true);
      } else {
        setRoundXP(newTotalXP); setRound(r => r+1);
        setPool(p => shuffle([...p]));
        setIdx(0); loadQ(0); setScore(0);
      }
    } else {
      setIdx(ni); loadQ(ni);
    }
  };

  const endSession = () => { if (onXPEarned) onXPEarned(roundXP + score*25); setDone(true); };

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{endless?'ENDLESS — '+round+' rounds':'Round '+round+' / '+totalRounds} · Day {currentDay}</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{score*25}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );

  const phrase   = pool[idx];
  const bgColor  = feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor  = feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e';

  // Character-level diff for wrong answers
  const renderDiff = () => {
    const target = normalize(phrase.jp).split('');
    const answer = normalize(typed).split('');
    return target.map((ch, i) => {
      const given = answer[i];
      const ok    = given === ch;
      return <span key={i} style={{color:ok?'#10b981':'#ef4444',fontSize:'32px',fontWeight:'700'}}>{ch}</span>;
    });
  };

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      {/* Progress */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless?'∞':'Round '+round+'/'+totalRounds} · Day {currentDay}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      {/* Audio card */}
      <div style={{background:'#10101c',borderRadius:'16px',padding:'32px 20px',marginBottom:'20px',textAlign:'center'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'20px'}}>WHAT DID YOU HEAR?</div>
        <button onClick={playAudio}
          style={{width:'80px',height:'80px',borderRadius:'50%',
            background:played?'#1e1e30':'linear-gradient(135deg,#6366f1,#4f46e5)',
            border:'2px solid '+(played?'#2a2a3e':'#6366f1'),
            color:'#fff',fontSize:'32px',cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto',
            transition:'all 0.2s'}}>
          🔊
        </button>
        {replays > 1 && (
          <div style={{color:'#333',fontSize:'11px',marginTop:'12px'}}>Replayed {replays}×</div>
        )}
        {!played && (
          <div style={{color:'#555',fontSize:'13px',marginTop:'12px'}}>Tap to hear the phrase</div>
        )}
      </div>

      {/* Answer area */}
      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'14px',
        padding:'20px',marginBottom:'16px',minHeight:'80px',
        display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
        transition:'all 0.25s',textAlign:'center'}}>
        {!feedback && (
          <div style={{color:typed?'#fff':'#333',fontSize:'28px',letterSpacing:'3px',minHeight:'40px'}}>
            {typed || (played ? '　' : '...')}
          </div>
        )}
        {feedback === 'correct' && (
          <>
            <div style={{color:'#10b981',fontSize:'28px',fontWeight:'700',letterSpacing:'3px'}}>{phrase.jp}</div>
            <div style={{color:'#10b981',fontSize:'13px',marginTop:'6px'}}>{phrase.romaji}</div>
          </>
        )}
        {feedback === 'wrong' && (
          <>
            <div style={{letterSpacing:'3px',marginBottom:'8px'}}>{renderDiff()}</div>
            <div style={{color:'#ef4444',fontSize:'12px',marginBottom:'4px'}}>You typed: <span style={{color:'#aaa'}}>{typed}</span></div>
            <div style={{color:'#10b981',fontSize:'13px'}}>Correct: {phrase.jp} · {phrase.romaji}</div>
          </>
        )}
      </div>

      {/* Breakdown after answer */}
      {feedback && (
        <div style={{background:'#0a0a14',border:'1px solid #1e1e30',borderRadius:'12px',
          padding:'12px 14px',marginBottom:'12px',textAlign:'center'}}>
          <div style={{color:'#fff',fontSize:'16px',marginBottom:'4px'}}>{phrase.en.split(' — ')[0]}</div>
          <div style={{color:'#555',fontSize:'12px'}}>{phrase.en.split(' — ')[1]||''}</div>
        </div>
      )}

      {/* Input */}
      {!feedback && played && (
        <div style={{marginBottom:'12px'}}>
          <input ref={inputRef} value={typed} onChange={e=>setTyped(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&submit()}
            placeholder="Type what you heard in Japanese..."
            style={{width:'100%',padding:'16px',background:'#0a0a14',border:'1px solid #2a2a3e',
              borderRadius:'12px',color:'#fff',fontSize:'22px',textAlign:'center',
              marginBottom:'10px',boxSizing:'border-box',outline:'none',fontFamily:'inherit'}}/>
          <button onClick={submit} disabled={!typed.trim()}
            style={{width:'100%',padding:'16px',
              background:typed.trim()?'linear-gradient(135deg,#6366f1,#4f46e5)':'#1a1a2e',
              border:'none',borderRadius:'12px',
              color:typed.trim()?'#fff':'#333',fontSize:'16px',fontWeight:'900',
              cursor:typed.trim()?'pointer':'default'}}>
            Submit →
          </button>
        </div>
      )}

      {/* Next button */}
      {feedback ? (
        <div style={{display:'flex',gap:'8px',marginTop:'auto'}}>
          {endless && <button onClick={endSession} style={{flex:1,padding:'14px',background:'none',border:'1px solid #ef4444',borderRadius:'14px',color:'#ef4444',fontSize:'14px',cursor:'pointer'}}>End</button>}
          <button onClick={next}
            style={{flex:3,padding:'18px',
              background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
              border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
            {idx+1>=TOTAL?'See Results →':'Next →'}
          </button>
        </div>
      ) : (
        <div style={{marginTop:'auto',color:'#333',fontSize:'12px',textAlign:'center'}}>
          {played ? 'Switch to Japanese keyboard · type what you heard · press Enter' : 'Tap the button to hear the phrase'}
        </div>
      )}
    </div>
  );
}


function buildCharacterQuiz(dayData, config = {}) {
  const { script = 'mix', count = 20 } = config;
  const { hiragana = [], katakana = [] } = dayData;
  const pool = [...hiragana, ...katakana];
  if (pool.length < 2) return [];

  // Type 1: See character → type romaji
  const makeCharSoundQ = (char, cat) => ({
    type: "charSound", cat,
    q: "Type the romaji:\n" + char.char,
    answer: char.romaji, answers: [char.romaji],
    exp: char.char + " = '" + char.romaji + "'"
  });

  // Type 2: See romaji → pick correct character from 4
  const makePickCharQ = (char, cat) => {
    const wrongs = pool.filter(c => c.char !== char.char && c.romaji !== char.romaji)
      .sort(() => Math.random() - 0.5).slice(0, 3);
    if (wrongs.length < 3) return null;
    const opts = shuffle([char, ...wrongs]);
    return { type: "mc", cat,
      q: "Which character makes the '" + char.romaji + "' sound?",
      options: opts.map(o => o.char), answer: opts.findIndex(o => o.char === char.char),
      exp: "'" + char.romaji + "' = " + char.char };
  };

  // Type 3: See character → pick correct romaji from 4
  const makePickRomajiQ = (char, cat) => {
    const wrongs = pool.filter(c => c.romaji !== char.romaji)
      .sort(() => Math.random() - 0.5).slice(0, 3);
    if (wrongs.length < 3) return null;
    const opts = shuffle([char.romaji, ...wrongs.map(w => w.romaji)]);
    return { type: "mc", cat,
      q: "What sound does " + char.char + " make?",
      options: opts, answer: opts.indexOf(char.romaji),
      exp: char.char + " = '" + char.romaji + "'" };
  };

  // Type 4: True/False — does this character make this sound?
  const makeTFQ = (char, cat) => {
    const useCorrect = Math.random() > 0.5;
    const wrong = pool.filter(c => c.romaji !== char.romaji)
      .sort(() => Math.random() - 0.5)[0];
    if (!wrong) return null;
    const claimedRomaji = useCorrect ? char.romaji : wrong.romaji;
    return { type: "tf", cat,
      q: "The character " + char.char + " makes the '" + claimedRomaji + "' sound.",
      answer: useCorrect,
      exp: char.char + " = '" + char.romaji + "'" + (useCorrect ? " — correct!" : " — it actually makes '" + char.romaji + "'") };
  };

  const makeAll = (chars, cat) => {
    const qs = [];
    chars.forEach(ch => {
      qs.push(makeCharSoundQ(ch, cat));
      const pcq = makePickCharQ(ch, cat);  if (pcq) qs.push(pcq);
      const prq = makePickRomajiQ(ch, cat); if (prq) qs.push(prq);
      const tfq = makeTFQ(ch, cat);         if (tfq) qs.push(tfq);
    });
    return qs;
  };

  let hiraQs = script !== 'katakana' ? makeAll(hiragana, "Hiragana") : [];
  let kataQs = script !== 'hiragana' ? makeAll(katakana, "Katakana") : [];

  let questions = shuffle([...hiraQs, ...kataQs]);
  if (count !== 'all') questions = questions.slice(0, count);
  return questions;
}

// Quiz 2 — 30 questions: all learned chars, up to 15 sampled, 2 question types each
function buildCharacterQuizAll(allDays, currentDay, config = {}) {
  const { script = 'mix', count = 30 } = config;
  const learned = allDays.filter(d => d.day <= currentDay.day);
  const allHira = learned.flatMap(d => d.hiragana || []);
  const allKata = learned.flatMap(d => d.katakana || []);
  const fullPool = [...allHira, ...allKata];
  if (fullPool.length < 2) return [];

  // 4 question types — same as daily quiz
  const makeCharSoundQ = (char, cat) => ({
    type: "charSound", cat,
    q: "Type the romaji:\n" + char.char,
    answer: char.romaji, answers: [char.romaji],
    exp: char.char + " = '" + char.romaji + "'"
  });
  const makePickCharQ = (char, cat) => {
    const wrongs = fullPool.filter(c => c.char !== char.char && c.romaji !== char.romaji)
      .sort(() => Math.random() - 0.5).slice(0, 3);
    if (wrongs.length < 3) return null;
    const opts = shuffle([char, ...wrongs]);
    return { type: "mc", cat,
      q: "Which character makes the '" + char.romaji + "' sound?",
      options: opts.map(o => o.char), answer: opts.findIndex(o => o.char === char.char),
      exp: "'" + char.romaji + "' = " + char.char };
  };
  const makePickRomajiQ = (char, cat) => {
    const wrongs = fullPool.filter(c => c.romaji !== char.romaji)
      .sort(() => Math.random() - 0.5).slice(0, 3);
    if (wrongs.length < 3) return null;
    const opts = shuffle([char.romaji, ...wrongs.map(w => w.romaji)]);
    return { type: "mc", cat,
      q: "What sound does " + char.char + " make?",
      options: opts, answer: opts.indexOf(char.romaji),
      exp: char.char + " = '" + char.romaji + "'" };
  };
  const makeTFQ = (char, cat) => {
    const useCorrect = Math.random() > 0.5;
    const wrong = fullPool.filter(c => c.romaji !== char.romaji).sort(() => Math.random() - 0.5)[0];
    if (!wrong) return null;
    const claimedRomaji = useCorrect ? char.romaji : wrong.romaji;
    return { type: "tf", cat,
      q: "The character " + char.char + " makes the '" + claimedRomaji + "' sound.",
      answer: useCorrect,
      exp: char.char + " = '" + char.romaji + "'" + (useCorrect ? " — correct!" : " — it makes '" + char.romaji + "', not '" + claimedRomaji + "'") };
  };

  // Sample chars: with 4 types each, count/4 chars gives ~count questions
  const maxChars = Math.ceil(count / 4);
  let sample = [];
  if (script === 'hiragana') {
    sample = shuffle(allHira).slice(0, maxChars).map(ch => ({ char: ch, cat: 'Hiragana' }));
  } else if (script === 'katakana') {
    sample = shuffle(allKata).slice(0, maxChars).map(ch => ({ char: ch, cat: 'Katakana' }));
  } else {
    const half = Math.ceil(maxChars / 2);
    sample = [
      ...shuffle(allHira).slice(0, half).map(ch => ({ char: ch, cat: 'Hiragana' })),
      ...shuffle(allKata).slice(0, half).map(ch => ({ char: ch, cat: 'Katakana' })),
    ];
  }

  const questions = sample.flatMap(({ char, cat }) => {
    const qs = [makeCharSoundQ(char, cat)];
    const pcq = makePickCharQ(char, cat);   if (pcq) qs.push(pcq);
    const prq = makePickRomajiQ(char, cat); if (prq) qs.push(prq);
    const tfq = makeTFQ(char, cat);         if (tfq) qs.push(tfq);
    return qs;
  });
  let result = shuffle(questions).slice(0, count);
  return result;
}

// ═══════════════════════════════════════════════════════
// PARTICLE DATA — 10 core particles, introduced gradually
// introduced: day number when first relevant
// ═══════════════════════════════════════════════════════
const PARTICLE_DATA = [
  {
    particle:"か", romaji:"ka", name:"Question Marker", color:"#6366f1", introduced:6,
    intro:"Add か to the end of any sentence to turn it into a question. No word order change needed — just add か and it becomes a question.",
    examples:[
      {jp:"だいじょうぶ　です　か", romaji:"Daijoubu desu ka?", en:"Are you okay?"},
      {jp:"これは　いくら　です　か", romaji:"Kore wa ikura desu ka?", en:"How much is this?"},
      {jp:"どこ　です　か", romaji:"Doko desu ka?", en:"Where is it?"},
    ],
    variations:[
      "Statement to question: げんきです → げんきですか (I am well → Are you well?)",
      "Embedded why: なぜですか — Why is that?",
      "Confirmation: そうですか — Is that so? / I see.",
    ],
    mistakes:[
      "Do not add ? after か — か IS the question mark. Just か at the end.",
      "Do not flip word order like English. Just add か to the end.",
    ],
    quiz:[
      {q:"Turn daijoubu desu into a question.", options:["か + だいじょうぶです","だいじょうぶですか","だいじょうぶです？"], answer:1, exp:"Just add か to the end. No word order change needed."},
      {q:"Adding か to a sentence makes it...", options:["Negative","A question","More polite"], answer:1, exp:"か is the question particle — it turns any sentence into a question."},
    ],
  },
  {
    particle:"ね", romaji:"ne", name:"Agreement Seeker", color:"#10b981", introduced:21,
    intro:"ね is added to share an observation or feeling and invite the listener to agree — like saying right? or isn't it? It creates connection.",
    examples:[
      {jp:"すごい　です　ね", romaji:"Sugoi desu ne?", en:"That is amazing, isn't it?"},
      {jp:"たいへん　です　ね", romaji:"Taihen desu ne.", en:"That is tough, isn't it?"},
      {jp:"なつかしい　です　ね", romaji:"Natsukashii desu ne.", en:"It is nostalgic, right?"},
    ],
    variations:[
      "Shared feeling: もったいないですね — What a waste, right?",
      "Agreement: そうですね — That is right, isn't it / I agree",
      "Softens statements — makes them warmer and more conversational",
    ],
    mistakes:[
      "ね seeks agreement — use it when you want the listener to relate or agree.",
      "Do not confuse with よ: ね is asking right? while よ is asserting I am telling you!",
    ],
    quiz:[
      {q:"Your friend had a hard day. You want to say That must be tough, right? Which is correct?", options:["たいへんですよ","たいへんですね","たいへんですか"], answer:1, exp:"ね seeks shared understanding — perfect for inviting empathy."},
      {q:"ね is best used when you want to...", options:["Assert something strongly","Seek agreement or share a feeling","Ask a direct question"], answer:1, exp:"ね invites the listener into a shared feeling or observation."},
    ],
  },
  {
    particle:"よ", romaji:"yo", name:"Emphasis / Assertion", color:"#f59e0b", introduced:11,
    intro:"よ asserts something the listener may not know, or emphasizes your point. It adds conviction — like saying I am telling you! or Trust me on this.",
    examples:[
      {jp:"だいじょうぶ　です　よ", romaji:"Daijoubu desu yo!", en:"It is okay! (reassuring you — trust me)"},
      {jp:"もったいない　です　よ", romaji:"Mottainai desu yo!", en:"It IS wasteful! (asserting strongly)"},
      {jp:"あそこ　です　よ", romaji:"Asoko desu yo.", en:"It is over there. (telling you something you did not know)"},
    ],
    variations:[
      "Reassurance: だいじょうぶですよ — It is really okay",
      "New info: あそこですよ — FYI, it is over there",
      "Mild insistence: そうですよ — That is right, you know",
    ],
    mistakes:[
      "よ can sound pushy — Japanese use it selectively, not after every sentence.",
      "ね vs よ: ね says right? seeking agreement; よ says it IS this way, asserting.",
    ],
    quiz:[
      {q:"Your friend is worried. You want to strongly reassure them. Which do you say?", options:["だいじょうぶですね","だいじょうぶですか","だいじょうぶですよ"], answer:2, exp:"よ adds conviction to your reassurance — It IS okay, I am telling you!"},
      {q:"よ tells the listener something they...", options:["Already know and agree with","Do not know yet or need to hear","Should disagree with"], answer:1, exp:"よ asserts new or important info to someone who does not have it yet."},
    ],
  },
  {
    particle:"は", romaji:"wa", name:"Topic Marker", color:"#a855f7", introduced:1,
    intro:"は (written は but read as wa) marks the TOPIC — what the sentence is ABOUT. Think of it as: As for X, ... Everything after は describes that topic.",
    examples:[
      {jp:"これは　もったいない　です", romaji:"Kore WA mottainai desu.", en:"As for this — it is wasteful."},
      {jp:"わたしは　だいじょうぶ　です", romaji:"Watashi WA daijoubu desu.", en:"As for me — I am fine."},
      {jp:"トイレは　どこ　です　か", romaji:"Toire WA doko desu ka?", en:"As for the bathroom — where is it?"},
    ],
    variations:[
      "Introduces topic: わたしは... (As for me...)",
      "Contrast: これは...でも、それは... (This one...but that one...)",
      "Once set, the topic stays understood across several sentences",
    ],
    mistakes:[
      "は is written with the は hiragana but read as wa when used as a particle — NOT ha.",
      "は vs が: は marks the TOPIC (what you are talking about); が marks the specific SUBJECT doing the action.",
    ],
    quiz:[
      {q:"Fill in the blank: これ___ だいじょうぶです. (As for this, it is okay.)", options:["が","は","を"], answer:1, exp:"は marks the topic — これは sets this as what we are talking about."},
      {q:"は is pronounced...", options:["ha always","wa as a particle, ha in other uses","ba always"], answer:1, exp:"は is a special case: read ha in words, but wa as a particle."},
    ],
  },
  {
    particle:"も", romaji:"mo", name:"Also / Too / Even", color:"#ec4899", introduced:11,
    intro:"も replaces は or が to add also, too, or even. If something is true for X, も says it is also true for this other thing.",
    examples:[
      {jp:"わたし　も　だいじょうぶ　です", romaji:"Watashi MO daijoubu desu.", en:"I am fine too."},
      {jp:"これ　も　おいしい　です", romaji:"Kore MO oishii desu.", en:"This is delicious too."},
      {jp:"なに　も　わかりません", romaji:"Nani MO wakarimasen.", en:"I do not understand anything."},
    ],
    variations:[
      "Positive: Xも — X also / X too",
      "Negative: なにも + negative verb — nothing / not anything",
      "Stacking: AもBも — both A and B",
    ],
    mistakes:[
      "も replaces は/が — do not say わたしはも (wrong); say わたしも (correct).",
      "も + negative verb = not either or nothing",
    ],
    quiz:[
      {q:"How do you say Me too?", options:["わたしはです","わたしもです","わたしがです"], answer:1, exp:"も replaces は here — わたしも = me too / I also"},
      {q:"も replaces which particles?", options:["に and で","は and が","を and の"], answer:1, exp:"も replaces the subject and topic markers は and が to add the also/too meaning."},
    ],
  },
  {
    particle:"の", romaji:"no", name:"Possessive / Connector", color:"#06b6d4", introduced:1,
    intro:"の connects two nouns — it works like an apostrophe-s in English. A の B means B of A. It shows possession, belonging, type, or relationship.",
    examples:[
      {jp:"わたし　の　ともだち", romaji:"Watashi NO tomodachi", en:"My friend"},
      {jp:"にほん　の　ぶんか", romaji:"Nihon NO bunka", en:"Japanese culture (culture of Japan)"},
      {jp:"きょう　の　レッスン", romaji:"Kyou NO ressun", en:"Today's lesson"},
    ],
    variations:[
      "Possession: わたしの本 — my book",
      "Origin/Type: にほんのたべもの — Japanese food",
      "Time: きょうの... — today's...",
      "Sentence-final の: casual explanation request — なんでなの? (Why is that?)",
    ],
    mistakes:[
      "A の B — A modifies B. わたしのほん = the book belonging to me.",
      "の connects nouns — you cannot directly put a verb before の in basic usage.",
    ],
    quiz:[
      {q:"How do you say Japan's culture?", options:["にほんをぶんか","にほんのぶんか","にほんにぶんか"], answer:1, exp:"の connects にほん (Japan) to ぶんか (culture) — culture of Japan"},
      {q:"の is similar to which English construction?", options:["A or B","Apostrophe-s possession — A's B","A and B"], answer:1, exp:"の works like apostrophe-s or of — showing how two nouns relate."},
    ],
  },
  {
    particle:"を", romaji:"wo (o)", name:"Direct Object Marker", color:"#f97316", introduced:6,
    intro:"を marks the DIRECT OBJECT — the thing being acted on. I eat RICE — rice gets を. I study JAPANESE — Japanese gets を.",
    examples:[
      {jp:"ごはん　を　たべます", romaji:"Gohan WO tabemasu.", en:"I eat rice. (rice = acted on)"},
      {jp:"にほんご　を　べんきょうします", romaji:"Nihongo WO benkyou shimasu.", en:"I study Japanese."},
      {jp:"おちゃ　を　のみます", romaji:"Ocha WO nomimasu.", en:"I drink tea."},
    ],
    variations:[
      "Action on a thing: ほんをよむ — read a book",
      "Movement through space: みちをあるく — walk down the street",
      "What you are learning: にほんごをれんしゅうする",
    ],
    mistakes:[
      "を is written を but pronounced o in modern Japanese (not wo).",
      "を only appears with action verbs — it marks what the verb acts ON.",
    ],
    quiz:[
      {q:"I study Japanese. What particle marks にほんご?", options:["は","が","を"], answer:2, exp:"を marks the direct object — Japanese is what you study (the thing acted on)."},
      {q:"を marks...", options:["The topic of the sentence","The thing being acted on","The location of the action"], answer:1, exp:"を = direct object marker. The thing the action is done TO."},
    ],
  },
  {
    particle:"が", romaji:"ga", name:"Subject Marker", color:"#ef4444", introduced:16,
    intro:"が marks the SUBJECT doing the action, or highlights what is specifically being identified. Unlike は (general topic), が points to something specific or new.",
    examples:[
      {jp:"だれ　が　きます　か", romaji:"Dare GA kimasu ka?", en:"Who is coming? (が highlights the unknown)"},
      {jp:"あめ　が　ふっています", romaji:"Ame GA futte imasu.", en:"It is raining. (rain = the subject)"},
      {jp:"にほんご　が　すき　です", romaji:"Nihongo GA suki desu.", en:"I like Japanese."},
    ],
    variations:[
      "Identifies the specific one: これが本です — THIS is the book (not others)",
      "With emotion/desire/ability: Xがすきです / Xができます",
      "Answers WHO or WHAT questions",
    ],
    mistakes:[
      "は vs が: は = As for topic... (general); が = It is specifically subject... (focused/new info).",
      "Verbs of emotion and ability often use が: にほんごがすき (not にほんごはすき).",
    ],
    quiz:[
      {q:"Who won? — Tanaka did. Which particle marks Tanaka?", options:["たなかはかちました","たなかがかちました","たなかをかちました"], answer:1, exp:"が identifies the specific answer to who — it pinpoints Tanaka."},
      {q:"が is often used to...", options:["Mark the general topic","Highlight something specific or new","Mark location"], answer:1, exp:"が focuses attention on a specific subject or answers identity questions."},
    ],
  },
  {
    particle:"に", romaji:"ni", name:"Direction / Location / Time", color:"#84cc16", introduced:16,
    intro:"に is one of the most versatile particles. It marks: WHERE you are going TO, WHERE something EXISTS, WHEN something happens, and WHO receives something.",
    examples:[
      {jp:"がっこう　に　いきます", romaji:"Gakkou NI ikimasu.", en:"I go TO school. (direction)"},
      {jp:"テーブルのうえ　に　あります", romaji:"Teeburu no ue NI arimasu.", en:"It is ON the table. (location of existence)"},
      {jp:"しちじ　に　おきます", romaji:"Shichi-ji NI okimasu.", en:"I wake up AT seven. (specific time)"},
    ],
    variations:[
      "Direction going TO: がっこうに — to school",
      "Existence IS at: テーブルにある — exists at the table",
      "Specific time: しちじに — at 7 o'clock",
      "Recipient: ともだちに — to or for a friend",
    ],
    mistakes:[
      "に vs で: に = where something EXISTS or where you are GOING; で = where an ACTION HAPPENS.",
      "Relative times like きょう and あした do not use に — only specific times do.",
    ],
    quiz:[
      {q:"You are going TO the store. What particle marks store?", options:["みせでいきます","みせにいきます","みせをいきます"], answer:1, exp:"に marks direction/destination — going TO the store."},
      {q:"に can mark which of these?", options:["Only locations","Direction, existence location, and specific time","Only where actions happen"], answer:1, exp:"に is versatile: direction (going to), existence (is at), and specific times."},
    ],
  },
  {
    particle:"で", romaji:"de", name:"Action Location / Means", color:"#0ea5e9", introduced:21,
    intro:"で marks WHERE an action takes place, or BY WHAT MEANS something is done. If に is where something exists, で is where something HAPPENS. Also marks tools and methods.",
    examples:[
      {jp:"としょかん　で　べんきょうします", romaji:"Toshokan DE benkyou shimasu.", en:"I study AT the library. (action happens there)"},
      {jp:"でんしゃ　で　きます", romaji:"Densha DE kimasu.", en:"I come BY train. (means/method)"},
      {jp:"はし　で　たべます", romaji:"Hashi DE tabemasu.", en:"I eat WITH chopsticks. (tool)"},
    ],
    variations:[
      "Action location: としょかんで — studying happens at the library",
      "Means/method: でんしゃで — by train",
      "Tool: はしで — with chopsticks",
      "Reason: びょうきで — due to illness",
    ],
    mistakes:[
      "に vs で: テーブルにある (EXISTS on the table) vs テーブルでたべる (eating AT the table).",
      "で = where things HAPPEN; に = where things ARE or where you are going.",
    ],
    quiz:[
      {q:"You are studying AT the library. What particle marks the library?", options:["としょかんにべんきょう","としょかんでべんきょう","としょかんをべんきょう"], answer:1, exp:"で marks the location where the action (studying) takes place."},
      {q:"You come to school BY bicycle. What marks the bicycle?", options:["じてんしゃにきます","じてんしゃをきます","じてんしゃできます"], answer:2, exp:"で marks means/method — by bicycle, by train, by foot."},
    ],
  },
];

// ═══════════════════════════════════════════
// ═══════════════════════════════════════════
// PARTICLE QUIZ BUILDERS — #92
// ═══════════════════════════════════════════
// ═════════════════════════════════════════════
// PARTICLE FILL DB — #99 Fill the Particle
// 30 sentences across all 10 particles, each with a single
// "_" placeholder where the particle belongs. Entries include
// the correct particle, an English translation, the minimum
// day it unlocks (matching the particle's introduced day),
// and a short explanation shown after the user answers.
// Used by FillTheParticle and ParticleSpeed games.
//
// Functions:
//   (data only — consumed by FillTheParticle + ParticleSpeed)
// ═════════════════════════════════════════════
const PARTICLE_FILL_DB = [
  { sentence:"わたし_がくせいです。", particle:"は", en:"I am a student.", minDay:1, exp:"は marks the topic. わたしは = as for me..." },
  { sentence:"これ_ほんです。", particle:"は", en:"This is a book.", minDay:1, exp:"は follows the topic word. これは = as for this thing..." },
  { sentence:"きょう_いいてんきです。", particle:"は", en:"Today is nice weather.", minDay:1, exp:"きょうは = as for today. は marks today as the topic." },
  { sentence:"わたし_なまえはアレックスです。", particle:"の", en:"My name is Alex.", minDay:1, exp:"の connects nouns. わたしのなまえ = the name of me = my name." },
  { sentence:"にほん_たべものがすきです。", particle:"の", en:"I like Japanese food.", minDay:1, exp:"の connects Japan to food. にほんのたべもの = food of Japan." },
  { sentence:"これはアレックス_ほんです。", particle:"の", en:"This is Alex's book.", minDay:1, exp:"の shows possession. アレックスのほん = Alex's book." },
  { sentence:"だいじょうぶです_？", particle:"か", en:"Are you okay?", minDay:6, exp:"か at the end turns any statement into a question." },
  { sentence:"これはいくらです_？", particle:"か", en:"How much is this?", minDay:6, exp:"か is the question particle — just add it to the end." },
  { sentence:"にほんごがすきです_？", particle:"か", en:"Do you like Japanese?", minDay:6, exp:"か turns a statement into a yes/no question." },
  { sentence:"ごはん_たべます。", particle:"を", en:"I eat rice.", minDay:6, exp:"を marks the direct object — the thing being acted on." },
  { sentence:"おちゃ_のみます。", particle:"を", en:"I drink tea.", minDay:6, exp:"を follows the object of the verb. おちゃを = tea (that I drink)." },
  { sentence:"にほんご_べんきょうします。", particle:"を", en:"I study Japanese.", minDay:6, exp:"にほんごを = Japanese (that I study). を marks what is studied." },
  { sentence:"わたし_がくせいです。", particle:"も", en:"I am also a student.", minDay:11, exp:"も replaces は to add 'also' or 'too'. わたしも = me too." },
  { sentence:"これ_おいしいです。", particle:"も", en:"This is also delicious.", minDay:11, exp:"も adds 'also' — this one too is delicious." },
  { sentence:"にほんご_むずかしいです。", particle:"も", en:"Japanese is also difficult.", minDay:11, exp:"も = Japanese is difficult as well as something else mentioned." },
  { sentence:"だいじょうぶです_！", particle:"よ", en:"It's okay! Trust me.", minDay:11, exp:"よ adds assertion. Trust me, it really is okay." },
  { sentence:"これはおいしいです_。", particle:"よ", en:"This is delicious, I tell you.", minDay:11, exp:"よ emphasises your point — you want the listener to believe this." },
  { sentence:"もうじかんです_。", particle:"よ", en:"It's already time!", minDay:11, exp:"よ adds urgency and assertion. I am informing you of this fact." },
  { sentence:"がっこう_いきます。", particle:"に", en:"I go to school.", minDay:16, exp:"に marks direction. がっこうに = to school." },
  { sentence:"ともだち_あいます。", particle:"に", en:"I meet a friend.", minDay:16, exp:"に marks the target. ともだちに = to/with a friend." },
  { sentence:"まいあさろくじ_おきます。", particle:"に", en:"I wake up at 6am.", minDay:16, exp:"に marks a specific time point. ろくじに = at 6 o'clock." },
  { sentence:"にほんご_すきです。", particle:"が", en:"I like Japanese.", minDay:16, exp:"が marks the subject. What is liked = Japanese." },
  { sentence:"なに_たべたいですか？", particle:"が", en:"What do you want to eat?", minDay:16, exp:"が marks what is wanted. なにがたべたい = what is desired." },
  { sentence:"あたま_いたいです。", particle:"が", en:"My head hurts.", minDay:16, exp:"が marks the subject of the sensation. あたまが = head (that hurts)." },
  { sentence:"としょかん_べんきょうします。", particle:"で", en:"I study at the library.", minDay:21, exp:"で marks where an action happens. としょかんで = at the library." },
  { sentence:"バス_いきます。", particle:"で", en:"I go by bus.", minDay:21, exp:"で marks the means. バスで = by bus / using the bus." },
  { sentence:"にほんご_はなします。", particle:"で", en:"I speak in Japanese.", minDay:21, exp:"で marks the means of communication. にほんごで = in Japanese." },
  { sentence:"いいてんきです_。", particle:"ね", en:"Nice weather, right?", minDay:21, exp:"ね invites agreement. You're sharing an observation and expecting them to agree." },
  { sentence:"たいへんです_。", particle:"ね", en:"That's tough, isn't it.", minDay:21, exp:"ね shows empathy. Like saying 'right?' or 'isn't it?'" },
  { sentence:"おいしかったです_。", particle:"ね", en:"That was delicious, wasn't it?", minDay:21, exp:"ね shares a feeling and invites the other person to confirm." },
  { sentence:"このえいが_おもしろいです。", particle:"は", en:"This movie is interesting.", minDay:1, exp:"は marks the movie as the topic." },
  { sentence:"おおさか_にぎやかです。", particle:"は", en:"Osaka is lively.", minDay:1, exp:"大阪は = as for Osaka." },
  { sentence:"そのレストラン_おいしいです。", particle:"は", en:"That restaurant is delicious.", minDay:1, exp:"は marks the restaurant as the topic." },
  { sentence:"そのきかい_ちいさいです。", particle:"は", en:"That machine is small.", minDay:1, exp:"は marks the machine as the topic." },
  { sentence:"このとまと_あまいです。", particle:"は", en:"This tomato is sweet.", minDay:1, exp:"は marks this tomato as the topic." },
  { sentence:"にほんご_クラスです。", particle:"の", en:"It is a Japanese class.", minDay:1, exp:"にほんごのクラス = class of Japanese." },
  { sentence:"そのひと_ははのかいしゃです。", particle:"の", en:"That person is my mom's friend.", minDay:1, exp:"ははのかいしゃ = mom's friend." },
  { sentence:"にほん_はながきれいです。", particle:"の", en:"Japan's flowers are beautiful.", minDay:1, exp:"日本のはな = flowers of Japan." },
  { sentence:"それはほんです_？", particle:"か", en:"Is that a book?", minDay:6, exp:"か asks for confirmation." },
  { sentence:"これはなんです_？", particle:"か", en:"What is this?", minDay:6, exp:"か turns it into a question." },
  { sentence:"あなたはがくせいです_？", particle:"か", en:"Are you a student?", minDay:6, exp:"か turns the statement into a yes/no question." },
  { sentence:"このほん_かってください。", particle:"を", en:"Please buy this book.", minDay:6, exp:"このほんを = this book. を marks the object." },
  { sentence:"きっぷをのみます。", particle:"を", en:"I drink coffee.", minDay:6, exp:"コーヒーを = coffee that I drink." },
  { sentence:"ドア_しめてください。", particle:"を", en:"Please close the door.", minDay:6, exp:"ドアを marks the door as the object." },
  { sentence:"それ_たべます。", particle:"も", en:"I will eat that too.", minDay:11, exp:"も adds also." },
  { sentence:"かなこさん_にほんごがすきです。", particle:"も", en:"Kanako also likes Japanese.", minDay:11, exp:"かなこも = Kanako too." },
  { sentence:"ここはあんぜんです_。", particle:"よ", en:"This place is safe, I assure you.", minDay:11, exp:"よ adds reassurance." },
  { sentence:"それはほんとうです_。", particle:"よ", en:"That is really true.", minDay:11, exp:"よ emphasises the truth." },
  { sentence:"ぎんこう_いきました。", particle:"に", en:"I went to the bank.", minDay:16, exp:"銀行に = to the bank." },
  { sentence:"いす_すわります。", particle:"に", en:"I sit on the chair.", minDay:16, exp:"いすに = onto the chair." },
  { sentence:"うま_はやいです。", particle:"が", en:"Horses are fast.", minDay:16, exp:"が marks うま as the subject." },
  { sentence:"そのひと_すきです。", particle:"が", en:"I like that person.", minDay:16, exp:"そのひとが = that person who is liked." },
  { sentence:"そこ_はなします。", particle:"で", en:"I speak there.", minDay:21, exp:"そこで = at that place." },
  { sentence:"けいたい_べんきょうします。", particle:"で", en:"I study at home.", minDay:21, exp:"家で = at home." },
  { sentence:"このえいがはおもしろいです_。", particle:"ね", en:"This movie is interesting, right?", minDay:21, exp:"ね invites the listener to share your feeling." },
  { sentence:"にほんはいいです_。", particle:"ね", en:"Japan is great, isn't it.", minDay:21, exp:"ね seeks agreement." },
];

// ═════════════════════════════════════════════
// FILL THE PARTICLE — #99 Particle Games
// Sentence shown with one particle blanked out. User taps the
// correct particle from their unlocked set. Only particles the
// user has learned so far appear as options, so difficulty
// scales naturally as more particles unlock each week.
// On Day 1 there are 2 options (は, の). By Week 5 there are
// up to 4 from the 10 unlocked particles.
//
// Functions:
//   buildOptions(q, unlockedParticles)
//     — returns correct particle + up to 3 wrong ones
//       from unlocked set, shuffled
//   answer(opt)
//     — checks selection, triggers feedback + XP
//   next()
//     — advances index, reshuffles pool on new round
// ═════════════════════════════════════════════
function FillTheParticle({ currentDay, onBack, onXPEarned, totalRounds=1, endless=false }) {
  const unlocked = PARTICLE_DATA.filter(p => p.introduced <= currentDay).map(p => p.particle);

  const buildOptions = (q) => {
    const wrong = shuffle(unlocked.filter(p => p !== q.particle)).slice(0, 3);
    return shuffle([q.particle, ...wrong]);
  };

  const [pool, setPool] = useState(() => {
    const available = PARTICLE_FILL_DB.filter(q => unlocked.includes(q.particle));
    return shuffle(available).slice(0, Math.min(8, available.length));
  });

  const TOTAL = pool.length;
  const [idx, setIdx]           = useState(0);
  const [options, setOptions]   = useState(() => buildOptions(pool[0]));
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [round, setRound]       = useState(1);
  const [roundXP, setRoundXP]   = useState(0);

  const answer = (opt) => {
    if (feedback) return;
    setSelected(opt);
    const ok = opt === pool[idx].particle;
    if (ok) { setScore(s => s+1); setFeedback('correct'); playSound('correct'); }
    else    { setFeedback('wrong'); playSound('wrong'); }
  };

  const next = () => {
    const ni = idx + 1;
    if (ni >= TOTAL) {
      const xp = score * 20;
      const total = roundXP + xp;
      if (!endless && round >= totalRounds) {
        if (onXPEarned) onXPEarned(total); setDone(true);
      } else {
        setRoundXP(total); setRound(r => r+1);
        setPool(p => shuffle([...p]));
        setIdx(0); setOptions(buildOptions(pool[0]));
        setSelected(null); setFeedback(null); setScore(0);
      }
    } else {
      setIdx(ni); setOptions(buildOptions(pool[ni]));
      setSelected(null); setFeedback(null);
    }
  };

  if (!pool.length) return (
    <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>No particles unlocked yet. Keep studying!</div>
  );

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>All Scenes Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{score} of {TOTAL} correct on first try</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>FIRST TRY</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{roundXP}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );

  const q = pool[idx];
  const parts = q.sentence.split('_');
  const pColor = PARTICLE_DATA.find(p => p.particle === q.particle)?.color || '#6366f1';
  const bgColor = feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor = feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e';

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless?'∞':'Round '+round+'/'+totalRounds}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'16px',
        padding:'28px 20px',marginBottom:'20px',textAlign:'center',transition:'all 0.25s',
        minHeight:'130px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'14px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px'}}>FILL IN THE PARTICLE</div>
        <div style={{fontSize:'26px',fontWeight:'700',display:'flex',alignItems:'center',flexWrap:'wrap',justifyContent:'center',gap:'2px'}}>
          <span style={{color:'#fff'}}>{parts[0]}</span>
          <span style={{
            display:'inline-block',minWidth:'44px',padding:'2px 8px',
            borderBottom:'3px solid '+(feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':pColor),
            color:feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':selected?pColor:'#555',
            fontWeight:'900',fontSize:'28px',textAlign:'center',
          }}>{selected || '　'}</span>
          <span style={{color:'#fff'}}>{parts[1]}</span>
        </div>
        <div style={{color:'#666',fontSize:'14px'}}>{q.en}</div>
        {feedback && (
          <div style={{background:'#0a0a14',borderRadius:'10px',padding:'10px 14px',maxWidth:'320px'}}>
            <div style={{color:'#aaa',fontSize:'12px',lineHeight:'1.5'}}>{q.exp}</div>
          </div>
        )}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px',marginBottom:'16px'}}>
        {options.map((opt,i) => {
          const pData  = PARTICLE_DATA.find(p => p.particle === opt);
          const isCorr = feedback && opt === q.particle;
          const isWrong= feedback && opt === selected && opt !== q.particle;
          return (
            <button key={i} onClick={()=>answer(opt)} disabled={!!feedback}
              style={{padding:'18px 12px',
                background:isCorr?'#0a2a1a':isWrong?'#1a0a0a':'#10101c',
                border:'2px solid '+(isCorr?'#10b981':isWrong?'#ef4444':'#1e1e30'),
                borderRadius:'14px',cursor:feedback?'default':'pointer',fontFamily:'inherit',
                display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',transition:'all 0.15s'}}>
              <span style={{color:isCorr?'#10b981':isWrong?'#ef4444':pData?.color||'#fff',fontSize:'32px',fontWeight:'900'}}>{opt}</span>
              <span style={{color:isCorr?'#10b981':isWrong?'#ef4444':'#555',fontSize:'11px',fontWeight:'600'}}>{feedback?pData?.name:pData?.romaji}</span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <button onClick={next} style={{width:'100%',padding:'18px',
          background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
          border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginTop:'auto'}}>
          {idx+1>=TOTAL?'See Results →':'Next →'}
        </button>
      )}
    </div>
  );
}


// ═════════════════════════════════════════════
// PARTICLE SPEED — #100 Particle Games
// Same sentence data as Fill the Particle but with a countdown
// timer. User must tap the correct particle before time runs out.
// Faster correct answers earn a time bonus on top of the base XP.
// Timeout counts as wrong and reveals the correct answer.
// Only unlocked particles shown as options.
//
// Functions:
//   startTimer()
//     — begins 8s countdown, calls timeout handler on expiry
//   answer(opt)
//     — stops timer, checks selection, calculates speed bonus XP
//   next()
//     — advances to next question, resets timer, reshuffles on
//       new round
// ═════════════════════════════════════════════
function ParticleSpeed({ currentDay, onBack, onXPEarned, totalRounds=1, endless=false }) {
  const QUESTION_TIME = 8;
  const unlocked = PARTICLE_DATA.filter(p => p.introduced <= currentDay).map(p => p.particle);

  const buildOptions = (q) => {
    const wrong = shuffle(unlocked.filter(p => p !== q.particle)).slice(0, 3);
    return shuffle([q.particle, ...wrong]);
  };

  const [pool, setPool] = useState(() => {
    const available = PARTICLE_FILL_DB.filter(q => unlocked.includes(q.particle));
    return shuffle(available).slice(0, Math.min(8, available.length));
  });

  const TOTAL = pool.length;
  const [idx, setIdx]           = useState(0);
  const [options, setOptions]   = useState(() => buildOptions(pool[0]));
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore]       = useState(0);
  const [totalXP, setTotalXP]   = useState(0);
  const [done, setDone]         = useState(false);
  const [round, setRound]       = useState(1);
  const [roundXP, setRoundXP]   = useState(0);

  const timerRef = useRef(null);
  const timeRef  = useRef(QUESTION_TIME);
  const startRef = useRef(Date.now());

  const stopTimer = () => { if(timerRef.current) clearInterval(timerRef.current); };

  const startTimer = () => {
    stopTimer();
    timeRef.current = QUESTION_TIME;
    setTimeLeft(QUESTION_TIME);
    startRef.current = Date.now();
    timerRef.current = setInterval(() => {
      timeRef.current = Math.round((timeRef.current - 0.1) * 10) / 10;
      if (timeRef.current <= 0) {
        timeRef.current = 0;
        setTimeLeft(0);
        stopTimer();
        setFeedback('timeout');
        playSound('wrong');
      } else {
        setTimeLeft(timeRef.current);
      }
    }, 100);
  };

  useEffect(() => { startTimer(); return stopTimer; }, []);

  const answer = (opt) => {
    if (feedback) return;
    stopTimer();
    setSelected(opt);
    const ok = opt === pool[idx].particle;
    const elapsed = (Date.now() - startRef.current) / 1000;
    const xp = ok ? Math.max(0, Math.round(25 * (1 - elapsed / QUESTION_TIME))) : 0;
    if (ok) { setScore(s => s+1); setFeedback('correct'); playSound('correct'); }
    else    { setFeedback('wrong'); playSound('wrong'); }
    setTotalXP(t => t + xp);
  };

  const next = () => {
    stopTimer();
    const ni = idx + 1;
    if (ni >= TOTAL) {
      const total = roundXP + totalXP;
      if (!endless && round >= totalRounds) {
        if (onXPEarned) onXPEarned(total); setDone(true);
      } else {
        setRoundXP(total); setRound(r => r+1);
        setPool(p => shuffle([...p]));
        setIdx(0); setOptions(buildOptions(pool[0]));
        setSelected(null); setFeedback(null); setScore(0); setTotalXP(0);
        setTimeout(() => startTimer(), 100);
      }
    } else {
      setIdx(ni); setOptions(buildOptions(pool[ni]));
      setSelected(null); setFeedback(null);
      setTimeout(() => startTimer(), 100);
    }
  };

  useEffect(() => () => stopTimer(), [done]);

  if (!pool.length) return (
    <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>No particles unlocked yet!</div>
  );

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{endless?'ENDLESS — '+round+' rounds':'Round '+round+' / '+totalRounds}</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{roundXP+totalXP}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back</button>
    </div>
  );

  const q = pool[idx];
  const parts = q.sentence.split('_');
  const pColor  = PARTICLE_DATA.find(p => p.particle === q.particle)?.color || '#6366f1';
  const bgColor = feedback==='correct'?'#0a2a1a':feedback==='wrong'||feedback==='timeout'?'#1a0a0a':'#0a0a14';
  const bdColor = feedback==='correct'?'#10b981':feedback==='wrong'||feedback==='timeout'?'#ef4444':'#2a2a3e';
  const timerColor = timeLeft > 5 ? '#10b981' : timeLeft > 3 ? '#f59e0b' : '#ef4444';
  const timerPct  = (timeLeft / QUESTION_TIME) * 100;

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless?'∞':'Round '+round+'/'+totalRounds}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'12px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      {/* Timer */}
      <div style={{height:'6px',background:'#1e1e30',borderRadius:'3px',marginBottom:'8px',overflow:'hidden'}}>
        <div style={{height:'100%',width:timerPct+'%',background:timerColor,transition:'width 0.1s linear,background 0.3s',borderRadius:'3px'}}/>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
        <div style={{color:timerColor,fontSize:'22px',fontWeight:'900'}}>{timeLeft.toFixed(1)}s</div>
        <div style={{color:'#f59e0b',fontSize:'12px',fontWeight:'700'}}>+{totalXP} XP</div>
      </div>

      {/* Sentence card */}
      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'16px',
        padding:'24px 20px',marginBottom:'20px',textAlign:'center',transition:'all 0.25s',
        minHeight:'120px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px'}}>WHICH PARTICLE?</div>
        <div style={{fontSize:'24px',fontWeight:'700',display:'flex',alignItems:'center',flexWrap:'wrap',justifyContent:'center',gap:'2px'}}>
          <span style={{color:'#fff'}}>{parts[0]}</span>
          <span style={{
            display:'inline-block',minWidth:'44px',padding:'2px 8px',
            borderBottom:'3px solid '+(feedback==='correct'?'#10b981':feedback?'#ef4444':pColor),
            color:feedback==='correct'?'#10b981':feedback?'#ef4444':selected?pColor:'#555',
            fontWeight:'900',fontSize:'28px',textAlign:'center',
          }}>{selected || '　'}</span>
          <span style={{color:'#fff'}}>{parts[1]}</span>
        </div>
        <div style={{color:'#666',fontSize:'14px'}}>{q.en}</div>
        {feedback==='timeout'&&<div style={{color:'#ef4444',fontSize:'13px',fontWeight:'700'}}>Time's up! Correct: <span style={{color:'#fff'}}>{q.particle}</span></div>}
        {feedback&&feedback!=='timeout'&&<div style={{background:'#0a0a14',borderRadius:'8px',padding:'8px 12px',maxWidth:'300px'}}><div style={{color:'#aaa',fontSize:'11px',lineHeight:'1.5'}}>{q.exp}</div></div>}
      </div>

      {/* Options */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px',marginBottom:'16px'}}>
        {options.map((opt,i) => {
          const pData  = PARTICLE_DATA.find(p => p.particle === opt);
          const isCorr = feedback && opt === q.particle;
          const isWrong= feedback && opt === selected && opt !== q.particle;
          return (
            <button key={i} onClick={()=>answer(opt)} disabled={!!feedback}
              style={{padding:'18px 12px',
                background:isCorr?'#0a2a1a':isWrong?'#1a0a0a':'#10101c',
                border:'2px solid '+(isCorr?'#10b981':isWrong?'#ef4444':'#1e1e30'),
                borderRadius:'14px',cursor:feedback?'default':'pointer',fontFamily:'inherit',
                display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
              <span style={{color:isCorr?'#10b981':isWrong?'#ef4444':pData?.color||'#fff',fontSize:'32px',fontWeight:'900'}}>{opt}</span>
              <span style={{color:isCorr?'#10b981':isWrong?'#ef4444':'#555',fontSize:'11px',fontWeight:'600'}}>{feedback?pData?.name:pData?.romaji}</span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <button onClick={next} style={{width:'100%',padding:'18px',
          background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
          border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginTop:'auto'}}>
          {idx+1>=TOTAL?'See Results →':'Next →'}
        </button>
      )}
    </div>
  );
}


// ═════════════════════════════════════════════
// PARTICLE CHAIN — #104 Particle Games
// A particle is shown. Exactly 5 sentences appear — 0 to 5 of
// them correctly use that particle. User taps all correct ones.
// Wrong tap = -2 pts. Audio button on each sentence = -1 pt.
// Correct tap = +1 pt. Submit to lock in round score.
// One round per unlocked particle. Progress shows
// "Particle X / Y" not rounds. Personal best in localStorage.
// rounds stored in useState so sentences never change mid-round.
//
// Functions:
//   buildRound(pData)
//     — builds exactly 5 sentences: up to 4 correct,
//       rest filled with wrong (0-5 wrong total).
//       Stored in useState — never regenerates on re-render.
//   handleTap(idx) — toggles selection
//   handleAudio(e, text) — plays sentence, -1 pt penalty
//   submit() — +1 correct tap, -2 wrong tap, deducts audio
// ═════════════════════════════════════════════
function ParticleChain({ currentDay, onBack, onXPEarned }) {
  const HS_KEY = 'nihongo_particle_chain_hs';
  const unlocked = PARTICLE_DATA.filter(p => p.introduced <= currentDay);

  const buildRound = (pData) => {
    const correct   = shuffle(PARTICLE_FILL_DB.filter(q => q.particle === pData.particle)
      .map(q => ({ text: q.sentence.replace('_', pData.particle), isCorrect: true, en: q.en }))).slice(0, 4);
    const incorrect = shuffle(PARTICLE_FILL_DB.filter(q => q.particle !== pData.particle)
      .map(q => ({ text: q.sentence.replace('_', pData.particle), isCorrect: false, en: q.en }))).slice(0, Math.floor(Math.random()*6));
    return shuffle([...correct, ...incorrect]).slice(0, 5);
  };

  const [rounds] = useState(() => unlocked.map(p => ({ pData: p, sentences: buildRound(p) })));
  const TOTAL = rounds.length;

  const [idx, setIdx]               = useState(0);
  const [selected, setSelected]     = useState(new Set());
  const [submitted, setSubmitted]   = useState(false);
  const [score, setScore]           = useState(0);
  const [audioPenalty, setAudioPen] = useState(0);
  const [done, setDone]             = useState(false);
  const [highScore, setHighScore]   = useState(() => parseInt(localStorage.getItem(HS_KEY)||'0'));

  const maxPossible = rounds.reduce((sum, r) => sum + r.sentences.filter(s => s.isCorrect).length, 0);

  const handleTap = (i) => {
    if (submitted) return;
    setSelected(prev => { const n=new Set(prev); n.has(i)?n.delete(i):n.add(i); return n; });
  };

  const handleAudio = (e, text) => {
    e.stopPropagation();
    speakJP(text);
    if (!submitted) setAudioPen(p => p+1);
  };

  const submit = () => {
    if (submitted) return;
    setSubmitted(true);
    let rs = 0;
    rounds[idx].sentences.forEach((s, i) => {
      if (selected.has(i) && s.isCorrect)  rs += 1;
      if (selected.has(i) && !s.isCorrect) rs -= 2;
    });
    rs -= audioPenalty;
    setScore(s => s + rs);
  };

  const next = () => {
    if (idx + 1 >= TOTAL) {
      const final = score;
      if (final > highScore) { localStorage.setItem(HS_KEY, String(final)); setHighScore(final); }
      if (onXPEarned) onXPEarned(Math.max(0, score) * 5);
      setDone(true);
    } else {
      setIdx(i => i+1); setSelected(new Set()); setSubmitted(false); setAudioPen(0);
    }
  };

  if (!unlocked.length) return <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>No particles unlocked yet!</div>;

  if (done) {
    const isNewHS = score >= highScore && score > 0;
    return (
      <div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=maxPossible*0.8?'🏆':score>=maxPossible*0.5?'✅':'📚'}</div>
        <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>{isNewHS?'🌟 New High Score!':'Session Complete'}</div>
        <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{TOTAL} particles · max {maxPossible} pts</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
          <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>SCORE</div></div>
          <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>{highScore}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>BEST</div></div>
          <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{maxPossible}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>MAX</div></div>
        </div>
        <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
        <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
      </div>
    );
  }

  const { pData, sentences } = rounds[idx];
  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>Particle {idx+1} / {TOTAL}</div>
        <div style={{color:'#f59e0b',fontSize:'12px',fontWeight:'700'}}>Score: {score}</div>
        <div style={{color:'#555',fontSize:'12px'}}>Best: {highScore}</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      <div style={{background:'#10101c',border:'2px solid '+pData.color+'44',borderRadius:'16px',padding:'20px',marginBottom:'16px',textAlign:'center'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'12px'}}>TAP ALL SENTENCES THAT CORRECTLY USE</div>
        <div style={{color:pData.color,fontSize:'56px',fontWeight:'900',marginBottom:'6px'}}>{pData.particle}</div>
        <div style={{color:pData.color,fontSize:'13px',fontWeight:'600',opacity:0.8}}>{pData.romaji} — {pData.name}</div>
        {audioPenalty>0&&!submitted&&<div style={{color:'#ef4444',fontSize:'11px',marginTop:'8px'}}>Audio used: -{audioPenalty} pt{audioPenalty>1?'s':''}</div>}
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'8px',flex:1,marginBottom:'16px'}}>
        {sentences.map((s,i) => {
          const isSel   = selected.has(i);
          const corrSel = submitted && s.isCorrect && isSel;
          const wrongSel= submitted && !s.isCorrect && isSel;
          const missed  = submitted && s.isCorrect && !isSel;
          let bg='#10101c', border='#1e1e30';
          if(isSel&&!submitted){bg='#1a1a3e';border=pData.color;}
          if(corrSel){bg='#0a2a1a';border='#10b981';}
          if(wrongSel){bg='#1a0a0a';border='#ef4444';}
          if(missed){bg='#1a1a00';border='#f59e0b';}
          return (
            <button key={i} onClick={()=>handleTap(i)}
              style={{padding:'12px 14px',background:bg,border:'2px solid '+border,
                borderRadius:'12px',cursor:submitted?'default':'pointer',fontFamily:'inherit',
                textAlign:'left',transition:'background 0.15s,border-color 0.15s',
                display:'flex',alignItems:'center',gap:'10px'}}>
              <button onClick={(e)=>handleAudio(e,s.text)}
                style={{background:'rgba(99,102,241,0.15)',border:'1px solid #6366f133',borderRadius:'6px',
                  color:'#6366f1',fontSize:'12px',cursor:'pointer',padding:'3px 8px',flexShrink:0,fontFamily:'inherit'}}>
                🔊
              </button>
              <div style={{flex:1}}>
                <span style={{color:'#ccc',fontSize:'15px',fontWeight:'600',display:'block'}}>{s.text}</span>
                <span style={{color:'#555',fontSize:'11px'}}>{s.en}</span>
              </div>
              {isSel&&!submitted&&<span style={{color:pData.color,fontSize:'18px',flexShrink:0}}>✓</span>}
              {corrSel &&<span style={{color:'#10b981',fontWeight:'900',flexShrink:0,fontSize:'13px'}}>+1</span>}
              {wrongSel&&<span style={{color:'#ef4444',fontWeight:'900',flexShrink:0,fontSize:'13px'}}>-2</span>}
              {missed  &&<span style={{color:'#f59e0b',fontWeight:'900',flexShrink:0,fontSize:'13px'}}>✕</span>}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button onClick={submit} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>Submit</button>
      ) : (
        <button onClick={next} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#10b981,#059669)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
          {idx+1>=TOTAL?'See Results →':'Next Particle →'}
        </button>
      )}
    </div>
  );
}


// ═════════════════════════════════════════════
// CONTEXT CHALLENGE DB — #102 Particle Games
// English descriptions of grammatical situations.
// User picks the correct particle for that context.
// Tests conceptual understanding — not pattern matching
// or sentence completion. Each entry has the English
// situation, the correct particle, minimum unlock day,
// and an explanation shown after answering.
//
// (data only — consumed by ContextChallenge)
// ═════════════════════════════════════════════
const CONTEXT_CHALLENGE_DB = [
  // は
  { en:"You want to say 'As for me, I am a student.' What particle marks 'me' as the topic?", particle:"は", minDay:1, exp:"は marks the topic of a sentence. It tells the listener what the sentence is about." },
  { en:"You want to introduce a new subject: 'As for today, the weather is nice.' Which particle?", particle:"は", minDay:1, exp:"は sets the topic. きょうは = as for today. Everything after describes that topic." },
  { en:"Someone asks about your friend. You want to say 'As for my friend, she is kind.' Which particle follows 'friend'?", particle:"は", minDay:1, exp:"は marks your friend as the topic being described." },
  { en:"You want to contrast two things: 'I like sushi. As for ramen, I don't like it.' Which particle marks 'ramen' as the contrasting topic?", particle:"は", minDay:1, exp:"は can also show contrast. Switching topics with は highlights the difference." },
  // の
  { en:"You want to say 'my book' — connecting 'me' to 'book' as a possessive. Which particle goes between them?", particle:"の", minDay:1, exp:"の connects nouns. わたしのほん = the book of me = my book." },
  { en:"You want to say 'a teacher of Japanese' — connecting 'Japanese' to 'teacher'. Which particle?", particle:"の", minDay:1, exp:"の links two nouns. にほんごのせんせい = teacher of Japanese." },
  { en:"You want to describe 'the door of that building'. Which particle connects 'building' and 'door'?", particle:"の", minDay:1, exp:"の expresses that one noun belongs to or is connected to another." },
  { en:"You want to say 'a friend of mine' in Japanese. What particle shows this relationship?", particle:"の", minDay:1, exp:"わたしのともだち = friend of mine. の shows possession or connection." },
  // か
  { en:"You want to turn 'it is delicious' into a question: 'Is it delicious?' What do you add at the end?", particle:"か", minDay:6, exp:"か at the end of a sentence turns it into a yes/no question. No word order change needed." },
  { en:"You want to ask 'Where is it?' in Japanese. What particle goes at the very end?", particle:"か", minDay:6, exp:"か is the question marker. どこですか = where is it?" },
  { en:"Your friend said something surprising. You want to ask 'Really? Is that true?' What particle turns it into a question?", particle:"か", minDay:6, exp:"か at the end of any statement makes it a question." },
  { en:"You want to ask 'Do you like Japanese food?' Which particle makes this a question?", particle:"か", minDay:6, exp:"にほんごがすきですか = do you like Japanese? か is the question marker." },
  // を
  { en:"You want to say 'I eat rice.' What particle marks 'rice' as the thing being eaten?", particle:"を", minDay:6, exp:"を marks the direct object — the thing receiving the action of the verb." },
  { en:"You want to say 'I study Japanese.' What particle marks 'Japanese' as what is being studied?", particle:"を", minDay:6, exp:"を follows the thing being acted upon. にほんごを = Japanese (that I study)." },
  { en:"You want to say 'Please close the door.' What particle marks 'door' as the object?", particle:"を", minDay:6, exp:"を marks what is being acted on by the verb — here, the door being closed." },
  { en:"You want to say 'I drink coffee.' Which particle marks 'coffee' as the thing being drunk?", particle:"を", minDay:6, exp:"を marks the direct object. コーヒーをのみます = drink coffee." },
  // も
  { en:"Your friend says they like sushi. You also like sushi. You want to say 'Me too!' Which particle replaces は?", particle:"も", minDay:11, exp:"も means also or too. It replaces は to add you to a group or category." },
  { en:"You already said one thing is expensive. Now you want to say 'This one is also expensive.' Which particle?", particle:"も", minDay:11, exp:"も adds 'also' to the sentence. It follows the word being included." },
  { en:"You want to say 'Even this small thing is important.' Which particle expresses 'even'?", particle:"も", minDay:11, exp:"も can express 'even' in addition to 'also/too'." },
  // よ
  { en:"Your friend is nervous. You want to reassure them: 'It's okay! Trust me.' What particle adds this conviction?", particle:"よ", minDay:11, exp:"よ adds assertion or emphasis. I am telling you this is true." },
  { en:"You know something your friend doesn't. You want to inform them firmly. What particle shows you're asserting a fact?", particle:"よ", minDay:11, exp:"よ signals you're sharing information the listener may not know." },
  { en:"You want to say 'This is delicious, I'm telling you!' to really emphasize it. Which sentence-final particle?", particle:"よ", minDay:11, exp:"よ adds conviction and emphasis. It says: believe me on this." },
  // に
  { en:"You want to say 'I go TO school.' What particle marks 'school' as the destination?", particle:"に", minDay:16, exp:"に marks direction or destination. がっこうに = to school." },
  { en:"You want to say 'I meet a friend.' What particle marks 'friend' as the target of meeting?", particle:"に", minDay:16, exp:"に marks the target. ともだちにあう = meet (with) a friend." },
  { en:"You want to say 'I wake up AT 6am.' What particle marks '6am' as a specific time point?", particle:"に", minDay:16, exp:"に marks a specific time point. ろくじに = at 6 o'clock." },
  { en:"You want to say 'I put it ON the table.' What particle marks 'table' as the surface/location target?", particle:"に", minDay:16, exp:"に marks a surface or target location for placement." },
  // が
  { en:"You want to say 'I LIKE Japanese.' In Japanese, 'Japanese' is the subject of the liking. Which particle marks it?", particle:"が", minDay:16, exp:"が marks the subject of preference verbs like すき (like) and へた (good at)." },
  { en:"You want to say 'My head hurts.' What particle marks 'head' as the subject experiencing the pain?", particle:"が", minDay:16, exp:"が marks the subject of a sensation. あたまが = head (that hurts)." },
  { en:"You want to identify the new subject in a sentence: 'A cat came.' What particle marks 'cat' as the subject?", particle:"が", minDay:16, exp:"が introduces a new or specific subject. It puts emphasis on who did something." },
  // で
  { en:"You want to say 'I study AT the library.' What particle marks 'library' as the location of the action?", particle:"で", minDay:21, exp:"で marks where an action takes place. としょかんで = at the library." },
  { en:"You want to say 'I go BY bus.' What particle marks 'bus' as the means of transport?", particle:"で", minDay:21, exp:"で marks the means or method. バスで = by bus / using the bus." },
  { en:"You want to say 'I speak IN Japanese.' Which particle marks 'Japanese' as the language being used?", particle:"で", minDay:21, exp:"で marks the means of communication. にほんごで = in Japanese." },
  { en:"You want to say 'I made this WITH scissors.' What particle marks 'scissors' as the tool used?", particle:"で", minDay:21, exp:"で marks the tool or instrument used to do something." },
  // ね
  { en:"You notice it's raining. You want to share this observation and invite agreement: 'It's raining, right?' Which particle?", particle:"ね", minDay:21, exp:"ね invites agreement. You're sharing an observation and expecting them to agree." },
  { en:"Your friend had a hard day. You want to empathize: 'That must be tough, isn't it.' Which particle?", particle:"ね", minDay:21, exp:"ね shows empathy and seeks shared understanding. Like saying 'right?' or 'isn't it?'" },
  { en:"You want to soften a statement and make it warmer by seeking the listener's agreement. Which sentence-final particle?", particle:"ね", minDay:21, exp:"ね softens statements and invites the listener into a shared feeling." },
];

// ═════════════════════════════════════════════
// CONTEXT CHALLENGE — #102 Particle Games
// An English situation is shown describing what the user
// wants to express. They pick which Japanese particle fits
// that grammatical relationship from their unlocked set.
// Pure concept test — no Japanese sentence shown, just the
// English context. Forces the user to understand what each
// particle actually DOES, not just recognise patterns.
// Difficulty scales as more particles unlock each week.
//
// Functions:
//   buildOptions(q, unlockedParticles)
//     — correct particle + up to 3 wrong from unlocked set
//   answer(opt)
//     — checks selection, feedback + XP
//   next()
//     — advances, reshuffles on new round
// ═════════════════════════════════════════════
function ContextChallenge({ currentDay, onBack, onXPEarned, totalRounds=1, endless=false }) {
  const unlocked = PARTICLE_DATA.filter(p => p.introduced <= currentDay).map(p => p.particle);

  const buildOptions = (q) => {
    const wrong = shuffle(unlocked.filter(p => p !== q.particle)).slice(0, 3);
    return shuffle([q.particle, ...wrong]);
  };

  const [pool, setPool] = useState(() => {
    const available = CONTEXT_CHALLENGE_DB.filter(q => unlocked.includes(q.particle));
    return shuffle(available).slice(0, Math.min(8, available.length));
  });

  const TOTAL = pool.length;
  const [idx, setIdx]           = useState(0);
  const [options, setOptions]   = useState(() => buildOptions(pool[0]));
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [round, setRound]       = useState(1);
  const [roundXP, setRoundXP]   = useState(0);

  const answer = (opt) => {
    if (feedback) return;
    setSelected(opt);
    const ok = opt === pool[idx].particle;
    if (ok) { setScore(s=>s+1); setFeedback('correct'); playSound('correct'); }
    else    { setFeedback('wrong'); playSound('wrong'); }
  };

  const next = () => {
    const ni = idx + 1;
    if (ni >= TOTAL) {
      const xp = score * 20;
      const total = roundXP + xp;
      if (!endless && round >= totalRounds) {
        if (onXPEarned) onXPEarned(total); setDone(true);
      } else {
        setRoundXP(total); setRound(r=>r+1);
        setPool(p => shuffle([...p]));
        setIdx(0); setOptions(buildOptions(pool[0]));
        setSelected(null); setFeedback(null); setScore(0);
      }
    } else {
      setIdx(ni); setOptions(buildOptions(pool[ni]));
      setSelected(null); setFeedback(null);
    }
  };

  if (!pool.length) return <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>No particles unlocked yet!</div>;

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{score>=TOTAL*0.8?'🏆':score>=TOTAL*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{endless?'ENDLESS — '+round+' rounds':'Round '+round+' / '+totalRounds}</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{roundXP}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(score/TOTAL*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
    </div>
  );

  const q = pool[idx];
  const pColor  = PARTICLE_DATA.find(p => p.particle === q.particle)?.color || '#6366f1';
  const bgColor = feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor = feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e';

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless?'∞':'Round '+round+'/'+totalRounds}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'16px',
        padding:'28px 20px',marginBottom:'20px',transition:'all 0.25s',
        minHeight:'160px',display:'flex',flexDirection:'column',justifyContent:'center',gap:'14px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',textAlign:'center'}}>WHICH PARTICLE FITS THIS SITUATION?</div>
        <div style={{color:'#fff',fontSize:'17px',lineHeight:'1.7',textAlign:'center'}}>{q.en}</div>
        {feedback && (
          <div style={{background:'#0a0a14',borderRadius:'10px',padding:'12px 14px',marginTop:'4px'}}>
            <div style={{color:feedback==='correct'?'#10b981':'#ef4444',fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>
              {feedback==='correct'?'✅ Correct — '+q.particle+' ('+PARTICLE_DATA.find(p=>p.particle===q.particle)?.name+')':'❌ Wrong — correct answer: '+q.particle}
            </div>
            <div style={{color:'#aaa',fontSize:'12px',lineHeight:'1.5'}}>{q.exp}</div>
          </div>
        )}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'10px',marginBottom:'16px'}}>
        {options.map((opt,i) => {
          const pData   = PARTICLE_DATA.find(p => p.particle === opt);
          const isCorr  = feedback && opt === q.particle;
          const isWrong = feedback && opt === selected && opt !== q.particle;
          return (
            <button key={i} onClick={()=>answer(opt)} disabled={!!feedback}
              style={{padding:'18px 12px',
                background:isCorr?'#0a2a1a':isWrong?'#1a0a0a':'#10101c',
                border:'2px solid '+(isCorr?'#10b981':isWrong?'#ef4444':'#1e1e30'),
                borderRadius:'14px',cursor:feedback?'default':'pointer',fontFamily:'inherit',
                display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
              <span style={{color:isCorr?'#10b981':isWrong?'#ef4444':pData?.color||'#fff',fontSize:'32px',fontWeight:'900'}}>{opt}</span>
              <span style={{color:isCorr?'#10b981':isWrong?'#ef4444':'#555',fontSize:'11px',fontWeight:'600'}}>{feedback?pData?.name:pData?.romaji}</span>
            </button>
          );
        })}
      </div>

      {feedback && (
        <button onClick={next} style={{width:'100%',padding:'18px',
          background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
          border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginTop:'auto'}}>
          {idx+1>=TOTAL?'See Results →':'Next →'}
        </button>
      )}
    </div>
  );
}


// ═════════════════════════════════════════════
// PARTICLE SORT — #103 Particle Games
// Up to 4 particle buckets shown (fewer on Week 1 when only
// 2 particles are unlocked). Sentences appear one at a time
// with the particle blanked. Tap the correct bucket to sort.
// Each bucket shows a running correct/total count.
// Auto-advances after 600ms. Play Again resets all state.
//
// Functions:
//   buildRound(unlocked)
//     — picks min(4, unlocked.length) particles as buckets,
//       pulls sentences for each from PARTICLE_FILL_DB
//   sortTo(particle)
//     — checks answer, updates counts, auto-advances
//   resetGame()
//     — resets all state so Play Again starts fresh
// ═════════════════════════════════════════════
function ParticleSort({ currentDay, onBack, onXPEarned, totalRounds=1, endless=false }) {
  const unlocked = PARTICLE_DATA.filter(p => p.introduced <= currentDay);

  const buildRound = () => {
    const buckets = shuffle(unlocked).slice(0, Math.min(4, unlocked.length));
    const pool = shuffle(
      buckets.flatMap(b =>
        shuffle(PARTICLE_FILL_DB.filter(q => q.particle === b.particle))
          .slice(0, 2)
          .map(q => ({ text: q.sentence.replace('_','___'), en: q.en, particle: q.particle }))
      )
    ).slice(0, 8);
    return { buckets, pool };
  };

  const init = () => ({
    roundData: buildRound(),
    idx: 0,
    lastResult: null,
    bucketCounts: {},
    bucketCorrect: {},
    score: 0,
    round: 1,
    roundXP: 0,
    done: false,
  });

  const [state, setState] = useState(() => init());
  const { roundData, idx, lastResult, bucketCounts, bucketCorrect, score, round, roundXP, done } = state;
  const { buckets, pool } = roundData;
  const TOTAL = pool.length;

  const resetGame = () => setState(init());

  const sortTo = (particle) => {
    if (lastResult !== null || done) return;
    const q = pool[idx];
    const ok = particle === q.particle;
    if (ok) playSound('correct'); else playSound('wrong');

    setState(prev => ({
      ...prev,
      lastResult: ok ? 'correct' : 'wrong',
      score: ok ? prev.score + 1 : prev.score,
      bucketCounts: { ...prev.bucketCounts, [particle]: (prev.bucketCounts[particle]||0)+1 },
      bucketCorrect: ok ? { ...prev.bucketCorrect, [particle]: (prev.bucketCorrect[particle]||0)+1 } : prev.bucketCorrect,
    }));

    setTimeout(() => {
      setState(prev => {
        const ni = prev.idx + 1;
        if (ni >= TOTAL) {
          const xp = prev.score * 15 + (ok ? 15 : 0);
          const total = prev.roundXP + xp;
          if (!endless && prev.round >= totalRounds) {
            if (onXPEarned) onXPEarned(total);
            return { ...prev, lastResult: null, idx: ni, roundXP: total, done: true };
          } else {
            const newRound = buildRound();
            return { roundData: newRound, idx: 0, lastResult: null, bucketCounts: {}, bucketCorrect: {}, score: 0, round: prev.round+1, roundXP: total, done: false };
          }
        }
        return { ...prev, idx: ni, lastResult: null };
      });
    }, 700);
  };

  if (!unlocked.length) return <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>No particles unlocked yet!</div>;

  if (done) {
    const pct = TOTAL > 0 ? Math.round(score/TOTAL*100) : 0;
    return (
      <div style={{textAlign:'center',padding:'40px 20px'}}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>{pct>=80?'🏆':pct>=50?'✅':'📚'}</div>
        <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Session Complete</div>
        <div style={{color:'#555',fontSize:'14px',marginBottom:'24px'}}>{endless?'ENDLESS — '+round+' rounds':'Round '+round+' / '+totalRounds}</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'20px'}}>
          <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{score}/{TOTAL}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>CORRECT</div></div>
          <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{roundXP}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
          <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{pct}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
        </div>
        <div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'24px',flexWrap:'wrap'}}>
          {buckets.map(b => (
            <div key={b.particle} style={{background:'#10101c',borderRadius:'12px',padding:'12px 16px',minWidth:'72px'}}>
              <div style={{color:b.color,fontSize:'28px',fontWeight:'900'}}>{b.particle}</div>
              <div style={{color:'#10b981',fontSize:'13px',fontWeight:'700'}}>{bucketCorrect[b.particle]||0}/{bucketCounts[b.particle]||0}</div>
            </div>
          ))}
        </div>
        <button onClick={resetGame} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
        <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back to Games</button>
      </div>
    );
  }

  if (!pool.length) return <div style={{textAlign:'center',padding:'40px 20px',color:'#888'}}>Not enough sentences for these particles yet!</div>;

  const q = pool[idx];
  const parts = q.text.split('___');
  const bgColor = lastResult==='correct'?'#0a2a1a':lastResult==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor = lastResult==='correct'?'#10b981':lastResult==='wrong'?'#ef4444':'#2a2a3e';
  const cols = buckets.length <= 2 ? 'repeat(2,1fr)' : buckets.length === 3 ? 'repeat(3,1fr)' : 'repeat(2,1fr)';

  return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',minHeight:'80vh'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>{idx+1} / {TOTAL}</div>
        <div style={{color:'#555',fontSize:'11px'}}>{endless?'∞':'Round '+round+'/'+totalRounds}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{score} ✓</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',borderRadius:'2px',marginBottom:'20px'}}>
        <div style={{height:'100%',width:(idx/TOTAL*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      <div style={{background:bgColor,border:'2px solid '+bdColor,borderRadius:'16px',
        padding:'28px 20px',marginBottom:'auto',textAlign:'center',transition:'all 0.3s',
        minHeight:'140px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px'}}>
        <div style={{color:'#555',fontSize:'11px',fontWeight:'700',letterSpacing:'1px'}}>SORT INTO THE CORRECT BUCKET</div>
        <div style={{fontSize:'24px',fontWeight:'700',display:'flex',alignItems:'center',flexWrap:'wrap',justifyContent:'center',gap:'2px'}}>
          <span style={{color:'#fff'}}>{parts[0]}</span>
          <span style={{display:'inline-block',minWidth:'40px',padding:'2px 8px',
            borderBottom:'3px solid '+(lastResult==='correct'?'#10b981':lastResult==='wrong'?'#ef4444':'#6366f1'),
            color:lastResult==='correct'?'#10b981':lastResult==='wrong'?'#ef4444':'#555',
            fontWeight:'900',fontSize:'28px',textAlign:'center'}}>
            {lastResult ? q.particle : '　'}
          </span>
          <span style={{color:'#fff'}}>{parts[1]}</span>
        </div>
        <div style={{color:'#666',fontSize:'13px'}}>{q.en}</div>
        {lastResult==='correct'&&<div style={{color:'#10b981',fontSize:'13px',fontWeight:'700'}}>✓ Correct!</div>}
        {lastResult==='wrong'&&<div style={{color:'#ef4444',fontSize:'13px',fontWeight:'700'}}>✕ That was {q.particle}</div>}
      </div>

      <div style={{display:'grid',gridTemplateColumns:cols,gap:'10px',marginTop:'24px'}}>
        {buckets.map(b => (
          <button key={b.particle} onClick={()=>sortTo(b.particle)}
            disabled={lastResult!==null}
            style={{padding:'16px 8px',background:'#0d0d18',
              border:'2px solid '+b.color+'44',borderRadius:'14px',
              cursor:lastResult!==null?'default':'pointer',fontFamily:'inherit',
              display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',
              opacity:lastResult!==null?0.7:1}}>
            <span style={{color:b.color,fontSize:'32px',fontWeight:'900'}}>{b.particle}</span>
            <span style={{color:'#555',fontSize:'10px',fontWeight:'600'}}>{b.romaji}</span>
            <div style={{background:'#1a1a2e',borderRadius:'8px',padding:'3px 10px',minWidth:'40px',textAlign:'center'}}>
              <span style={{color:'#10b981',fontSize:'13px',fontWeight:'700'}}>{bucketCorrect[b.particle]||0}</span>
              <span style={{color:'#333',fontSize:'11px'}}>/{bucketCounts[b.particle]||0}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════
// SCENE BUILDER DB — #98 Conversational Games
// 19 real-world Japanese scenes each with a background image,
// situation prompt, target phrase tiles, English translation,
// and decoy tiles. Images load from /public/scenes/. Missing
// images fall back to a styled placeholder with scene icon.
// TILE_GLOSSARY maps each tile to romaji + English for the
// vocab key and tile labels shown in the game.
// ═════════════════════════════════════════════
const TILE_GLOSSARY = {
  "すみません、":{r:"sumimasen",e:"excuse me"},
  "これを":{r:"kore wo",e:"this (obj.)"},
  "ください":{r:"kudasai",e:"please"},
  "これは":{r:"kore wa",e:"this (topic)"},
  "いくら":{r:"ikura",e:"how much"},
  "ですか？":{r:"desu ka?",e:"is it?"},
  "おちゃを":{r:"ocha wo",e:"tea (obj.)"},
  "くすりは":{r:"kusuri wa",e:"medicine"},
  "どこですか？":{r:"doko desu ka?",e:"where is it?"},
  "ちゅうもんを":{r:"chuumon wo",e:"order (obj.)"},
  "おねがいします":{r:"onegaishimasu",e:"please"},
  "ラーメンを":{r:"raamen wo",e:"ramen (obj.)"},
  "ひとつ":{r:"hitotsu",e:"one"},
  "おすすめは":{r:"osusume wa",e:"recommendation"},
  "なんですか？":{r:"nan desu ka?",e:"what is it?"},
  "コーヒーを":{r:"koohii wo",e:"coffee (obj.)"},
  "トイレは":{r:"toire wa",e:"bathroom"},
  "とうきょうまで":{r:"toukyou made",e:"to Tokyo"},
  "いくらですか？":{r:"ikura desu ka?",e:"how much?"},
  "このバスは":{r:"kono basu wa",e:"this bus"},
  "しぶやに":{r:"shibuya ni",e:"to Shibuya"},
  "いきますか？":{r:"ikimasu ka?",e:"does it go?"},
  "えきまで":{r:"eki made",e:"to the station"},
  "はじめまして、":{r:"hajimemashite",e:"nice to meet you"},
  "わたしは":{r:"watashi wa",e:"I (topic)"},
  "アレックスです":{r:"Arekkusu desu",e:"I'm Alex"},
  "せんせい、":{r:"sensei",e:"teacher"},
  "しつもんが":{r:"shitsumon ga",e:"question (subj.)"},
  "あります":{r:"arimasu",e:"I have"},
  "よろしく":{r:"yoroshiku",e:"kindly"},
  "きても":{r:"kite mo",e:"even if wearing"},
  "いいですか？":{r:"ii desu ka?",e:"is it okay?"},
  "このほんは":{r:"kono hon wa",e:"this book"},
  "チェックインを":{r:"chekkuin wo",e:"check-in (obj.)"},
  "おくりたいんですが":{r:"okuritai n desu ga",e:"I'd like to send"},
  "えんを":{r:"en wo",e:"yen (obj.)"},
  "かえたいんですが":{r:"kaetai n desu ga",e:"I'd like to exchange"},
  "ありがとう":{r:"arigatou",e:"thank you"},
  "どこですか":{r:"doko desu ka",e:"where is it"},
  "どうぞ":{r:"douzo",e:"please/here you go"},
  "こーひーを":{r:"koohii wo",e:"coffee"},
  "ふたつ":{r:"futatsu",e:"two"},
  "すみません":{r:"sumimasen",e:"excuse me"},
};

const SCENE_DB = [
  { id:"conbini",    image:"/scenes/conbini.jpg",    scene:"コンビニ",      icon:"🏪", situation:"You put your items on the counter. The cashier looks at you.",        tiles:["すみません、","これを","ください"],                   en:"Excuse me, I'll have this please.",       decoys:["ありがとう","いくら","どこですか"] },
  { id:"supermarket",image:"/scenes/supermarket.jpg",scene:"スーパー",      icon:"🛒", situation:"You pick up an item and want to know the price.",                    tiles:["これは","いくら","ですか？"],                              en:"How much is this?",                       decoys:["どこですか？","ください","ありがとう"] },
  { id:"vending",    image:"/scenes/vending.jpg",    scene:"自販機",            icon:"🥤", situation:"You're at a vending machine and want green tea.",                    tiles:["おちゃを","ください"],                                          en:"Tea please.",                             decoys:["こーひーを","これは","すみません、"] },
  { id:"pharmacy",   image:"/scenes/pharmacy.jpg",   scene:"薬局",                  icon:"💊", situation:"You need medicine and can't find it on the shelves.",               tiles:["すみません、","くすりは","どこですか？"],            en:"Excuse me, where is the medicine?",       decoys:["これを","ください","ありがとう"] },
  { id:"restaurant", image:"/scenes/restaurant.jpg", scene:"レストラン",icon:"🍽️", situation:"The waiter walks over to your table.",                          tiles:["すみません、","ちゅうもんを","おねがいします"],          en:"Excuse me, I'd like to order.",           decoys:["ありがとう","いくら","どこですか？"] },
  { id:"ramen",      image:"/scenes/ramen.jpg",      scene:"ラーメン屋",icon:"🍜", situation:"You sit at the ramen counter. The staff looks at you.",             tiles:["ラーメンを","ひとつ","ください"],                      en:"One ramen please.",                       decoys:["ふたつ","すみません、","おねがいします"] },
  { id:"izakaya",    image:"/scenes/izakaya.jpg",    scene:"居酒屋",            icon:"🍻", situation:"The server comes over. You want to know what's good here.",          tiles:["おすすめは","なんですか？"],                            en:"What do you recommend?",                  decoys:["いくら","ください","どこですか？"] },
  { id:"cafe",       image:"/scenes/cafe.jpg",       scene:"カフェ",            icon:"☕",       situation:"You step up to the cafe counter to order.",                          tiles:["コーヒーを","ください"],                                        en:"Coffee please.",                          decoys:["おちゃを","これを","ひとつ"] },
  { id:"station",    image:"/scenes/station.jpg",    scene:"駅",                        icon:"🚂", situation:"You're at the station and need to find the bathroom.",               tiles:["すみません、","トイレは","どこですか？"],            en:"Excuse me, where is the bathroom?",       decoys:["これは","ください","いくら"] },
  { id:"ticket",     image:"/scenes/ticket.jpg",     scene:"券販機",            icon:"🎫", situation:"You want to buy a ticket to Tokyo.",                                tiles:["とうきょうまで","いくらですか？"],              en:"How much to Tokyo?",                      decoys:["どこですか？","ください","おねがいします"] },
  { id:"busstop",    image:"/scenes/busstop.jpg",    scene:"バス停",            icon:"🚌", situation:"You're not sure if this bus goes to Shibuya.",                      tiles:["このバスは","しぶやに","いきますか？"],           en:"Does this bus go to Shibuya?",            decoys:["どこですか？","ください","すみません、"] },
  { id:"taxi",       image:"/scenes/taxi.jpg",       scene:"タクシー",      icon:"🚕", situation:"You get in a taxi and tell the driver where to go.",                tiles:["えきまで","おねがいします"],                            en:"To the station please.",                  decoys:["どこですか？","いくら","これを"] },
  { id:"meeting",    image:"/scenes/meeting.jpg",    scene:"はじめまして",icon:"🤝",situation:"You meet someone for the first time.",                        tiles:["はじめまして、","わたしは","アレックスです"],          en:"Nice to meet you, I'm Alex.",             decoys:["ありがとう","これを","どこですか？"] },
  { id:"school",     image:"/scenes/school.jpg",     scene:"学校",                  icon:"🏫", situation:"You're in class and want to ask the teacher a question.",           tiles:["せんせい、","しつもんが","あります"],               en:"Teacher, I have a question.",             decoys:["すみません、","ください","どこですか？"] },
  { id:"office",     image:"/scenes/office.jpg",     scene:"オフィス",      icon:"🏢", situation:"It's your first day. You greet your new coworkers.",               tiles:["よろしく","おねがいします"],                            en:"Nice to work with you.",                  decoys:["はじめまして、","ありがとう","すみません、"] },
  { id:"clothing",   image:"/scenes/clothing.jpg",   scene:"衣料品店",      icon:"👗", situation:"You find something you like and want to try it on.",               tiles:["これを","きても","いいですか？"],                       en:"May I try this on?",                      decoys:["すみません、","ください","いくら"] },
  { id:"bookstore",  image:"/scenes/bookstore.jpg",  scene:"本屋",                  icon:"📚", situation:"You want to know the price of a book you found.",                  tiles:["このほんは","いくらですか？"],                         en:"How much is this book?",                  decoys:["どこですか？","ください","これを"] },
  { id:"hotel",      image:"/scenes/hotel.jpg",      scene:"ホテル",            icon:"🏨", situation:"You arrive at your hotel and approach the front desk.",            tiles:["チェックインを","おねがいします"],              en:"Check-in please.",                        decoys:["すみません、","どこですか？","ありがとう"] },
  { id:"postoffice", image:"/scenes/postoffice.jpg", scene:"郵便局",            icon:"📮", situation:"You're at the post office with a package.",                        tiles:["これを","おくりたいんですが"],                          en:"I'd like to send this.",                  decoys:["すみません、","ください","いくら"] },
  { id:"bank",       image:"/scenes/bank.jpg",       scene:"銀行",                  icon:"🏦", situation:"You're at the bank and want to exchange currency.",               tiles:["えんを","かえたいんですか"],                             en:"I'd like to exchange to yen.",            decoys:["これを","ください","いくら"] },
];

// ═════════════════════════════════════════════
// SCENE BUILDER — #98 Conversational Games
// Real Japanese scene photo at top with situation overlay.
// Word tiles below with romaji + English under each tile.
// Tap a tile to place it in the response area (plays audio,
// 3s cooldown per tile). Tap a placed tile to return it to
// the bank (no audio on removal). 📚 key button shows full
// vocab glossary for current scene's tiles. Submit checks
// order. Wrong shows answer + Try Again. Correct plays full
// phrase audio then advances. Images load from /public/scenes/,
// fall back to styled placeholder if not yet downloaded.
//
// Functions:
//   buildBank(scene) — shuffles tiles + decoys into bank
//   tapBank(tile) — places tile, plays audio (3s cooldown)
//   tapPlaced(tile) — returns tile to bank, no audio
//   check() — validates placed order vs target
//   next() — advances scene, reshuffles on new round
// ═════════════════════════════════════════════
function SceneBuilder({ onBack, onXPEarned, totalRounds=1, endless=false }) {
  const [imgErrors, setImgErrors]   = useState({});
  const [showKey, setShowKey]       = useState(false);
  const audioTimers                 = useRef({});

  const buildBank = (scene) =>
    shuffle([...scene.tiles.map((t,i)=>({id:'t'+i,text:t,isTarget:true})),
             ...scene.decoys.map((t,i)=>({id:'d'+i,text:t,isTarget:false}))]);

  const [pool]      = useState(() => shuffle([...SCENE_DB]).slice(0, Math.min(8, SCENE_DB.length)));
  const UNIQUE      = pool.length;
  const [queue, setQueue]               = useState(() => [...pool]);
  const [qIdx, setQIdx]                 = useState(0);
  const [bank, setBank]                 = useState(() => buildBank(pool[0]));
  const [placed, setPlaced]             = useState([]);
  const [feedback, setFeedback]         = useState(null);
  const [firstAttempts, setFirstAttempts] = useState({});
  const [completedIds, setCompletedIds] = useState(() => new Set());
  const [firstCorrect, setFirstCorrect] = useState(0);
  const [done, setDone]                 = useState(false);
  const [roundXP, setRoundXP]           = useState(0);

  const scene = queue[qIdx];

  const [dragInfo, setDragInfo]   = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const dmRef  = useRef({ moved:false, startX:0, startY:0, source:null, token:null });
  const dropRef = useRef(null);

  const startDrag = (e, token, source) => {
    if (feedback) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dmRef.current = { moved:false, startX:e.clientX, startY:e.clientY, source, token };
  };

  const moveDrag = (e, excludeId) => {
    const dm = dmRef.current;
    if (!dm.token) return;
    const dx = Math.abs(e.clientX - dm.startX);
    const dy = Math.abs(e.clientY - dm.startY);
    if (dx > 8 || dy > 8) {
      dm.moved = true;
      setDragInfo({ token:dm.token, source:dm.source, x:e.clientX, y:e.clientY });
      const els = document.elementsFromPoint(e.clientX, e.clientY);
      const t = els.find(el => el.dataset?.tileId && el.dataset.tileId !== excludeId);
      dropRef.current = t ? t.dataset.tileId : null;
      setDropTarget(dropRef.current);
    } else if (dm.moved) {
      setDragInfo(di => di ? {...di, x:e.clientX, y:e.clientY} : di);
    }
  };

  const endDrag = (e, token, source) => {
    const dm = dmRef.current;
    if (dm.moved && dragInfo) {
      const toId = dropRef.current;
      if (source === 'placed') {
        if (toId) {
          setPlaced(prev => {
            const arr = [...prev];
            const fi = arr.findIndex(t => t.id === token.id);
            const ti = arr.findIndex(t => t.id === toId);
            if (fi !== -1 && ti !== -1) [arr[fi], arr[ti]] = [arr[ti], arr[fi]];
            return arr;
          });
        } else {
          setPlaced(p => p.filter(t => t.id !== token.id));
          setBank(b => [...b, token]);
        }
      } else {
        setBank(b => b.filter(t => t.id !== token.id));
        setPlaced(prev => {
          const arr = [...prev];
          if (toId) { const ti = arr.findIndex(t => t.id === toId); if (ti !== -1) { arr.splice(ti, 0, token); return arr; } }
          return [...arr, token];
        });
        const now = Date.now();
        if (now - (audioTimers.current[token.text]||0) > 3000) { speakJP(token.text); audioTimers.current[token.text] = now; }
      }
    } else {
      // Short tap
      if (source === 'bank') {
        setBank(b => b.filter(t => t.id !== token.id));
        setPlaced(p => [...p, token]);
        const now = Date.now();
        if (now - (audioTimers.current[token.text]||0) > 3000) { speakJP(token.text); audioTimers.current[token.text] = now; }
      } else {
        setPlaced(p => p.filter(t => t.id !== token.id));
        setBank(b => [...b, token]);
      }
    }
    setDragInfo(null); setDropTarget(null);
    dropRef.current = null;
    dmRef.current = { moved:false, startX:0, startY:0, source:null, token:null };
  };

  const check = () => {
    if (feedback || placed.length === 0) return;
    const ok = placed.map(t => t.text).join('') === scene.tiles.join('');
    if (ok) {
      setFeedback('correct'); playSound('correct');
      if (!firstAttempts[scene.id]) setFirstCorrect(n => n+1);
      setCompletedIds(prev => new Set([...prev, scene.id]));
      setTimeout(() => speakJP(scene.tiles.join('')), 400);
    } else {
      setFeedback('wrong'); playSound('wrong');
      if (!firstAttempts[scene.id]) setFirstAttempts(prev => ({...prev, [scene.id]: true}));
    }
  };

  const next = () => {
    setShowKey(false);
    const newCompleted = feedback==='correct' ? new Set([...completedIds, scene.id]) : completedIds;
    if (newCompleted.size >= UNIQUE) {
      const xp = firstCorrect * 25;
      if (onXPEarned) onXPEarned(xp); setRoundXP(xp); setDone(true); return;
    }
    const newQueue = feedback==='wrong' ? [...queue, scene] : queue;
    const ni = qIdx + 1;
    setQueue(newQueue); setCompletedIds(newCompleted);
    setQIdx(ni); setBank(buildBank(newQueue[ni]));
    setPlaced([]); setFeedback(null);
  };

  const gl = (text) => TILE_GLOSSARY[text] || {r:'',e:''};

  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>{firstCorrect>=UNIQUE*0.8?'🏆':firstCorrect>=UNIQUE*0.5?'✅':'📚'}</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>All Scenes Complete</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{firstCorrect} of {UNIQUE} correct on first try</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{firstCorrect}/{UNIQUE}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>FIRST TRY</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{roundXP}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#6366f1',fontSize:'28px',fontWeight:'900'}}>{Math.round(firstCorrect/UNIQUE*100)}%</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>ACCURACY</div></div>
      </div>
      <button onClick={onBack} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>Play Again</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back</button>
    </div>
  );

  const bgColor = feedback==='correct'?'#0a2a1a':feedback==='wrong'?'#1a0a0a':'#0a0a14';
  const bdColor = feedback==='correct'?'#10b981':feedback==='wrong'?'#ef4444':'#2a2a3e';
  const allTiles = [...scene.tiles, ...scene.decoys];

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100dvh',maxHeight:'100dvh',overflow:'hidden'}}>
      {/* Progress */}
      <div style={{padding:'12px 20px 0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{color:'#555',fontSize:'12px',fontWeight:'700'}}>✓ {completedIds.size} / {UNIQUE} scenes</div>
        <div style={{color:firstAttempts[scene.id]?'#f59e0b':'#555',fontSize:'11px',fontWeight:'700'}}>{firstAttempts[scene.id]?'↩ retry':''}</div>
        <div style={{color:'#10b981',fontSize:'12px',fontWeight:'700'}}>{firstCorrect} first try</div>
      </div>
      <div style={{height:'3px',background:'#1e1e30',margin:'8px 20px 0',borderRadius:'2px'}}>
        <div style={{height:'100%',width:(completedIds.size/UNIQUE*100)+'%',background:'linear-gradient(90deg,#6366f1,#10b981)',borderRadius:'2px',transition:'width 0.3s'}}/>
      </div>

      {/* Scene image or placeholder */}
      <div style={{margin:'12px 20px 0',borderRadius:'16px',overflow:'hidden',height:'190px',position:'relative',flexShrink:0}}>
        {!imgErrors[scene.id] ? (
          <img src={scene.image} alt={scene.scene} onError={()=>setImgErrors(e=>({...e,[scene.id]:true}))}
            style={{width:'100%',height:'100%',objectFit:'cover'}}/>
        ) : (
          <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#0d0d28,#1a1a3e)',
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'8px'}}>
            <div style={{fontSize:'48px'}}>{scene.icon}</div>
            <div style={{color:'#6366f1',fontSize:'16px',fontWeight:'700'}}>{scene.scene}</div>
          </div>
        )}
        {/* Situation overlay */}
        <div style={{position:'absolute',bottom:0,left:0,right:0,background:'linear-gradient(transparent,rgba(0,0,0,0.88))',padding:'20px 14px 10px'}}>
          <div style={{color:'#fff',fontSize:'13px',lineHeight:'1.4',fontWeight:'500'}}>{scene.situation}</div>
        </div>
        {/* Scene label */}
        <div style={{position:'absolute',top:'10px',left:'10px',background:'rgba(0,0,0,0.6)',borderRadius:'8px',padding:'3px 10px',backdropFilter:'blur(4px)'}}>
          <div style={{color:'#aaa',fontSize:'11px',fontWeight:'700'}}>{scene.icon} {scene.scene}</div>
        </div>
        {/* Vocab key button */}
        <button onClick={()=>setShowKey(k=>!k)}
          style={{position:'absolute',top:'10px',right:'10px',background:showKey?'#6366f1':'rgba(0,0,0,0.6)',
            border:'1px solid '+(showKey?'#6366f1':'rgba(255,255,255,0.2)'),borderRadius:'8px',
            padding:'3px 10px',color:'#fff',fontSize:'12px',fontWeight:'700',cursor:'pointer',backdropFilter:'blur(4px)'}}>
          📚 Key
        </button>
      </div>

      {/* Vocab key panel */}
      {showKey && (
        <div style={{margin:'8px 20px 0',background:'#10101c',border:'1px solid #2a2a3e',borderRadius:'12px',padding:'12px',display:'flex',flexDirection:'column',gap:'6px'}}>
          <div style={{color:'#555',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'2px'}}>WORD KEY — ALL TILES THIS SCENE</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
            {allTiles.map((t,i) => {
              const g = gl(t);
              return (
                <div key={i} style={{background:'#0a0a14',borderRadius:'8px',padding:'6px 10px',display:'flex',flexDirection:'column',gap:'1px'}}>
                  <div style={{color:'#fff',fontSize:'14px',fontWeight:'700'}}>{t}</div>
                  <div style={{color:'#6366f1',fontSize:'10px'}}>{g.r}</div>
                  <div style={{color:'#555',fontSize:'10px'}}>{g.e}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Placed tiles */}
      <div style={{margin:'10px 20px 0',background:bgColor,border:'2px solid '+bdColor,
        borderRadius:'14px',padding:'12px',minHeight:'60px',transition:'all 0.25s',
        display:'flex',flexWrap:'wrap',gap:'8px',alignItems:'center'}}>
        {placed.length===0 && !feedback && (
          <div style={{color:'#333',fontSize:'12px',width:'100%',textAlign:'center'}}>Tap words below to build your response — need {scene.tiles.length} word{scene.tiles.length>1?'s':''}</div>
        )}
        {placed.length>0 && !feedback && (
          <div style={{color:'#555',fontSize:'10px',width:'100%',textAlign:'right',marginBottom:'2px'}}>{placed.length} / {scene.tiles.length} words</div>
        )}
        {placed.map(tile => {
          const g = gl(tile.text);
          const isDragging = dragInfo?.token?.id === tile.id && dragInfo?.source === 'placed';
          const isTarget   = dropTarget === tile.id;
          return (
            <button key={tile.id} data-tile-id={tile.id}
              onPointerDown={e=>startDrag(e,tile,'placed')}
              onPointerMove={e=>moveDrag(e,tile.id)}
              onPointerUp={e=>endDrag(e,tile,'placed')}
              style={{padding:'8px 14px',
                background:isTarget?'#2a2a50':isDragging?'transparent':'#1e1e40',
                border:'2px solid '+(isTarget?'#a5b4fc':isDragging?'transparent':'#6366f1'),
                borderRadius:'10px',cursor:'grab',fontFamily:'inherit',
                display:'flex',flexDirection:'column',alignItems:'center',gap:'1px',
                opacity:isDragging?0.3:1,touchAction:'none',userSelect:'none'}}>
              <span style={{color:'#fff',fontSize:'15px',fontWeight:'700'}}>{tile.text}</span>
              {g.r&&<span style={{color:'#6366f188',fontSize:'9px'}}>{g.r}</span>}
            </button>
          );
        })}
        {feedback==='correct'&&<div style={{color:'#10b981',fontSize:'13px',fontWeight:'700',width:'100%',textAlign:'center'}}>✓ {scene.tiles.join('')} — {scene.en}</div>}
        {feedback==='wrong'&&<div style={{color:'#ef4444',fontSize:'12px',width:'100%',textAlign:'center'}}>✕ Not quite — answer: {scene.tiles.join('')}</div>}
      </div>

      {/* Bank tiles */}
      <div style={{margin:'10px 20px 0',display:'flex',flexWrap:'wrap',gap:'8px',maxHeight:'130px',overflowY:'auto'}}>
        {bank.map(tile => {
          const g = gl(tile.text);
          const isDragging = dragInfo?.token?.id === tile.id && dragInfo?.source === 'bank';
          return (
            <button key={tile.id} data-tile-id={tile.id}
              onPointerDown={e=>startDrag(e,tile,'bank')}
              onPointerMove={e=>moveDrag(e,tile.id)}
              onPointerUp={e=>endDrag(e,tile,'bank')}
              style={{padding:'8px 14px',background:'#10101c',border:'1px solid #2a2a3e',
                borderRadius:'10px',cursor:'grab',fontFamily:'inherit',
                display:'flex',flexDirection:'column',alignItems:'center',gap:'1px',
                opacity:isDragging?0.3:1,touchAction:'none',userSelect:'none'}}>
              <span style={{color:'#ccc',fontSize:'15px',fontWeight:'600'}}>{tile.text}</span>
              {g.r&&<span style={{color:'#555',fontSize:'9px'}}>{g.r}</span>}
            </button>
          );
        })}
      </div>

      {/* Floating ghost tile during drag */}
      {dragInfo&&(
        <div style={{position:'fixed',left:dragInfo.x-30,top:dragInfo.y-22,
          padding:'8px 14px',background:dragInfo.source==='bank'?'#374151':'#6366f1',
          border:'2px solid #6366f1',borderRadius:'10px',color:'#fff',
          fontSize:'15px',fontWeight:'700',pointerEvents:'none',zIndex:9999,
          boxShadow:'0 8px 32px rgba(99,102,241,0.4)',transform:'rotate(2deg)'}}>
          {dragInfo.token.text}
        </div>
      )}

      {/* Action button */}
      <div style={{margin:'10px 20px',flexShrink:0}}>
        {!feedback ? (
          <button onClick={check} disabled={placed.length===0}
            style={{width:'100%',padding:'18px',
              background:placed.length>0?'linear-gradient(135deg,#6366f1,#4f46e5)':'#1a1a2e',
              border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',
              cursor:placed.length>0?'pointer':'default'}}>Submit</button>
        ) : (
          <button onClick={next}
            style={{width:'100%',padding:'18px',
              background:feedback==='correct'?'linear-gradient(135deg,#10b981,#059669)':'linear-gradient(135deg,#6366f1,#4f46e5)',
              border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
            {feedback==='wrong'?'Try Again — comes back later':completedIds.size+1>=UNIQUE?'See Results →':'Next Scene →'}
          </button>
        )}
      </div>
    </div>
  );
}


// ═════════════════════════════════════════════
// SCENE BUILDER DB — #98 Conversational Games
// 19 real-world Japanese scenes each with a background image,
// situation prompt, target phrase tiles, English translation,
// and decoy tiles. Images load from /public/scenes/. Missing
// images fall back to a styled placeholder with scene icon.
// TILE_GLOSSARY maps each tile to romaji + English for the
// vocab key and tile labels shown in the game.
// ═════════════════════════════════════════════

// ═════════════════════════════════════════════
// CONVERSATION FLOW DB — #97 Conversational Games
// 5 real-world Japanese conversation scenarios. Each has
// 3-4 exchanges (steps). The other person speaks in Japanese
// and the player picks from 2-3 response options. One option
// is the natural correct response (+1 point). Wrong options
// still let the conversation continue but show why they were
// awkward. Feedback shown after each exchange before moving on.
// More scenarios added as content expands.
//
// Structure per step:
//   speaker — who is speaking (Japanese role name)
//   jp      — what they say in Japanese
//   romaji  — romanised reading
//   en      — English translation
//   options — array of { jp, romaji, en, correct, feedback }
//             feedback only required on wrong options
// ═════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// CONVERSATION FLOW — #97 Conversational Games
// AI-powered iMessage-style Japanese conversation practice.
// Claude plays the other person, responds in hiragana/
// katakana only (kanji exceptions: 日本、日本語、私).
// Vocabulary calibrated to the learner's current lesson.
// 4 tappable reply options per turn + free-type input.
// 💡 Hint button explains context in English.
// 5 turns per session, XP based on completion.
// Requires /api/chat.js on Vercel + ANTHROPIC_API_KEY env var.
// ═══════════════════════════════════════════════════════
const AI_SCENARIOS = [
  { id:"restaurant", scene:"レストラン",       icon:"🍜", character:"friendly waiter",      characterJP:"ウェイター", setting:"The learner walks into a Japanese ramen restaurant" },
  { id:"conbini",    scene:"コンビニ",          icon:"🏪", character:"convenience store cashier", characterJP:"てんいん", setting:"The learner is at a Japanese convenience store counter" },
  { id:"meeting",    scene:"はじめまして",       icon:"🤝", character:"friendly Japanese person the same age", characterJP:"ゆうき", setting:"The learner meets a Japanese person their age for the first time" },
  { id:"cafe",       scene:"カフェ",            icon:"☕", character:"friendly barista",     characterJP:"バリスタ", setting:"The learner steps up to order at a busy Japanese cafe" },
  { id:"station",    scene:"えき",              icon:"🚉", character:"helpful station staff", characterJP:"えきいん", setting:"The learner needs help at a Japanese train station" },
  { id:"shopping",   scene:"ショッピング",       icon:"🛍️", character:"cheerful shop assistant", characterJP:"てんいん", setting:"The learner is browsing a Japanese clothing store" },
];
const MAX_TURNS = 5;

function ConversationFlow({ onBack, onXPEarned, currentDay = 1 }) {
  const [phase, setPhase]       = useState('select');
  const [scenario, setScenario] = useState(null);
  const [apiMsgs, setApiMsgs]   = useState([]);
  const [bubbles, setBubbles]   = useState([]);
  const [options, setOptions]   = useState([]);
  const [hint, setHint]         = useState('');
  const [showHint, setShowHint] = useState(false);
  const [typed, setTyped]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [turn, setTurn]         = useState(0);
  const [error, setError]       = useState(null);
  const [done, setDone]         = useState(false);
  const chatRef = useRef(null);

  const scrollBottom = () => setTimeout(() => { chatRef.current?.scrollTo({ top: 99999, behavior: 'smooth' }); }, 80);

  const callAI = async (msgs, scen) => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs, currentDay, scenario: scen }),
      });
      if (!res.ok) throw new Error('API ' + res.status);
      const data = await res.json();
      const raw = data.content?.[0]?.text || '';
      const clean = raw.replace(/```json|```/g, '').trim();
      return JSON.parse(clean);
    } catch(e) {
      setError('Could not connect. Check /api/chat.js is deployed and ANTHROPIC_API_KEY is set in Vercel.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const startScenario = async (scen) => {
    setScenario(scen);
    setPhase('chat');
    const initMsg = [{ role: 'user', content: `Start the conversation. Speak first as the ${scen.character}. Set the scene naturally.` }];
    setApiMsgs(initMsg);
    const result = await callAI(initMsg, scen);
    if (!result) return;
    setBubbles([{ id: 0, from: 'ai', jp: result.reply, en: result.translation }]);
    setOptions(result.options);
    setHint(result.hint);
    setTurn(1);
    scrollBottom();
  };

  const sendReply = async (jpText, enText) => {
    if (loading) return;
    setShowHint(false);
    const userBubble = { id: Date.now(), from: 'user', jp: jpText, en: enText };
    setBubbles(prev => [...prev, userBubble]);
    setOptions([]);
    setTyped('');
    scrollBottom();

    const newTurn = turn + 1;
    const newApiMsgs = [
      ...apiMsgs,
      { role: 'assistant', content: bubbles[bubbles.length - 1]?.jp || '' },
      { role: 'user', content: `The learner replied: "${jpText}". ${newTurn >= MAX_TURNS ? 'This is the last turn — wrap up the conversation naturally.' : 'Continue the conversation naturally.'}` },
    ];
    setApiMsgs(newApiMsgs);

    if (newTurn >= MAX_TURNS) {
      const xp = MAX_TURNS * 20;
      if (onXPEarned) onXPEarned(xp);
      setDone(true);
      return;
    }

    const result = await callAI(newApiMsgs, scenario);
    if (!result) return;
    setBubbles(prev => [...prev, { id: Date.now() + 1, from: 'ai', jp: result.reply, en: result.translation }]);
    setOptions(result.options);
    setHint(result.hint);
    setTurn(newTurn);
    scrollBottom();
  };

  const sendTyped = () => {
    if (!typed.trim() || loading) return;
    sendReply(typed.trim(), '');
  };

  // ── SELECT SCREEN ──
  if (phase === 'select') return (
    <div style={{padding:'20px',display:'flex',flexDirection:'column',gap:'12px'}}>
      <div style={{color:'#fff',fontSize:'18px',fontWeight:'700',marginBottom:'4px'}}>Conversation Flow</div>
      <div style={{color:'#555',fontSize:'13px',marginBottom:'8px'}}>Pick a scenario. AI will text you in Japanese. Reply to keep the conversation going.</div>
      {AI_SCENARIOS.map(scen => (
        <button key={scen.id} onClick={()=>startScenario(scen)}
          style={{background:'#10101c',border:'1px solid #2a2a3e',borderRadius:'16px',padding:'16px',display:'flex',alignItems:'center',gap:'14px',cursor:'pointer',textAlign:'left',width:'100%',fontFamily:'inherit'}}>
          <div style={{fontSize:'32px',flexShrink:0}}>{scen.icon}</div>
          <div>
            <div style={{color:'#fff',fontSize:'15px',fontWeight:'600'}}>{scen.scene}</div>
            <div style={{color:'#555',fontSize:'12px',marginTop:'2px'}}>{scen.setting.replace('The learner','You')}</div>
          </div>
          <div style={{color:'#6366f1',fontSize:'18px',marginLeft:'auto'}}>›</div>
        </button>
      ))}
    </div>
  );

  // ── DONE SCREEN ──
  if (done) return (
    <div style={{textAlign:'center',padding:'40px 20px'}}>
      <div style={{fontSize:'64px',marginBottom:'16px'}}>💬</div>
      <div style={{color:'#fff',fontSize:'24px',fontWeight:'900',marginBottom:'4px'}}>Conversation Complete!</div>
      <div style={{color:'#555',fontSize:'14px',marginBottom:'28px'}}>{MAX_TURNS} messages exchanged</div>
      <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'28px'}}>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#10b981',fontSize:'28px',fontWeight:'900'}}>{MAX_TURNS}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>TURNS</div></div>
        <div style={{background:'#10101c',borderRadius:'14px',padding:'16px 24px'}}><div style={{color:'#f59e0b',fontSize:'28px',fontWeight:'900'}}>+{MAX_TURNS*20}</div><div style={{color:'#555',fontSize:'10px',marginTop:'2px'}}>XP</div></div>
      </div>
      <button onClick={()=>{setPhase('select');setBubbles([]);setOptions([]);setTurn(0);setDone(false);}} style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer',marginBottom:'10px'}}>New Conversation</button>
      <button onClick={onBack} style={{width:'100%',padding:'14px',background:'none',border:'1px solid #2a2a3e',borderRadius:'12px',color:'#555',fontSize:'14px',cursor:'pointer'}}>← Back</button>
    </div>
  );

  // ── CHAT SCREEN ──
  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh',background:'#000',fontFamily:'system-ui,sans-serif'}}>

      {/* iMessage header */}
      <div style={{background:'#1c1c1e',borderBottom:'0.5px solid #2a2a3e',padding:'10px 16px',display:'flex',alignItems:'center',gap:'12px',flexShrink:0}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:'#6366f1',fontSize:'14px',fontWeight:'600',cursor:'pointer',padding:0}}>← Back</button>
        <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center'}}>
          <div style={{fontSize:'28px'}}>{scenario?.icon}</div>
          <div style={{color:'#fff',fontSize:'13px',fontWeight:'600'}}>{scenario?.characterJP}</div>
          <div style={{color:'#8e8e93',fontSize:'11px'}}>{scenario?.scene}</div>
        </div>
        <button onClick={()=>setShowHint(h=>!h)}
          style={{background:showHint?'#6366f122':'none',border:'1px solid '+(showHint?'#6366f1':'#3a3a3c'),borderRadius:'10px',padding:'6px 10px',color:showHint?'#6366f1':'#8e8e93',fontSize:'13px',cursor:'pointer'}}>
          💡 Hint
        </button>
      </div>

      {/* Hint banner */}
      {showHint && hint && (
        <div style={{background:'#1c2a1c',borderBottom:'0.5px solid #10b98144',padding:'10px 16px',color:'#10b981',fontSize:'12px',lineHeight:'1.5',flexShrink:0}}>
          💡 {hint}
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div style={{background:'#2a0a0a',borderBottom:'0.5px solid #ef444444',padding:'10px 16px',color:'#ef4444',fontSize:'11px',lineHeight:'1.5',flexShrink:0}}>
          ⚠️ {error}
        </div>
      )}

      {/* Turn counter */}
      <div style={{background:'#000',padding:'6px 0',textAlign:'center',flexShrink:0}}>
        <div style={{display:'inline-flex',gap:'6px'}}>
          {Array.from({length:MAX_TURNS}).map((_,i)=>(
            <div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:i<turn?'#6366f1':'#3a3a3c'}}/>
          ))}
        </div>
      </div>

      {/* Chat bubbles */}
      <div ref={chatRef} style={{flex:1,overflowY:'auto',padding:'12px 16px',display:'flex',flexDirection:'column',gap:'12px',justifyContent:'flex-end',minHeight:0}}>
        {bubbles.map((b,i) => (
          <div key={b.id||i} style={{display:'flex',flexDirection:'column',alignItems:b.from==='ai'?'flex-start':'flex-end'}}>
            {b.from==='ai' && (
              <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#3a3a3c',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',marginBottom:'4px'}}>{scenario?.icon}</div>
            )}
            <div style={{
              maxWidth:'75%',padding:'10px 14px',borderRadius:b.from==='ai'?'18px 18px 18px 4px':'18px 18px 4px 18px',
              background:b.from==='ai'?'#3a3a3c':'#6366f1',
            }}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'8px'}}>
                <div style={{color:'#fff',fontSize:'16px',lineHeight:'1.4',flex:1}}>{b.jp}</div>
                {b.from==='ai'&&<button onClick={()=>speakJP(b.jp)} style={{background:'none',border:'none',color:'#aeaeb2',fontSize:'14px',cursor:'pointer',flexShrink:0,padding:'2px 4px'}}>🔊</button>}
              </div>
              {b.from==='ai'&&!hardMode&&b.romaji&&<div style={{color:'#aeaeb2',fontSize:'11px',marginTop:'3px'}}>{b.romaji}</div>}
              {b.en&&!hardMode&&<div style={{color:b.from==='ai'?'#aeaeb2':'#c7c7ff',fontSize:'11px',marginTop:'4px',fontStyle:'italic'}}>{b.en}</div>}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div style={{display:'flex',alignItems:'flex-end',gap:'8px'}}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#3a3a3c',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px'}}>{scenario?.icon}</div>
            <div style={{background:'#3a3a3c',borderRadius:'18px 18px 18px 4px',padding:'12px 16px',display:'flex',gap:'4px',alignItems:'center'}}>
              {[0,0.2,0.4].map((d,i)=>(
                <div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:'#aeaeb2',animation:'typingDot 1.2s ease infinite',animationDelay:d+'s'}}/>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reply options */}
      {!loading && options.length > 0 && !done && (
        <div style={{padding:'8px 12px 4px',background:'#000',flexShrink:0}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'6px'}}>
            {options.map((opt,i) => (
              <button key={i} onClick={()=>sendReply(opt.jp, opt.en)}
                style={{background:'#1c1c1e',border:'1px solid #3a3a3c',borderRadius:'14px',padding:'10px 10px',cursor:'pointer',textAlign:'left',fontFamily:'inherit'}}>
                <div style={{color:'#fff',fontSize:'14px',fontWeight:'500'}}>{opt.jp}</div>
                <div style={{color:'#8e8e93',fontSize:'10px',marginTop:'2px'}}>{opt.romaji}</div>
                <div style={{color:'#6366f1',fontSize:'10px',marginTop:'1px'}}>{opt.en}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Type your own */}
      {!loading && !done && (
        <div style={{padding:'8px 12px 16px',background:'#000',display:'flex',gap:'8px',alignItems:'center',flexShrink:0}}>
          <input
            type="text" value={typed} maxLength={30}
            onChange={e=>setTyped(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&sendTyped()}
            placeholder={ended?"Conversation ended":loading?"Waiting...":"Type in Japanese..."}
            disabled={loading||ended}
            style={{flex:1,background:'#1c1c1e',border:'1px solid '+(ended?'#2a2a3e':'#3a3a3c'),borderRadius:'20px',padding:'10px 16px',color:ended||loading?'#555':'#fff',fontSize:'15px',outline:'none',fontFamily:'inherit',opacity:ended?0.5:1}}
          />
          <button onClick={sendTyped} disabled={!typed.trim()||loading||ended}
            style={{width:'36px',height:'36px',borderRadius:'50%',background:typed.trim()?'#6366f1':'#3a3a3c',border:'none',color:'#fff',fontSize:'16px',cursor:typed.trim()?'pointer':'default',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            ↑
          </button>
        </div>
      )}

      <style>{`@keyframes typingDot{0%,100%{opacity:0.3;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}} @keyframes pulseDot{0%,100%{box-shadow:0 0 0 3px rgba(99,102,241,0.3)}50%{box-shadow:0 0 0 7px rgba(99,102,241,0)}}`}</style>
    </div>
  );
}


function buildParticleQuiz(currentDay) {
  // Today's unlocked particles + recent ones
  const unlocked = PARTICLE_DATA.filter(p => p.introduced <= currentDay);
  const recent   = unlocked.filter(p => p.introduced >= currentDay - 4);
  const pool     = recent.length >= 2 ? recent : unlocked;
  const questions = pool.flatMap(p =>
    (p.quiz || []).map(q => ({
      type: 'mc',
      q: q.q,
      options: q.options,
      answer: q.answer,
      exp: q.exp,
      particle: p.particle,
      romaji: p.romaji,
    }))
  );
  return shuffle(questions).slice(0, Math.min(8, questions.length));
}

function buildParticleQuizAll(currentDay) {
  const unlocked = PARTICLE_DATA.filter(p => p.introduced <= currentDay);
  const questions = unlocked.flatMap(p =>
    (p.quiz || []).map(q => ({
      type: 'mc',
      q: q.q,
      options: q.options,
      answer: q.answer,
      exp: q.exp,
      particle: p.particle,
      romaji: p.romaji,
    }))
  );
  return shuffle(questions).slice(0, Math.min(25, questions.length));
}


// ═══════════════════════════════════════════
// 18+ ADULT CONTENT — #93
// Casual/vulgar Japanese for context awareness
// ═══════════════════════════════════════════
const ADULT_PHRASES = [
  { jp:"クソ", romaji:"Kuso", en:"Shit / Fuck / Damn", context:"The most versatile Japanese expletive — works like shit or fuck depending on delivery.", example:"クソ、また遅刻だよ。", exRomaji:"Kuso, mata chikoku da yo.", exEn:"Shit, I'm late again." },
  { jp:"バカ", romaji:"Baka", en:"Idiot / Stupid / Moron", context:"Japan's most common insult. Casual between friends or a real attack.", example:"なんでそんなことしたんだよ、バカ！", exRomaji:"Nande sonna koto shitanda yo, baka!", exEn:"Why did you do that, you idiot!" },
  { jp:"うざい", romaji:"Uzai", en:"So fucking annoying", context:"Short for uzattai. Said when someone is getting on your last nerve.", example:"あいつまじうざいんだけど。", exRomaji:"Aitsu maji uzain dakedo.", exEn:"That guy is seriously so annoying." },
  { jp:"まじかよ", romaji:"Maji ka yo", en:"Are you serious / What the fuck", context:"Said when you're shocked or disbelieving. The intensity determines how vulgar it reads.", example:"まじかよ、それ本当の話なの？", exRomaji:"Maji ka yo, sore hontou no hanashi na no?", exEn:"What the fuck, is that actually true?" },
  { jp:"ちくしょう", romaji:"Chikushou", en:"Damn it / Son of a bitch", context:"Literally beast. A frustrated expletive for when things go badly wrong.", example:"ちくしょう、また失敗した。", exRomaji:"Chikushou, mata shippai shita.", exEn:"Damn it, I failed again." },
];

function buildVulgarQuiz(count) {
  const qs = [];
  ADULT_PHRASES.forEach(p => {
    const wrongEn = shuffle(ADULT_PHRASES.filter(x=>x.romaji!==p.romaji)).slice(0,3).map(x=>x.en);
    const opts1 = shuffle([p.en,...wrongEn]);
    qs.push({type:'mc',q:p.romaji+' means...',options:opts1,answer:opts1.indexOf(p.en),exp:p.context});
    const wrongJp = shuffle(ADULT_PHRASES.filter(x=>x.romaji!==p.romaji)).slice(0,3).map(x=>x.jp);
    const opts2 = shuffle([p.jp,...wrongJp]);
    qs.push({type:'mc',q:'How do you say "'+p.en.split('/')[0].trim()+'"?',options:opts2,answer:opts2.indexOf(p.jp),exp:p.context});
  });
  return shuffle(qs).slice(0,Math.min(count,qs.length));
}


// PARTICLES TAB — reference + inline quiz
// ═══════════════════════════════════════════
function ParticlesTab({ currentDay, onQuiz }) {
  const unlocked = PARTICLE_DATA.filter(p => p.introduced <= currentDay).sort((a,b)=>a.introduced-b.introduced);
  const locked   = PARTICLE_DATA.filter(p => p.introduced > currentDay).sort((a,b)=>a.introduced-b.introduced);
  const [expanded, setExpanded] = useState(null);
  const [quizState, setQuizState] = useState({}); // {particleRomaji: {qIdx: selectedAnswer}}

  const toggleExpand = (romaji) => setExpanded(e => e === romaji ? null : romaji);

  const pickAnswer = (particleRomaji, qIdx, optIdx) => {
    setQuizState(prev => ({
      ...prev,
      [particleRomaji]: { ...(prev[particleRomaji]||{}), [qIdx]: optIdx },
    }));
  };

  return (
    <div style={{paddingBottom:'24px'}}>
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1a1a2e,#0f0f1a)',border:'1px solid #2a2a3e',borderRadius:'16px',padding:'20px',marginBottom:'20px'}}>
        <div style={{color:'#6366f1',fontSize:'11px',fontWeight:'700',letterSpacing:'2px',marginBottom:'6px'}}>REFERENCE</div>
        <div style={{color:'#fff',fontSize:'22px',fontWeight:'900',marginBottom:'4px'}}>⚛️ Particles</div>
        <div style={{color:'#555',fontSize:'13px'}}>The grammar glue of Japanese. Tap any particle to study it.</div>
        <div style={{display:'flex',gap:'8px',marginTop:'12px',flexWrap:'wrap'}}>
          <div style={{background:'rgba(16,185,129,0.1)',border:'1px solid #10b98144',borderRadius:'20px',padding:'4px 12px',color:'#10b981',fontSize:'11px',fontWeight:'700'}}>{unlocked.length} Unlocked</div>
          <div style={{background:'rgba(85,85,85,0.1)',border:'1px solid #33333355',borderRadius:'20px',padding:'4px 12px',color:'#444',fontSize:'11px',fontWeight:'700'}}>{locked.length} Coming</div>
        </div>
        {unlocked.length > 0 && (
          <div style={{display:'flex',gap:'8px',marginTop:'12px'}}>
            <button onClick={()=>onQuiz('today')}
              style={{flex:1,padding:'10px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',border:'none',
                borderRadius:'10px',color:'#fff',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
              📝 Today's Quiz
            </button>
            <button onClick={()=>onQuiz('all')}
              style={{flex:1,padding:'10px',background:'#13131e',border:'1px solid #2a2a3e',
                borderRadius:'10px',color:'#aaa',fontSize:'13px',fontWeight:'700',cursor:'pointer'}}>
              ⭐ All Learned
            </button>
          </div>
        )}
      </div>

      {/* Unlocked particles */}
      {unlocked.map(p => {
        const isOpen = expanded === p.romaji;
        const pQuiz = quizState[p.romaji] || {};
        return (
          <div key={p.romaji} style={{marginBottom:'10px'}}>
            {/* Particle header — always visible */}
            <button onClick={()=>toggleExpand(p.romaji)}
              style={{width:'100%',background:isOpen?'#0d0d18':'#08080f',border:'1px solid '+(isOpen?p.color:'#1e1e30'),
                borderRadius:isOpen?'14px 14px 0 0':'14px',padding:'16px',cursor:'pointer',
                display:'flex',alignItems:'center',gap:'14px',textAlign:'left',transition:'all 0.2s'}}>
              <div style={{background:p.color+'22',border:'1px solid '+p.color,borderRadius:'10px',padding:'6px 14px',
                color:p.color,fontSize:'24px',fontWeight:'900',minWidth:'54px',textAlign:'center'}}>{p.particle}</div>
              <div style={{flex:1}}>
                <div style={{color:'#fff',fontSize:'15px',fontWeight:'700'}}>{p.name}</div>
                <div style={{color:'#555',fontSize:'12px'}}>{p.romaji} · Week {Math.ceil(p.introduced/5)}</div>
              </div>
              <div style={{color:'#555',fontSize:'18px'}}>{isOpen?'▲':'▼'}</div>
            </button>

            {/* Expanded content */}
            {isOpen&&(
              <div style={{background:'#0d0d18',border:'1px solid '+p.color,borderTop:'none',
                borderRadius:'0 0 14px 14px',padding:'16px'}}>

                {/* Intro */}
                <div style={{color:'#ccc',fontSize:'14px',lineHeight:'1.6',marginBottom:'16px',
                  padding:'12px',background:'#07070f',borderRadius:'10px',borderLeft:'3px solid '+p.color}}>
                  {p.intro}
                </div>

                {/* Examples */}
                <div style={{color:p.color,fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'10px'}}>EXAMPLES</div>
                {p.examples.map((ex,i)=>(
                  <div key={i} style={{background:'#07070f',borderRadius:'10px',padding:'12px',marginBottom:'8px'}}>
                    <div style={{color:'#fff',fontSize:'16px',marginBottom:'3px',lineHeight:'1.5'}}>{ex.jp}</div>
                    <div style={{color:'#555',fontSize:'12px',marginBottom:'3px'}}>{ex.romaji}</div>
                    <div style={{color:'#888',fontSize:'13px'}}>{ex.en}</div>
                  </div>
                ))}

                {/* Variations */}
                <div style={{color:p.color,fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginTop:'14px',marginBottom:'10px'}}>VARIATIONS</div>
                {p.variations.map((v,i)=>(
                  <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'8px'}}>
                    <div style={{color:p.color,fontSize:'12px',flexShrink:0,marginTop:'1px'}}>◆</div>
                    <div style={{color:'#aaa',fontSize:'13px',lineHeight:'1.5'}}>{v}</div>
                  </div>
                ))}

                {/* Common mistakes */}
                <div style={{color:'#ef4444',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginTop:'14px',marginBottom:'10px'}}>⚠ COMMON MISTAKES</div>
                {p.mistakes.map((m,i)=>(
                  <div key={i} style={{background:'#1a0a0a',border:'1px solid #ef444433',borderRadius:'10px',padding:'10px 12px',marginBottom:'8px',color:'#ff8888',fontSize:'13px',lineHeight:'1.5'}}>
                    {m}
                  </div>
                ))}

                {/* Mini quiz */}
                <div style={{color:'#f59e0b',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginTop:'14px',marginBottom:'12px'}}>🎯 QUICK CHECK</div>
                {p.quiz.map((q,qi)=>{
                  const selected = pQuiz[qi];
                  const answered = selected !== undefined;
                  const correct  = selected === q.answer;
                  return (
                    <div key={qi} style={{background:'#07070f',borderRadius:'12px',padding:'14px',marginBottom:'10px',
                      border:'1px solid '+(answered?(correct?'#10b981':'#ef4444'):'#1e1e30')}}>
                      <div style={{color:'#fff',fontSize:'13px',fontWeight:'600',marginBottom:'10px',lineHeight:'1.5'}}>{q.q}</div>
                      {q.options.map((opt,oi)=>{
                        const isSelected = selected===oi;
                        const isCorrect  = answered&&oi===q.answer;
                        const isWrong    = answered&&isSelected&&oi!==q.answer;
                        let bg='#0a0a14',border='#2a2a3e',color='#888';
                        if(isCorrect){bg='#0a2a1a';border='#10b981';color='#10b981';}
                        else if(isWrong){bg='#2a0a0a';border='#ef4444';color='#ef4444';}
                        else if(isSelected){bg='#1a1a2e';border='#6366f1';color='#fff';}
                        return (
                          <button key={oi} onClick={()=>!answered&&pickAnswer(p.romaji,qi,oi)}
                            style={{width:'100%',padding:'10px 12px',background:bg,border:'1px solid '+border,
                              borderRadius:'8px',color,fontSize:'13px',textAlign:'left',
                              cursor:answered?'default':'pointer',marginBottom:'6px',transition:'all 0.15s'}}>
                            {opt}
                          </button>
                        );
                      })}
                      {answered&&(
                        <div style={{color:correct?'#10b981':'#ff8888',fontSize:'12px',marginTop:'6px',lineHeight:'1.5'}}>
                          {correct?'✓ Correct! ':'✗ Not quite. '}{q.exp}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Locked particles */}
      {locked.length>0&&(
        <div style={{marginTop:'16px'}}>
          <div style={{color:'#333',fontSize:'11px',fontWeight:'700',letterSpacing:'1px',marginBottom:'10px'}}>COMING UP</div>
          {locked.map(p=>(
            <div key={p.romaji} style={{background:'#06060d',border:'1px solid #111',borderRadius:'12px',
              padding:'14px 16px',marginBottom:'8px',display:'flex',alignItems:'center',gap:'12px',opacity:0.5}}>
              <div style={{background:'#111',borderRadius:'8px',padding:'6px 12px',color:'#333',fontSize:'20px',fontWeight:'900',minWidth:'44px',textAlign:'center'}}>{p.particle}</div>
              <div>
                <div style={{color:'#444',fontSize:'13px',fontWeight:'700'}}>{p.name}</div>
                <div style={{color:'#333',fontSize:'11px'}}>Unlocks Week {Math.ceil(p.introduced/5)}</div>
              </div>
              <div style={{marginLeft:'auto',color:'#333',fontSize:'16px'}}>🔒</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DayScreen({ dayData, allDays, progress, onQuizComplete, onXPEarned, onBack }) {
  const [tab, setTab] = useState("lesson");
  const [showAdult, setShowAdult] = useState(false);
  const [vulgarQuizCount, setVulgarQuizCount] = useState(null);
  const [vulgarQuizActive, setVulgarQuizActive] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [gameType, setGameType] = useState("mix");
  const [gameRounds, setGameRounds]   = useState(3);
  const [gameRomajiOn, setGameRomajiOn] = useState(false);
  const [gamePicker, setGamePicker] = useState(null); // null | "audiomatch" | "speedmatch"
  const [gameCategory, setGameCategory] = useState("characters");
  const [charMode, setCharMode] = useState("hiragana");
  const [flipped, setFlipped] = useState({});
  const [quizMode, setQuizMode] = useState(false);
  const [charSubTab, setCharSubTab] = useState("study");
  const [showAccuracy, setShowAccuracy] = useState(false);
  const [charQuizPopup, setCharQuizPopup] = useState(null);   // null | "quiz1" | "quiz2"
  const [charQuizScript, setCharQuizScript] = useState("mix"); // "hiragana" | "katakana" | "mix"
  const [charQuizCount, setCharQuizCount] = useState(30);      // 10 | 20 | 30
  const [dayQuizScores] = useState(() => {
    const scores = {};
    try {
      allDays.filter(d => d.day <= dayData.day).forEach(d => {
        const s = localStorage.getItem('nihongo_charquiz_' + d.day + '_q1');
        if (s !== null) scores[d.day] = parseInt(s);
      });
    } catch {}
    return scores;
  });
  const [charQuizActive, setCharQuizActive] = useState(null);   // null | "quiz1" | "quiz2"
  const [particleQuizActive, setParticleQuizActive] = useState(null); // null | "today" | "all"
  const [charQuiz1Passed, setCharQuiz1Passed] = useState(() => {
    try { return localStorage.getItem('nihongo_charquiz_passed_' + dayData.day) === 'true'; } catch { return false; }
  });
  const [charQuiz1Score, setCharQuiz1Score] = useState(() => {
    try { const v = localStorage.getItem('nihongo_charquiz_' + dayData.day + '_q1'); return v ? parseInt(v) : null; } catch { return null; }
  });
  const [charQuiz2Score, setCharQuiz2Score] = useState(() => {
    try { const v = localStorage.getItem('nihongo_charquiz_' + dayData.day + '_q2'); return v ? parseInt(v) : null; } catch { return null; }
  });
  const [quizQuestions] = useState(() => buildDailyQuiz(dayData.day));

  const priorDays = allDays.filter(d => d.day < dayData.day);
  const priorChars = priorDays.flatMap(d => charMode === "hiragana" ? d.hiragana : d.katakana);
  const todayChars = charMode === "hiragana" ? dayData.hiragana : dayData.katakana;
  const toggleFlip = (key) => setFlipped(f => ({ ...f, [key]: !f[key] }));

  if (quizMode) {
    return (
      <QuizEngine
        questions={quizQuestions}
        passPercent={90}
        title={`Day ${dayData.day} Quiz`}
        onComplete={(pct, bestStreak, quizResults) => { onQuizComplete(dayData.day, pct, bestStreak, quizResults); }}
        onBack={() => setQuizMode(false)}
      />
    );
  }

  // Pre-computed for IIFE-free game rendering (Safari compatible)
  const gamePhrases     = getPhrases(allDays, dayData);
  const gameLearnedDays = allDays.filter(d => d.day <= dayData.day);
  const gameHiraChars   = gameLearnedDays.flatMap(d => d.hiragana || []);
  const gameKataChars   = gameLearnedDays.flatMap(d => d.katakana || []);
  const gameAllChars    = gameLearnedDays.flatMap(d => [...(d.hiragana||[]), ...(d.katakana||[])]);
  const gameCharsTyped  = gameType==="hiragana" ? gameHiraChars : gameType==="katakana" ? gameKataChars : gameAllChars;
  const _dedup = (arr) => { const s=new Set(); return arr.filter(ch=>{if(s.has(ch.romaji))return false;s.add(ch.romaji);return true;}); };
  const audioMatchChars = _dedup(gameType==="hiragana"?gameHiraChars:gameType==="katakana"?gameKataChars:[...gameHiraChars,...gameKataChars]);
  const mirrorPairs     = gameHiraChars.filter(h => gameKataChars.some(k => k.romaji === h.romaji));

  return (
    <div style={{minHeight:"100vh",background:"#06060f",fontFamily:"'Georgia',serif",display:"flex",flexDirection:"column"}}>
      {/* Header — hidden when convflow fullscreen */}
      {gameActive !== "convflow" && <div style={{background:"#0a0a14",borderBottom:"1px solid #1e1e30",padding:"10px 12px",display:"flex",alignItems:"center",gap:"8px",position:"sticky",top:0,zIndex:10}}>
        <button onClick={()=>{ if(charQuizActive){setCharQuizActive(null);}else if(particleQuizActive){setParticleQuizActive(null);}else if(gameActive){setGameActive(false);}else{onBack();} }}
          style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",fontSize:"13px",padding:"6px 10px",display:"flex",alignItems:"center",gap:"4px",fontWeight:"700",flexShrink:0,border:"1px solid #2a2a3e",borderRadius:"20px",whiteSpace:"nowrap"}}>← Back</button>
        <div style={{flex:1,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none",display:"flex",gap:"6px",justifyContent:"center"}}>
          {!gameActive&&!charQuizActive&&!particleQuizActive&&["lesson","characters","particles","games","quiz"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"6px 14px",background:tab===t?"#fff":"none",border:"1px solid "+(tab===t?"#fff":"#2a2a3e"),borderRadius:"20px",color:tab===t?"#000":"#666",fontSize:"12px",fontWeight:"700",cursor:"pointer",textTransform:"capitalize",flexShrink:0}}>{t}</button>
          ))}
        </div>
        <button onClick={onBack}
          style={{background:"none",border:"1px solid #2a2a3e",borderRadius:"20px",padding:"6px 10px",color:"#666",fontSize:"13px",fontWeight:"700",cursor:"pointer",flexShrink:0}}>🏠</button>
      </div>}

      <div style={{flex:1,maxWidth:"620px",width:"100%",margin:"0 auto",padding:"24px 20px",display:"flex",flexDirection:"column"}}>
        {/* LESSON TAB */}
        {tab==="lesson"&&(
          <div style={{paddingBottom:"24px"}}>
            <div style={{background:"linear-gradient(135deg,#1a1a2e,#0f0f1a)",border:"1px solid #2a2a3e",borderRadius:"16px",padding:"20px",marginBottom:"20px"}}>
              <div style={{color:"#6366f1",fontSize:"11px",fontWeight:"700",letterSpacing:"2px",marginBottom:"6px"}}>DAY {dayData.day}</div>
              <div style={{color:"#fff",fontSize:"22px",fontWeight:"900",marginBottom:"12px"}}>Today's Lesson</div>
              <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                {(()=>{const _w=Math.ceil(dayData.day/5);const _wp=PARTICLE_DATA.filter(p=>p.introduced>(_w-1)*5&&p.introduced<=_w*5).length;return[{label:"📚 "+dayData.facts.length+" Facts",color:"#3b82f6"},{label:"💬 "+dayData.phrases.length+" Phrases",color:"#10b981"},{label:"🔤 "+((dayData.hiragana?.length||0)+(dayData.katakana?.length||0))+" Characters",color:"#a855f7"},...(_wp>0?[{label:"⛛️ "+_wp+" Particles",color:"#6366f1"}]:[])];})().map(b=>(
                  <div key={b.label} style={{background:"rgba(255,255,255,0.05)",border:"1px solid "+b.color+"44",borderRadius:"20px",padding:"4px 12px",color:b.color,fontSize:"11px",fontWeight:"700"}}>{b.label}</div>
                ))}
              </div>
            </div>
            <div style={{marginBottom:"24px"}}>
              <div style={{color:"#10b981",fontSize:"11px",fontWeight:"700",letterSpacing:"2px",marginBottom:"12px"}}>💬 WORDS & PHRASES</div>
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                {dayData.phrases.map((p,i)=>(
                  <div key={i} style={{background:"#0d0d18",border:"1px solid #1e1e30",borderRadius:"14px",padding:"16px"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                      <button onClick={()=>speakJP(p.jp)} style={{background:"rgba(99,102,241,0.15)",border:"1px solid #6366f1",borderRadius:"8px",color:"#6366f1",fontSize:"16px",cursor:"pointer",padding:"4px 8px",flexShrink:0}}>🔊</button>
                      <span style={{color:"#fff",fontSize:"22px",fontWeight:"700"}}>{p.jp}</span>
                    </div>
                    <div style={{color:"#10b981",fontSize:"13px",fontWeight:"600",marginBottom:"4px"}}>{p.romaji}</div>
                    <div style={{color:"#888",fontSize:"13px",lineHeight:"1.5"}}>{p.en}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginBottom:"24px"}}>
              <div style={{color:"#3b82f6",fontSize:"11px",fontWeight:"700",letterSpacing:"2px",marginBottom:"12px"}}>📚 CULTURAL FACTS</div>
              <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                {dayData.facts.map((f,i)=>(
                  <div key={i} style={{background:"#0d0d18",border:"1px solid #1e1e30",borderRadius:"12px",padding:"14px 16px",color:"#ccc",fontSize:"14px",lineHeight:"1.6",display:"flex",gap:"12px",alignItems:"flex-start"}}>
                    <span style={{background:"#3b82f622",border:"1px solid #3b82f644",borderRadius:"6px",color:"#3b82f6",fontWeight:"700",fontSize:"11px",padding:"2px 6px",flexShrink:0,marginTop:"2px"}}>{i+1}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            {((dayData.hiragana?.length||0)+(dayData.katakana?.length||0))>0&&(
              <div style={{marginBottom:"24px"}}>
                <div style={{color:"#a855f7",fontSize:"11px",fontWeight:"700",letterSpacing:"2px",marginBottom:"12px"}}>🔤 CHARACTERS TODAY</div>
                {dayData.hiragana?.length>0&&(
                  <div style={{marginBottom:"12px"}}>
                    <div style={{color:"#555",fontSize:"10px",fontWeight:"700",letterSpacing:"1px",marginBottom:"8px"}}>HIRAGANA</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                      {dayData.hiragana.map((ch,i)=>(<button key={i} onClick={()=>speakJP(ch.char)} style={{background:"#0d0d18",border:"1px solid #2a2a3e",borderRadius:"12px",padding:"12px 16px",textAlign:"center",cursor:"pointer",minWidth:"60px"}}><div style={{color:"#fff",fontSize:"24px",fontWeight:"700"}}>{ch.char}</div><div style={{color:"#a855f7",fontSize:"10px",marginTop:"4px"}}>{ch.romaji}</div></button>))}
                    </div>
                  </div>
                )}
                {dayData.katakana?.length>0&&(
                  <div>
                    <div style={{color:"#555",fontSize:"10px",fontWeight:"700",letterSpacing:"1px",marginBottom:"8px"}}>KATAKANA</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                      {dayData.katakana.map((ch,i)=>(<button key={i} onClick={()=>speakJP(ch.char)} style={{background:"#0d0d18",border:"1px solid #2a2a3e",borderRadius:"12px",padding:"12px 16px",textAlign:"center",cursor:"pointer",minWidth:"60px"}}><div style={{color:"#fff",fontSize:"24px",fontWeight:"700"}}>{ch.char}</div><div style={{color:"#06b6d4",fontSize:"10px",marginTop:"4px"}}>{ch.romaji}</div></button>))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {PARTICLE_DATA.filter(p=>p.introduced===dayData.day).map(p=>(
              <div key={p.particle} style={{background:"#0d0d18",border:"1px solid "+p.color+"44",borderRadius:"14px",padding:"16px",marginBottom:"16px"}}>
                <div style={{color:p.color,fontSize:"11px",fontWeight:"700",letterSpacing:"2px",marginBottom:"10px"}}>⚛️ PARTICLE SPOTLIGHT</div>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
                  <button onClick={()=>speakJP(p.particle)} style={{background:p.color+"22",border:"1px solid "+p.color,borderRadius:"10px",padding:"8px 16px",color:p.color,fontSize:"28px",fontWeight:"900",cursor:"pointer",fontFamily:"inherit"}}>{p.particle}</button>
                  <div style={{flex:1}}><div style={{color:"#fff",fontSize:"16px",fontWeight:"700"}}>{p.name}</div><div style={{color:"#555",fontSize:"12px"}}>{p.romaji}</div></div>
                  <button onClick={()=>speakJP(p.particle)} style={{background:"rgba(99,102,241,0.15)",border:"1px solid #6366f133",borderRadius:"8px",color:"#6366f1",fontSize:"14px",cursor:"pointer",padding:"4px 10px"}}>🔊</button>
                </div>
                <div style={{color:"#aaa",fontSize:"13px",lineHeight:"1.6",marginBottom:"10px"}}>{p.intro}</div>
                <div style={{background:"#07070f",borderRadius:"10px",padding:"12px",marginBottom:"12px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                    <button onClick={()=>speakJP(p.examples[0].jp)} style={{background:"rgba(99,102,241,0.15)",border:"1px solid #6366f133",borderRadius:"6px",color:"#6366f1",fontSize:"12px",cursor:"pointer",padding:"2px 7px",flexShrink:0}}>🔊</button>
                    <div style={{color:"#fff",fontSize:"16px"}}>{p.examples[0].jp}</div>
                  </div>
                  <div style={{color:"#555",fontSize:"12px",marginBottom:"2px"}}>{p.examples[0].romaji}</div>
                  <div style={{color:"#888",fontSize:"12px"}}>{p.examples[0].en}</div>
                </div>
                <button onClick={()=>setTab("particles")} style={{width:"100%",padding:"10px",background:"none",border:"1px solid "+p.color,borderRadius:"10px",color:p.color,fontSize:"13px",fontWeight:"700",cursor:"pointer"}}>
                  Study {p.particle} in depth →
                </button>
              </div>
            ))}
            {/* 18+ Adult Language Section */}
            <div style={{marginBottom:"20px"}}>
              <button onClick={()=>setShowAdult(s=>!s)}
                style={{width:"100%",padding:"16px",background:showAdult?"#1a0a0a":"#0d0d18",
                  border:"1px solid "+(showAdult?"#ef444444":"#1e1e30"),borderRadius:showAdult?"14px 14px 0 0":"14px",
                  display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"}}>
                <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                  <span style={{fontSize:"20px"}}>🔞</span>
                  <div style={{textAlign:"left"}}>
                    <div style={{color:showAdult?"#ef4444":"#888",fontSize:"14px",fontWeight:"700"}}>Vulgar Japanese Expressions</div>
                    <div style={{color:"#444",fontSize:"11px",marginTop:"2px"}}>5 expressions + example sentences</div>
                  </div>
                </div>
                <span style={{color:"#444",fontSize:"16px"}}>{showAdult?"▲":"▼"}</span>
              </button>
              {showAdult&&(
                <div style={{background:"#0a0505",border:"1px solid #ef444422",borderRadius:"0 0 14px 14px",padding:"12px",display:"flex",flexDirection:"column",gap:"10px"}}>
                  {ADULT_PHRASES.map((p,i)=>(
                    <div key={i} style={{background:"#120505",border:"1px solid #2a1010",borderRadius:"14px",padding:"16px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                        <button onClick={()=>speakJP(p.jp)} style={{background:"rgba(239,68,68,0.15)",border:"1px solid #ef4444",borderRadius:"8px",color:"#ef4444",fontSize:"16px",cursor:"pointer",padding:"4px 8px",flexShrink:0}}>🔊</button>
                        <span style={{color:"#fff",fontSize:"22px",fontWeight:"700"}}>{p.jp}</span>
                      </div>
                      <div style={{color:"#ef4444",fontSize:"13px",fontWeight:"600",marginBottom:"4px"}}>{p.romaji}</div>
                      <div style={{color:"#888",fontSize:"13px",lineHeight:"1.5",marginBottom:p.example?"8px":"0"}}>{p.en} — {p.context}</div>
                      {p.example&&<div style={{background:"#0a0303",border:"1px solid #2a1010",borderRadius:"8px",padding:"10px 12px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                          <button onClick={()=>speakJP(p.example)} style={{background:"rgba(239,68,68,0.15)",border:"1px solid #ef4444",borderRadius:"6px",color:"#ef4444",fontSize:"13px",cursor:"pointer",padding:"2px 7px",flexShrink:0}}>🔊</button>
                          <div style={{color:"#ef4444",fontSize:"14px",fontWeight:"700"}}>{p.example}</div>
                        </div>
                        <div style={{color:"#666",fontSize:"12px"}}>{p.exRomaji}</div>
                        <div style={{color:"#444",fontSize:"12px",fontStyle:"italic"}}>{p.exEn}</div>
                      </div>}
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"center",paddingTop:"4px"}}>
                    <button onClick={()=>setVulgarQuizCount(10)} style={{padding:"10px 24px",background:"#1a0808",border:"1px solid #ef444444",borderRadius:"10px",color:"#ef4444",fontSize:"13px",fontWeight:"700",cursor:"pointer"}}>📝 Take Quiz</button>
                  </div>
                </div>
              )}
              {vulgarQuizCount!==null&&!vulgarQuizActive&&(
                <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>setVulgarQuizCount(null)}>
                  <div style={{background:"#10101c",border:"1px solid #ef444444",borderRadius:"20px",padding:"28px 24px",width:"300px",maxWidth:"90vw"}} onClick={e=>e.stopPropagation()}>
                    <div style={{color:"#ef4444",fontSize:"11px",fontWeight:"700",letterSpacing:"2px",marginBottom:"8px"}}>🔞 VULGAR QUIZ</div>
                    <div style={{color:"#fff",fontSize:"18px",fontWeight:"900",marginBottom:"16px"}}>How many questions?</div>
                    <div style={{display:"flex",gap:"8px",marginBottom:"16px"}}>
                      {[10,20,30].map(n=>(
                        <button key={n} onClick={()=>setVulgarQuizCount(n)} style={{flex:1,padding:"12px",background:vulgarQuizCount===n?"#3a0a0a":"#1a1a2e",border:"1px solid "+(vulgarQuizCount===n?"#ef4444":"#2a2a3e"),borderRadius:"10px",color:vulgarQuizCount===n?"#ef4444":"#fff",fontSize:"15px",fontWeight:"700",cursor:"pointer"}}>{n}</button>
                      ))}
                    </div>
                    <button onClick={()=>{if(vulgarQuizCount)setVulgarQuizActive(true);}} style={{width:"100%",padding:"14px",background:vulgarQuizCount?"linear-gradient(135deg,#ef4444,#991b1b)":"#1a1a2e",border:"none",borderRadius:"12px",color:"#fff",fontSize:"15px",fontWeight:"900",cursor:"pointer"}}>Start {vulgarQuizCount||"—"} Questions →</button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={()=>setTab("quiz")} style={{width:"100%",padding:"18px",background:"linear-gradient(135deg,#3b82f6,#1d4ed8)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"17px",fontWeight:"900",cursor:"pointer",letterSpacing:"1px"}}>
              Take Quiz →
            </button>
          </div>
        )}

        {tab==="lesson"&&vulgarQuizActive&&(
          <div style={{position:"fixed",inset:0,background:"#06060f",zIndex:100,overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <QuizEngine key={"vq"+vulgarQuizCount} questions={buildVulgarQuiz(vulgarQuizCount||10)} passPercent={60} title="🔞 Vulgar Japanese Quiz" onComplete={()=>{setVulgarQuizActive(false);setVulgarQuizCount(null);}} onBack={()=>{setVulgarQuizActive(false);setVulgarQuizCount(null);}}/>
          </div>
        )}
        {/* CHARACTERS TAB */}
        {/* CHARACTERS TAB — active quiz mode */}
        {tab==="characters"&&charQuizActive&&(
          <div style={{position:"fixed",inset:0,background:"#06060f",zIndex:100,overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <QuizEngine
              key={charQuizActive}
              questions={charQuizActive==="quiz1"
                ? buildCharacterQuiz(dayData, {script:charQuizScript, count:charQuizCount})
                : buildCharacterQuizAll(allDays, dayData, {script:charQuizScript, count:charQuizCount})}
              passPercent={70}
              title={charQuizActive==="quiz1" ? "Daily Character Quiz" : "All Learned Quiz"}
              onComplete={(pct) => {
                if (charQuizActive==="quiz1") {
                  setCharQuiz1Score(Math.round(pct));
                  try { localStorage.setItem('nihongo_charquiz_' + dayData.day + '_q1', String(Math.round(pct))); } catch {}
                  if (pct >= 70) {
                    setCharQuiz1Passed(true);
                    try { localStorage.setItem('nihongo_charquiz_passed_' + dayData.day, 'true'); } catch {}
                  }
                }
                if (charQuizActive==="quiz2") {
                  setCharQuiz2Score(Math.round(pct));
                  try { localStorage.setItem('nihongo_charquiz_' + dayData.day + '_q2', String(Math.round(pct))); } catch {}
                }
                setCharQuizActive(null);
              }}
              onBack={()=>setCharQuizActive(null)}
            />
          </div>
        )}

        {/* PARTICLE QUIZ — fullscreen */}
        {tab==="particles"&&particleQuizActive&&(
          <div style={{position:"fixed",inset:0,background:"#06060f",zIndex:100,overflowY:"auto",display:"flex",flexDirection:"column"}}>
            <QuizEngine
              key={particleQuizActive}
              questions={particleQuizActive==="today"
                ? buildParticleQuiz(dayData.day)
                : buildParticleQuizAll(dayData.day)}
              passPercent={70}
              title={particleQuizActive==="today" ? "Today's Particle Quiz" : "All Particles Quiz"}
              onComplete={()=>setParticleQuizActive(null)}
              onBack={()=>setParticleQuizActive(null)}
            />
          </div>
        )}

        {/* CHARACTERS TAB — browse / study mode */}
        {tab==="characters"&&!charQuizActive&&(
          <div style={{flex:1,display:"flex",flexDirection:"column"}}>
            <h2 style={{color:"#fff",fontSize:"20px",fontWeight:"700",marginBottom:"16px"}}>Day {dayData.day} — Characters</h2>

            {/* Sub-nav: Study | Daily Quiz | All Learned Quiz */}
            <div style={{display:"flex",gap:"6px",marginBottom:"20px"}}>
              {[
                {id:"study",  label:"Study 📖"},
                {id:"quiz1",  label:"Daily Quiz"},
                {id:"quiz2",  label:"All Learned"},
              ].map(s=>(
                <button key={s.id} onClick={()=>setCharSubTab(s.id)}
                  style={{flex:1,padding:"10px 6px",
                    background:charSubTab===s.id?"#f59e0b":"#10101c",
                    border:"1px solid "+(charSubTab===s.id?"#f59e0b":"#2a2a3e"),
                    borderRadius:"10px",
                    color:charSubTab===s.id?"#000":"#888",
                    fontSize:"12px",fontWeight:"700",cursor:"pointer"}}>
                  {s.label}
                  {s.id==="quiz2"&&!charQuiz1Passed&&(
                    <span style={{display:"block",fontSize:"9px",color:"#444",fontWeight:"600"}}>pass daily first</span>
                  )}
                </button>
              ))}
            </div>

            {/* ── STUDY sub-tab ── */}
            {charSubTab==="study"&&(
              <div style={{flex:1,display:"flex",flexDirection:"column"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
                  <span style={{color:"#555",fontSize:"12px"}}>Show accuracy</span>
                  <button onClick={()=>setShowAccuracy(a=>!a)}
                    style={{width:"44px",height:"24px",borderRadius:"12px",background:showAccuracy?"#6366f1":"#2a2a3e",border:"none",cursor:"pointer",position:"relative",transition:"background 0.2s",flexShrink:0}}>
                    <div style={{width:"20px",height:"20px",borderRadius:"10px",background:"#fff",position:"absolute",top:"2px",left:showAccuracy?"22px":"2px",transition:"left 0.2s"}}/>
                  </button>
                </div>
                <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
                  {["hiragana","katakana"].map(m=>(
                    <button key={m} onClick={()=>setCharMode(m)}
                      style={{flex:1,padding:"10px",
                        background:charMode===m?(m==="hiragana"?"#f59e0b":"#a855f7"):"#13131e",
                        border:"1px solid "+(charMode===m?"transparent":"#2a2a3e"),
                        borderRadius:"8px",color:charMode===m?"#000":"#888",
                        fontSize:"13px",fontWeight:"700",cursor:"pointer",textTransform:"capitalize"}}>{m}</button>
                  ))}
                </div>

                {/* Today's characters — tap to reveal + hear */}
                <div style={{marginBottom:"24px"}}>
                  <div style={{color:"#f59e0b",fontSize:"12px",fontWeight:"700",letterSpacing:"1px",marginBottom:"4px"}}>TODAY'S CHARACTERS</div>
                  <div style={{color:"#555",fontSize:"11px",marginBottom:"12px"}}>Tap to reveal — plays audio on reveal</div>
                  <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
                    {todayChars.map(({char,romaji})=>{
                      const k="today-"+char; const fl=flipped[k];
                      return(
                        <div key={char} onClick={()=>{ toggleFlip(k); if(!flipped[k]) speakJP(char); }}
                          style={{cursor:"pointer",background:fl?"#1a2a1a":"#13131e",border:"1px solid "+(fl?"#10b981":"#2a2a3e"),borderRadius:"12px",padding:"20px 10px",textAlign:"center",minWidth:"80px",flex:"1 0 80px",maxWidth:"100px",transition:"all 0.2s",position:"relative",overflow:"hidden"}}>
                          {showAccuracy&&<CharAccuracyBar char={char}/>}
                          <div style={{fontSize:"32px",color:"#fff",marginBottom:"6px",paddingTop:showAccuracy?"16px":"0"}}>{fl?romaji:char}</div>
                          <div style={{fontSize:"11px",color:"#555"}}>{fl?"tap to hide":"tap to reveal"}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* All learned characters — grouped by week */}
                {priorChars.length>0&&(
                  <div>
                    <div style={{color:"#555",fontSize:"12px",fontWeight:"700",letterSpacing:"1px",marginBottom:"12px"}}>ALL LEARNED CHARACTERS</div>
                    {WEEKS.map(w => {
                      const weekDays = w.days.filter(d => d.day < dayData.day);
                      if (weekDays.length === 0) return null;
                      const weekChars = weekDays.flatMap(d => (charMode === "hiragana" ? d.hiragana : d.katakana).map(ch => ({...ch, dayNum: d.day})));
                      if (weekChars.length === 0) return null;
                      return (
                        <div key={w.weekNum} style={{marginBottom:"16px"}}>
                          <div style={{color:"#444",fontSize:"10px",fontWeight:"700",letterSpacing:"1px",marginBottom:"8px"}}>WEEK {w.weekNum}</div>
                          <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                            {weekChars.map(({char,romaji,dayNum})=>{
                              const k="prior-"+char; const fl=flipped[k];
                              return(
                                <div key={char} onClick={()=>{ toggleFlip(k); if(!flipped[k]) speakJP(char); }}
                                  style={{cursor:"pointer",background:fl?"#1a1a2a":"#0d0d18",border:"1px solid "+(fl?"#6366f1":"#1e1e30"),borderRadius:"10px",padding:"12px 6px",textAlign:"center",minWidth:"62px",flex:"1 0 62px",maxWidth:"80px",transition:"all 0.2s",position:"relative",overflow:"hidden"}}>
                                  {showAccuracy&&<CharAccuracyBar char={char}/>}
                                  <div style={{fontSize:"22px",color:"#aaa",marginBottom:"4px"}}>{fl?romaji:char}</div>
                                  <div style={{fontSize:"9px",color:"#444"}}>{fl?"flip":"reveal"}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CTA to take quiz */}
                <button onClick={()=>setCharSubTab("quiz1")}
                  style={{marginTop:"20px",width:"100%",padding:"14px",background:"linear-gradient(135deg,#f59e0b,#d97706)",border:"none",borderRadius:"12px",color:"#000",fontSize:"15px",fontWeight:"900",cursor:"pointer"}}>
                  Take Daily Character Quiz →
                </button>
              </div>
            )}

            {/* ── DAILY QUIZ sub-tab ── */}
            {charSubTab==="quiz1"&&(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:"52px",marginBottom:"12px"}}>📝</div>
                <div style={{color:"#fff",fontSize:"20px",fontWeight:"900",marginBottom:"6px"}}>Daily Character Quiz</div>
                <div style={{color:"#888",fontSize:"13px",marginBottom:"6px"}}>{charQuizCount==="all"?"All":"Up to "+charQuizCount} questions · Today's hiragana &amp; katakana</div>
                <div style={{color:"#555",fontSize:"12px",marginBottom:"12px"}}>4 types: type romaji, pick character, pick romaji, true/false</div>
                {charQuiz1Score !== null && (
                  <div style={{background:"#10101c",border:"1px solid "+(charQuiz1Score>=70?"#10b981":"#2a2a3e"),borderRadius:"10px",padding:"10px 16px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{color:"#555",fontSize:"12px"}}>Best score</span>
                    <span style={{color:charQuiz1Score>=70?"#10b981":"#f59e0b",fontSize:"16px",fontWeight:"900"}}>{charQuiz1Score}%</span>
                  </div>
                )}
                {charQuiz1Passed&&(
                  <div style={{background:"#0a2a1a",border:"1px solid #10b981",borderRadius:"10px",padding:"10px 16px",marginBottom:"20px"}}>
                    <div style={{color:"#10b981",fontSize:"13px",fontWeight:"700"}}>✓ Passed — All Learned Quiz unlocked!</div>
                  </div>
                )}
                <button onClick={()=>setCharQuizPopup("quiz1")}
                  style={{width:"100%",padding:"18px",background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"16px",fontWeight:"900",cursor:"pointer"}}>
                  {charQuiz1Passed ? "Retake Quiz" : "Start Quiz"}
                </button>
                <button onClick={()=>setCharSubTab("study")}
                  style={{marginTop:"12px",width:"100%",padding:"14px",background:"none",border:"1px solid #2a2a3e",borderRadius:"12px",color:"#666",fontSize:"14px",cursor:"pointer"}}>
                  ← Back to Study
                </button>
              </div>
            )}

            {/* ── ALL LEARNED QUIZ sub-tab ── */}
            {charSubTab==="quiz2"&&(
              <div style={{textAlign:"center",padding:"20px 0"}}>
                {!charQuiz1Passed&&(
                  <div>
                    <div style={{fontSize:"52px",marginBottom:"12px"}}>🔒</div>
                    <div style={{color:"#fff",fontSize:"18px",fontWeight:"900",marginBottom:"8px"}}>Locked</div>
                    <div style={{color:"#555",fontSize:"13px",marginBottom:"24px"}}>Pass the Daily Character Quiz to unlock</div>
                    <button onClick={()=>setCharSubTab("quiz1")}
                      style={{width:"100%",padding:"16px",background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"15px",fontWeight:"900",cursor:"pointer"}}>
                      Take Daily Quiz →
                    </button>
                  </div>
                )}
                {charQuiz1Passed&&(
                  <div>
                    <div style={{fontSize:"52px",marginBottom:"12px"}}>🎯</div>
                    <div style={{color:"#fff",fontSize:"20px",fontWeight:"900",marginBottom:"6px"}}>All Learned Quiz</div>
                    <div style={{color:"#888",fontSize:"13px",marginBottom:"6px"}}>30 questions · All characters up to today</div>
                    <div style={{color:"#555",fontSize:"12px",marginBottom:"12px"}}>Random sample · 2 question types each</div>
                    {charQuiz2Score !== null && (
                      <div style={{background:"#10101c",border:"1px solid "+(charQuiz2Score>=70?"#10b981":"#2a2a3e"),borderRadius:"10px",padding:"10px 16px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <span style={{color:"#555",fontSize:"12px"}}>Best score</span>
                        <span style={{color:charQuiz2Score>=70?"#10b981":"#f59e0b",fontSize:"16px",fontWeight:"900"}}>{charQuiz2Score}%</span>
                      </div>
                    )}
                    <button onClick={()=>setCharQuizPopup("quiz2")}
                      style={{width:"100%",padding:"18px",background:"linear-gradient(135deg,#10b981,#059669)",border:"none",borderRadius:"14px",color:"#fff",fontSize:"16px",fontWeight:"900",cursor:"pointer"}}>
                      Start All Learned Quiz
                    </button>
                    <button onClick={()=>setCharSubTab("study")}
                      style={{marginTop:"12px",width:"100%",padding:"14px",background:"none",border:"1px solid #2a2a3e",borderRadius:"12px",color:"#666",fontSize:"14px",cursor:"pointer"}}>
                      ← Back to Study
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* GAMES TAB */}
        {/* GAMES TAB */}
        {tab==="games"&&!gameActive&&(
          <div>
            <h3 style={{color:"#fff",fontSize:"18px",fontWeight:"900",marginBottom:"16px"}}>Daily Games</h3>

            {/* Category tabs */}
            <div style={{display:"flex",gap:"6px",marginBottom:"20px",overflowX:"auto",paddingBottom:"4px"}}>
              {[
                {id:"characters",label:"Characters",icon:"🔤"},
                {id:"words",label:"Words & Phrases",icon:"💬"},
                {id:"conversational",label:"Conversational",icon:"🗣️"},
                {id:"particles",label:"Particles",icon:"⚛️"},
              ].map(cat=>(
                <button key={cat.id} onClick={()=>setGameCategory(cat.id)}
                  style={{flexShrink:0,padding:"8px 14px",background:gameCategory===cat.id?"#6366f1":"#10101c",border:"1px solid "+(gameCategory===cat.id?"#6366f1":"#2a2a3e"),borderRadius:"20px",color:gameCategory===cat.id?"#fff":"#666",fontSize:"12px",fontWeight:"700",cursor:"pointer",whiteSpace:"nowrap"}}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            {/* Characters category */}
            {gameCategory==="characters"&&(
              <div>
                
                <div style={{background:"#10101c",border:"1px solid #2a2a3e",borderRadius:"14px",padding:"20px",cursor:"pointer",marginBottom:"12px"}} onClick={()=>setGamePicker("audiomatch")}>
                  <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                    <div style={{fontSize:"36px"}}>🔊</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontSize:"16px",fontWeight:"900"}}>Audio Matching</div>
                      <div style={{color:"#888",fontSize:"12px"}}>Hear the sound, match it to the character</div>
                    </div>
                    
                  </div>
                </div>
                <div style={{background:"#10101c",border:"1px solid #2a2a3e",borderRadius:"14px",padding:"20px",cursor:"pointer"}} onClick={()=>setGamePicker("speedmatch")}>
                  <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                    <div style={{fontSize:"36px"}}>⚡</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontSize:"16px",fontWeight:"900"}}>Character Speed Match</div>
                      <div style={{color:"#888",fontSize:"12px"}}>Tap the correct romaji before time runs out</div>
                    </div>
                    
                  </div>
                </div>

                <div style={{background:"#10101c",border:"1px solid #2a2a3e",borderRadius:"14px",padding:"20px",cursor:"pointer",marginTop:"12px"}} onClick={()=>setGameActive("traceit")}>
                  <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                    <div style={{fontSize:"36px"}}>✍️</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontSize:"16px",fontWeight:"900"}}>Trace It</div>
                      <div style={{color:"#888",fontSize:"12px"}}>Draw the character from memory</div>
                    </div>
                  </div>
                </div>

                <div style={{background:"#10101c",border:"1px solid #2a2a3e",borderRadius:"14px",padding:"20px",cursor:"pointer",marginTop:"12px"}} onClick={()=>setGameActive("kanarain")}>
                  <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                    <div style={{fontSize:"36px"}}>🌧️</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontSize:"16px",fontWeight:"900"}}>Kana Rain</div>
                      <div style={{color:"#888",fontSize:"12px"}}>Tap falling characters before they hit the ground</div>
                    </div>
                  </div>
                </div>

                <div style={{background:"#10101c",border:"1px solid #2a2a3e",borderRadius:"14px",padding:"20px",cursor:"pointer",marginTop:"12px"}} onClick={()=>setGameActive("mirrormatch")}>
                  <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                    <div style={{fontSize:"36px"}}>🪞</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontSize:"16px",fontWeight:"900"}}>Mirror Match</div>
                      <div style={{color:"#888",fontSize:"12px"}}>Find the hiragana AND katakana for each sound</div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Words & Phrases games */}
            {gameCategory==="words"&&(
              <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                {[
                  {id:"buildsentence", icon:"🧱", label:"Build a Sentence", desc:"Tap or drag word tiles to form the sentence", live:true},
                  {id:"fillthegap",    icon:"🧩", label:"Fill the Gap",      desc:"Fill 1-2 missing words in the sentence",        live:true},
                  {id:"kanatyper",     icon:"⌨️", label:"Kana Typewriter",  desc:"Spell the word — tile mode or type mode",      live:true},
                  {id:"flashgauntlet", icon:"⚡", label:"Flash Gauntlet",   desc:"Read the flash, pick the meaning in time",     live:true},
                  {id:"dictationdrop", icon:"🎧", label:"Dictation Drop",   desc:"Hear it, type it in Japanese",                   live:true},
                ].map(g=>(
                  <div key={g.id} onClick={()=>g.live&&setGamePicker(g.id)}
                    style={{background:"#0d0d18",border:"1px solid #1e1e30",borderRadius:"16px",padding:"16px",cursor:g.live?"pointer":"default",display:"flex",alignItems:"center",gap:"16px",opacity:g.live?1:0.45}}>
                    <div style={{fontSize:"32px",minWidth:"44px",textAlign:"center"}}>{g.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontSize:"16px",fontWeight:"700",marginBottom:"4px"}}>{g.label}</div>
                      <div style={{color:"#555",fontSize:"13px"}}>{g.desc}</div>
                    </div>
                    {!g.live&&<div style={{color:"#333",fontSize:"12px",fontWeight:"700"}}>🔒</div>}
                  </div>
                ))}
              </div>
            )}
            {/* Coming soon categories */}
            {gameCategory==="conversational"&&(
              <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                {[
                  {id:"scenebuilder",  icon:"🌆", label:"Scene Builder",    desc:"Real Japanese scenes — build the correct phrase",        live:true},
                  {id:"scenarioreply", icon:"💬", label:"Scenario Reply",   desc:"Hear Japanese, pick the meaning, then reply",              live:false},
                  {id:"voiceecho",     icon:"🎤", label:"Voice Echo",       desc:"Listen and repeat — words light up as you speak",        live:false},
                  {id:"phrasescramble",icon:"🧹", label:"Phrase Scramble",  desc:"Unscramble the conversational phrase",                     live:false},
                  {id:"convflow",      icon:"🔀", label:"Conversation Flow",desc:"Branching dialogue — your choices change the outcome", live:true},
                ].map(g=>(
                  <div key={g.id} onClick={()=>g.live&&(g.id==="convflow"?setGameActive("convflow"):setGamePicker(g.id))}
                    style={{background:"#0d0d18",border:"1px solid #1e1e30",borderRadius:"16px",padding:"16px",cursor:g.live?"pointer":"default",display:"flex",alignItems:"center",gap:"16px",opacity:g.live?1:0.45}}>
                    <div style={{fontSize:"32px",minWidth:"44px",textAlign:"center"}}>{g.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontSize:"16px",fontWeight:"700",marginBottom:"4px"}}>{g.label}</div>
                      <div style={{color:"#555",fontSize:"13px"}}>{g.desc}</div>
                    </div>
                    {!g.live&&<div style={{color:"#333",fontSize:"12px"}}>🔒</div>}
                  </div>
                ))}
              </div>
            )}
            {gameCategory==="particles"&&(
              <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                {[
                  {id:"filltheparticle", icon:"⛛️",  label:"Fill the Particle",  desc:"Sentence with a blank — tap the correct particle",           live:true},
                  {id:"particlespeed",   icon:"⚡",   label:"Particle Speed",    desc:"Tap the correct particle before the timer runs out",       live:true},
                  {id:"particlechain",   icon:"🔗",   label:"Particle Chain",    desc:"Spot all sentences that correctly use the particle",      live:true},
                  {id:"contextchallenge",icon:"🌐",  label:"Context Challenge", desc:"English situation — pick the correct particle",           live:true},
                  {id:"particlesort",    icon:"🗂️",  label:"Particle Sort",     desc:"Sort sentences into the correct particle buckets",       live:true},
                ].map(g=>(
                  <div key={g.id} onClick={()=>g.live&&setGamePicker(g.id)}
                    style={{background:"#0d0d18",border:"1px solid #1e1e30",borderRadius:"16px",padding:"16px",cursor:g.live?"pointer":"default",display:"flex",alignItems:"center",gap:"16px",opacity:g.live?1:0.45}}>
                    <div style={{fontSize:"32px",minWidth:"44px",textAlign:"center"}}>{g.icon}</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#fff",fontSize:"16px",fontWeight:"700",marginBottom:"4px"}}>{g.label}</div>
                      <div style={{color:"#555",fontSize:"13px"}}>{g.desc}</div>
                    </div>
                    {!g.live&&<div style={{color:"#333",fontSize:"12px"}}>🔒</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab==="games"&&gameActive==="particlespeed"&&(
          <ParticleSpeed currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="filltheparticle"&&(
          <FillTheParticle currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="particlesort"&&(
          <ParticleSort currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="contextchallenge"&&(
          <ContextChallenge currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="particlechain"&&(
          <ParticleChain currentDay={dayData.day} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="convflow"&&(
          <ConversationFlow onBack={()=>setGameActive(false)} onXPEarned={onXPEarned} currentDay={dayData.day}/>
        )}
        {tab==="games"&&gameActive==="scenebuilder"&&(
          <SceneBuilder onBack={()=>setGameActive(false)} onXPEarned={onXPEarned} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity}/>
        )}
        {tab==="games"&&gameActive==="audiomatch"&&(
          audioMatchChars.length < 4
            ? <div style={{textAlign:"center",padding:"40px",color:"#888"}}>Not enough characters — complete more days first.</div>
            : <AudioMatchGame chars={audioMatchChars} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onXPEarned={onXPEarned} onBack={()=>setGameActive(false)}/>
        )}

        

        {tab==="games"&&gameActive==="speedmatch"&&(
          new Set(gameCharsTyped.map(c=>c.romaji)).size < 4
            ? <div style={{textAlign:"center",padding:"40px",color:"#888"}}>Not enough characters yet — complete more days to unlock Speed Match.</div>
            : <CharacterSpeedMatch chars={gameCharsTyped} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onXPEarned={onXPEarned} onBack={()=>setGameActive(false)}/>
        )}

        {tab==="games"&&gameActive==="traceit"&&(
          gameCharsTyped.length < 2
            ? <div style={{textAlign:"center",padding:"40px",color:"#888"}}>Not enough characters yet — complete more days.</div>
            : <TraceIt chars={gameCharsTyped} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}

        {tab==="games"&&gameActive==="kanarain"&&(
          gameCharsTyped.length < 4
            ? <div style={{textAlign:"center",padding:"40px",color:"#888"}}>Not enough characters yet — complete more days.</div>
            : <KanaRain chars={gameCharsTyped} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}

        {tab==="games"&&gameActive==="phraseaudio"&&(
          <PhraseAudioMatch phrases={gamePhrases} currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="dictationdrop"&&(
          <DictationDrop phrases={gamePhrases} currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="flashgauntlet"&&(
          <FlashGauntlet phrases={gamePhrases} currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} romajiOn={gameRomajiOn} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="kanatyper"&&(
          <KanaTypewriter phrases={gamePhrases} currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="fillthegap"&&(
          <FillTheGap currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="buildsentence"&&(
          <BuildSentence currentDay={dayData.day} totalRounds={gameRounds===Infinity?9999:gameRounds} endless={gameRounds===Infinity} onBack={()=>setGameActive(false)} onXPEarned={onXPEarned}/>
        )}
        {tab==="games"&&gameActive==="mirrormatch"&&(
          mirrorPairs.length < 4 || gameKataChars.length < 4
            ? <div style={{textAlign:"center",padding:"40px",color:"#888"}}>Need at least 4 matched pairs — complete more days.</div>
            : <MirrorMatch hiraChars={gameHiraChars} kataChars={gameKataChars} onXPEarned={onXPEarned} onBack={()=>setGameActive(false)}/>
        )}

        {tab==="particles"&&!particleQuizActive&&(
          <ParticlesTab currentDay={dayData.day} onQuiz={(mode)=>setParticleQuizActive(mode)} />
        )}

        {tab==="quiz"&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>📝</div>
            <h2 style={{color:"#fff",fontSize:"22px",fontWeight:"700",marginBottom:"8px"}}>Day {dayData.day} Quiz</h2>
            <p style={{color:"#888",fontSize:"14px",marginBottom:"8px"}}>30 questions · 90% required to unlock next day</p>
            {progress.dayScores[dayData.day]&&(
              <div style={{background:"#10101c",border:"1px solid #1e1e30",borderRadius:"12px",padding:"12px 20px",marginBottom:"16px"}}>
                <div style={{color:"#10b981",fontSize:"13px"}}>Last score: <strong>{Math.round(progress.dayScores[dayData.day])}%</strong></div>
              </div>
            )}
            <button onClick={()=>setQuizMode(true)} style={{width:"100%",maxWidth:"300px",padding:"16px",background:"linear-gradient(135deg,#6366f1,#4f46e5)",border:"none",borderRadius:"12px",color:"#fff",fontSize:"16px",fontWeight:"700",cursor:"pointer"}}>
              {progress.dayScores[dayData.day]?"Retake Quiz":"Start Quiz"}
            </button>
          </div>
        )}
      </div>


      {/* ── CHARACTER QUIZ POPUP ── */}
      {charQuizPopup && (
        <div onClick={()=>setCharQuizPopup(null)}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div onClick={e=>e.stopPropagation()}
            style={{background:'#10101c',borderRadius:'20px',padding:'28px 24px 32px',width:'90%',maxWidth:'400px',border:'1px solid #2a2a3e'}}>
            <div style={{color:'#fff',fontSize:'20px',fontWeight:'900',marginBottom:'4px'}}>
              {charQuizPopup==='quiz1' ? '📝 Daily Character Quiz' : '🎯 All Learned Quiz'}
            </div>
            <div style={{color:'#555',fontSize:'13px',marginBottom:'24px'}}>
              {charQuizPopup==='quiz1' ? "Today's characters" : "All characters up to today"}
            </div>

            <div style={{color:'#555',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'10px'}}>SCRIPT</div>
            <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
              {[['hiragana','Hiragana'],['katakana','Katakana'],['mix','Mix']].map(([val,label])=>(
                <button key={val} onClick={()=>setCharQuizScript(val)}
                  style={{flex:1,padding:'12px 8px',background:charQuizScript===val?'#6366f1':'#0a0a14',
                    border:'1px solid '+(charQuizScript===val?'#6366f1':'#2a2a3e'),borderRadius:'12px',
                    color:charQuizScript===val?'#fff':'#888',fontSize:'13px',fontWeight:'700',cursor:'pointer',transition:'all 0.15s'}}>
                  {label}
                </button>
              ))}
            </div>

            <div style={{color:'#555',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'10px'}}>QUESTIONS</div>
            <div style={{display:'flex',gap:'8px',marginBottom:'28px'}}>
              {[[10,'10'],[20,'20'],[30,'30']].map(([val,label])=>(
                <button key={label} onClick={()=>setCharQuizCount(val)}
                  style={{flex:1,padding:'12px',background:charQuizCount===val?'#6366f1':'#0a0a14',
                    border:'1px solid '+(charQuizCount===val?'#6366f1':'#2a2a3e'),borderRadius:'12px',
                    color:charQuizCount===val?'#fff':'#888',fontSize:'16px',fontWeight:'900',cursor:'pointer',transition:'all 0.15s'}}>
                  {label}
                </button>
              ))}
            </div>

            <button onClick={()=>{ setCharQuizActive(charQuizPopup); setCharQuizPopup(null); }}
              style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',
                border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
              Start Quiz →
            </button>
          </div>
        </div>
      )}

      {/* ── ROUND PICKER BOTTOM SHEET ── */}
      {gamePicker && (
        <div onClick={()=>setGamePicker(null)}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.7)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div onClick={e=>e.stopPropagation()}
            style={{background:'#10101c',borderRadius:'20px',padding:'28px 24px 32px',width:'90%',maxWidth:'400px',border:'1px solid #2a2a3e'}}>
            <div style={{color:'#fff',fontSize:'20px',fontWeight:'900',marginBottom:'4px'}}>
              {gamePicker==='audiomatch'?'🔊 Audio Matching':gamePicker==='speedmatch'?'⚡ Character Speed Match':gamePicker==='phraseaudio'?'🔊 Phrase Audio Match':gamePicker==='flashtranslate'?'⚡ Flash Translate':gamePicker==='wordbuilder'?'🔨 Word Builder':gamePicker==='phrasecomplete'?'🧩 Phrase Complete':gamePicker==='particlespeed'?'⚡ Particle Speed':gamePicker==='filltheparticle'?'⛛️ Fill the Particle':gamePicker==='particlesort'?'🗂️ Particle Sort':gamePicker==='contextchallenge'?'🌐 Context Challenge':gamePicker==='particlechain'?'🔗 Particle Chain':gamePicker==='particlespeed'?'⚡ Particle Speed':gamePicker==='filltheparticle'?'⛛️ Fill the Particle':gamePicker==='scenebuilder'?'🌆 Scene Builder':gamePicker==='scenebuilder'?'🌆 Scene Builder':gamePicker==='dictationdrop'?'🎧 Dictation Drop':gamePicker==='flashgauntlet'?'⚡ Flash Gauntlet':gamePicker==='kanatyper'?'⌨️ Kana Typewriter':gamePicker==='fillthegap'?'🧩 Fill the Gap':gamePicker==='buildsentence'?'🧱 Build a Sentence':'🏎️ Vocab Speed Round'}
            </div>
            <div style={{color:'#555',fontSize:'13px',marginBottom:'24px'}}>
              {gamePicker==='audiomatch'?'10 pairs per round':gamePicker==='speedmatch'?'Timed — beat the clock':gamePicker==='phraseaudio'?'4 pairs per round — match phrase to meaning':gamePicker==='flashtranslate'?'See Japanese, type the English':gamePicker==='wordbuilder'?'Given English, type the romaji':gamePicker==='phrasecomplete'?'Fill in the missing word':gamePicker==='particlespeed'?'Tap the correct particle before the timer runs out':gamePicker==='filltheparticle'?'Tap the correct particle to complete the sentence':gamePicker==='particlesort'?'Sort each sentence into the correct particle bucket':gamePicker==='contextchallenge'?'Read the situation in English — pick the right particle':gamePicker==='particlechain'?'Tap all sentences that correctly use the particle':gamePicker==='particlespeed'?'Tap the correct particle before the timer runs out':gamePicker==='filltheparticle'?'Tap the correct particle to complete the sentence':gamePicker==='scenebuilder'?'Real scenes — build the correct Japanese phrase':gamePicker==='scenebuilder'?'Real scenes — build the correct Japanese phrase':gamePicker==='dictationdrop'?'Listen · type what you heard in Japanese':gamePicker==='flashgauntlet'?'Read the flash · pick the meaning · 10 seconds':gamePicker==='kanatyper'?'Tile mode Days 1-10 · type mode Days 11+':gamePicker==='fillthegap'?'Fill in the missing word or words':gamePicker==='buildsentence'?'Tap or drag word tiles to build the sentence':'Rapid fire — race the clock'}
            </div>
            <div style={{color:'#555',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'10px'}}>HOW MANY ROUNDS?</div>
            <div style={{display:'flex',gap:'8px',marginBottom:'28px'}}>
              {[[1,'1'],[3,'3'],[5,'5'],[Infinity,'∞']].map(([val,label])=>(
                <button key={label} onClick={()=>setGameRounds(val)}
                  style={{flex:1,padding:'14px',background:gameRounds===val?'#6366f1':'#0a0a14',
                    border:'1px solid '+(gameRounds===val?'#6366f1':'#2a2a3e'),borderRadius:'12px',
                    color:gameRounds===val?'#fff':'#888',fontSize:'18px',fontWeight:'900',cursor:'pointer',
                    transition:'all 0.15s'}}>
                  {label}
                </button>
              ))}
            </div>
            {gamePicker==='flashgauntlet'&&(
              <div style={{marginBottom:'20px'}}>
                <div style={{color:'#555',fontSize:'10px',fontWeight:'700',letterSpacing:'1px',marginBottom:'10px'}}>ROMAJI ON OPTIONS?</div>
                <button onClick={()=>setGameRomajiOn(r=>!r)}
                  style={{width:'100%',padding:'12px',
                    background:gameRomajiOn?'#6366f133':'#0a0a14',
                    border:'1px solid '+(gameRomajiOn?'#6366f1':'#2a2a3e'),
                    borderRadius:'12px',color:gameRomajiOn?'#a5b4fc':'#555',
                    fontSize:'14px',fontWeight:'700',cursor:'pointer',transition:'all 0.15s'}}>
                  {gameRomajiOn ? '✓ Romaji on — show reading on each option' : 'Romaji off — reading hidden'}
                </button>
              </div>
            )}
            <button onClick={()=>{ setGameActive(gamePicker); setGamePicker(null); }}
              style={{width:'100%',padding:'18px',background:'linear-gradient(135deg,#6366f1,#4f46e5)',
                border:'none',borderRadius:'14px',color:'#fff',fontSize:'17px',fontWeight:'900',cursor:'pointer'}}>
              Start {gameRounds===Infinity ? '∞' : gameRounds} {gameRounds===1?'Round':'Rounds'} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// WEEK GROUP — collapsible band of 5 weeks
// ═══════════════════════════════════════════

const UNIT_COLORS = ["#6366f1","#10b981","#f59e0b","#ec4899","#a855f7"];

function WeekGroup({ groupLabel, startW, endW, groupIdx, groupUnlocked, currentWeekIdx, devMode, progress, isDayUnlocked, isTest1Unlocked, isTest2Unlocked, test1Score, test2Score, test1Save, test2Save, onDayClick, onTestClick, onTestRestart }) {
  const [open, setOpen] = useState(groupIdx === Math.floor(currentWeekIdx / 5));
  const unitColor = UNIT_COLORS[groupIdx % UNIT_COLORS.length];
  const allBandWeeks = [];
  for (let wn = startW; wn <= endW; wn++) {
    const data = WEEKS.find(w => w.weekNum === wn);
    allBandWeeks.push(data || { weekNum: wn, days: [], _placeholder: true });
  }
  const groupHasCurrent = currentWeekIdx + 1 >= startW && currentWeekIdx + 1 <= endW;
  const totalSteps = (endW - startW + 1) * 5;
  const completedSteps = allBandWeeks.reduce((acc, w) => w._placeholder ? acc : acc + (w.days||[]).filter(d => progress.completedDays.includes(d.day)).length, 0);
  const unitPct = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
  const unitDone = unitPct >= 100;

  return (
    <div style={{marginBottom:"10px",border:`1px solid ${groupUnlocked?(groupHasCurrent?unitColor+"44":"#1e1e30"):"#0f0f1a"}`,borderRadius:"16px",overflow:"hidden"}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",background:groupHasCurrent?`${unitColor}11`:groupUnlocked?"#0a0a12":"#08080f",border:"none",padding:"14px 18px 12px",display:"flex",flexDirection:"column",gap:"8px",cursor:"pointer",textAlign:"left"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <div style={{width:"28px",height:"28px",borderRadius:"8px",background:groupUnlocked?unitColor+"22":"#1a1a2e",border:`1px solid ${groupUnlocked?unitColor+"44":"#2a2a3e"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"700",color:groupUnlocked?unitColor:"#555",flexShrink:0}}>
              {!groupUnlocked&&!devMode?"🔒":unitDone?"✓":open?"▾":"▸"}
            </div>
            <div>
              <div style={{color:groupUnlocked?unitColor:"#333",fontSize:"11px",fontWeight:"700",letterSpacing:"1px"}}>{groupLabel.replace("WEEKS","UNITS")}</div>
              {groupHasCurrent&&<span style={{color:"#fff",fontSize:"9px",fontWeight:"700",background:unitColor+"33",padding:"1px 6px",borderRadius:"8px"}}>ACTIVE</span>}
              {unitDone&&<span style={{color:"#10b981",fontSize:"9px",fontWeight:"700",background:"#0a2a1a",padding:"1px 6px",borderRadius:"8px",marginLeft:"4px"}}>COMPLETE ✓</span>}
            </div>
          </div>
          {groupUnlocked&&<span style={{color:unitColor,fontSize:"12px",fontWeight:"700"}}>{unitPct}%</span>}
        </div>
        {groupUnlocked&&<div style={{width:"100%",height:"4px",background:"#1e1e30",borderRadius:"2px"}}><div style={{height:"100%",width:`${unitPct}%`,background:unitColor,borderRadius:"2px",transition:"width 0.6s ease"}}/></div>}
      </button>
      {open&&(
        <div style={{padding:"8px 10px 12px",background:"#06060f",display:"flex",flexDirection:"column",gap:"6px"}}>
          {allBandWeeks.map((w)=>{
            const wIdx=w.weekNum-1,isCurrent=wIdx===currentWeekIdx,isPast=wIdx<currentWeekIdx,isFuture=wIdx>currentWeekIdx,weekUnlocked=devMode||!isFuture,wk=`w${wIdx}`;
            return (<WeekSection key={w.weekNum} w={w} wIdx={wIdx} isCurrent={isCurrent} isPast={isPast} isFuture={isFuture} unlocked={weekUnlocked} devMode={devMode} progress={progress} isDayUnlocked={isDayUnlocked} isTest1Unlocked={isCurrent?isTest1Unlocked:(devMode||isPast)} isTest2Unlocked={isCurrent?isTest2Unlocked:(devMode||isPast)} test1Score={isCurrent?test1Score:(progress.testScores?.[wk]?.t1??null)} test2Score={isCurrent?test2Score:(progress.testScores?.[wk]?.t2??null)} test1Save={isCurrent?test1Save:null} test2Save={isCurrent?test2Save:null} unitColor={UNIT_COLORS[Math.floor((w.weekNum-1)/5)%UNIT_COLORS.length]} onDayClick={(d)=>onDayClick(d,w.days)} onTestClick={onTestClick} onTestRestart={onTestRestart}/>);
          })}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════
// WEEK SECTION — collapsible, decorated
// ═══════════════════════════════════════════
function WeekSection({ w, wIdx, isCurrent, isPast, isFuture, unlocked, devMode, progress, isDayUnlocked, isTest1Unlocked, isTest2Unlocked, test1Score, test2Score, test1Save, test2Save, unitColor, onDayClick, onTestClick, onTestRestart }) {
  const [open, setOpen] = useState(isCurrent);
  const wDays = w.days||[], isPlaceholder = w._placeholder||wDays.length===0;
  const weekDaysDone = wDays.filter(d=>progress.completedDays.includes(d.day)).length;
  const weekPct = wDays.length>0?Math.round((weekDaysDone/wDays.length)*100):0;
  const weekColor = isPast?"#10b981":isCurrent?unitColor:"#444";
  const activeDayNum = wDays.find(d=>!progress.completedDays.includes(d.day)&&(devMode||isDayUnlocked(d.day)))?.day;

  return (
    <div style={{marginBottom:"6px",border:`1px solid ${isCurrent?unitColor+"44":isPast?"#10b98133":unlocked?"#1e1e30":"#111118"}`,borderRadius:"12px",overflow:"hidden",opacity:unlocked?1:0.5}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:"100%",background:isCurrent?`${unitColor}11`:isPast?"#0a1a0a":unlocked?"#0a0a12":"#08080f",border:"none",padding:"12px 14px 10px",display:"flex",flexDirection:"column",gap:"7px",cursor:"pointer",textAlign:"left"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <span style={{color:isPast?"#10b981":isCurrent?unitColor:unlocked?"#aaa":"#333",fontSize:"13px",fontWeight:"800"}}>
              {isPast?"✓ ":(!unlocked&&!devMode)?"🔒 ":open?"▾ ":"▸ "}UNIT {w.weekNum}
            </span>
            {isPast&&<span style={{background:"#0a2a1a",color:"#10b981",fontSize:"10px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px"}}>COMPLETE</span>}
            {isCurrent&&<span style={{background:unitColor+"22",color:unitColor,fontSize:"10px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px"}}>ACTIVE</span>}
            {isPlaceholder&&<span style={{color:"#333",fontSize:"10px"}}>Coming soon</span>}
          </div>
          {!isPlaceholder&&unlocked&&<span style={{color:weekColor,fontSize:"11px",fontWeight:"700"}}>{weekPct}%</span>}
        </div>
        {!isPlaceholder&&unlocked&&<div style={{width:"100%",height:"3px",background:"#1e1e30",borderRadius:"2px"}}><div style={{height:"100%",width:`${weekPct}%`,background:weekColor,borderRadius:"2px",transition:"width 0.5s ease"}}/></div>}
      </button>
      {open&&(
        <div style={{padding:"12px 14px 14px",background:"#06060f"}}>
          {isPlaceholder?(<div style={{textAlign:"center",padding:"16px",color:"#333",fontSize:"13px"}}>🗓 Content coming in a future update</div>):(
            <>
              <div style={{position:"relative",paddingLeft:"32px",marginBottom:"10px"}}>
                <div style={{position:"absolute",left:"9px",top:"14px",bottom:"14px",width:"2px",background:"#1e1e30",borderRadius:"1px"}}>
                  <div style={{width:"100%",height:`${weekPct}%`,background:weekColor,borderRadius:"1px",transition:"height 0.5s"}}/>
                </div>
                {wDays.map((d,i)=>{
                  const dayUnlocked=devMode||isPast||isDayUnlocked(d.day),done=progress.completedDays.includes(d.day),score=progress.dayScores[d.day],isActive=d.day===activeDayNum;
                  return (
                    <div key={d.day} style={{position:"relative",marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}}>
                      <div style={{position:"absolute",left:"-24px",width:"22px",height:"22px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:"10px",fontWeight:"700",background:done?weekColor:isActive?"#06060f":"#0d0d1a",border:done?"none":isActive?`2.5px solid ${unitColor}`:"1.5px solid #2a2a3e",boxShadow:isActive?`0 0 0 4px ${unitColor}22`:"none",color:done?"#fff":"#555",opacity:dayUnlocked?1:0.4}}>
                        {done?"✓":isActive?"●":""}
                      </div>
                      <button onClick={()=>dayUnlocked&&onDayClick(d)} style={{flex:1,background:done?"#0a1a0a":isActive?`${unitColor}11`:"#10101c",border:`1px solid ${done?weekColor+"66":isActive?unitColor:"#1e1e30"}`,borderRadius:"10px",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:dayUnlocked?"pointer":"default",opacity:dayUnlocked?1:0.35,textAlign:"left"}}>
                        <div>
                          <div style={{color:"#555",fontSize:"9px",fontWeight:"700",letterSpacing:"0.5px"}}>LESSON {d.day}</div>
                          <div style={{color:done?"#10b981":isActive?"#fff":"#888",fontSize:"13px",fontWeight:"600",marginTop:"1px"}}>{!dayUnlocked?"Locked":done?`Completed ${Math.round(score)}%`:isActive?"In progress":"Not started"}</div>
                        </div>
                        <div style={{fontSize:"13px"}}>{!dayUnlocked?"🔒":done?"✅":isActive?"▶":""}</div>
                      </button>
                    </div>
                  );
                })}
                <div style={{position:"relative",display:"flex",gap:"8px",marginTop:"4px"}}>
                  <div style={{position:"absolute",left:"-24px",top:"50%",transform:"translateY(-50%)",width:"22px",height:"22px",borderRadius:"50%",background:(isTest1Unlocked||devMode)?"#f59e0b22":"#0d0d1a",border:`1.5px solid ${(isTest1Unlocked||devMode)?"#f59e0b":"#2a2a3e"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px"}}>
                    {(isTest1Unlocked||devMode)?"🏆":""}
                  </div>
                  {[{num:1,unlocked:isTest1Unlocked,score:test1Score,desc:"Complete all lessons",save:test1Save},{num:2,unlocked:isTest2Unlocked,score:test2Score,desc:"85%+ on Test 1",save:test2Save}].map(t=>(
                    <div key={t.num} style={{flex:1}}>
                      {t.save&&t.unlocked&&(<div style={{background:"#0a1a0a",border:"1px solid #10b981",borderRadius:"8px",padding:"8px",marginBottom:"6px",textAlign:"center"}}><div style={{color:"#10b981",fontSize:"10px",fontWeight:"700",marginBottom:"4px"}}>💾 Q{t.save.cur+1}/75</div><div style={{display:"flex",gap:"4px"}}><button onClick={()=>onTestClick(t.num,t.save)} style={{flex:1,padding:"5px",background:"#10b981",border:"none",borderRadius:"5px",color:"#000",fontSize:"10px",fontWeight:"700",cursor:"pointer"}}>Resume</button><button onClick={()=>onTestRestart(t.num)} style={{flex:1,padding:"5px",background:"#1a1a2e",border:"1px solid #2a2a3e",borderRadius:"5px",color:"#666",fontSize:"10px",fontWeight:"700",cursor:"pointer"}}>Restart</button></div></div>)}
                      <button onClick={()=>t.unlocked&&!t.save&&onTestClick(t.num,null)} style={{width:"100%",background:t.unlocked?"#1a1100":"#08080f",border:`1px solid ${t.unlocked?"#f59e0b44":"#1a1a2a"}`,borderRadius:"10px",padding:"10px",textAlign:"center",cursor:t.unlocked&&!t.save?"pointer":"default",opacity:t.unlocked?1:0.4}}>
                        <div style={{color:t.unlocked?"#f59e0b":"#333",fontWeight:"700",fontSize:"12px",marginBottom:"2px"}}>{t.unlocked?"🏆 ":""}Test {t.num}</div>
                        <div style={{color:t.unlocked?"#f59e0b99":"#333",fontSize:"11px"}}>{t.unlocked?t.score?`Best: ${t.score}%`:"Ready →":"🔒 "+t.desc}</div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}



// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("home"); // home | day | test | roadmap | settings
  const [activeDay, setActiveDay] = useState(null);
  const [activeDayAllDays, setActiveDayAllDays] = useState(null);
  const [activeTest, setActiveTest] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress());
  const [testSave, setTestSave] = useState(() => { try { return JSON.parse(localStorage.getItem(STORAGE.test1Save)); } catch { return null; } });
  const [devMode, setDevMode] = useState(() => localStorage.getItem("nihongo_dev") === "true");
  const [showDevPin, setShowDevPin] = useState(false);
  const [pinInput, setPinInput] = useState("");

  const currentWeekIdx = Math.min(progress.currentWeek || 0, WEEKS.length - 1);
  const week = WEEKS[currentWeekIdx];
  const days = week.days;

  const updateProgress = (updates) => {
    const next = { ...progress, ...updates };
    setProgress(next);
    saveProgress(next);
  };

  const handleQuizComplete = (dayNum, pct, bestStreak, quizResults) => {
    const newScores = { ...progress.dayScores, [dayNum]: Math.round(pct) };
    const newCompleted = pct >= 90
      ? [...new Set([...progress.completedDays, dayNum])]
      : progress.completedDays;
    const newCatStats = quizResults ? mergeCategoryStats(progress.categoryStats || {}, quizResults) : (progress.categoryStats || {});
    const xpEarned = calcXP(Math.round(pct * 30 / 100), 30, bestStreak || 0, 90);
    updateProgress({ dayScores: newScores, completedDays: newCompleted, totalXP: (progress.totalXP || 0) + xpEarned, categoryStats: newCatStats });
  };

  const isDayUnlocked = (dayNum) => {
    if (devMode) return true;
    const firstDay = days[0].day;
    if (dayNum === firstDay) return true;
    return progress.completedDays.includes(dayNum - 1);
  };

  const currentWeekDays = days.map(d => d.day);
  const currentWeekComplete = devMode || currentWeekDays.every(d => progress.completedDays.includes(d));

  // Test scores stored per week: { "w0": { t1: 95, t2: 96 }, "w1": { t1: 88 } }
  const wk = `w${currentWeekIdx}`;
  const test1Score = devMode ? 100 : (progress.testScores?.[wk]?.t1 ?? null);
  const test2Score = devMode ? 100 : (progress.testScores?.[wk]?.t2 ?? null);
  const isTest1Unlocked = devMode || currentWeekComplete;
  const isTest2Unlocked = devMode || (test1Score !== null && test1Score >= 85);
  const isWeekComplete = devMode || (currentWeekComplete && isTest2Unlocked);
  const canAdvanceWeek = isWeekComplete && currentWeekIdx < WEEKS.length - 1;

  const bestScore = Object.values(progress.dayScores).length
    ? Math.max(...Object.values(progress.dayScores))
    : null;

  const [test1Questions] = useState(() => buildTest(1, 75));
  const [test2Questions] = useState(() => buildTest(2, 75));
  const [test1Save] = useState(() => loadTestSave(1));
  const [test2Save] = useState(() => loadTestSave(2));
  const [resumingTest, setResumingTest] = useState(null);

  // ── TEST SCREEN ──
  if (screen === "test") {
    const testQuestions = activeTest === 2 ? test2Questions : test1Questions;
    return (
      <QuizEngine
        questions={testQuestions}
        passPercent={85}
        title={`Test ${activeTest} — 75 Questions`}
        testNum={activeTest}
        initialState={resumingTest}
        onComplete={(pct) => {
          const rounded = Math.round(pct);
          const testScores = { ...progress.testScores };
          if (!testScores[wk]) testScores[wk] = {};
          testScores[wk][`t${activeTest}`] = rounded;
          const testXP = calcXP(Math.round(rounded * 75 / 100), 75, 0, 85);
          updateProgress({ testScores, totalXP: (progress.totalXP || 0) + testXP });
          setScreen("home");
          setResumingTest(null);
        }}
        onBack={() => { setScreen("home"); setActiveTest(null); setResumingTest(null); }}
      />
    );
  }

  const allDaysAllWeeks = WEEKS.flatMap(w => w.days);

  // ── DAY SCREEN ──
  if (screen === "day" && activeDay) {
    return (
      <DayScreen
        dayData={activeDay}
        allDays={allDaysAllWeeks}
        progress={progress}
        onQuizComplete={handleQuizComplete}
        onXPEarned={(xp) => updateProgress({ totalXP: (progress.totalXP || 0) + xp })}
        onBack={() => { setActiveDay(null); setActiveDayAllDays(null); setScreen("home"); }}
      />
    );
  }

  const goToDay = (d, allDays) => {
    setActiveDay(d);
    setActiveDayAllDays(allDays);
    setScreen("day");
  };

  // ── SETTINGS SCREEN ──
  if (screen === "settings") {
    return (
      <div style={{minHeight:"100vh",background:"#06060f",fontFamily:"system-ui,sans-serif",padding:"0 0 48px"}}>
        <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:"12px",borderBottom:"0.5px solid #1e1e30",marginBottom:"20px"}}>
          <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",fontSize:"14px",fontWeight:"700",padding:0}}>← Back</button>
          <div style={{color:"#fff",fontSize:"17px",fontWeight:"700",flex:1}}>Settings</div>
          <span style={{color:"#333",fontSize:"11px"}}>{APP_VERSION}</span>
        </div>
        <div style={{padding:"0 20px",display:"flex",flexDirection:"column",gap:"10px"}}>
          <div style={{background:"#10101c",border:"0.5px solid #2a2a3e",borderRadius:"16px",padding:"16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
              <div style={{width:"44px",height:"44px",background:"#4f46e5",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"16px",fontWeight:"700"}}>VL</div>
              <div>
                <div style={{color:"#fff",fontSize:"15px",fontWeight:"500"}}>VocaLingo</div>
                <div style={{color:"#555",fontSize:"11px"}}>{APP_VERSION} — Japanese</div>
              </div>
            </div>
          </div>
          <div style={{background:"#10101c",border:"0.5px solid #2a2a3e",borderRadius:"16px",padding:"16px"}}>
            <div style={{color:"#555",fontSize:"11px",fontWeight:"700",letterSpacing:"1px",marginBottom:"12px"}}>PROGRESS</div>
            {[{label:"Days completed",val:progress.completedDays.length},{label:"Total XP",val:(progress.totalXP||0).toLocaleString()},{label:"Current week",val:currentWeekIdx+1}].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderTop:i>0?"0.5px solid #1e1e30":"none"}}>
                <div style={{color:"#888",fontSize:"13px"}}>{r.label}</div>
                <div style={{color:"#fff",fontSize:"13px",fontWeight:"500"}}>{r.val}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#10101c",border:"0.5px solid #2a2a3e",borderRadius:"16px",padding:"16px"}}>
            <div style={{color:"#555",fontSize:"11px",fontWeight:"700",letterSpacing:"1px",marginBottom:"12px"}}>DEVELOPER</div>
            {devMode?(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{color:"#f97316",fontSize:"13px",fontWeight:"500"}}>Dev mode active</div><div style={{color:"#555",fontSize:"11px"}}>All days and tests unlocked</div></div>
                <button onClick={()=>{setDevMode(false);localStorage.removeItem("nihongo_dev");setScreen("home");}} style={{padding:"8px 14px",background:"#1a1a2e",border:"1px solid #f97316",borderRadius:"10px",color:"#f97316",fontSize:"12px",fontWeight:"700",cursor:"pointer"}}>Exit</button>
              </div>
            ):(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{color:"#fff",fontSize:"13px",fontWeight:"500"}}>Dev mode</div><div style={{color:"#555",fontSize:"11px"}}>Enter PIN to unlock</div></div>
                <button onClick={()=>setShowDevPin(true)} style={{padding:"8px 14px",background:"#1a1a2e",border:"0.5px solid #2a2a3e",borderRadius:"10px",color:"#888",fontSize:"12px",fontWeight:"700",cursor:"pointer"}}>Unlock</button>
              </div>
            )}
          </div>
          <div style={{background:"#10101c",border:"0.5px solid #2a2a3e",borderRadius:"16px",padding:"16px"}}>
            <div style={{color:"#555",fontSize:"11px",fontWeight:"700",letterSpacing:"1px",marginBottom:"12px"}}>DATA</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{color:"#fff",fontSize:"13px",fontWeight:"500"}}>Reset progress</div><div style={{color:"#555",fontSize:"11px"}}>Clears all XP, scores, and days</div></div>
              <button onClick={()=>{if(window.confirm("Reset all progress? Cannot be undone.")){localStorage.clear();window.location.reload();}}} style={{padding:"8px 14px",background:"#1a0a0a",border:"1px solid #ef444488",borderRadius:"10px",color:"#ef4444",fontSize:"12px",fontWeight:"700",cursor:"pointer"}}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ROADMAP SCREEN ──
  if (screen === "roadmap") {
    return (
      <div style={{minHeight:"100vh",background:"#06060f",fontFamily:"system-ui,sans-serif",padding:"0 0 48px"}}>
        <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:"12px",borderBottom:"0.5px solid #1e1e30",marginBottom:"20px"}}>
          <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#aaa",cursor:"pointer",fontSize:"14px",fontWeight:"700",padding:0}}>← Back</button>
          <div style={{color:"#fff",fontSize:"17px",fontWeight:"700",flex:1}}>Course Map</div>
          <div style={{color:"#555",fontSize:"12px"}}>🇯🇵 Japanese</div>
        </div>
        <div style={{display:"flex",gap:"8px",marginBottom:"16px",padding:"0 20px"}}>
          {[{val:progress.completedDays.length,label:"lessons done",color:"#6366f1"},{val:Math.floor(progress.completedDays.length/5),label:"units done",color:"#10b981"},{val:progress.streak||1,label:"day streak",color:"#f59e0b"}].map((s,i)=>(
            <div key={i} style={{flex:1,background:"#10101c",border:"0.5px solid #2a2a3e",borderRadius:"12px",padding:"10px 8px",textAlign:"center"}}>
              <div style={{color:s.color,fontSize:"16px",fontWeight:"700"}}>{s.val}</div>
              <div style={{color:"#555",fontSize:"9px",marginTop:"2px"}}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{padding:"0 20px"}}>
          {(()=>{
            const G=15,gs=[];
            for(let g=0;g*5<G;g++){const s=g*5+1;gs.push({startW:s,endW:Math.min(s+4,G),groupIdx:g});}
            return gs.map(({startW,endW,groupIdx})=>(
              <WeekGroup key={groupIdx} groupLabel={`WEEKS ${startW}–${endW}`}
                startW={startW} endW={endW} groupIdx={groupIdx}
                groupUnlocked={devMode||currentWeekIdx+1>=startW}
                currentWeekIdx={currentWeekIdx} devMode={devMode} progress={progress}
                isDayUnlocked={isDayUnlocked} isTest1Unlocked={isTest1Unlocked} isTest2Unlocked={isTest2Unlocked}
                test1Score={test1Score} test2Score={test2Score} test1Save={test1Save} test2Save={test2Save}
                onDayClick={(d,allDays)=>goToDay(d,allDays)}
                onTestClick={(num,save)=>{setActiveTest(num);setResumingTest(save||null);setScreen("test");}}
                onTestRestart={(num)=>{clearTestSave(num);window.location.reload();}}
              />
            ));
          })()}
        </div>
        {canAdvanceWeek&&(
          <div style={{background:"#0a1a0a",border:"1px solid #10b981",borderRadius:"14px",padding:"20px",textAlign:"center",margin:"16px 20px"}}>
            <div style={{fontSize:"32px",marginBottom:"8px"}}>&#127500;</div>
            <div style={{color:"#10b981",fontSize:"16px",fontWeight:"900",marginBottom:"4px"}}>Week {currentWeekIdx+1} Complete!</div>
            <div style={{color:"#888",fontSize:"13px",marginBottom:"16px"}}>Ready to start Week {currentWeekIdx+2}</div>
            <button onClick={()=>updateProgress({currentWeek:currentWeekIdx+1})} style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#10b981,#059669)",border:"none",borderRadius:"10px",color:"#fff",fontSize:"15px",fontWeight:"900",cursor:"pointer"}}>Start Week {currentWeekIdx+2} →</button>
          </div>
        )}
        <div style={{textAlign:"center",marginTop:"24px"}}><span style={{color:"#2a2a3e",fontSize:"11px"}}>{APP_VERSION}</span></div>
      </div>
    );
  }

  // ── HOME SCREEN ──
  // Streak tracking
  const todayStr = new Date().toDateString();
  if ((progress.lastLoginDate||"") !== todayStr) {
    const yest = new Date(Date.now()-86400000).toDateString();
    setTimeout(()=>updateProgress({streak:progress.lastLoginDate===yest?(progress.streak||0)+1:1,lastLoginDate:todayStr}),0);
  }
  const streak = progress.streak||1;
  const quizScores = Object.values(progress.dayScores||{});
  const quizAcc = quizScores.length?Math.round(quizScores.reduce((a,b)=>a+b,0)/quizScores.length):null;
  const allTestScores = Object.values(progress.testScores||{}).flatMap(w=>Object.values(w));
  const testAcc = allTestScores.length?Math.round(allTestScores.reduce((a,b)=>a+b,0)/allTestScores.length):null;
  const gameAcc=null; const charAcc=null;
  const allAccVals=[quizAcc,testAcc].filter(v=>v!==null);
  const overallAcc=allAccVals.length?Math.round(allAccVals.reduce((a,b)=>a+b,0)/allAccVals.length):null;
  const allDaysFlat=WEEKS.flatMap(w=>w.days);
  const continueDay=allDaysFlat.find(d=>isDayUnlocked(d.day)&&!progress.completedDays.includes(d.day))||allDaysFlat[allDaysFlat.length-1];
  const currentDayNum=continueDay?.day||1;
  const rank=getRank(progress.totalXP||0);

  return (
    <div style={{minHeight:"100vh",background:"#06060f",fontFamily:"system-ui,sans-serif",padding:"0 0 48px"}}>

      {/* Dev PIN modal */}
      {showDevPin&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999,padding:"24px"}}>
          <div style={{background:"#10101c",border:"1px solid #f97316",borderRadius:"16px",padding:"28px",maxWidth:"300px",width:"100%",textAlign:"center"}}>
            <div style={{fontSize:"32px",marginBottom:"12px"}}>&#128295;</div>
            <h3 style={{color:"#fff",fontSize:"18px",fontWeight:"900",marginBottom:"16px"}}>Dev Mode</h3>
            <input type="password" value={pinInput} onChange={e=>setPinInput(e.target.value)}
              onKeyDown={e=>{if(e.key==="Enter"){if(pinInput==="1337"){setDevMode(true);localStorage.setItem("nihongo_dev","true");}setShowDevPin(false);setPinInput("");}}}
              placeholder="PIN" autoFocus
              style={{width:"100%",padding:"12px",background:"#06060f",border:"1px solid #2a2a3e",borderRadius:"10px",color:"#fff",fontSize:"20px",textAlign:"center",outline:"none",boxSizing:"border-box",marginBottom:"12px",letterSpacing:"6px"}}/>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>{setShowDevPin(false);setPinInput("");}} style={{flex:1,padding:"12px",background:"#1a1a2e",border:"1px solid #2a2a3e",borderRadius:"10px",color:"#888",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>{if(pinInput==="1337"){setDevMode(true);localStorage.setItem("nihongo_dev","true");}setShowDevPin(false);setPinInput("");}}
                style={{flex:1,padding:"12px",background:"#f97316",border:"none",borderRadius:"10px",color:"#fff",fontSize:"14px",fontWeight:"700",cursor:"pointer"}}>Unlock</button>
            </div>
          </div>
        </div>
      )}

      <div style={{padding:"20px 20px 0"}}>
        {/* Top bar */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"22px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{width:"36px",height:"36px",background:"#4f46e5",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"13px",fontWeight:"700"}}>VL</div>
            <div style={{color:"#fff",fontSize:"18px"}}>Voca<span style={{fontWeight:"700"}}>Lingo</span></div>
          </div>
          <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
            {devMode&&<span style={{background:"#f97316",color:"#fff",fontSize:"10px",fontWeight:"700",padding:"2px 8px",borderRadius:"20px"}}>DEV</span>}
            <button onClick={()=>setScreen("settings")} style={{width:"34px",height:"34px",borderRadius:"8px",border:"0.5px solid #2a2a3e",background:"transparent",color:"#555",fontSize:"16px",cursor:"pointer"}}>&#9881;&#65039;</button>
          </div>
        </div>

        {/* Rank card */}
        <div style={{background:"#10101c",border:"0.5px solid "+rank.color+"44",borderRadius:"16px",padding:"16px",marginBottom:"14px",display:"flex",alignItems:"center",gap:"14px"}}>
          <div style={{width:"52px",height:"52px",borderRadius:"14px",background:"#0d0d28",border:"1px solid "+rank.color+"66",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <div style={{color:rank.color,fontSize:"22px",fontWeight:"700"}}>{rank.kanji}</div>
            <div style={{color:rank.color+"55",fontSize:"9px",fontWeight:"700"}}>{rank.sublevelName}</div>
          </div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"baseline",gap:"6px",marginBottom:"2px"}}>
              <div style={{color:"#fff",fontSize:"15px",fontWeight:"500"}}>{rank.name}</div>
              <div style={{color:rank.color+"99",fontSize:"12px",fontWeight:"700"}}>{rank.sublevelName}</div>
            </div>
            <div style={{color:"#555",fontSize:"11px",marginBottom:"8px"}}>{rank.xpInSublevel} / {rank.xpForSublevel} XP → {rank.nextLabel}</div>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{flex:1,height:"5px",background:"#1e1e30",borderRadius:"3px",overflow:"hidden"}}>
                <div style={{height:"100%",width:(rank.subProgress*100)+"%",background:"linear-gradient(90deg,"+rank.color+",#10b981)",borderRadius:"3px",transition:"width 0.5s"}}/>
              </div>
              <div style={{color:"#555",fontSize:"10px"}}>{Math.round(rank.subProgress*100)}%</div>
            </div>
          </div>
        </div>

        {/* Stats 2x2 */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"8px",marginBottom:"14px"}}>
          {[
            {val:streak,icon:"&#128293;",label:"day streak",color:"#f97316"},
            {val:"Day "+currentDayNum,icon:null,label:"current lesson",color:"#fff"},
            {val:(progress.totalXP||0).toLocaleString(),icon:null,label:"total XP",color:"#fff"},
            {val:progress.completedDays.length,icon:"&#128197;",label:"days studied",color:"#6366f1"},
          ].map((s,i)=>(
            <div key={i} style={{background:"#10101c",border:"0.5px solid #2a2a3e",borderRadius:"12px",padding:"10px 12px"}}>
              <div style={{color:s.color,fontSize:"18px",fontWeight:"500",marginBottom:"1px",display:"flex",alignItems:"center",gap:"4px"}}>
                {s.val}<span style={{fontSize:"14px"}} dangerouslySetInnerHTML={{__html:s.icon||""}}/>
              </div>
              <div style={{color:"#555",fontSize:"10px"}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Accuracy */}
        <div style={{background:"#10101c",border:"0.5px solid #2a2a3e",borderRadius:"16px",padding:"14px 16px",marginBottom:"14px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}>
            <div style={{color:"#fff",fontSize:"13px",fontWeight:"500"}}>&#127919; Overall accuracy</div>
            <div style={{color:"#10b981",fontSize:"20px",fontWeight:"500"}}>{overallAcc!==null?overallAcc+"%":"\u2014"}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {[{label:"Games",val:gameAcc,color:"#6366f1"},{label:"Quizzes",val:quizAcc,color:"#10b981"},{label:"Tests",val:testAcc,color:"#f59e0b"},{label:"Characters",val:charAcc,color:"#a855f7"}].map((row,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"10px"}}>
                <div style={{color:"#555",fontSize:"11px",width:"72px",flexShrink:0}}>{row.label}</div>
                <div style={{flex:1,height:"4px",background:"#1e1e30",borderRadius:"2px",overflow:"hidden"}}>
                  <div style={{height:"100%",width:row.val!==null?row.val+"%":"0%",background:row.color,borderRadius:"2px"}}/>
                </div>
                <div style={{color:"#888",fontSize:"11px",width:"34px",textAlign:"right"}}>{row.val!==null?row.val+"%":"\u2014"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div style={{color:"#555",fontSize:"11px",fontWeight:"700",letterSpacing:"1.5px",marginBottom:"10px"}}>LANGUAGES</div>
        <div style={{background:"#0d0d28",border:"1px solid #6366f144",borderRadius:"16px",padding:"14px 16px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"14px",cursor:"pointer"}} onClick={()=>setScreen("roadmap")}>
          <div style={{width:"42px",height:"42px",borderRadius:"10px",background:"#0d0d28",border:"1px solid #6366f144",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",flexShrink:0}}>🇯🇵</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}>
              <div style={{color:"#fff",fontSize:"15px",fontWeight:"500"}}>Japanese</div>
              <span style={{background:"#6366f122",color:"#6366f1",fontSize:"10px",padding:"2px 8px",borderRadius:"20px",fontWeight:"500"}}>active</span>
            </div>
            <div style={{color:"#555",fontSize:"11px",marginBottom:"6px"}}>Week {currentWeekIdx+1} — Day {currentDayNum}</div>
            <div style={{height:"3px",background:"#1e1e30",borderRadius:"2px",overflow:"hidden"}}>
              <div style={{height:"100%",width:Math.round(progress.completedDays.length/25*100)+"%",background:"#6366f1",borderRadius:"2px"}}/>
            </div>
          </div>
          <div style={{color:"#6366f1",fontSize:"20px"}}>&#8250;</div>
        </div>
        {[{name:"Spanish",flag:"🇪🇸"},{name:"French",flag:"🇫🇷"},{name:"Korean",flag:"🇰🇷"}].map(lang=>(
          <div key={lang.name} style={{background:"#0a0a0f",border:"0.5px solid #1a1a2e",borderRadius:"16px",padding:"14px 16px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"14px",opacity:0.45}}>
            <div style={{width:"42px",height:"42px",borderRadius:"10px",background:"#0a0a14",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",flexShrink:0}}>{lang.flag}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <div style={{color:"#fff",fontSize:"15px",fontWeight:"500"}}>{lang.name}</div>
                <span style={{background:"#1e1e30",color:"#555",fontSize:"10px",padding:"2px 8px",borderRadius:"20px"}}>coming soon</span>
              </div>
            </div>
            <div style={{color:"#333",fontSize:"16px"}}>&#128274;</div>
          </div>
        ))}

        {/* Continue */}
        <button onClick={()=>goToDay(continueDay,allDaysFlat)} style={{width:"100%",padding:"16px",background:"#4f46e5",border:"none",borderRadius:"14px",color:"#fff",fontSize:"15px",fontWeight:"500",cursor:"pointer",marginTop:"6px",marginBottom:"12px",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
          Continue — Day {currentDayNum} &#8250;
        </button>
        <div style={{textAlign:"center",marginBottom:"8px"}}><span style={{color:"#2a2a3e",fontSize:"11px"}}>{APP_VERSION}</span></div>
      </div>
    </div>
  );
}
