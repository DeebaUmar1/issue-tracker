'use client';
import React, { useState } from 'react'
import { TextField, Button, Callout, Text} from '@radix-ui/themes'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/ValidationSchemas';
import {z} from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@prisma/client';


type IssueFormData = z.infer<typeof createIssueSchema>


const IssueForm = ({issue} : {issue?:Issue | null}) => {
    const [error, setError] = useState("");
    const[isSubmitting, setIsSubmitting] = useState(false)
    const onSubmit = async (data: IssueFormData) => {
        try {
            console.log('Submitting data:', data);
            setIsSubmitting(true)
            if(issue)
            {
                const response = await axios.patch('/api/issues/'+ issue.id, data)
                if (response.status === 200 || response.status === 201) {
                    router.push('/issues'); 
                    router.refresh();
                } 
                else {
                    setIsSubmitting(false);
                    setError(response.statusText);
                    }
            }
            else
            {
                const response2 = await axios.post('/api/issues', data);
                if (response2.status === 200 || response2.status === 201) {
                    router.push('/issues'); 
                    router.refresh();
                }
                else {
                    setIsSubmitting(false);
                    setError('An unexcepted error occured');
                    }
            }
            
        } catch (error) {
            setIsSubmitting(true);
            setError('An unexcepted error occured');
        }
    };
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>(
        {resolver: zodResolver(createIssueSchema)}
        );
          
    const router = useRouter();
   
  return (
    <div className='max-w-xl'>
        {error && <Callout.Root color='red' className='mb-5'>
	<Callout.Text>
		{error}
	</Callout.Text>
    </Callout.Root>}
   
    <form  className='max-w-xl space-y-3' 
    onSubmit={handleSubmit(async (data) => { onSubmit(data)})}>
     <TextField.Root
          {...register('title')} 
          placeholder="Title"
          defaultValue={issue?.title}
      >
      </TextField.Root>
      <ErrorMessage>{errors.title?.message}</ErrorMessage>
      {/* Description Field */}
      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE
            {...field}
            placeholder="Description"
            
          />
        )}
        
      />
       <ErrorMessage>{errors.description?.message}</ErrorMessage>
    <Button disabled = {isSubmitting}> {issue ? "Update Issue" : "Submit New Issue "} {isSubmitting && <Spinner/>} </Button>
    </form>
    </div>
  )
}

export default IssueForm
