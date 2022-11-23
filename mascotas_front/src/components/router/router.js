import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

import login from "../login/login"

export default function AppRouter(){
    return(
        <Router>
            <Switch>
                <Route exact path={["/", "/login"]} component={login}/>
                <Route
                    path={'*'}
                    component={() => (
                        <h1 style={{ marginTop: 300 }}>
                            404
                            <br />
                            Pagina no encontrada
                        </h1>
                    )}
                    /> 
            </Switch>
        </Router>    
    )
}   

