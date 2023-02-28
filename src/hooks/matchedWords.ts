import React, { useEffect, useState } from "react";

interface Word {
  rank: number;
  targetWord: string;
  englishWord: string;
}

interface UseSearchSuggestionType {
  searchInput: string;
  matchedWord: Word[];
  suggestedWord: Word[];
  handleInputChange: (input: string) => void;
  handleSearchReset: () => void;
  handleSubmit: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const useSearchSuggestions = (): UseSearchSuggestionType => {
  const [data, setData] = useState<Word[]>([]);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [matchedWord, setMatchedWord] = useState<Word[]>([]);
  const [suggestedWord, setSuggestedWord] = useState<Word[]>([]);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const response = await fetch("/words.json");
      const data = await response.json();
      setData(data.words);
    };
    fetchData();
  }, []);

  const handleInputChange = (input: string): void => {
    setSearchInput(input);
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      const matchedWord = data
        .filter((word) =>
          word.englishWord
            .toLocaleLowerCase()
            .includes(input.toLocaleLowerCase())
        )
        .sort((a, b) => a.rank - b.rank)
        .slice(0, 5)
        .map((word) => ({
          targetWord: word.targetWord,
          rank: word.rank,
          englishWord: word.englishWord,
        }));
      setSuggestedWord(matchedWord);
    }, 2000);
    setTimer(newTimer);
  };
  const handleSubmit = (): void => {
    const matchedWord = data
      .filter((word) =>
        word.englishWord
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase())
      )
      .sort((a, b) => a.rank - b.rank)
      .map((word) => ({
        targetWord: word.targetWord,
        rank: word.rank,
        englishWord: word.englishWord,
      }));
    setMatchedWord(matchedWord);
  };
  const handleSearchReset = (): void => {
    setSearchInput("");
    setMatchedWord([]);
    setSuggestedWord([]);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") return handleSubmit();
  };

  return {
    searchInput,
    matchedWord,
    suggestedWord,
    handleInputChange,
    handleSearchReset,
    handleSubmit,
    handleKeyDown,
  };
};
export default useSearchSuggestions;
