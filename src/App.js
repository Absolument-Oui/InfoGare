import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';

import AppBase from './components/AppBase';
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';
import NoPage from './components/NoPage';
import GarePage from './components/GarePage';
import DepartsPage from './components/DepartsPage';
import ArrivePage from './components/ArrivesPage';
import InfosPage from './components/InfosPage';
import TrainPage from './components/TrainPage';
import QuaiPage from './components/QuaiPage';
import GareRERPage from './components/GareRERPage';
import DepartsRERPage from './components/DepartsRERPage';
import IssuePage from './components/IssuePage';
import DepartsAFLPage from './components/DepartsAFLPage';
import ArrivesAFLPage from './components/ArrivesAFLPage';
import GareAFL from './components/GareAFL';
import UsersPage from './components/UsersPage';
import DOonatePage from './components/DOonatePage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppBase user={this.props.user} auth={this.props.auth} />}>
                        <Route index element={<HomePage />} />
                        <Route path="account" element={<AccountPage user={this.props.user} />} />
                        <Route path="bug-report" element={<IssuePage />} />
                        <Route path='*' element={<NoPage />} />
                        <Route path="/gare/classique/:id"element={<GarePage id={window.location.pathname.split('/')[3]} />} />
                        <Route path="/gare/classique/:id/train/:trainId" element={<TrainPage gid={window.location.pathname.split('/')[3]} id={window.location.pathname.split('/')[5]} />} />
                        <Route path="/gare/AFL/:id" element={<GareAFL id={window.location.pathname.split('/')[3]} />} />
                        <Route path="/gare/RER/:id" element={<GareRERPage id={window.location.pathname.split('/')[3]} />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/donate" element={<DOonatePage />} />
                    </Route>
                    <Route path="/gare/classique">
                        <Route path=":id/departs" element={<DepartsPage id={window.location.pathname.split('/')[3]} />} />
                        <Route path=":id/arrives" element={<ArrivePage id={window.location.pathname.split('/')[3]} />} />
                        <Route path=":id/infos" element={<InfosPage id={window.location.pathname.split('/')[3]} />} />
                        <Route path=":id/train/:trainId/quai/depart" element={<QuaiPage mode="depart" gid={window.location.pathname.split('/')[3]} id={window.location.pathname.split('/')[5]} />} />
                        <Route path=":id/train/:trainId/quai/arrive" element={<QuaiPage mode="arrive" gid={window.location.pathname.split('/')[3]} id={window.location.pathname.split('/')[5]} />} />
                    </Route>
                    <Route path="/gare/AFL">
                        <Route path=":id/departs" element={<DepartsAFLPage id={window.location.pathname.split('/')[3]} />} />
                        <Route path=":id/arrives" element={<ArrivesAFLPage id={window.location.pathname.split('/')[3]} />} />
                    </Route>
                    <Route path="/gare/RER">
                        <Route path=":id/departs" element={<DepartsRERPage id={window.location.pathname.split('/')[3]} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;