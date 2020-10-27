import React, {Component, Fragment} from 'react'


class Main extends Component{
    constructor(props) {
        super(props)
   
        this.state = {

          newuser:{
            name:'',
            email:'',
            date:'',
            address:''
          },
          users: [],
          showData: true,
          arrIndex: '',
          editOption: false
        }
    }
   
    handleInput = (e) => {
      let input_data = Object.assign({}, this.state.newuser);
     
      const fields = e.target.id;
      input_data[fields] = e.target.value;

        this.setState({
             newuser : input_data
        })
     
    }

    submitData = () => {
      if(this.state.newuser.name ==='' || this.state.newuser.email===''){
        console.log("enter all the fields")
      }

      else{
          if(this.state.editOption === true){
            let {users, arrIndex, newuser} = this.state;
            let new_data = Object.assign([], users);
            new_data.splice(arrIndex, 1);
            new_data.push(newuser);
            this.setState({
              users: new_data
            }, () => {
              console.log('state ', this.state.users);
            })
           
          } else{
            this.state.users.push(this.state.newuser)
            this.setState({
              showData: true,
              newuser: {
                name: '',
                email: '',
                date: '',
                address:''
          },
       })
      }
     }
    }

    editForm(value, index){
      console.log(value);
      this.setState({
        newuser: value,
        arrIndex: index,
        editOption: true,
      })

    }


    delForm = (index)=> {
      let new_data = Object.assign([], this.state.users);
      new_data.splice(index, 1);
      this.setState({
        users: new_data
      })
    }

    render(){
      console.log('user data', this.state.users);
      const userData = this.state.users;
      return(

        <Fragment>
           <div style={{padding:'1%'}}>
              <div>
                  <label>Employee Name</label>
                  <input type="text" id="name" value= {this.state.newuser.name}
                  onChange = { this.handleInput } />
              </div>
              <div style={{padding:'1%'}}>
                  <label>Employee Email</label>
                  <input type="text" id="email" value= {this.state.newuser.email}
                  onChange={ this.handleInput }/>
              </div>
              <div style={{padding:'1%'}}>
                  <label>Date of Joining</label>
                  <input type="date" id="date" value= {this.state.newuser.date}
                  onChange={ this.handleInput }/>
              </div>
              <div style={{padding:'1%'}}>
                  <label>Address</label>
                  <textarea type="text" id="address" value= {this.state.newuser.address}
                  onChange={ this.handleInput }/>
              </div>
         </div>
         <button onClick={this.submitData}>Submit</button>



         {
           this.state.showData ?
          <div className="table">

              <table border="1">
                <tr>
                    <td>EmpName</td>
                    <td>EmpEmail</td>
                    <td>Date</td>
                    <td>Address</td>
                </tr>
                  {
                    userData && userData.map((value, index) => {
                      return (
                        <tr>
                          <td>{value.name}</td>
                          <td>{value.email}</td>
                          <td>{value.date}</td>
                          <td>{value.address}</td>

                            <button onClick={this.editForm.bind(this, value ,index)}>Edit</button>
                            <button onClick={this.delForm.bind(this, index)}>Delete</button>
                        </tr>
                       

                                               
                      )
                    })
                  }
                   
              </table>
        </div> : null
         }
         
        </Fragment>
       
      )        
               
    }
}

export default Main;