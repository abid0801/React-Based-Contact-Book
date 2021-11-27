import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Dexie from "dexie";


const AddContact = () => {
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addPosts, setAddPosts] = useState("");
    //set the database 
    const db = new Dexie("ReactDexie");
    //create the database store
    db.version(1).stores({
        posts: "firstName, surName, email, phoneNumber"
    })
    db.open().catch((err) => {
        console.log(err.stack || err)
    })


    const handleSubmit = (e) => {

        if(firstName !== "" && surName !== "" && email !== "" && phoneNumber !== ""){
            let post = {
                firstName: firstName,
                surName:surName,
                email: email,
                phoneNumber : phoneNumber
            }
           
    
            db.posts.add(post).then(async() => {
                //retrieve all posts inside the database
                let allPosts = await db.posts.toArray();
                //set the posts
                setAddPosts(allPosts);
            });
            

        }
        else 
        return toast.warning("Please fill in all fields!!")
        
    
    }

    // const contacts = useSelector((state) => state);

    return (
        <div className="container">
        <div className="row">
            <h1 className="display-3 text-center">
                Add Contacts
            </h1>
            <div className="col-md-6 shadow mx-auto p-5">
            <form onSubmit={handleSubmit} >
                <label>
                   First Name:
                    <input type="text" name="firstName" value={firstName} onChange= {(e)=>{setFirstName(e.target.value)}} />
                    </label>
                    <label>
                   Sur Name:
                    <input type="text" name="surName" value={surName} onChange= {(e)=>{setSurName(e.target.value)}} />
                    </label> 
                    <label>
                    Email:
                    <input type="email" name="email" value={email} onChange= {(e)=>{setEmail(e.target.value)}} />
                    </label>
                    <label>
                    Phone Number:
                    <input type="number" name="phoneNumber" value={phoneNumber} onChange= {(e)=>{setPhoneNumber(e.target.value)}} />
                    </label>
                    <input type="submit" value="Submit" />
                    </form>

                
            </div>

        </div>
        
    </div>
    )
}

export default AddContact


