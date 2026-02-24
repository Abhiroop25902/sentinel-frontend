import {Timestamp} from "firebase/firestore";

export type LoginHistoryLog = {
    email: string,
    success: boolean,
    timestamp: Timestamp,
}