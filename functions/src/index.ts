/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { initializeApp } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getDatabase } from "firebase-admin/database";
import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({ maxInstances: 10 });

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCOMojtP55UJrRz3t-H67wWyaPrFOHtJE0",
    authDomain: "wasp-tronco-soft.firebaseapp.com",
    projectId: "wasp-tronco-soft",
    storageBucket: "wasp-tronco-soft.firebasestorage.app",
    messagingSenderId: "890333873786",
    appId: "1:890333873786:web:6ac7ad8906382769e1ddc3",
    databaseURL: "https://wasp-tronco-soft-default-rtdb.firebaseio.com",
    measurementId: "G-6TDS4VBL8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);


