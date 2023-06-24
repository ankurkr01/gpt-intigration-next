import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";
import { ChatGPTMessage, OpenAIStream, OpenAIStreamPayload } from "@/lib/openai-stream";
import { MesageArraySchema } from "@/lib/validators/message";
import { NextResponse } from "next/server";
 

export async function POST(req:Request){
 
    const {messages} = await req.json();
 
    const parsedMessages = MesageArraySchema.parse(messages)
 
    const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message)=>({

        role: message.isUserMessage? 'user': 'system',
        content: message.text
    }))

    outboundMessages.unshift({
        role:'system',
        content: chatbotPrompt
    })

    const payload:OpenAIStreamPayload = {
        model : 'gpt-3.5-turbo',
        messages: outboundMessages,
        temperature: 0.4,
        top_p:1,
        frequency_penalty:0,
        presence_penalty:0,
        max_tokens:150,
        stream:true,
        n:1
    }

    const stream = await OpenAIStream(payload)
    console.log(stream);
    
    return NextResponse.json(stream)
   
    // return new Response(stream)

}