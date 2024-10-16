import React, { useState } from "react";
import LZString from "lz-string";

const StringCompressor = () => {
  const [originalText, setOriginalText] = useState("");
  const [compressedText, setCompressedText] = useState("");
  const [decompressedText, setDecompressedText] = useState("");

  const handleCompress = () => {
    const compressed = LZString.compress(originalText);
    setCompressedText(compressed);
  };

  const handleDecompress = () => {
    const decompressed = LZString.decompress(compressedText);
    setDecompressedText(decompressed);
  };

  return (
    <div>
      <h2>String Compressor</h2>
      <textarea
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        placeholder="Enter text to compress"
      />
      <button onClick={handleCompress}>Compress</button>
      <div>
        <h3>Compressed Text:</h3>
        <p>{compressedText}</p>
      </div>
      <button onClick={handleDecompress}>Decompress</button>
      <div>
        <h3>Decompressed Text:</h3>
        <p>{decompressedText}</p>
      </div>
    </div>
  );
};

export default StringCompressor;
