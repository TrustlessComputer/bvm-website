"use client"; // Ensures this is a Client Component

import { useEffect, useState } from "react";

export default function PyodideLoader() {
  const [pyodide, setPyodide] = useState(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    async function loadPyodide() {
      if (window.loadPyodide) {
        let py = await window.loadPyodide();
        setPyodide(py);
      }
    }
    loadPyodide();
  }, []);

  const runPython = async () => {
    if (!pyodide) return;

    const pythonCode = `
        def sum2Numb(a, b):
            return a + b

        sum2Numb(5, 10)
    `;

    try {
      let result = pyodide.runPython(pythonCode);
      setOutput(result);
    } catch (error) {
      console.error(error);
      setOutput("Error running Python");
    }
  };

  return (
    <div>
      <h2>Run Python in Next.js</h2>
      <button onClick={runPython}>Run Python Code</button>
      <p>Output: {output}</p>
    </div>
  );
}
