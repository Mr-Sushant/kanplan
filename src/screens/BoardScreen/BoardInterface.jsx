import React, {useState} from 'react'
import { Grid, Stack, Typography, IconButton } from '@mui/material'
import Tab from './Tab'
import AddTaskModal from './AddTaskModal';
import useApp from '../../hooks/useApp';

const statuses = {
  todos: 'TODOs',
  progress: 'In Progress',
  completed: 'Completed'
}

const BoardInterface = ({boardData, boardId}) => {
  const [addTaskTo, setAddTaskTo] = useState('');
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const {updateBoard} = useApp();


  const handleAddTask = async (text) => {
    const clonedTabs = structuredClone(tabs);
    clonedTabs[addTaskTo].unshift({text, id: crypto.randomUUID()});
    try{
      await updateBoard(boardId, clonedTabs);
      setTabs(clonedTabs);
      setAddTaskTo('');
    } catch(e){
      console.log(e);
    }
  };

  return (
    <>
        {!!addTaskTo && <AddTaskModal tabName={statuses[addTaskTo]} onClose={() => setAddTaskTo('')} addTask={handleAddTask}/>}
        <Grid container px={4} mt={2} spacing={2}>
            {Object.keys(statuses).map(status => (
              <Tab key={status} tasks={tabs[status]} name={statuses[status]} addTask={() => setAddTaskTo(status)}/>
            ))}
        </Grid>
    </>
  )
}

export default BoardInterface
