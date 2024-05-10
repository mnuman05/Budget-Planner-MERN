import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { client } from "client";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const AddTransactionModal = ({ open, handleClose, handleSubmit }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState<any>([]);
  const [type, setSelectedType] = useState(1);

  useEffect(() => {
    const fetchAccountList = async () => {
      try {
        setIsLoading(true);
        const response = await client.get("bank-accounts/getUserBanks");
        console.log("responsed->", response);

        //@ts-ignore
        setBankAccounts(response.bankAccounts);

        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
        setIsLoading(false);
      }
    };

    fetchAccountList();
  }, []);

  console.log("check me", bankAccounts);

  console.log("selectedType=>", type);

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
        <h2>Add New Transaction</h2>
        <Formik
          initialValues={{
            description: "",
            amount: "",
            transactionType: type,
            from: "",
            to: "",
          }}
          validationSchema={Yup.object({
            description: Yup.string().required("Required"),
            amount: Yup.number()
              .required("Required")
              .min(0, "Amount cannot be negative")
              .moreThan(0, "Amount must be greater than zero"),
            transactionType: Yup.number().required("Required"),
            from: Yup.string().required("Required"),
            to: Yup.string().when("transactionType", {
              is: type === 2 ? 2 : 1,
              then: Yup.string().notRequired(),
              otherwise: Yup.string().required("Required"),
            }),
          })}
          onSubmit={(values) => {
            console.log("Form values:", values);
            console.log("selectedTypew:", type);
            handleSubmit(values, type);
          }}
        >
          {({ errors, touched, setFieldValue }) => {
            console.log("selectedTypew:", type);
            console.log("errors:", errors);
            console.log("touched:", touched);

            return (
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
                    error={errors.amount && touched.amount}
                    helperText={
                      errors.amount && touched.amount ? errors.amount : null
                    }
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Field
                    as={Select}
                    fullWidth
                    name="transactionType"
                    value={type}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log("eddd", e);

                      setSelectedType(Number(e.target.value));
                      setFieldValue("from", "");
                      setFieldValue("to", "");
                    }}
                    error={errors.transactionType && touched.transactionType}
                    helperText={
                      errors.transactionType && touched.transactionType
                        ? errors.transactionType
                        : null
                    }
                  >
                    <MenuItem value={1}>Send</MenuItem>
                    <MenuItem value={2}>Withdraw</MenuItem>
                    <MenuItem value={3}>Deposit</MenuItem>
                  </Field>
                </Box>

                {type === 1 && (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Field
                        as={Select}
                        fullWidth
                        name="from"
                        placeholder="From"
                        error={errors.from && touched.from}
                        helperText={
                          errors.from && touched.from ? errors.from : null
                        }
                      >
                        {bankAccounts.length === 0 && (
                          <MenuItem disabled value="">
                            No accounts found! Please Add
                          </MenuItem>
                        )}
                        {bankAccounts.map((account: any) => (
                          <MenuItem
                            key={account.id}
                            value={account.accountNumber}
                          >
                            {account.title}
                          </MenuItem>
                        ))}
                      </Field>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Field
                        as={TextField}
                        fullWidth
                        name="to"
                        label="To"
                        error={errors.to && touched.to}
                        helperText={errors.to && touched.to ? errors.to : null}
                      />
                    </Box>
                  </>
                )}

                {type === 2 && (
                  <>
                    <Box sx={{ mb: 2 }}>
                      <Field
                        as={Select}
                        fullWidth
                        name="from"
                        // label="From"
                        placeholder="From"
                        // displayEmpty
                        error={errors.from && touched.from}
                        helperText={
                          errors.from && touched.from ? errors.from : null
                        }
                      >
                        {bankAccounts.length === 0 && (
                          <MenuItem disabled value="">
                            No accounts found! Please Add
                          </MenuItem>
                        )}
                        {bankAccounts.map((account: any) => (
                          <MenuItem
                            key={account.id}
                            value={account.accountNumber}
                          >
                            {account.title}
                          </MenuItem>
                        ))}
                      </Field>
                    </Box>
                  </>
                )}

                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddTransactionModal;
