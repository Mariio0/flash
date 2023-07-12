import React from 'react';
import Button from './Button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ConfirmDialog = ({ onClick }) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button
					text='Delete'
					style={
						'text-xl sm:text-2xl text-rose-600 rounded-full bg-rose-100 border border-rose-400 hover:border-rose-500 hover:bg-rose-50 '
					}
				/>
			</AlertDialogTrigger>
			<AlertDialogContent className={'bg-zinc-50 text-cl3'}>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						flashcards and remove the data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='bg-cl3 text-cl1 font-bold'>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction onClick={onClick} className='border border-cl3'>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ConfirmDialog;
