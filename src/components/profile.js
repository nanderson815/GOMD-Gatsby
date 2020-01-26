import React, { useEffect, useState } from 'react'
import Header from './header'
import Layout from './layout';
import { Button } from 'semantic-ui-react';
import { userSignOut } from '../auth/auth'
import { getUser } from '../auth/auth'
import { getFirebase } from '../firebase/firebase'
import Vouchers from './vouchers'

const Profile = (props) => {

    const [user, setUser] = useState('')
    useEffect(() => {
        let user = getUser();
        if (user) setUser(user)
    }, [user])

    const [vouchers, setVouchers] = useState('')
    useEffect(() => {
        let firebase = getFirebase();
        let db = firebase.firestore();
        if (user) {
            db.collection("users").doc(user.uid).collection('vouchers').get().then((snapshot) => {
                let vouchersData = []
                snapshot.forEach((doc) => {
                    let info = doc.data().document
                    vouchersData.push(info);
                })
                setVouchers(vouchersData);
            })
        }
    }, [user])


    return (
        <div>
            <Header></Header>
            <Layout>
                {vouchers ? <div><h2>Your Vouchers</h2><Vouchers data={vouchers}></Vouchers></div> : null}
                <Button onClick={userSignOut}>Sign Out</Button>
            </Layout>
        </div>
    )
}

export default Profile