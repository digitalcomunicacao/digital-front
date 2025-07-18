import { useEffect, useState } from "react"
import api from "../../config/Api"
import { Box, Typography, useTheme } from "@mui/material"

export const Planos = ({ selectedPlano, setSelectedPlano }) => {
  const [planos, setPlanos] = useState([])
  const theme = useTheme()

const getPlanos = () => {
  api.get("/planos")
    .then((response) => {
      const planosOrdenados = response.data.sort((a, b) => {
        if (a.intervalo === "year" && b.intervalo !== "year") return -1;
        if (a.intervalo !== "year" && b.intervalo === "year") return 1;
        return 0;
      });
      setPlanos(planosOrdenados);
    })
    .catch((error) => console.log(error));
};


  useEffect(() => {
    getPlanos()
    console.log(planos)
  }, [])

  return (
    <Box>
      {planos.map((plano, index) => {
        const isSelected = selectedPlano?.id === plano.id

        return (
          <Box
            key={index}
            onClick={() => setSelectedPlano(plano)}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              border: 2,
              borderColor: isSelected ? theme.palette.background.paperAzul : "divider",
              borderRadius: 5,
              p: 5,
              bgcolor: theme.palette.background.paper,
              mb: 5,
              cursor: "pointer",
              transition: "border 0.2s",
            }}
          >
            <Box sx={{ width: "45%" }}>
              <Box sx={{ width: "115px", height: "65px" }}>
                <img src={plano.intervalo==="year" ? "aseets/logo-dark.png":"aseets/logo-prata.png"} alt="logo" style={{ width: "100%", height: "100%" }} />
              </Box>
              <Typography color="textTertiary" sx={{ mt: 2 }}>
                Acesso total à plataforma com todas as formações e experiências da Digital Educa.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "start" }}>
              <Box sx={{ position: "relative", width: "fit-content" }}>
                
                <img src="/aseets/icone_anual.png" alt="ícone anual" />
                <Typography
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 20,
                    color: theme.palette.text.primary,
                    fontSize: 28,
                    fontWeight: "bold"
                  }}
                >
                  1
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Typography color="textTertiary" sx={{ fontSize: 20 }}>
                  Assinatura {plano.nome}
                </Typography>
                <Box
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    p: 1,
                    borderRadius: 5,
                    mt: 1
                  }}
                >
                  <Typography color="textTertiary" sx={{ fontSize: 22 }}>
                    {plano.nome}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 42, fontWeight: "bolder", mt: 2 }}>
                  R$ {plano.preco.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
