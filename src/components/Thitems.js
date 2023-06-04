import React from 'react'

export const Thitems = (props) => {
    const { Object } = props
    let date = new Date(Object.Ondate);
    date = date.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    return (
        <div>
            <div className="container shadow p-3 mb-5 bg-body rounded card w-50">
                <div className="card-body">
                    <div className="text-center card-title fs-4">{Object.mode}({Object.transportname})</div><br></br>
                    <p className="card-text fs-5">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>{date}</p>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    )
}
