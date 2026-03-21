import {collection, onSnapshot, query, Timestamp, where} from "firebase/firestore";
import FirestoreConstants from "./FirestoreConstants";
import {db} from "../FirebaseApp";
import {LoginHistoryLog} from "../../types/LoginHistoryLog";


self.onmessage = (e) => {
    if (e.data === "INIT") {
        const loginHistoryCollection = collection(db, FirestoreConstants.LOGIN_HISTORY.ID);

        const startTime = Timestamp.now();
        const loginHistoryQuery = query(
            loginHistoryCollection,
            where(FirestoreConstants.LOGIN_HISTORY.FIELDS.TIMESTAMP, ">", startTime))

        let batchSuccessCount = 0;
        let batchFailureCount = 0;

        setInterval(() => {
            if (batchSuccessCount > 0 || batchFailureCount > 0) {
                self.postMessage({batchSuccessCount, batchFailureCount});
                batchSuccessCount = 0;
                batchFailureCount = 0;
            }
        }, 1000);


        onSnapshot(
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

}