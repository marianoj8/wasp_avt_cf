/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin";
import { DataSnapshot } from "firebase-admin/database";
import * as functions from "firebase-functions/v2";
import { DatabaseEvent } from "firebase-functions/database";


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
admin.initializeApp(firebaseConfig);


/**
 * Database paths for triggers.
 */
export class Paths {
    static onNewUser = "profiles/{profileId}";
}

export interface UserPreferences {
    language: "pt";
    timezone: string;
    dateFormat: string;
    timeFormat: "12h" | "24h";
    currency: string;
    theme: "light" | "dark" | "system";
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
export type UserRole = "admin" | "gestor" | "colaborador";
export type Environment = "cdoa" | "broker" | "client";

export type AccountStatus = "active" | "pending" | "blocked";

export interface UserProfile {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    environment: Environment;
    company: Company,
    type: UserRole;
    status: AccountStatus;
    createdAt: unknown;
    updatedAt: unknown;
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
    createdAt: unknown;
}

export const onUserCreated = functions.database
    .onValueCreated(Paths.onNewUser, async (
        snapshot: DatabaseEvent<DataSnapshot>
    ) => {
        // Obter os dados da transação com tipagem segura
        const userId = snapshot.params.userId;
        const user: UserProfile = snapshot.data.val();
        functions.logger.log(`Novo usuario: ${userId}`, user);
    });
