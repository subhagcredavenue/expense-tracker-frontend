
import { Card } from "antd";
import moment from "moment";
import React, {useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { getTransactionsByType } from "../utility";
import { CREDIT ,DEBIT } from "../utility/constants";
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return windowSize;
}

export default function App({data}) {
  const [creditData,setCreditData]=useState([])
  const {width,height} = useWindowSize();
const xAxisTickFormatter = (value)=> moment(value).format("DD MMM YY")
  const yAxisTickFormatter = (value) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div style={{padding:5,background:"#f0f2f5",borderRadius:2,border:"1px grey solid"}}>
          {payload[0].name} : ₹{payload[0].payload.amount}<br/>
          Date : {moment(payload[0].payload._id.date).format('DD MMM YYYY')}
          
          
        </div>
      );
    }

    return null;
  }
  return ( <Card key={width}>
     <ResponsiveContainer height={height*.3}>
          <AreaChart
            data={getTransactionsByType(data,DEBIT)}
            syncId="anyId"
            margin={{
              top: 10,
              right: 20,
              left: -20,
              bottom: 0,
            }}
          >
             <XAxis dataKey="_id.date" tick={false} angle="-5" tickFormatter={xAxisTickFormatter} allowDuplicatedCategories={false}/>
      <YAxis dataKey="amount" 
      tickFormatter={yAxisTickFormatter}/>
      <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="amount" name="Debit" stroke="#000" fill="red" />
          </AreaChart>
        </ResponsiveContainer>
        <ResponsiveContainer height={height*.3}>
          <AreaChart
            data={getTransactionsByType(data,CREDIT)}
            syncId="anyId"
            margin={{
              top: 10,
              right: 20,
              left: -20,
              bottom: 10,
            }}
          > <XAxis dataKey="_id.date" angle="" tickFormatter={xAxisTickFormatter} allowDuplicatedCategories={false}/>
          <YAxis dataKey="amount" 
          tickFormatter={yAxisTickFormatter}/>
         <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="amount" name="Credit" stroke="#000" fill="lightgreen" />
          </AreaChart>
        </ResponsiveContainer>
    </Card>
  );
}
