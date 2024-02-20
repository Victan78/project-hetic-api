const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { initializeApp } = require('firebase/app');
const fs = require('fs');

const firebaseConfig = {
    apiKey: "AIzaSyD-oASJ1L4OZqqgZn2rAFFgpCJTYC-yPN0",
    authDomain: "reelclip-417d5.firebaseapp.com",
    projectId: "reelclip-417d5",
    storageBucket: "reelclip-417d5.appspot.com",
    messagingSenderId: "445564056916",
    appId: "1:445564056916:web:f449b3e4f9fead9aec04c1",
    measurementId: "G-95L3SPLKL2"
};

const Appfirebase = initializeApp(firebaseConfig);
const storage = getStorage(Appfirebase);

async function uploadPdf(pdfBuffer, userId) {
    try {
        // Generate a unique filename for the PDF
        const timestamp = Date.now();
        const filename = `newPdf_${timestamp}.pdf`;

        // Create a reference to the storage location with the unique filename
        const storageRef = ref(storage, `pdfs/${userId}/${filename}`);

        // Upload the PDF bytes to the storage location
        const uploadTask = uploadBytesResumable(storageRef, pdfBuffer);
        const snapshot = await uploadTask;
        console.log(`Uploaded PDF file with filename: ${filename}`);

        // Get the download URL for the uploaded PDF
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading PDF file to Firebase Storage:', error);
        throw error;
    }
}

module.exports = uploadPdf;
