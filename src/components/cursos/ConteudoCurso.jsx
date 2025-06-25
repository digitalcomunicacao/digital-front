import { Box, Button, Chip, Grid, Typography } from "@mui/material"

export const ConteudoCurso=({curso})=>{
    console.log(curso)
    return(
        <>
        <Grid container>
        <Grid size={{ xs: 12, md: 8 }} >
        {curso.modulos.map((modulo,index)=>(
        <Box sx={{display:"flex",flexDirection:"column",mb:5,width: { xs: "100%", md: "90%" }}}>
         <Typography color="textSecondary">Nivel {modulo.id}</Typography>
         <Typography color="textPrimary" sx={{fontWeight:"bolder",fontSize:20}}>Fundamentos do Angular</Typography>
         <Box sx={{border:1,borderColor:'divider',mt:2,p:3,borderRadius:5}}>
            <Box sx={{display:"flex",gap:1,flexDirection:{xs:"column",md:"row"}}}>
             <Typography color="textPrimary" sx={{fontWeight:"bolder",fontSize:18}}>{modulo.titulo}</Typography>
             <Box sx={{display:"flex",gap:2}}>
                       <Chip
                    label="Módulo"
                    size="small"
                    sx={{
                       
                        top: 12,
                        left: 12,
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        fontWeight: "bold",
                    }}
                />
                        <Chip
                    label={modulo.videos.length+" Aulas"}
                    size="small"
                    sx={{
                       
                        top: 12,
                        left: 12,
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        fontWeight: "bold",
                    }}
                />
                  </Box>
            </Box>
         <Typography color="textSecondary" sx={{mt:2}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam sunt totam iure, maiores, voluptas magnam quod voluptate magni, deserunt doloribus repellendus fugit quidem at hic nemo possimus id eum ullam earum! Ab vero facere et tenetur odio cum laborum, doloremque autem voluptatem possimus natus nostrum sint quis nesciunt pariatur quas?</Typography>
         </Box>
        </Box>
               ))}
               </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                <Box
                    sx={{
                        mt: { xs: 10, md: 0 },
                        height: "220px",
                        border: 1,
                        borderColor: "divider",
                        p: 3,
                        borderRadius: 5,

                    }}
                >
                    <Typography color="textPrimary" sx={{ fontWeight: "bolder", fontSize: 16 }}>
                        Inicie sua jornada na programação
                    </Typography>
                    <Typography color="textSecondary" sx={{ fontSize: 16, mt: 2 }}>
                        Inicie sua jornada na programação com um curso gratuito.
                    </Typography>
                    <Button fullWidth variant="contained" sx={{ boxShadow: "0 12px 32px rgba(255, 184, 0, 0.4)", fontWeight: "bolder", fontSize: 18, mt: 2 }}>
                        Começar Jornada
                    </Button>
                </Box>
            </Grid>
               </Grid>
        </>
      
    )
}