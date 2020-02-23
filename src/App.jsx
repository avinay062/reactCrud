import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      title: 'CRUD Application',
      act: 0,
      index: '',
      datas: []
    }
  }

  componentDidMount(){
    this.refs.fname.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let fname = this.refs.fname.value;
    let lname = this.refs.lname.value;
    let email = this.refs.email.value;

    if (this.state.act === 0) { //new
      let data = {
        fname,lname, email
      }
  
      datas.push(data); 
    } else {                    //update
      let index = this.state.index;
      datas[index].fname = fname;
      datas[index].lname=lname;
      datas[index].email = email;
    }

    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.fname.focus();
  }

  fRemove = (i) => {
    let datas  = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas:datas
    });

    this.refs.myForm.reset();
    this.refs.fname.focus();
  }
  
  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.fname.value = data.fname;
    this.refs.lname.value=data.lname;
    this.refs.email.value = data.email;

    this.setState({
      act: 1,
      index: i 
    })

    this.refs.fname.focus();
  }

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="fname" placeholder="your first name" className="formField" />
          <input type="text" ref="lname" placeholder="your last number" className="formField"/>
          <input type="text" ref="email" placeholder="your email" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Submit</button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}.{data.fname},{data.lname},{data.email}
              <button onClick={()=>this.fRemove(i)} className="myListButton">Remove</button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">Edit</button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;