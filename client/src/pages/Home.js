import React from 'react';

export const Home = () => {
    return (
        <p style={styles.textStyle}>«Чем большим числом возможностей я воспользуюсь, чем больше новых возможностей передо мной откроется»</p>
    )
}

const styles = {
    textStyle: {
        fontStyle: 'italic',
        fontSize: 50,
        display: 'flex',
        height: '92vh',
        background: '#d2e9ff',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    }
}