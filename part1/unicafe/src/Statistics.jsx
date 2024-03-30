import InfoParagraph from "./InfoParagraph"
import StatisticLine from "./StatisticLine"

const Statistics = (props) => {
    if(props.total !== 0){
        return (
            <table>
                <tbody>
                    {props.stats.map((stat, i) => <StatisticLine key={i} text={stat.text} value={stat.value}/>)}
                </tbody>
            </table>
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