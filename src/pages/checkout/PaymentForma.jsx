import {
  Box, Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Typography, Alert
} from "@mui/material"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../config/Api"

const PaymentForma = ({ selectedPlanId, selectedPlan, handleCloseModal }) => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [couponCode, setCouponCode] = useState("")

  // Detecta se é alteração pagamento (assinatura existente) ou criação nova
  const isAlteracaoPagamento = !!selectedPlan?.status

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!stripe || !elements) {
      setError("Stripe ainda não carregou.")
      setLoading(false)
      return
    }

    const { error: stripeError, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/painel-usuario/catalago",
      },
      redirect: "if_required",
    })

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
      return
    }

    const token = localStorage.getItem("token")

    try {
      if (isAlteracaoPagamento) {
        // PATCH para atualizar método de pagamento da assinatura atual
        await api.patch("/assinatura/metodo-pagamento", {
          paymentMethodId: setupIntent.payment_method
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        // Criar nova assinatura (reativação)
        await api.post("/assinatura", {
          metodoPagamento: "CARTAO",
          planoId: selectedPlanId,
          paymentMethodId: setupIntent.payment_method,
          couponCode: couponCode.trim() || null,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }

      handleCloseModal?.()
      navigate("/painel-usuario/catalago")
    } catch (err) {
      setError("Erro ao processar pagamento.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card elevation={8}>
      <CardHeader title={isAlteracaoPagamento ? "Alterar forma de pagamento" : "Informações de pagamento"} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <PaymentElement />
          </Box>

          {!isAlteracaoPagamento && (
            <input
              type="text"
              placeholder="Cupom de desconto"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "16px",
                fontSize: "14px",
              }}
            />
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="warning"
              fullWidth
              disabled={!stripe || loading}
            >
              {loading
                ? <CircularProgress size={20} color="inherit" />
                : (isAlteracaoPagamento
                  ? "Atualizar Pagamento"
                  : `Finalizar - R$ ${selectedPlan?.preco.toFixed(2)}`)
              }
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}

export default PaymentForma
