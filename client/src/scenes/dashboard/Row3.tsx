import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetProductsQuery, useGetTransactionsQuery } from '@/state/api'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridCellParams } from '@mui/x-data-grid'

type Props = {}

const Row1 = (props: Props) => {

  const { data: transactionData } = useGetTransactionsQuery();
  const { data: productData} = useGetProductsQuery();

  // console.log("transactionData:", transactionData)

  const productColumns =[
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`
    }
  ]

  const transactionColumns =[
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.68
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.35,
      renderCell: (params: GridCellParams) => (params.value as Array<String>).length
    }
  ]

  return (
    <>
        <DashboardBox gridArea='g'>
          <BoxHeader title='List Of Products' sideText={`${productData?.length} products`}/>
          <Box mt='0.5rem' p='0 0.5rem' height='80%'
            sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: '#fed330'
                }
            }}
          >
            <DataGrid
              rows={productData || []}
              columns={productColumns}
              columnHeaderHeight={35}
              rowHeight={35}
              hideFooter={true}
            />
          </Box>
        </DashboardBox>

        <DashboardBox gridArea='j'>
          <BoxHeader title='Overall Summary'/>
          <Box height="35px"
              margin="1.25rem 1rem 0.4rem 1rem"
              bgcolor={'#3867d6'}  
              borderRadius="1rem">
            <Box height="35px"
              bgcolor={'#fed330'}  
              borderRadius="1rem"
              width="40%"
            >
            </Box>
          </Box>
          <Typography padding="18px" variant='h5'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora nostrum dolor deleniti quae iusto quam dolore vitae ab, sint quas quibusdam accusamus, dicta sequi temporibus omnis neque. Cupiditate, laboriosam repudiandae.
          </Typography>
        </DashboardBox>

        <DashboardBox gridArea='h'>
        <BoxHeader title='List Of Recent Orders' sideText={`${transactionData?.length} latest transactions`}/>
          <Box mt='0.5rem' p='0 0.5rem' height='82%'
            sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: '#fed330'
                }
            }}
          >
            <DataGrid
              rows={transactionData || []}
              columns={transactionColumns}
              columnHeaderHeight={35}
              rowHeight={35}
              hideFooter={true}
            />
          </Box>
            </DashboardBox>
    </>
  )
}

export default Row1