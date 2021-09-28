import React,{Component} from 'react';

export class Home extends Component{

    render(){
        return (
            <div className="Home">
                <header className="App-header">
                     <h1 className="Title">Welcome to Emission Data Portal </h1>
                  <a className="button" href='/emissiondata'> View Emission Data </a>
                </header>
             </div>
        )
    }
}