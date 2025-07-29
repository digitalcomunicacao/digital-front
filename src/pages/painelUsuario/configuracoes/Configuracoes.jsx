import {
    Box, Button, CircularProgress, Container, Divider, IconButton, InputAdornment, TextField, Typography,
    useTheme
} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import api from "../../../config/Api";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { ModalMetodoPagamento } from "./ModalMetodoPagamento";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AssinaturaCancelada } from "./AssinaturaCancelada";
import { DialogCancelar } from "./DialogCancelar";
import { ModalSelecionarPlano } from "./ModalSelecionarPlano";
import { Planos } from "../../checkout/Planos";
import { useNavigate } from "react-router-dom";
import { ArrowForward, Visibility, VisibilityOff } from "@mui/icons-material";
import InputMask from 'react-input-mask';
import { useSnackbar } from "../../../context/SnackBarContext";

dayjs.locale('pt-br');
const stripePromise = loadStripe("pk_live_51RlzIBEUbmb1KS7ATvhyQ0AqE8tqIWmVAPE7Gxkov2zqxtJ6lnKxfocUfPfc3xzERObhrCOxZcKUQyXHqnR8y7qi001B3SbDqr");

export const Configuracoes = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("")
    const token = localStorage.getItem("token");
    const theme = useTheme();
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);
    const [planos, setPlanos] = useState(null);
    const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
    const [openModalPlano, setOpenModalPlano] = useState(false);
    const [selectedPlano, setSelectedPlano] = useState(null);
    const { showSnackbar } = useSnackbar();
    const handleOpenModal = async () => {
        setLoading(true);
        try {
            const res = await api.post("/assinatura/setup-intent", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.data.clientSecret) {
                setClientSecret(res.data.clientSecret);
                setOpenModal(true);
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

    const handleOpenCancelDialog = () => setConfirmCancelOpen(true);
    const handleCloseCancelDialog = () => setConfirmCancelOpen(false);

    const handleCancelarAssinatura = async () => {
        try {
            setLoading(true);
            await api.delete("/assinatura/cancelar", {
                headers: { Authorization: `Bearer ${token}` },
            });
            handleCloseCancelDialog();
            getUsuario();
        } catch (error) {
            console.error("Erro ao cancelar assinatura:", error);
        } finally {
            setLoading(false);
        }
    };

    const getUsuario = () => {
        setLoading(true);
        api.get("usuario/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setUsuario(res.data);
                setLoading(false);
                console.log("usuario atualizado",res.data)

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const getPlanos = () => {
        api.get("/planos")
            .then((res) => setPlanos(res.data))
            .catch(console.error);
    };

    const trocarPlano = async (novoPlanoId) => {
        try {
            await api.patch("/assinatura/trocar-plano", { planoId: novoPlanoId }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            getUsuario();
            setOpenModalPlano(false);
        } catch (err) {
            console.error("Erro ao trocar plano:", err);
        }
    };

const handleEditarUsuario = () => {
  const payload = {};

  if (nome && nome !== usuario.nome) payload.nome = nome;
  if (email && email !== usuario.email) payload.email = email;
  if (celular && celular !== usuario.celular) payload.celular = celular;

  if (Object.keys(payload).length === 0) {
    showSnackbar("Nenhuma informação foi alterada.", "info");
    return;
  }

  api.put("/usuario/update", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      showSnackbar("Dados alterados com sucesso!", "success");
      
      // Atualiza localStorage só com os campos alterados:
      const userFromStorage = JSON.parse(localStorage.getItem('user')) || {};

      // Só atualiza os campos que estão no payload:
      const updatedUser = {
        ...userFromStorage,
        ...payload,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      showSnackbar(error.response?.data?.message || "Erro ao atualizar", "error");
    });
};

    useEffect(() => {
        getUsuario();
        getPlanos();
    }, []);



    return (
        <Container maxWidth="xl" sx={{ pb: 5 }}>
            <Box sx={{ textAlign: 'start', mt: 5 }}>
                <Typography sx={{ fontSize: 30, fontWeight: 'bolder', color: theme.palette.text.primary }}>Configurações da Conta</Typography>
                <Typography sx={{ fontSize: 20, color: theme.palette.text.secondary, mt: 2 }}>Gerencie suas informações pessoais e assinatura</Typography>
            </Box>

            {loading || !usuario ? (
                <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    {/* DADOS DO USUÁRIO */}
                    <Box sx={{ mt: 10, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3 }}>
                        <Typography sx={{ fontSize: 22, fontWeight: 'bolder' }}>Dados Pessoais</Typography>
                        <Typography sx={{ fontSize: 18, mt: 2, color: theme.palette.text.secondary }}>Atualize suas informações de perfil</Typography>

                        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 5, mt: 5 }}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 5, width: "100%" }}>
                                <TextField fullWidth label="Nome completo" defaultValue={usuario.nome} onChange={(e) => setNome(e.target.value)} />
                                <InputMask
                                    mask="(99) 99999-9999"
                                    defaultValue={usuario.celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                >
                                    {(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            label="Celular"
                                            variant="outlined"
                                            required

                                            sx={{ mt: 5 }}
                                            fullWidth
                                        />
                                    )}
                                </InputMask>

                            </Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 5, width: "100%" }}>
                                <TextField fullWidth label="Email" defaultValue={usuario.email} onChange={(e) => setEmail(e.target.value)} />
                                <Button
                                    onClick={() => navigate('/', { state: { recuperarSenha: true } })}
                                    sx={{ mt: 5, height: 55, borderRadius: 3 }}
                                    variant="outlined"
                                >
                                    Alterar Senha
                                </Button>

                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                            <Button onClick={() => handleEditarUsuario()} variant="contained" sx={{ fontWeight: "bolder" }}>Salvar Alterações</Button>
                        </Box>
                    </Box>

                    {/* SE FOR ASSINANTE */}
                    {usuario.assinatura && usuario.assinatura.status === "ATIVA" ? (

                        <Box sx={{ mt: 10, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3 }}>
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                <CreditCardIcon />
                                <Typography sx={{ fontSize: 22, fontWeight: 'bolder' }}>Gerenciar Assinatura</Typography>
                            </Box>

                            <Typography sx={{ fontSize: 18, mt: 2, color: theme.palette.text.secondary }}>
                                Informações sobre seu plano atual e opções de cancelamento
                            </Typography>

                            {usuario.assinatura.cancelAtPeriodEnd ? (
                                <AssinaturaCancelada usuario={usuario} planos={planos} />
                            ) : (
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", gap: 5, bgcolor: theme.palette.background.default, p: 5, borderRadius: 3, mt: 2 }}>
                                        <Box>
                                            <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>Plano {usuario.plano}</Typography>
                                            <Typography color="textSecondary">Acesso completo a todos os cursos</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "start", md: "end" } }}>
                                            <Box sx={{ bgcolor: usuario.assinatura.status === 'ATIVA' ? 'success.main' : 'error.main', p: 1, borderRadius: 1 }}>
                                                <Typography sx={{ fontWeight: 'bolder', fontSize: 16, color: '#fff' }}>
                                                    {usuario.assinatura.status}
                                                </Typography>
                                            </Box>
                                            <Typography sx={{ fontWeight: "bolder", fontSize: 16, mt: 2 }}>
                                                R$ {usuario.assinatura.valorPago.toFixed(2)} / {usuario.assinatura.plano}
                                            </Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: 16 }}>
                                                Próxima cobrança: {dayjs(usuario.assinatura.dataFim).format('DD/MM/YYYY')}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: theme.palette.background.paper, p: 5, borderRadius: 3, mt: 2 }}>
                                        <CreditCardIcon />
                                        <Box>
                                            <Typography sx={{ fontWeight: "bolder", fontSize: 16 }}>Forma de Pagamento</Typography>
                                            <Typography color="textSecondary">**** **** **** {usuario.assinatura.cartaoUltimos4}</Typography>
                                            <Typography color="textSecondary" sx={{ fontSize: 12 }}>
                                                Expira {usuario.assinatura.cartaoExpMes}/{usuario.assinatura.cartaoExpAno}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Divider variant="fullWidth" sx={{ my: 2 }} />

                                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
                                        <Button variant="contained" sx={{ color: theme.palette.textPrimary, fontWeight: "bolder" }} onClick={handleOpenModal}>Alterar Pagamento</Button>
                                        {clientSecret && openModal && (
                                            <Elements
                                                stripe={stripePromise}
                                                options={{
                                                    clientSecret,
                                                    appearance: {
                                                        theme: 'none',
                                                        variables: {
                                                            colorBackground: theme.palette.background.default,
                                                            colorText: theme.palette.text.primary,
                                                            borderRadius: '10px',
                                                        },
                                                        rules: {
                                                            '.Input': {
                                                                backgroundColor: theme.palette.background.paper, // fundo do input
                                                                color: theme.palette.text.primary,               // cor do texto
                                                                borderColor: theme.palette.divider,              // borda
                                                            },
                                                            '.Input:focus': {
                                                                borderColor: theme.palette.primary.main,         // borda ao focar
                                                                boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
                                                            },
                                                            '.Label': {
                                                                color: theme.palette.text.secondary,             // cor do label
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                <ModalMetodoPagamento
                                                    openModal={openModal}
                                                    handleCloseModal={handleCloseModal}
                                                />
                                            </Elements>
                                        )}

                                        {/* <Button color="error" variant="contained" onClick={handleOpenCancelDialog}>Cancelar Assinatura</Button> */}
                                        {/* <DialogCancelar
                                            usuario={usuario}
                                            confirmCancelOpen={confirmCancelOpen}
                                            handleCancelarAssinatura={handleCancelarAssinatura}
                                            handleCloseCancelDialog={handleCloseCancelDialog}
                                        /> */}
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    ) : (
                        // SE NÃO FOR ASSINANTE
                        <Box sx={{ mt: 10, p: 3, bgcolor: theme.palette.background.paper, borderRadius: 3, textAlign: "center" }}>
                            <Typography sx={{ fontSize: 22, fontWeight: 'bolder', color: theme.palette.text.primary }}>
                                Você ainda não é assinante
                            </Typography>
                            <Typography sx={{ fontSize: 18, mt: 2, color: theme.palette.text.secondary, mb: 5 }}>
                                Escolha um plano agora e tenha acesso a todos os conteúdos do digital educa!
                            </Typography>

                            <Planos selectedPlano={selectedPlano} setSelectedPlano={setSelectedPlano} />
                            {selectedPlano && (
                                <Box sx={{ display: "flex", justifyContent: "end" }}>
                                    <Button
                                        variant="outlined"
                                        sx={{ borderRadius: "15px", color: theme.palette.text.primary, fontWeight: "bold", fontSize: 17 }}
                                        endIcon={<ArrowForward sx={{ fontSize: "50px", color: theme.palette.background.paperAzul }} />}
                                        onClick={() => {
                                            // Aqui você navega para checkout, já no step 1 e passando o plano selecionado
                                            navigate('/checkout', { state: { stepInicial: 1, planoSelecionado: selectedPlano } });

                                        }}
                                    >
                                        Avançar
                                    </Button>
                                </Box>

                            )}
                        </Box>
                    )}
                </Box>
            )}
        </Container>
    );
};
