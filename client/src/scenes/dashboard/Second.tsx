import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import { Box, Typography, useTheme } from '@mui/material'
import { useMemo } from 'react'
import { CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts'

// Second row of the main dashboard page

const Second = () => {

  const { data: productData } = useGetProductsQuery();
  const { data: operationalData } = useGetKpisQuery();
  // console.log("Data:", data)

  const pieColors = ['#3867d6', '#fed330']

  const pieChartData = useMemo(() => {
    if(operationalData) {
      const totalExpenses = operationalData[0].totalExpenses;
      return Object.entries(operationalData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value
            }
          ]
        }
      )
    }
  }, [operationalData])

  const operationalExpenses = useMemo(() => {
    return(
      operationalData && // data exists
      operationalData[0].monthlyData.map(({month, operationalExpenses, nonOperationalExpenses}) => {
        return {
          name: month.substring(0, 3),
          "Non Operational Expenses": nonOperationalExpenses,
          "Operational Expenses": operationalExpenses
        }
      })
    )
 }, [operationalData])

 const productExpenseData = useMemo(() => {
  return(
    productData && // data exists
    productData.map(({_id, price, expense}) => {
      return {
        id: _id,
        price: price,
        expense: expense
      }
    })
  )
}, [productData])

  return (
    <>
        <DashboardBox gridArea='d'>
        <BoxHeader title='Operational V/S Non-Operational Expenses'/>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={operationalExpenses}
                margin={{
                  top: 20,
                  right: 0,
                  left: -10,
                  bottom: 55,
                }}
              >
                <CartesianGrid vertical={false} stroke={'#a5b1c2'}/>
              <XAxis dataKey="name" tickLine={false} style={{ fontSize: "12px"}}/>
              <YAxis yAxisId="left" orientation='left' tickLine={false} axisLine={false} style={{ fontSize: "10px"}}/>
              <YAxis yAxisId="right" orientation='right' tickLine={false} axisLine={false} style={{ fontSize: "10px"}}/>
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" stroke='#3867d6'/>
              <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" stroke='#f7b731'/>
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>

        <DashboardBox gridArea='i'>
              <BoxHeader title='Expense Breakdown By Category'/>
              <FlexBetween mt='0.5rem' gap='0.5rem' p='0 1rem' textAlign="center">
                {pieChartData?.map((data,i) => (
                    <Box key={`${data[0].name}-${i}`}>
                    <PieChart width={130} height={180} >
                      <Pie
                        stroke='none'
                        data={data}
                        innerRadius={28}
                        outerRadius={61}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                  <Legend 
                  height={8}
                  wrapperStyle={{
                    margin: '0 0 10px 0'
                  }}
                  />
                  </PieChart>
                </Box>
                ))}
          </FlexBetween>
        </DashboardBox>

        <DashboardBox gridArea='f'>
        <BoxHeader title="Products Price V/S Expenses" />
        <ResponsiveContainer width="100%" height='100%'>
        <ScatterChart
          margin={{
            top: 20,
            right: 25,
            bottom: 40,
            left: 0,
          }}
        >
          <CartesianGrid stroke={'#a5b1c2'}/>
          <XAxis 
            type="number" 
            dataKey="price" 
            name="price" 
            axisLine={false} 
            tickLine={false} 
            style={{fontSize: "10px"}} 
            tickFormatter={(v) => `$${v}`}
          />
          <YAxis 
            type="number" 
            dataKey="expense" 
            name="expense" 
            axisLine={false} 
            tickLine={false} 
            style={{fontSize: "10px"}} 
            tickFormatter={(v) => `$${v}`}
          />
          <ZAxis 
            type="number" 
            range={[20]}
          />
          <Tooltip formatter={(v) => `$${v}`}/>
          <Scatter name="Product-Price Expense Ratio" data={productExpenseData} fill="#3867d6" />
        </ScatterChart>
      </ResponsiveContainer>
        </DashboardBox>
    </>
  )
}

export default Second