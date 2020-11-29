import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';

const state = {
    labels: ['January', 'February', 'March',
        'April', 'May'],
    datasets: [
        {
            label: 'Rainfall',
            backgroundColor: [
                '#B21F00',
                '#C9DE00',
                '#2FDE00',
                '#00A6B4',
                '#6800B4'
            ],
            hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
            ],
            data: [65, 59, 80, 81, 56]
        }
    ]
}

export const Statistics = () => {
    return (
        <div style={styles.chartWrapper}>
            <Doughnut
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'First Chart',
                        fontSize: 50,
                        position: 'top',
                        padding: 30
                    },
                    legend: {
                        display: true,
                        position: 'left',
                        labels: {
                            fontSize: 60
                        }
                    },
                    tooltips: {
                        enabled: false,
                    },
                }}
            />
            <Pie
                data={state}
                options={{
                    title: {
                        display: true,
                        text: 'Second Chart',
                        fontSize: 50,
                        position: 'top',
                        padding: 30
                    },
                    legend: {
                        display: true,
                        position: 'left',
                        labels: {
                            fontSize: 60
                        }
                    },
                    tooltips: {
                        enabled: false,
                    },
                }}
            />
        </div>
    )
}

const styles = {
    chartWrapper: {
        display: 'flex',
        marginTop: '40px',
        alignItems: 'center',
        justifyContent: 'center',
        height: '84vh',
    }
}