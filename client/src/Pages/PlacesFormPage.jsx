import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useState } from "react";
import AccountNav from "../AccountNav";
import { Navigate } from "react-router-dom";
import axios from 'axios';



export default function PlacesFormPage() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState('1');
    const [redirect, setRedirect] = useState(false);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    async function addNewPlace(ev) {

        ev.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests
        });
        setRedirect(true);
    }
    if(redirect) {
        return <Navigate to={'/account/places'}/>
    }

    return (
        <>
            <div>
                <AccountNav activeSubpage="places"  />
                <form onSubmit={addNewPlace}>
                    {preInput('Title', 'Title for your Place, should be short and catchy as in advertisement')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My Lovely Apartment" />

                    {preInput('Address', 'Address to this place')}
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="Address" />

                    {/* photo section  */}
                    {preInput('Photos', 'More = Better')}
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                    {preInput('Description', 'Description of the place')}
                    <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                    {preInput('Perks', 'Select all the perks of the place')}


                    <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        <Perks seleted={perks} onChange={setPerks} />
                    </div>

                    {preInput('Extra Info', 'House Rules etc')}
                    <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                    {preInput('CheckIn and CheckOut time', 'Add check in and out time,remember to have some time window for cleaning the room between guests')}


                    <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3 className="mt-2 -mb-1">Check in time</h3>
                            <input type="text"
                                value={checkIn}
                                onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Check out time</h3>
                            <input type="text"
                                value={checkOut}
                                onChange={ev => setCheckOut(ev.target.value)} placeholder="11:00" />
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1">Maximum number of guest</h3>
                            <input type="number"
                                value={maxGuests}
                                onChange={ev => setMaxGuests(ev.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button className="primary my-4">Save</button>
                    </div>

                </form>
            </div>
        </>
    );
}