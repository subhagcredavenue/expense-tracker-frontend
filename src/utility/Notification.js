import { notification } from 'antd';
import { NOTIFICATION_TYPE } from './constants';

export const notify = (message,type=NOTIFICATION_TYPE.success) => {
  notification[type]({
    message: message
  });
};
