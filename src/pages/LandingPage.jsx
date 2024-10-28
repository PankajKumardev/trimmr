import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { useNavigate } from 'react-router-dom'

function LandingPage() {
    const navigate = useNavigate();
    const [longURl,setLongURl] = useState()
    const handleShorten = (e) =>{
        e.preventDefault()
        if(longURl){
            navigate(`./auth?createNew=${longURl}`)
        }
   }
  return (
    <div className='flex flex-col items-center'>
    <h2 className="my-10 sm:my-16 text-4xl sm:text-6xl lg:text-7xl text-[#176B87] text-center font-extrabold">
    <h1 className='text-[#5B9A8B]'> Where long URLs</h1> meet their match!⚡️</h2>

    <form  className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2 m-10" onSubmit={handleShorten}>
    <Input
    type="url"
    placeholder="Paste your epic URL adventure here 🌍✨"
    value={longURl}
    onChange={(e) => setLongURl(e.target.value)}
    className="h-full flex-1 py-4 px-4 placeholder:text-indigo-400 text-white bg-[#0F172A] "/>

    <Button className="h-full bg-yellow-300 text-gray-900 font-bold rounded-md hover:bg-yellow-400 hover:scale-105 transform transition duration-300 ease-in-out">
        Slice It! 🍰
    </Button>
    </form>
    
    <p className="mt-2 text-slate-400 text-center text-xl font-semibold mb-10">
  Shorten your URLs effortlessly and make sharing a breeze. ✨
</p>

<div class=" opacity-70 mt-12 justify-center flex items-center flex-col text-slate-200"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse  animate-bounce"><rect x="5" y="2" width="14" height="20" rx="7"></rect><path d="M12 6v4"></path></svg><span class="text-sm font-medium">Scroll Down</span></div>

    <div className='mt-20 w-full h-full mb-20'>
    <Accordion type="multiple" collapsible className="w-full md:px-11">  
  <AccordionItem value="item-1">
    <AccordionTrigger>
      What’s the magic behind the Trimrr URL shortener?
    </AccordionTrigger>
    <AccordionContent>
      When you enter a long URL, our system generates a shorter version of that URL. This shortened URL redirects to the original long URL when accessed.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger>
      Is an account necessary to use Trimrr?
    </AccordionTrigger>
    <AccordionContent>
      Yes. Creating an account allows you to manage your URLs, view analytics, and customize your short URLs.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger>
      What insights can I gain from my shortened URLs?
    </AccordionTrigger>
    <AccordionContent>
      You can view the number of clicks, geolocation data of the clicks, and device types (mobile/desktop) for each of your shortened URLs.
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4">
    <AccordionTrigger>
      Can I customize the short URLs to match my branding?
    </AccordionTrigger>
    <AccordionContent>
      Absolutely! Trimrr allows you to create custom short URLs with your preferred branding, making it easier to maintain a cohesive look across your digital presence.
    </AccordionContent>
  </AccordionItem>
</Accordion>

    </div>
    </div>
  )
}

export default LandingPage
