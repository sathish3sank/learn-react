import logo from './logo.svg';
import * as R from  "ramda";
import './App.css';
import React, {useState} from "react"

function App() {
  const initialNames = [
    {id : 1, fname : "Sathish", lname : "P"},
    {id : 2, fname : "Sankar", lname : "S"},
    {id : 3, fname : "Tamil", lname : "A"},
    {id : 4, fname : "Ashok", lname : "I"},
    {id : 5, fname : "Sample", lname : "H"},
    {id : 6, fname : "Sambavam", lname : "D"},
    {id : 7, fname : "Test", lname : "O"},
    {id : 8, fname : "Single", lname : "F"},
    {id : 9, fname : "Fname", lname : "N"},
    {id : 10, fname : "Lname", lname : "S"}
  ];
  const [names, setName] = useState(initialNames)
  const [formValue, setFormValues] = useState({fname : "", lname : "", id : ""});
  const [searchValue, setSearchValue] = useState({searchfname : "", searchlname : ""})

  const changeHandler = (e) => {
    setFormValues({...formValue, [e.target.name] : e.target.value})
  }

  const onSetUpdate = (name) => {
    setFormValues({fname : name.fname, lname : name.lname, id : name.id})
  }

  const onDelete = (name) => {
   const filteredNames = names.filter((e) => e.id !== name.id);
   setName(filteredNames)
  }


  const updateNames = (name) => {
    const updatedNames = names.map((e) => {
      if(e.id === name.id){
        return {...e, fname : name.fname, lname : name.lname}
      }
      return e
    })
    console.log(updatedNames)
    setName(updatedNames);
    setFormValues({fname : "", lname : ""})
  }

  const searchHandler = (e) => {
    setSearchValue({...searchValue,  [e.target.name] : e.target.value})
    const searched = R.uniq([...names.filter((f) => f.fname.includes(searchValue.searchfname)),...names.filter((f) => f.lname.includes(searchValue.searchlname))]);
    console.log("Searched ::", searched)
    setName(searched)
  }

  return (
    <div className="App">
      <input name = "id" type = "hidden" onChange = {changeHandler} value={formValue.id}/>
      <input name = "fname" onChange = {changeHandler} value={formValue.fname}/>
      <input name = "lname" onChange = {changeHandler} value = {formValue.lname}/>
      <button type = "button" onClick = {() => updateNames(formValue)}>Update Name</button>
      <div>
        Search
      </div>
      <div>
        <input name = "searchfname" type="text" onChange={searchHandler} value = {searchValue.searchfname}/>
        <input name = "searchlname" type="text" onChange={searchHandler} value = {searchValue.searchlname}/>
      </div>
      <div>
        <ul>
        {names.map((name)=>{
          return <div>
            <li key={name.id}>{name.fname}, {name.lname}</li>
            <div>
              <div>
                <span>
                    <button type = "button" onClick={() => onSetUpdate(name)}>Update</button>
                </span>
                
                <span>
                  <button type = "button" onClick={() => onDelete(name)}>Delete</button>
                </span>
              </div>
            </div>
          </div>
        })}
      </ul>
      </div>
    </div>
  );
}

export default App;
