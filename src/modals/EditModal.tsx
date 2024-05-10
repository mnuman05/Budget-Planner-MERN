import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const EditModal = ({ values, open, handleClose, handleSubmit }: any) => {
    console.log("open--->", open);
    
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
        <h2>Update Account</h2>
        <Formik
          initialValues={{ ...values }}
          validationSchema={Yup.object({
            accountNumber: Yup.string().required("Required"),
            title: Yup.string().required("Required"),
            balance: Yup.number()
              .required("Required")
              .min(0, "Balance cannot be negative"),
          })}
          onSubmit={(formData) => handleSubmit({ ...formData, id: values.id })}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="accountNumber"
                  label="Account Number"
                  disabled={true}
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

export default EditModal;
