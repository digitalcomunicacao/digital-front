
import { Avatar, Box, Button, CardContent, Chip, Container, Divider, Grid, InputAdornment, TextField, Typography } from "@mui/material"
import { useState } from "react"
import {
  ArrowBack,
  CreditCard,
  Security,
  AccessTime,
  PlayArrow,
  Person,
  Email,
  Home,
  Payment,
  Visibility,
  VisibilityOff,
  LocalOffer,
  Verified,
  Shield,
  Support,
} from "@mui/icons-material"
import theme from "../../theme/theme"
import { useLocation, useNavigate } from "react-router-dom"
import api from "../../config/Api"
export const Checkout = () => {
  const location = useLocation()
  const curso = location.state?.curso
  const navigate=useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token');
    api.post('pagamento/'+curso.id,{},{
     headers: { Authorization: `Bearer ${token}` },
    }).then(function(response){
      console.log(response)
   navigate("/painel-usuario/meus-cursos")

    }).catch(function(error){
      console.log(error)
    })
  }
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  const applyCoupon = () => {
    if (couponCode === "DESCONTO10") {
      setAppliedCoupon({ code: "DESCONTO10", discount: 10, value: curso.preco * 0.1 })
    } else if (couponCode === "PRIMEIRACOMPRA") {
      setAppliedCoupon({ code: "PRIMEIRACOMPRA", discount: 15, value: curso.preco * 0.15 })
    }
  }
  

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }}>
      <CardContent sx={{ p: 3, width: "600px", backgroundColor: theme.palette.background.paper, borderRadius: 5 }}>
        {/* Curso */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              p: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Box
              component="img"
              src={"http://10.10.10.59:3000/" + curso.thumbnail}
              alt={curso.titulo}
              sx={{
                width: 80,
                height: 60,
                borderRadius: 2,
                objectFit: "cover",
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  mb: 1,
                  lineHeight: 1.3,
                }}
              >
                {curso.titulo}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Avatar src={"giovanne"} sx={{ width: 20, height: 20 }} />
                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  {curso.instrutor.nome}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <PlayArrow sx={{ fontSize: 12, color: "rgba(255, 255, 255, 0.6)" }} />
                  <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    {curso.modulos.reduce((acc, modulo) => acc + modulo.videos.length, 0)} aulas
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Cupom de Desconto */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: "white", mb: 2, fontWeight: "bold" }}>
            Cupom de Desconto
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              placeholder="Digite seu cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalOffer sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: 18 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              onClick={applyCoupon}
              sx={{
                borderColor: "#90caf9",
                color: "#90caf9",
                "&:hover": { borderColor: "#64b5f6", backgroundColor: "rgba(144, 202, 249, 0.1)" },
              }}
            >
              Aplicar
            </Button>
          </Box>
          {appliedCoupon && (
            <Chip
              label={`${appliedCoupon.code} - ${appliedCoupon.discount}% OFF`}
              color="success"
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

        {/* Cálculos */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Subtotal:
            </Typography>
            <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
              R$ {curso.preco}
            </Typography>
          </Box>
          {appliedCoupon && (
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" sx={{ color: "#4caf50" }}>
                Desconto ({appliedCoupon.discount}%):
              </Typography>
              <Typography variant="body2" sx={{ color: "#4caf50", fontWeight: "bold" }}>
                -R$ {appliedCoupon.value.toFixed(2).replace(".", ",")}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Taxas:
            </Typography>
            <Typography variant="body2" sx={{ color: "white", fontWeight: "bold" }}>
              R$ 0,00
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }} />

        {/* Total */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 4,
            p: 2,
            backgroundColor: "rgba(144, 202, 249, 0.1)",
            borderRadius: 2,
            border: "1px solid rgba(144, 202, 249, 0.3)",
          }}
        >
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            Total:
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#90caf9",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            R$ {(curso.preco - (appliedCoupon?.value || 0)).toFixed(2).replace(".", ",")}
          </Typography>
        </Box>

        {/* Botão Finalizar */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{
            py: 2,
            fontSize: "1.1rem",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 3,
            background: "linear-gradient(45deg, #90caf9, #64b5f6)",
            boxShadow: "0 8px 32px rgba(144, 202, 249, 0.3)",
            "&:hover": {
              background: "linear-gradient(45deg, #64b5f6, #42a5f5)",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 40px rgba(144, 202, 249, 0.4)",
            },
            transition: "all 0.3s ease",
            mb: 3,
          }}
          startIcon={<Security />}
        >
          Finalizar Compra
        </Button>

        {/* Garantias */}
        <Box sx={{ textAlign: "center" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  backgroundColor: "rgba(76, 175, 80, 0.1)",
                  borderRadius: 2,
                  border: "1px solid rgba(76, 175, 80, 0.2)",
                }}
              >
                <Verified sx={{ fontSize: 24, color: "#4caf50", mb: 1 }} />
                <Typography
                  variant="caption"
                  sx={{ color: "#4caf50", fontWeight: "bold", textAlign: "center" }}
                >
                  Garantia 30 dias
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  backgroundColor: "rgba(144, 202, 249, 0.1)",
                  borderRadius: 2,
                  border: "1px solid rgba(144, 202, 249, 0.2)",
                }}
              >
                <Support sx={{ fontSize: 24, color: "#90caf9", mb: 1 }} />
                <Typography
                  variant="caption"
                  sx={{ color: "#90caf9", fontWeight: "bold", textAlign: "center" }}
                >
                  Suporte 24/7
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>

    </Box>
  )
}