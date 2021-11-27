import { getAllByDisplayValue } from "@testing-library/dom";

const initialState =[
    {
        id: 0,
        firstName: "Abid",
        surName: "Hassan",
        email:"abidhassan@gmail.com",
        phoneNumber:189939,
    },
    {
        id: 1,
        firstName: "Habib",
        surName: "Khalid",
        email:"Habibhassan@gmail.com",
        phoneNumber:1899344459,
    },


];

const ContactReducer = (state = initialState, action) =>{
    switch (action.type){
        case "ADD_Contact":
        state = [...state, action.payload];
        return state;
        default:
            return state;

    }
};
export default ContactReducer;