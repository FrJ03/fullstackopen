const Notification = ({message}) => {
    if(message === null){
        return null
    }
    else{
        return (
            <div class="message">
                {message}
            </div>
        )
    }
}

export default Notification