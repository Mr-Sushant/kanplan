import Topbar from "./Topbar"
import BoardInterface from "./BoardInterface"
import { useParams } from "react-router-dom"
import useStore from '../../store';
import { useMemo, useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import useApp from "../../hooks/useApp";
import AppLoader from '../../components/layout/AppLoader';

const BoardScreen = () => {
  const {boardId} = useParams();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const {boards, areBoardsFetched} = useStore();
  const navigate = useNavigate();
  const board = useMemo(() => boards.find(x => x.id === boardId),[]);
  const boardData = useMemo(() => data, [data]);
  const {fetchBoard} = useApp();

  const handleLastUpdated = useCallback(() => setLastUpdated(new Date().toLocaleString("en-US")),[]);

  const handleFetchBoard = async() => {
    try{
      const boardData = await fetchBoard(boardId);
      if(boardData){
        const {lastUpdated, tabs} = boardData
        setData(tabs);
        setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
        setLoading(false);
      }
    } catch(e){
      console.log(e);
    }
  };

  useEffect(() => {
    if(!areBoardsFetched || !board){
      navigate('/boards');
    }
    else{
      handleFetchBoard();
    }
  },[])

  if(loading) return <AppLoader/>
  if(!board) return null;

  return (
    <>
        <Topbar {...board} lastUpdated={lastUpdated}/>
        <BoardInterface boardData={boardData} boardId={boardId} updateLastUpdated = {handleLastUpdated}/>
    </>
  )
}

export default BoardScreen
