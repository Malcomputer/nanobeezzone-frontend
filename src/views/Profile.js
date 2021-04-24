import React from "react";
import UserInfoCard from "../components/UserInfoCard.js";

function Profile(props) {
  return (
    <div className="profilePageWrapper">
      <h2>*{props.match.params.username}*</h2>
      <UserInfoCard {...props} />
    </div>
  );
}

export default Profile;