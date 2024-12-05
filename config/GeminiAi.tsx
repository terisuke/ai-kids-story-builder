import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("NEXT_PUBLIC_GEMINI_API_KEY is not set");
}
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "5-8歳の子供向けの教育的な物語を作成してください。男の子と女の子の物語で、愛をテーマにし、全ての画像をペーパーカットスタイルで作成してください。5章構成で、各章の詳細な画像テキストプロンプトと、物語のタイトルと一緒に物語のカバー画像のプロンプトをJSON形式で提供してください。全ての応答は日本語で行ってください。ただし、image_promptのみ英語で出力してください。"
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `{
            "story_cover": {
              "image_prompt": "男の子と女の子が手をつないで笑顔で立ち、カラフルな花とハートに囲まれたペーパーカットイラスト。物語のタイトル「The Boy, The Girl, and the Love」が上部に遊び心のあるフォントで書かれている。",
              "title": "The Boy, The Girl, and the Love"
            },
            "chapters": [
              {
                "chapter_title": "A Sunny Day",
                "chapter_text": "太陽の光と笑い声に満ちた町に、レオという男の子が住んでいました。レオは太陽のように明るい心を持ち、友達と遊ぶことが大好きでした。ある日、川辺で砂の城を作っているとき、空のように青い目をした女の子を見かけました。彼女の名前はリリー、そよ風のように優しい子でした。",
                "image_prompt": "晴れた浜辺でレオとリリーが砂の城を作っているペーパーカットイラスト。レオは青いシャツと赤いショートパンツを着て、リリーは黄色いドレスを着ている。砂の城の周りにはカラフルな貝殻と小さなペーパーカットの花が散りばめられている。"
              },
              {
                "chapter_title": "A Shared Smile",
                "chapter_text": "レオは少し恥ずかしがり屋でしたが、リリーの笑顔はとても温かく、その恥ずかしさを溶かしてしまいました。二人は話し始め、お気に入りの物語を共有し、お互いのおかしな冗談に笑い合いました。リリーが笑うたびにレオは胸がドキドキし、彼女のことがとても好きになっていることに気づきました。",
                "image_prompt": "ベンチに座って笑いながらリンゴのバスケットを分け合うレオとリリーのペーパーカットイラスト。レオは頬を赤らめてリリーを見つめ、リリーは赤いリンゴを持って優しく微笑んでいる。"
              },
              {
                "chapter_title": "A Special Gift",
                "chapter_text": "ある日、レオはリリーへの気持ちを伝えることにしました。自分の庭から一番きれいな花、金色の中心を持つひまわりを選び、小さな紙包みの箱に丁寧に入れました。緊張した笑顔で、リリーが気に入ってくれることを願いながら渡しました。",
                "image_prompt": "レオが紙の箱に入れたひまわりをリリーに渡すペーパーカットイラスト。リリーは驚き感動して、目が喜びで輝いている。背景は色とりどりの花が咲く草原と明るい太陽。"
              },
              {
                "chapter_title": "A Growing Feeling",
                "chapter_text": "リリーはひまわりをとても喜びました。レオも自分のことが好きだと分かり、二人の間に特別な感情が芽生えました。二人はますます多くの時間を一緒に過ごし、遊び、秘密を共有し、新しい冒険を見つけていきました。二人は親友となり、その友情は愛と優しさに満ちていました。",
                "image_prompt": "手をつないで花畑を歩くレオとリリーのペーパーカットイラスト。二人は幸せそうに笑顔で、背景には夕日が沈んでいる。周りの花はピンク、青、黄色のさまざまな色合い。"
              },
              {
                "chapter_title": "A Love That Grows",
                "chapter_text": "時が経つにつれ、レオとリリーのお互いへの愛はより強くなっていきました。二人はお互いを理解することを学びました。そして、純粋な愛情と思いやりの心を持って、これからもずっと一緒に歩んでいくことを誓い合いました。",
                "image_prompt": "夕暮れの公園で、レオとリリーが小指を絡ませて約束をしているペーパーカットイラスト。二人の周りには、ハートの形をした花びらが舞い、暖かな光が二人を包んでいる。"
              }
            ]
          }`
        },
      ],
    },
  ],
});