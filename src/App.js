import React, { useState, Fragment } from "react";
import "./App.css";

import Dropdown from "./components/dropdown";
import FlipcardBack from "./components/flipcard-back";
import FlipcardFront from "./components/flipcard-front";

import jsonData from "./dropdown.json";

function App() {
  const [questionRange, setQuestionRange] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [data, setData] = useState([]);
  const [isCorrectWithIndex, setIsCorrectWithIndex] = useState({
    isCorrect: false,
    itemIndex: 0,
    itemQuestion: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!!questionRange && !!category && !!difficulty) {
      setIsLoading(true);
      fetch(
        `https://opentdb.com/api.php?amount=${questionRange}&category=${category}&difficulty=${difficulty}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results) {
            console.log(data.results);
            setData(data.results);
            setIsLoading(false);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleAnswer = (answer, question, answerIndex) => {
    if (answer === question.correct_answer) {
      setIsCorrectWithIndex({
        isCorrect: true,
        itemIndex: answerIndex,
        itemQuestion: question.question,
      });
      setTimeout(function () {
        setData(data.filter((x) => x.question !== question.question));
      }, 1000);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto bg-indigo-500 shadow-xl rounded">
        <div className="p-4 m-4 text-center">
          <h1 className="text-2xl font-bold text-gray-100">Ready for quiz ?</h1>
          <p className="text-gray-100">
            Pick number of questions, category and difficulty.
          </p>
        </div>
        <div className="flex justify-center">
          <Dropdown setData={setQuestionRange}>
            <option value="default" disabled hidden>
              Pick a number
            </option>
            {Object.keys(jsonData.NumberOfQuestion).map((keyName, i) => (
              <option key={i} value={keyName} className="cursor-pointer">
                {jsonData.NumberOfQuestion[keyName]}
              </option>
            ))}
          </Dropdown>
          <Dropdown setData={setCategory}>
            <option value="default" disabled>
              Pick a category
            </option>
            {Object.keys(jsonData.Category).map((keyName, i) => (
              <option key={i} value={keyName} className="cursor-pointer">
                {jsonData.Category[keyName]}
              </option>
            ))}
          </Dropdown>
          <Dropdown setData={setDifficulty}>
            <option value="default" disabled hidden>
              Pick a difficulty
            </option>
            {Object.keys(jsonData.Difficulty).map((keyName, i) => (
              <option key={i} value={keyName} className="cursor-pointer ">
                {jsonData.Difficulty[keyName]}
              </option>
            ))}
          </Dropdown>
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white hover:text-indigo-600 font-extrabold py-2 px-4 rounded m-4"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="container flex justify-center mx-auto flex-wrap mt-4 ">
        {isLoading ? (
          <div className="flex">
            <span className="spinner "></span>
          </div>
        ) : (
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="flip-card max-w-lg rounded overflow-hidden shadow-lg relative m-3"
              >
                <div className="flip-card-inner bg-yellow-500 ">
                  <FlipcardFront index={index} />
                  <FlipcardBack
                    item={item}
                    handleAnswer={handleAnswer}
                    isCorrectWithIndex={isCorrectWithIndex}
                  />
                </div>
              </div>
            );
          })
        )}
        {}
      </div>
    </Fragment>
  );
}

export default App;