import { useEffect, useState } from 'react';

interface Props {
  content: string;
}
const useCommentRegex = ({ content }: Props) => {
  const [text, setText] = useState('');
  useEffect(() => {
    if (content !== '') {
      let regex = /@\[.+?\]\{.+?\}/gm;
      let displayRegex = /@\[.+?\]/g;
      let idRegex = /\{.+?\}/g;
      let matches = content.match(regex);
      let arr: { id: string; display: string }[] = [];
      matches &&
        matches.forEach((m: any) => {
          let id = m.match(idRegex)[0].replace('{', '').replace('}', '');
          let display = m.match(displayRegex)[0].replace('@[', '@').replace(']', '');

          arr.push({ id, display });
        });
      let newComment = content.split(regex);
      let output = '';
      for (let i = 0; i < newComment.length; i++) {
        const c = newComment[i];
        if (i === newComment.length - 1) output += c;
        else
          output +=
            c +
            `<span style=
          "color: #476CFF"
        }}>${arr[i].display}</span>`;
      }
      setText(output);
    }
  }, [content]);

  return text;
};

export default useCommentRegex;
