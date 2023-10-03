import {useCallback, useState} from 'react'
import { Grid} from '@mui/material'
import Tab from './Tab'
import AddTaskModal from './AddTaskModal';
import useApp from '../../hooks/useApp';
import { DragDropContext } from 'react-beautiful-dnd';
import AppLoader from '../../components/layout/AppLoader';
import useStore from '../../store';
import ShiftTaskModal from './ShiftTaskModal';

const statuses = {
  todos: 'TODOs',
  progress: 'In Progress',
  completed: 'Completed'
}

const BoardInterface = ({boardData, boardId, updateLastUpdated}) => {
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState('');
  const [shiftTask, setShiftTask] = useState(null);
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const {updateBoard} = useApp();
  const {setToastr} = useStore();

  const handleOpenAddTaskModal = useCallback((status) => setAddTaskTo(status),[]);

  const handleOpenShiftTaskModal = useCallback(
    (task) => setShiftTask(task),
    []
  );

  console.log({shiftTask})

  const handleUpdateBoardData = async (clonedTabs) =>{
    setLoading(true);
        await updateBoard(boardId, clonedTabs);
        setTabs(clonedTabs);
        updateLastUpdated();
        setToastr('Board updated successfully');
  }

  const handleAddTask = async (text) => {
    const clonedTabs = structuredClone(tabs);
    clonedTabs[addTaskTo].unshift({text, id: crypto.randomUUID()});
    try{
      await handleUpdateBoardData(clonedTabs)
      setAddTaskTo('');
      
    } catch(e){
      console.log(e);
    } finally{
      setLoading(false);
    }
  };


  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const clonedTabs = structuredClone(tabs);
      const taskIdx = clonedTabs[tab].findIndex((t) => t.id === taskId);
      clonedTabs[tab].splice(taskIdx, 1);
      try {
       await handleUpdateBoardData(clonedTabs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [tabs]
  );

  const handleShiftTask = async (newStatus) => {
    const oldStatus = shiftTask.status;
    if (newStatus === oldStatus) return setShiftTask(null);
    const dClone = structuredClone(tabs);

    // remove the el from arr 1
    const [task] = dClone[oldStatus].splice(shiftTask.index, 1);

    // add it to the arr 2
    dClone[newStatus].unshift(task);

    try {
      await handleUpdateBoardData(dClone);
      setShiftTask(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

    const handleDND = async ({destination, source}) => {
      if(!destination) return; // EDGE CASE
      else if((destination.droppableId === source.droppableId) && (destination.index === source.index)) return; // EDGE CASE

      const clonedTabs = structuredClone(tabs);
      const [draggedTask] = clonedTabs[source.droppableId].splice(source.index, 1);

      clonedTabs[destination.droppableId].splice(destination.index, 0, draggedTask);

      try{
       await handleUpdateBoardData(clonedTabs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if(loading) return <AppLoader/>

  return (
    <>
      {/* {!!shiftTask && <ShiftTaskModal 
      shiftTask={handleShiftTask}
      task={shiftTask} 
      statuses={statuses} 
      onClose={() => setShiftTask(null)}/>} */}

        {!!addTaskTo && <AddTaskModal 
        tabName={statuses[addTaskTo]} 
        onClose={() => setAddTaskTo('')} 
        addTask={handleAddTask} 
        loading={loading}/>}


        <DragDropContext onDragEnd={handleDND}>
        <Grid container px={4} mt={2} spacing={2}>
            {Object.keys(statuses).map(status => (
              <Tab key={status}
              status={status}
              tasks={tabs[status]}
              name={statuses[status]}
              openAddTaskModal={handleOpenAddTaskModal}
              openShiftTaskModal={handleOpenShiftTaskModal}
              removeTask={handleRemoveTask}/>
            ))}
        </Grid>
        </DragDropContext>
    </>
  )
}

export default BoardInterface
