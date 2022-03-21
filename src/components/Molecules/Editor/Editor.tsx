import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import { IUser } from '@src/typings/User';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

type Props = {
  width?: number;
  height?: number;
  placeholder?: string;
};

const Module = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
      [{ align: [] }],
    ],
    readOnly: false,
    theme: 'snow',
  },
};

type EditorState = {
  title: string;
  tags?: any;
  content: Array<{ insert: string; attributes: any }>;
  user: IUser | null;
};

const Editor = ({ width, height, placeholder }: Props) => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const quillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

    const imageDropHandler = (imageDataUrl: string, type: string, imageData: any) => {
      const file = imageData.toFile();

      // generate a form data
      const formData = new FormData();

      // or just append the file
      formData.append('file', file);
      if (quill) {
        let index = (quill.getSelection() || {}).index;
        if (index === undefined || index < 0) index = quill.getLength();
        const url = 'https://picsum.photos/200';

        quill.insertEmbed(index, 'image', url);
      }
    };

    const imageHandler = (clicked: boolean) => {
      if (clicked) {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
          if (input.files && quill) {
            let file = input.files[0];
            let formData = new FormData();
            formData.append('file', file);
            let index = (quill.getSelection() || {}).index;
            if (index === undefined || index < 0) index = quill.getLength();
            const url = 'https://picsum.photos/200';

            quill.insertEmbed(index, 'image', url);
          }
        };
      }
    };

    const quill = new Quill('#editor', {
      modules: {
        ...Module,
        imageDropAndPaste: {
          handler: imageDropHandler,
        },
      },
      placeholder: placeholder,
      readOnly: false,
      theme: 'snow',
    });
    quill.getModule('toolbar').addHandler('image', imageHandler);

    quill.on('text-change', () => {
      const { ops } = quill.getContents();
      //content information.
      const converter = new QuillDeltaToHtmlConverter(ops, {});
      console.log(converter.convert());
    });
  }, [placeholder]);

  return (
    <div
      id="editor"
      style={{ width, height }}
      ref={quillRef}
      onChange={() => {
        console.log('test');
      }}
    />
  );
};

export default Editor;
