'use client';
import { useState, useEffect } from 'react';

export default function OpenAi(){
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [animatedText ,setAnimatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSumbit = async () => {

    setIsLoading(true);
    setResponse('');
    setAnimatedText('');

  const res = await fetch('/api/ai/openai', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json'},
    body: JSON.stringify({ prompt})
  })

    const data = await res.json();
    console.log(data);

    if(res.ok)
      setResponse(data.result);
    else
      setResponse(`Error: ${data.error}`);

    setIsLoading(false);
  }

  useEffect(() => {
    if(!response) return;

    let index = 0;
    setAnimatedText('');
    const interval = setInterval(() => {
      setAnimatedText((prev) => prev + response.charAt(index));
    index++;
    if(index >= response.length) clearInterval(interval)
  }, 30);
    return () => clearInterval(interval);
    }, [response]);

  return(
    <div>
    <textarea
      placeholder='Ask Anything'
      className="w-full p-2 border rounded"
      rows={3}
      value={prompt}
      onChange={(e) => setPrompt( e.target.value )}
      />
      <button
        onClick={handleSumbit}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading}>
        send
      </button>
       <div className="mt-4 whitespace-pre-wrap font-mono">
        {animatedText}
      </div>
    </div>
  )
}
