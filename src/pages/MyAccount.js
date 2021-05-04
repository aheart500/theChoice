import React, { useState, useContext } from "react";
import Header from "../components/Header";
import UserContext from "../Contexts/User/UserContext";
export default function MyAccount() {
  const [profile, setProfile] = useState(true);
  const { userState: userProfile } = useContext(UserContext);
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
              <h3>{userProfile?.name}</h3>
              <h2>Grade</h2>
              <h3>{userProfile?.grade}</h3>
              <h2>Email</h2>
              <h3>{userProfile?.email}</h3>
              <h2>Phone</h2>
              <h3>{userProfile?.phone}</h3>
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
