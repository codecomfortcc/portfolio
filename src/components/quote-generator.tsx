'use client'
import React, { useState, useEffect } from 'react';


const QuoteGenerator = () => {
  {/** motivatinal quotes with author name at the end and atleast 60chars */}
  const QUOTES = [
    {
      quote: "The only limit to our realization of tomorrow will be our doubts of today.",
      author: "Franklin D. Roosevelt (American politician, 4 times US President)",
    },
    {
      quote: "The bad news is time flies. The good news is you're the pilot.",
      author: "Michael Althsuler (American author, speaker)",
    },
    {
      quote: "The best revenge is massive success.",
      author: "Frank Sinatra (American singer, actor)",
    },
    {
      quote: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
      author: "Steve Jobs (American entrepreneur, co-founder of Apple)",
    },
    {
      quote: "You don't have to be great to start, but you have to start to be great.",
      author: "Zig Ziglar (American motivational speaker, author)",
    },
    {
      quote: "Our greatest glory is not in never falling, but in rising every time we fall.",
      author: "Nelson Mandela (South African revolutionary, politician)",
    },
    {
      quote: "The man who moves a mountain begins by carrying away small stones.",
      author: "Confucius (Chinese philosopher)",
    },
    {
      quote: "The only person you are destined to become is the person you decide to be.",
      author: "Ralph Waldo Emerson (American philosopher, essayist, poet)",
    },
    {
      quote: "The difference between ordinary and extraordinary is that little extra.",
      author: "Jimmy Johnson (American football coach, broadcaster)",
    },
    {
      quote: "It is during our darkest moments that we must focus to see the light.",
      author: "Aristotle Onassis (Greek shipping magnate)",
    },

    {
      quote: "Education is the most powerful weapon which you can use to change the world.",
      author: "Nelson Mandela (South African revolutionary, politician)"
    },
    {
      quote: "What a man can conceive and believe, he can achieve.",
      author: "Napoleon Hill (American author)"
    },
    {
      quote: "If you can dream it, you can do it.",
      author: "Walt Disney (American entrepreneur, animator)"
    },
    {
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt (American political figure, activist, diplomat)"
    },
    {
      quote: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
      author: "Helen Keller (American author, activist)"
    },
    {
      quote: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
      author: "Steve Jobs (American entrepreneur, co-founder of Apple)"
    },
    {
      quote: "Where there is a will, there's a way.",
      author: "Proverb (Origin unknown)"
    },
    {
      quote: "The mind is everything. What you think you become.",
      author: "Buddha (Spiritual teacher and founder of Buddhism)"
    },
    {
      quote: "The journey of a thousand miles begins with a single step.",
      author: "Lao Tzu (Chinese philosopher)"
    },
    {
      quote: "Doubt kills more dreams than failure ever will. Keep moving forward.",
      author: "Suzy Kassem (Syrian poet)"
    },
    {
      quote: "Even if I fall down, I will rise up. That's the Bengali spirit.",
      author: "Satyajit Ray (Indian filmmaker)"
    },
    {
      quote: "Strength does not come from winning. Your struggles develop your strengths. When you go through hardships and decide not to surrender, that is strength.",
      author: "Mahatma Gandhi (Indian lawyer, anti-colonial nationalist)"
    },
    {
      quote: "The only person you are destined to become is the person you decide to be.",
      author: "Ralph Waldo Emerson (American philosopher, essayist, poet)"
    },
    {
      quote: "In a gentle way, you can shake the world.",
      author: "Mahatma Gandhi (Indian lawyer, anti-colonial nationalist)"
    },
    {
      quote: "Let us rise above the limitations of race and nationality and identify ourselves with the whole human race.",
      author: "Swami Vivekananda (Indian Hindu monk)"
    },
    {
      quote: "If you want to see the change in the world, you must be the change.",
      author: "Mahatma Gandhi (Indian lawyer, anti-colonial nationalist)"
    },
    {
      quote: "Education is the primary key to unlock the golden door of freedom.",
      author: "A. P. J. Abdul Kalam (Indian aerospace scientist, 11th President of India)"
    },
    {
      quote: "Failure is simply the opportunity to begin again, this time more intelligently.",
      author: "Henry Ford (American industrialist, founder of the Ford Motor Company)"
    },
    {
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt (American political figure, activist, diplomat)"
    },
    {
      quote: "The difference between ordinary and extraordinary is that little extra.",
      author: "Jimmy Johnson (American football coach, broadcaster)"
    },
  ];

  const [advice, setAdvice] = useState(QUOTES[0]);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setAdvice(QUOTES[randomIndex]);
  }, []);
  
  return (
    <>
    <div className="mt-20 pb-20 w-full">
      <div className="p-4  flex flex-col items-center w-full">
        <h3 className="text-2xl leading-10 font-bold text-gray-700 max-w-[500px]  text-center mb-4">"{advice.quote}"</h3>
        <h3 className="text-2xl leading-10 font-bold text-primary max-w-[500px]  text-center mb-4"> - {advice.author}</h3>
      </div>
    </div>
    <div className="text-center italic py-5">--The End --</div>
    </>
  );
};

export default QuoteGenerator;
