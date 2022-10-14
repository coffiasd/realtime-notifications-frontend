import Link from 'next/link';
import { alertService } from '../services';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Subscribe() {
    const [savebtn, setSavebtn] = useState("btn btn-primary");
    const [device, setDevice] = useState("");
    const [senderChecked, setSenderChecked] = useState(false);
    const [receiverChecked, setReceiverChecked] = useState(false);

    //setting.
    const options = {
        autoClose: true,
        keepAfterRouteChange: false
    }

    //save nottify device button.
    const saveNotifyDevice = () => {
        if (checkLogin()) {
            alertService.info("Please Connect Wallet", options);
            return
        }

        setSavebtn("btn btn-primary loading");
        setTimeout(function () { setSavebtn("btn btn-primary") }, 5000);
        const accounts = JSON.parse(localStorage.getItem("walletconnect"));

        axios.post('/v1/sub/save-info', {
            address: accounts.accounts[0],
            device_id: device,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            alertService.info("Success", options);
            setSavebtn("btn btn-primary")
            return response;
        })

    }

    //check box change event.
    const handleChange = (tt) => {
        if (checkLogin()) {
            alertService.info("Please Connect Wallet", options);
            return
        }

        const accounts = JSON.parse(localStorage.getItem("walletconnect"));

        const subs = []
        if (tt == 1) {
            if (receiverChecked) {
                subs.push(2);
            }
            if (!senderChecked) {
                subs.push(1);
            }
        } else {
            if (senderChecked) {
                subs.push(1);
            }
            if (!receiverChecked) {
                subs.push(2);
            }
        }

        //subscribe.
        axios.post('/v1/sub/save-sub', {
            address: accounts.accounts[0],
            event_id: subs,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            alertService.info("Subscription Updated", options);
            setSavebtn("btn btn-primary")
            return response;
        })
    }

    //get default params.
    useEffect(() => {
        if (checkLogin()) {
            return
        }

        const accounts = JSON.parse(localStorage.getItem("walletconnect"));

        //get userinfo.
        axios.get('/v1/sub/user-info?address=' + accounts.accounts[0])
            .then(function (response) {
                setDevice(response.data.data);
                return response;
            })


        //get subscribe.
        axios.get('/v1/sub/sub-list?address=' + accounts.accounts[0])
            .then(function (response) {
                // console.log(response.data.data);
                if (response.data.data.includes(1)) {
                    setSenderChecked(true);
                }
                if (response.data.data.includes(2)) {
                    setReceiverChecked(true);
                }
                return response;
            })

    }, [])

    const checkLogin = () => {
        const loginInfo = localStorage.getItem("walletconnect");
        return loginInfo == null
    }

    return (
        <div id="form">
            <div className="card flex-shrink-0 max-w-sm shadow-2xl bg-base-100 m-auto mt-4 mb-4">
                <div className="card-body">
                    <h2 className="card-title">2.Save Notify Device</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Push Device</span>
                        </label>
                        <input type="text" placeholder="xxxxx" className="input input-bordered" value={device} onChange={(e) => { setDevice(e.target.value) }} />
                        <label className="label">
                            <Link href="#" className="label-text-alt link link-hover">How to get it?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className={savebtn} onClick={saveNotifyDevice}>Save</button>
                    </div>
                </div>
            </div>

            <div className="card w-96 bg-base-100 shadow-2xl m-auto mt-10 mb-40 ">
                <div className="card-body">
                    <h2 className="card-title">3.Subscribe Events</h2>
                    <p>Choose what you wanna listen!!</p>
                    <p className='text-xs'>(More Events TO BE CONTINUED)</p>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">1.Sender Complete Event</span>
                            <input type="checkbox" className="checkbox toggle" onClick={() => handleChange(1)} checked={senderChecked} onChange={(e) => { setSenderChecked(!senderChecked) }} />
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">2.Receiver Complete Event</span>
                            <input type="checkbox" className="checkbox toggle" onClick={() => handleChange(2)} checked={receiverChecked} onChange={(e) => { setReceiverChecked(!receiverChecked) }} />
                        </label>
                    </div>

                </div>
            </div>
        </div>
    )
}