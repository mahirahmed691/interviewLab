import React, { useState } from "react";
import questionsData from "./questions.json";
import softwareOptions from "./softwareOptions.js";
import "./App.css";

function App() {
  const [selectedSoftware, setSelectedSoftware] = useState([]);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedSoftware([...selectedSoftware, name]);
    } else {
      setSelectedSoftware(selectedSoftware.filter((item) => item !== name));
    }
  };

  const generateQuestions = () => {
    let questions = [];
    selectedSoftware.forEach((software) => {
      questions = questions.concat(questionsData[software]);
    });
    setGeneratedQuestions(questions);
  };

  const categories = Array.from(
    new Set(softwareOptions.map((option) => option.category))
  );
  const softwareByCategory = categories.map((category) => ({
    category,
    software: softwareOptions.filter((option) => option.category === category),
  }));

  const resetSelections = () => {
    setSelectedSoftware([]);
    setGeneratedQuestions([]);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="App">
  <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img
        src="./logo.png"
        height={30}
        alt="InterviewLab Logo"
        className="d-inline-block align-top"
      />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      onClick={toggleMenu}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div
      className={`collapse navbar-collapse ${
        menuOpen ? "show" : ""
      } justify-content-end`}
    >
      <ul className="navbar-nav">
        {!generatedQuestions.length > 0 && (
          <li className="nav-item">
            <button className="btn btn-light" onClick={generateQuestions}>
              Generate Questions
            </button>
          </li>
        )}
        {generatedQuestions.length > 0 && (
          <li className="nav-item">
            <button className="btn btn-danger" onClick={resetSelections}>
              Reset Selections
            </button>
          </li>
        )}
      </ul>
    </div>
  </div>
</nav>


      <main>
        <section id="software-selection">
          {!generatedQuestions.length > 0 && (
            <h2 className="title">Select The Tech Stack</h2>
          )}

          {generatedQuestions.length === 0 && (
            <>
              {softwareByCategory.map((category, index) => (
                <div key={index}>
                  <h3 className="category">{category.category}</h3>
                  <div className="checkbox-container">
                    {category.software.map((option, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          name={option.name}
                          onChange={handleCheckboxChange}
                          className="visually-hidden"
                        />
                        <img src={option.imgSrc} width={100} alt={option.alt} />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </section>

        {generatedQuestions.length > 0 && (
          <section id="questions-list">
            {selectedSoftware.map((software, index) => (
              <div key={index}>
                <h3 className="questionCategory">{software}</h3>
                <ul>
                  {questionsData[software].map((question, idx) => (
                    <li key={idx}>{question}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
