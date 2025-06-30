import {
  Badge, Box, Button, Card, CardActions, CardContent, CardHeader, Container,
  Divider, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";
import { Shield } from "@mui/icons-material";
import theme from "../../theme/theme";

export const Checkout = () => {
  const navigate = useNavigate();

  const [planos, setPlanos] = useState([]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    api.get('/planos')
      .then((res) => {
        setPlanos(res.data);
        if (res.data.length > 0) {
          setSelectedPlanId(res.data[0].id);
          setSelectedPlan(res.data[0]);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar planos:", err);
      });
  }, []);

  useEffect(() => {
    const plano = planos.find(p => p.id === selectedPlanId);
    setSelectedPlan(plano || null);
  }, [selectedPlanId, planos]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (!selectedPlanId) {
      alert("Selecione um plano");
      return;
    }

    api.post(
      'assinatura',
      {
        metodoPagamento: paymentMethod,
        planoId: selectedPlanId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        navigate("/painel-usuario/catalago");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao criar assinatura.");
      });
  };

  const benefits = [
    { icon: MenuBookIcon, title: 'Acesso a todos os cursos', desc: 'Mais de 150 cursos disponíveis' },
    { icon: AccessTimeIcon, title: 'Conteúdo sempre atualizado', desc: 'Novos cursos adicionados mensalmente' },
    { icon: WorkspacePremiumIcon, title: 'Certificados de conclusão', desc: 'Certificados reconhecidos pelo mercado' },
    { icon: PeopleIcon, title: 'Comunidade exclusiva', desc: 'Acesso ao grupo VIP no Discord' },
  ];

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", mt: 5 }}>
        <Typography sx={{ fontWeight: "bolder", fontSize: 36, textAlign: "center" }}>
          Assine agora e tenha acesso completo
        </Typography>
        <Typography color="textSecondary" sx={{ fontSize: 18 }}>
          Mais de 150 cursos para acelerar sua carreira
        </Typography>
      </Box>
      <Container>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                avatar={<StarIcon color="warning" />}
                title="Escolha seu plano"
                subheader="Selecione a opção que melhor se adequa às suas necessidades"
              />
              <CardContent>
                <RadioGroup
                  value={selectedPlanId}
                  onChange={(e) => setSelectedPlanId(Number(e.target.value))}
                >
                  {planos.map((plano) => (
                    <Box key={plano.id} mb={2} sx={{ border: 1, borderColor: 'divider' }} p={2}>
                      <FormControlLabel
                        value={plano.id}
                        control={<Radio />}
                        label={
                          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                            <Box>
                              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                <Typography fontWeight="bold">{plano.nome}</Typography>
                                {plano.duracaoDias >= 365 && (
                                  <Box sx={{ borderRadius: 10, bgcolor: theme.palette.primary.main, px: 1 }}>
                                    <Typography color="secondary" sx={{ fontWeight: "bolder", fontSize: 12 }}>
                                      Melhor Oferta
                                    </Typography>
                                  </Box>
                                )}
                              </Box>
                              <Typography variant="body2" sx={{ width: "300px" }} color="text.secondary">
                                {plano.descricao}
                              </Typography>
                            </Box>

                            <Box sx={{ justifyContent: "end", display: "flex", flexDirection: "column", textAlign: "end" }}>
                              <Typography sx={{ textAlign: "right" }}>
                                R$ {plano.preco.toFixed(2)}
                              </Typography>
                              <Typography variant="caption" color="warning.main">
                                {plano.duracaoDias} dias
                              </Typography>

                              {plano.duracaoDias >= 365 && (
                                <Typography variant="caption" color="success.main">
                                  R$ {(plano.preco / 12).toFixed(2)} / mês
                                </Typography>
                              )}
                            </Box>
                          </Box>

                        }
                      />
                    </Box>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>

            <Box my={4}>
              <Card>
                <CardHeader title="O que está incluído" />
                <CardContent>
                  {benefits.map((b, i) => (
                    <Box key={i} display="flex" alignItems="center" mb={1}>
                      <b.icon color="warning" sx={{ mr: 2 }} />
                      <Box>
                        <Typography fontWeight="medium">{b.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{b.desc}</Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>

            <Card sx={{ border: 1, borderColor: 'divider' }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Shield color="success" sx={{ mr: 1 }} />
                  <Box>
                    <Typography fontWeight="bold" color="green.800">Garantia de 7 dias</Typography>
                    <Typography variant="body2" color="green.700">
                      Se não ficar satisfeito, devolvemos 100% do seu dinheiro
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box mb={4}>
              <Card>
                <CardHeader title="Resumo do pedido" />
                <CardContent>
                  {selectedPlan && (
                    <>
                      <Box display="flex" justifyContent="space-between">
                        <Typography>Plano: {selectedPlan.nome}</Typography>
                        <Typography fontWeight="medium">R$ {selectedPlan.preco.toFixed(2)}</Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box display="flex" justifyContent="space-between" fontWeight="bold">
                        <Typography>Total</Typography>
                        <Typography>R$ {selectedPlan.preco.toFixed(2)}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Duração: {selectedPlan.duracaoDias} dias • Cancele quando quiser
                      </Typography>
                    </>
                  )}
                </CardContent>
              </Card>
            </Box>

            <Card>
              <CardHeader title="Informações de pagamento" />
              <CardContent>
                <Box mb={2}>
                  <Typography fontWeight="medium">Método de pagamento</Typography>
                  <RadioGroup
                    row
                    value={paymentMethod}
                    onChange={e => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel value="card" control={<Radio />} label="Cartão de crédito" />
                    <FormControlLabel value="pix" control={<Radio />} label="PIX" />
                  </RadioGroup>
                </Box>
                {/* Você pode expandir com mais inputs se for processar cartão real */}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  size="large"
                  type="submit"
                >
                  {paymentMethod === 'pix' ? 'Gerar PIX' : 'Finalizar assinatura'}
                </Button>
              </CardActions>
            </Card>

            <Box textAlign="center" mt={2} color="text.secondary">
              <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
                <Shield fontSize="small" />
                <Typography component="span" ml={0.5}>Pagamento 100% seguro</Typography>
              </Box>
              <Typography>
                Seus dados estão protegidos com criptografia SSL de 256 bits
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
