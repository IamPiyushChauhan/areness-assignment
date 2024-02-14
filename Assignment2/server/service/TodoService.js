const todoModel = require('../model/Todo')

class TodoService {
    static async addTodo (todoName){
        try{
            const newTodo = new todoModel({task_name: todoName,completed: false});
            const output =  await newTodo.save();
            console.log("output")
            console.log(output)
            if(output._id !== undefined){
                return true;
            }

            return false;
        }catch(e){
            console.log("error in addTodo",e);
            return false;
        }
    }

    static async fetchTodos(){
        try{
            const todos = await todoModel.find({});
            return todos;
        }catch(e){
            console.log("Error in fetchTodos  ", e)
            return []
        }
    }

    static async updateTodo(id, field,value){
        try {
            const doc = await todoModel.findById(id)
            doc[field] = value;
            const output =  await doc.save();
            console.log(output)

            if(output!== undefined){
                return true;
            }else{
                return false;
            }
        } catch (e) {
            console.log("error in updateTodo ",e);
            return false
        }        
    }

    static async deleteTodo(id){
        try{
            const output = await todoModel.deleteOne({_id: id});
            console.log("output")
            console.log(output)
            if(output.deletedCount === 1){
                return true
            }else{
                return false
            }
            
        }catch(e){
            console.log(e);
            return false;
        }
    }
}

module.exports = TodoService;