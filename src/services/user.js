import firebase from "firebase/app";

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firebase.firestore().doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    try {
      let userToSet = {
        email: user.email,
        ...additionalData,
        testsTaken: [],
      };
      if (user.providerData?.[0]?.providerId === "facebook.com") {
        userToSet.provider = "facebook";
        userToSet.name = user.displayName;
      }
      if (user.providerData?.[0]?.providerId === "google.com") {
        userToSet.provider = "google";
        userToSet.name = user.displayName;
      }
      await userRef.set(userToSet);
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
export const addToUserData = async (userId, data) => {
  if (!userId) return;
  const userRef = firebase.firestore().doc(`users/${userId}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) return;
  try {
    await userRef.set(data, { merge: true });
    return true;
  } catch (e) {
    console.error("Error updating user document", e);
    return false;
  }
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
