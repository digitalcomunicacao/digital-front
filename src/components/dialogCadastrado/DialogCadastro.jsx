import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

export const DialogCadastro=({openDialog,setOpenDialog})=>{
    return(
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle>Conta já existente</DialogTitle>
  <DialogContent>
    <Typography>
      Já existe uma conta cadastrada com este e-mail.
      Para continuar com a sua assinatura, faça login e retome o processo por lá.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)} color="primary">
      Fechar
    </Button>
    <Button
      variant="contained"
      sx={{fontWeight:"bolder"}}
      onClick={() => {
        setOpenDialog(false);
        window.location.href = "/"; // ou use navigate("/login") se tiver o `useNavigate`
      }}
    >
      Ir para login
    </Button>
  </DialogActions>
</Dialog>

    )
}