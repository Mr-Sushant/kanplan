import Topbar from "./Topbar"
import BoardInterface from "./BoardInterface"
import { useParams } from "react-router-dom"
import useStore from '../../store';

const BoardScreen = () => {
  const {boardId} = useParams();
  const {boards} = useStore();

  const board = boards.find(x => x.id === boardId);
  console.log(board);
  console.log(boardId);
  return (
    <>
        <Topbar {...board}/>
        <BoardInterface />
    </>
  )
}

export default BoardScreen
