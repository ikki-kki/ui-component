export default function Button({ text , onClick , className }){
    return <span 
        onClick={onClick}
        style={{ marginRight : "5px" }} 
        className={`btn ${className}`}>
            {text}
        </span>
}