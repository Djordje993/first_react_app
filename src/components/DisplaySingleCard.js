import React from 'react';
import codebar from '../assets/codebar.png';
import discover from '../assets/discover.png';
import mastercard from '../assets/mastercard.png';
import visa from '../assets/visa.png';

class DisplaySingleCard extends React.Component {

  transformDate=(date)=>{
    if(!date){return '';}
    let dateToDisplay=date.split('-');
    dateToDisplay=dateToDisplay[1]+"/"+dateToDisplay[0].substring(2);
    return dateToDisplay;
  }


  render(){
    const card=this.props.card;
    let saveBlocked=false;
    
    if(card.name.length<1){saveBlocked=true;}
    let nameInputStyle=card.name.length<1 ? {borderColor: 'red'} : {borderColor: '#888'};
    let numberInputStyle=[];
    for(let i=0 ; i<card.number.length; i++){
      let condition= card.number[i].length===4 && !isNaN(card.number[i]);
      if(i===0){
        condition= card.number[i].length===4 && !isNaN(card.number[i]) && Math.floor(parseInt(card.number[0])/1000)>=4 && Math.floor(parseInt(card.number[0])/1000)<=6;
      }
      if(condition){
        numberInputStyle.push({borderColor: '#888'})
      }else{
        numberInputStyle.push({borderColor: 'red'});
        saveBlocked=true;
      }
    }
    const minimumDate= new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()+1);
    if(!card.expiresOn){saveBlocked=true;}
    let expiresInputStyle= card.expiresOn ? {borderColor: '#888'} : {borderColor: 'red'};

    return (
      <div className="display-single-card-wrap">
        <div className="single-card">
          <img src={codebar} className="barcode-img" alt="barcode"></img>
          <img src={
                Math.floor(parseInt(card.number[0])/1000)===4 ? visa: 
                Math.floor(parseInt(card.number[0])/1000)===5 ? mastercard: 
                Math.floor(parseInt(card.number[0])/1000)===6 ? discover : ""
              } className="cardtype-img" alt="Card-Type"></img>
          <p className="single-card-name"><label htmlFor="name-input">{card.name}</label></p>
          <p className="single-card-number">
            {card.number.map((i, idx)=>(
              <span key={idx+'numberOf'}><label htmlFor={"number-"+idx}>{i}</label> </span>
            ))}
          </p>
          <p className="single-card-expires"><label htmlFor="expires-input">{this.transformDate(card.expiresOn)}</label></p>
        </div>
        
        <div className="inputs-wrap">
          <p>
            Name:
            <input 
              id="name-input" 
              name="name" 
              type="text" 
              style={nameInputStyle} 
              value={card.name} 
              onChange={this.props.handleInputChange}>
            </input>
          </p>
          <div className="number-inputs"> Number: <p>
          {card.number.map((i,idx)=>(
              <input 
                  id={"number-"+idx} 
                  key={'number'+idx}
                  name={'number'+idx} 
                  style={numberInputStyle[idx]}
                  value={i} 
                  onChange={this.props.handleInputChange}
                  maxLength="4"></input>
            
          ))}
          </p></div>
          <p>
            Expires On: 
            <input 
              id="expires-input" 
              name="expiresOn" 
              type="date" 
              min={minimumDate}
              value={card.expiresOn} 
              style={expiresInputStyle} 
              onChange={this.props.handleInputChange}>
            </input>
          </p>
          <button onClick={this.props.saveChanges} disabled={saveBlocked}>SAVE</button>
        </div>
        

      </div>
    );
  }
  
}

export default DisplaySingleCard;