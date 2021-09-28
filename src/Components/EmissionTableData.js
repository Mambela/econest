 
import moment from "moment";
import {  useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import DataTable from "react-data-table-component";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import EmissionVerification from "./EmissionVerification";
 

 
const EmissionTableData =(props) =>{

 
        //Prepare the column header for the table 
    const emissionColums = [
        {
            name:"Gas",
            selector:row=>row.gas,
            sortable: true,
            
        },
        {
            name:"Amount",
            selector:row=>row.amount,
            sortable: true,
        },
        {
            name:"Date",
            selector:row=>row.date,
            sortable: true,
        }
    ];
    
    //prepare the variables that will be used to control the state in the application
    const[emissionData,setEmissionData] = useState(props.emissionData);
    const[emissionThreshold,setEmissiontThreshold] =useState();

    
    const loadtableData =() =>{
        setEmissionData(props.emissionData);     
    };
    


    useEffect(()=>{
        
        loadtableData();
    },[]);
    
    
    useEffect(()=>{
        
        verifyGasLevel();
    });
    
    
    const verifyGasLevel = () =>{
        
        let emissinGasData  = props.emissionData;
        let emissionVerification = true;
        
        for(const emissionObj of  emissinGasData )
        {
            if(emissionObj.amount >  0.25)
            {
                emissionVerification = false;
              
            }
        }
        
        setEmissiontThreshold(emissionVerification);
    }
    

        //Get the date ranges and use it to filtere the emission object
    const handleDateRangeCallBack = (start, end) => {
        
        let filtStartDate =  moment(start._d).format('YYYY-MM-DD');
        let filterEndDate = moment(end._d).format('YYYY-MM-DD');
        
        let unfilteredEmission = props.emissionData;
        
        
        const filteredEmission = unfilteredEmission.filter((emiObj) => emiObj.date >= filtStartDate &&  emiObj.date <= filterEndDate);
        console.log("Filtered Values",filteredEmission);
        
        setEmissionData(filteredEmission);
    };
    

    //pass the respective values to the data table and read values from the Date range picker.
    //Pass the emission threshold verification for the 

    return(
   
        <div className="container mb-4">
               
               <div className="row">

                   <div className="col-md-9 mx-auto">   

                         {/*Component that will display the message whether the emissions are above or below the threshold  */}
                        <EmissionVerification belowThreshold={emissionThreshold}/>
                   </div>

                   <div className="mx-auto col-md-9">
                       <div className="row">
                           <div className="col-md-6 text-dark">
                             Filter
                           </div>
                           <div className="col-md-5">
                               
                               {/* bind the the call back and filter data  */}
                           <DateRangePicker initialSettings={{ startDate: '6/1/2021', endDate: '8/1/2021' }}
                            onCallback={handleDateRangeCallBack}
                        >
                            <input type="text" className="form-control" />
                        </DateRangePicker>
                           </div>
                       </div>
                      
                        <h3 className="Title mt-3"> Gas emission Table</h3>

                    {/* Pass column header and data to the Datatable */}
                    <DataTable columns={emissionColums} data={emissionData}/>
                   </div>
               </div>
                
            </div>
        )
}

export default EmissionTableData