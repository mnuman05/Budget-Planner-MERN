import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const AddAccountModal = ({ open, handleClose, handleSubmit }:any) => {

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Add New Account</h2>
        <Formik
          initialValues={{ accountNumber: "", title: "", balance: "" }}
          validationSchema={Yup.object({
            accountNumber: Yup.string().required("Required"),
            title: Yup.string().required("Required"),
            balance: Yup.number()
              .required("Required")
              .min(0, "Balance cannot be negative"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="accountNumber"
                  label="Account Number"
                  error={errors.accountNumber && touched.accountNumber}
                  helperText={
                    errors.accountNumber && touched.accountNumber
                      ? errors.accountNumber
                      : null
                  }
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="title"
                  label="Title"
                  error={errors.title && touched.title}
                  helperText={
                    errors.title && touched.title ? errors.title : null
                  }
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="balance"
                  label="Balance"
                  type="number"
                  error={errors.balance && touched.balance}
                  helperText={
                    errors.balance && touched.balance ? errors.balance : null
                  }
                />
              </Box>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddAccountModal;
