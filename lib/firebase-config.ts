import { collection, doc, getDoc, setDoc, increment } from "firebase/firestore"
import { db } from "./firebase"

const VISITOR_DOC_ID = "total_visitors"

export async function incrementVisitorCount() {
  const visitorRef = doc(db, "visitors", VISITOR_DOC_ID)
  const visitorDoc = await getDoc(visitorRef)

  if (!visitorDoc.exists()) {
    // Initialize the counter if it doesn't exist
    await setDoc(visitorRef, { count: 1 })
  } else {
    // Increment the counter
    await setDoc(visitorRef, { count: increment(1) }, { merge: true })
  }
}

export const visitorsCollection = collection(db, "visitors")

