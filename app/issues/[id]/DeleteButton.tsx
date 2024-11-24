'use client';
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import  Spinner  from '../../components/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props{
    id : Number
}
const DeleteButton = ({id} : Props) => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const[isDeleting, setIsDeleting] = useState(false)
  return (
    <>
    <AlertDialog.Root>
	<AlertDialog.Trigger >
		<Button  disabled = {isDeleting} color="red"><TrashIcon /> Delete Issue {isDeleting && <Spinner/>} </Button>
	</AlertDialog.Trigger>
	<AlertDialog.Content maxWidth="450px">
		<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
		<AlertDialog.Description size="2">
			Are you sure you want to delete this issue?
            This action cannot be undone.
		</AlertDialog.Description>
        <Flex mt= '4' gap='4'>
            <AlertDialog.Cancel>
                <Button color='gray' variant='soft'>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
            <Button
                onClick={async () => {
                    setIsDeleting(true)
                    try {
                        await axios.delete('/api/issues/' + id);
                        router.push('/issues');
                        router.refresh();
                        setIsDeleting(true)
                    } catch (error) {
                        setIsDeleting(false);
                        setError(true)
                    }
                }}
                color="red"
                >Delete Issue</Button>
            </AlertDialog.Action>
        
        </Flex>
		
	</AlertDialog.Content>
</AlertDialog.Root>
   <AlertDialog.Root open={error}>
   <AlertDialog.Content>
     <AlertDialog.Title>Error</AlertDialog.Title>
     <AlertDialog.Description>
       This issue could not be deleted.
     </AlertDialog.Description>
     <Button
       color="gray"
       variant="soft"
       mt="2"
       onClick={() => setError(false)}
     >
       OK
     </Button>
   </AlertDialog.Content>
 </AlertDialog.Root>
 </>
  )
}
export default DeleteButton
