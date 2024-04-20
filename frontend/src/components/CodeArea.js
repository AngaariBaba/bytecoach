import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CodeInput = ({setter}) => {
  const [code, setCode] = useState('');
  const [advice, setAdvice] = useState('');
  const [mistakes, setMistakes] = useState([]);
  const [question, setQuestion] = useState('');
  const [index, setIndex] = useState(-1);
  const [buttonOn,setButton] = useState(true);
  const nav = useNavigate();
  
  const SERVER_URL = 'http://localhost:3001';

  const topics = [
    "Print Hello World",
    "Print Sum of two numbers",
    "Print multiplication of two numbers",
    "Print average of three numbers",
    "Print odd or even based on what number is",
    "Print negative or positive based on what number is",
    "Print count of digits in a number",
    "Print count of only odd digits in a number",
    "Print 'Impure number' if number contains even a single odd digit",
    "Print sum of digits of a number",
    "Print sum of even digits of a number",
    "Print multiple of odd digits of a number",
    "Print yes if sum of digits divides the original number else print No",
    "Print the reverse of a number",
    "Print yes if number is palindrome",
    "Print Yes if number is Armstrong",
    "Print numbers from 1 to 10",
    "Print numbers from 1 to N where numbers are even",
    "Print numbers from 1 to 100 where numbers are divisible by 3 and 5",
    "Print sum of numbers from 1 to 100",
    "Print factorial of a number",
    "Print factors of a given number",
    "Print sum of factors of a given number",
    "Print count of factors of a given number",
    "Print Yes if number is prime else No",
    "Print All the prime numbers from 1 to 100",
    "Print sum of digits of all numbers from 1 to 100",
    "Print yes if sum of all factors except number itself is equal to the number (ex: 6 , 1+2+3 = 6)",
    "Write a program to make an array of size 10",
    "Write a program to make an array of size 10 and print its Sum",
    "Write a program to print the array elements",
    "Write a program to print the array elements in reverse order",
    "Write a program to print only even elements of an array",
    "Print maximum element in the array",
    "Write a program to print only odd elements of an array",
    "Write a program to print sum of all even elements of an array",
    "Write a program to count number of negative elements of an array",
    "Print Yes if sum of array elements is even else print No",
    "Print count of negative numbers in an array",
    "Print factorial of all positive numbers in an array",
    "Reverse the array elements",
    "Print all the pairs which sum up to a target",
    "Print all the subarrays of a given array",
    "Print sum of all subarrays of a given array",
    "Print triplets with sum equal to 0",
    "Print maximum number of consecutive 1s in the array containing all zeros and ones."
  ];

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  async function getQuestions() {
    setIndex(index + 1);
    setButton(false);

    const resp = await axios.post(`${SERVER_URL}/getquestion`, { topic: topics[index + 1], mistakes });
    console.log(resp.data.question);
    setQuestion(resp.data.question);
    setButton(true);
  }

  async function handleFeedback()
  {
    const resp = await axios.post(`${SERVER_URL}/feedback`,{mistakes:mistakes});
    console.log(resp.data);
    setter(resp.data);
    nav('/feed');
  }

  async function handleSubmit() {
    setAdvice("loading...");
    try {
      const resp = await axios.post(`${SERVER_URL}/submit`, { ans: code, que: question });
      console.log(resp.data);
      setAdvice(resp.data.advice);
      setMistakes([...mistakes, resp.data.mistakes]);
    } catch (error) {
      console.error("Error submitting code:", error);
      setAdvice("Error submitting code. Please try again.");
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={{color:'yellow'}}>{question.split("M")[0]}<span style={{color:'red'}}>{"M"+question.split("M")[1]}</span></h2>
      <div style={styles.textareaContainer}>
        <textarea
          rows={10}
          cols={80}
          value={code}
          onChange={handleChange}
          placeholder="Enter your C code here..."
          style={styles.textarea}
        />
        <div style={styles.lineNumbers}>
          {code.split('\n').map((_, i) => <div key={i + 1}>{i + 1}</div>)}
        </div>
      </div>
      <button style={styles.button} onClick={handleFeedback}>Get personal Feedback</button>
      <button style={styles.button} onClick={handleSubmit}>Submit</button>
     { buttonOn?<button style={styles.button} onClick={getQuestions}>Get New Question</button> : <button disabled style={styles.buttonD}>Fetching new question</button>}
      {advice ? <h1>Advice Here: {advice}</h1> : <h1>Submit To Get Advice</h1>}
     
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'monospace',
    backgroundColor: '#282c34',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '1000px',
    margin: '0 auto'
  },
  textareaContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textarea: {
    fontFamily: 'monospace',
    fontSize: '16px',
    width: 'calc(100% - 40px)',
    marginBottom: '20px',
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    borderRadius: '4px'
  },
  lineNumbers: {
    fontFamily: 'monospace',
    fontSize: '16px',
    width: '40px',
    marginBottom: '20px',
    color: '#aaaaaa'
  },
  button: {
    backgroundColor: '#61dafb',
    color: '#282c34',
    border: 'none',
    padding: '10px 20px',
    marginRight: '10px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px'
  },
  buttonD : {
    backgroundColor: 'gray',
    color: '#282c34',
    border: 'none',
    padding: '10px 20px',
    marginRight: '10px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '16px'
  }
};

export default CodeInput;
