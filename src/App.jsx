import React, { useState, useRef, useEffect } from "react";
import "./App.scss";
import emailjs from "emailjs-com";
import ButtonSubmit from "./components/ButtonSubmit";

function App() {
  const [theme, setTheme] = useState("light");
  const [bgColor, setbgColor] = useState("bgLight");
  const [icons, seticons] = useState("light.png");
  const [cardIcons, setCardIcons] = useState("lIcon");
  const [bgColorMode, setbgColorMode] = useState("bgDarkL");
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [emailSent, setEmailSent] = useState(false);
  const portfolioRef = useRef(null);
  const aboutMeRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const [isEmailSending, setIsEmailSending] = useState(false);

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToRef2 = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    setbgColor(bgColor === "bgLight" ? "bgDark" : "bgLight");
    seticons(icons === "light.png" ? "night.png" : "light.png");
    setCardIcons(cardIcons === "lIcon" ? "dIcon" : "lIcon");
    setbgColorMode(bgColorMode === "bgDarkL" ? "bgLightD" : "bgDarkL");
  };

  const handleDownload = () => {
    const url = "../documents/CV.pdf";
    const filename = "Curriculum Vitae.pdf";
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; //ChatGPT helped me with this function!!

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se tutti i campi sono completati
    const { name, email, phone, message, companyName } = formData;
    if (!name || !email || !phone || !message) {
      return;
    }
    setIsEmailSending(true);

    try {
      emailjs.init('-Bgr32nzRGGpWZ1_T');

      // Invio dell'email utilizzando emailjs
      await emailjs.send('service_m174eim', 'template_9aqtq0l', {
        from_name: name,
        from_email: email,
        from_company: companyName,
        phone: phone,
        message: message,
        to_email: 'alexanderiozzino1@gmail.com', // Indirizzo email di destinazione
      });

      setEmailSent(true);
      setFormData({
        name: "",
        companyName: "",
        email: "",
        phone: "",
        message: "",
      }); // Resettiamo il form
    } catch (error) {
      console.error("Error sending email:", error);
      // Gestisci l'errore qui, ad esempio visualizzando un messaggio di errore all'utente
    } finally {
      setIsEmailSending(false);
    }
  };


  useEffect(() => {
    if (emailSent) {
      const resetEmailSent = setTimeout(() => {
        setEmailSent(false);
      }, 5000); // Tempo in millisecondi prima di ripristinare emailSent a false (5 secondi in questo caso)
      return () => clearTimeout(resetEmailSent); // Pulizia dell'effetto
    }
  }, [emailSent]);

  return (
    <div className={`app ${theme}`}>
      <aside className="card">
        <div className={`profile ${bgColor}`}>
          <div className="dflex">
            <img src="../images/logoDef.jpg" alt="logo" className="cardLogo" />
            <h2>Hongwei Weng</h2>
          </div>
          <img
            src="../images/Avatar2.png"
            alt="Profilo"
            className="profilepic"
          />
          <div className="description">
            <p>Description</p>
            <h3>Full-Stack & Front-end developer</h3>
          </div>
          <div className="description">
            <p>Position</p>
            <h3>Naples, Italy</h3>
          </div>
          <div className="social-icons">
            <img
              className={`${cardIcons}`}
              src="../images/instaLogo.png"
              alt="Facebook"
            />
            <img
              className={`${cardIcons}`}
              src="../images/instaLogo.png"
              alt="Facebook"
            />
            <img
              className={`${cardIcons}`}
              src="../images/instaLogo.png"
              alt="Facebook"
            />
            <img
              className={`${cardIcons}`}
              src="../images/instaLogo.png"
              alt="Facebook"
            />
          </div>
          <button className="button type3">Contact me</button>
        </div>
      </aside>
      <main className="main-container">
        <nav className="navbar ">
          <ul>
            <li
              onClick={() => scrollToRef2(homeRef)}
              className={`navMenu ${theme}`}
            >
              Home
            </li>
            <li
              onClick={() => scrollToRef(aboutMeRef)}
              className={`navMenu ${theme}`}
            >
              About Me
            </li>
            <li
              onClick={() => scrollToRef(resumeRef)}
              className={`navMenu ${theme}`}
            >
              Resume
            </li>
            <li
              onClick={() => scrollToRef(portfolioRef)}
              className={`navMenu ${theme}`}
            >
              Portfolio
            </li>
            <li
              onClick={() => scrollToRef(contactRef)}
              className={`navMenu ${theme}`}
            >
              Contact
            </li>
          </ul>
          <div className="dflex navIcon">
            <img
              src={`../images/${icons}`}
              alt="light/dark mode"
              onClick={toggleTheme}
              className={`mode ${bgColorMode}`}
            />
            <button>
              <a href="mailto:alexanderiozzino1@gmail.com" className="navTalk">
                Let's talk!<p>💬</p>
              </a>
            </button>
          </div>
        </nav>

        <div className="content">
          <section id="home" ref={homeRef}>
            <div className="homeContent">
              <p className="homeButton">⭐Let's talk!</p>
              <h2>I'm Hongwei Weng</h2>
              <h2>Frontend developer and videogame passionate</h2>
              <div className="homeButtons">
                <button
                  className="downloadButton"
                  onClick={() => scrollToRef(portfolioRef)}
                >
                  My projects{" "}
                  <img
                    src="../images/textIcon.svg"
                    alt="text Icon"
                    className="homeIcon"
                  />
                </button>
                <button
                  className="downloadButton clear"
                  onClick={handleDownload}
                >
                  Download CV{" "}
                  <img
                    src="../images/download.svg"
                    alt="download"
                    className="homeIcon"
                  />{" "}
                </button>
              </div>
            </div>
          </section>
          <section ref={aboutMeRef} id="about-me">
            <p className="homeButton">⭐About me</p>
            <h2 className="sectionTitle">
              With curiosity and inspiration, i attempt to turn my ideas into
              reality through web development
            </h2>
            <div className="contentAboutme">
              <div className="dfColumn aboutme1">
                <p>
                  I am a full-stack and front-end developer with an overwhelming
                  passion for programming and video games. Ever since I laid
                  hands on my first lines of code, I have felt a deep connection
                  with the world of computer science and technology. The idea of
                  creating something new, whether it's a dynamic web application
                  or an interactive adventure in a video game, fascinates and
                  motivates me every day.{" "}
                </p>
                <p>
                  My professional journey has been guided by a constant thirst
                  for learning and growth. I am excited by the opportunity to
                  immerse myself in new technologies, programming languages, and
                  frameworks, always seeking ways to improve my skills and
                  expand my knowledge.
                </p>
                <p>
                  In addition to my passion for programming, I have a genuine
                  devotion to video games. I find inspiration in the creativity
                  and innovation that characterize the world of digital gaming.
                </p>
                <p>
                  I am convinced that the secret to success lies in
                  perseverance, curiosity, and adaptability. I am always open to
                  new learning opportunities and am determined to grow both
                  professionally and personally. With a keen eye on the
                  challenges of the present and a vision for the future, I am
                  ready to tackle any new challenge that comes my way.
                </p>
              </div>
              <div className="dfColumn aboutme2">
                <div>
                  <h5>Name</h5>
                  <h3>Hongwei Weng</h3>
                </div>
                <div>
                  <h5>Phone</h5>
                  <h3>
                    <a href="tel:+393249854894" className={`${theme}`}>
                      +39 324-985-4894
                    </a>
                  </h3>
                </div>
                <div>
                  <h5>E-mail</h5>
                  <h3>
                    <a
                      href="mailto:alexanderiozzino1@gmail.com"
                      className={`${theme}`}
                    >
                      alexanderiozzino1@gmail.com
                    </a>
                  </h3>
                </div>
                <div>
                  <h5>Location</h5>
                  <h3>San Giuseppe Vesuviano, Naples, Italy</h3>
                </div>
              </div>
            </div>
          </section>{" "}
          <section ref={resumeRef} id="resume">
            <p className="homeButton">⭐Resume</p>
            <h2 className="sectionTitle">Education and experience</h2>
            <div className="containerResume">
              <h3>My education</h3>
              <div className="contentResume">
                <p>2023 - 2024</p>
                <div className="midContResume">
                  <h4>Full-Stack Developer course</h4>
                  <p>
                    Course by{" "}
                    <a href="" className={`${theme}`}>
                      Develhope
                    </a>
                  </p>
                </div>
                <p>
                  Completed an intensive 6-month remote Full-Stack Developer
                  course with Develhope, focusing on front-end programming
                  fundamentals. Acquired proficiency in HTML, CSS, and
                  JavaScript, along with frameworks like React. Developed skills
                  in building dynamic and responsive web applications.
                </p>
              </div>
              <div className="contentResume">
                <p>2015 - 2020</p>
                <div className="midContResume">
                  <h4>Scientific High School Diploma</h4>
                  <p>
                    Course by{" "}
                    <a href="" className={`${theme}`}>
                      I.S Striano - Terzigno
                    </a>
                  </p>
                </div>
                <p>
                  Completed a Scientific High School Diploma program at I.S.
                  Striano-Terzigno. Throughout this journey, I improved my
                  problem-solving skills and refined my research abilities,
                  following a comprehensive curriculum focused on scientific
                  principles and analytical thinking.
                </p>
              </div>
            </div>
          </section>{" "}
          <section ref={portfolioRef} id="portfolio">
            <p className="homeButton">⭐Portfolio</p>
            <h2 className="sectionTitle">Check out my projects</h2>
            <div id="portfolioGridBase">
              <a href="#">
                <img src="" alt="first project" />
              </a>
              <a href="#">
                <img src="" alt="first project" />
              </a>
              <a href="#">
                <img src="" alt="first project" />
              </a>
              <a href="#">
                <img src="" alt="first project" />
              </a>
            </div>
          </section>
          <section ref={contactRef} id="contact">
            <p className="homeButton">⭐Contact</p>
            <form onSubmit={handleSubmit} className="form">
              <div className="formNames">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name*"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="formInfos">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address*"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number*"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                name="message"
                placeholder="Message*"
                required
                value={formData.message}
                onChange={handleChange}
              />
              <ButtonSubmit
                isActive={!isEmailSending && emailSent}
                handleClick={handleSubmit}
              />
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
