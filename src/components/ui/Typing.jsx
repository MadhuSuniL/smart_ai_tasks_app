import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown'

const WordTypewriter = ({ text, typeSpeed, onBegin, onChunk, onComplete, animate }) => {
  const [displayText, setDisplayText] = useState('');
  const [completed, setCompleted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    if (onBegin && currentWordIndex === 0) onBegin();

    const intervalId = setInterval(() => {
      if (currentWordIndex < words.length) {
        if (completed) setCompleted(false)
        setDisplayText(prevText => (prevText ? prevText + ' ' + words[currentWordIndex] : words[currentWordIndex]));
        setCurrentWordIndex(prevIndex => prevIndex + 1);
        if (onChunk) onChunk();
      } else {
        clearInterval(intervalId);
        if (onComplete && !completed) onComplete(); setCompleted(true);
      }
    }, typeSpeed);

    return () => clearInterval(intervalId);
  }, [words]);

  return (
    <div className={`${animate && 'animate-pulse'} llm-response`}>
      <Markdown>{displayText + " |"}</Markdown>
    </div>
  );
};

export default WordTypewriter;