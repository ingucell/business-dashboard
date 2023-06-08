import React, {useMemo} from 'react'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, LineChart, Legend, Line } from 'recharts';
import {useTheme, useMediaQuery} from '@mui/material'
import BoxHeader from '@/components/BoxHeader'

type Props = {};

const Row1 = (props: Props) => {
  const { palette } = useTheme()

  const smallScreens = useMediaQuery('(max-width: 1200px)')

  const { data } = useGetKpisQuery();
 
  const revenueExpenses = useMemo(() => {
    return (
      data && 
      data[0].monthlyData.map(({month, revenue, expenses})=>{
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        }
      })
    )
  }, 
  [data])

  const revenueProfit = useMemo(() => {
    return (
      data && 
      data[0].monthlyData.map(({month, revenue, expenses})=>{
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: revenue - expenses,
        }
      })
    )
  }, 
  [data])
 
  return (
   <>
        <DashboardBox  gridArea='a'>
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />

        <ResponsiveContainer width="100%" height={smallScreens ? '80%' : '80%'}>
        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 10,
            right: 30,
            left: 0, 
            bottom: 0,
          }}
        >
          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: '10px' }}/>
          <YAxis tickLine={false} style={{ fontSize: '10px' }} axisLine={{strokeWidth: '0'}} domain={[8000, 23000]}/>
          <Tooltip />
          <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue )" />
          <Area type="monotone" dataKey="expenses" stroke={palette.primary.main} dot={true} fillOpacity={1} fill="url(#colorExpenses )" />
        </AreaChart>
      </ResponsiveContainer>
        </DashboardBox>


        <DashboardBox  gridArea='b'>
        <BoxHeader
          title="Profit and Revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height={smallScreens ? '80%' : '80%'}>
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
        </DashboardBox>

        
        <DashboardBox  gridArea='c'></DashboardBox>
   </>
  )
}

export default Row1