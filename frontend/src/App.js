import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CodeInput from './components/CodeArea';
import FeedBack from './components/Feedback';

function App() {
  const [feedback, setFeedback] = useState({
    feedback: '',
    RuntimeErrors: 0,
    LogicalErrors: 0,
    SyntaxErrors: 0,
  });

  function Setter(obj) {
    console.log("Object received in app.js ", obj);
    console.log("Object received in app.js RE ", obj.RuntimeErrors);
    console.log("Object received in app.js feedback ", obj.feedback);
    setFeedback({
      ...feedback,
      feedback:obj.feedback,
      RuntimeErrors: obj.RuntimeErrors,
      LogicalErrors: obj.LogicalErrors,
      SyntaxErrors: obj.SyntaxErrors,
    });
  }

  useEffect(() => {
    console.log("App.js has feedback as ", feedback);
  }, [feedback]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CodeInput setter={Setter}/>} />
          <Route path='/feed' element={<FeedBack text={feedback} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
