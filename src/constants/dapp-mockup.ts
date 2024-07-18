const DAPP_MOCKUP_CONFIG: DappCategory[] = [
  {
    key: 'info_class',
    title: 'Info class',
    fields: [
      {
        key: 'class_name',
        title: 'Class name',
        type: 'input',
      },
      {
        key: 'number_member',
        title: 'Number member',
        type: 'input',
      },
      {
        key: 'teacher',
        title: 'Teacher',
        type: 'dropdown',
        options: [
          {
            key: 'teacher_cat', value: 'Teacher Cat',
          },
          {
            key: 'teacher_dog', value: 'Teacher Dog',
          },
        ],
      },
    ],
  },
  {
    key: 'member_class',
    title: 'Member in class',
    fields: [
      {
        key: 'member',
        title: 'add new member',
        type: 'dynamic',
        dynamic: [
          {
            key: 'full_name',
            title: 'Full_name',
            type: 'input',
          },
          {
            key: 'age',
            title: 'age',
            type: 'input',
          },

          {
            key: 'do_you',
            title: 'do you like red?',
            type: 'extends',
            extends: [
              {
                key: 'whey',
                title: 'Why do you like?',
                type: 'input',
              },
              {
                key: 'second',
                title: 'Color Second like',
                type: 'dropdown',
                options: [
                  {
                    key: 'blue',
                    value: 'Blue',
                  },
                  {
                    key: 'black',
                    value: 'Black',
                  },
                  {
                    key: 'green',
                    value: 'Green',
                  },
                ],
              },
            ],
          },
          {
            key: 'teacher',
            title: 'Teacher',
            type: 'dropdown',
            options: [
              {
                key: 'teacher_cat', value: 'Teacher Cat',
              },
              {
                key: 'teacher_dog', value: 'Teacher Dog',
              },
            ],
          },
        ],
      },
    ],
  },
];
