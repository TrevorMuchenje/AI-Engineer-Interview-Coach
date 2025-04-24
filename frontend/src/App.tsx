import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle, DefaultTheme } from 'styled-components';
import InterviewSection from './components/InterviewSection';

const theme: DefaultTheme = {
  colors: {
    background: '#121212',
    primary: '#1DB954',
    secondary: '#282828',
    text: '#FFFFFF',
    textSecondary: '#B3B3B3',
    error: '#FF4444'
  }
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppContainer>
        <Title>AI Engineer Interview Coach</Title>
        <InterviewSection />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
