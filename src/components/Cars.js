import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const style = {
  h1:{
    textAlign:'center'
  }
}

const cellEditProp = {
  mode:'click',
  afterSaveCell: onAfterSaveCell
}

function onAfterSaveCell(row,cellName,cellValue){
  var temp = {
    _id:row._id,
    name: row.name,
    sign: row.sign,
    isBusy: row.isBusy,
    willBeFree: row.willBeFree,
    deliveryID: row.deliveryID
  };
  console.log(temp);
  axios.put('http://localhost:3012/cars',temp).
  then(function(response)
  {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
};


class Cars extends React.Component{
  constructor(props)
  {
    super(props);
    this.state ={
      cars:[]
    };
  }

  deleteCar=(e)=>{
    alert('felete');
  }

  componentDidMount(){
    axios.get('http://localhost:3012/cars')
    .then(res=>{
      const cars = res.data;
      this.setState({cars});
    });
  }
  render(){
    return <div>
    <h1 style={style.h1}>Cars</h1>
    <BootstrapTable data={this.state.cars} cellEdit={cellEditProp} striped hover >
      <TableHeaderColumn isKey dataField='_id'>Car ID</TableHeaderColumn>
      <TableHeaderColumn dataField='name'>Car Name</TableHeaderColumn>
      <TableHeaderColumn dataField='sign'>Car Sign</TableHeaderColumn>
      <TableHeaderColumn dataField='isBusy'>Is Busy</TableHeaderColumn>
      <TableHeaderColumn dataField='willBeFree'>Will Be Free</TableHeaderColumn>
      <TableHeaderColumn dataField='deliveryID'>Delivery ID</TableHeaderColumn>
    </BootstrapTable>
    </div>
  }
}

export default Cars;
