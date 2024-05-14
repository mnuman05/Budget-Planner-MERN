import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const EditTransactionModal = ({ values, open, handleClose, handleSubmit }: any) => {

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
        <h2>Update Transaction</h2>
        <Formik
          initialValues={{
            ...values,
            from: values.fromAccountId,
            to: values.toAccountId,
          }}
          validationSchema={Yup.object({
            description: Yup.string().required("Required"),
            amount: Yup.number()
              .required("Required")
              .min(0, "Amount cannot be negative")
              .moreThan(0, "Amount must be greater than zero"),
            from: Yup.string().required("Required"),
            to: Yup.string().required("Required"),
          })}
          onSubmit={(formData) => handleSubmit({ ...formData, id: values.id })}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="description"
                  label="Description"
                  error={errors.description && touched.description}
                  helperText={
                    errors.description && touched.description
                      ? errors.description
                      : null
                  }
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="amount"
                  label="Amount"
                  type="number"
                  disabled={true}
                  error={errors.amount && touched.amount}
                  helperText={
                    errors.amount && touched.amount ? errors.amount : null
                  }
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="from"
                  label="From"
                  disabled={true}
                  error={errors.from && touched.from}
                  helperText={errors.from && touched.from ? errors.from : null}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Field
                  as={TextField}
                  fullWidth
                  name="to"
                  label="To"
                  disabled={true}
                  error={errors.to && touched.to}
                  helperText={errors.to && touched.to ? errors.to : null}
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

export default EditTransactionModal;
