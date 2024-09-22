import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from './PlacesPage';
import AccountNav from "../AccountNav";

export default function ProfilePage() {

    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const { subpage } = useParams();

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);

    }

    if (!ready) {
        return 'Loading ...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    

    const activeSubpage = subpage || 'profile';  // Fallback to 'profile' if subpage is undefined


    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav activeSubpage={activeSubpage}/>

            {activeSubpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto">
                    logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {activeSubpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}