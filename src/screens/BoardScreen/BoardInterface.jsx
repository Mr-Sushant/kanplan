import {useCallback, useState} from 'react'
import { Grid} from '@mui/material'
import Tab from './Tab'
import AddTaskModal from './AddTaskModal';
import useApp from '../../hooks/useApp';
import { DragDropContext } from 'react-beautiful-dnd';


const statuses = {
  todos: 'TODOs',
  progress: 'In Progress',
  completed: 'Completed'
}

const BoardInterface = ({boardData, boardId, updateLastUpdated}) => {
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState('');
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const {updateBoard} = useApp();

  const handleOpenAddTaskModal = useCallback((status) => setAddTaskTo(status),[]);

  const handleAddTask = async (text) => {
    const clonedTabs = structuredClone(tabs);
    console.log("before adding----------- ",clonedTabs);
    clonedTabs[addTaskTo].unshift({text, id: crypto.randomUUID()});
    try{
      setLoading(true);
      await updateBoard(boardId, clonedTabs);
      setTabs(clonedTabs);
      console.log("after adding----------- ",clonedTabs);
      setAddTaskTo('');
      updateLastUpdated();
      
    } catch(e){
      console.log(e);
    } finally{
      setLoading(false);
    }
  };


  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const dClone = structuredClone(tabs);
      console.log("before deleting----------- ",dClone);
      const taskIdx = dClone[tab].findIndex((t) => t.id === taskId);
      dClone[tab].splice(taskIdx, 1);
      console.log("after deleting----------- ",dClone);
      try {
        await updateBoard(boardId, dClone);
        setTabs(dClone);
        updateLastUpdated();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [tabs]
  );


    const handleDND = async ({destination, source}) => {
      if(!destination) return; // EDGE CASE
      else if((destination.droppableId === source.droppableId) && (destination.index === source.index)) return; // EDGE CASE

      const dClone = structuredClone(tabs);
      const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);

      dClone[destination.droppableId].splice(destination.index, 0, draggedTask);

      try{
        await updateBoard(boardId, dClone);
        setTabs(dClone);
        updateLastUpdated();
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <>
        {!!addTaskTo && <AddTaskModal tabName={statuses[addTaskTo]} onClose={() => setAddTaskTo('')} addTask={handleAddTask} loading={loading}/>}
        <DragDropContext onDragEnd={handleDND}>
        <Grid container px={4} mt={2} spacing={2}>
            {Object.keys(statuses).map(status => (
              <Tab key={status} status={status} tasks={tabs[status]} name={statuses[status]} removeTask={handleRemoveTask} openAddTaskModal={handleOpenAddTaskModal}/>
            ))}
        </Grid>
        </DragDropContext>
    </>
  )
}

export default BoardInterface
