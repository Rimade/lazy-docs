'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { Id } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';
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
} from './ui/alert-dialog';

interface RemoveDialogProps {
	documentId: Id<'documents'>;
	children: React.ReactNode;
}

export function RemoveDialog({ documentId, children }: RemoveDialogProps) {
	const remove = useMutation(api.documents.removeById);
	const update = useMutation(api.documents.updateById);
	const [isRemoving, setIsRemoving] = useState(false);
	const [isRenaming, setIsRenaming] = useState(false);

	const onRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsRemoving(true);
		await remove({ id: documentId });
		setIsRemoving(false);
	};

	const onRename = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsRenaming(true);
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

			<AlertDialogContent onClick={(e) => e.stopPropagation()}>
				<AlertDialogHeader>
					<AlertDialogTitle>Remove Document</AlertDialogTitle>

					<AlertDialogDescription>
						Are you sure you want to remove this document?
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel onClick={(e) => e.stopPropagation()}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction onClick={(e) => onRemove(e)} disabled={isRemoving}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}