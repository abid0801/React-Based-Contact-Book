import React, {useState, useEffect} from 'react';
import { Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Dexie from "dexie";
import "./Home.css";
import Modal from 'react-modal';
import { toast } from 'react-toastify';




const Home = () => {
    const [posts, setPosts] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    // modals states
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addPosts, setAddPosts] = useState("");

    const db = new Dexie("ReactDexie");
    //create the database store
    db.version(1).stores({
        posts: "firstName, surName, email, phoneNumber"
    })
    db.open().catch((err) => {
        console.log(err.stack || err)
    })

    useEffect(() => {


        //get all posts from the database
        const getPosts = async() => {
            let allPosts = await db.posts.toArray();
            setPosts(allPosts);
        }
        getPosts();
  
    }, [])

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

    let postData;
  
  
    if(posts.length > 0) {
      
        postData = <div className="postsContainer">
                    {
                        posts.map(post => {
                         
                             return <div className="post" key={post.title}>
                                 
                                            <h2>{post.firstName} {post.surName}</h2>
                                            <h2>{post.phoneNumber}</h2>
                                            
                                            
                                         
                                            
                                        </div>       
                        })
                    }
                   </div>
    }else{
        postData = <div className="message">
                     <p>There are no posts to show</p>
                   </div>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 ">
                    <h3 className="btn btn-outline-dark" onClick={()=>setIsModalOpen(!isModalOpen)}>
                            Add Contact
                    </h3>
                </div>
                <div className="col-md-6 mx-auto p-5">
                    
                    <h1>
                        Welcome to Contact Book homepage
                    </h1>
                    {postData}
                </div>

            </div>
            <Modal 
           isOpen={isModalOpen}
           contentLabel="Minimal Modal Example"
        >
         <div className="container">
        <div className="row">
            <h1 className="display-3 text-center">
                Add Contacts
            </h1>
            <div className="col-md-6 shadow mx-auto p-5">
            <form onSubmit={handleSubmit} >
                <label>
                   First Name:
                    <input type="text" name="firstName" required value={firstName} onChange= {(e)=>{setFirstName(e.target.value)}} />
                    </label>
                    <label>
                   Sur Name:
                    <input type="text" name="surName" required value={surName} onChange= {(e)=>{setSurName(e.target.value)}} />
                    </label> 
                    <label>
                    Email:
                    <input type="email" name="email" required value={email} onChange= {(e)=>{setEmail(e.target.value)}} />
                    </label>
                    <label>
                    Phone Number:
                    <input type="number" name="phoneNumber" required value={phoneNumber} onChange= {(e)=>{setPhoneNumber(e.target.value)}} />
                    </label>
                    <input type="submit" value="Submit" />
                    </form>

                
            </div>

        </div>
        <button onClick={()=>setIsModalOpen(!isModalOpen)}>Close Modal</button>
    </div >
          
        </Modal>
            
        </div>
    )
}

export default Home
