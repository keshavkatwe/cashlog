import {PickerInputBox, Switch, Typography} from '../../components';
import {useCallback, useEffect, useState} from 'react';
import type {TimestampTrigger} from '@notifee/react-native';
import notifee, {
  AuthorizationStatus,
  RepeatFrequency,
  TriggerType,
} from '@notifee/react-native';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import {getFromStorage, setToStorage} from '../../helpers/localStorage';

const TRANSACTION_ID = 'TRANSACTION_REMINDER';
const CHANNEL_ID = 'default';

const RemindTransactionSettingWidget = () => {
  const [isRememberAddTransaction, setIsRememberAddTransaction] =
    useState(false);
  const [isTimePicker, setIsTimePicker] = useState(false);
  const [reminderTime, setReminderTime] = useState(
    new Date(dayjs().hour(22).minute(0).second(0).unix() * 1000),
  );

  useEffect(() => {
    notifee.getTriggerNotificationIds().then(ids => {
      if (ids.includes(TRANSACTION_ID)) {
        setIsRememberAddTransaction(true);
      }
    });
  }, []);

  const toggleRemainder = useCallback(async () => {
    try {
      if (isRememberAddTransaction) {
        const settings = await notifee.requestPermission();
        if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
          await Promise.reject();
        }
        let timestamp = dayjs(reminderTime);
        if (
          dayjs().get('hour') >= timestamp.get('hour') &&
          dayjs().get('minute') >= timestamp.get('minute')
        ) {
          timestamp = timestamp.add(1, 'day');
        }
        const trigger: TimestampTrigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: timestamp.unix() * 1000,
          alarmManager: true,
          repeatFrequency: RepeatFrequency.DAILY,
        };

        const channelId = await notifee.createChannel({
          id: CHANNEL_ID,
          name: 'Reminder',
        });

        // Create a trigger notification
        await notifee.createTriggerNotification(
          {
            id: TRANSACTION_ID,
            title: 'Time to Log',
            body: "Add today's expenses before midnight. Stay on track with Cashlog!",
            android: {
              channelId,
              smallIcon: 'ic_cashlog_noti',
              pressAction: {
                id: 'default',
              },
            },
          },
          trigger,
        );

        await setToStorage('reminderTimeStamp', reminderTime.getTime() + '');
      } else {
        await notifee.cancelTriggerNotification(TRANSACTION_ID);
      }
    } catch (e) {
      setIsRememberAddTransaction(prevState => !prevState);
    }
  }, [isRememberAddTransaction, reminderTime]);

  useEffect(() => {
    getFromStorage('reminderTimeStamp').then(
      value => value && setReminderTime(new Date(+value)),
    );
  }, []);

  useEffect(() => {
    toggleRemainder().catch(() => {});
  }, [toggleRemainder]);

  return (
    <>
      <PickerInputBox
        displayValue={'Reminder for Adding Transactions'}
        postElement={
          <Switch
            onValueChange={setIsRememberAddTransaction}
            value={isRememberAddTransaction}
          />
        }
        isOpacityDisable
      />
      {isRememberAddTransaction && (
        <PickerInputBox
          displayValue={'Time to Remind'}
          postElement={
            <Typography color={'purpleLighter'}>
              {dayjs(reminderTime).format('h:mm a')}
            </Typography>
          }
          onClick={() => setIsTimePicker(true)}
        />
      )}

      <DatePicker
        open={isTimePicker}
        modal
        mode={'time'}
        date={reminderTime}
        onConfirm={date => {
          setReminderTime(date);
          setIsTimePicker(false);
        }}
        onCancel={() => {
          setIsTimePicker(false);
        }}
      />
    </>
  );
};
export default RemindTransactionSettingWidget;
