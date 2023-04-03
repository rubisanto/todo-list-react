import { useState } from "react";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";

export default function Form(props) {
  const [dataArr, setDataArr] = useState([
    { txt: "Faire les courses", id: uuidv4() },
    { txt: "Faire le ménage", id: uuidv4() },
    { txt: "Faire la vaisselle", id: uuidv4() },
  ]);

  const [stateInput, setStateInput] = useState();

  const linkedInput = (e) => {
    setStateInput(e);
  };

  const addTodo = (e) => {
    e.preventDefault();
    // copie du tableau, ne pas modifier le tableau d'origine
    const newArr = [...dataArr];

    const newTodo = {};
    newTodo.txt = stateInput;
    newTodo.id = uuidv4();

    newArr.push(newTodo);
    setDataArr(newArr);
    // remettre l'input à vide
    setStateInput("");
  };

  const deleteElement = (id) => {
    const filteredState = dataArr.filter((item) => item.id !== id);
    setDataArr(filteredState);
  };

  return (
    <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">
      <form onSubmit={(e) => addTodo(e)} className="mb-3">
        <label htmlFor="todo" className="form-label mt-3">
          Chose à faire
        </label>
        <input
          value={stateInput}
          onChange={(e) => linkedInput(e.target.value)}
          type="text"
          className="form-control"
          id="todo"
        />
        <button className="mt-2 btn btn-primary d-block">Envoyer</button>
      </form>

      <h2>Liste des choses à faire : </h2>
      <ul className="list-group">
        {dataArr.map((item) => {
          return (
            <Item
              key={item.id}
              txt={item.txt}
              id={item.id}
              delFunc={deleteElement}
            />
          );
        })}
      </ul>
    </div>
  );
}
