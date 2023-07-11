"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateNote = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ note: "", tag: "" });
  

  const createNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/note/new", {
        method: "POST",
        body: JSON.stringify({
          note: post.note,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Jot down '
      post={post}
      session={session}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createNote}
    />
  );
};

export default CreateNote;