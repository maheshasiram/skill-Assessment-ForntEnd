import React, { useState } from "react";
import { Button } from "primereact/button";
import FormDialog from "../Dialogs/CustomeDialog";

function Home() {

const [openLoginDialog, setopenLoginDialog] = useState(false);    

    const onOpenLoginForm=()=>{
        setopenLoginDialog(true);
    }

    const onCloseLoginForm = ()=>{
        setopenLoginDialog(false);
    }

    return (
        <div>
            <h1> Welcome To Skill Assessment</h1>
            <Button label="Login" icon="pi pi-user"  className="p-button-rounded p-button-secondary" onClick={onOpenLoginForm} />
            <FormDialog 
            onCloseDialog={onCloseLoginForm}
            openLoginDialog={openLoginDialog}
            />
        </div>
    )
}

export default Home;