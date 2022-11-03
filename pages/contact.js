import React, { useState } from 'react'
import styles from "../styles/Contact.module.css"
const contact = () => {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [desc,setDesc] = useState('');

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(name,phone,email,desc)
    const data = { name,email,phone,desc};

fetch('http://localhost:3000/api/postContact', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((response) => response.text())
  .then((data) => {
    console.log('Success:', data);
    alert("Response submitted")
    setDesc("")
    setEmail("")
    setName("")
    setPhone("")
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }
  const handleChange=(e)=>{
    const {name,value} = e.target;
    if(name=='name'){
      setName(value)
    }
    else if(name=='email'){
      setEmail(value)
    }
    else if(name=='phone'){
      setPhone(value)
    }
    else if(name=='desc'){
      setDesc(value )
    }
  }
  
  return (
    <div className={styles.container}>
      <h1>
        Contact us
      </h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formBox}>

        <div className={styles.mb_3}>
          <label htmlFor="name" className={styles.formlabel}>Name</label>
          <input type="text" value={name} onChange={handleChange}  className={styles.formControl} id="name" aria-describedby="NameHelp" name='name' />
         
        </div>



        <div className={styles.mb_3}>
          <label htmlFor="exampleInputEmail1" className={styles.formlabel}>Email address</label>
          <input type="email" value={email} onChange={handleChange} className={styles.formControl} id="exampleInputEmail1" aria-describedby="emailHelp" name='email' />
          <div id="emailHelp" className={styles.formtext}>We'll never share your email with anyone else.</div>
        </div>


        <div className={styles.mb_3}>
          <label htmlFor="phone" className={styles.formlabel}>Phone address</label>
          <input type="phone" value={phone} onChange={handleChange} className={styles.formControl} id="phone" aria-describedby="emailHelp" name='phone' />
          
        </div>
        <div className={styles.mb_3}>
          <label htmlFor="desc" className={styles.formlabel}>Elaborate your Concern</label>
          <textarea type="text" value={desc}  onChange={handleChange} className={styles.formControl} placeholder='write your concern here' id='desc' name='desc' />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default contact