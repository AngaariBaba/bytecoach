import React from 'react';
import BasicPie from './piechart';

const FeedBack = ({ text }) => {
  return (
    <>
    <div style={styles.container}>
       
      <h2>Feedback</h2>
      <div>
        <p>Feedback: {text.feedback}</p>
        <p>Runtime Errors: {text.RuntimeErrors}</p>
        <p>Logical Errors: {text.LogicalErrors}</p>
        <p>Syntax Errors: {text.SyntaxErrors}</p>
      </div>

      
    </div>
    <BasicPie content={text}/>
    </>
  );
};

const styles = {
  container: {
    fontFamily: 'monospace',
    backgroundColor: 'blue',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '1000px',
    margin: '0 auto'
  }
};

export default FeedBack;
