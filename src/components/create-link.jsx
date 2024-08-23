import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { UrlState } from '@/context';
import React, { useEffect, useRef, useState } from 'react'
import { QRCode } from 'react-qrcode-logo';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import * as yup from "yup";
import { createUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
    const ref  =useRef()
    const {user} = UrlState();
    const navigate = useNavigate();
    let [searchParms,setSearchParms] = useSearchParams();
    const longLink = searchParms.get("createNew");
   
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });


  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, {...formValues, user_id: user.id});

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }

  }, [error, data]);

  const createNewLink = async () => {
    setErrors([]);
    try {
      await schema.validate(formValues, {abortEarly: false});

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
    defaultOpen={longLink}
    onOpenChange={(res) => {
        if(!res) setSearchParms({});
    }}
    >
    <DialogTrigger>
        <Button variant = "destructive">Create New Link</Button>
    </DialogTrigger>
    <DialogContent className= "sm:max-w-md">
        <DialogHeader>
        <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
        {formValues?.longUrl && <QRCode value={formValues?.longUrl} ref={ref} size={150} />}
       <div className="flex flex-col gap-4">
       <Input  id = "title"  placeholder = "short Link's Title "  value={formValues.title}  onChange={handleChange}/>
       {errors.title && <Error message={errors.title} />}

         <Input  id = "longUrl"  placeholder = "Enter your Long URL"  value={formValues.longUrl} onChange={handleChange}/>
         {errors.longUrl && <Error message={errors.longUrl} />}
         <div className="flex items-center gap-4">
        <Card className="  p-2 pr-3 text-sm min-w-0 ">
            <div className="h-6 truncate">trimmr-neon.vercel.app</div>
        </Card>
        <span>/</span>
        <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            className="flex-1 min-w-0 h-10 "
            value={formValues.customUrl}
            onChange={handleChange}
        />
    </div>
    </div>
    {error && <Error message={errors.message} />}
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default CreateLink