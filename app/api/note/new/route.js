import Note from "@models/note";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, note, tag } = await request.json();
    console.log(`newNote  ${userId}   | ${note}  | ${tag}`);

    try {
        await connectToDB();
        const newNote = new Note({ creator: userId, note, tag });


        await newNote.save();
        return new Response(JSON.stringify(newNote), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new note", { status: 500 });
    }
}