# AI Engineer Interview Coach

An interactive application that helps engineers prepare for technical interviews using AI-powered question generation and response evaluation.

## Features

- Generate technical interview questions across various AI/ML topics
- Multiple difficulty levels (beginner, intermediate, advanced)
- Real-time response evaluation
- Detailed feedback and recommendations
- Modern dark theme UI

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a .env file in the backend directory with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

5. Start the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Usage

1. Select a topic and difficulty level
2. Click "Generate Question" to get a new interview question
3. Type your response in the text area
4. Click "Submit Response" to get AI-powered feedback
5. Review the feedback and recommendations

## Technologies Used

- Frontend: React, TypeScript, Styled Components
- Backend: FastAPI, LangChain
- AI: OpenAI GPT
