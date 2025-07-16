// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import { useEffect, useState } from "react";

// export const ModalSelecionarPlano = ({ open, onClose, planos, planoAtualId, onConfirm }) => {
//   const [planoId, setPlanoId] = useState(null);

//   // ✅ Seta plano atual como selecionado sempre que o modal abrir
//   useEffect(() => {
//     if (open && planoAtualId) {
//       setPlanoId(planoAtualId);
//     }
//   }, [open, planoAtualId]);

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Escolha seu novo plano</DialogTitle>
//       <DialogContent>
//         {planos.map((plano) => (
//           <FormControlLabel
//             key={plano.id}
//             value={plano.id}
//             control={<Radio />}
//             label={`${plano.nome} - R$${plano.preco.toFixed(2)}`}
//             checked={planoId === plano.id}
//             onChange={() => setPlanoId(plano.id)}
//           />
//         ))}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancelar</Button>
//         <Button
//           onClick={() => onConfirm(planoId)}
//           disabled={!planoId || planoId === planoAtualId}
//         >
//           Confirmar
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
