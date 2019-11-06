let contact = JSON.parse(localStorage.getItem("contact"));
const initialState = contact;

// to verify the condition with the type "SAVECONTACTS" and if the action.payload is not undefined, the data storage in the localStorage in JSON format with the name contact
const contacts = (state = initialState, action) => {
  switch (action.type) {
    case "SAVECONTACTS":
      if (action.payload !== undefined) {
        localStorage.setItem("contact", JSON.stringify(action.payload));
        return [...action.payload];
      }
      break;
    default:
      return state;
  }
};

export default contacts;
