import Info from "./Info"

const Statistics = (props) => {
    return (
        <div>
            {props.stats.map(stat => <Info text={stat.text} value={stat.value}/>)}
        </div>
    )
}

export default Statistics