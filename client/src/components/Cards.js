import React from 'react';
import image from '../assets/image.jpg'

export const Cards = () => {
    return (
        <div style={styles.wrapper}>
            <div className="card" style={{width: '50rem', marginTop: 50}}>
                <div style={{width: 305, height: 315, padding: 5, margin: '10px auto'}}>
                    <img src={image} className="card-img-top" alt="..."/>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of
                        the card's content.</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
                <div className="card-body">
                    <button className="btn btn-primary" style={{marginRight: 20}}>Detected face</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    wrapper: {
        display: 'flex',
        justifyContent: 'start',
    }
}