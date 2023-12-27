# Pastr

Welcome to our Realtime Collaborative Text Editor! This web application allows users to create and collaborate on text in real time. Each user can go to any path, paste text, and see live updates as others contribute to the document. The application utilizes websockets for live communication and provides auto-save functionality on keystrokes.

## Usage

1. **Accessing the Editor:**
   - Visit our website at [pastr-backend.onrender.com](https://pastr-backend.onrender.com/).
   - Use any path you like, for example, [pastr-backend.onrender.com/example-path-here](https://pastr-backend.onrender.com/example-path-here).

2. **Creating/Editing Text:**
   - Once on the desired path, you can start typing or paste text into the editor.
   - Changes will be saved in real time and visible to all users with the same URL.

3. **Sharing:**
   - Share the URL with friends or colleagues to collaborate in real time.
   - The path in the URL is unique to your document, so make sure to share the complete URL for collaboration.

4. **Live Updates:**
   - Experience live updates as others type or edit the document simultaneously.
   - Websockets enable seamless communication for a real-time collaborative writing experience.

5. **Auto-save:**
   - Your document is auto-saved on every keystroke, ensuring that your work is continuously backed up.

## Features

- **Realtime Collaboration:** See changes from multiple users as they happen.
- **Websockets:** Utilizes websockets for efficient and instant communication.
- **Auto-Save:** Document is saved automatically on every keystroke.
- **Unique Paths:** Each path creates a unique document for collaboration.
- **Shareable URLs:** Share the URL to invite others to collaborate instantly.
- **Debouncing:** Reduces network requests and database transactions during typing.
- **Caching:** Prevents stale data for users visiting the same document during debounce.

## Technologies Used

- **Frontend:**
  - React, CSS
  - Websockets for real-time communication

- **Backend:**
  - NestJS backend microservice
  - MongoDB database
  - Socket.io for websocket management and live updates

## Setup and Deployment

1. Clone this repo
2. Run install script in base directory to install frontend and backend dependencies
3. Run dev script in base directory to watch frontend and backend
4. Tada!

## Contributing

If you would like to contribute to the development of this project, please follow our [Contribution Guidelines](CONTRIBUTING.md). (WIP)

## Issues and Bugs

If you encounter any issues or find bugs, please report them on our [Issue Tracker](https://github.com/ash-zzz/pastr/issues).

## License

This Realtime Collaborative Text Editor is licensed under the [MIT License](LICENSE.md).

Happy Collaborating! 🚀
