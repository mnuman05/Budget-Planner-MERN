// import { PhotoCamera } from "@mui/icons-material";
// import {
//   alpha,
//   Box,
//   Button,
//   Card,
//   Grid,
//   IconButton,
//   styled,
//   Switch,
// } from "@mui/material";
// import LightTextField from "components/LightTextField";
// import { Small, Tiny } from "components/Typography";
// import { useFormik } from "formik";
// import useTitle from "hooks/useTitle";
// import { FC } from "react";
// import * as Yup from "yup";

// // styled components
// const ButtonWrapper = styled(Box)(({ theme }) => ({
//   width: 100,
//   height: 100,
//   display: "flex",
//   borderRadius: "50%",
//   alignItems: "center",
//   justifyContent: "center",
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? theme.palette.secondary[200]
//       : alpha(theme.palette.primary[100], 0.1),
// }));

// const UploadButton = styled(Box)(({ theme }) => ({
//   width: 50,
//   height: 50,
//   display: "flex",
//   borderRadius: "50%",
//   border: "2px solid",
//   alignItems: "center",
//   justifyContent: "center",
//   borderColor: theme.palette.background.paper,
//   backgroundColor:
//     theme.palette.mode === "light"
//       ? theme.palette.secondary[400]
//       : alpha(theme.palette.background.paper, 0.9),
// }));

// const SwitchWrapper = styled(Box)(() => ({
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   width: "100%",
//   marginTop: 10,
// }));

// const AddNewUser: FC = () => {
//   // change navbar title
//   useTitle("Add New User");

//   const initialValues = {
//     fullName: "",
//     email: "",
//     phone: "",
//     country: "",
//     state: "",
//     city: "",
//     address: "",
//     zip: "",
//     about: "",
//   };

//   const validationSchema = Yup.object().shape({
//     fullName: Yup.string().required("Name is Required!"),
//     email: Yup.string().email().required("Email is Required!"),
//     phone: Yup.number().min(8).required("Phone is Required!"),
//     country: Yup.string().required("Country is Required!"),
//     state: Yup.string().required("State is Required!"),
//     city: Yup.string().required("City is Required!"),
//     address: Yup.string().required("Address is Required!"),
//     zip: Yup.string().required("Zip is Required!"),
//     about: Yup.string().required("About is Required!"),
//   });

//   const { values, errors, handleChange, handleSubmit, touched } = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: () => {},
//   });

//   return (
//     <Box pt={2} pb={4}>
//       <Card sx={{ padding: 4 }}>
//         <Grid container spacing={3}>
//           <Grid item md={4} xs={12}>
//             <Card
//               sx={{
//                 padding: 3,
//                 boxShadow: 2,
//                 minHeight: 400,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//               }}
//             >
//               <ButtonWrapper>
//                 <UploadButton>
//                   <label htmlFor="upload-btn">
//                     <input
//                       accept="image/*"
//                       id="upload-btn"
//                       type="file"
//                       style={{ display: "none" }}
//                     />
//                     <IconButton component="span">
//                       <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
//                     </IconButton>
//                   </label>
//                 </UploadButton>
//               </ButtonWrapper>

//               <Small
//                 marginTop={2}
//                 maxWidth={200}
//                 lineHeight={1.9}
//                 display="block"
//                 textAlign="center"
//                 color="text.disabled"
//               >
//                 Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
//               </Small>

//               <Box maxWidth={250} marginTop={5} marginBottom={1}>
//                 <SwitchWrapper>
//                   <Small display="block" fontWeight={600}>
//                     Public Profile
//                   </Small>
//                   <Switch defaultChecked />
//                 </SwitchWrapper>

//                 <SwitchWrapper>
//                   <Small display="block" fontWeight={600}>
//                     Banned
//                   </Small>
//                   <Switch defaultChecked />
//                 </SwitchWrapper>
//                 <Tiny display="block" color="text.disabled" fontWeight={500}>
//                   Apply disable account
//                 </Tiny>

