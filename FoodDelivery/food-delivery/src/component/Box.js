import {useUpdateValue} from './customHook/useUpdatedValue';

const Box = ({item, value}) => {
    const convertedValue = useUpdateValue(item, value);
    return (
    <div style={{"width":"75%", "border":"2px solid grey","backgroundColor":"lightGray"}} className="mainBox innerBox">
        <span>{item}</span>        
        <h4 style={{"backgroundColor":"white","padding":"10px","border":"1px solid Grey","width":"95%","margin":"0px","marginTop":"2px"}}>{convertedValue}</h4>
    </div>);
}

export default Box;
