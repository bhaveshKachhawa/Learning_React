import AccordianHeader from "./AccordianHeader";
import { useState } from "react";

const App4 = () => {
     const [indexValue, setIndexValue] = useState(null);
     const [accordion, setAccordian] = useState(true);

     const handleChange = (e) =>{
        setAccordian(e.target.checked);
     }

    const accordianArray = [
  {
    header: "Do I have to allow the use of cookies?",
    data: "Unicorn vinyl poutine brooklyn, next level direct trade iceland. Shaman copper mug church-key coloring book, whatever poutine normcore fixie cred kickstarter post-ironic street art."
  },
  {
    header: "How do I change my My Page password?",
    data: "Coloring book forage photo booth gentrify lumbersexual. Migas chillwave poutine synth shoreditch, enamel pin thundercats fashion axe roof party polaroid chartreuse."
  },
  {
    header: "What is BankID?",
    data: "Enamel pin fam sustainable woke whatever venmo. Authentic asymmetrical put a bird on it, lumbersexual activated charcoal kinfolk banjo cred pickled sartorial."
  },
  {
    header: "Whose birth number can I use?",
    data: "Edison bulb direct trade gentrify beard lo-fi seitan sustainable roof party franzen occupy squid. Knausgaard cronut succulents, scenester readymade shabby chic lyft. Copper mug meh vegan gentrify."
  },
  {
    header: "When do I recieve a password ordered by letter?",
    data: "Locavore franzen fashion axe live-edge neutra irony synth af tilde shabby chic man braid chillwave waistcoat copper mug messenger bag. Banjo snackwave blog, microdosing thundercats migas vaporware viral lo-fi seitan"
  }
];

    return (
        <div>
        Is multiple open accordion allowed?<input type="checkbox" defaultChecked onChange={(e) => handleChange(e)}/>
        {accordianArray.map((value, index) => {
            return <AccordianHeader key={index} obj={value}  show={index === indexValue?"+":"-"} setIndexValue={() => {
                index === indexValue?setIndexValue(null):setIndexValue(index);
            }} accordion={accordion}/>
        })}
        </div>
    );
}

export default App4;