exports.demoData = [
  {
    sid: 'dboard_1',
    type: 'personal',
    owner: 'guest_1',
    color:'#2EABCC',
    title:"Demo Board",
    lists:[
      {sid:'list_1', title: "List 1", bid:"dboard_1", pos: 16358.0, isArchived: false},
      {sid:'list_2', title: "List 2", bid:"dboard_1", pos: 81893.0, isArchived: false},
    ],
    tasks:[
      {sid:'task_1', title: "Task1", bid:"dboard_1", lid:"list_1", pos: 16358.0, isArchived: false},
      {sid:'task_2', title: "Task2", bid:"dboard_1", lid:"list_1", pos: 81893.0, isArchived: false},
      {sid:'task_3', title: "Task3", bid:"dboard_1", lid:"list_1", pos: 147428.0, isArchived: false},
      {sid:'task_4', title: "Task4", bid:"dboard_1", lid:"list_2", pos: 16358.0, isArchived: false},
    ]
  }
]