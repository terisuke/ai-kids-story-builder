import React, { useState } from 'react'
import Image from 'next/image'
import { OptionField } from './StoryType';
function AgeGroup({userSelection}:any) {
  const OptionList=[
    {
      label:"0-3歳",
      imageUrl:"/0-3.png",
      isFree:true
    },
    {
      label:"4-6歳",
      imageUrl:"/4-6.png",
      isFree:true
    },
    {
      label:"7-12歳",
      imageUrl:"/7-12.png",
      isFree:true
    },
  ]
  const [selectedOption,setSelectedOption] = useState<string>(OptionList[0].label);

  const onUserSelect=(item:OptionField)=>{
    setSelectedOption(item.label);
    userSelection({
      fieldValue:item?.label,
      fieldName:"ageGroup"
    })
  }
  return (
    <div>
      <label className="font-bold text-4xl text-primary">3.対象年齢</label>
      <div className="grid grid-cols-3 gap-5 mt-3 ">
        {OptionList.map((item,index)=>(
          <div className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 ${selectedOption === item.label ? "grayscale-0 border rounded-3xl border-primary" : "grayscale"}`} onClick={()=>onUserSelect(item)} key={index}>
            <Image src={item.imageUrl} alt={item.label} width={300} height={500}
            className="object-coverh-[260px] rounded-3xl"/>
            <h3 className='text-white font-bold text-center text-2xl w-full mt-2'>{item.label}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgeGroup