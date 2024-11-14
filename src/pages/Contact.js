import React from 'react'
import "./Contact.css";

const Contact = () => {
  return (
    <div class="contactus-form-container">
    <div class="container">

        <h1 class="contactus-heading">Contact me</h1>
        <h3 class="contactus-sub-heading">Questions , thoughts , or just want to say hello?</h3>

        <div class="contactus-form-container">
         <form  class ="form" action="">

             <div class="formfield-container">

                 <input class="formfield" type="text" name="name" id="" placeholder="Enter your name " />
                 <input class="formfield" type="email" name="email" id="" placeholder="Enter your email Address " />
                 <input class="formfield" type="text" name="subject" id="" placeholder="Enter your Subject " />
                 <textarea class="formfield formfield-textarea" name="message" id="" cols="30" rows="10" placeholder="Enter your message "></textarea>

             </div>
             
             <div>
                  <button type="submit" class="btn-pink" id="submit-btn"> Send Message</button>
             </div>
         </form>
        </div>

    </div>
</div>

  )
}

export default Contact