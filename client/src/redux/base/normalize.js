import { schema, normalize } from 'normalizr'

const list = new schema.Entity('lists', {}, {idAttribute: 'sid' })
const task = new schema.Entity("tasks", {}, { idAttribute: "sid" })

export const norm_lists = data => normalize(data, [list])
export const norm_tasks = data => normalize(data, [task])

export const norm_list = data => normalize(data, list)
export const norm_task = data => normalize(data, task)

const teams = new schema.Entity("teams", {}, { idAttribute: "sid" });
export const norm_teams = data => normalize(data, [teams]);
export const norm_team = data => normalize(data, teams);

// const boards = new schema.Entity('boards', {}, {
//   idAttribute: value => value.type === 'team' ? `${value.sid}@${value.teamId}` : `${value.sid}`
// })
// // export const norm_boards = (data) => normalize(data,[boards])
// export const norm_board = data => normalize(data, boards)

const personalS = new schema.Entity("personals", {}, { idAttribute: "sid" });
const teamS = new schema.Entity("teams", {},
 { idAttribute: value => `${value.sid}@${value.teamId}` });
const boards = new schema.Array(
  {
    personals: personalS,
    teams: teamS
  },
  (input, parent, key) => `${input.type}s`
);

export const norm_boards = (data) => normalize(data , boards)

const board = new schema.Entity("board", {}, { idAttribute: "sid" });
export const norm_board = data => normalize(data,board)