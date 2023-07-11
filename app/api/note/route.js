import Note from "@models/note";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const notes = await Note.find({}).populate('creator')

        return new Response(JSON.stringify(notes), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all notes", { status: 500 })
    }
} 