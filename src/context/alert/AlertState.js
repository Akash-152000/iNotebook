import { useState } from 'react';
import alertContext from './alertContext';


const AlertState = (props) =>{

    const [alert,setAlert] = useState(null)

    const showAlert=(message,type)=>{
        console.log(message);
        setAlert({
            msg:message,
            type:type
        })
        console.log(alert);
        
        setTimeout(() => {
            setAlert(null)
            console.log(alert);
        }, 1500);
    }

    return <alertContext.Provider value={{showAlert,alert}}>
        {props.children}
    </alertContext.Provider>
}

export default AlertState;