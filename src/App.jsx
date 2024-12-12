import { useState, useEffect } from 'react'
import { db } from "./firebaseConfig";
import { collection, getDocs, query, doc, deleteDoc } from "firebase/firestore";
import './App.css'
import GuestList from './components/GuestList';

function App() {
  const [guests, setGuests] = useState([])
  const [loading, setloading] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    getGuests();
  }, [])

  useEffect(() => {
    sumGuests(guests);
  }, [guests])

  const getGuests = async () => {
    try{
      setloading(true);

      const q = query(collection(db, "guests"))
      const querySnapshot = await getDocs(q);
    
      let guestsArr = [];

      querySnapshot.forEach((doc) => {
        const id = doc.id;
        guestsArr = [...guestsArr, {...doc.data(), id}]
      })

      setGuests(guestsArr);
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  }

  const sumGuests = (guests) => {
    setAmount(guests.reduce((n, {guests}) => n + guests, 0))
  }

  const deleteGuest = async (id) => {
    try{
      setloading(true);
      await deleteDoc(doc(db, "guests", id));
      setGuests(guests.filter((guest) => guest.id != id))
    } catch (err) {
      console.error(err);
    } finally {
      setloading(false);
    }
  }

  return (
    <>
      <GuestList guests={guests} deleteGuest={deleteGuest} loading={loading} amount={amount} />
    </>
  )
}

export default App
