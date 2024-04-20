import ListElement from "./ListElement"

const objectToList = (object) => {
    let list = []
    for(let key in object){
        list.push(object[key]);
    }
    return list
}

const List = ({title, elements}) => {
    return (
        <>
            <div><strong>{title}</strong></div>
            <ul>
                {objectToList(elements).map((element, i) => <ListElement key={element + i} element={element}/>)}
            </ul>
        </>
    )
}

export default List