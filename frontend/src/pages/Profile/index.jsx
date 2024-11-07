
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { putUpdateProfile } from '../../services/apiService';
import { updateUser } from '../../redux/authReducer';

function Profile() {
    const dispatch = useDispatch();
    const account = useSelector(state => state.auth);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [avatar, setAvatar] = useState(null);


    useEffect(() => {
        setEmail(account.account.email)
        setName(account.account.name)
        setPhone(account.account.phone)
    }, [account])

    const handleImageAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file)
        }
    };


    const handleClickUpdateProfile = async (e) => {
        e.preventDefault();
        const res = await putUpdateProfile(email, name, phone);
        if (res.data.success) {
            dispatch(updateUser({ email, name, phone }));
            toast.success(res.data.message);
        } else {
            toast.error(res.data.message || "Cập nhật thất bại");
        }
    }

    return (
        <div className='d-flex gap-20 justify-center'>
            <div className="w-[30%] ">
                <h1>My Profile</h1>
                <img src={avatar} alt="" className="w-[300px] h-[300px] m-auto rounded-full" />
                <input type='file' accept="image/*" onChange={handleImageAvatar} />
                <form className='my-3' >
                    <div className="row mb-3">
                        <label htmlFor="emailProfile" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" name="email" className="form-control" id="emailProfile" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="nameProfile" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" name="name" className="form-control" id="nameProfile" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="phoneProfile" className="col-sm-2 col-form-label">Phone</label>
                        <div className="col-sm-10">
                            <input type="text" name="phone" className="form-control" id="phoneProfile" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>

                    <div className=" mb-3">
                        <button className="btn btn-warning">Đổi mật khẩu</button>
                    </div>

                    <button type="submit" className="btn btn-primary float-end" onClick={(e) => handleClickUpdateProfile(e)}>Cập nhật</button>
                </form>
            </div>
            
            <div className="">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Vé đã mua</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Vé đã huỷ</a>
                    </li>

                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Profile