import React, { useState } from 'react';
import HostUrl from '../HostUrl';

const SingleUser = () => {

    const [id, setId] = useState('');
    const [user, setUser] = useState({
        id: '',
        name: '',
        mobile: '',
        address: '',
        age: ''
    });

    const hanldeSearch = (e) => {
        e.preventDefault();
        if (id === '') {
            alert('Please enter valid id');
            return;
        }

        fetch(`${HostUrl}/api/getuser`, {
            method: 'POST',
            body: JSON.stringify({ id: id }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then((x) => {

            if (x.message !== 'INVALID_DATA' && x.message !== 'NO_DATA') {
                setUser(x[0]);
            } else {
                alert('No data found');
            }

        });
    }

    const deleteUser = (e) => {
        e.preventDefault();
        const ask = window.confirm('Are you sure want to delete this ?');
        const id = e.target.id;

        if (ask) {
            fetch(`${HostUrl}/api/deleteuser`, {
                method: 'POST',
                body: JSON.stringify({ id: id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((data) => data.json()).then((x) => {

                if (x.message === 'USER_DELETED') {
                    setUser(null);
                }
            });
        }

    }

    const editUser = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-ele');
        document.querySelector('.modal').style.display = 'block';
    }

    const handleForm = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        document.querySelector('.modal').style.display = 'none';
    }

    const hanldeEdit = (e) => {

        e.preventDefault();
        if (user.name === '' || user.mobile === '' || user.address === '' || user.age === '') {
            alert('INSERT VALID DATA');
            return;
        }

        fetch(`${HostUrl}/api/updateuser`, {
            method: 'POST',
            body: JSON.stringify({ id: id, name: user.name, mobile: user.mobile, age: +user.age, address: user.address }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then((x) => {
            if (x.message === 'UPDATED') {
                closeModal();
            }
        })

    }


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Single User</h1>

            <div className="modal">
                <div className="modal-content">
                    <span onClick={closeModal}>&#9747;</span>
                    <h2>Update user</h2>
                    <input style={{ marginTop: '10px' }} type="text" name="name" onChange={handleForm} value={user.name} placeholder="name" />
                    <input type="text" name="mobile" onChange={handleForm} value={user.mobile} placeholder="mobile" />
                    <input type="text" name="address" onChange={handleForm} value={user.address} placeholder="address" />
                    <input type="number" name='age' onChange={handleForm} value={user.age} placeholder="age" />
                    <div className="button-container">
                        <button onClick={hanldeEdit}>Submit</button>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <input type="text" name="id" onChange={(e) => setId(e.target.value)} value={id} placeholder='Id'/>
                <br />
                <button onClick={hanldeSearch} style={{ marginBottom: '20px' }}>Search</button>
            </div>
            {user['name'] ?
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <div>{user.name}</div>
                    <div>{user.mobile}</div>
                    <div>{user.address}</div>
                    <div>{user.age}</div>
                    <div>{user.createdAt}</div>
                    <div><button onClick={deleteUser} id={user._id}>Delete</button></div>
                    <div><button onClick={editUser} data-ele={user._id}>Edit</button></div>
                </div> : <span></span>}
        </div>
    )
}

export default SingleUser