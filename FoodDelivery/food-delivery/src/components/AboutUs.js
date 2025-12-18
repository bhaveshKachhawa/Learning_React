import React from 'react';
import Shimmer from './Shimmer';
import User from './User';

class AboutUs extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            user:[],
        }
    }

    async componentDidMount() {
        const response = await fetch('https://api.github.com/users');
        const data= await response.json();
        this.setState(()=> {
            return {
                user:data,
            }
        });
    }

    render()
    {
        return (this.state.user.length == 0 ? <Shimmer />:
            <div className="userList">
            {this.state.user.map((userData) => {
            return <User key={userData.id} value={userData}/>
        })}</div>)
    }
}

export default AboutUs;