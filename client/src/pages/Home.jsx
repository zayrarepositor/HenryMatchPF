import { useState } from "react";
import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const authToken = false;
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleClick = () => {
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div>
      <Nav
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}></Nav>
      <div className="home-div">
        <h1>Henry Match</h1>
        <button className="home-button" onClick={handleClick}>
          {authToken ? "log in" : "create account"}
        </button>
        <p>esto seria todo: una barra, el logo y el boton de registro/login</p>
        {showModal && (
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        )}
      </div>
    </div>
  );
};

export default Home;
