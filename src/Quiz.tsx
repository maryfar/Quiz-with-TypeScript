import { useState } from "react";
import { questions } from "./qustions";

export default function Quiz() {
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [currentQustion, setCurrentQustion] = useState(0);
  const [isFinal, setIsFinal] = useState<boolean>(false);

  function handleAnswer(option: string) {
    setSelectedOption(option);
    if (option == questions[currentQustion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQustion + 1 < questions.length) {
        setCurrentQustion(currentQustion + 1);
      } else {
        setIsFinal(true);
      }
    }, 1000);
  }
  return (
    <div className="flex items-center justify-center">
      {isFinal ? (
        <div>
          <h2>Quiz complated</h2>
          <p>
            Your score is: {score} from {questions.length}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 border border-gray-400 rounded-2xl p-4 shadow-xl">
          <h3>{questions[currentQustion].question}</h3>
          <ul className="flex flex-col items-center justify-center gap-2 w-64">
            {questions[currentQustion].options.map(
              (option: string, index: number) => (
                <li
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`
    ${
      selectedOption === option
        ? option === questions[currentQustion].answer
          ? "bg-green-300"
          : "bg-red-400"
        : "border border-mauve-500 bg-mauve-200 hover:bg-mauve-300"
    }
    rounded-lg p-2 w-full cursor-pointer
  `}
                >
                  {option}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
