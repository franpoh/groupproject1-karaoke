import './styles/AboutUs.css'

function AboutUs() {
    return (
        <>
            <div className='about-container'>
                <h2 className='about-header'>About the Team!</h2>
                <h3 className='title'>
                        Hello there! We're from the SkillsUnion Cohort 2 Group 2.
                </h3>
                <div className='about-content'>

                    <p>
                            We have been taking the Software Developer Immersive course for 11 weeks and 
                            this web application is the fruit of what we've learned so far! 
                            <br/>
                            <br/>
                            We hope the text-to-speech "karaoke partner" have brought you as much laughter as it did for us!
                            Do check out our song recommendations too :)
                    </p>
                </div>
            </div>
        </>
    )
}

export default AboutUs;