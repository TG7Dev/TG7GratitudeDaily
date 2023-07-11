import Note from "@models/note";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const note = await Note.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(note), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 