import Layout from "./components/Layout";
import "./App.css";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const fetchImage = async (prompt: string) => {
    const response = await fetch("http://localhost:3000/api/genimg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: prompt }),
    });

    if (response.ok) {
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        return data[0];
      }

      throw new Error("Unexpected server response");
    } else {
      throw new Error(response.statusText);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = await fetchImage(inputValue);
      setImageURL(url);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <section className="container flex flex-col gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
          <div className="bg-white shadow-md rounded border border-slate-200 p-14 text-center">
            <div className="mx-auto flex w-full flex-col md:max-w-[58rem]">
              <h1 className="font-heading text-2xl mb-4 sm:text-4xl text-center">
                  PromptPix AI
              </h1>
              <p className="text-sm sm:text-base text-center mb-4">
                  Dive into the world of AI-driven creativity with PromptPix AI,
                  where your words become vivid visuals. Simply input your idea,
                  and watch as our advanced algorithms craft the image you
                  envisioned.
              </p>
</div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-4">
                <label className="text-sm sm:text-base" htmlFor="prompt">Image prompt</label>
                <textarea
                  className="border border-slate-200 rounded p-2 w-3/4 h-32 resize-none"
                  id="prompt"
                  placeholder="Enter your prompt"
                  value={inputValue}
                  onChange={onInputChange}
                />
              </div>
              <button
                className= {`${
                  inputValue.length === 0
                  ? "bg-white text-gray-800 font-semibold py-2 px-4 border border-slate-400 rounded shadow opacity-50 hover:opacity-50 cursor-not-allowed"
                  : "bg-white hover:bg-slate-100 text-gray-800 font-semibold py-2 px-4 border border-slate-400 rounded shadow"
                  }`}
                type="submit" 
                disabled={inputValue.length === 0}>
                Generate
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-6 mt-12">
            {loading && (
              <div>
                <p>Your image is being generated...</p>
                <div>
                  <div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M12 6l0 -3"></path>
                        <path d="M16.25 7.75l2.15 -2.15"></path>
                        <path d="M18 12l3 0"></path>
                        <path d="M16.25 16.25l2.15 2.15"></path>
                        <path d="M12 18l0 3"></path>
                        <path d="M7.75 16.25l-2.15 2.15"></path>
                        <path d="M6 12l-3 0"></path>
                        <path d="M7.75 7.75l-2.15 -2.15"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {imageURL && !loading && (
              <div className="flex flex-col items-center gap-6 mt-12">
                <p>Find your generated image below</p>
                <img
                  src={imageURL}
                  width={600}
                  height={600}
                  alt="Generated image"
                />
              </div>
            )}

            {!imageURL && !loading && (
              <div className="flex flex-col items-center gap-6 mt-12">
                <p>Your image will appear below</p>
                <div>
                  <div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M15 8h.01"></path>
                        <path d="M11.5 21h-5.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5"></path>
                        <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        <path d="M20.2 20.2l1.8 1.8"></path>
                        <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l2 2"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {error && <div className="text-center w-1/2 mx-auto bg-red-500 mt-2 rounded border border-red-800">{error}</div>}
          </div>
        </section>
      </Layout>
    </>
  );
}

export default App;
