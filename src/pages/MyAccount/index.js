import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/Header";
import UserContext from "../../Contexts/User/UserContext";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";

export default function MyAccount() {
  const [profile, setProfile] = useState(true);
  const history = useHistory();
  const { userState: userProfile, Logout } = useContext(UserContext);
  useEffect(() => {
    if (!userProfile.isLoggedIn) history.push("/signup");
  }, [history, userProfile.isLoggedIn]);
  const handleLogout = () => {
    Logout();
    history.push("/");
  };

  const handleEdit = () => {
    history.push("/myaccount/edit");
  };
  return (
    <>
      <Header />

      <div className="myaccount">
        <Link to="review" style={{ margin: "2rem" }}>
          Add Review
        </Link>
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
          <Button
            style={{ marginLeft: "10rem" }}
            variant="contained"
            onClick={() => history.push("/review")}
          >
            Add Review
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            variant="contained"
            color="primary"
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        {profile && (
          <div className="profile">
            <div className="personal-info">Personal Info</div>
            <div className="data-points">
              <div>
                <h2>Name</h2>
                <h3>{userProfile?.name}</h3>
              </div>
              <div>
                <h2>Grade</h2>
                <h3>{userProfile?.grade}</h3>
              </div>
              <div>
                <h2>Email</h2>
                <h3>{userProfile?.email}</h3>
              </div>
              <div>
                <h2>Phone</h2>
                <h3>{userProfile?.phone}</h3>
              </div>
              <div>
                <h2>ACT</h2>
                <h3>{userProfile?.act}</h3>
              </div>
              <div>
                <h2>SAT</h2>
                <h3>{userProfile?.sat}</h3>
              </div>
              <div>
                <h2>EST</h2>
                <h3>{userProfile?.est}</h3>
              </div>
              <div>
                <h2>Group Code</h2>
                <h3>{userProfile?.groupCode}</h3>
              </div>
              <div>
                <h2>Parent Name</h2>
                <h3>{userProfile?.parentName}</h3>
              </div>
              <div>
                <h2>Parent Phone</h2>
                <h3>{userProfile?.parentNumber}</h3>
              </div>
            </div>
            <div className="academic-info">Academic Info</div>

            <div className="data-points">
              {userProfile.testsTaken
                ? userProfile.testsTaken.map((test, i) => {
                    return (
                      <div
                        key={i}
                        style={{ display: "flex", justifyContent: "space-between", width: "40rem" }}
                      >
                        <h1>
                          {test.name} --- {test.type}
                        </h1>
                        <h2>
                          {test.score} / {test.totalQuestions}
                        </h2>
                      </div>
                    );
                  })
                : "You haven't done any tests yet"}
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
