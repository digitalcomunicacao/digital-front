const ModalSelecionarPlano = ({ open, onClose, planos, onConfirm }) => {
  const [planoId, setPlanoId] = useState(null);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Escolha seu novo plano</DialogTitle>
      <DialogContent>
        {planos.map((plano) => (
          <FormControlLabel
            key={plano.id}
            value={plano.id}
            control={<Radio />}
            label={`${plano.nome} - R$${plano.preco}`}
            checked={planoId === plano.id}
            onChange={() => setPlanoId(plano.id)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={() => onConfirm(planoId)} disabled={!planoId}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
};
