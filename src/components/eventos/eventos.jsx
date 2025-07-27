import { Box, Grid, Typography, useTheme } from "@mui/material"
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
export const Eventos = () => {
    const theme = useTheme()
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, border: 1, borderColor: "divider", borderRadius: 3, mb: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", borderRight: 1, borderColor: "divider" }}>
                        <Box sx={{ bgcolor: theme.palette.lancamentos, p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, width: { xs: "50%", md: "100%" } }}>
                                <Typography sx={{ fontWeight: "bolder", color: theme.palette.text.tertiary, textAlign: "center" }}>Curso</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ px: 5, pb: 2, alignItems: "center", justifyContent: "center", gap: 10, display: { xs: "flex", md: "unset" } }}>
                            <Typography sx={{ fontSize: 58, fontWeight: "bolder" }}>18</Typography>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CalendarTodayOutlinedIcon />
                                    <Typography>Julho</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                    <CalendarTodayOutlinedIcon />
                                    <Typography>08:30</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ p: { xs: 2, md: 3}}}>
                        <Typography sx={{ fontWeight: "bolder", fontSize: 18}}> Lorem Ipsum is simg and typesetting industry</Typography>
                        <Typography color="textSecondary" sx={{ mt: 1, fontSize: 13 }}>Crie um projeto completo do zero e alcance o próximo<br />
                            nível em programação, em apenas uma semana.</Typography>
                    </Box>
                    <Box>
                        
                    </Box>
                    <Box sx={{ width: "100%", height: "100%"}}>
                        <img
                            src="/aseets/banner.png"
                            alt="Banner"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                display: "block",
                                borderRadius: "0px 15px 1px 0px"
                            }}
                        />
                    </Box>


                </Box>
                            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, border: 1, borderColor: "divider", borderRadius: 3, mb: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", borderRight: 1, borderColor: "divider" }}>
                        <Box sx={{ bgcolor: theme.palette.lancamentos, p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, width: { xs: "50%", md: "100%" } }}>
                                <Typography sx={{ fontWeight: "bolder", color: theme.palette.text.tertiary, textAlign: "center" }}>Curso</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ px: 5, pb: 2, alignItems: "center", justifyContent: "center", gap: 10, display: { xs: "flex", md: "unset" } }}>
                            <Typography sx={{ fontSize: 58, fontWeight: "bolder" }}>18</Typography>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CalendarTodayOutlinedIcon />
                                    <Typography>Julho</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                    <CalendarTodayOutlinedIcon />
                                    <Typography>08:30</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ p: { xs: 2, md: 3}}}>
                        <Typography sx={{ fontWeight: "bolder", fontSize: 18}}> Lorem Ipsum is simg and typesetting industry</Typography>
                        <Typography color="textSecondary" sx={{ mt: 1, fontSize: 13 }}>Crie um projeto completo do zero e alcance o próximo<br />
                            nível em programação, em apenas uma semana.</Typography>
                    </Box>
                    <Box>
                        
                    </Box>
                    <Box sx={{ width: "100%", height: "100%"}}>
                        <img
                            src="/aseets/banner.png"
                            alt="Banner"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                display: "block",
                                borderRadius: "0px 15px 1px 0px"
                            }}
                        />
                    </Box>


                </Box>

            </Grid>
            <Grid size={12}>
                           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, border: 1, borderColor: "divider", borderRadius: 3, mb: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", borderRight: 1, borderColor: "divider" }}>
                        <Box sx={{ bgcolor: theme.palette.lancamentos, p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, width: { xs: "50%", md: "100%" } }}>
                                <Typography sx={{ fontWeight: "bolder", color: theme.palette.text.tertiary, textAlign: "center" }}>Curso</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ px: 5, pb: 2, alignItems: "center", justifyContent: "center", gap: 10, display: { xs: "flex", md: "unset" } }}>
                            <Typography sx={{ fontSize: 58, fontWeight: "bolder" }}>18</Typography>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CalendarTodayOutlinedIcon />
                                    <Typography>Julho</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                    <CalendarTodayOutlinedIcon />
                                    <Typography>08:30</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ p: { xs: 2, md: 3}}}>
                        <Typography sx={{ fontWeight: "bolder", fontSize: 18}}> Lorem Ipsum is simg and typesetting industry</Typography>
                        <Typography color="textSecondary" sx={{ mt: 1, fontSize: 13 }}>Crie um projeto completo do zero e alcance o próximo<br />
                            nível em programação, em apenas uma semana.</Typography>
                    </Box>
                    <Box>
                        
                    </Box>
                    <Box sx={{ width: "100%", height: "100%"}}>
                        <img
                            src="/aseets/banner.png"
                            alt="Banner"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                display: "block",
                                borderRadius: "0px 15px 1px 0px"
                            }}
                        />
                    </Box>


                </Box>
                             <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, border: 1, borderColor: "divider", borderRadius: 3, mb: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", borderRight: 1, borderColor: "divider" }}>
                        <Box sx={{ bgcolor: theme.palette.lancamentos, p: 2, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 3, width: { xs: "50%", md: "100%" } }}>
                                <Typography sx={{ fontWeight: "bolder", color: theme.palette.text.tertiary, textAlign: "center" }}>Curso</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ px: 5, pb: 2, alignItems: "center", justifyContent: "center", gap: 10, display: { xs: "flex", md: "unset" } }}>
                            <Typography sx={{ fontSize: 58, fontWeight: "bolder" }}>18</Typography>
                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <CalendarTodayOutlinedIcon />
                                    <Typography>Julho</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                    <CalendarTodayOutlinedIcon />
                                    <Typography>08:30</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ p: { xs: 2, md: 3}}}>
                        <Typography sx={{ fontWeight: "bolder", fontSize: 18}}> Lorem Ipsum is simg and typesetting industry</Typography>
                        <Typography color="textSecondary" sx={{ mt: 1, fontSize: 13 }}>Crie um projeto completo do zero e alcance o próximo<br />
                            nível em programação, em apenas uma semana.</Typography>
                    </Box>
                    <Box>
                        
                    </Box>
                    <Box sx={{ width: "100%", height: "100%"}}>
                        <img
                            src="/aseets/banner.png"
                            alt="Banner"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                display: "block",
                                borderRadius: "0px 15px 1px 0px"
                            }}
                        />
                    </Box>


                </Box>
            </Grid>
        </Grid>

    )
}