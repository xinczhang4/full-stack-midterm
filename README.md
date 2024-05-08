# Note Keeper

A simple and intuitive application to keep track of your daily notes. Built with React, Node.js, Express, and MongoDB, Note Keeper helps you organize your thoughts and tasks with ease.

## Features

- Add, delete, and view notes.
- Full REST API backend with Express.
- Persistent data storage with MongoDB.
- Easy to use web interface.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed on your machine.
- MongoDB installed and running on your local system or accessible via an Atlas URI.

## Installation


```bash
git clone https://github.com/yourusername/note-keeper.git
cd note-keeper


brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start mongodb/brew/mongodb-community


cd backend
node addNote.js
cd frontend
npm start






