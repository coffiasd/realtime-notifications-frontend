import WalletConnect from "@walletconnect/client";
import QRCodeModal from "algorand-walletconnect-qrcode-modal";
import { useState, useEffect } from "react";
import { FaBitcoin, FaAngleDown, FaTwitter, FaGithub } from "react-icons/fa";
import Link from 'next/link';

export default function Header() {
    const [account, setAccount] = useState(null);

    const disconnect = async () => {
        localStorage.removeItem("walletconnect");
        setAccount(null);
    }

    const connectWallet = async () => {
        // Create a connector
        const connector = new WalletConnect({
            bridge: "https://bridge.walletconnect.org", // Required
            qrcodeModal: QRCodeModal,
        });

        // Check if connection is already established
        if (!connector.connected) {
            // create new session
            await connector.createSession();
        }

        setAccount(connector.accounts[0]);

        // Subscribe to connection events
        connector.on("connect", (error, payload) => {
            if (error) {
                throw error;
            }

            // Get provided accounts
            const { accounts } = payload.params[0];
            setAccount(accounts[0]);
        });

        connector.on("session_update", (error, payload) => {
            if (error) {
                throw error;
            }
            // Get updated accounts 
            const { accounts } = payload.params[0];
            setAccount(accounts[0]);
        });
    }

    const hideAddress = (address) => {
        return address.substring(0, 4) + "...." + address.slice(-4)
    }

    useEffect(() => {
        const loginInfo = localStorage.getItem("walletconnect");
        if (loginInfo != null) {
            const accounts = JSON.parse(loginInfo);
            console.log("aaa", accounts);
            setAccount(accounts.accounts[0]);
        }
    }, [])

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Algorand</a>
                <button className="btn gap-2 btn-ghost" onClick={() => openInNewTab("https://twitter.com/coffiasse")}>
                    <FaTwitter size="1rem" />
                    Twitter
                </button>
                <button className="btn gap-2 btn-ghost" onClick={() => openInNewTab("https://github.com/coffiasd/realtime-notifications-frontend")}>
                    <FaGithub size="1rem" />
                    Github
                </button>
            </div>

            <div className="navbar-start">
            </div>

            <div className="navbar-end">
                {account ?
                    (<div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost rounded-btn"><FaBitcoin size="1rem" className="ml-1 mr-2 " />{hideAddress(account)}<FaAngleDown size="1rem" className="ml-2" /></label>
                        <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                            <li><button onClick={disconnect}>Disconnect</button></li>
                        </ul>
                    </div>)
                    :
                    <button className="btn btn-sm btn-outline btn-primary ml-3 normal-case" onClick={connectWallet}>connect wallet</button>
                }
            </div>
        </div >
    )
}