import React, {useState} from "react";

// import { Link } from 'react-router-dom';

const Card = ({ resident }) => {
    const[modal, setModal] = useState(false)
    const handleClick = () => {
        if (!modal)setModal(true)
        else setModal(false)
    }
    console.log(resident);
  return (
    <div key={resident.id} className={!modal?'resident-card':'resident-card-modal'}>
    <div className={!modal?'block-info':'block-info-modal'}>
      <div className={!modal?'resident-info':'resident-info-modal'}>
        
        <img className={!modal?'img':'img-modal'} src={resident.image} onClick={handleClick} alt={resident.name} style={{ cursor: 'pointer' }} />
        
        <div className={!modal?'details':'details-modal'}>
          <div className={!modal?'info-item':'info-item-modal'}>
            <strong>Name:</strong> {resident.name}
          </div>
          <div className={!modal?'info-item':'info-item-modal'}>
            <strong>Status:</strong> {resident.status}
          </div>
          <div className={!modal?'info-item':'info-item-modal'}>
            <strong>Species:</strong> {resident.species}
          </div>
          <div className={!modal?'info-item':'info-item-modal'}>
            <strong>Origin:</strong> {resident.origin.name}
          </div>
          
        </div>
      </div>
      <div className="episode-list">
        <h3>Episodes</h3>
        {resident.episode.slice(0, 3).map((episode, index) => (
          <p key={index}>{episode}</p>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Card;



