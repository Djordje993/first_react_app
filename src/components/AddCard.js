import React from 'react';
import DisplaySingleCard from './DisplaySingleCard';
import { Link } from 'react-router-dom';

class AddCard extends React.Component {

  state={
    card:{
      name:"",
      number:['','','',''],
      expiresOn: ''
    }
  }
    

    handleInputChange=(e)=>{
      let newNumber=[]
      for(let i=0; i<this.state.card.number.length; i++){
        newNumber.push(this.state.card.number[i]);
      }
      let newCard= {
        name: this.state.card.name,
        number: newNumber,
        expiresOn: this.state.card.expiresOn
      }

      if(e.target.name.indexOf('number')>-1){
        let index=e.target.name[e.target.name.length-1]
        newCard.number[index]=e.target.value;
      }
      else{
        newCard[e.target.name]=e.target.value
      }

      this.setState({
        card:newCard
      });
    }  
  
    addCardData=()=>{
      let allCards= JSON.parse(localStorage.getItem('allCards'));
      if(!allCards){
        allCards=[];
      }
      allCards.push(this.state.card);
      localStorage.setItem('allCards',JSON.stringify(allCards));

      this.props.history.push(`/cards`);
    }

  render(){

    return (
      <div className="AddCard">
        <p>This is Add</p>
        
        <DisplaySingleCard
          card={this.state.card}
          handleInputChange={this.handleInputChange}
          saveChanges={this.addCardData}>
        </DisplaySingleCard>

        <p>
            <Link to="/">Back</Link>
        </p>
      </div>
    );
  }
  
}

export default AddCard;