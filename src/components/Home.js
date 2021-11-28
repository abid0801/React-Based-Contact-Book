import React, {useState, useEffect, useRef} from 'react';
import { Form } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Dexie from "dexie";
import "./Home.css";
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import ReactToPrint from 'react-to-print';

const Home = () => {
    const [posts, setPosts] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    // modals states
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addPosts, setAddPosts] = useState("");
    const [searchValue, setSearchValue] = useState("");

    let componentRef = useRef();

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
  
    }, []);

   

    const search = (name) =>{

        const searchResult = posts.filter((contact) =>
        contact.firstName === name ? contact : null
      );
      
        if(searchResult.length!==0){
            return toast(`${searchResult[0].firstName} ${searchResult[0].phoneNumber}`,{
                autoClose: 5000
            })
        } else{
            return toast.warning('Not found')
        }

    //   return toast.warning(searchResult[0].phoneNumber)
    // console.log(searchResult.length)
        
        // console.log(searchResult[0].phoneNumber);

    }


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

    const customStyles = {
        content: {
         height: '500px',
         width: '600px',
         margin: 'auto'
        },
      };


    let postData;
  
  
    if(posts.length > 0) {
      
        postData = <div ref={(el) => (componentRef = el)} className="postsContainer">
                    {
                        posts.map(post => {
                         
                             return <div className="post" key={post.title}>
                                 
                                            <h4>{post.firstName} {post.surName}</h4>
                                            <p style={{'font-size':'18px','color':'grey'}}>{post.phoneNumber}</p>

                                    </div>       
                        })
                    }
                   </div>
    }else{
        postData = <div className="message">
                     <p>There are no contact information to show</p>
                   </div>
    }



    return (
        <div style={{'margin-bottom': '800px'}}>
            <div style={{'background-color': '#F3F5F6', 'padding': '15px', 'border-radius':'5px',}} className="row">
            <div>
                <div className='searchAndAdd'>
                    <input className='inputBox' type="text" name="Search" required value={searchValue} onChange= {(e)=>{setSearchValue(e.target.value)}} />
                    <button className='searchButton' onClick= {()=> search(searchValue)}> search </button>
                    <button  className='addButton' onClick={()=>setIsModalOpen(!isModalOpen)}> Add Contacts </button>
                </div>
                {postData}
            </div>
            </div>

            <Modal
            style={customStyles}
           isOpen={isModalOpen}>
            <div className="modalContainer">
                <div >
                    <div style={{'display': 'flex', 'justify-content':'flex-end'}}>
                        <button style={{'border':'0px', 'background-color': 'white'}} onClick={()=>setIsModalOpen(!isModalOpen)}>X</button>
                    </div>
                    <h1 className="display-6 text-center">
                Contact Info
                    </h1>
                     <div className='formContainer'>
                            <form onSubmit={handleSubmit} >
                                    <div className='fullForm'>
                                        <div className='formSingle'>
                                            <p>First Name</p> 
                                            <input type="text" name="firstName" required value={firstName} onChange= {(e)=>{setFirstName(e.target.value)}} />
                                        </div>
                                        <div className='formSingle'>
                                            Sur Name:
                                            <input type="text" name="surName" required value={surName} onChange= {(e)=>{setSurName(e.target.value)}} />
                                        </div>
                                        <div className='formSingle'>
                                            Email:
                                            <input type="email" name="email" required value={email} onChange= {(e)=>{setEmail(e.target.value)}} />
                                        </div>
                                        <div className='formSingle'>
                                            Phone Number:
                                            <input type="number" name="phoneNumber" required value={phoneNumber} onChange= {(e)=>{setPhoneNumber(e.target.value)}} />   
                                        </div>
                                        <div className='submitButtonDiv'><input className='submitButton' type="submit" value="Submit" /></div>
                                    </div>
                            </form>
                        </div>

                </div>
                
            </div >
        </Modal>

        <div style={{'display': 'flex', 'justify-content': 'flex-end', 'margin-right' : '190px', 'margin-top' : '40px'}}>
            <ReactToPrint
            trigger={() => <button style={{'background-color': '#4CCCE9', 'color':'white', 'border':'0px',}}>Export</button>}
            content={() => componentRef}
            />
        </div>
        </div>
    )
}

export default Home
