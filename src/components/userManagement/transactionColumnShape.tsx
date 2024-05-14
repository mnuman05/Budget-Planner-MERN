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
    Header: "Transaction Type",
    accessor: "transactionType",
    minWidth: 150,
    Cell: ({ value }: { value: number }) => {
      // Function to map numerical type to string representation
      const getTypeString = (type: number): string => {
        switch (type) {
          case 1:
            return "Send";
          case 2:
            return "Withdrawal";
          case 3:
            return "Deposit";
          default:
            return "Unknown"; 
        }
      };

      return getTypeString(value);
    },
  },
  {
    Header: "Actions",
    accessor: "actions",

    Cell: ({ row }: any) => {
      if (
        (loggedInUserId === row.original.userId &&
          row.original.transactionType == 1) ||
        row.original.transactionType == 3
      ) {
        return (
          <div>
            <Edit onClick={() => handleEdit(row.original)} />
            <Delete onClick={() => handleDelete(row.original)} />
          </div>
        );
      } else {
        return null;
      }
    },

    disableSortBy: true,
    minWidth: 100,
  },
];

export default TransactionListColumnShape;
