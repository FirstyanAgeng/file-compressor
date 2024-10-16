import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Upload, Button, Typography, message, Card } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Dragger } = Upload;

const WordFileCompressor = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (info) => {
    const file = info.file.originFileObj;
    setFile(file);
    message.success(`${file.name} selected.`);
  };

  const handleCompress = async () => {
    if (!file) {
      message.error("Please select a file to compress");
      return;
    }

    const zip = new JSZip();
    const zipFilename = `${file.name}.zip`;

    const fileData = await file.arrayBuffer();
    zip.file(file.name, fileData);

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, zipFilename);
      message.success("File compressed and downloaded successfully!");
    });
  };

  return (
    <div className="compressor-container">
      <Card className="compressor-card" bordered={false} hoverable>
        <Title level={2}>Bernad Project - Word File Compressor</Title>
        <Text type="secondary">
          Compress your Word files into a ZIP archive
        </Text>

        <Dragger
          beforeUpload={() => false}
          onChange={handleFileChange}
          multiple={false}
          style={{ marginTop: 20 }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag Word file to this area to upload
          </p>
          <p className="ant-upload-hint">Supports only .docx files</p>
        </Dragger>

        <Button
          type="primary"
          onClick={handleCompress}
          disabled={!file}
          style={{ marginTop: 20 }}
        >
          Compress File
        </Button>
      </Card>
    </div>
  );
};

export default WordFileCompressor;
