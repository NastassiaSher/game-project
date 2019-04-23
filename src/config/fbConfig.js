import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
	apiKey: "AIzaSyDImSBQEH5UsTMA1Pxe9Th4t-ASQRv2XSY",
	authDomain: "takeaway-task.firebaseapp.com",
	databaseURL: "https://takeaway-task.firebaseio.com",
	projectId: "takeaway-task",
	storageBucket: "takeaway-task.appspot.com",
	messagingSenderId: "396493428578"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
