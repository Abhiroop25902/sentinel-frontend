import {collection, limit, onSnapshot, orderBy, query, Timestamp, where} from "firebase/firestore";
import {db} from "../FirebaseApp";
import FirestoreConstants from "./FirestoreConstants";

export function subscribeToLoginHistory() {
    console.info("Subscribing to login history");

    const loginHistoryCollection = collection(db, FirestoreConstants.LOGIN_HISTORY.ID);

    const startTime = Timestamp.now();
    const newRecordQuery = query(
        loginHistoryCollection,
        where(FirestoreConstants.LOGIN_HISTORY.FIELDS.TIMESTAMP, ">", startTime),
        orderBy(FirestoreConstants.LOGIN_HISTORY.FIELDS.TIMESTAMP, "desc"),
        limit(1)
    )

    return onSnapshot(
        newRecordQuery,
        (querySnap) => {
            querySnap.docChanges().forEach((change) => {
                // when a record adds into the db, the new record gets added into local view while
                // the old record gets deleted from the local view, hence both add and delete will come

                if (change.type === 'added')
                    console.info(`${change.type} ${JSON.stringify(change.doc.data())}`);
            })
        }
    );
}