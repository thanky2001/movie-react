import { TableRow, withStyles } from "@material-ui/core";

export const StyledTableRow = withStyles(() => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
  }))(TableRow);

