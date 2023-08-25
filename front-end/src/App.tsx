import {Box} from "@mantine/core";
import useSWR from "swr";
import "./App.css";
import LogIn from "./component/Login/login";
export const ENDPOINT = "http://localhost:8080";

const fetcher = (url:string)=>
   fetch(`${ENDPOINT}/${url}`).then((r)=>r.json());
function App(){
  const { data, error, isLoading } = useSWR('hi', fetcher)
  //if (error) return <Box>{JSON.stringify(data)}</Box>
  if (data) return <LogIn></LogIn>

}
export default App; 