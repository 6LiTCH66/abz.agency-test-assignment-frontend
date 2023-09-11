import React, {useEffect, useState} from 'react';
import "./usersList.scss"
import {getUsers, Pagination, User, UserList} from "../../http/usersAPI";


const UsersList = () => {
    const [users, setUsers] = useState<UserList>()
    const [page, setPage] = useState<number>(1)



    useEffect(() => {
        const pagination: Pagination = {
            count: 6,
            page: page
        }
        getUsers(pagination).then((usersList) => {
            setUsers(usersList)

        })
    }, [page]);

    const nextPage = () => {
        setPage(prevState => prevState + 1)
    }

    return (
        <div>
            <div className="page-info">
                You are on page '{users?.page}' of '{users?.total_pages}'

            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Position_id</th>
                        <th>Photo</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>

                    {users?.users?.map((user, index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.position}</td>
                            <td>{user.position_id}</td>
                            <td>{user.photo}</td>
                            <td>{user.createdAt.toString()}</td>
                            <td>{user.updatedAt.toString()}</td>
                        </tr>
                    ))}

                </tbody>

            </table>
            <button type="button" onClick={nextPage} className="btn-next" disabled={!users?.links.next_url }>Show more</button>
        </div>
    );
}

export default UsersList;