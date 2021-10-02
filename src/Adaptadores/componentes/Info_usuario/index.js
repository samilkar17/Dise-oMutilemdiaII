import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../Puertos/feactures/user/userSlice";
import { db } from "../../../Puertos/firebase/config";


export default function InfoUsuario() {
  const user = useSelector(selectUser)
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const fetchUser = async () => {
    try {
      const query = await db
        .collection("user")
        .where("uid", "==", user.user)
        .get();
      const data = await query.docs[0].data();
      setName(data.displayName);
      setLastName(data.lastName);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    fetchUser();
   
  });
  
  return (
    <>
      <div className="flex flex-col  items-center space-y-8">
        <h1 className="text-blue-800 font-body text-xl text-center">Información sobre el Usuario</h1>
        <div className="flex bg-white w-44 h-44 rounded-2xl shadow-xl ">
          <div className="flex  items-end mx-auto">
            <h1 className="text-blue-800 font-body p-2 capitalize">
              {name} {lastName}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
