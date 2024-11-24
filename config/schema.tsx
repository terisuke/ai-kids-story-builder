import { pgTable, text, serial, varchar, json } from "drizzle-orm/pg-core";

export const StoryData = pgTable('StoryData',{
    id:serial('id').primaryKey(),
    storyId:varchar('storyId'),
    storySubject:text('storySubject'),
    storyType:varchar('storyType'),
    ageGroup:varchar('ageGroup'),
    imageStyle:varchar('imageStyle'),
    output:json('output'),
    coverImage:varchar('coverImage'),
});
