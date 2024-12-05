"use client"
import { chatSession } from "@/config/GeminiAi";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Notifications, { notify } from 'react-notify-toast';
import uuid4 from 'uuid4';
import AgeGroup from "./_components/AgeGroup";
import CustomLoader from "./_components/CustomLoader";
import ImageStyle from "./_components/ImageStyle";
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT;

export  interface fieldData {
  fieldValue:string,
  fieldName:string
}
export interface formData {
  storySubject:string,
  storyType:string,
  ageGroup:string,
  imageStyle:string
}
export default function CreateStory() {
  const [formData,setFormData] = useState<formData>();
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  /**
   * used to add data to <form action=""></form>
   * @param data:fieldData
   */
  const onHandleUserSelection =(data:fieldData)=>{
    setFormData((prev:any)=>({...prev,[data.fieldName]:data.fieldValue}))
    console.log(formData);
  }

      //Save to DB
      const SaveToDB = async(output:string,imageUrl:string)=>{
        const recordId=uuid4();
        try{
          setLoading(true);
          const result = await db.insert(StoryData).values({
            storyId:recordId,
          storySubject:formData?.storySubject,
          storyType:formData?.storyType,
          ageGroup:formData?.ageGroup,
          imageStyle:formData?.imageStyle,
          output:JSON.parse(output),
          coverImage:imageUrl
        }).returning({storyId:StoryData?.storyId});
        setLoading(false);
        return result;
      }catch(error){
        console.log(error);
        setLoading(false);
      }
      }
  //Generate Image
  const GenerateStory = async()=>{
    setLoading(true);
    const FINAL_PROMPT =CREATE_STORY_PROMPT
    ?.replace("{ageGroup}",formData?.ageGroup??'')
    .replace("{storyType}",formData?.storyType??'')
    .replace("{imageStyle}",formData?.imageStyle??'')
    .replace("{storySubject}",formData?.storySubject??'');
    //Generate AI Story
    try{
      const result = await chatSession.sendMessage(FINAL_PROMPT!);
      const responseText = await result?.response.text();
      const storyText = JSON.parse(responseText);
      const imageResponse = await axios.post("/api/generate-image",{
        prompt: `Add text with title: ${storyText?.title} in bold text for Book Cover: ${storyText?.cover_image_prompt}`
      })
      // imageUrlを直接文字列として取得
    const AiImageUrl = imageResponse.data as string;
    const imageResult:any=await axios.post("/api/save-image",{
      url:AiImageUrl
    })
    const FirebaseStorageImageUrl=imageResult.data.downloadUrl
    //Save to DB
    const response:any = await SaveToDB(result?.response.text(),FirebaseStorageImageUrl);
      console.log(response);
      notify.show("ストーリーが作成されました!", "success");
      router?.replace("/view-story/"+response[0].storyId)
      setLoading(false);
    }catch(error){
      console.log(error);
      notify.show("ストーリーの作成に失敗しました。", "error");
      setLoading(false);
    }
  }
  return (
    <div className="p-10 md:px-20 lg:px-40">
      <Notifications />
      <h2 className="font-extrabold text-[70px] text-primary text-center">
        ストーリー作成
      </h2>
      <p className="text-center text-2xl text-primary">
        簡単な指示で、オリジナル絵本を作ろう
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mt-14">
        {/* Story Subiect */}
        <StorySubjectInput userSelection={onHandleUserSelection} />
        {/* Story Type */}
        <StoryType userSelection={onHandleUserSelection} />
        {/* Age Group */}
        <AgeGroup userSelection={onHandleUserSelection} />
        {/* Image Style */}
        <ImageStyle userSelection={onHandleUserSelection} />
      </div>
      <div className="flex justify-center mt-10">
        <Button color="primary"
        disabled={loading}
        variant="shadow" className="text-white text-2xl font-bold py-10 h-20" onClick={GenerateStory}>ストーリーを作成</Button>
        <CustomLoader isLoading={loading} />
      </div>
    </div>
  );
}
