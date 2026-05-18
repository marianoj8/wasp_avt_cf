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
import { DataSnapshot, getDatabase } from "firebase-admin/database";
import * as functions from 'firebase-functions/v2';
import { setGlobalOptions } from "firebase-functions";
import { DatabaseEvent } from "firebase-functions/database";

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

export class Paths {
    static onNewUser = 'users/{userId}';
}

export interface UserPreferences {
    language: 'pt';
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
    currency: string;
    theme: 'light' | 'dark' | 'system';
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    dashboard: {
        defaultModule: string;
        showRecentActivity: boolean;
        showPendingTasks: boolean;
    };
    declarationDefaults: {
        flow: string | null;
        modelCode: string | null;
        generalProcedureCode: string | null;
        officeCode: string | null;
        enableEpaymentFlag: boolean;
    };
}

export interface UserPermissions {
    role: {
        code: string;
        name: string;
        description: string;
    };
    scopes: {
        customsDeclarations: {
            view: boolean;
            create: boolean;
            edit: boolean;
            submit: boolean;
            liquidate: boolean;
            clear: boolean;
            cancel: boolean;
        };
        processes: {
            view: boolean;
            create: boolean;
            edit: boolean;
            approve: boolean;
            close: boolean;
        };
        utilities: {
            view: boolean;
            import: boolean;
            add: boolean;
            edit: boolean;
            delete: boolean;
        };
        reports: {
            view: boolean;
            export: boolean;
        };
        administration: {
            manageUsers: boolean;
            manageRoles: boolean;
            managePermissions: boolean;
            managePreferences: boolean;
        };
    };
}
export type UserRole = 'admin' | 'gestor' | 'colaborador';
export type Environment = 'cdoa' | 'broker' | 'client';

export type AccountStatus = 'active' | 'pending' | 'blocked';

export interface UserProfile {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    environment: Environment;
    company: Company,
    type: UserRole;
    status: AccountStatus;
    createdAt: any;
    updatedAt: any;
    companyRole: string;
    permissions: UserPermissions;
    preferences: UserPreferences;
    disabled: boolean;
}

export interface Company {
    id: string;
    nif: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    createdAt: any;
}

export const onUserCreated = functions.database
    .onValueCreated(Paths.onNewUser, async (snapshot: DatabaseEvent<DataSnapshot>) => {
        // Obter os dados da transação com tipagem segura
        const userId = snapshot.params.userId;
        const user: UserProfile = snapshot.data.val();
        functions.logger.log(`Novo usuario criado  (Usuário: ${userId})`);

    });