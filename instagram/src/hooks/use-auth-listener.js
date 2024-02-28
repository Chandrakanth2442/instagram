import { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
    //useState returns an array, not an object
    const [user, setUser] = useState([JSON.parse(localStorage.getItem('authUser'))]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
       // debugger;
        const listener = firebase.auth().onAuthStateChanged((authUser) => {    //anonymous function
            if (authUser) {
                //we have a user...therefore we can store the user in local storage
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                //we dont have an authUser, therefore clear the localstorage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();

    }, [firebase]);

    //debugger;

    return { user };
}
