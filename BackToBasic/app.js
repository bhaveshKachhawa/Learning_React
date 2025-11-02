        // <div id="root">
        //     <div id="parent">
        //         <div id="child1">
        //             <h1 id="head1">Hey i am inner heading1</h1>
        //         </div>
        //         <div id="child2">
        //             <h1 id="head2">Hey i am inner heading2</h1>
        //         </div>                
        //     </div>
        // </div>
const root = ReactDOM.createRoot(document.getElementById('root'));
const parent = React.createElement("div",{id:"parent"},[
                        React.createElement("div",{id:"child1"},
                                React.createElement("h1",{id:"head1"}, "Hey i am inner heading1")), 
                        React.createElement("div",{id:"child2"},
                                React.createElement("h1",{id:"head2"}, "Hey i am inner heading2"))]);
root.render(parent);