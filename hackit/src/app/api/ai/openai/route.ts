import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest){
  const { prompt } = await req.json();

  if(!prompt){
    return NextResponse.json({ error: 'Missing prompt'}, {status: 400})
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt}],
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();
    if(!openaiRes.ok){
      return NextResponse.json({ error: data.error.message}, {status: openaiRes.status});
    }

    return NextResponse.json({result: data.choices[0].message.content});
  } catch(err){
      return NextResponse.json({ error: 'Something went wrong'}, {status: 500});
  }
}


