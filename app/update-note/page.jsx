"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdateNote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");

  const [post, setPost] = useState({ note: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/note/${noteId}`);
      const data = await response.json();

      setPost({
        note: data.note,
        tag: data.tag,
      });
    };

    if (noteId) getPromptDetails();
  }, [noteId]);

  const updateNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!noteId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/note/${noteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          note: post.note,
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateNote}
    />
  );
};

export default UpdateNote;