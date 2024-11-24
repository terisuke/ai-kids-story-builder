const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "5歳から8歳の子ども向け、教育的な紙切り風イラスト付き物語のJSON形式での作成依頼です。内容は「魔法学校に通う少年」の物語で、5章構成、各章の詳細な画像テキストプロンプトと表紙の画像プロンプト（物語タイトル付き）を含みます。"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "{\n  \"title\": \"魔法学校へようこそ！\",\n  \"author\": \"AIイラスト作家\",\n  \"target_age\": \"5-8歳\",\n  \"style\": \"紙切り風イラスト\",\n  \"chapters\": [\n    {\n      \"chapter_title\": \"魔法の入学式\",\n      \"text\": \"ルークは、魔法使いになるのが夢の5歳。\\n今日は魔法学校『ウィザーウッド魔法学院』の入学式！\\nドキドキしながら校門をくぐると、たくさんの魔法使いの生徒たちがいました。\\nみんな、カラフルなマントを着て、キラキラ輝く杖を持っています。\\nルークは、少し緊張しながらも、素敵な魔法の冒険を想像してワクワクしていました。\",\n      \"image_prompt\": \"紙切り風イラスト, 5歳の少年が魔法学校のカラフルな校門をくぐる様子,  たくさんの魔法使いの子供たちが歓迎している,  キラキラ輝く杖とカラフルなマント,  背景は緑豊かな森,  陽気な雰囲気\"\n    },\n    {\n      \"chapter_title\": \"不思議な授業\",\n      \"text\": \"最初の授業は「魔法の植物学」。\\n先生は、大きな帽子をかぶった優しい魔女さんでした。\\n授業では、空を飛ぶ魔法の豆や、しゃべる魔法のきのこについて学びました。\\nルークは、魔法の豆を植えると、本当に豆が空に飛び立つ様子を見てびっくり！\\n魔法の世界は、想像以上に不思議で、とても楽しいものでした。\",\n      \"image_prompt\": \"紙切り風イラスト, 魔法の植物学の授業風景,  優しい魔女の先生と5人の子供達, 空を飛ぶ魔法の豆, しゃべる魔法のきのこ,  教室は温かく光に満ちた雰囲気,  魔法の植物が描かれた黒板\"\n    },\n    {\n      \"chapter_title\": \"魔法の杖選び\",\n      \"text\": \"今日は、魔法の杖を選ぶ日！\\n魔法の杖は、魔法使いにとって大切なパートナーです。\\nルークは、たくさんの杖の中から、自分にぴったりの杖を探しました。\\nキラキラ光る杖、シンプルで美しい杖、色々な杖を試した結果、ルークは、小さな青い鳥の飾りつきの杖を選びました。\\n杖を持った瞬間、ルークは、温かい光を感じました。\",\n      \"image_prompt\": \"紙切り風イラスト, 5歳の少年がたくさんの魔法の杖の中から杖を選ぶ様子,  キラキラ光る杖, シンプルな杖,  青い鳥の飾りのついた杖,  魔法の杖が並んだ棚,  魔法使いの子供が杖を選ぶシーン\"\n    },\n    {\n      \"chapter_title\": \"初めての魔法\",\n      \"text\": \"いよいよ、初めての魔法の授業！\\n先生は、「レヴィテージョン（浮遊魔法）」を教えてくれました。\\n最初はうまくいきませんでしたが、先生に教えてもらいながら、何度も練習しました。\\nそして、ついに！ルークは小さなボールを空中に浮かせることができました。\\nルークは、大喜び！魔法の楽しさを実感しました。\",\n      \"image_prompt\": \"紙切り風イラスト, 5歳の少年が魔法の授業でレヴィテージョンに挑戦,  小さなボールが空中に浮いている,  先生は優しく見守っている,  教室は魔法の光に満ちている,  魔法の呪文が書かれた本\"\n    },\n    {\n      \"chapter_title\": \"魔法の友情\",\n      \"text\": \"魔法学校には、たくさんの友達ができました。\\n一緒に魔法の練習をしたり、遊んだり、楽しい毎日です。\\n友達と協力して、難しい魔法の課題にも挑戦しました。\\nルークは、魔法の力だけでなく、友達との友情の大切さも学びました。\\n魔法学校での生活は、ルークにとって忘れられない思い出となりました。\",\n      \"image_prompt\": \"紙切り風イラスト, 5歳の少年と友達が魔法の練習をしている様子,  みんな笑顔で協力している,  魔法の呪文が飛び交っている,  魔法学校の明るい教室,  友達と一緒に魔法のゲームをしているシーン\"\n    }\n  ],\n  \"cover_image_prompt\": \"紙切り風イラスト, 物語タイトル『魔法学校へようこそ！』, 5歳の魔法使いの少年が魔法の杖を持って空を飛んでいる様子,  魔法学校が背景に描かれている,  ファンタジーで明るい雰囲気\"\n}\n```\n"},
        ],
      },
    ],
  });