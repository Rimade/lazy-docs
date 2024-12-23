'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { SiGoogledocs } from 'react-icons/si';
import { Doc } from '../../../convex/_generated/dataModel';
import { Building2Icon, CircleUserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DocumentMenu } from './document-menu';
import { useRouter } from 'next/navigation';

interface DocumentRowProps {
	document: Doc<'documents'>;
}

export default function DocumentRow({ document }: DocumentRowProps) {
	const router = useRouter();

	const onNewTabClick = (id: string) => {
		window.open(`/documents/${id}`, '_blank');
	};

	return (
		<TableRow className="cursor-pointer">
			<TableCell className="w-[50px]">
				<SiGoogledocs className="size-6 fill-blue-500" />
			</TableCell>

			<TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>

			<TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
				{document.organizationId ? (
					<Building2Icon className="size-4" />
				) : (
					<CircleUserIcon className="size-4" />
				)}
				{document.organizationId ? 'Organization' : 'Personal'}
			</TableCell>

			<TableCell className="text-muted-foreground hidden md:table-cell">
				{format(document._creationTime, 'MMM dd, yyyy')}
			</TableCell>

			<TableCell className="flex justify-end">
				<DocumentMenu
					documentId={document._id}
					title={document.title}
					onNewTab={onNewTabClick}
				/>
			</TableCell>
		</TableRow>
	);
}