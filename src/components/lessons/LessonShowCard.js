import React from 'react';

const ShowCard = ({color, label, data}) =>{
  // const {color, label, data} = this.props
  if(!color || !label || !data){
    return<div>Loading...</div>
  }
  return(
    <div className={`card text-white bg-${color} mb-3`} style={{Width:'50rem'}}>
      <div className="card-header">{label}</div>
      <div className="card-body">
        <p className="card-text">{data}</p>
      </div>
    </div>
  )
}

export default ShowCard
