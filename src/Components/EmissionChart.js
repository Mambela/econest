import moment from "moment";
import React from "react";
import {Bar} from 'react-chartjs-2';

//class  EmissionChart extends Component {
  
class EmissionChart extends React.Component {

    chartData =[{}]

    //receive the props from the parent component and assign it to a state of the Component
    constructor(props)
    {
        super(props);
        this.state={
            EmissionData:[this.props.emissionData],
             
        }
    }


    //Prepare the data that will passed to the chart
    chart = () =>{


        //the different data sets that will be used in the chart. 
        let gasEmissionAmtCO =[];
        let gasEmissionAmtCO2 =[];
        let threshold =[];

        //iterate through all the objects in the array
        for(const dataObj of this.props.emissionData)
        {
            //Split the data between the different emissions
            switch (dataObj.gas) {
                case "CO":
                    gasEmissionAmtCO.push(dataObj)
                    threshold.push(0.25);
                    break;
                case "CO2":
                    gasEmissionAmtCO2.push(dataObj)
                    threshold.push(0.25);
                        break;
                default:
                    break;
            }
        }


        //Assign the different split data to specfic data sets. 
        this.chartData = ({
            labels:gasEmissionAmtCO.map(function(emissionObj){
                return moment(Date.parse(emissionObj.date)).format('DD/MM') ;
            }),
            datasets:[
                {
                      label: 'CO',
                      data:gasEmissionAmtCO.map(function(emissionObj){
                          return emissionObj.amount;
                      }) ,
                      backgroundColor: [ 'rgba(75,7,229,0.94)'],
                      borderWidth: 2
                }
                ,
                {
                    type:'bar',
                    label: 'CO-2',
                    data:gasEmissionAmtCO2.map(function(emissionObj){
                        return emissionObj.amount;
                    }),
                    backgroundColor: [ 'rgba(239,7,24,0.94)'],
                    borderWidth: 1
               },
               {
                   type:'line',
                   label: 'Threshold',
                   data:threshold,
                   borderColor: 'rgb(239,7,24)',
                   borderWidth: 4
               }
               

            ]
        });
    }

      
    render (){
        //trigger the chart function and pass it to a Bar component to display the data. 
        this.chart();
        return(
            
            <div className="App">
                <h4 className="Title">Emission Chart </h4>
                   <p> 
                       </p> 
                <div className="chart-container">
                    <Bar data={this.chartData} options={{
                        responsive : true
                    }}/>
                </div>
        </div>
        )
    }
     
}


export default EmissionChart;