const Button = ({ text, onClick, type }) => {
    if (!type) return <button onClick={onClick}> {text} </button>
    return (
        <button onClick={onClick} type={type}> {text} </button>
    )
}

export default Button