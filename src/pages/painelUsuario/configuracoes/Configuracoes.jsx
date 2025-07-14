import { Box, Button, CircularProgress, Container, Divider, TextField, Typography } from "@mui/material"
import theme from "../../../theme/theme"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import api from "../../../config/Api";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br' // se quiser português
import { Warning } from "@mui/icons-material";
import { ModalMetodoPagamento } from "./ModalMetodoPagamento";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

dayjs.locale('pt-br') // define o idioma

const stripePromise = loadStripe(
    "pk_test_51Rkqnl4UJY192FzeyHoJGjBYq3ZI6iJFhkk1F5ZFCbEDxUQAbjD2aRU4E8jggtzaXGr71uxBQVNe7bugB0t7pTfu00CM9glODz"
);
export const Configuracoes = () => {

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const token = localStorage.getItem("token")
    const [usuario, setUsuario] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const handleOpenModal = async () => {
        setLoading(true);
        try {
            const res = await api.post("/assinatura/setup-intent", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.clientSecret) {
                setClientSecret(res.data.clientSecret);
                setOpenModal(true);
            } else {
                console.error("clientSecret inválido recebido");
            }
        } catch (error) {
            console.error("Erro ao buscar clientSecret", error);
        } finally {
            setLoading(false);
        }
    };


    const handleCloseModal = () => {
        setOpenModal(false);
        setClientSecret(null);
    };

    const getUsuario = () => {
        setLoading(true)
        api.get("usuario/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(function (response) {
            console.log(response)
            setUsuario(response.data)
            setLoading(false)
        }).catch(function (error) {
            console.log(error)
            setLoading(false)
        })
    }
    useEffect(() => {
        getUsuario()
    }, [])

    return (
        <Container>
            <Box sx={{ textAlign: 'start', mt: 5 }}>
                <Typography sx={{ fontSize: 30, fontWeight: 'bolder', color: theme.palette.text.primary }}>Configurações da Conta</Typography>
                <Typography sx={{ fontSize: 20, color: theme.palette.text.secondary, mt: 2 }}>Gerencie suas informações pessoais e assinatura</Typography>
            </Box>
            {loading ? (
                <Box>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Box sx={{ border: 'divider', mt: 10, p: 3, bgcolor: theme.palette.secondary.main, borderRadius: 3 }}>
                        <Typography sx={{ fontSize: 22, fontWeight: 'bolder', color: theme.palette.text.primary }}>Configurações da Conta</Typography>
                        <Typography sx={{ fontSize: 18, color: theme.palette.text.secondary, mt: 2 }}>Atualize suas informações de perfil</Typography>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 5 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 5, width: "100%", mt: 5 }}>
                                <TextField slotProps={{ inputLabel: { shrink: true } }} fullWidth label="Nome completo" defaultValue={usuario.nome} sx={{ bgcolor: theme.palette.secondary.light }} />
                                <TextField slotProps={{ inputLabel: { shrink: true } }} label="Celular" defaultValue={usuario.celular} sx={{ bgcolor: theme.palette.secondary.light }} />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 5, width: "100%", mt: { xs: 0, md: 5 } }}>
                                <TextField slotProps={{ inputLabel: { shrink: true } }} fullWidth label="Email" defaultValue={usuario.email} sx={{ bgcolor: theme.palette.secondary.light }} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "end", mt: { xs: 3, md: 0 } }}>
                            <Button variant="contained" sx={{ fontWeight: "bolder" }}>Salvar Alteracoes</Button>
                        </Box>

                    </Box>


                    <Box sx={{ border: 'divider', mt: 10, p: 3, bgcolor: theme.palette.secondary.main, borderRadius: 3 }}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <CreditCardIcon />
                            <Typography sx={{ fontSize: 22, fontWeight: 'bolder', color: theme.palette.text.primary }}>Gerenciar Assinatura</Typography>
                        </Box>
                        <Typography sx={{ fontSize: 18, color: theme.palette.text.secondary, mt: 2 }}>Informações sobre seu plano atual e opções de cancelamento</Typography>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 5, bgcolor: theme.palette.secondary.light, p: 5, borderRadius: 3, mt: 2 }}> 
                            <Box>
                                <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>Plano {user.plano}</Typography>
                                <Typography color="textSecondary">Acesso completo a todos os cursos</Typography>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "start", md: "end" } }}>

                                {usuario?.assinatura && (
                                    <Box
                                        sx={{
                                            bgcolor:
                                                usuario.assinatura.status === 'ATIVA'
                                                    ? 'success.main'
                                                    : 'error.main',
                                            p: 1,
                                            borderRadius: 1,
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 'bolder', fontSize: 16, color: '#fff' }}>
                                            {usuario.assinatura.status}
                                        </Typography>

                                    </Box>
                                )}
                                <Typography sx={{ fontWeight: "bolder", fontSize: 16, mt: 2 }}>R$ {usuario?.assinatura?.valorPago.toFixed(2)} / {usuario?.assinatura?.plano}</Typography>
                                <Typography color="textSecondary" sx={{ fontSize: 16 }}>
                                    Próxima cobrança: {dayjs(usuario?.assinatura?.dataFim).format('DD/MM/YYYY')}
                                </Typography>

                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 5, bgcolor: theme.palette.secondary.light, p: 5, borderRadius: 3, mt: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CreditCardIcon />
                                <Box>
                                    <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>Forma de Pagamento</Typography>
                                    <Typography color="textSecondary" sx={{ fontSize: 14 }}>**** **** **** {usuario?.assinatura?.cartaoUltimos4}</Typography>
                                    <Typography color="textSecondary" sx={{ fontSize: 12 }}>Expira {usuario?.assinatura?.cartaoExpMes}/{usuario?.assinatura?.cartaoExpAno}</Typography>
                                </Box>
                            </Box>


                        </Box>
                        <Divider variant="fullWidth" sx={{ my: 2 }} />
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mt: 2 }}>
                            <Button variant="outlined" sx={{ fontWeight: "bolder" }}>Alterar Plano</Button>
                            <Button variant="outlined" sx={{ fontWeight: "bolder" }} onClick={handleOpenModal}>
                                Alterar Pagamento
                            </Button>
                            {clientSecret && (
                                <Elements
                                    stripe={stripePromise}
                                    options={{
                                        clientSecret,
                                        appearance: {
                                            theme: 'night', // aqui aplica o tema escuro
                                        },
                                    }}
                                >
                                    <ModalMetodoPagamento openModal={openModal} handleCloseModal={() => setOpenModal(false)} />
                                </Elements>
                            )}
                            <Button color="error" variant="contained" sx={{ fontWeight: "bolder" }}>Cancelar Assinatura</Button>
                        </Box>



                    </Box>
                </Box>
            )}
        </Container>
    )
}