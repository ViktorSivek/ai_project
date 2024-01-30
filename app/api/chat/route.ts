import OpenAI from "openai";
import * as dotenv from "dotenv";
import type { NextApiRequest } from 'next';
import fs from 'fs';


dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextApiRequest) {
  try {
    const body = await req.body.getReader().read();
    const decodedBody = new TextDecoder().decode(body.value);
    let { message, jsonData } = JSON.parse(decodedBody);

    console.log("Received message:", message);
    console.log("Received jsonData:", jsonData);

    if (!message) {
        return new Response(JSON.stringify({ error: "Message is empty" }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    }

    let assistantId = process.env.ASSISTANT_ID; // Retrieve stored assistant ID

    if (!assistantId) {
      const assistant = await openai.beta.assistants.create({
        instructions: "You are a driving support chatbot. Based on provided json data about driving incidents provided by police.  Use your knowledge base to best respond to user queries.",
        model: "gpt-4-turbo-preview",
        tools: [{"type": "retrieval"}]
      });
      assistantId = assistant.id;
      process.env.ASSISTANT_ID = assistantId; // Store the assistant ID for future use

      console.log("assistant", assistant);
    }

    // Retrieve the list of files currently attached to the assistant
    const assistantFiles = await openai.beta.assistants.files.list(assistantId);
    console.log("Current Assistant Files:", assistantFiles);

    // Delete the old files
    for (const file of assistantFiles.data) {
      await openai.beta.assistants.files.del(assistantId, file.id);
      console.log(`Deleted file: ${file.id}`);
    }

    // Check if jsonData is a file path or actual data
    if (typeof jsonData === 'string') {
      // Assuming jsonData is a JSON string, write it to a file
      const filePath = './tempJsonData.json'; // Temporary file path
      fs.writeFileSync(filePath, jsonData);
      jsonData = filePath; // Update jsonData to be the file path
    }

    // Upload a new file
    const newFile = await openai.files.create({
      file: fs.createReadStream(jsonData),
      purpose: "assistants",
    });

    console.log("fiiileeee", newFile );

    // Attach the new file to the assistant
    await openai.beta.assistants.files.create(assistantId, {
      file_id: newFile.id
    });

    const thread = await openai.beta.threads.create();

    console.log("threaaaaaaadddd", thread)


    const threadMessage = await openai.beta.threads.messages.create(
      thread.id,
      { role: "user", content: message }
    );

    console.log(threadMessage);

    // Create the run
    const run = await openai.beta.threads.runs.create(
      thread.id,
      { assistant_id: assistantId }
    );

    console.log("ruuuuunnn", run);

    // Poll for the response
    let runResult;
    const startTime = Date.now();
    const timeout = 30000; // 30 seconds timeout
    while (Date.now() - startTime < timeout) {
      const currentRun = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      if (currentRun.status === 'completed') {
        runResult = currentRun;
        break;
      } else if (currentRun.status === 'failed') {
        throw new Error('Run failed');
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
    }

    if (!runResult) {
      throw new Error('Run did not complete in time');
    }


    // Retrieve the messages from the thread
    const threadMessages = await openai.beta.threads.messages.list(thread.id);

    console.log("threadMessagesssssssss", threadMessages)

    // Find the assistant's response among the messages
    const assistantResponse = threadMessages.data.find(msg => msg.role === 'assistant');

    console.log("assistantRespoooonseeee", assistantResponse);

    let assistantResponseText = "No response from assistant."; // Default response

    if (assistantResponse && assistantResponse.content) {
        // Extract text from each content element
        assistantResponseText = assistantResponse.content.map(contentItem => {
            if (contentItem.type === 'text' && contentItem.text && contentItem.text.value) {
                return contentItem.text.value; // Safely access the 'value' property
            }
            return '';
        }).join(' '); // Join multiple text elements with space
    }

    const apiResponse = { response: assistantResponseText };

    console.log("apiiiiiiiiiresponse", apiResponse);

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
