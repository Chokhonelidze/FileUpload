import React from "react";
import {UserContext} from "../App";
    import {query_single} from "../functions/queries";


function FileUploadPage() {

    const [selectedFile,setSelectedFile] = React.useState();
    const [isSelected,setIsSelected] = React.useState(false);
    let [user,setUser] = React.useContext(UserContext);

    const upload = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    }
    const submit = async () => {
       // const formData = new FormData();
        //formData.append('File', selectedFile);
        console.log(selectedFile);
        const q  = `
        mutation SingleUpload($file: Upload!) {
            singleUpload(file: $file) {
              mimetype
              filename
              encoding
            }
          }`;

         await query_single(q,selectedFile,user,()=>{alert('success')});
            
    }

    return (
        <div>
            <input type ="file" name='file' onChange={upload}  className ='btn btn-primary'/>
            {isSelected? (
                <div className="card-body">
                <p className="card-text">Filename: {selectedFile.name}</p>
                <p className="card-text">Filetype: {selectedFile.type}</p>
                <p className="card-text">Size in bytes: {selectedFile.size}</p>
                <p className="card-text">
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
                </div>
            ):(
                <p>Select a file to show details</p>
            )}

            <div>
                <button onClick={submit} className ='btn btn-primary'>submit</button>
            </div>
        </div>
    )
}
export {FileUploadPage}