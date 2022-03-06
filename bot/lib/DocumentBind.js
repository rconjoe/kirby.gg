import { firestore } from '../firebase.js'
import { doc, onSnapshot } from 'firebase/firestore'

export default class DocumentBind {

  constructor(collection, id, cb) {
    onSnapshot(doc(firestore, collection, id), (doc) => {
      if (!doc.exists) {
        return 'Document not found!'
      }
      cb(doc.data())
    })
  }

}
