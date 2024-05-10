import { Delete, Edit } from "@mui/icons-material";

const TransactionListColumnShape = (
  handleEdit: Function,
  handleDelete: Function,
  loggedInUserId: any
) => [
  {
    Header: "Id",
    accessor: "id",
    minWidth: 150,
  },
  {
    Header: "Description",
    accessor: "description",
    minWidth: 150,
  },
  {
    Header: "Amount",
    accessor: "amount",
    minWidth: 150,
  },
  {
    Header: "From",
    accessor: "fromAccountId",
    minWidth: 150,
  },
  {
    Header: "To",
    accessor: "toAccountId",
    minWidth: 150,
  },
  {
    Header: "Actions",
    accessor: "actions",
    // Cell: ({ row }: any) =>{
    //     console.log("rowww-<", row, loggedInUserId);
    //     return (
    //   <div>
    //     <Edit onClick={() => handleEdit(row.original)} />
    //     <Delete onClick={() => handleDelete(row.original)} />
    //   </div>
    //     )
    //   },

    Cell: ({ row }: any) => {
      // Check if the logged-in user ID matches the user ID associated with the transaction
      if (
        loggedInUserId === row.original.userId &&
        row.original.transactionType == 1
      ) {
        console.log("rowww-->", row);

        return (
          <div>
            <Edit onClick={() => handleEdit(row.original)} />
            <Delete onClick={() => handleDelete(row.original)} />
          </div>
        );
      } else {
        return null; // Render nothing if the condition doesn't match
      }
    },

    disableSortBy: true,
    minWidth: 100,
  },
];

export default TransactionListColumnShape;
