import { Modal, Box, Typography, Button } from "@mui/material";

const WarningModal = ({ open, handleClose, handleConfirmDelete }:any) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
        //   border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Are you sure you want to delete this item?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{ mr: 2 }}
          >
            Confirm
          </Button>
          <Button onClick={handleClose} variant="contained">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default WarningModal;
