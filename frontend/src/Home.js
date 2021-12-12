import React from 'react'
import { Component } from 'react'
import './App.css'

function Home() {
    return (
        <div className='Home'>
            <h1>Home</h1>
            <JsonForm />
        </div>
    )
}

export default Home

class JsonForm extends Component{
    constructor(props){
        super(props)
        this.state={
            //Loan_ID,Gender,Married,Dependents,Education,Self_Employed,ApplicantIncome,CoapplicantIncome,LoanAmount,Loan_Amount_Term,Credit_History,Property_Area,Loan_Status
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({
            [event.target.name] : [event.target.value]
        })
    }

    handleSubmit(event){
        alert(this.state.input1)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <table><tbody>
                        <tr><td>Gender</td><td>
                    <input type="text" value={this.state.input1} name='input1' onChange={this.handleChange}></input></td></tr>
                    </tbody></table>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
}
