import React from "react";
import { UserContext } from "../App";
import { query } from "../functions/queries";
import { useDropzone } from "react-dropzone";

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = React.useState();
  const [isSelected, setIsSelected] = React.useState(false);
  let [user, setUser] = React.useContext(UserContext);
  const onDrop = React.useCallback((acceptedFiles) => {
   
    const reader = new FileReader();
    reader.onloadend = ()=> {
        let data = reader.result;
        console.log(acceptedFiles[0]);
        let file = {    
            filename:acceptedFiles[0].name,
            size: acceptedFiles[0].size.toString(),
            type:acceptedFiles[0].type,
            data:data,
        }
        setSelectedFile(file);
     
    }
    reader.readAsDataURL(acceptedFiles[0]);
    console.log(selectedFile);
    setIsSelected(true);
  }, [selectedFile]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const submit = async () => {
    // const formData = new FormData();
    //formData.append('File', selectedFile);
    console.log(selectedFile);
    const q =`
    mutation SingleUpload($file: FileInput!) {
        singleUpload(file: $file) {
          id
          filename
          size
          type   
        }
      }`;

    await query(q,{file:selectedFile}, user, () => {
      alert("success");
    });
  };

  return (
    <div>
     <div {...getRootProps()}>
      <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {isSelected ? (
        <div className="card-body">
          <p className="card-text">Filename: {selectedFile?.filename}</p>
          <p className="card-text">Filetype: {selectedFile?.type}</p>
          <p className="card-text">Size in bytes: {selectedFile?.size}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}

      <div>
        <button onClick={submit} className="btn btn-primary">
          submit
        </button>
      </div>
    </div>
  );
}
export { FileUploadPage };
