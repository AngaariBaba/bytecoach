const OpenAI = require('openai');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bp = require('body-parser');

app.use(cors()); // Enable CORS
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



app.post('/submit', async (req, res) => {
    console.log("entered");
    console.log(req.body);
    const que = req.body.que.split("M")[0];
    const ans = req.body.ans;
    
    const mist = req.body.mistakes;
    if(mist!== undefined)
    {
    console.log("mistakes are this ",mist);
    }


    try {
        const resp = await evaluate(que, ans, mist);
        res.json(resp);
    } catch (error) {
        console.error("Error in evaluate function:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/getquestion',async (req,res)=>{
    
    const topic = req.body.topic;
    let  mistakes = req.body.mistakes;

    if(mistakes!==undefined)
    {
    const makeword = await makeSingle(mistakes);    
     mistakes = makeword;
    }

    console.log("Mistakes are -> ",mistakes);
    const completion = await client.chat.completions.create({
        messages: [{
            role: "system",
            content: `You are my friend mentor, Give me this C Programming Question that i just gave '${topic}' , reply in this format only ,example :- {"question":"Print sum of two numbers, Make sure to Use semicolons cause you often do this mistake of...."} ,remember to include the mistake i often do into the question that is ${mistakes}`
        }],
        model: "gpt-3.5-turbo",
    });

    const question = await  JSON.parse(completion.choices[0].message.content);
    console.log(question);
    res.json(question);
    
})

async function evaluate(question, answer, mistake) {
    let prompt = `You are my mentor friend find out mistakes if any and generate an advice for me, this is the question that was asked "${question}" and this was the answer "${answer}" , generate response in EXACT THIS FORMAT , {"mistakes":["mistake1","mistake2"],"advice":"advice here"}`
    if (mistake!==undefined)
    {
       prompt =  `You are my mentor friend find out mistakes if any and generate an advice for me, this is the question that was asked "${question}" and this was the answer "${answer}" , generate response in EXACT THIS FORMAT , {"mistakes":["mistake1","mistake2"],"advice":"advice here"} , also give me common mistakes including these older mistakes i did included -> ${mistake}`
    }
    const completion = await client.chat.completions.create({
        messages: [{
            role: "system",
            content: prompt
        }],
        model: "gpt-3.5-turbo",
    });

    const responseData = completion.choices[0].message.content;
    console.log(responseData);
   

    return JSON.parse(responseData);
}

app.post('/feedback',async (req,res)=> {
    
    const mistakes = req.body.mistakes;
    console.log(mistakes);
    const completion = await client.chat.completions.create({
        messages: [{
            role: "system",
            content: `You are my friendly coding instructor that talks like "BRO WASSUP YO HOW YOU DOING" in such a tone,Please generate a report on various places where i can improve and where i am doing good and mistakes i do which i am giving you right now -> "${mistakes}", Make sure to give a perfect structured response in format of a JSON like this example :- {"feedback":"you often do this and that so i advice you to work on this part and that part these are your mistakes 1)mistake 1 2)mistake 2 so on, all the very best for future Keep it Up!","RuntimeErrors":1(as many as found in mistakes i gave you),"LogicalErrors":2(as many as found in the mistakes i gave you),"SyntaxErrors":0(as many as found in the mistakes i gave you)}`
        }],
        model: "gpt-3.5-turbo",
    });

    const responseData = JSON.parse(completion.choices[0].message.content);
    console.log(responseData);
   

    res.json(responseData);
})


async function makeSingle(mistakes)
{
    const completion = await client.chat.completions.create({
        messages: [{
            role: "system",
            content: `I have an array containing mistakes i do while programming,here it is -> ${mistakes},Can you make that Into a single sentence of first form using i words like 'i often forget to write printf and write print' `
        }],
        model: "gpt-3.5-turbo",
    });

    const responseData = completion.choices[0].message.content;
    console.log(responseData);
    return responseData;
}


app.post('/getroadmap', async (req,res)=>{
 const {exp,goal,age,days,course} = req.body;

 const completion = await client.chat.completions.create({
    messages: [{
        role: "system",
        content: `Give me a daywise roadmap detailed for ${course} for each day, that will last for ${days} days , my goal is to become a ${goal} and my age is ${age},Give response in this JSON format ,  example for 3 days roadmap will be like this  {"roadmap":['day 1 content','day 2 content','day 3 content']} `
    }],
    model: "gpt-3.5-turbo",
});

const responseData = completion.choices[0].message.content;
console.log(responseData);
return responseData;

   res.json({message:"Yeah done"});
})

app.listen(3001, () => {
    console.log("Server started");
});
