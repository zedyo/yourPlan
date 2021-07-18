import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from '../views/Home'
import Test from '../views/Test'
import Navigation from "../components/Navigation";
import Qualifications from "../components/qualifications/Qualifications";
import UpdateQualification from "../components/qualifications/update/UpdateQualification";
import CreateQualification from "../components/qualifications/create/CreateQualification";
import Employees from "../components/employees/Employees";
import Duties from "../components/duties/Duties";

function Router(props) {
    return (
        <div>
            <BrowserRouter>
                <Navigation />
                <div className="py-4">
                    <Switch>
                        <Route path="/test" component={Test} />
                        <Route path="/qualification/edit/:id" component={UpdateQualification}/>
                        <Route path="/qualification/create" component={CreateQualification}/>
                        <Route path="/qualifications" component={Qualifications}/>
                        <Route path="/employees" component={Employees}/>
                        <Route path="/duties" component={Duties}/>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default Router;