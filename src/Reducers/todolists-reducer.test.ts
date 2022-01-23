import { v1 } from "uuid";
import { FilterValueType } from "../App";
import { TodolistReducer, TodolistsType,} from "./TodolistReducers";

let todolistId1 = v1();
let todolistId2 = v1();

const startState: Array<TodolistsType> = [
    {id: todolistId1, title: "What to learn", filter: "all"}, 
    {id: todolistId2, title: "What to buy", filter: "all"},
]


test('correct todolist should be removed', () => {

    const endState = TodolistReducer(startState, { type: 'REMOVE-TODOLIST',  payload:{ Todolistid: todolistId1}})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
 });

 test('correct todolist should be added', () => {
    const newTodolistId = v1();
    let newTodolistTitle = "New Todolist";
 
    const endState = TodolistReducer(startState, { type: "ADD-TODOLIST", payload:{ title: newTodolistTitle, todolistID: newTodolistId,}})
 
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
 });
 
 test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";
    let id = todolistId2

    const endState = TodolistReducer(startState, {type: "CHANGE-VALUE-TL", payload: {Todolistid: id, titleInSpan:  newTodolistTitle} });
 
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
 });
  
 
 test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = "completed";
    let id = todolistId2

    const endState = TodolistReducer(startState, {type: "CHANGE-FITER-TL", payload:{todolistID: id, value: newFilter} });
 
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
 });
 