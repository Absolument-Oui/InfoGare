import React, { Component } from 'react';

import $ from 'jquery';

import "../index.scss";
import { get, getDatabase, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

class InfosPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.infosText = React.createRef();
        this.infosRef = React.createRef();
    }

    render() {
        return (
            <div className='rows'>
                <div className='row-group row-group-bar'>
                    <div className='row'>
                        <div className='col-first'></div>
                        <div className='col-second'>
                            <div className='bar-clock'>
                                <span id='clock-hours'></span>
                                <span className='animation-blink'>
                                    <span className='animation-blink-clock'>:</span>
                                </span>
                                <span id='clock-minutes'></span>
                                <small id='clock-seconds'></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row-group row-group-informations' ref={this.infosRef}>
                    <div className='row'>
                        <div className='col-first'></div>
                        <div className='col-second'>
                            <div className='text-informations scroll-y' ref={this.infosText}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const db = getDatabase();
        get(ref(db, 'users/' + getAuth().currentUser.uid + '/gares/' + this.props.id)).then(infos => {
            this.infosText.current.innerHTML = infos.child('infos').val();
            if (infos.child('infostype').val() === 'flash') {
                this.infosRef.current.classList.add('row-group-informations-2');
            } else {
                this.infosRef.current.classList.add('row-group-informations-1');
            }
        });
        this.scrollX();
        this.scrollY(50);
        this.clock();
    }

    scrollX() {

        $('.text-scroll-x').each(function () {

            var distance = $(this).width() + $(this).parent().width() + 10;


            if ($(this).width() > $(this).parent().width()) {
                $(this).addClass('animation-scroll-x');
                $(this).css({
                    '-webkit-animation-duration': (distance / 150) + 's',
                    'animation-duration': (distance / 150) + 's',
                    'padding-left': '100%'
                });
            } else {
                $(this).css({
                    'padding-left': '0%'
                });
            }
        });
    }

    /* -- scrollY -- */

    scrollY(limit) {

        var elem = $('.scroll-y');
        var elemHeight = elem.height();
        var parentHeight = elem.parent().height();
        var elemHeightRelative = elemHeight / parentHeight * 100;

        if (elemHeightRelative > limit && limit < 100) {
            var distance = (elemHeight - (parentHeight / 1.1)) / $(window).height() * 100;
            var time = distance / 6 + 10;
            var delay = 5 / time * 100;

            $("<style type='text/css'> @keyframes scrollY{ 0%, " + delay + "%{ transform:translateY(0%); } " + (100 - delay) + "%, 100%{ transform:translateY(-" + distance + "vh); } } </style>").appendTo("head");
            $(elem).css({
                'animation': 'scrollY ' + time + 's linear infinite 0s'
            });
        } else {
            $(elem).css({
                'animation': 'none'
            });
        }
    }

    /* -- clock -- */

    clock() {
        var date = new Date();
        date.setHours(date.getHours() + (date.getTimezoneOffset() / -60));

        var h = date.getUTCHours();
        if (h < 10) {
            h = '0' + h;
        }
        $('#clock-hours').html(h);
        var m = date.getUTCMinutes();
        if (m < 10) {
            m = '0' + m;
        }
        $('#clock-minutes').html(m);
        var s = date.getUTCSeconds();
        if (s < 10) {
            s = '0' + s;
        }
        $('#clock-seconds').html(s);
        setInterval(this.clock, '1000');
        return true;
    }
}

export default InfosPage;