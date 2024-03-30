import Info from "./Info"

const Statistics = (props) => {
    if(props.total !== 0){
        return (
            <div>
                {props.stats.map(stat => <Info text={stat.text} value={stat.value}/>)}
            </div>
        )
    }
    else{
        return (
            <div>
                <Info text='No feedback given'/>
            </div>
        )
    }
}

export default Statistics