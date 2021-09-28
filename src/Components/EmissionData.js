import axios from 'axios';
import React, { Component} from 'react';
import EmissionChart from './EmissionChart';
import EmissionTableData from './EmissionTableData';
 

export class  EmissionData extends Component {
    
    state = {
        receivedEmissionData:[]
    }

    //Make a call to the relevant api. 
    fetchEmission = async () =>
    {
        await axios.get('http://127.0.0.1:8081/api/emissionData')
        .then(responseData =>{

            //get the response and assign it to state of the component
           this.setState({receivedEmissionData:responseData.data});  
             
        }).catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){

        this.fetchEmission();
       
    }

    render(){

        
        return(

                
            <div className="Home">
                <header className="App-header">
                            <h2 className="Title">Carbon Monoxide and Carbon Dioxide Emission </h2>

                            {/* Pass the received data to the chart Component that will display the data on a chart */}
                            {
                            this.state.receivedEmissionData && (<EmissionChart emissionData ={this.state.receivedEmissionData}/>)
                            }

                            
                            {/*
                              Pass the received data to the emission data component that will filter and display the data on a table 
                            */}
                            <EmissionTableData emissionData={this.state.receivedEmissionData}/>
                </header>
            </div>
         )
    } 
     
}

 