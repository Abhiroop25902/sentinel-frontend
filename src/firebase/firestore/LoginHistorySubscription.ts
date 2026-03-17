import {collection, onSnapshot, orderBy, query, Timestamp, where} from "firebase/firestore";
import {db} from "../FirebaseApp";
import FirestoreConstants from "./FirestoreConstants";
import {setStore} from "../../store";
import {LoginHistoryLog} from "../../types/LoginHistoryLog";

export function subscribeToLoginHistory() {
    console.info("Subscribing to login history");

    const loginHistoryCollection = collection(db, FirestoreConstants.LOGIN_HISTORY.ID);

    const startTime = Timestamp.now();
    const loginHistoryQuery = query(
        loginHistoryCollection,
        where(FirestoreConstants.LOGIN_HISTORY.FIELDS.TIMESTAMP, ">", startTime),
        orderBy(FirestoreConstants.LOGIN_HISTORY.FIELDS.TIMESTAMP, "desc"),
    )

    return onSnapshot(
        loginHistoryQuery,
        (querySnap) => {
            querySnap.docChanges().forEach((change) => {
                // when a record adds into the db, the new record gets added into local view while
                // the old record gets deleted from the local view, hence both add and delete will come

                if (change.type === 'added') {
                    const newLoginHistoryLogData = change.doc.data() as LoginHistoryLog;
                    setStore("logs", log => {
                        const nextState = [
                            ...log,
                            newLoginHistoryLogData
                        ]

                        if (nextState.length > 1000) return nextState.slice(-1000);
                        return nextState;
                    })
                }

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