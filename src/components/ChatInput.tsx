"use client"

import { cn } from '@/lib/utils'
import { Message } from '@/lib/validators/message'
import { useMutation } from '@tanstack/react-query'
import { nanoid } from 'nanoid'
import { FC, HTMLAttributes, useRef, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import { headers } from 'next/headers';
interface ChatInputProps extends HTMLAttributes<HTMLDivElement> {
  
}


const ChatInput: FC<ChatInputProps> = ({className, ...props}) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
   const [input, setInput] = useState<string>('')

   const {mutate:sendMessage, isLoading} = useMutation({
    // mutationKey: ['sendMessage'],
    mutationFn: async(message:Message)=>{
        const response = await fetch('/api/message',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({messages:[message] })
        })
 
        
        return response.body;
    },
    onSuccess: ()=>{
        console.log('success');
    }
   })
    
  return <div {...props} className={cn('border-t border-zinc-300', className)} >
    <div className='relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none'>
        <ReactTextareaAutosize 
        ref={textareaRef}
        rows={2}
        onKeyDown={(e)=>{
            if(e.key === 'Enter' && !e.shiftKey){
                e.preventDefault()
                const message:Message = {
                    id:nanoid(),
                    isUserMessage: true,
                    text: input
                }
                sendMessage(message)
            }
        }}
        maxRows={5}
        autoFocus
        value={input}
        onChange={(e)=>{setInput(e.target.value)}}
        placeholder='write a message...'
        className='peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-grey-900 focus:ring-0 text-sm sm:leading-6'
         />
    </div>
  </div>
}

export default ChatInput