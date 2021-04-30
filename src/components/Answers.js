import React, { useState } from 'react';

export default function Answers() {
	const questions = [
		{
			questionImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ1.png?alt=media&token=74e8f145-9647-4bb8-938b-53b8540f5f27',
			answerOptions: [
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ1%20A.png?alt=media&token=7f190ba1-58f1-4c87-8965-2fe7c7ee63b5', isCorrect: false, no: "A" },
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ1%20B.png?alt=media&token=c5f1d335-1b69-4918-ba77-5f958f558632', isCorrect: false, no: "B" },
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ1%20C.png?alt=media&token=d7626379-788f-4070-b81c-259951dc40ee', isCorrect: true , no: "C" },
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ1%20D.png?alt=media&token=1095b23f-da22-4fa4-9022-6b24a6619d1b', isCorrect: false, no: "D" },
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ1%20E.png?alt=media&token=48ebd5db-77ae-421b-b6eb-a6d5e7326c5d', isCorrect: false, no: "E" },
			],
		},
		{
			questionImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ2.png?alt=media&token=b5579403-76a8-4f84-b813-041329687957',
			answerOptions: [
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ2%20A.png?alt=media&token=bb4e9c23-5acf-416c-949f-b5a4d2e84f26', isCorrect: false, no: "A" },
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ2%20B.png?alt=media&token=4d759409-55d5-4d2a-8636-b01b314b7645', isCorrect: false, no: "B" },
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ2%20C.png?alt=media&token=4076f99e-10a2-470a-94d4-98f8246ac351', isCorrect: true , no: "C" },
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ2%20D.png?alt=media&token=ed693aa5-4530-4c24-8cbb-9d9a5ae883d0', isCorrect: false, no: "D" },
				{ answerImg: 'https://firebasestorage.googleapis.com/v0/b/thechoicedryehia.appspot.com/o/prototypetest%2Fmath%2FQ2%20E.png?alt=media&token=96a7408c-e663-447e-b786-01e9b720913c', isCorrect: false, no: "E" },
			],
		},
	];   

	const [currentQuestion, setCurrentQuestion] = useState(1)

	return(
<div className="testPage">
<div>
<div className="question-section">
<img src={questions[currentQuestion].questionImg} alt="question" className="question-img"/>
</div>
<div className="answers-section">


{questions[currentQuestion].answerOptions.map((answerOption)=> (
<div className="answer">
<input type="radio" id={`ans${answerOption.no}`} name="answer"/>
<label for="ans"> <img src={answerOption.answerImg} alt="answer" className="answer-img"/></label>
</div>
))}

</div>
</div>
        </div>
    )
}

