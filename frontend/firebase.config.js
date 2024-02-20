
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import uuid from 'react-uuid';
import { getMetadata, updateMetadata } from "firebase/storage";

//uuid is not a function


const firebaseConfig = {
    apiKey: "AIzaSyD7bJOLXaUothCAR7tY8Rd8QY5jeLEVorI",
    authDomain: "gensheet-b606a.firebaseapp.com",
    projectId: "gensheet-b606a",
    storageBucket: "gensheet-b606a.appspot.com",
    messagingSenderId: "989717316534",
    appId: "1:989717316534:web:085ee2f24b25291c70b717",
    measurementId: "G-W5JVGT1W92"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const storage = getStorage(app);


  

async function uploadFile(file) {
  const userId = auth.currentUser.uid;
  const uuids = uuid(); // Generate a UUID for the filename
  const userFolderRef = ref(storage, `users`);
  const storageRef = ref(storage, `${userId}(${uuids})`);

  try {
    // Check if the user folder exists, create it if not
    const userFolderMetadata = await getMetadata(userFolderRef);
    if (!userFolderMetadata || !userFolderMetadata.customMetadata) {
      await uploadBytesResumable(userFolderRef, new Blob(['']));
    }

    // Upload file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Wait for the upload to complete
    await uploadTask;

    // Get the download URL
    const url = await getDownloadURL(storageRef);

    // Return the download URL
    return url;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
}

async function getUserPDFs() {
  const userId = auth.currentUser.uid;
  const userFolderRef = ref(storage, `users`);

  try {
    // List items (PDFs) in the user's folder
    const userFolderList = await list(userFolderRef);

    // Extract URLs for each PDF that starts with the user's ID
    const pdfUrls = userFolderList.items
      .filter((item) => item.name.startsWith(`${userId}_`))
      .map(async (item) => {
        const pdfRef = ref(storage, item.fullPath);
        const downloadUrl = await getDownloadURL(pdfRef);
        return downloadUrl;
      });

    return Promise.all(pdfUrls);
  } catch (error) {
    console.error('Error retrieving user PDFs:', error.message);
    throw error;
  }
}

export { auth, googleProvider, githubProvider, uploadFile, getUserPDFs};
