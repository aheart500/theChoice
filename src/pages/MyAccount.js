import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

export default function MyAccount({ userProfile, user }) {
  const [profile, setProfile] = useState(true);
  //const [userProfile, setUserProfile] = useState();
  //const [user, setUser] = useState();
  const [dataFetched, setDataFetched] = useState(false);
  const history = useHistory();
  /*
  setUser(firebase.auth().currentUser);

  if (user) {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .get((doc) => setUserProfile(doc))
      .then(setDataFetched(true));
  } else {
    history.push({
      pathname: "/signup",
    });
  }
  */
  return (
    <>
      <Header />
      <div className="myaccount">
        <div className="navigator">
          <div className="nav-option" onClick={() => setProfile(true)}>
            {profile ? (
              <>
                <div className="circle"></div>
                <h1 style={{ fontWeight: "700" }}>Profile</h1>
              </>
            ) : (
              <>
                <h1 style={{ fontWeight: "500" }}>Profile</h1>
              </>
            )}
          </div>
          <div className="nav-option" onClick={() => setProfile(false)}>
            {profile ? (
              <>
                <h1 style={{ fontWeight: "500" }}>Subscriptions</h1>
              </>
            ) : (
              <>
                <div className="circle"></div>
                <h1 style={{ fontWeight: "700" }}>Subscriptions</h1>
              </>
            )}
          </div>
        </div>
        {profile && (
          <div className="profile">
            <div className="personal-info">Personal Info</div>
            <div className="data-points">
              <h2>Name</h2>
              <h3>{userProfile.name}</h3>
              <h2>Grade</h2>
              <h3>{userProfile.grade}</h3>
              <h2>Email</h2>
              <h3>{user.email}</h3>
              <h2>Phone</h2>
              <h3>{userProfile.phone}</h3>
            </div>
            <div className="academic-info">Academic Info</div>
            <div className="data-points">
              <h2>Real Score</h2>
              <h3>32</h3>
              <h2>Latest Practice Score</h2>
              <h3>33</h3>
            </div>
          </div>
        )}
        {!profile && (
          <div className="subscriptions">
            <div className="subscription">
              <p>Tutoring</p>
              <button>Access Sessions</button>
            </div>
            <div className="subscription">
              <p>Practice Tests</p>
              <button>Practice Now</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
