import { useEffect, useState } from 'react';

interface Props {
  chat: any;
}
const useCommentRegex = ({ chat }: Props) => {
  const [text, setText] = useState('');
  useEffect(() => {
    if (chat !== '') {
      let regex = /@\[.+?\]\{.+?\}/gm;
      let displayRegex = /@\[.+?\]/g;
      let idRegex = /\{.+?\}/g;
      let matches: any = chat.match(regex);
      let arr: { id: string; display: string }[] = [];
      matches &&
        matches.forEach((m: any) => {
          let id = m.match(idRegex)[0].replace('{', '').replace('}', '');
          let display = m.match(displayRegex)[0].replace('@[', '@').replace(']', '');

          arr.push({ id, display });
        });
      let newComment = chat.split(regex);
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
  }, [chat]);

  return text;
};

export default useCommentRegex;
