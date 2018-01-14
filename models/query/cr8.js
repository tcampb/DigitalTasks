const User = require('../table/user');
const Contact = require('../table/contact');
const Task = require('../table/task');
const Contask = require('../table/contask');
const sample = require('./sample.json');

// new Date(Date.UTC(2018,11,20))

// sample code on creating a user,task,contact & contask at the same time
const create_all = async(user_json,task_json,contact_json) => {
    let user = await User.create(user_json);
    let task = await Task.create(task_json);
    task.setUser(user);
    task.save();
    let contact= await Contact.create(contact_json);
    contact.setUser(user);
    contact.save();
    let contask = await Contask.create({});
    contask.setContact(contact);
    contask.setTask(task);
    contask.save();
}

create_all(sample.sample_data_user,sample.sample_data_task,sample.sample_data_contact);



// demo to create task(s) for 'the' user
// store the task content here

// fancy await async function!
const find_create_task = async (userid,task) =>{
    let user = await User.findById(userid);
    let newTask = await Task.create(task);
    newTask.setUser(user);
    newTask.save();
}

// find user id 1 and plug in the task
// find_create_task(1,sample.sample_data_task);


// Create new user
const create_user = async(user_json) => {
    let user = await User.create(user_json); 
    console.log("Sucessful!, your user id is "+user.dataValues.id);
}

// create_user(sample.sample_data_user);
 


module.export = create_all, find_create_task;