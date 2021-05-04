import firebase from "firebase/app";

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firebase.firestore().doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      console.log("additiiona", additionalData);
      await userRef.set({
        email: user.email,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firebase.firestore().doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
