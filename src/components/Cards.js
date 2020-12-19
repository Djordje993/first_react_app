import React from 'react';
import { Link } from 'react-router-dom';
import codebar from '../assets/codebar.png';
import discover from '../assets/discover.png';
import mastercard from '../assets/mastercard.png';
import visa from '../assets/visa.png';

class Cards extends React.Component {

  constructor(props){
    super(props);
    this.state={
      allCards:[]
    }
  }

  transformDate=(date)=>{
    let dateToDisplay=date.split('-');
    dateToDisplay=dateToDisplay[1]+"/"+dateToDisplay[0].substring(2);
    if(dateToDisplay){
      return dateToDisplay;
    }
    return '';
  }

  render(){
    let allCards = [];
    if(this.state.allCards){
      allCards = this.state.allCards;
    }

    return (
      <div className="all-cards">
        
        <Link to='/cards/add' className="links">
          <p className="add-new-card-button">Add Card +</p>
        </Link>
        {allCards.map((i, idx)=>(
          <Link to={"cards/"+(idx+1)+"/edit"} key={idx+'card'} className="links">
            <div className="single-card">
              <img src={codebar} className="barcode-img" alt="barcode"></img>
              <img src={
                Math.floor(parseInt(i.number[0])/1000)===4 ? visa: 
                Math.floor(parseInt(i.number[0])/1000)===5 ? mastercard: 
                Math.floor(parseInt(i.number[0])/1000)===6 ? discover : ""
              } className="cardtype-img" alt="Card-Type"></img>
              <p className="single-card-name">{i.name}</p>
              <p className="single-card-number">
                {i.number.map((j, jidx)=>(
                  <span key={jidx+'numberOf'+idx}>{j} </span>
                ))}
              </p>
              <p className="single-card-expires">{this.transformDate(i.expiresOn)}</p>
            </div>
          </Link>
        ))}
        
      </div>
    );
  }

  componentDidMount(){
    this.setState({
      allCards:JSON.parse(localStorage.getItem('allCards'))
    });
  }  
}

export default Cards;