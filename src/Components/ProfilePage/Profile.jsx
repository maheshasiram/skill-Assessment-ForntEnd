import React from "react";
import AccessTabs from "./AccessTabs";
import ProfileHeader from "./ProfileHeader";

function Profile(){
  return(
    <React.Fragment>
      <ProfileHeader />
      <AccessTabs />
    </React.Fragment>
  )
}

export default Profile;