import dotenv from 'dotenv'
dotenv.config()

import readline from 'readline/promises'
import { GoogleGenAI } from "@google/genai";
import chalk from 'chalk';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chatHistory = [];
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

async function chatLoop() {
    const question = await rl.question(chalk.blueBright('You: '))

    chatHistory.push({
        role: 'user',
        parts: [{
            text: question,
            type: 'text'
        }]
    })

    const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: chatHistory
    })

    const responseText = response.candidates[0].content.parts[0].text;

    chatHistory.push({
        role: 'model',
        parts: [{
            text: responseText,
            type: 'text'
        }]
    })

    console.log(chalk.greenBright('AI: ') + responseText);


    chatLoop()
}

console.clear();
console.log(chalk.bold.hex('#D4A373')('🤖 Welcome to TweetPilot CLI! Type your message below:\n'));
chatLoop()