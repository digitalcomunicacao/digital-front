import { Modal, Backdrop, Fade, Box, Typography } from "@mui/material"
import PaymentForma from "../../checkout/PaymentForma"

export const ModalMetodoPagamento = ({ openModal, handleCloseModal, planoSelecionado }) => {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={openModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: 500 },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: "none",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {planoSelecionado?.status ? "Alterar Forma de Pagamento" : "Finalizar Assinatura"}
          </Typography>

          {planoSelecionado && (
            <PaymentForma
              selectedPlanId={planoSelecionado.id}
              selectedPlan={planoSelecionado}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Box>
      </Fade>
    </Modal>
  )
}
