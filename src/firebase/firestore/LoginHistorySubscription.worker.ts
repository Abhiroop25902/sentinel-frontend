import {collection, onSnapshot, query, Timestamp, where} from "firebase/firestore";
import FirestoreConstants from "./FirestoreConstants";
import {db} from "../FirebaseApp";
import {LoginHistoryLog} from "../../types/LoginHistoryLog";
import firebase from "firebase/compat/app";
import WebWorkerConstants from "../../constants/WebWorkerConstants";
import Unsubscribe = firebase.Unsubscribe;

let interval: NodeJS.Timeout;
let unsubscribe: Unsubscribe;


self.onmessage = (e) => {
    if (e.data === WebWorkerConstants.START) {
        const loginHistoryCollection = collection(db, FirestoreConstants.LOGIN_HISTORY.ID);

        const startTime = Timestamp.now();
        const loginHistoryQuery = query(
            loginHistoryCollection,
            where(FirestoreConstants.LOGIN_HISTORY.FIELDS.TIMESTAMP, ">", startTime))

        let batchSuccessCount = 0;
        let batchFailureCount = 0;

        interval = setInterval(() => {
            if (batchSuccessCount > 0 || batchFailureCount > 0) {
                self.postMessage({batchSuccessCount, batchFailureCount});
                batchSuccessCount = 0;
                batchFailureCount = 0;
            }
        }, 1000);


        unsubscribe = onSnapshot(
            loginHistoryQuery,
            querySnap => {
                querySnap.docChanges()
                    .filter(change => change.type === "added")
                    .forEach(change => {
                        const newLoginHistoryLogData = change.doc.data() as LoginHistoryLog;
                        if (newLoginHistoryLogData.success) {
                            batchSuccessCount++;
                        } else {
                            batchFailureCount++;
                        }
                    });
            }
        );

    }

    if (e.data === WebWorkerConstants.STOP) {
        if (interval) {
            clearInterval(interval);
        }

        if (unsubscribe) {
            unsubscribe();
        }

        console.info("Worker: Firestore unsubscribed and interval cleared.");

    }

}