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

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppBase user={this.props.user} auth={this.props.auth}/>}>
                        <Route index element={<HomePage />} />
                        <Route path="account" element={<AccountPage user={this.props.user} />} />
                        <Route path="bug-report" element={<IssuePage />} />
                        <Route path='*' element={<NoPage />} />
                        <Route path="/gare">
                            <Route path="*" element={<GarePage id={window.location.pathname.split('/')[2]} />} />
                            <Route path=":id/train/:trainId" element={<TrainPage gid={window.location.pathname.split('/')[2]} id={window.location.pathname.split('/')[4]} />} />
                        </Route>
                    </Route>
                    <Route path="/gare">
                        <Route path=":id/departs" element={<DepartsPage id={window.location.pathname.split('/')[2]} />} />
                        <Route path=":id/arrives" element={<ArrivePage id={window.location.pathname.split('/')[2]} />} />
                        <Route path=":id/infos" element={<InfosPage id={window.location.pathname.split('/')[2]} />} />
                        <Route path=":id/train/:trainId/quai" element={<QuaiPage gid={window.location.pathname.split('/')[2]} id={window.location.pathname.split('/')[4]} />} />
                    </Route>
                    <Route path="/gareRER">
                        <Route path="*" element={<GareRERPage id={window.location.pathname.split('/')[2]} />} />
                        <Route path=":id/departs" element={<DepartsRERPage id={window.location.pathname.split('/')[2]} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;