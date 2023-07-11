"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import NoteCard from "./NoteCard";

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { data: session } = useSession();

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const NoteCardList = ({ data, handleTagClick }) => {
    return (
      <div className="mt-16 note_layout">
        {data.map((post) => (
          <NoteCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    );
  };

  const fetchPosts = async () => {
    let newData = [];

    await fetch("/api/note")
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].creator._id === session?.user.id) {
            newData.push(data[i]);
          }
        }
      });

    setAllPosts(newData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterNotes = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.note)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterNotes(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterNotes(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Notes */}
      {searchText ? (
        <NoteCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <NoteCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
