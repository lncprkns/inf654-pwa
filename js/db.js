import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs, onSnapshot,  addDoc, doc, deleteDoc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

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

// **********  tasks.html **************

async function getTasks(db) {
    const tasksCol = collection(db, "tasks")
    const taskSnapshot = await getDocs(tasksCol)
    const taskList = taskSnapshot.docs.map((doc) => doc)
    return taskList
}

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          
      } else if (err.code == 'unimplemented') {
          
      }
  })

const unsubTasks = onSnapshot(collection(db, "tasks"), (doc) => {
    doc.docChanges().forEach((change) => {
        if(change.type === "added") {
            renderTask(change.doc.data(), change.doc.id)
        } if(change.type === "removed") {
            removeTask(change.doc.id)
        }
    })
})

// add new task

const taskForm = document.querySelector("#new-task")
taskForm.addEventListener("submit", (event) => {
    event.preventDefault()
    addDoc(collection(db, "tasks"), {
        task: taskForm.taskAdd.value,
        notes: taskForm.taskAddNotes.value
    }).catch((error) => console.log(error))
    taskForm.taskAdd.value = ""
    taskForm.taskAddNotes.value = ""
})

// delete a task

const taskContainer = document.querySelector(".tasks")
taskContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
        const id = event.target.getAttribute("data-id")
        deleteDoc(doc(db, "tasks", id))
    }
})


