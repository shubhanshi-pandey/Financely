import React from 'react'
import { Line } from '@ant-design/plots';
import { Pie } from '@ant-design/plots';



function ChartComponent({sortedTransactions}) {
    const data = sortedTransactions
  .filter(transaction => transaction.date) // Only include transactions with a date
  .map(transaction => ({
    date: transaction.date,
    amount: Number(transaction.amount) // Ensure amount is a number, 0 stays 0
  }));

const spendingData= sortedTransactions.filter((transaction) => {if(transaction.type=="expense"){
    return{tag:transaction.tag,amount:transaction.amount}; 
}
});
let finalSpendings= spendingData.reduce((acc,obj)=>{
    let key=obj.tag;
    if(!acc[key]){
        acc[key]={tag: obj.tag,amount:obj.amount};
    }else{
        acc[key].amount+=obj.amount;
    }
    return acc;
},{})

  
  const spendingConfig = {
    data: Object.values(finalSpendings),
    width:500,
    height:300,
    angleField: "amount",
    colorField: "tag",
  };
  const config = {
    data: data,
    width:500,
    height:300,
    autoFit: true,
    xField: 'date',
    yField: 'amount',
  };



  let chart ;
  let pieChart;
  return (
    <div className='chart-wrapper'>
    <div className='chart-box'>
        <h2>Financial Statistics</h2>
        <Line {...config} onReady={(chartInstance)=> (chart=chartInstance)} chart={chart} />
    </div>
    <div className='chart-box'>
        <h2 style={{marginTop:0}}>Your Spendings</h2>
        {Object.values(finalSpendings).length === 0 && (
      <p className="placeholder-text">Looks like you haven't spent anything yet.</p>
    )}
        <Pie {...spendingConfig} onReady={(chartInstance)=> (pieChart=chartInstance)}/>
        
    </div>
    </div>
  )
}

export default ChartComponent