import React, { useEffect, useState } from 'react';
import HostUrl from '../HostUrl';

const AllUser = () => {

    const [users, setUsers] = useState();
    const [totalDoc, setTotalDoc] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [form, setForm] = useState({
        id: '',
        name: '',
        mobile: '',
        address: '',
        age: '',
    });

    const nextPage = () => {
        if (pageNo !== Math.ceil(totalDoc / 10)) {
            setPageNo(pageNo + 1);
        }
    }

    const prevPage = () => {
        if (pageNo > 1) {
            setPageNo(pageNo - 1);
        }
    }

    const deleteUser = (e) => {

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

                    const newData = users.filter((ele) => {
                        return ele._id !== id;
                    });

                    setUsers(newData);
                    setTotalDoc(totalDoc - 1);
                    if ((totalDoc - 1) % 10 === 0 && pageNo > 1) {
                        setPageNo(pageNo - 1);
                    }
                }
            });
        }

    }

    const editUser = (e) => {

        const id = e.target.getAttribute('data-ele');
        document.querySelector('.modal').style.display = 'block';

        const userdata = users.filter((ele) => {
            return ele._id === id;
        });

        setForm({ id: userdata[0]._id, name: userdata[0].name, mobile: userdata[0].mobile, age: userdata[0].age, address: userdata[0].address });
    }

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const closeModal = () => {
        document.querySelector('.modal').style.display = 'none';
    }

    const hanldeEdit = (e) => {

        e.preventDefault();
        if (form.name === '' || form.mobile === '' || form.address === '' || form.age === '') {
            alert('INSERT VALID DATA');
            return;
        }

        fetch(`${HostUrl}/api/updateuser`, {
            method: 'POST',
            body: JSON.stringify({ id: form.id, name: form.name, mobile: form.mobile, age: +form.age, address: form.address }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then((x) => {
            if (x.message === 'UPDATED') {
                const allUser = users.map((ele, index) => {
                    if (ele._id === form.id) {
                        return { _id: form.id, address: form.address, age: form.age, mobile: form.mobile, name: form.name, isVerified: ele.isVerified, createdAt: ele.createdAt }
                    } else {
                        return ele;
                    }
                });
                setUsers(allUser);
                closeModal();
            }
        });
    }

    useEffect(() => {
        fetch(`${HostUrl}/api/getusers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then((x) => {
            setUsers(x);
            setTotalDoc(x.length);
        });
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>All Users</h1>
            <div className="modal">
                <div className="modal-content">
                    <span onClick={closeModal}>&#9747;</span>
                    <h2>Update user</h2>
                    <input style={{ marginTop: '10px' }} type="text" name="name" onChange={handleForm} value={form.name} placeholder="name" />
                    <input type="text" name="mobile" onChange={handleForm} value={form.mobile} placeholder="mobile" />
                    <input type="text" name="address" onChange={handleForm} value={form.address} placeholder="address" />
                    <input type="number" name='age' onChange={handleForm} value={form.age} placeholder="age" />
                    <div className="button-container">
                        <button onClick={hanldeEdit}>Submit</button>
                    </div>
                </div>
            </div>
            <table>
                <tbody>
                    {
                        users?.slice((pageNo - 1) * 10, (pageNo - 1) * 10 + 10).map((ele) => {
                            return (
                                <tr key={ele._id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
                                    <td>{ele.name}</td>
                                    <td>{ele.mobile}</td>
                                    <td>{ele.address}</td>
                                    <td>{ele.age}</td>
                                    <td>{ele.createdAt}</td>
                                    <td><button onClick={deleteUser} id={ele._id}>Delete</button></td>
                                    <td><button onClick={editUser} data-ele={ele._id}>Edit</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px' }}>
                <div onClick={prevPage}>&#8592;</div>
                <div>{pageNo}/{Math.ceil(totalDoc / 10)}</div>
                <div onClick={nextPage}>&#8594;</div>
            </div>

        </div>
    )
}

export default AllUser;
