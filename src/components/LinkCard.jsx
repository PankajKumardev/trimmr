import { Copy, Delete, Download, LinkIcon, Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import useFetch from '@/hooks/use-fetch'
import { deleteUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'


const LinkCard = ({url,fetchUrls}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`https://trimmrr.vercel.app/${url?.short_url}`);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 900);
  };


  const downloadImage = () => {
    const imageUrl = url?.qr;
    const filename = url?.title;

    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = filename;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor)
  }


  const {loading : loadingDelete , fn: fnDelete} = useFetch(deleteUrl,url?.id)

  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-[#121d28] rounded-lg'>
        <img src={url?.qr} alt="qr code" 
        className="h-32 object-contain ring ring-gray-400 self-start"
        />

        <Link to={`/link/${url?.id}`} className="flex flex-col flex-1 ">
        <span className="text-3xl font-bold hover:underline cursor-pointer mb-1 text-[#5B99C2]">
          {url?.title}
        </span>
        <span className="text-xl text-slate-300 font-bold hover:underline cursor-pointer mt-1 mb-1">
        https://trimmrr.vercel.app/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className="flex items-center gap-1 hover:underline cursor-pointer text-slate-300 ">
          <LinkIcon className="p-1 ml-[-5px]" />
          {url?.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1 text-gray-300">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

    <div className='flex'>
    <div className="relative">
      <Button variant="ghost" onClick={handleCopyClick} className="flex items-center">
        <Copy />
      </Button>
      {isCopied && (
        <p className="text-green-500 mt-2 absolute ">
          Copied successfully!
        </p>
      )}
    </div>


      <Button  variant= "ghost" onClick={downloadImage}>
        <Download />
      </Button>

      <Button  variant= "ghost"
      onClick={ () => 
        fnDelete().then( () => {
          fetchUrls()
        } )
      }>
       { loadingDelete?<BeatLoader size={5} color='white'/> : <Trash/>}
      </Button>
    </div>

    </div>
  )
}

export default LinkCard