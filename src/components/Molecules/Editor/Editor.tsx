import React, { useRef } from 'react';
import * as Quill from 'quill';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

type Props = {
  width?: number;
  height?: number;
  placeholder?: string;
};

//TODO: register image drag & drop module from somewhere.
//Quill.Quill.register()

const Editor = (props: Props) => {
  const ref = useRef<ReactQuill | null>(null);

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      if (input.files) {
        let file = input.files[0];
        let formData = new FormData();

        formData.append('file', file);

        if (ref.current) {
          let quillObj = ref.current.getEditor();

          console.log(file);

          const range = quillObj.getSelection();
          if (range) {
            //TODO: image handling from server.
            const url = 'https://picsum.photos/200';
            quillObj.insertEmbed(range.index, 'image', url);
          }
        }
      }
    };
  };

  const Module: Quill.StringMap = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['clean'],
        [{ align: [] }],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  return <QuillEditor ref={ref} {...props} modules={Module} />;
};

const QuillEditor = styled(ReactQuill)<{ width?: number; height?: number }>`
  width: ${({ width }) => `${width}px` || '100%'};
  height: ${({ height }) => `${height}px` || '100%'};
`;

export default Editor;
