const Button = (props) =>{
    return (
        <button type='button' onClick={props.onClick}>{props.content}</button>
    )
}

export default Button