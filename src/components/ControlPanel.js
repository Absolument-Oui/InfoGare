import React, { Component } from 'react';

import '../index.scss';
import ControlPanelRow from './ControlPanelRow';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, query, orderByChild } from 'firebase/database';
import { createRoot } from 'react-dom/client';

class ControlPanel extends Component {
    constructor(props) {
        super(props);

        this.tableRef = React.createRef();
    }

    render() {
        return (
            <main className='main-content'>
                <div className='center'>
                    <h1>Control Panel</h1>
                </div>
                <div className="mdc-data-table full-width">
                    <div className="mdc-data-table__table-container">
                        <table className="mdc-data-table__table" aria-label="Trains">
                        <thead>
                            <tr className="mdc-data-table__header-row">
                                <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Type</th>
                                <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Numéro</th>
                                <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Heure de départ</th>
                                <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="mdc-data-table__content" id='table' ref={this.tableRef}>
                            <ControlPanelRow type='TER' numero='123' heure='12:34' mode="both" />
                        </tbody>
                        </table>
                    </div>
                </div>
            </main>
        );
    }

    componentDidMount() {
        const uid = getAuth().currentUser.uid;
        const db = query(ref(getDatabase(), 'users/' + uid + '/gares/' + this.props.id + '/trains'), orderByChild('hourdepart'));

        get(db).then(train => {
            const elements = [];
            train.forEach(t => {
                var mode, heure;
                if (t.val().hourdepart !== "" && t.val().hourarrive === "") {
                    mode = 'depart';
                    heure = t.val().hourdepart;
                } else if (t.val().hourarrive !== "" && t.val().hourdepart === "") {
                    mode = 'arrivee';
                    heure = t.val().hourarrive;
                } else {
                    mode = 'both';
                    heure = t.val().hourarrive + '/' + t.val().hourdepart;
                }
                elements.push(<ControlPanelRow key={t.key} type={t.val().type} numero={t.val().number} heure={heure} mode={mode} show={t.val().show} departed={t.val().departure} id={t.key} gid={this.props.id} />);
            });

            const root = createRoot(document.getElementById('table'));
            root.render(elements);
        });
    }
}

export default ControlPanel;