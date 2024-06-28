import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import img1 from "./assets/recipe2.jpg";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [recipeName, setRecipeName] = useState([]);
  const [steps, setSteps] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:8080/create-recipes", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("res", data);
        setRecipeName(data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch("http://localhost:8080/recipes")
      .then((res) => res.json())
      .then((data) => {
        console.log("👌👌user", data);
        setRecipeName(data.reverse());
        console.log("💕💕recipeName", recipeName);
      })
      .catch((err) => console.log("🙌🙌", err));
  }, []);
  // updateUser method
  const updateUser = () => {
    
  };

  // deleteUser method
  const deleteUser = (user) => {
    console.log(user._id);
    fetch(`http://localhost:8080/recipes/${user._id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipeName(data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  return (
    <div className=" p-3 relative bg-gradient-to-tr from-blue-900 to-lime-400 " >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-200  w-1/2 mx-auto p-3 rounded-xl"
      >
        <Input
          color="blue"
          label="Enter recipe name"
          {...register("recipes_name")}
          placeholder="Enter recipe name"
          className="text-black"
        />
        <br />
        <Input
          color="blue"
          label="write steps"
          {...register("steps")}
          placeholder="write steps"
          className=""
        />{" "}
        <br />
        <Button type="submit" className="mx-auto flex " color="blue">
          Submit
        </Button>
      </form>
      {recipeName.length > 0 ? (
        <div className=" flex flex-wrap justify-center ">
          {recipeName.map((user, index) => (
            <Card className="mt-10 w-96 mx-2 " key={index}>
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={img1} alt="recipes" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {user.recipes_name}
                </Typography>
                <Typography>{user._id}</Typography>
              </CardBody>
              <CardFooter className="pt-0 flex justify-around">
                <Button onClick={() => updateUser(user)} color="green">
                  Update
                </Button>
                <Button onClick={() => deleteUser(user)} color="red">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>There is no users data</p>
      )}
    </div>
  );
}

export default App;
