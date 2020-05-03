import React from "react";
import { replaceSpecialChars } from "../../utils";
import { shuffle } from "lodash";

const FlipcardBack = ({ item, handleAnswer, isCorrectWithIndex }) => {
  return (
    <div>
      <div className="flex flip-card-back text-gray-100 text-base bg-indigo-500">
        <div className="m-auto justify-start">
          <ul>
            <li className="p-1">
              <p>{replaceSpecialChars(item.question)}</p>
            </li>
            {shuffle([...item.incorrect_answers, item.correct_answer])
              .sort() //Sort to disable re-shuffle
              .map((answer, answerIndex) => (
                <li
                  className={`cursor-pointer hover:text-gray-400 ${
                    isCorrectWithIndex.itemIndex === answerIndex &&
                    isCorrectWithIndex.itemQuestion === item.question &&
                    "text-yellow-400 hover:text-yellow-500"
                  }`}
                  key={answerIndex}
                  onClick={(e) => handleAnswer(answer, item, answerIndex)}
                >
                  {isCorrectWithIndex.itemIndex === answerIndex &&
                    isCorrectWithIndex.itemQuestion === item.question && (
                      <span className="text-xl text-yellow-400 hover:text-yellow-500">
                        &#10003;
                      </span>
                    )}
                  {replaceSpecialChars(answer)}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlipcardBack;
