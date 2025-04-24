from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI
llm = OpenAI(temperature=0.7)

# Define prompt templates
question_template = """You are an AI Engineering interviewer. Generate a technical interview question about {topic}. 
The question should be challenging but appropriate for a {difficulty} level candidate.
Focus on practical applications and problem-solving skills."""

feedback_template = """You are an AI Engineering interview coach. Evaluate the following response to the question:
Question: {question}
Candidate's Response: {response}

Provide feedback in the following format:
1. Technical Accuracy (1-10):
2. Clarity of Communication (1-10):
3. Strengths:
4. Areas for Improvement:
5. Recommendations for Study:"""

class QuestionRequest(BaseModel):
    topic: str
    difficulty: str = "intermediate"

class ResponseEvaluation(BaseModel):
    question: str
    response: str

@app.post("/generate-question")
async def generate_question(request: QuestionRequest):
    try:
        prompt = PromptTemplate(
            input_variables=["topic", "difficulty"],
            template=question_template
        )
        chain = LLMChain(llm=llm, prompt=prompt)
        question = chain.run(topic=request.topic, difficulty=request.difficulty)
        return {"question": question.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/evaluate-response")
async def evaluate_response(evaluation: ResponseEvaluation):
    try:
        prompt = PromptTemplate(
            input_variables=["question", "response"],
            template=feedback_template
        )
        chain = LLMChain(llm=llm, prompt=prompt)
        feedback = chain.run(question=evaluation.question, response=evaluation.response)
        return {"feedback": feedback.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
