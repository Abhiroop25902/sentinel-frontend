import {collection, onSnapshot, orderBy, query, Timestamp, where} from "firebase/firestore";
import {db} from "../FirebaseApp";
import FirestoreConstants from "./FirestoreConstants";
import {setStore} from "../../store";
import {LoginHistoryLog} from "../../types/LoginHistoryLog";

export function subscribeToLoginHistory() {
    console.info("Subscribing to login history");

    const loginHistoryCollection = collection(db, FirestoreConstants.LOGIN_HISTORY.ID);

    const startTime = Timestamp.now();
    const recordQuery = query(
        loginHistoryCollection,
        where(FirestoreConstants.LOGIN_HISTORY.FIELDS.TIMESTAMP, ">", startTime),
        orderBy(FirestoreConstants.LOGIN_HISTORY.FIELDS.TIMESTAMP, "asc")
    )

    return onSnapshot(
        recordQuery,
        (querySnap) => {
            //there might be 1000+ news docs coming from snapshot, collect them and then add them to store
            const newLoginHistoryLogs = querySnap.docChanges()
                .filter(change => change.type == 'added')
                .map(change => change.doc.data() as LoginHistoryLog)

            setStore("logs", log => {
                const nextState = [
                    ...log,
                    ...newLoginHistoryLogs
                ]

                if (nextState.length > 1000) return nextState.slice(-1000);
                return nextState;
            })
        }
    );
}

// setInterval(() => {
//     setTimeout(() => setStore("logs", log => {
//             const nextState = [
//                 ...log,
//                 {
//                     timestamp: Timestamp.now(),
//                     email: `abhiroop.m25902@gmail.com`,
//                     success: Math.random() > Math.random(),
//                 }
//             ]
//             if (nextState.length > 1000) return nextState.slice(-1000);
//             return nextState;
//         }
//     ), Math.random() * 1000);
// }, 0)