const initstate = {
      colorBackground: "#fff",
      colorButtons: "#f0f0f0",
      colorFont: "#000"
};

const reducer = (oldState = initstate, action) => {
  let newState={
      ...oldState
  }
  switch(action.type){
      case "LIGHT_MODE":
            newState={
                colorBackground: "#fff",
                colorButtons: "#f0f0f0",
                colorFont: "#000"
            }
            break;

      case "DARK_MODE":
            newState={
                 colorBackground: "#000",
                 colorButtons: "#666",
                 colorFont: "#fff"
            }
            break;
      default:
            newState={
                ...oldState
            }
  }

  return newState;
  
};

export default reducer;