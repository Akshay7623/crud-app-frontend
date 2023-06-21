import { useState } from "react";
import HostUrl from '../HostUrl';

const CreateUsers = () => {


    const [form, setForm] = useState({
        name: '',
        mobile: '',
        address: '',
        age: '',
    });

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const hanldeSubmit = (e) => {

        e.preventDefault();
        if (form.name === '' || form.mobile === '' || form.address === '' || form.age === '') {
            alert('INSERT VALID DATA');
            return;
        }

        fetch(`${HostUrl}/api/create`, {
            method: 'POST',
            body: JSON.stringify({ name: form.name, mobile: form.mobile, age: +form.age, address: form.address }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => data.json()).then((x) => {
            if (x.message === 'USER_CREATED') {
                setForm({ name: '', mobile: '', address: '', age: '' })
                alert('Success');
            }else{
                alert('Some error');
            }
        })
    }


    return (
        <div style={{textAlign:'center'}}>
            <div><h1>Create user </h1></div>
            <div>
                <input type="text" name="name" value={form.name} onChange={handleForm} placeholder="name" />
            </div>
            <div>
                <input type="text" name="mobile" value={form.mobile} onChange={handleForm} placeholder="mobile" />
            </div>
            <div>
                <input type="number" name="age" value={form.age} onChange={handleForm} placeholder="age" />
            </div>
            <div>
                <input type="text" name="address" value={form.address} onChange={handleForm} placeholder="address" />
            </div>
            <div>
                <button onClick={hanldeSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default CreateUsers;