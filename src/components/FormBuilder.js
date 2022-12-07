function FormBuilder(props) {
    let output = Object.values(props).map((el,index) => {
    if(el.type === 'submit') {
        return (
            <div className="form-group" key={index}>
                <button className="btn btn-primary" onClick={()=>{
                    el.submit();  
                }}>
                    {el.label}
                </button>
            </div>
        )
    }
    if(el.type === 'options') {
        let internal = el.options.map((el,i) => {
            return <option key={el.key+"option:"+i} value={el[0]}>{el[1]}</option>
        })
    return <div className="form-group" key={index}>
        <label  htmlFor={el.key}>{el.abel}</label>
        <select  name={el.key} id={el.key}  onChange={(e) =>{
            el.val[1](e.target.value);
        }} >
            {internal}
        </select>
        </div>
    }
    return(
            <div className="form-group" key={index}>
                <label htmlFor= {el.key} >{el.label}</label>
                <input type={el.type?el.type:'text'} 
                value={el.val[0]}
                onChange={(event)=>{
                    el.val[1](event.target.value);
                
                }}
                className="form-control" id={el.key} 
                aria-describedby={el.key+'HELP'} 
                placeholder={el.placeholder} />
                <small id={el.key +"HELP"} className="form-text text-muted">{el.help}</small>
            </div>);
    });
    
    return <form> {output} </form>
}
export {FormBuilder}