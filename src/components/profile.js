import React, { useEffect, useState } from 'react'
import Header from './header'
import Layout from './layout';
import { Button, Responsive, Label, Menu, Tab, Form, Input, Dimmer, Loader } from 'semantic-ui-react';
import { userSignOut } from '../auth/auth'
import { getUser } from '../auth/auth'
import { getFirebase } from '../firebase/firebase'
import Vouchers from './vouchers'
import { resetPassword, updateEmail, updateName } from '../auth/auth'
import Axios from 'axios';
import Favorites from './favorites'

const Profile = (props) => {

    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const changePassword = async () => {
        setLoading(true)
        let res = await resetPassword(user.email)
        setLoading(false)
        if (res.success) {
            setMessage(res.success)
        } else {
            setMessage(res.message)
        }
    }

    const changeEmail = async () => {
        if (typeof window !== 'undefined') {
            if (window.confirm(`This will change your email to ${user.email}. Are you sure? `)) {
                let res = await updateEmail(user.email)
                alert(res.message)
            }
        }
    }

    const changeName = async (name) => {
        let res = await updateName(name);
        if (res) {
            alert('Name changed successfully!')
        } else {
            alert("Something went wrong. Please try again.")
        }
    }


    const [user, setUser] = useState('')
    useEffect(() => {
        let user = getUser();
        if (user) setUser(user)
    }, [])

    // Grabs the vouchers from firebase.
    const [vouchers, setVouchers] = useState('')
    useEffect(() => {
        let firebase = getFirebase();
        let db = firebase.firestore();
        if (user) {
            let unsubscripe = db.collection("users").doc(user.uid).collection('vouchers').where("redeemed", "==", false).onSnapshot((snapshot) => {
                let vouchersData = []
                snapshot.forEach((doc) => {
                    let info = doc.data()
                    vouchersData.push(info);
                })
                setVouchers(vouchersData);
            })
            return () => unsubscripe()
        }
    }, [user])

    // Grabs the favorite HHs from firebase.
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        let firebase = getFirebase();
        let db = firebase.firestore();
        if (user) {
            let savedHH = []
            db.collection('users').doc(user.uid).collection('savedHappyHours').get().then(snap => {
                snap.forEach(doc => savedHH.push(doc.data()))
                setFavorites(savedHH)
            })
                .catch(err => err)
        }
    }, [user])

    // Resubmits the used vouchers to the DB when back online.
    const [updatingVouchers, setUpdatingVouchers] = useState(false);
    useEffect(() => {
        let unsubmitted = JSON.parse(localStorage.getItem('unsubmitted'))
        if (unsubmitted && user.uid) {
            setUpdatingVouchers(true)
            let url = 'https://us-central1-georgia-on-my-dime.cloudfunctions.net/redeemVoucher';
            let requests = unsubmitted.map(uid => Axios.post(url, { uid: user.uid, voucherId: uid }));

            Promise.all(requests).then((values) => {
                let uids = values.map(val => val.data.uid);
                uids.forEach(uid => {
                    let index = unsubmitted.indexOf(uid);
                    if (index !== -1) unsubmitted.splice(index, 1)
                });
                setUpdatingVouchers(false)
                if (unsubmitted.length > 0) {
                    localStorage.setItem('unsubmitted', JSON.stringify(unsubmitted))
                } else {
                    localStorage.removeItem('unsubmitted')
                }
            })
                .catch((err) => {
                    setUpdatingVouchers(false)
                    console.log(err)
                })
        }
    }, [user])

    // Removes the voucher if it is redemmed offline, and adds the item to local stroage to be updated when back online.
    const hideVoucher = (redeemed) => {
        let filtered = vouchers.filter(deal => deal.id !== redeemed.id)
        let unsubmitted = []
        let existing = JSON.parse(localStorage.getItem('unsubmitted'));
        if (existing) {
            unsubmitted = existing
        }
        unsubmitted.push(redeemed.id)
        localStorage.setItem("unsubmitted", JSON.stringify(unsubmitted))
        setVouchers(filtered)
    }

    const panes = [
        {
            menuItem: 'Vouchers', render: () => <Tab.Pane>{vouchers ?
                <div>
                    <h2>Your Vouchers</h2>
                    {updatingVouchers ? <Dimmer><Loader /></Dimmer> :
                        <>
                            <Responsive {...Responsive.onlyMobile}>
                                <Vouchers rows={1} data={vouchers} hideVoucher={hideVoucher} user={user}></Vouchers>
                            </Responsive>
                            <Responsive minWidth={768}>
                                <Vouchers rows={3} data={vouchers} hideVoucher={hideVoucher} user={user}></Vouchers>
                            </Responsive>
                        </>}
                </div>
                : null}</Tab.Pane>
        },
        {
            menuItem: 'Favorites', render: () => <Tab.Pane>
                <Responsive {...Responsive.onlyMobile}>
                    <Favorites rows={1} data={favorites} hideVoucher={hideVoucher} user={user}></Favorites>
                </Responsive>
                <Responsive minWidth={768}>
                    <Favorites rows={3} data={favorites} hideVoucher={hideVoucher} user={user}></Favorites>
                </Responsive>
            </Tab.Pane>
        },
        {
            menuItem: 'Profile', render: () => <Tab.Pane>
                {/* {user.emailVerified ? null : <Button onClick={sendVerification} primary>Verify Email</Button>} */}
                <Button onClick={userSignOut}>Sign Out</Button>
                <Form style={{ marginTop: '10px' }}>
                    <Form.Field>
                        <label>Name (First Last)</label>
                        <Input value={user.displayName ? user.displayName : ""} onChange={(e) => setUser({ ...user, displayName: e.target.value })} action style={{ maxWidth: "400px" }}>
                            <input />
                            <Button onClick={() => changeName(user.displayName)} primary>Save</Button>
                        </Input>
                    </Form.Field>
                    <Form.Field>
                        <label>Email Address</label>
                        <Input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} action style={{ maxWidth: "400px" }}>
                            <input />
                            <Button onClick={() => changeEmail(user.email)} primary>Update</Button>
                        </Input>
                    </Form.Field>
                    <h3>Update Password</h3>
                    <Button onClick={changePassword} loading={loading} primary>Send Reset Email</Button>
                    <p> {message}</p>
                </Form>
            </Tab.Pane >
        },
    ]





    return (
        <div>
            <Header></Header>
            <Layout>
                <div style={{ minHeight: '70vh' }}>
                    <Tab panes={panes} />
                </div>
            </Layout>
        </div >
    )
}

export default Profile