import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import CustomTable from "components/userManagement/CustomTable";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import WarningModal from "modals/WarningModal";
import toast from "react-hot-toast";
import TransactionListColumnShape from "components/userManagement/transactionColumnShape";
import EditTransactionModal from "modals/EditTransactionModal";

import { client } from "../../client"
import CircularIndeterminate from "loader/CircularIndeterminate";
import AddTransactionModal from "modals/AddTransactionModal";

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
  useTitle("Transaction List");

  const loggedInUserId = localStorage.getItem("loggedInUserId");

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
      const response = await client.post("transactions/add", payload);
      console.log("response ->", response);
      
      setIsLoading(false);
      setOpenModal(false);
      fetchTransactionList();
      toast.success("Transaction created Successfully");
    } catch (error:any) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid request. Please check your input and try again.");
      }
      setIsLoading(false);
    }
  };

  const fetchTransactionList = async () => {
    try {
      setIsLoading(true);
      const response = await client.get("transactions");
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
      const response = await client.delete(`transactions/delete/${delteItemId}`);
      console.log("response", response);
      

      toast.success("Transactions deleted Successfully");
      setIsLoading(false);
      setOpenWarningModal(false);
      setDeleteItemId("");
      fetchTransactionList();
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong, could not delete transaction.."); 
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
      const response = await client.put(`transactions/update/${values.id}`, payload);
      console.log("response", response); 
      
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
  

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search user..." />
        <Button variant="contained" onClick={handleClickOpen}>
          Add New Transaction
        </Button>
      </StyledFlexBox>


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
