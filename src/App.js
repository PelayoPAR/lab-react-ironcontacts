import "./App.css";
import contactList from "./contacts.json";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  
  const [sortToggle, setSortToggle] = useState(true)

  function sortContacts() {
        const contactsToSort = [...contacts]
        contactsToSort.sort((a, b) => {
         return sortToggle 
          ? b.popularity - a.popularity
          : a.popularity - b.popularity
        })
        setContacts(contactsToSort)
        setSortToggle(!sortToggle)
  }

  function sortNames() {
        const namesToSort = [...contacts]
        namesToSort.sort((a, b) => {
          return sortToggle
          ? b.name.localeCompare(a.name)
          : a.name.localeCompare(b.name)
        })
        setContacts(namesToSort)
        setSortToggle(!sortToggle)
  }
  // ^^^ alteratively the functions above (sortContacts and sortNames) could be just one that takes 3 arguments: 1.array copy to sort, 2.property to sort by, 3.optionally a different toggle
  
  function deleteSmugActoress(contact) {
    setContacts(contacts.filter((actoress) => { 
        return  actoress.name !== contact.name
    }))
  }

  function getRandomContact(contactList) {
    const randomIndex = Math.floor(Math.random() * contactList.length)
    return contactList.splice(randomIndex, 1)[0]
  }
  // console.log(contacts)
  return (
    <div className="App">
    <h1>IronContacts</h1>
    <h2>AKA Cancel the Actoresses as per Comintern's Orders</h2>
    <div className="buttonsDiv">
     <button className="threeButtons" onClick={()=> {
        setContacts([...contacts, getRandomContact(contactList)])
      }}>Add Random Contact</button>
      <button className="threeButtons" onClick={sortContacts}>Sort by popularity</button>
      <button className="threeButtons" onClick={sortNames}>Sort by name</button>
      </div>
      <div className="mainTable">
      <table>
        <thead>
          <tr>
            <th style={{minWidth: "120px"}}><b>Picture</b></th>
            <th style={{minWidth: "180px"}}><b>Name</b></th>
            <th style={{minWidth: "120px"}}><b>Popularity</b></th>
            <th style={{minWidth: "120px"}}><b>Won an Oscar</b></th>
            <th style={{minWidth: "120px"}}><b>Won an Emmy</b></th>
            <th style={{minWidth: "280px"}}><b>Actions</b></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => {
            return (      
              <tr key={index} style={{background: index%2===0 
              ? "lightgrey"
              : "white", 
              }}>
                <td><img style={{width: "80px"}} src={contact.pictureUrl} alt="someSmugHollywoodStar"></img></td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar 
                  ? "🏆"
                  : null
                }</td>
                <td>{contact.wonEmmy 
                  ? "🌟"
                  : null
                }</td>
                <td><button style={{color: "white", background: "red"}} onClick={() => deleteSmugActoress(contact)}>Launch Cancellation WitcHunt Campaign</button></td>
              </tr>
            );
         })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
