import { closeModal, openModal } from '@/stores/states/modal/reducer';
import { compareString } from '@/utils/string';
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { clone, map } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ILaunchpadBodyTask,
  ILaunchpadSetupTask,
} from '../services/lauchpad.create.interface';
import CLaunchpadAPI from '../services/launchpad';
import { launchpadSelector, setCreateBody } from '../store/reducer';
import s from './styles.module.scss';
import InputWrapper from '@/components/Form/inputWrapper';
import { Field, useFormState } from 'react-final-form';
import FieldDateTime from '@/components/Form/Field.DateTime';
import { composeValidators, required } from '@/utils/form-validate';
import dayjs from 'dayjs';
import FieldAmount from '@/components/Form/fieldAmount';

const TaskModal = ({
  task,
  onClose,
}: {
  task: ILaunchpadSetupTask;
  onClose: any;
}) => {
  const dispatch = useDispatch();
  const create_body = useSelector(launchpadSelector).create_body;

  const preTask = create_body.tasks || [];

  const taskIndex = useMemo(
    () => preTask?.findIndex((v) => compareString(v.task_id, task.id)),
    [task, preTask],
  );

  const currentTask = useMemo(() => preTask?.[taskIndex], [taskIndex]);

  const [inputData, setInputData] = useState<any>({});

  const formatInputData = (_currentTask: any[]) => {
    const defaultData: any = {};
    for (let i = 0; i < _currentTask.length; i++) {
      const element = _currentTask[i];
      defaultData[`${element.key}`] = element.value;
    }
    return defaultData;
  };

  useEffect(() => {
    if (currentTask?.input_values) {
      setInputData(formatInputData(currentTask?.input_values));
    }
  }, [currentTask?.input_values]);

  const parseInputData = (_data: any): ILaunchpadBodyTask => {
    const input_values = map(_data, (v, k) => {
      return {
        key: k,
        value: v,
      };
    }) as any[];

    return {
      task_id: task.id,
      input_values,
    };
  };

  const onOK = () => {
    let _tasks = clone(preTask);

    if (taskIndex >= 0) {
      _tasks[taskIndex] = parseInputData(inputData);
    } else {
      _tasks.push(parseInputData(inputData));
    }

    dispatch(
      setCreateBody({
        tasks: _tasks,
      }),
    );

    onClose();
  };

  const onRemove = () => {
    let _tasks = clone(preTask);
    if (taskIndex >= 0) {
      _tasks.splice(taskIndex, 1);
    }

    dispatch(
      setCreateBody({
        tasks: _tasks,
      }),
    );
    onClose();
  };

  return (
    <Box>
      <Flex flexDirection={'column'} gap={'12px'}>
        {task.input_fileds?.map((v) => (
          <FormControl key={v.key}>
            <FormLabel>{v.name}</FormLabel>
            <Input
              placeholder={v.description}
              defaultValue={inputData[`${v.key}`]}
              onChange={(e) =>
                setInputData((_v: any) => ({
                  ..._v,
                  [`${v.key}`]: e.target.value,
                }))
              }
            />
          </FormControl>
        ))}
      </Flex>
      <Box mt={4} />
      <Flex alignItems={'center'} gap={'12px'}>
        <Button onClick={onOK} colorScheme="blue" flex={1} type="button">
          OK
        </Button>
        <Button onClick={onRemove} flex={1} type="button">
          Remove
        </Button>
      </Flex>
    </Box>
  );
};

const ItemTask = ({
  task,
  isLoading,
}: {
  task: ILaunchpadSetupTask;
  isLoading?: boolean;
}) => {
  const dispatch = useDispatch();
  const id = task?.id;

  const create_body = useSelector(launchpadSelector).create_body;
  const preTask = create_body.tasks || [];

  const taskIndex = useMemo(
    () => preTask?.findIndex((v) => compareString(v.task_id, task.id)),
    [task, preTask],
  );

  const openContent = () => {
    const onClose = () => dispatch(closeModal({ id }));
    return dispatch(
      openModal({
        id: id,
        title: task.name,
        render: () => <TaskModal task={task} onClose={onClose} />,
      }),
    );
  };

  return (
    <>
      <Flex
        onClick={isLoading ? undefined : openContent}
        className={s.itemTaskContainer}
        cursor={isLoading ? 'default' : 'pointer'}
      >
        {isLoading ? (
          <Skeleton height={'24px'} />
        ) : (
          <>
            <Text>{task.name}</Text>
            <Checkbox isChecked={taskIndex >= 0} />
          </>
        )}
      </Flex>
    </>
  );
};

const SetupPreLaunchpadTasks = ({ isOpen }: { isOpen: boolean }) => {
  const launchpadAPI = useRef(new CLaunchpadAPI()).current;
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<ILaunchpadSetupTask[]>([]);

  const { values } = useFormState();

  const pre_launch_start_date = values?.pre_sale_duration;

  useEffect(() => {
    getData();
  }, [isOpen]);

  const getData = async () => {
    try {
      setLoading(true);
      if (!isOpen) {
        setTasks([]);
        return;
      }
      const rs = await launchpadAPI.getPreLaunchpadTasks();
      setTasks(rs);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Collapse
      style={{ overflow: 'visible!important' }}
      in={isOpen}
      animateOpacity
    >
      <Flex mt={'12px'} gap={6}>
        <Box flex={1}>
          <InputWrapper label="Duration (days)">
            <Field
              name="pre_sale_duration"
              component={FieldAmount}
              validate={composeValidators(required)}
            />
          </InputWrapper>
        </Box>
        <Box flex={1}></Box>
      </Flex>

      <SimpleGrid minHeight={'108px'} gap={'12px'} columns={3} mt={'12px'}>
        {loading
          ? Array(6)
              .fill(0)
              .map((t) => <ItemTask key={t.id} task={t} isLoading={true} />)
          : tasks.map((t) => <ItemTask key={t.id} task={t} />)}
      </SimpleGrid>
    </Collapse>
  );
};

export default SetupPreLaunchpadTasks;
