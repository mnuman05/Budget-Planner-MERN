import { Box, Button, styled } from "@mui/material";
import axios from "axios";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import UserListColumnShape from "components/userManagement/columnShape";
import CustomTable from "components/userManagement/CustomTable";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import AddAccountModal from "./AddAccountModal";
import WarningModal from "modals/WarningModal";
import toast from "react-hot-toast";
import EditModal from "modals/EditModal";
import { client } from "../../client";
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

const UserList: FC = () => {
  const [accountList, setAccountList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // change navbar title
  useTitle("Account List");

  const accessToken = window.localStorage.getItem("accessToken");

  const [openModal, setOpenModal] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [delteItemId, setDeleteItemId] = useState('');

  const [openEditModal, setEditOpenModal] = useState(false);

  const [selectedData, setSelectedData] = useState({});

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await axios.post("http://localhost:5000/api/bank-accounts/add", values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setIsLoading(false);
      setOpenModal(false);
      fetchAccountList();
      toast.success("Account created Successfully");

    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Try with diffeent account")
      }
      setIsLoading(false);
    }
  };
  

  // const fetchAccountList = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.get(
  //       "http://localhost:5000/api/bank-accounts",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     //@ts-ignore
  //     setAccountList(response.data.bankAccounts);

  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log("error", error);
  //     setIsLoading(false);
  //   }
  // };

  const fetchAccountList = async () => {
    try {
      setIsLoading(true);
      const response = await client.get(
        "bank-accounts"
      );
      //@ts-ignore
      setAccountList(response.bankAccounts);

      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountList();
  }, []);


  const handleEdit = (rowData:any) => {
    setSelectedData(rowData);
    setEditOpenModal(true);
  };

  const handleDelete = (rowData:any) => {
    setOpenWarningModal(true);
    setDeleteItemId(rowData.id);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/api/bank-accounts/delete/${delteItemId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Account deleted Successfully");
      setIsLoading(false);
      setOpenWarningModal(false);
      setDeleteItemId("");
      fetchAccountList();
      

    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  const handleUpdate = async (values: any) => {
    try {
      setIsLoading(true);
      await axios.put(
        `http://localhost:5000/api/bank-accounts/update/${values.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsLoading(false);
      setEditOpenModal(false);
      setSelectedData({});
      toast.success("Account updated Successfully");
      fetchAccountList();
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Try with diffeent account");
      }
      console.log("error", error);
      setIsLoading(false);
    }
  }  

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Search user..." />
        <Button variant="contained" onClick={handleClickOpen}>
          Add New Account
        </Button>
      </StyledFlexBox>

      {/* {isLoading && <CircularIndeterminate />}

      {!isLoading && accountList.length ? (
        <CustomTable
          columnShape={UserListColumnShape(handleEdit, handleDelete)}
          data={accountList}
          loading={isLoading}
        />
      ) : (
        {!isLoading && "No Account! Please Add"}
      )} */}

      {isLoading ? (
        <CircularIndeterminate /> 
      ) : accountList.length ? (
        <CustomTable
          columnShape={UserListColumnShape(handleEdit, handleDelete)}
          data={accountList}
          loading={isLoading} 
        />
      ) : (
        <p>No Account! Please Add</p> 
      )}

      <AddAccountModal
        open={openModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />

      <WarningModal
        open={openWarningModal}
        handleClose={() => setOpenWarningModal(false)}
        handleConfirmDelete={handleConfirmDelete}
      />

      <EditModal
        values={selectedData}
        open={openEditModal}
        handleClose={() => setEditOpenModal(false)}
        handleSubmit={handleUpdate}
      />
    </Box>
  );
};

export default UserList;
