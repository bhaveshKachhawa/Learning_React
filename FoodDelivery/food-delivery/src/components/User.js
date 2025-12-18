import React from 'react';

class User extends React.Component
{
    constructor(props) {
        super(props);
    }

    render() {
        const {avatar_url, login} = this.props.value;
        return (
            <div className="user">
                <img src={avatar_url} />
                <h1>{login}</h1>
            </div>
        );
    }
}

export default User;