import React, { useEffect, useState } from 'react'
import { Alert, Button, Container, Table } from 'reactstrap'
import { IRegisterFormData, IUpdateFormData, IUser } from '../models/authModel'
import { disableUser, getUsers, updateUser } from '../services/authService'
import { GenderChoices, RoleChoices } from '../enums/AuthEnum'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import UpdateUserModal from '../components/Modals/UpdateUserModal'

function Users() {


    const [users, setUsers] = useState<IUser[]>([])
    const [isAdmin, setIsAdmin] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser>()

    function fetchUsers() {
        getUsers().then(res => {
            if (res.status === 200) {
                const resUsers = res.data
                setUsers(resUsers)
                setIsAdmin(true)
                console.log(resUsers)
            }
        }).catch(error => {
            if (error.response.status === 403) {
                setIsAdmin(false)
            }
            console.log(error.message)
        })
    }

    function disableUserHandler(id: number) {
        disableUser(id).then(res => {
            if (res.status === 200) {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Usuario desactivado con éxito',
                    icon: 'success',
                })
                let currentUser = users.find(u => u.id === id)
                if (currentUser) {
                    const updatedUsers = users.map(u => {
                        if (u.id === id) {
                            return {
                                ...u,
                                state: false
                            }
                        }
                        return u
                    })
                    currentUser.state = false
                    setUsers(updatedUsers)
                }
            }
        })
    }

    function formatData() {
        return users.map(u => {
            return (
                <tr>
                    <th scope="row">
                        {u.id}
                    </th>
                    <td>
                        {u.name}
                    </td>
                    <td>
                        {u.last_name}
                    </td>
                    <td>
                        {u.email}
                    </td>
                    <td>
                        {u.phone}
                    </td>
                    <td>
                        {GenderChoices[u.gender]}
                    </td>
                    <td>
                        {RoleChoices[u.role]}
                    </td>
                    <td>
                        {u.state ? 'Activo' : 'No activo'}
                    </td>
                    <td className='d d-flex justify-content-evenly'>
                        <Button onClick={() => {
                            setSelectedUser(u)
                            setOpenModal(true)
                        }} color='primary'>
                            <FontAwesomeIcon icon={faPen} />
                        </Button>
                        <Button color='danger' onClick={(e) => u.state ? disableUserHandler(u.id) : undefined} disabled={!u.state}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    async function updateUserHandler(id: number, formData: IUpdateFormData) {
        try {
            updateUser(id, formData)
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: 'Éxito',
                            text: 'Usuario actualizado con éxito',
                            icon: 'success',
                        }).then(result => {
                            setOpenModal(false)
                            const updatedUsers = users.map(u => {
                                if (u.id === id) {
                                    return response.data
                                }
                                return u
                            })
                            setUsers(updatedUsers)
                        })
                    }
                }).catch(error => {
                    alert(error.message)
                })

        } catch (err) {
            alert('Error al registrar el usuario.');
        }
    }


    return (
        <Container>
            <h2>Usuarios</h2>
            <UpdateUserModal open={openModal} setOpen={setOpenModal} user={selectedUser} handleSubmit={updateUserHandler} />
            {!isAdmin ? (
                <Alert color="danger">
                    No estas autorizado para ver este contenido
                </Alert>
            ) : (
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>
                                ID
                            </th>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Apellido
                            </th>
                            <th>
                                Correo
                            </th>
                            <th>
                                Teléfono
                            </th>
                            <th>
                                género
                            </th>
                            <th>
                                Rol
                            </th>
                            <th>
                                Estado
                            </th>
                            <th>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {formatData()}
                    </tbody>
                </Table>
            )}
        </Container>
    )
}

export default Users