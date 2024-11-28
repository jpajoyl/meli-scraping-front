import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'reactstrap'
import { IWishListItem } from '../models/wishListModel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteWishList, getWishList } from '../services/wishListService'

function WishList() {

    const [WishList, setWishList] = useState<IWishListItem[]>([])

    function fetchWishList() {
        getWishList().then(res => {
            if (res.status === 200) {
                const resWish = res.data
                setWishList(resWish)
            }
        }).catch(error => {
            if (error.response.status === 403) {
            }
            console.log(error.message)
        })
    }

    function deleteWishListItemHandler(id: number) {
        deleteWishList(id).then(res => {
            if (res.status === 204) {
                setWishList(wl => wl.filter(i => i.id !== id))
            }
        })
    }

    useEffect(() => {
        fetchWishList()
    }, [])


    function formatData() {
        return WishList.map(wl => {
            return (
                <tr>
                    <td>
                        <img width={50} src={wl.image} alt={wl.name} />

                    </td>
                    <td>
                        {wl.id}
                    </td>
                    <td>
                        {wl.name}
                    </td>
                    <td>
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(
                            wl.price,
                        )}
                    </td>
                    <td>
                        <Button onClick={() => {

                        }} color='primary'>
                            <FontAwesomeIcon icon={faLink} onClick={() => {
                                window.open(wl.mercado_libre_url, '_blank')
                            }} />
                        </Button>
                        <Button color='danger' onClick={(e) => deleteWishListItemHandler(wl.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <Container>
            <h2>Lista de deseos</h2>

            <Table striped responsive>
                <thead>
                    <tr>
                        <th>

                        </th>
                        <th>
                            ID
                        </th>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Precio
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

        </Container>
    )
}

export default WishList