import React, {FormEvent, useState} from 'react';
import "./userForm.scss"
import {createUser, UserCreationForm, UserErrors} from "../../http/usersAPI";
import {UserSuccess} from "../../http/usersAPI";



function UserForm() {
    const [userData, setUserData] = useState<UserCreationForm>({} as UserCreationForm)
    const [images, setImages] = useState<FileList | null>(null);
    const [errors, setErrors] = useState<UserErrors>({} as UserErrors)
    const [success, setSuccess] = useState<UserSuccess>({} as UserSuccess)
    const handleCreateUserForm = async (event: FormEvent) => {
        event.preventDefault()

        const formData = new FormData();

        for (const key in userData) {
            formData.append(key, userData[key as keyof UserCreationForm].toString());
        }

        if (images) {
            formData.append('photo', images[0])
        }

        const newUser = await createUser(formData)

        if (!newUser.success) {
            setErrors(newUser)
        }else{
            setSuccess(newUser as UserSuccess)
        }


    }

    return (
        <form onSubmit={handleCreateUserForm}>
            <div className={errors.message?.length ? "error-message" : "success-message"}>
                {!errors.message?.length ? success.message : errors.message}
            </div>
            <div className="input-container">
                <label htmlFor="name">Name</label>
                <input type="text" id="name"
                       required={true}
                       onChange={(event) => {
                           setUserData({...userData, name: event.target.value})
                       }}/>
                <span className="error">
                    {errors.fails?.name ? errors.fails?.name[0] : ""}
                </span>
            </div>

            <div className="input-container">
                <label htmlFor="email">Email</label>
                <input type="text" id="email"
                       required={true}
                       onChange={(event) => {
                           setUserData({...userData, email: event.target.value})
                       }}/>
                <span className="error">
                    {errors.fails?.email ? errors.fails?.email[0] : ""}
                </span>
            </div>

            <div className="input-container">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone"
                       required={true}
                       onChange={(event) => {
                           setUserData({...userData, phone: event.target.value})
                       }}/>
                <span className="error">
                    {errors.fails?.phone ? errors.fails?.phone[0] : ""}
                </span>
            </div>

            <div className="input-container">
                <label htmlFor="position_id">Position id</label>
                <input type="text" id="position_id"
                       required={true}
                       onChange={(event) => {
                           setUserData({...userData, position_id: event.target.value})
                       }}/>
                <span className="error">
                    {errors.fails?.position_id ? errors.fails?.position_id[0] : ""}
                </span>
            </div>

            <div className="input-container">
                <label htmlFor="image">Photo</label>
                <input type="file" id="image"
                       required={true}
                       onChange={(event) => {
                           if (event.target.files){
                               setImages(event.target.files)

                           }
                       }}
                />
                <span className="error">
                    {errors.fails?.photo ? errors.fails?.photo[0] : ""}
                </span>
            </div>

            <button type="submit" className="btn-create">Create user</button>




        </form>
    );
}

export default UserForm;