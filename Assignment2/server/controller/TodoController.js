const service = require('../service/TodoService') 

class TodoController {
    static async getFetchTodosCall(request,responce){
        const todos = await service.fetchTodos();
        responce.status(200).send(todos);
    }

    static async postAddTodoCall(request,responce){
        const {taskName} = request.query
        const isSaved = await service.addTodo(taskName)
        console.log("isSaved ",isSaved);

        if(isSaved){
            responce.status(201).json({message: "Todo Added"})
        }else{
            responce.status(500).json({message: "not able to add Todo"})
        }
        
    }

    static async putUpdateTodo(request,responce){
       const {id, field,value} = request.query
       console.log("PUT CALL")
       console.log(request.query)
       const isUpdated = await service.updateTodo(id, field,value);

       if(isUpdated){
        responce.status(201).json({message: "Todo Update"})
       }else{
        responce.status(500).json({message: "not able to update Todo"})
      }
    }

    static async deleteTodo(request,responce){
        const {id} = request.query
        const isDeleted =  await service.deleteTodo(id)
        if(isDeleted){
            responce.status(201).json({message: "Todo deleted"})
        }else{
         responce.status(500).json({message: "not able to deleted Todo"})
       }
    }


}

module.exports = TodoController