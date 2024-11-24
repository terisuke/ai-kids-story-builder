"use client"
import StorySubjectInput from "./_components/StorySubjectInput";
import StoryType from "./_components/StoryType";
import AgeGroup from "./_components/AgeGroup";
import ImageStyle from "./_components/ImageStyle";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { chatSession } from "@/config/GeminiAi";
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import uuid4  from 'uuid4';
import CustomLoader from "./_components/CustomLoader";
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
  /** 
   * used to add data to <form action=""></form>
   * @param data:fieldData
   */
  const onHandleUserSelection =(data:fieldData)=>{
    setFormData((prev:any)=>({...prev,[data.fieldName]:data.fieldValue}))
    console.log(formData);
  }

      //Save to DB
      const SaveToDB = async(output:string)=>{
        const recordId=uuid4();
        try{
          setLoading(true);
          const result = await db.insert(StoryData).values({
            storyId:recordId,
          storySubject:formData?.storySubject,
          storyType:formData?.storyType,
          ageGroup:formData?.ageGroup,
          imageStyle:formData?.imageStyle,
          output:JSON.parse(output)
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
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response.text());
      const response = await SaveToDB(result?.response.text());
      console.log(response);
      setLoading(false);
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <div className="p-10 md:px-20 lg:px-40">
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
