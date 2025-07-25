import React from "react";
import { Modal, Backdrop, Fade, Box } from "@mui/material";
import UpdatePaymentMethodForm from "./UpdatePaymentMethodForm";

export const ModalMetodoPagamento = ({ openModal, handleCloseModal, onSuccess }) => (
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
        <UpdatePaymentMethodForm onSuccess={onSuccess} onClose={handleCloseModal} />
      </Box>
    </Fade>
  </Modal>
);
