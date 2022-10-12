import { atom } from 'recoil';

type myBoards = {
  bookmark : boolean;
  history: boolean
}

const myBoardAtom = atom<myBoards>({
  key: 'atom/bookmark',
  default: {
    bookmark: false,
    history: false
  },
});

export default myBoardAtom;
