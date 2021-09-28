

function EmissionVerification(props){
 
    

    if(props.belowThreshold)
    {
        return(
            
            <h4 className="text-success"> The amount of all emissions is 
            below the threshold threshold. </h4>
        )

    }
    else
    {
        return (<h4 className="text-danger"> The amount of all emissions is 
        above the threshold threshold. </h4>)
    }

};

export default EmissionVerification