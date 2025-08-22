# 📚 Book Summarizer Web

Welcome to **Book Summarizer Web**! This application allows you to extract and summarize text from PDFs, providing summaries in **both text and MP3 formats**, which you can download and use at your convenience.

## 🚀 Project Evolution

Originally, this project was planned as a SaaS platform to offer book summarization services to a wide audience. Later, I decided to keep it as a personal project on GitHub, allowing for more flexibility, open-source contribution, and experimentation.

## 🧠 How It Works

The application works in four main steps:

1. **Upload a PDF** – Users can upload any PDF file containing the text they want summarized.
2. **Extract Text** – The backend extracts the text from the uploaded PDF.
3. **Summarize Content** – The extracted text is sent to OpenAI’s API to generate a concise summary.
4. **Output Options** – The summary is available in:

   * **Text format**: View and copy the summary.
   * **MP3 format**: Listen to the summary and download it.

## 🔧 Technologies Used

* **Frontend**: Next.js, React, Tailwind CSS
* **Backend**: Next.js API Routes
* **Text Extraction**: `pdf-parse`
* **AI Summarization**: OpenAI API
* **Text-to-Speech**: Browser or server-side TTS (depending on implementation)

## 🛠️ Getting Started Locally

To try this project on your machine:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/fira44/book-summarize-web.git
   cd book-summarize-web
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your OpenAI API key:

   ```env
   NEXT_PUBLIC_OPEN_AI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   Replace the key with your actual OpenAI API key.

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📄 Usage Instructions

1. Go to the application in your browser.
2. Upload a PDF file using the provided interface.
3. Wait for the backend to extract and summarize the text.
4. You can:

   * **View and copy the text summary**.
   * **Download the summary as an MP3** to listen offline.

## 🧪 Contributing

Contributions are welcome! If you have ideas for improvements or new features, fork the repository, make changes, and submit a pull request.

## 📄 License

This project is open-source under the [MIT License](LICENSE).
