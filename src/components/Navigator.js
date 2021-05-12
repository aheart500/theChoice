import React from "react";

export default function Navigator({ profile }) {
  return (
    <div className="navigator">
      <div className="nav-option">
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
      <div className="nav-option">
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
  );
}
