import React, {useState} from 'react'
import { Dialog, Stack, Typography, Box, Button, TextField } from '@mui/material';
import ModalHeader from '../../components/layout/ModalHeader';
import { colors } from '../../theme';


const CreateBoardModal = ({open, handleClick}) => {
    const [boardName, setBoardName] = useState('');
    const [boardColor, setBoardColor] = useState(0);

    
  return (
    <Dialog open={open} onClose={handleClick} fullWidth maxWidth="xs">
       <Stack p={2}>
        <ModalHeader title="Create Board" onClose={handleClick}/>
        <Stack my={5}  spacing={3}>
            <TextField value={boardName} onChange={(e) => setBoardName(e.target.value)} label="Board Name"/>
            <Stack direction='row' spacing={1.5}>
                <Typography>Color: </Typography>
                
                    {colors.map((clr,index) => (
                        <Box
                            sx={{cursor:'pointer',
                                 border: boardColor === index  ? "3px solid #383838" : "",
                                 outline: `2px solid ${clr}` 
                                }}
                            onClick={() =>setBoardColor(index)} 
                            key={clr}
                            height={30}
                            width={30}
                            backgroundColor={clr}
                            borderRadius="50%"
                        />
                    ))}
                
            </Stack>
        </Stack>
        <Button variant='contained' size='large'>Create</Button>
       </Stack>
    </Dialog>
  )
}

export default CreateBoardModal
