import React from 'react';
import DisplaySingleCard from './DisplaySingleCard';
import { Link } from 'react-router-dom';

class EditCard extends React.Component {

  constructor(props){
    super(props);

    let index=parseInt(this.props.match.params.id)-1;
    let card=JSON.parse(localStorage.getItem('allCards'))[index];

    this.state={
      card:card
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


  errorNumberCheck(number){

  }

  saveChanges=()=>{
    let index=parseInt(this.props.match.params.id)-1;
    let allCards= JSON.parse(localStorage.getItem('allCards'));
    allCards.splice(index,1,this.state.card);
    localStorage.setItem('allCards',JSON.stringify(allCards));

    this.props.history.push(`/cards`);
  }


  render(){

    return (
      <div className="EditCard">
        <DisplaySingleCard
          card={this.state.card}
          handleInputChange={this.handleInputChange}
          saveChanges={this.saveChanges}>
        </DisplaySingleCard>

        <p>
            <Link to="/">Back</Link>
        </p>
      </div>
    );
  }
  
}

export default EditCard;