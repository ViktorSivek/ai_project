import OpenAI from "openai";
import * as dotenv from "dotenv";
import type { NextApiRequest } from 'next';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextApiRequest) {
  try {
    const body = await req.body.getReader().read();
    const decodedBody = new TextDecoder().decode(body.value);
    const parsedBody = JSON.parse(decodedBody);

    if (!parsedBody.message) {
        return new Response(JSON.stringify({ error: "Message is empty" }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    }

    // const { message } = req.body;
    const message = parsedBody.message;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const apiResponse = { response: completion.choices[0].message.content };
    
    return new Response(JSON.stringify(apiResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });


  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
