// Initial state, it is dynamic
const theme = {
    text: "#001270", // white or blue
    bg:"white", // ws or faded blue
    buttons:"#436dff", // lightblue or deepblue
    navbar:"#edf0ff", // fadedblue or darkblue
    cardsBg: "white", //white or
    isDark:0 // 0 or 1
}

const themeReducer = (state = theme, action)=>{
    switch(action.type){
        case "DARK":{
            return {...state, text:"whitesmoke", bg:"#01142d", buttons:"#05c3ff", navbar:"#001b3e", cardsBg:"#00adff12", isDark:1}; 
        }
        case "LIGHT":{
            return {...state, text:"#001270", bg:"white", buttons:"#436dff", navbar:"#edf0ff", cardsBg:"white", isDark:0}; 
        }
        default: {return state;}
    }
}

export default themeReducer; 