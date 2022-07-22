import React from "react";
import AlertDialog from "../Dialogs/AlertDialog";
import AccessTabs from "./AccessTabs";
import ProfileHeader from "./ProfileHeader";

function Profile(){
 
  return(
    <React.Fragment>
      <AlertDialog />
      <ProfileHeader />
      <AccessTabs />
    </React.Fragment>
  )
}

export default Profile;