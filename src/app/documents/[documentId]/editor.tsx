'use client';

import StarterKit from '@tiptap/starter-kit';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Underline from '@tiptap/extension-underline';
import ImageResize from 'tiptap-extension-resize-image';
import { useEditor, EditorContent } from '@tiptap/react';
import { useEditorStore } from '@/store/use-editor-store';

export const Editor = () => {
	const { setEditor } = useEditorStore();

	const editor = useEditor({
		onCreate: ({ editor }) => setEditor(editor),
		onDestroy: () => setEditor(null),
		onUpdate: ({ editor }) => setEditor(editor),
		onSelectionUpdate: ({ editor }) => setEditor(editor),
		onTransaction: ({ editor }) => setEditor(editor),
		onFocus: ({ editor }) => setEditor(editor),
		onBlur: ({ editor }) => setEditor(editor),
		onContentError: ({ editor }) => setEditor(editor),

		editorProps: {
			attributes: {
				style: 'padding-left: 56px; padding-right: 56px;',
				class:
					'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
			},
		},
		extensions: [
			StarterKit,
			FontFamily,
			TextStyle,
			Underline,
			Table,
			TableCell,
			ImageResize,
			TableHeader,
			TableRow,
			TaskItem.configure({
				nested: true,
			}),
			TaskList,
		],
		autofocus: true,
		immediatelyRender: false,
		content: `
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>

        <p>This is a basic example of implementing images. Drag to re-order.</p>
        <img src="https://placehold.co/800x400" />
      `,
	});

	return (
		<div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible">
			<div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
};