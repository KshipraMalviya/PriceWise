import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Line, Tooltip, Area, Legend, LineChart, BarChart, Bar } from 'recharts'

type Props = {}

const First = (props: Props) => {

   const { data } = useGetKpisQuery();
   console.log('data: ', data)
   const { palette } = useTheme();

   const revenueExpenses = useMemo(() => {
      return(
        data && // data exists
        data[0].monthlyData.map(({month, revenue, expenses}) => {
          return {
            name: month.substring(0, 3),
            revenue: revenue,
            expenses: expenses
          }
        })
      )
   }, [data])

   const revenueProfit = useMemo(() => {
    return(
      data && // data exists
      data[0].monthlyData.map(({month, revenue, expenses}) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue-expenses).toFixed(2)
        }
      })
    )
 }, [data])

 const revenue = useMemo(() => {
  return(
    data && // data exists
    data[0].monthlyData.map(({month, revenue, expenses}) => {
      return {
        name: month.substring(0, 3),
        revenue: revenue
      }
    })
  )
}, [data])
   
  return (
    <>
        <DashboardBox gridArea='a'>
          <BoxHeader title='Revenue And Expenses'/>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
                height={400}
                data={revenueExpenses}
                margin={{
                  top: 15,
                  right: 25,
                  left: -10,
                  bottom: 60,
                }}
              >
              <XAxis dataKey="name" tickLine={false} style={{ fontSize: "12px"}}/>
              <YAxis tickLine={false} axisLine={{strokeWidth: "0"}} style={{ fontSize: "10px"}} domain={[10000, 23000]}/>
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#0fbcf9" fillOpacity={1} fill="#3867d6" dot={true}/>
              <Area type="monotone" dataKey="expenses" stroke="#fa8231" fillOpacity={1} fill="#fed330" dot={true}/>
            </AreaChart>
          </ResponsiveContainer>
        </DashboardBox>
        
        <DashboardBox gridArea='b'>
        <BoxHeader title='Profit And Revenue'/>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueProfit}
                margin={{
                  top: 20,
                  right: 0,
                  left: -10,
                  bottom: 55,
                }}
              >
                <CartesianGrid vertical={false} stroke={'#a5b1c2'}/>
              <XAxis dataKey="name" tickLine={false} style={{ fontSize: "12px"}}/>
              <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px"}}/>
              <YAxis yAxisId="right" orientation='right' tickLine={false} axisLine={false} style={{ fontSize: "10px"}}/>
              <Tooltip />
              <Legend
                height={20}
                wrapperStyle={{
                  margin: '0 0 10px 0'
                }}
              />
              <Line yAxisId="left" type="monotone" dataKey="profit" stroke='#3867d6'/>
              <Line yAxisId="right" type="monotone" dataKey="revenue" stroke='#f7b731'/>
            </LineChart>
          </ResponsiveContainer>
        </DashboardBox>
        
        <DashboardBox gridArea='c'>
        <BoxHeader title='Revenue Month By Month'/>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 58,
          }}
        >
          <CartesianGrid vertical={false} stroke={'#a5b1c2'}/>
          <XAxis dataKey="name" axisLine={false} tickLine={false} style={{fontSize: "10px"}} />
          <YAxis axisLine={false} tickLine={false} style={{fontSize: "10px"}} />
          <Tooltip />
          <Bar dataKey="revenue" fill="#fed330" />
        </BarChart>
      </ResponsiveContainer>
        </DashboardBox>
    </>
  )
}

export default First
