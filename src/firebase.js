import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC5iI_uHUNz2O_ALpgv1sVR9wO2FVgh6w8",
  authDomain: "netflix-clone-cfe3a.firebaseapp.com",
  projectId: "netflix-clone-cfe3a",
  storageBucket: "netflix-clone-cfe3a.firebasestorage.app",
  messagingSenderId: "1057940738068",
  appId: "1:1057940738068:web:ca71f6c0ad85e110b99701"
};

const app = initializeApp(firebaseConfig);
const  auth = getAuth(app);
const db = getFirestore(app);

const signup= async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,

        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}


const login = async (email,password)=>{
    try {
         await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout =  ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};