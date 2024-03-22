import Part from './Part.jsx'

const Content = (props) =>{
    return (
        <div>
            <Part part={props.content[0].part} exercises={props.content[0].exercises}/>
            <Part part={props.content[1].part} exercises={props.content[1].exercises}/>
            <Part part={props.content[2].part} exercises={props.content[2].exercises}/>
        </div>
    )
}

export default Content