//                 <SwitchWrapper>
//                   <Small display="block" fontWeight={600}>
//                     Email Verified
//                   </Small>
//                   <Switch defaultChecked />
//                 </SwitchWrapper>
//                 <Tiny display="block" color="text.disabled" fontWeight={500}>
//                   Disabling this will automatically send the user a verification
//                   email
//                 </Tiny>
//               </Box>
//             </Card>
//           </Grid>
//           <Grid item md={8} xs={12}>
//             <Card sx={{ padding: 3, boxShadow: 2 }}>
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                   <Grid item sm={6} xs={12}>
//                     <LightTextField
//                       fullWidth
//                       name="fullName"
//                       placeholder="Full Name"
//                       value={values.fullName}
//                       onChange={handleChange}
//                       error={Boolean(touched.fullName && errors.fullName)}
//                       helperText={touched.fullName && errors.fullName}
//                     />
//                   </Grid>

//                   <Grid item sm={6} xs={12}>
//                     <LightTextField
//                       fullWidth
//                       name="email"
//                       placeholder="Email Address"
//                       value={values.email}
//                       onChange={handleChange}
//                       error={Boolean(touched.email && errors.email)}
//                       helperText={touched.email && errors.email}
//                     />
//                   </Grid>

//                   <Grid item sm={6} xs={12}>
//                     <LightTextField
//                       fullWidth
//                       name="phone"
//                       placeholder="Phone Number"
//                       value={values.phone}
//                       onChange={handleChange}
//                       error={Boolean(touched.phone && errors.phone)}
//                       helperText={touched.phone && errors.phone}
//                     />
//                   </Grid>

//                   <Grid item sm={6} xs={12}>
//                     <LightTextField
//                       fullWidth
//                       name="country"
//                       placeholder="Country"
//                       value={values.country}
//                       onChange={handleChange}
//                       error={Boolean(touched.country && errors.country)}
//                       helperText={touched.country && errors.country}
//                     />
//                   </Grid>

//                   <Grid item sm={6} xs={12}>
//                     <LightTextField
//                       fullWidth
//                       name="state"
//                       placeholder="State/Region"
//                       value={values.state}
//                       onChange={handleChange}
//                       error={Boolean(touched.state && errors.state)}
//                       helperText={touched.state && errors.state}
//                     />
//                   </Grid>

//                   <Grid item sm={6} xs={12}>
//                     <LightTextField
//                       fullWidth
//                       name="city"
//                       placeholder="City"
//                       value={values.city}
//                       onChange={handleChange}
//                       error={Boolean(touched.city && errors.city)}
//                       helperText={touched.city && errors.city}
//                     />
//                   </Grid>

//                   <Grid item sm={6} xs={12}>
//                     <LightTextField
//                       fullWidth
//                       name="address"
//                       placeholder="Address"
//                       value={values.address}
//                       onChange={handleChange}
//                       error={Boolean(touched.address && errors.address)}
//                       helperText={touched.address && errors.address}
//                     />
//                   </Grid>

//                   <Grid item sm={6} xs={12}>
//                     <LightTextField
//                       fullWidth
//                       name="zip"
//                       placeholder="Zip/Code"
//                       value={values.zip}
//                       onChange={handleChange}
//                       error={Boolean(touched.zip && errors.zip)}
//                       helperText={touched.zip && errors.zip}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <LightTextField
//                       multiline
//                       fullWidth
//                       rows={10}
//                       name="about"
//                       placeholder="About"
//                       value={values.about}
//                       onChange={handleChange}
//                       error={Boolean(touched.about && errors.about)}
//                       helperText={touched.about && errors.about}
//                       sx={{
//                         "& .MuiOutlinedInput-root textarea": { padding: 0 },
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <Button type="submit" variant="contained">
//                       Create User
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </form>
//             </Card>
//           </Grid>
//         </Grid>
//       </Card>
//     </Box>
//   );
// };

// export default AddNewUser;



import { Box, Button, styled } from "@mui/material";
import axios from "axios";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
// import TransactionListColumnShape from "components/userManagement/columnShape";
import CustomTable from "components/userManagement/CustomTable";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import WarningModal from "modals/WarningModal";
import toast from "react-hot-toast";
import TransactionListColumnShape from "components/userManagement/transactionColumnShape";
import AddTransactionModal from "./AddTransactionModal";
import EditTransactionModal from "modals/EditTransactionModal";

