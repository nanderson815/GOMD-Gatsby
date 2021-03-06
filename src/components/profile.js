/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { Button, Responsive, Tab, Form, Input, Loader } from 'semantic-ui-react'
import Axios from 'axios'
import Header from './header/header'
import Layout from './layout'
import { userSignOut, getUser, resetPassword, updateName } from '../auth/auth'

import { getFirebase } from '../firebase/firebase'
import Vouchers from './Vouchers/vouchers'

import Favorites from './favorites'

const Profile = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const changePassword = async () => {
    setLoading(true)
    const res = await resetPassword(user.email)
    setLoading(false)
    if (res.success) {
      setMessage(res.success)
    } else {
      setMessage(res.message)
    }
  }

  // const changeEmail = async () => {
  //     if (typeof window !== 'undefined') {
  //         if (window.confirm(`This will change your email to ${user.email}. Are you sure? `)) {
  //             let res = await updateEmail(user.email)
  //             alert(res.message)
  //         }
  //     }
  // }

  const changeName = async name => {
    const res = await updateName(name)
    if (res) {
      alert('Name changed successfully!')
    } else {
      alert('Something went wrong. Please try again.')
    }
  }

  const [user, setUser] = useState('')
  useEffect(() => {
    const user = getUser()
    if (user) setUser(user)
  }, [])

  // Grabs the vouchers from firebase.
  const [vouchers, setVouchers] = useState('')
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const firebase = getFirebase()
    const db = firebase.firestore()
    if (user) {
      const unsubscripe = db
        .collection('users')
        .doc(user.uid)
        .collection('vouchers')
        .where('redeemed', '==', false)
        .onSnapshot(snapshot => {
          const vouchersData = []
          snapshot.forEach(doc => {
            const info = doc.data()
            vouchersData.push(info)
          })
          setVouchers(vouchersData)
        })
      return () => unsubscripe()
    }
  }, [user])

  // Grabs the favorite HHs from firebase.
  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    const firebase = getFirebase()
    const db = firebase.firestore()
    if (user) {
      const savedHH = []
      db.collection('users')
        .doc(user.uid)
        .collection('savedHappyHours')
        .get()
        .then(snap => {
          snap.forEach(doc => savedHH.push(doc.data()))
          setFavorites(savedHH)
        })
        .catch(err => err)
    }
  }, [user])

  // Resubmits the used vouchers to the DB when back online.
  useEffect(() => {
    const unsubmitted = JSON.parse(localStorage.getItem('unsubmitted'))
    if (unsubmitted && user.uid) {
      const url = 'https://us-central1-georgia-on-my-dime.cloudfunctions.net/redeemVoucher'
      const requests = unsubmitted.map(uid => Axios.post(url, { uid: user.uid, voucherId: uid }))

      Promise.all(requests)
        .then(values => {
          const uids = values.map(val => val.data.uid)
          uids.forEach(uid => {
            const index = unsubmitted.indexOf(uid)
            if (index !== -1) unsubmitted.splice(index, 1)
          })
          if (unsubmitted.length > 0) {
            localStorage.setItem('unsubmitted', JSON.stringify(unsubmitted))
          } else {
            localStorage.removeItem('unsubmitted')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [user])

  // Removes the voucher if it is redemmed offline, and adds the item to local stroage to be updated when back online.
  const hideVoucher = redeemed => {
    const filtered = vouchers.filter(deal => deal.id !== redeemed.id)
    let unsubmitted = []
    const existing = JSON.parse(localStorage.getItem('unsubmitted'))
    if (existing) {
      unsubmitted = existing
    }
    unsubmitted.push(redeemed.id)
    localStorage.setItem('unsubmitted', JSON.stringify(unsubmitted))
    setVouchers(filtered)
  }

  const panes = [
    {
      menuItem: 'Vouchers',
      render: () => (
        <Tab.Pane>
          {vouchers ? (
            <div>
              <h2>Your Vouchers</h2>
              <Responsive {...Responsive.onlyMobile}>
                <Vouchers rows={1} data={vouchers} hideVoucher={hideVoucher} user={user} />
              </Responsive>
              <Responsive minWidth={768}>
                <Vouchers rows={3} data={vouchers} hideVoucher={hideVoucher} user={user} />
              </Responsive>
            </div>
          ) : (
            <Loader active inline='centered'>
              Getting Vouchers...
            </Loader>
          )}
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Favorites',
      render: () => (
        <Tab.Pane>
          <Responsive {...Responsive.onlyMobile}>
            <Favorites rows={1} favorites={favorites} hideVoucher={hideVoucher} user={user} />
          </Responsive>
          <Responsive minWidth={768}>
            <Favorites rows={3} favorites={favorites} hideVoucher={hideVoucher} user={user} />
          </Responsive>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Profile',
      render: () => (
        <Tab.Pane>
          {/* {user.emailVerified ? null : <Button onClick={sendVerification} primary>Verify Email</Button>} */}
          <Button onClick={userSignOut}>Sign Out</Button>
          <Form style={{ marginTop: '10px' }}>
            <Form.Field>
              <label>Name (First Last)</label>
              <Input
                value={user.displayName ? user.displayName : ''}
                onChange={e => setUser({ ...user, displayName: e.target.value })}
                action
                style={{ maxWidth: '400px' }}
              >
                <input />
                <Button onClick={() => changeName(user.displayName)} primary>
                  Save
                </Button>
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Email Address</label>
              <Input
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
                style={{ maxWidth: '400px' }}
                readOnly
              >
                <input />
                {/* <Button onClick={() => changeEmail(user.email)} primary>Update</Button> */}
              </Input>
            </Form.Field>
            <h3>Update Password</h3>
            <Button onClick={changePassword} loading={loading} primary>
              Send Reset Email
            </Button>
            <p> {message}</p>
          </Form>
        </Tab.Pane>
      )
    }
  ]

  return (
    <div>
      <Header />
      <Layout>
        <div style={{ minHeight: '70vh' }}>
          <Tab panes={panes} />
        </div>
      </Layout>
    </div>
  )
}

export default Profile
