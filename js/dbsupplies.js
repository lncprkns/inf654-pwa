import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot,  addDoc, doc, deleteDoc , enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

const firebaseConfig = {
apiKey: "AIzaSyBHdp5gc7N2UjRWomXpkSqi2k3gW6-2H0I",
authDomain: "around-your-house.firebaseapp.com",
projectId: "around-your-house",
storageBucket: "around-your-house.appspot.com",
messagingSenderId: "806779689347",
appId: "1:806779689347:web:7d1515124c5f0edfe97eb6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

async function getSupplies(db) {
    const suppliesCol = collection(db, "supplies")
    const supplySnapshot = await getDocs(suppliesCol)
    const supplyList = supplySnapshot.docs.map((doc) => doc)
    return supplyList
}

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          
      } else if (err.code == 'unimplemented') {
          
      }
  })

const unsubSupplies = onSnapshot(collection(db, "supplies"), (doc) => {
    doc.docChanges().forEach((change) => {
        if(change.type === "added") {
            renderSupply(change.doc.data(), change.doc.id)
        } if(change.type === "removed") {
            removeSupply(change.doc.id)
        }
    })
})

// add new supply

const supplyForm = document.querySelector("#new-supply")
supplyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addDoc(collection(db, "supplies"), {
        item: supplyForm.addSupply.value,
        info: supplyForm.addSupplyInfo.value,
        inotes: supplyForm.addSupplyNotes.value
    }).catch((error) => console.log(error))
    supplyForm.addSupply.value = ""
    supplyForm.addSupplyInfo.value = ""
    supplyForm.addSupplyNotes.value = ""
})

// delete a supply

const supplyContainer = document.querySelector(".supplies")
supplyContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
        const id = event.target.getAttribute("data-id")
        deleteDoc(doc(db, "supplies", id))
    }
})