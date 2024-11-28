import React, { useEffect, useState } from 'react'
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { IUpdateFormData, IUser } from '../../models/authModel';

interface IPropsUserModal {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    user: IUser | undefined;
    handleSubmit: (id: number, formData: IUpdateFormData) => Promise<void>
}

function UpdateUserModal(props: IPropsUserModal) {
    const { open, setOpen, user, handleSubmit } = props

    const [formData, setFormData] = useState<IUpdateFormData>({
        username: '',
        password: '',
        email: '',
        name: '',
        last_name: '',
        phone: '',
        gender: '',
        role: 'user',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === 'email') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                username: formData.email
            });
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                password: '',
                email: user.email,
                name: user.name,
                last_name: user.last_name,
                phone: user.phone,
                gender: user.gender,
                role: user.role
            })
        }
    }, [user])


    const toggle = () => setOpen(!open);
    return (
        <div>
            <Modal isOpen={open} toggle={toggle} size='lg'>
                <ModalHeader toggle={toggle}>Editar usuario {`${user?.name} ${user?.last_name}`}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Nombre</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="last_name">Apellido</Label>
                            <Input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Teléfono</Label>
                            <Input
                                type="text"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gender">Género</Label>
                            <Input
                                type="select"
                                id="gender"
                                name="gender"
                                required
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="M">Masculino</option>
                                <option value="F">Femenino</option>
                                <option value="O">Otro</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">Rol</Label>
                            <Input
                                type="select"
                                id="role"
                                name="role"
                                required
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Contraseña</Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleSubmit(user?.id || 0, formData)}>
                        Actualizar
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UpdateUserModal