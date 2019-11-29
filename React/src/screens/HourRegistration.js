import React from 'react';

import InputField from '../components/InputField'
import Button from './../components/Button'
import Modal from '../components/Modal'
import CalendarModal from '../components/CalendarModal';
import SaveModal from '../components/SaveModal';
import TimeWheel from '../components/TimeWheel';
import '../App.css' ;

import Picker from 'react-mobile-picker';



export default class HourRegistrationScreen extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      valueGroups: {
        hour: '00',
        minute: '00'
      },
      optionGroups: {
        hour: ['00', '01', '02', '03','04','05','06','07','08'],
        minute: ['00', '05', '10', '15','20','25','30','35','40', '45','50', '55']
      },
        selectedButton: null,
        buttonsRow1: [
          {id: 0, label: "Me", selected: false},
          {id: 1,label: "Coworker", selected: false, onClick : () => {}},
          {id: 2,label: "Both", selected: false}
        ],
        buttonsRow2: [
          {id: 3, label: "Today", selected: false},
          {id: 4, label: "Yesterday", selected: false},
          {id: 5, label: "Other", selected: false}
        ],
        showModal: false,
        showCalendarModal: false,
        showSaveModal: false,
        coworker: 'Coworker',
        calendarDate: 'Other'
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.openCalendarModal = this.openCalendarModal.bind(this)
    this.closeCalendarModal = this.closeCalendarModal.bind(this)

    this.openSaveModal = this.openSaveModal.bind(this)
    this.closeSaveModal = this.closeSaveModal.bind(this)
    this.clearAll = this.clearAll.bind(this)
  }

  getCoworker = (coworkerName) => {
    console.log('Value from HourReg: ' + coworkerName)
    this.setState({ coworker: coworkerName })
  }

  getDate = (calendarDate) => {
    console.log('Value from CalendarModal: ' + calendarDate)
    this.setState({ calendarDate: calendarDate })
  }

  openModal() {
    this.setState({
        showModal: true
    });
  }

  openCalendarModal() {
    this.setState({
      showCalendarModal: true
    })
  }

  openSaveModal() {
    this.setState({
      showSaveModal: true
    })
  }

  closeModal() {
    this.setState({
        showModal: false
    });
  }

  closeCalendarModal() {
    this.setState({
        showCalendarModal: false
    });
  }

  closeSaveModal() {
    this.setState({
      showSaveModal: false
    })
  }

  changeButtonState (id, index) {
    let buttonState = []
    if(id<=2) buttonState = this.state.buttonsRow1
    if(id>2) buttonState = this.state.buttonsRow2
    buttonState.map((button) => button.selected = false)
    buttonState[index].selected = !buttonState[index].selected
    this.setState(buttonState)
  }
  
  // Update the timepicker value in response to user picking event
handleChange = (name, value) => {
  this.setState(({valueGroups}) => ({
    valueGroups: {
      ...valueGroups,
      [name]: value
    }
  }));
};

  clearAll() {
    this.setState({
      valueGroups: {
        hour: '00',
        minute: '00'
      },
      selectedButton: null,
        buttonsRow1: [
          {id: 0, label: "Me", selected: false},
          {id: 1,label: "Coworker", selected: false, onClick : () => {}},
          {id: 2,label: "Both", selected: false}
        ],
        buttonsRow2: [
          {id: 3, label: "Today", selected: false},
          {id: 4, label: "Yesterday", selected: false},
          {id: 5, label: "Other", selected: false}
        ],
      showModal: false,
      showCalendarModal: false,
      coworker: 'Coworker',
      calendarDate: 'Other'
    })
  }

  render() {
    const textStyle = {
      fontSize: '30px',
      color: 'rgba(8, 67, 135, 0.8)',
      padding: '20px'
    };

    const {optionGroups, valueGroups} = this.state;

    return (
      
      <div className="content-area">
        <div>
          <div style={textStyle}>Who are you registering?</div>
          <div className='row'>

            <Button 
              id = {this.state.buttonsRow1[0].id} 
              label={this.state.buttonsRow1[0].label} 
              selected={this.state.buttonsRow1[0].selected} 
              onClick={()=> this.changeButtonState(this.state.buttonsRow1[0].id, 0)}/>

            <Button 
              id={this.state.buttonsRow1[1].id} 
              label={this.state.coworker} 
              selected={this.state.buttonsRow1[1].selected} 
              onClick={() => {
                this.openModal()
                this.changeButtonState(this.state.buttonsRow1[1].id, 1)
              }}/>
            <Modal 
              show={this.state.showModal}
              onClose={this.closeModal}
              animation={false} 
              selectedCoworkerM={this.getCoworker}/>

            <Button 
              id = {this.state.buttonsRow1[2].id} 
              label={this.state.buttonsRow1[2].label} 
              selected={this.state.buttonsRow1[2].selected} 
              onClick={()=> this.changeButtonState(this.state.buttonsRow1[2].id, 2)}/>
        </div>  
      </div>

      <div>
        <div style={textStyle}>Which day are you registering for?</div>
        <div className='row'>
          {/*{this.state.buttonsRow2.map((button, index) => {
              return(
                <Button id = {button.id} label={button.label} selected={button.selected} onClick={()=> this.changeButtonState(button.id, index)}/>
              )
            })} */}
          <Button id = {this.state.buttonsRow2[2].id} label={this.state.buttonsRow2[0].label} selected={this.state.buttonsRow2[0].selected} onClick={()=> this.changeButtonState(this.state.buttonsRow2[0].id, 0)}/>  
          <Button id = {this.state.buttonsRow2[1].id} label={this.state.buttonsRow2[1].label} selected={this.state.buttonsRow2[1].selected} onClick={()=> this.changeButtonState(this.state.buttonsRow2[1].id, 1)}/>
          <Button 
            id = {this.state.buttonsRow2[2].id} 
            label={this.state.calendarDate} 
            selected={this.state.buttonsRow2[2].selected} 
            onClick={()=> {
              this.openCalendarModal()
              this.changeButtonState(this.state.buttonsRow2[2].id, 2)
            }}/>
          <CalendarModal
            show={this.state.showCalendarModal}
            onClose={this.closeCalendarModal}
            animation={false} 
            chosenDate={this.getDate}/>    
        </div>
      </div>

      <div>
      <InputField
        label="Tap here to describe what you worked on." />
      </div>
      <div style={textStyle}>How long did you work on this task?</div>

      <div style={{ 
        width: "absolute", 
        backgroundColor: "white", 
        padding: "20px", 
        margin: "20px", 
        borderRadius: 10, 
      }}> 

      <TimeWheel></TimeWheel>
        
      </div>

       <button 
        className="hr-button-save"
        onClick={() => {
          this.openSaveModal()
          this.clearAll()
        }}
        >Save</button>

<SaveModal
            show={this.state.showSaveModal}
            onClose={this.closeSaveModal}
            animation={false} 
          /> 

    </div>
  )};
};

/** <Picker
          optionGroups={optionGroups}
          itemHeight={50}
          valueGroups={valueGroups}
          onChange={this.handleChange} 
        /> */
