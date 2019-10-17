import React, {Component} from 'react';
import './App.css';
import Display from './Components/Display';
import Button from './Components/Button';
import { connect } from 'react-redux';

class App extends Component {

  //constructor
  constructor(props){
    super(props);
    this.state ={
      input: "0",
      prevNum: 0,
      prevOperand: "+",
      showScientific: false,
    }
    this.btnStyle = {
      backgroundColor: this.props.buttonColor,
      color: this.props.buttonFontColor
    }
  }

  getInput = (a) => { 
    if(this.state.input === "0"){
      this.setState({ input: a})
    }else{
      this.setState({ input: this.state.input+a})
    } 
  }

  doProcess = (op) => {
    let input1 = parseInt(this.state.input);

    switch(this.state.prevOperand ){
      case "+":
          this.setState({ prevNum: this.state.prevNum + input1 , input:"0"});
          break;
      
      case "-":
          this.setState({ prevNum: this.state.prevNum - input1 , input:"0"});
          break;

      case "*":
          this.setState({ prevNum: this.state.prevNum * input1 , input:"0"});
          break;

      case "/":
          this.setState({ prevNum: this.state.prevNum / input1 , input:"0"});
          break;

      case "=":
          this.setState({ prevNum: this.state.prevNum });
          break;

      default:
          this.setState({input: "ERROR"});
    }

    this.setState({prevOperand: op});
  }

  //Triggers when clear button is pressed
  doClearOp = () => {
    this.setState({ prevNum: 0 , input:"0", prevOperand: "+"});
  }

  /*
  * FUNCTIONS FOR TASK 2!
  */
  showScientificFunctions = () => {
    const getVal = this.state.showScientific;
    this.setState({
      showScientific: !getVal
    })
  }
  
  flipInput = () => { this.setState({ input: -this.state.input });}
  computeSquare = () => { this.setState({prevNum: parseInt(this.state.input) * parseInt(this.state.input), input:"0"});}
  computeSqRoot = () => { this.setState({ prevNum: Math.sqrt(parseInt(this.state.input)), input: "0"});}


  /*
  * FUNCTIONS FOR TASK 3!
  */
   componentDidUpdate(){
   //  console.log("bg is "+this.props.backGroundColor)
     document.body.style.backgroundColor =  this.props.backGroundColor;
   }

  render(){
    console.log("[DEBUG: RENDER] prevNum: "+this.state.prevNum+" and input: "+this.state.input);

   return (
    <div className="container">
      <Display>    
          {this.state.input === "0" ? this.state.prevNum.toString() : this.state.input}
      </Display>
      <div className="keypad"> 
        <div className="BtnRow">
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("1")}>1</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("2")}>2</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("3")}>3</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.doProcess("+")}>+</Button>
        </div>
        <div className="BtnRow">
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("4")} >4</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("5")} >5</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("6")} >6</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.doProcess("-")} >-</Button>
        </div>
        <div className="BtnRow">
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("7")} >7</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("8")}>8</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("9")} >9</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.doProcess("*")}>*</Button>
        </div>
        <div className="BtnRow">
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.doClearOp()} >clear</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.getInput("0")}>0</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.doProcess("=")}>=</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor}} click={() => this.doProcess("/")}>/</Button>
        </div>

        <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor,width:"100%"}} click={() => this.showScientificFunctions()}>Scientific mode!</Button>

        {this.state.showScientific ?
               <div className="BtnRow">
                 <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor,width:"33.33%"}} click={() => this.flipInput()}>Sign Flip</Button>
                 <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor,width:"33.33%"}} click={() => this.computeSquare()}>Square</Button>
                 <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor,width:"33.33%"}} click={() => this.computeSqRoot()}>Sq root</Button>
               </div>  
             : "" }

        <div className="BtnRow">
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor,width: "50%"}} click={this.props.LightTheme}>Light Theme</Button>
          <Button style={{backgroundColor: this.props.buttonColor, color: this.props.buttonFontColor,width: "50%"}} click={this.props.DarkTheme}>Dark Theme</Button>
        </div>
        
      </div>
    </div>

   );
  }
}

const mapStateToProps = (state) => {
  return {
      backGroundColor: state.colorBackground,
      buttonColor: state.colorButtons,
      buttonFontColor: state.colorFont
  };
}
const mapDipatchToProps = (dispatch) => {
  return {
      LightTheme : () => {dispatch({type: "LIGHT_MODE"})},
      DarkTheme : () => {dispatch({type: "DARK_MODE"})}
     
  };
}

export default connect(mapStateToProps,mapDipatchToProps)(App);
