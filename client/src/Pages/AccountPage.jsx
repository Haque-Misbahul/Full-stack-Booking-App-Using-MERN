import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage(){

    const [redirect, setRedirect] = useState(null);
    const {ready,user, setUser} = useContext(UserContext);
    const {subpage} = useParams();

   async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
    
   }

    if(!ready) {
        return 'Loading ...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }

    console.log('working');
    

    const activeSubpage = subpage || 'profile';  // Fallback to 'profile' if subpage is undefined
    
    function linkClasses(type = null) {
      return `py-2 px-6 ${type === activeSubpage ? 'bg-primary text-white rounded-full' : ''}`;
    }
    if (redirect) {
        return <Navigate to = {redirect} />
    }
    
    return(
        <div>
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}>My Accommodations</Link>
        </nav>
        {activeSubpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
            logged in as {user.name} ({user.email}) <br />
            <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
            </div>
        )}
        </div>
    );
}