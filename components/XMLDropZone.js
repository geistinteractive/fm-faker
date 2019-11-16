import { useCallback, useMemo, useContext } from "react";
import { useDropzone } from "react-dropzone";

import { parseTables, makeSchemas } from "../utils/parseFMXml";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#00e676" // the isDragReject is just plain wrong so making accept the same as reject for now
};

export default function XMLDropZone({ onReceiveParsedFile }) {
  const { setFMTables } = { setFMTables: () => {} };
  const onDrop = useCallback(async acceptedFiles => {
    const ParsedFile = await parseTables(acceptedFiles);
    onReceiveParsedFile(ParsedFile);

    //console.log(JSON.stringify(makeSchemas(Tables), null, "  "));
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: ".xml", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag your FileMaker XML file here.</p>
      </div>
    </div>
  );
}
