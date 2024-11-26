import { NextRequest,NextResponse } from "next/server";
import axios from "axios";
import { ref, uploadString,getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";


export const convertImage=async(imageUrl:string)=>{
  try{
    const response=await axios.get(imageUrl,{responseType:"arraybuffer"})
    const base64Image = Buffer.from(response.data as Buffer).toString('base64');
    return base64Image;
  }catch(error){
    console.error('Failed to convert image:', error);
    throw error;
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received data:", data); // デバッグ用

    // URLの取得と検証
    const url = typeof data.url === 'string' ? data.url : 
               (data.url?.imageUrl || null);

    if (!url) {
      console.error("Invalid URL received:", data);
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // 画像の変換
    const base64Image = await convertImage(url);
    if (!base64Image) {
      return NextResponse.json(
        { error: "Failed to convert image" },
        { status: 500 }
      );
    }

    // Firebaseへのアップロード
    const fileName = `/ai-story/${Date.now()}.png`;
    const imageRef = ref(storage, fileName);

    try {
      await uploadString(
        imageRef,
        `data:image/png;base64,${base64Image}`,
        'data_url'
      );
      const downloadUrl = await getDownloadURL(imageRef);
      return NextResponse.json({ downloadUrl });
    } catch (error) {
      console.error("Firebase error:", error);
      return NextResponse.json(
        { error: "Failed to upload to Firebase" },
        { status: 500 }
      );
    }

  } catch (error:any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

