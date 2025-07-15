import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import dayjs from "dayjs"

export const DialogCancelar =({confirmCancelOpen,handleCloseCancelDialog,handleCancelarAssinatura,usuario})=>{
    return(
    <Dialog open={confirmCancelOpen} onClose={handleCloseCancelDialog}>
  <DialogTitle>Confirmar Cancelamento</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Tem certeza que deseja cancelar sua assinatura? Você manterá acesso até {dayjs(usuario.assinatura.dataFim).format('DD/MM/YYYY')}, mas não será cobrado novamente.
      Esta ação pode ser desfeita a qualquer momento.
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseCancelDialog} color="primary">
      Voltar
    </Button>
    <Button onClick={handleCancelarAssinatura} color="error" variant="contained">
      Confirmar Cancelamento
    </Button>
  </DialogActions>
</Dialog>

    )
}