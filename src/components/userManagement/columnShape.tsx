import { Delete, Edit } from "@mui/icons-material";

const UserListColumnShape = (handleEdit: Function, handleDelete: Function) => [
  {
    Header: "Account Number",
    accessor: "accountNumber",
    minWidth: 150,
  },
  {
    Header: "Title",
    accessor: "title",
    minWidth: 150,
  },
  {
    Header: "Balance",
    accessor: "balance",
    minWidth: 150,
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({row}: any) => (
      <div>
        <Edit onClick={() => handleEdit(row.original)} />
        <Delete onClick={() => handleDelete(row.original)} />
      </div>
    ),
    disableSortBy: true,
    minWidth: 100,
  }
];

export default UserListColumnShape;
