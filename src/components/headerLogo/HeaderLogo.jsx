import { Box, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
export const HeaderLogo=({handleClose})=>{
    return(
        <Box sx={{display:"flex",justifyContent:"space-between",borderBottom:1,borderColor:'divider',p:2}}>
          <Box sx={{ width: "120px", height: "50px" }}>
              <img src='/aseets/logo-digital-educa.png' style={{ width: "100%", height: "100%" }} />
            </Box>
            <IconButton onClick={handleClose}>
            <CloseIcon/>
            </IconButton>
        </Box>
    )
}