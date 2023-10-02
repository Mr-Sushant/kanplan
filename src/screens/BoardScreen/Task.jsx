import { Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const Task = ({text, id}) => {
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
        <Typography p={1}
        border='1px solid'
        borderColor='#777980'
        bgcolor='#45474E'
        width='100%'
        >{text}</Typography>
        <IconButton><DeleteIcon/></IconButton>
    </Stack>
  )
}

export default Task
