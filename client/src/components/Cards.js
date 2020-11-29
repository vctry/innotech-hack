import React from 'react';
import {NavLink} from "react-router-dom";
import ModalComponent from "./Modal";

export const Cards = ({imageLink, imageLoad, dataName, dataLastName, idUser, bday}) => {

    const loadImages = () => {
        if (imageLink) {
            return <img src={imageLink} className="card-img-top" alt="фото"/>
        } else if (imageLoad) {
            return <img src={imageLoad.props.src} className="card-img-top" alt="фото"/>
        } else {
            return <h2>Загрузите фото</h2>
        }
    }

    return (
        <div style={styles.wrapper}>
            <div className="card" style={{width: '50rem', marginTop: 50}}>
                <div style={styles.imageWrapper}>
                    {loadImages()}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{`${dataName} ${dataLastName}`}</h5>
                    <p className="card-text">{`Номер идентификации пользователя - ${idUser}. Дата рождения - ${bday}`}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
                <div className="card-body" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <ModalComponent
                        variant={'primary'}
                        nameButton={'Сохранить пользователя'}
                        modalHeaderText={'Создание нового пользователя'}
                        modalBodyText={'Пользователь создан и одобрен банком'}
                    />
                    <NavLink to='/statistics' className="btn btn-success">Посмотреть статистику</NavLink>
                    <ModalComponent
                        variant={'danger'}
                        nameButton={'Отказ пользователю'}
                        modalHeaderText={'Отказать'}
                        modalBodyText={'Отказать пользователю в предоставлению банковских услугах'}
                    />
                </div>
            </div>
        </div>
    )
}

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
    },
    imageWrapper: {
        width: 305,
        height: 345,
        padding: 5,
        margin: '10px auto',
        overflow: 'hidden'
    }
}