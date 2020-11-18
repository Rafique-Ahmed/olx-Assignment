import firebase from "firebase";
import History from "./History";

export function loginAccount(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)

    .then(function (success) {
      localStorage.setItem("uid", success.user.uid);
      History.push("/Home");
    })

    .catch(function (error) {
      alert(error);
    });
}

export function getData() {
  return new Promise((resolve, reject) => {
      firebase
      .firestore()
      .collection("adds")
      .onSnapshot((snapshot) => {
        let array = [];
        snapshot.docChanges().forEach((change) => {
          array.push(change.doc.data());
        });
        resolve(array);
    });
  });
}
