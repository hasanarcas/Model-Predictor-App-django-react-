import React from 'react'
import { Component } from 'react/cjs/react.production.min'
import './App.css'

function UploadForm() {
    return (
        <div className='UploadForm'>
            <h1>Batch Processing:</h1>
            <FormBatch />
        </div>
    )
}

export default UploadForm

class FormBatch extends Component{
    constructor(props){
        super(props)
        this.state= {
            selectFile: null,
            output: false,
            respFromServer:null
        }

        this.handleFile = this.handleFile.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleFile(event){
        this.setState({[event.target.name]: event.target.files[0]})
    }

    handleUpload = async event =>{
        event.preventDefault()
        const url="http://127.0.0.1:8000/scoreFile"
        var formdata = new FormData();
        formdata.append("filePath", this.state.selectFile, this.state.selectFile.name)
        const reqOpt={
            method:'POST', body: formdata
        }

        const resp = await fetch(url, reqOpt)
        const resp2 = await resp.json()
        this.setState({respFromServer: resp2.result})
        this.setState({output: true})
    }

    render(){

        const iterateData= this.state.respFromServer
        const checkPoint = this.state.output
        let finalTableData
        if (checkPoint) {
            const tableData= iterateData.map((x) =>
                <tr><td>{x[0]}</td><td>{x[1]}</td></tr>
            )
            finalTableData=<table>
                <tbody>
                    <tr><td>Id</td><td>Probability</td></tr>
                    {tableData}
                </tbody>
            </table>
        }else{
            finalTableData="No response"
        }

        return(
            <div>
                <form onSubmit={this.handleUpload}>
                    <input type='file' name='selectFile' onChange={this.handleFile}></input>
                    <input type='submit' value='Submit'></input>
                </form>
                <div>{ finalTableData }</div>
            </div>
        )
    }
}