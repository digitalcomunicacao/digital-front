import {
    Box, Button, CircularProgress, Container, Divider, TextField, Typography,
    useTheme
} from "@mui/material"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import api from "../../../config/Api";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { ModalMetodoPagamento } from "./ModalMetodoPagamento";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AssinaturaCancelada } from "./AssinaturaCancelada";
import { DialogCancelar } from "./DialogCancelar";
import { ModalSelecionarPlano } from "./ModalSelecionarPlano";

dayjs.locale('pt-br')

const stripePromise = loadStripe("pk_test_51Rkqnl4UJY192FzeyHoJGjBYq3ZI6iJFhkk1F5ZFCbEDxUQAbjD2aRU4E8jggtzaXGr71uxBQVNe7bugB0t7pTfu00CM9glODz");

export const Configuracoes = () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const token = localStorage.getItem("token")
    const theme=useTheme()
    const [usuario, setUsuario] = useState(null)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [planos, setPlanos] = useState(null)
    const handleOpenCancelDialog = () => {
        setConfirmCancelOpen(true);
    };

    const handleCloseCancelDialog = () => {
        setConfirmCancelOpen(false);
    };
    const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);

    // Ao abrir modal para alterar forma pagamento
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
            setUsuario(response.data)
            console.log(response)
            setLoading(false)
        }).catch(function (error) {
            console.log(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        getUsuario()
    }, [])
    const handleCancelarAssinatura = async () => {
        try {
            setLoading(true);
            await api.delete("/assinatura/cancelar", {
                headers: { Authorization: `Bearer ${token}` },
            });
            handleCloseCancelDialog();
            getUsuario(); // Atualiza status na tela
        } catch (error) {
            console.error("Erro ao cancelar assinatura:", error);
        } finally {
            setLoading(false);
        }
    };
    const [openModalPlano, setOpenModalPlano] = useState(false);


    const getPlanos = () => {
        api.get("/planos")
            .then((res) => setPlanos(res.data))
            .catch(console.error)
    }

    useEffect(() => {
        getPlanos()
    }, [])

    const trocarPlano = async (novoPlanoId) => {
        try {
            await api.patch("/assinatura/trocar-plano", { planoId: novoPlanoId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            getUsuario(); // atualiza os dados na tela
            setOpenModalPlano(false);
        } catch (err) {
            console.error("Erro ao trocar plano:", err);
        }
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ textAlign: 'start', mt: 15}}>
                <Typography sx={{ fontSize: 30, fontWeight: 'bolder', color: theme.palette.text.primary }}>Configurações da Conta</Typography>
                <Typography sx={{ fontSize: 20, color: theme.palette.text.secondary, mt: 2 }}>Gerencie suas informações pessoais e assinatura</Typography>
            </Box>

            {loading || !usuario?.nome || !usuario?.assinatura ? (
                <Box>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    {/* Dados do usuário */}
                    <Box sx={{ border: 'divider', mt: 10, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3 }}>
                        <Typography sx={{ fontSize: 22, fontWeight: 'bolder', color: theme.palette.text.primary }}>Configurações da Conta</Typography>
                        <Typography sx={{ fontSize: 18, color: theme.palette.text.secondary, mt: 2 }}>Atualize suas informações de perfil</Typography>
                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 5 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 5, width: "100%", mt: 5 }}>
                                <TextField slotProps={{ inputLabel: { shrink: true } }} fullWidth label="Nome completo" defaultValue={usuario.nome} sx={{ }} />
                                <TextField slotProps={{ inputLabel: { shrink: true } }} label="Celular" defaultValue={usuario.celular} sx={{ }} />
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 5, width: "100%", mt: { xs: 0, md: 5 } }}>
                                <TextField slotProps={{ inputLabel: { shrink: true } }} fullWidth label="Email" defaultValue={usuario.email} sx={{ }} />
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "end", mt: { xs: 3, md: 0 } }}>
                            <Button variant="contained" sx={{ fontWeight: "bolder" }}>Salvar Alteracoes</Button>
                        </Box>
                    </Box>

                    {/* Assinatura */}
                    <Box sx={{ border: 'divider', mt: 10, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3 }}>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <CreditCardIcon />
                            <Typography sx={{ fontSize: 22, fontWeight: 'bolder', color: theme.palette.text.primary }}>Gerenciar Assinatura</Typography>
                        </Box>
                        <Typography sx={{ fontSize: 18, color: theme.palette.text.secondary, mt: 2 }}>Informações sobre seu plano atual e opções de cancelamento</Typography>

                        {usuario.assinatura.cancelAtPeriodEnd ? (
                            <AssinaturaCancelada usuario={usuario} planos={planos} />
                        ) : (
                            <Box>
                                <Box sx={{
                                    display: "flex", flexDirection: { xs: "column", md: "row" },
                                    justifyContent: "space-between", gap: 5,
                                    bgcolor: theme.palette.background.default, p: 5, borderRadius: 3, mt: 2
                                }}>
                                    <Box>
                                        <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>Plano {user.plano}</Typography>
                                        <Typography color="textSecondary">Acesso completo a todos os cursos</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "start", md: "end" } }}>
                                        {usuario.assinatura && (
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
                                        <Typography sx={{ fontWeight: "bolder", fontSize: 16, mt: 2 }}>
                                            R$ {usuario.assinatura.valorPago.toFixed(2)} / {usuario.assinatura.plano}
                                        </Typography>
                                        <Typography color="textSecondary" sx={{ fontSize: 16 }}>
                                            Próxima cobrança: {dayjs(usuario.assinatura.dataFim).format('DD/MM/YYYY')}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{
                                    display: "flex", flexDirection: { xs: "column", md: "row" },
                                    justifyContent: "space-between", gap: 5,
                                    bgcolor: theme.palette.background.paper, p: 5, borderRadius: 3, mt: 2
                                }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <CreditCardIcon />
                                        <Box>
                                            <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>Forma de Pagamento</Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: 14 }}>
                                                **** **** **** {usuario.assinatura.cartaoUltimos4}
                                            </Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                                                Expira {usuario.assinatura.cartaoExpMes}/{usuario.assinatura.cartaoExpAno}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Divider variant="fullWidth" sx={{ my: 2 }} />

                                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, mt: 2 }}>
                                    {/* <Button
                                        variant="outlined"
                                        sx={{ fontWeight: "bolder" }}
                                        onClick={() => setOpenModalPlano(true)} // <- AQUI!
                                    >
                                        Alterar Plano
                                    </Button> */}


                                    <Button variant="outlined" sx={{ fontWeight: "bolder" }} onClick={handleOpenModal}>
                                        Alterar Pagamento
                                    </Button>

                                    {/* Modal só abre se tiver clientSecret e modal aberto */}
                                    {clientSecret && (
                                        <Elements
                                            stripe={stripePromise}
                                            options={{
                                                clientSecret,
                                                appearance: { theme: 'night' }
                                            }}
                                        >
                                            {/* Passa a assinatura atual para o modal */}
                                            <ModalMetodoPagamento
                                                openModal={openModal}
                                                handleCloseModal={handleCloseModal}
                                                planoSelecionado={usuario.assinatura}
                                            />
                                        </Elements>
                                    )}

                                    <Button
                                        color="error"
                                        variant="contained"
                                        sx={{ fontWeight: "bolder" }}
                                        onClick={handleOpenCancelDialog}
                                    >
                                        Cancelar Assinatura
                                    </Button>
                                    <DialogCancelar usuario={usuario} confirmCancelOpen={confirmCancelOpen} handleCancelarAssinatura={handleCancelarAssinatura} handleCloseCancelDialog={handleCloseCancelDialog} />
                                </Box>
                            </Box>
                        )}
                  {/* <ModalSelecionarPlano
  open={openModalPlano}
  onClose={() => setOpenModalPlano(false)}
  planos={planos}
  planoAtualId={usuario.assinatura.planoID}
  onConfirm={trocarPlano}
/> */}


                    </Box>
                </Box>
            )}
        </Container>
    )
}
