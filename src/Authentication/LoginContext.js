import { auth, db } from '../../firebase_config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            console.log('User logged in:', firebaseUser.uid);

            // Query users collection for sub-collections where the email exists
            const usersCollectionRef = collection(db, 'users');
            const q = query(usersCollectionRef, where('email', '==', email)); // This assumes you have 'email' in the user document

            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach(doc => {
                    const userData = doc.data();
                    console.log("User data retrieved from sub-collections:", userData);
                    setUser(userData);  // Store the user data
                });
            } else {
                setError('User not found');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Invalid email or password');
        }
        setLoading(false);
    };

    const requestRide = async (pickUpLocation, dropLocation, driverId) => {
        if (!user) {
            setError('User not authenticated');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const rideRequest = {
                userId: user.uid,
                driverId: driverId,
                pickUpLocation,
                dropLocation,
                status: 'pending',
                createdAt: new Date(),
            };
            await addDoc(collection(db, 'rideRequests'), rideRequest);
            console.log('Ride request created:', rideRequest);
        } catch (error) {
            console.error('Error creating ride request:', error);
            setError('An error occurred while creating the ride request');
        }
        setLoading(false);
    };

    return (
        <LoginContext.Provider value={{ user, loading, error, login, requestRide }}>
            {children}
        </LoginContext.Provider>
    );
};
