import "./styles/ContactUs.css"

function ContactUs() {
    return (
        <>
            <div className='contact-container'>
                <h2 className='contact-header'>Contact us here!</h2>
                <div className='contact-content'>
                    <form className='form'>
                        <input type='email' placeholder='Your Email Address'></input>
                        <br/>
                        <input type='textarea' placeholder ='Leave us a message'></input>
                        <br/>
                        <input type ='submit'></input>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ContactUs;