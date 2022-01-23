import {removeTaskAC, TaskReducer} from './TaskReducers'
import {TasksMainType} from './TaskReducers'

const startState: TasksMainType = {
    "todolistId1": [
        { id: "1", title: "CSS", isDone: false },
        { id: "2", title: "JS", isDone: true },
        { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
        { id: "1", title: "bread", isDone: false },
        { id: "2", title: "milk", isDone: true },
        { id: "3", title: "tea", isDone: false }
    ]

 };

 test('status of specified task should be changed', () => {
    

    let tdID = "todolistId2";
    let taskID = "2";
    let status = false
    // let status1 = false
 
    const endState = TaskReducer(startState, {type: "CHANGE-STATUS", payload: {todolistID: tdID, id: taskID, isDone: status}})
 
    expect(endState["todolistId2"][1].isDone).toBe(status);
    expect(endState["todolistId2"][0].isDone).toBe(false);
  });

test('correct task should be deleted from correct array', () => {
    
    let tdID = "todolistId2"
    let taskID = "2"
   
    const endState = TaskReducer(startState, {type: "REMOVE-TASK", payload: {todolistID: tdID, id: taskID}} )
 
   expect(endState).toEqual({
    "todolistId1": [
        { id: "1", title: "CSS", isDone: false },
        { id: "2", title: "JS", isDone: true },
        { id: "3", title: "React", isDone: false }
    ],
    "todolistId2": [
        { id: "1", title: "bread", isDone: false },
        { id: "3", title: "tea", isDone: false }
    ]
 });
 
 });

 test('correct task should be added to correct array', () => {
 
    let tdID = "todolistId2"
    let newTask = "juce"
 
    const endState = TaskReducer(startState, {type: "ADD-TASK", payload: {todolistID: tdID, title: newTask}} )
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe(newTask);
    expect(endState["todolistId2"][0].isDone).toBe(false);
}) 

 test('correct task should be changed title', () => {
 
    let tdID = "todolistId2"
    let newTaskTitle = "juce"
    let taskId = "1"
 
    const endState = TaskReducer(startState, {type: "CHANGE-VALUE-IN-TASK-TITLE", payload: {Todolistid: tdID, titleInSpan : newTaskTitle, id: taskId}} )
 
    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId2"][0].title).toBe(newTaskTitle);
}) 
 
 