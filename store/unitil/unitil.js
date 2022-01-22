import { notification } from 'antd';


export const notify = ({ message, description, type }) => {
    notification[type]({
        message,
        description,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
}