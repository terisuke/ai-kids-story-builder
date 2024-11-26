import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: NextRequest) {
try{
const data=await req.json()
const {prompt}=data
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
});

const input = {
    prompt: prompt,
    output_format: "png",
    output_quality: 80,
    aspect_ratio: "1:1",
};

const output:any = await replicate.run("black-forest-labs/flux-schnell", { input });
console.log(output)

//=> output_0.webp written to disk
  return NextResponse.json({"imageUrl":output[0].toString()})
}catch(error){
  console.log(error);
  return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
}
}
