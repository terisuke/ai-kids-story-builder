import React from 'react'
import { Textarea } from '@nextui-org/react'
function StorySubjectInput({userSelection}:any) {
  return (
    <div>
      <label className="font-bold text-4xl text-primary">
        1.ストーリーの内容
      </label>
      <Textarea
        placeholder="ざっくりとしたストーリーの内容を入力してください"
        size="lg"
        classNames={{
          input:"resize-y min-h-[230px] text-2xl p-5"
        }}
        className="mt-3 max-w-lg"
        onChange={(e) => userSelection({
          fieldValue:e.target.value,
          fieldName:"storySubject"
        })}
      />
    </div>
  );
}

export default StorySubjectInput