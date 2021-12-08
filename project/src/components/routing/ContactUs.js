import "./styles/ContactUs.css"

function ContactUs() {
    return (
        <>
<<<<<<< Updated upstream
            <h3>Contact us here!</h3>
            <form>
                <input type='email' placeholder='Your Email Address'></input>
                <br/>
                <input type='textarea' placeholder ='Leave us a message'></input>
                <input type ='submit'></input>
            </form>
=======
            <div className='contact-container'>
                <h2 className='contact-header'>Contact us here!</h2>
                <div className='contact-content'>
                    <form>
                        <input type='email' placeholder='Your Email Address'></input>
                        <br/>
                        <input type='textarea' placeholder ='Leave us a message'></input>
                        <br/>
                        <input type ='submit'></input>
                    </form>
                </div>
            </div>
>>>>>>> Stashed changes
        </>
    )
}

export default ContactUs;