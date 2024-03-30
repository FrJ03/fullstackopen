import InfoParagraph from "./InfoParagraph"
import StatisticLine from "./StatisticLine"

const Statistics = (props) => {
    if(props.total !== 0){
        return (
            <div>
                {props.stats.map(stat => <StatisticLine text={stat.text} value={stat.value}/>)}
            </div>
        )
    }
    else{
        return (
            <div>
                <InfoParagraph content='No feedback given'/>
            </div>
        )
    }
}

export default Statistics