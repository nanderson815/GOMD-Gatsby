import React, { useEffect, useState } from 'react'
import Header from './header'
import Layout from './layout';
import { Button, Responsive, Label, Menu, Tab } from 'semantic-ui-react';
import { userSignOut } from '../auth/auth'
import { getUser } from '../auth/auth'
import { getFirebase } from '../firebase/firebase'
import Vouchers from './vouchers'

const Profile = (props) => {

    const panes = [
        {
            menuItem: 'Vouchers', render: () => <Tab.Pane>{vouchers ?
                <div>
                    <h2>Your Vouchers</h2>
                    <Responsive {...Responsive.onlyMobile}>
                        <Vouchers rows={1} data={vouchers} user={user}></Vouchers>
                    </Responsive>
                    <Responsive minWidth={768}>
                        <Vouchers rows={3} data={vouchers}></Vouchers>
                    </Responsive>
                </div>
                : null}</Tab.Pane>
        },
        { menuItem: 'Favorites', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Profile', render: () => <Tab.Pane><Button onClick={userSignOut}>Sign Out</Button></Tab.Pane> },
    ]



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


    return (
        <div>
            <Header></Header>
            <Layout>
                <Tab panes={panes} />
            </Layout>
        </div >
    )
}

export default Profile