import Part from './Part.jsx'

const Content = (props) =>{
    return (
        <div>
            <Part name={props.content[0].name} exercises={props.content[0].exercises}/>
            <Part name={props.content[1].name} exercises={props.content[1].exercises}/>
            <Part name={props.content[2].name} exercises={props.content[2].exercises}/>
        </div>
    )
}

export default Content