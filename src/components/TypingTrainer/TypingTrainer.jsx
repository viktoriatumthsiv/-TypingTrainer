import React, { useState, useEffect, useCallback } from "react";
import "./TypingTrainer.css";

 
const WORDS = ["react", "javascript", "frontend", "coding", "interface", "component", "browser"];

const TypingTrainer = () => {
  const [word, setWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const generateNewWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    setWord(WORDS[randomIndex]);
    setUserInput("");
    setIsError(false);
    setIsOpen(true);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    const { key } = e;
    if (key.length !== 1) return;

    const expectedChar = word[userInput.length];

    if (key === expectedChar) {
      const updatedInput = userInput + key;
      setUserInput(updatedInput);
      setIsError(false);
      if (updatedInput === word) {
        setTimeout(() => setIsOpen(false), 500);
      }
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="container">
      {!isOpen && (
        <button className="start-button" onClick={generateNewWord}>
          Показати рандомне слово
        </button>
      )}

      {isOpen && (
        <div className="overlay">
          <div 
            tabIndex="0" 
            onKeyDown={handleKeyDown} 
            className="modal-card"
            autoFocus 
          >
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
            <div className="word-display">
              {word.split("").map((char, index) => {
                let statusClass = "char-default";
                if (index < userInput.length) statusClass = "char-correct";
                else if (index === userInput.length && isError) statusClass = "char-error";
                return <span key={index} className={statusClass}>{char}</span>;
              })}
            </div>
            <p className="hint">Друкуй на клавіатурі...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypingTrainer;