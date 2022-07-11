
import {useState,useEffect} from "react";
import Card from "../src/components/Card"
import Axios from "axios";

function App() {

  const [listOfUsers,setListOfUsers] = useState([]);
  const [name,setName] = useState(" ");
  const [phone,setPhone] = useState(0);
  const [email,setEmail] = useState(" ");

  //callbackend
  useEffect(() => {
Axios.get("http://localhost:3001/getUsers").then((response) => {
  setListOfUsers(response.data)
})
  },[]);

const createUser = () => {
Axios.post("http://localhost:3001/createUser",{
  name:name,
  phone:phone,
  email:email,
}).then((response) => {
  setListOfUsers([...listOfUsers,{name:name,
    phone:phone,
    email:email,}])
})
}

  return (
    
    <div className="App">
      <h1 className="heading">My Contacts</h1>
      <div className="usersDisplay">
      {listOfUsers.map((user,key) => {
        return(<Card
        key={user.key}
        name={user.name}
        phone={user.phone}
        email={user.email}
        />)
        
      })}
      </div>
      <div className="form">
        <input className="form-input" type='text' placeholder='Name....'onChange={(event) => {
              setName(event.target.value)
        }}
/>
        <input className="form-input" type='number' placeholder='Phone....'onChange={(event) => {
              setPhone(event.target.value)
        }}
/>
        <input className="form-input" type='text' placeholder='Email....' onChange={(event) => {
              setEmail(event.target.value)
        }}
/>
        <button className="form-button" onClick = {createUser}>Create User</button>
      </div>
    </div>
  )
}

export default App;
