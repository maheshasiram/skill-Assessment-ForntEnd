import React from "react";
import AlertDialog from "../Dialogs/AlertDialog";
import SideNavBar from "../SideNavBar/SideNavBar";
import AccessTabs from "./AccessTabs";
import ProfileHeader from "./ProfileHeader";

function Profile(){
 
  return(
    <React.Fragment>
      <AlertDialog />
      {/* <ProfileHeader /> */}
      {/* <AccessTabs /> */}
      <SideNavBar />
    </React.Fragment>
  )
}

export default Profile;