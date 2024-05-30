
import { Card } from 'antd';


const Profile = ({ user }) => {
   /* if (!localStorage.getItem('token')) {
        return <Redirect to="/login" />;
    }*/

    const { name, email } = user || {};

    return (
        <div style={{ padding: '10  10' }}>

            <Card>
                <div className="section-title text-center mb-55">
                    <h2>User Profile Page</h2>
                </div>

                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Email: {email}</li>
                </ul>
            </Card>
        </div>


    );
};

export default Profile;
