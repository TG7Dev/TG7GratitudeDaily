import Note from "@models/note";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const note = await Note.findById(params.id).populate("creator")
        if (!note) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(note), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { note, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingNote = await Note.findById(params.id);

        if (!existingNote) {
            return new Response("Note not found", { status: 404 });
        }

        // Update the prompt with new data
        existingNote.note = note;
        existingNote.tag = tag;

        await existingNote.save();

        return new Response("Successfully updated the Note", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Note", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Note.findByIdAndRemove(params.id);

        return new Response("Note deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting note", { status: 500 });
    }
};