import { client } from "../../client"
import CircularIndeterminate from "loader/CircularIndeterminate";

// styled component
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

const TransactionList: FC = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // change navbar title
  useTitle("Transaction List");

    const loggedInUserId = localStorage.getItem("loggedInUserId");

    console.log("check here-->", loggedInUserId);
    

  const accessToken = window.localStorage.getItem("accessToken");

  const [openModal, setOpenModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [delteItemId, setDeleteItemId] = useState("");

  const [openEditModal, setEditOpenModal] = useState(false);

  const [selectedData, setSelectedData] = useState({});

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (values: any, type:any) => {
    console.log("values---->", values, type);
    // return;
    
    const payload = {
      ...values,
      fromAccountId: values.from,
      toAccountId: values.to,
      type
    };
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/transactions/add", payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("response ->", response);
      
      setIsLoading(false);
      setOpenModal(false);
      fetchTransactionList();
      toast.success("Transaction created Successfully");
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid request. Please check your input and try again.");
      }
      setIsLoading(false);
    }
  };

  // const fetchTransactionList = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.get(
  //       "http://localhost:5000/api/transactions",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     //@ts-ignore
  //     setTransactionList(response.data.transactions);

  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log("error", error);
  //     setIsLoading(false);
  //   }
  // };

  const fetchTransactionList = async () => {
    try {
      setIsLoading(true);
      const response = await client.get(
        "http://localhost:5000/api/transactions"
      );
      console.log("response==>", response);
      
      //@ts-ignore
      setTransactionList(response.transactions);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionList();
  }, []);

  const handleEdit = (rowData: any) => {
    setSelectedData(rowData);
    setEditOpenModal(true);
  };

  const handleDelete = (rowData: any) => {
    setOpenWarningModal(true);
    setDeleteItemId(rowData.id);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `http://localhost:5000/api/transactions/delete/${delteItemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Transactions deleted Successfully");
      setIsLoading(false);
      setOpenWarningModal(false);
      setDeleteItemId("");
      fetchTransactionList();
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      setOpenWarningModal(false);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      setIsLoading(true);
      const payload = {
        ...values,
        fromAccountId: values.from,
        toAccountId: values.to,
      };
      await axios.put(
        `http://localhost:5000/api/transactions/update/${values.id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsLoading(false);
      setEditOpenModal(false);
      setSelectedData({});
      toast.success("Transactions updated Successfully");
      fetchTransactionList();
    } catch (error) {
      toast.error("Invalid request. Please check your input and try again."); 
      console.log("error", error);
      setIsLoading(false);
    }
  };
  console.log("transaction=>", transactionList);
  

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search user..." />
        <Button variant="contained" onClick={handleClickOpen}>
          Add New Transaction
        </Button>
      </StyledFlexBox>

      {/* {transactionList.length ? (
        <CustomTable
          columnShape={TransactionListColumnShape(handleEdit, handleDelete)}
          data={transactionList}
          loading={isLoading}
        />
      ) : (
        "No Transaction! Please Add"
      )} */}

      {isLoading ? (
        <CircularIndeterminate />
      ) : transactionList.length ? (
        <CustomTable
          columnShape={TransactionListColumnShape(
            handleEdit,
            handleDelete,
            loggedInUserId
          )}
          data={transactionList}
          loading={isLoading}
        />
      ) : (
        <p>No Transaction! Please Add</p>
      )}

      <AddTransactionModal
        open={openModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />

      <WarningModal
        open={openWarningModal}
        handleClose={() => setOpenWarningModal(false)}
        handleConfirmDelete={handleConfirmDelete}
      />

      <EditTransactionModal
        values={selectedData}
        open={openEditModal}
        handleClose={() => setEditOpenModal(false)}
        handleSubmit={handleUpdate}
      />
    </Box>
  );
};

export default TransactionList;
